(function() {
	'use strict';

	angular.module("itaca.components").component("chPlanningCell", {
		require : {
			chPlanningCtrl : "^^chPlanning"
		},
		bindings : {
			viewDate: "<",
			onOpenRoom: "&?",
			onCloseRoom: "&?",
			onViewRates: "&?"
		},
		controller : PlanningCellCtrl,
		templateUrl : "/tpls/planning/planning-cell.tpl"
	});

	/* @ngInject */
	function PlanningCellCtrl($scope, $mdMedia) {
		var ctrl = this;
		
		this.$mdMedia = $mdMedia;
		
		this.$onInit = function() {
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