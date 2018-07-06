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
			options: "<?",
			hideSelectedIcon: "<?",
			showCheckAll: "<?"
    	},
		controller: ArrayInputCtrl,
		template: 
			"<div>" +
				"<div ng-if=\"$ctrl.showCheckAll\" layout layout-wrap>" +
					"<span flex></span>" +
					"<md-button class=\"only-border border-radius\" ng-click=\"$ctrl.$checkAll(true)\" aria-label=\"check all\">" +
						"<md-icon class=\"mdi mdi-checkbox-multiple-marked-outline md-18\"></md-icon>" +
						"<span translate-once=\"common.check.all\"></span>" +
					"</md-button>" +
					
					"<md-button class=\"only-border border-radius\" ng-click=\"$ctrl.$checkAll()\" aria-label=\"uncheck all\">" +
						"<md-icon class=\"mdi mdi-checkbox-multiple-blank-outline md-18\"></md-icon>" +
						"<span translate-once=\"common.uncheck.all\"></span>" +
					"</md-button>" +
				"</div>" +
				"<div class=\"layout-row layout-wrap\" ng-transclude></div>" +
			"</div>",	
    });
    
    /* @ngInject */
    function ArrayInputCtrl($scope) {
    	
    	var ctrl = this;
		
		this.$onInit = function() {
			ctrl.options = angular.isArray(ctrl.options) ? ctrl.options : [];
			
			ctrl.showCheckAll = _.isBoolean(ctrl.showCheckAll) ? ctrl.showCheckAll : false;
			
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
		
		this.$onChanges = function(changesObj) {
        	if (!changesObj) {
        		return;
        	}
        	
        	if (changesObj.ngModel && changesObj.ngSelected.isFirstChange()) {
        		_.forEach(ctrl.options, function(option){
    				if(_.some(ctrl.ngModel,function(r){return r.role == option.value})){
    					option.selected = true; 
    				}
    			});
        	}
        };
		
		this.addOption = function(option) {
			ctrl.options.push(option);
		};
		
		this.$isSelected = function(value) {
			if (!value) {
				return false;
			}
			
			return _.includes(ctrl.ngModel, value);
		};
		
		this.toggleOption = function(option) {
			ctrl.ngModel = angular.isArray(ctrl.ngModel) ? ctrl.ngModel : [];
			
			if (!option.selected) {
				ctrl.ngModel.push(option.value);
			
			} else {
				_.pull(ctrl.ngModel, option.value);
			}
			
			option.selected = !option.selected; 
		};
		
		this.$checkAll = function(checked){
			if(_.isNil(ctrl.ngModel) || !checked){
				ctrl.ngModel = [];
			}
			
			_.forEach(ctrl.options, function(option){
				option.selected = checked; 
				if(checked){
					ctrl.ngModel.push(option.value);
				}
			});
		};
	}
})();