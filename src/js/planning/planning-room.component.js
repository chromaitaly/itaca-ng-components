(function() {
	'use strict';

	angular.module("itaca.components").component("chPlanningRoom", {
		require : {
			chPlanningCtrl : "^^chPlanning"
		},
		bindings : {
			room: "<",
			dates: "<",
			reservations: "<?"
		},
		controller : PlanningRoomCtrl,
		templateUrl : "/tpls/planning/planning-room.tpl"
	});

	/* @ngInject */
	function PlanningRoomCtrl($scope, $mdMedia) {
		var ctrl = this;
		
		this.$mdMedia = $mdMedia;
		
		this.$onInit = function() {
			ctrl.$initDates();
		};
		
		this.$onChanges = function(changesObj) {
			if (changesObj.dates) {
				ctrl.$initDates();
			
			} else if (changesObj.reservations) {
				// eseguo solo se non sono cambiate anche le date, altrimenti
				// viene eseguito 2 volte (le date già lo eseguono)
				ctrl.$initReservations();
			}
		};
		
		this.$initDates = function() {
			ctrl.$$viewDates = angular.copy(ctrl.dates);
			
			// data di inzio (più piccola)
			ctrl.$$startDate = _.minBy(ctrl.$$viewDates, function(viewDate) {
				return viewDate.date.getTime();
			}).date;

			// data di fine(più grande)
			ctrl.$$endDate = _.maxBy(ctrl.$$viewDates, function(viewDate) {
				return viewDate.date.getTime();
			}).date;
			
			ctrl.$initReservations();
		};
		
		this.$initReservations = function() {
			var start = moment(ctrl.$$startDate).startOf("day");
			var end = moment(ctrl.$$endDate).startOf("day");
			var daySize = 100/_.size(ctrl.$$viewDates);
			var h = 50; // altezza div prenotazione
			var startTop = 15;
			var padding = 3;
			
			_.forEach(ctrl.$$viewDates, function(viewDate) {
				viewDate.$reservations = _.filter(ctrl.reservations, function(res, index) {
					// verifico se la prenotazione è su questa camera e questo giorno
					var isThisRoom = _.some(res.rooms, function(roomSold) {
						return _.some(roomSold.dailyDetails, function(dailyDetail) {
							return moment(dailyDetail.date).isSame(moment(viewDate.date), "days") && _.isEqual(dailyDetail.room.id, ctrl.room.id);
						});
					});
						
					if (!isThisRoom) {
						return false;
					}
					
					var checkin = moment(res.checkin).startOf("day");
					var checkout = moment(res.checkout).startOf("day");
					res.$startEarlier = checkin.isBefore(start, "days");
					res.$endLater = checkout.isAfter(end, "days");
					res.$days = Math.abs((res.$endLater ? moment(end).add(1, "days") : checkout).diff(res.$startEarlier ? start : checkin, "days")) || 1;
					
					if (checkin.isSame(moment(viewDate.date), "days") || (res.$startEarlier && moment(viewDate.date).isSame(start, "days"))) {
						// posizionamento prenotazione (in %) 
						res.$position = {
							width: daySize * res.$days + "%"
//							top: h * index + "px"			
						};
						
						if (!res.$startEarlier) {
							var daysFromStart = checkin.diff(start, "days");
							if (daysFromStart >= 0) {
								res.$position.left = "calc(" + (daySize * daysFromStart) + "% + " + padding + "px)";
							}
						}
						
						res.$position.width = "calc(" + (daySize * res.$days) + "% - " + (res.$startEarlier || res.$endLater ? padding : padding*2) + "px)";
						
						return true;
					} else {
						return false;
					}
				});
				
				_.forEach(viewDate.$reservations, function(res, index) {
					res.$position.top = h * index + (_.size(viewDate.$reservations) == 1 ? startTop : 0) + "px"; 
				});		
			});
		};
	}
})();