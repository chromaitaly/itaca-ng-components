(function() {
	'use strict';

	angular.module("itaca.components").component("chPlanningOverbookings", {
		require : {
			chPlanningCtrl : "^^chPlanning"
		},
		bindings : {
			overbookings: "<",
			daySize: "<"
		},
		controller : PlanningOverbookingsCtrl,
		templateUrl : "/tpls/planning/planning-overbookings.tpl"
	});

	/* @ngInject */
	function PlanningOverbookingsCtrl($scope, $mdMedia) {
		var ctrl = this;
		
		this.$mdMedia = $mdMedia;
		
		this.$onInit = function() {
		};
	}
})();