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
			ctrl.$$startDate = _.minBy(ctrl.$$viewDates, function(date) {
				return date.getTime();
			});

			// data di fine(più grande)
			ctrl.$$endDate = _.minBy(ctrl.$$viewDates, function(date) {
				return date.getTime();
			});
			
			ctrl.$initReservations();
		};
		
		this.$initReservations = function() {
			var start = moment(ctrl.$$startDate);
			var end = moment(ctrl.$$endDate);
			var daySize = 100/_.size(ctrl.$$viewDates);
			
			_.forEach(ctrl.$$viewDates, function(viewDate) {
				viewDate.$reservations = _.filter(ctrl.reservations, function(res) {
					// verifico se la prenotazione è su questa camera e questo giorno
					var isThisRoom = _.some(res.rooms, function(roomSold) {
						return _.some(roomSold.dailyDetails, function(dailyDetail) {
							return dailyDetail.date.isSame(moment(viewDate.date), "days") && _.isEqual(room.id, ctrl.room.id);
						});
					});
						
					if (!isThisRoom) {
						return false;
					}
					
					var checkin = moment(res.checkin);
					var checkout = moment(res.checkout);
					var days = Math.abs(checkin.diff(checkout.isAfter(end, "days") ? end : checkout));
					
					if (checkin.isSame(moment(viewDate.date), "days")) {
						// posizionamento prenotazione (in %) 
						res.position = {
							left: daySize * Math.abs(start.diff(checkin, "days")),
							width: daySize * days
						};
						
						return true;
					} else {
						return false;
					}
				});
			});
		};
		
	}
})();