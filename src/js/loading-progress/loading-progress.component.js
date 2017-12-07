(function() {
	'use strict';
	
	angular.module("itaca.components").component('chLoadingProgress', {
		bindings: {
			message: "<",
			messageKey: "<",
			errorMessage: "<",
			errorMessageKey: "<",
			progressDiameter: "@",
			contClass: "@",
			hideSiblings: "<"
		},
		controller: LoadingProgressCtrl,
		template: 
			"<div flex=\"100\" layout=\"column\" layout-align=\"center center\" class=\"{{$ctrl.contClass}}\">" +
				"<div ng-if=\"!$ctrl.errorMessage && !$ctrl.errorMessageKey\" flex layout=\"column\" layout-padding layout-align=\"center center\">" +
					"<div>" +
						"<md-progress-circular class=\"ch-progress-white\" md-mode=\"indeterminate\" md-diameter=\"{{$ctrl.progressDiameter}}\"></md-progress-circular>" +
					"</div>" +
					"<div ng-if=\"$ctrl.message || $ctrl.messageKey\" class=\"text-center\">" +
						"<span ng-if=\"$ctrl.message\" ng-bind=\"$ctrl.message\"></span>" +
						"<span ng-if=\"!$ctrl.message && $ctrl.messageKey\" translate=\"{{$ctrl.messageKey}}\"></span>" +
					"</div>" +
				"</div>" +
				"<div ng-if=\"$ctrl.errorMessage || $ctrl.errorMessageKey\" flex layout=\"column\" layout-padding layout-align=\"center center\">" +
					"<div>" +
						"<md-icon class=\"mdi mdi-alert-circle-outline md-70 text-white\"></md-icon>" +
					"</div>" +
					"<div class=\"md-display-2\">Oops...</div>" +
					"<div>" +
						"<span ng-if=\"$ctrl.errorMessage\" ng-bind=\"$ctrl.errorMessage\"></span>" +
						"<span ng-if=\"!$ctrl.errorMessage && $ctrl.errorMessageKey\" translate=\"{{$ctrl.errorMessageKey}}\"></span>" +
					"</div>" +
				"</div>" +
			"</div>"
	});

	/* @ngInject */
	function LoadingProgressCtrl($scope, $element) {
		var ctrl = this;
		
		this.$postLink = function() {
			ctrl.$hideSiblings(ctrl.hideSiblings);
		};
		
		this.$onInit = function() {
			ctrl.contClass = ctrl.contClass || "bg-primary text-white md-title";
			ctrl.progressDiameter = ctrl.progressDiameter || 150;
			
			ctrl.$initWatchers();
		};
		
		this.$onDestroy = function() {
			ctrl.$hideSiblings(false);
		};
		
		this.$hideSiblings = function(hide) {
			var children = $element.parent().children();
			
			// nascondo tutti i nodi figli
			hide ? children.addClass("ng-hide") : children.removeClass("ng-hide");
			// mostro il nodo del loading
			$element.removeClass("ng-hide");
		};
		
		this.$initWatchers = function() {
			$scope.$watch(function() {
				return ctrl.hideElement;
			
			}, function(newVal, oldVal) {
				ctrl.$toggleEl(oldVal, true);
				ctrl.$toggleEl(newVal);
			});
		};
	}
})();