(function() {
	"use strict";

	angular.module("itaca.components").component("chPlanningRoom", {
		require : {
			chPlanningCtrl : "^^chPlanning"
		},
		bindings : {
			room: "<",
			dates: "<",
			planning: "<?",
			settings: "<",
			onOpenRoom: "&?",
			onCloseRoom: "&?",
			onViewRates: "&?",
			onReservationClick: "&?",
			onOverbookingClick: "&?",
			onReservationDrag: "&?",
			onFinishReservationDrag: "&?",
			onReservationDrop: "&?"
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
			ctrl.$$viewDates = ctrl.dates;
			
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
			
			// svuoto planning map
			ctrl.$$datePlanningMap = {};
			
			_.forEach(ctrl.$$viewDates, function(viewDate) {
				// timestamp
				viewDate.timestamp = viewDate.date.getTime();
				// dimensione cella
				viewDate.$daySize = ctrl.$$config.daySize;
				// planning
				var planning = _.find(ctrl.planning, function(p) {
					return moment(p.date).isSame(moment(viewDate.date), "days");
				});
				
				// imposto il planning
				ctrl.$$datePlanningMap[viewDate.timestamp] = planning;
				
				if (!planning || !planning.active || !planning.active.reservation) {
					return;
				}
				
				// init active planning
				ctrl.$manageDatePlanningReservation(start, end, viewDate.date, planning.active);
				
				// init overbookings planning
				_.forEach(planning.overbookings, function(ovPlanning) {
					ctrl.$manageDatePlanningReservation(start, end, viewDate.date, ovPlanning);
					ovPlanning.reservation.$show = collection.length > 1 ? true : ovPlanning.reservation.$show;
				});
			});
		};
		
		this.$manageDatePlanningReservation = function(start, end, date, planning) {
			var current = moment(date), activeStart = moment(planning.startDate), activeEnd = moment(planning.endDate);
			var res = planning.reservation;
				
			var checkin = moment(res.checkin).startOf("day");
			var checkout = moment(res.checkout).startOf("day");
			var targetCheckout = moment(checkout).subtract(1, "days");
			
			res.$differentMonths = !checkin.isSame(checkout, "month");
			res.$startsEarlier = current.isAfter(activeStart, "days") || activeStart.isAfter(checkin, "days") || checkin.isBefore(start, "days");
			res.$endsLater = moment(activeEnd).subtract(1, "days").isBefore(targetCheckout, "days") || end.isBefore(targetCheckout, "days");
			
			res.$days = Math.abs((activeEnd.isAfter(end) ? end.add(1, "days"): activeEnd).diff(activeStart.isAfter(start) ? activeStart : start, "days")) || 1;
			
			// posizionamento prenotazione (in %) 
			res.$style = {
				width: ctrl.$$config.daySize * res.$days + "%"
			};
			
			res.$show = activeStart.isSame(current, "days") || (res.$startsEarlier && current.isSame(start, "days"));
		};
		
		this.$openRoom = function(ev, date) {
			ctrl.chPlanningCtrl.onOpenRoom && ctrl.chPlanningCtrl.onOpenRoom({$event: ev, $date: date, $room: ctrl.room});
		};
		
		this.$closeRoom = function(ev, date) {
			ctrl.chPlanningCtrl.onCloseRoom && ctrl.chPlanningCtrl.onCloseRoom({$event: ev, $date: date, $room: ctrl.room});
		};
		
		this.$viewRates = function(ev, date) {
			ctrl.chPlanningCtrl.onViewRates && ctrl.chPlanningCtrl.onViewRates({$event: ev, $date: date, $room: ctrl.room});
		};
	}
})();