(function() {
	'use strict';

	angular.module("itaca.components").component("chPlanningCell", {
		require : {
			chPlanningCtrl : "^^chPlanning"
		},
		bindings : {
			viewDate: "<",
			settings: "<",
			onOpenRoom: "&?",
			onCloseRoom: "&?",
			onViewRates: "&?",
			onReservationClick: "&?",
			onOverbookingClick: "&?"
		},
		controller : PlanningCellCtrl,
		templateUrl : "/tpls/planning/planning-cell.tpl"
	});

	/* @ngInject */
	function PlanningCellCtrl($scope, $element, $mdMedia) {
		var ctrl = this;
		
		this.$mdMedia = $mdMedia;
		
		this.$onInit = function() {
		};
		
		this.$openCellMenu = function() {
			if (ctrl.viewDate.$planning && (ctrl.viewDate.$planning.active || (ctrl.viewDate.$planning.overbookings && ctrl.viewDate.$planning.overbookings.length))) {
				return;
			}
			
			var menuTriggerBtn = $element[0].querySelector("md-menu.ch-planning-cell-menu .md-button");
			
			menuTriggerBtn && menuTriggerBtn.click();
		};
		
		this.$openRoom = function() {
			ctrl.onOpenRoom && ctrl.onOpenRoom({$date: ctrl.viewDate.date});
		};
		
		this.$closeRoom = function() {
			ctrl.onCloseRoom && ctrl.onCloseRoom({$date: ctrl.viewDate.date});
		};
		
		this.$viewRates = function() {
			ctrl.onViewRates && ctrl.onViewRates({$date: ctrl.viewDate.date});
		};
	}
})();