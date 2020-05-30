(function() {
    "use strict";
    
    angular.module("itaca.components").component("chArrayOption", {
    	transclude: true,
    	require: {
			chArrayInputCtrl: "^chArrayInput"
		},
    	bindings: {
    		ngValue: "<",
    		ngSelected: "<",
    		ngDisabled: "<?",
	  		buttonClass: "@",
	  		iconClass : "@",
	  		selectedIconClass : "@",
	  		label: "@",
	  		labelClass: "@",
	  		selectedClass: "@"
    	},
		controller: ArrayOptionCtrl,
		templateUrl: "/tpls/array-input/array-option.tpl"
    });
    
    /* @ngInject */
    function ArrayOptionCtrl($scope) {
    	
    	var ctrl = this;
		
		this.$onInit = function() {
			ctrl.buttonClass = ctrl.buttonClass || (ctrl.iconClass && !ctrl.label ? "md-icon-button" : "");
			ctrl.selectedIconClass = ctrl.selectedIconClass || !ctrl.iconClass ? "mdi mdi-check md-24" : "";
			ctrl.selectedClass = ctrl.selectedClass || "md-primary";
			
			ctrl.$$hideSelectedIcon = ctrl.chArrayInputCtrl.hideSelectedIcon;			
			ctrl.$$option =  {value: ctrl.ngValue};
			ctrl.$manageSelected();
			
			ctrl.ngDisabled = _.isBoolean(ctrl.ngDisabled) ? ctrl.ngDisabled : false;
		};
		
		this.$postLink = function () {
	    	ctrl.chArrayInputCtrl.addOption(ctrl.$$option);
        };
        
        this.$onChanges = function(changesObj) {
        	if (!changesObj) {
        		return;
        	}
        	
        	if (changesObj.ngSelected && !changesObj.ngSelected.isFirstChange()) {
        		ctrl.$manageSelected();
        	}
        };
        
        this.$manageSelected = function() {
        	ctrl.$$option.selected = !angular.isUndefined(ctrl.ngSelected) ? ctrl.ngSelected : ctrl.chArrayInputCtrl.$isSelected(ctrl.ngValue);
        };
		
		this.$toggle = function() {
			ctrl.chArrayInputCtrl.toggleOption(ctrl.$$option);
    	};
	}
})();