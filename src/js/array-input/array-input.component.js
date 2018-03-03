(function() {
    'use strict';
    
    angular.module("itaca.components").component("chArrayInput", {
    	transclude: true,
    	require: {
			ngModelCtrl: 'ngModel'
		},
    	bindings: {
    		ngModel: "=",
			ngRequired: "<?",
			options: "<?"
    	},
		controller: ArrayInputCtrl,
		template: '<div class="layout-row layout-wrap" ng-transclude></div>',
    });
    
    /* @ngInject */
    function ArrayInputCtrl($scope) {
    	
    	var ctrl = this;
		
		this.$onInit = function() {
			ctrl.ngModel = angular.isArray(ctrl.ngModel) ? ctrl.ngModel : [];
			ctrl.options = angular.isArray(ctrl.options) ? ctrl.options : [];
			
			if (ctrl.ngRequired) {
				$scope.$watchCollection(function(){
					return ctrl.ngModel;
					
				}, function(newValue, oldValue) {
					if (ctrl.ngRequired) {
						ctrl.ngModelCtrl.$setValidity('required', !_.isEmpty(ctrl.ngModel));
					}
				});
			}
		};
		
		this.addOption = function(option) {
			ctrl.options.push(option);
		};
		
		this.toggleOption = function(option) {
			if (!option.selected) {
				ctrl.ngModel.push(option.value);
			
			} else {
				_.pull(ctrl.ngModel, option.value);
			}
			
			option.selected = !option.selected; 
		};
	}
})();