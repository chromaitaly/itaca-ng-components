(function() {
	'use strict';
	
	angular.module("chroma.components").component('chArrayInput', {
		require: {
			ngModelCtrl: 'ngModel'
		},
		transclude: true,
		bindings: {
			ngModel: "=",
			ngRequired: "<?",
			options: "<?"
		},
		controller: ArrayInputCtrl,
		template: "<div class=\"layout-padding\"><div class=\"layout-row layout-wrap\" ng-transclude></div></div>"
	});

	/* @ngInject */
	function ArrayInputCtrl($scope) {
		var ctrl = this;
		
		this.$onInit = function() {
			ctrl.ngModelCtrl.$modelValue = angular.isArray(ctrl.ngModelCtrl.$modelValue) ? ctrl.ngModelCtrl.$modelValue : [];
			ctrl.options = angular.isArray(ctrl.options) ? ctrl.options : [];
			
			if (ctrl.ngRequired) {
				ctrl.$watchCollection(function(){return ctrl.ngModelCtrl.$modelValue;}, function(newValue, oldValue) {
					if (ctrl.ngRequired) {
						ctrl.ngModelCtrl.$setValidity('required', !_.isEmpty(ctrl.ngModelCtrl.$modelValue));
					}
				});
			}
		};
		
		this.$addOption = function(option) {
			ctrl.options.push(option);
		};
		
		this.$toggleOption = function(option) {
			if (!option.selected) {
				ctrl.ngModelCtrl.$modelValue.push(option.value);
			
			} else {
				_.pull(ctrl.ngModelCtrl.$modelValue, option.value);
			}
			
			option.selected = !option.selected; 
		};
	}
})();