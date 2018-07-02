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
	function PlanningRoomCtrl($scope, $mdMedia, IconUtils) {
		var ctrl = this;
		
		this.$mdMedia = $mdMedia;
		this.$$portalIcons = IconUtils.portalIcons();
		
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
			var start = moment(ctrl.$$startDate);
			var end = moment(ctrl.$$endDate);
			var daySize = 100/_.size(ctrl.$$viewDates);
			var h = 50; // altezza div prenotazione
			var startTop = 15;
			
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
					
					var checkin = moment(res.checkin);
					var checkout = moment(res.checkout);
					res.$startEarlier = checkin.isBefore(start, "days");
					res.$endLater = checkout.isAfter(end, "days");
					res.$days = Math.abs((res.$startEarlier ? start : checkin).diff(res.$endLater ? end : checkout, "days")) || 1;
					
					if (checkin.isSame(moment(viewDate.date), "days") || (res.$startEarlier && moment(viewDate.date).isSame(start, "days"))) {
						// posizionamento prenotazione (in %) 
						res.$position = {
//							left: daySize * Math.abs(start.diff(checkin, "days")),
							width: daySize * res.$days + "%"
//							top: h * index + "px"			
						};
						
						
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