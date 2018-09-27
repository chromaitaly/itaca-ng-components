(function() {
	'use strict';

	angular.module("itaca.components").component("chPlanningReservation", {
		bindings : {
			planning: "<",
			settings: "<",
			mainClass: "@",
			onClick: "&?",
			canDrag: "<?",
			onDragStart: "&?",
			onDragEnd: "&?"
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
			ctrl.$checkDraggable();
		};
		
		this.$onChanges = function(changesObj) {
			if (changesObj.planning) {
				ctrl.$checkDraggable();
			}
		};
		
		this.$checkDraggable = function() {
			if (ctrl.planning && ctrl.planning.reservation && ctrl.planning.reservation.checkin) {
				ctrl.$$canDrag = moment(ctrl.planning.startDate).isSameOrAfter(moment(), "days");
			}
		};
	}
})();