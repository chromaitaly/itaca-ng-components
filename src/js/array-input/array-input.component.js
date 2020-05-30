(function() {
    "use strict";
    
    angular.module("itaca.components").component("chArrayInput", {
    	transclude: true,
    	require: {
			ngModelCtrl: "ngModel"
		},
    	bindings: {
    		ngModel: "=",
			ngRequired: "<?",
			options: "<?",
			hideSelectedIcon: "<?",
			showCheckAll: "<?"
    	},
		controller: ArrayInputCtrl,
		templateUrl: "/tpls/array-input/array-input.tpl"
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
						ctrl.ngModelCtrl.$setValidity("required", !_.isEmpty(ctrl.ngModel));
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
			var selected = angular.isArray(ctrl.ngModel) ? ctrl.ngModel.slice() : [];
			
			if (!option.selected) {
				selected.push(option.value);
			
			} else {
				_.pull(selected, option.value);
			}
			
			option.selected = !option.selected;
			
			ctrl.ngModelCtrl.$setViewValue(selected);
		};
		
		this.$checkAll = function(checked){
			_.forEach(ctrl.options, ctrl.toggleOption);
		};
	}
})();