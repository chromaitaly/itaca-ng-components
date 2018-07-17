(function() {
	'use strict';

	angular.module("itaca.components").component("chPlanningRoom", {
		require : {
			chPlanningCtrl : "^^chPlanning"
		},
		bindings : {
			room: "<",
			dates: "<",
			planning: "<?",
			onOpenRoom: "&?",
			onCloseRoom: "&?",
			onViewRates: "&?"
		},
		controller : PlanningRoomCtrl,
		templateUrl : "/tpls/planning/planning-room.tpl"
	});

	/* @ngInject */
	function PlanningRoomCtrl($scope, $mdMedia) {
		var ctrl = this;
		
		this.$mdMedia = $mdMedia;
		
		this.$$config = {
			startTop: 15,
			padding: 3
		};
		
		this.$onInit = function() {
			ctrl.$initDates();
		};
		
		this.$onChanges = function(changesObj) {
			if (changesObj.dates) {
				ctrl.$initDates();
			
			} else if (changesObj.planning) {
				// eseguo solo se non sono cambiate anche le date, altrimenti
				// viene eseguito 2 volte (le date già lo eseguono)
				ctrl.$initPlanning();
			}
		};
		
		this.$initDates = function() {
			// prima le svuoto (per dare l'effetto)
//			ctrl.$$viewDates = [];
			// copio le date in ingresso
			ctrl.$$viewDates = angular.copy(ctrl.dates);
			
			// data di inzio (più piccola)
			ctrl.$$startDate = _.minBy(ctrl.$$viewDates, function(viewDate) {
				return viewDate.date.getTime();
			}).date;

			// data di fine(più grande)
			ctrl.$$endDate = _.maxBy(ctrl.$$viewDates, function(viewDate) {
				return viewDate.date.getTime();
			}).date;
			
			ctrl.$initPlanning();
		};
		
		this.$initPlanning = function() {
			// imposto la dimensione della cella
			ctrl.$$config.daySize = 100/_.size(ctrl.$$viewDates);
			
			var start = moment(ctrl.$$startDate).startOf("day");
			var end = moment(ctrl.$$endDate).startOf("day");
			
			_.forEach(ctrl.$$viewDates, function(viewDate) {
				viewDate.$planning = _.find(ctrl.planning, function(p) {
					return moment(p.date).isSame(moment(viewDate.date), "days");
				});
				
				if (!viewDate.$planning || !viewDate.$planning.active || !viewDate.$planning.active.reservation) {
					return;
				}
				
				ctrl.$manageDatePlanningReservation(start, end, viewDate.date, viewDate.$planning.active);
				
				_.forEach(viewDate.$planning.overbookings, function(ovPlanning) {
					ctrl.$manageDatePlanningReservation(start, end, viewDate.date, ovPlanning);
					ovPlanning					
				});
			});
		};
		
		this.$manageDatePlanningReservation = function(start, end, date, planning) {
			var activeStart = moment(planning.startDate), activeEnd = moment(planning.endDate);;
			var res = planning.reservation;
				
			var checkin = moment(res.checkin).startOf("day");
			var checkout = moment(res.checkout).startOf("day");
			
			res.$differentMonths = !checkin.isSame(checkout, "month");
			res.$startsEarlier = activeStart.isAfter(checkin, "days") || checkin.isBefore(start, "days");
			res.$endsLater = activeEnd.isBefore(checkout, "days") || end.isBefore(checkout, "days");
			
			res.$days = Math.abs(activeEnd.diff(activeStart, "days")) || 1;
			
			if (activeStart.isSame(moment(date), "days") || (res.$startsEarlier && moment(date).isSame(start, "days"))) {
				// posizionamento prenotazione (in %) 
				res.$style = {
//					width: "calc(" + (daySize * res.$days) + "% - " + (res.$startsEarlier && !res.$endsLater ? 0 : res.$startsEarlier || res.$endsLater ? ctrl.$$config.padding : ctrl.$$config.padding*2) + "px)"
					width: ctrl.$$config.daySize * res.$days + "%"
//					top: (_.isEmpty(planning.overbookings) ? ctrl.$$config.startTop : 0) + "px"
				};
				
				res.$show = true;
			
			} else {
				res.$show = false;
			}
		};
		
		this.$openRoom = function(date) {
			ctrl.chPlanningCtrl.onOpenRoom && ctrl.chPlanningCtrl.onOpenRoom({$date: date, $room: ctrl.room});
		};
		
		this.$closeRoom = function(date) {
			ctrl.chPlanningCtrl.onCloseRoom && ctrl.chPlanningCtrl.onCloseRoom({$date: date, $room: ctrl.room});
		};
		
		this.$viewRates = function(date) {
			ctrl.chPlanningCtrl.onViewRates && ctrl.chPlanningCtrl.onViewRates({$date: date, $room: ctrl.room});
		};
	}
})();