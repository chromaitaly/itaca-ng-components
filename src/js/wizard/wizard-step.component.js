(function() {
    'use strict';
    
    angular.module("itaca.components").component("chWizardStep", {
    	transclude: true,
    	require: {
			chWizardCtrl: '^chWizard'
		},
    	bindings: {
	  		label: "@",
	  		labelClass: "@",
	  		activeLabelClass: "@"
    	},
		controller: WizardStepCtrl,
		templateUrl: "/tpls/wizard/wizard-step.tpl"
    });
    
    /* @ngInject */
    function WizardStepCtrl($scope, NumberUtils) {
    	
    	var ctrl = this;
		
		this.$onInit = function() {
			ctrl.activeLabelClass = ctrl.activeLabelClass || "text-primary";
	    	
			ctrl.$$step =  {label: ctrl.label, $uid: NumberUtils.uniqueNumber()};
	      
	    	ctrl.chWizardCtrl.addStep(ctrl.$$step);
		};
		
		this.$onDestroy = function() {
			ctrl.chWizardCtrl.removeStep(ctrl.$$step);
		};
	}
})();