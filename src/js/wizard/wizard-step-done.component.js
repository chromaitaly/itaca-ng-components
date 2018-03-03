(function() {
    'use strict';
    
    angular.module("itaca.components").component("chWizardStepDone", {
    	transclude: true,
    	require: {
			chWizardStepsDoneContentCtrl: '^chWizardStepsDoneContent'
		},
    	bindings: {
	  		label: "@",
	  		labelClass: "@",
	  		onEdit: "&"
    	},
		controller: WizardStepDoneCtrl,
		templateUrl: "/tpls/wizard/wizard-step-done.tpl"
    });
    
    /* @ngInject */
    function WizardStepDoneCtrl($scope, NumberUtils) {
    	
    	var ctrl = this;
		
		this.$onInit = function() {
			ctrl.labelClass = ctrl.labelClass || "text-primary";
	    	
			ctrl.$$step =  {label: ctrl.label, $uid: NumberUtils.uniqueNumber(), $done: true, $active :false};
	      
	    	ctrl.chWizardStepsDoneContentCtrl.addStep(ctrl.$$step);
		};
		
		this.$onDestroy = function() {
			ctrl.chWizardStepsDoneContentCtrl.removeStep(ctrl.$$step);
		};
		
		this.$edit = function() {
			ctrl.chWizardStepsDoneContentCtrl.editStep(ctrl.$$step);
		};
	}
})();