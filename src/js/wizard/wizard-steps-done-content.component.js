(function() {
    "use strict";
    
    angular.module("itaca.components").component("chWizardStepsDoneContent", {
    	transclude: true,
    	require: {
			chWizardCtrl: "^chWizard",
		},
		controller: WizardStepsDoneContentCtrl,
		templateUrl: "/tpls/wizard/wizard-steps-done-content.tpl"
    });
    
    /* @ngInject */
    function WizardStepsDoneContentCtrl($scope) {
    	
    	var ctrl = this;
		
		this.$onInit = function() {
		};
		
		this.addStep = function(step) {
			if (!_.isPlainObject(step)) {
				return false;
			}
			
			ctrl.$$doneSteps = _.isArray(ctrl.$$doneSteps) ? ctrl.$$doneSteps : [];
			
			step.$active = _.isEmpty(ctrl.$$doneSteps);
			step.$first = _.isEmpty(ctrl.$$doneSteps);
			step.$index = _.size(ctrl.$$doneSteps);
			step.$last = false;
			step.$done = true;
			
			return ctrl.$$doneSteps.push(step) - 1;
		};
		
		this.removeStep = function(step) {
			_.pull(ctrl.$$doneSteps, step);
		};
		
		this.editStep = function(step) {
			ctrl.removeStep(step);
			
			ctrl.chWizardCtrl.editStep(step);
		};
	}
})();