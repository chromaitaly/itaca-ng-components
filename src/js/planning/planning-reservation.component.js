(function() {
	'use strict';

	angular.module("itaca.components").component("chPlanningReservation", {
		require : {
			chPlanningCtrl : "^^chPlanning"
		},
		bindings : {
			reservation: "<"
		},
		controller : PlanningReservationCtrl,
		templateUrl : "/tpls/planning/planning-reservation.tpl"
	});

	/* @ngInject */
	function PlanningReservationCtrl($scope, $mdMedia, IconUtils) {
		var ctrl = this;
		
		this.$mdMedia = $mdMedia;
		this.$$portalIcons = IconUtils.portalIcons();
		
		this.$onInit = function() {
		};
		
		this.$onChanges = function(changesObj) {
		};
	}
})();