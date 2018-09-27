(function() {
	'use strict';

	angular.module("itaca.components").component("chPlanningCell", {
		require : {
			chPlanningCtrl : "^^chPlanning"
		},
		bindings : {
			viewDate: "<",
			planning: "<",
			canDrop: "<?",
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
		controller : PlanningCellCtrl,
		templateUrl : "/tpls/planning/planning-cell.tpl"
	});

	/* @ngInject */
	function PlanningCellCtrl($scope, $element, $mdMedia, $timeout) {
		var ctrl = this;
		
		this.$mdMedia = $mdMedia;
		
		this.$onInit = function() {
			ctrl.$checkOverbookings();
		};
		
		this.$onChanges = function(changesObj) {
			if (changesObj.planning) {
				ctrl.$checkOverbookings();
			}
		}
		
		this.$checkOverbookings = function() {
			ctrl.$$showOverbookings = ctrl.planning && ctrl.planning.overbookings && _.some(ctrl.planning.overbookings, "reservation.$show");
		};
		
		this.$openCellMenu = function(ev) {
			if (ctrl.planning && (ctrl.planning.active || (ctrl.planning.overbookings && ctrl.planning.overbookings.length))) {
				return;
			}
			
			var menuTriggerBtn = $element[0].querySelector("md-menu.ch-planning-cell-menu .md-button");
			
			menuTriggerBtn && $timeout(function() {menuTriggerBtn.click()});
		};
		
		this.$openRoom = function(ev) {
			ctrl.onOpenRoom && ctrl.onOpenRoom({$event: ev, $date: ctrl.viewDate.date});
		};
		
		this.$closeRoom = function(ev) {
			ctrl.onCloseRoom && ctrl.onCloseRoom({$event: ev, $date: ctrl.viewDate.date});
		};
		
		this.$viewRates = function(ev) {
			ev && ev.stopPropagation();
			ctrl.onViewRates && ctrl.onViewRates({$event: ev, $date: ctrl.viewDate.date});
		};
		
		this.$initReservationDrag = function(ev, planning) {
			ev.dataTransfer.dropEffect = "move";
			ev.dataTransfer.effectAllowed = "move";
			ctrl.$$dragging = true;
			ctrl.onReservationDrag && ctrl.onReservationDrag({
				$event: ev,
				$reservation: planning.reservation, 
				$roomSoldId: planning.roomSoldId,
				$startDate: planning.startDate,
				$endDate: planning.endDate,
				$roomTypeId: planning.roomType.id
			});
		};
		
		this.$finishReservationDrag = function(ev, planning) {
			ctrl.$$dragging = false;
			ctrl.onFinishReservationDrag && ctrl.onFinishReservationDrag({
				$event: ev,
				$reservation: planning.reservation, 
				$roomSoldId: planning.roomSoldId,
				$startDate: planning.startDate,
				$endDate: planning.endDate,
				$roomTypeId: planning.roomType.id
			});
		};
		
		this.$initDrop = function(ev, planning) {
			ctrl.$$dropOver = true;
			ctrl.$$dragStyle = ctrl.$$dragStyle || {};
			
			_.assign(ctrl.$$dragStyle, planning.reservation.$style);
			
			if (ctrl.viewDate.$daySize && planning.reservation.$days) {
				ctrl.$$dragStyle.width = ctrl.viewDate.$daySize * planning.reservation.$days + "%";
			}
		};
		
		this.$cancelDrop = function(ev, planning) {
			ctrl.$$dropOver = false;
			ctrl.$$dragStyle = undefined;
		};
		
		this.$dropReservation = function(ev, planning) {
			ctrl.$cancelDrop(ev, planning);
			ctrl.$finishReservationDrag(ev, planning);
			ctrl.onReservationDrop && ctrl.onReservationDrop({
				$event: ev,
				$reservation: planning.reservation, 
				$roomSoldId: planning.roomSoldId,
				$newRoomId: ctrl.planning.roomId,
				$startDate: planning.startDate,
				$endDate: planning.endDate
			});
		};
		
		this.$isRoomAssignable = function(planning) {
			if (!ctrl.canDrop || !ctrl.viewDate.$droppable || !planning.reservation) {
				return false;
			}
			
			var go = !ctrl.planning || !ctrl.planning.active || (ctrl.planning.active != planning && !_.some(ctrl.planning.overbookings, function(ov) {
				return ov == planning;
			}));
			
			return go && planning.startDate && moment(ctrl.viewDate.date).isSame(moment(planning.startDate), "days");
		};
	}
})();