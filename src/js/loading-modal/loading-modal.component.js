(function() {
	'use strict';
	
	angular.module("itaca.components").component('chLoadingModal', {
		bindings: {
			message: "<",
			messageKey: "<",
			progressDiameter: "@",
			contClass: "@"
		},
		controller: LoadingModalCtrl,
		template: 
			"<div flex layout=\"column\" layout-padding layout-align=\"center center\" class=\"ch-loading-modal {{$ctrl.contClass}}\">" +
				"<div>" +
					"<md-progress-circular class=\"md-primary ch-progress\" md-mode=\"indeterminate\" md-diameter=\"{{$ctrl.progressDiameter}}\"></md-progress-circular>" +
				"</div>" +
				"<div ng-if=\"$ctrl.message || $ctrl.messageKey\" class=\"text-center\">" +
					"<span ng-if=\"$ctrl.message\" ng-bind=\"$ctrl.message\"></span>" +
					"<span ng-if=\"!$ctrl.message && $ctrl.messageKey\" translate=\"{{$ctrl.messageKey}}\"></span>" +
				"</div>" +
			"</div>"
	});

	/* @ngInject */
	function LoadingModalCtrl($scope) {
		var ctrl = this;
		
		this.$onInit = function() {
			ctrl.progressDiameter = ctrl.progressDiameter || 80;
		};
	}
})();