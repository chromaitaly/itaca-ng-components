(function() {
    'use strict';
    
    angular.module("itaca.components").component("chWizard", {
    	transclude: true,
    	bindings: {
    		direction: "@",
    		onForward: "&",
    		onBack: "&",
    		onConfirm: "&"
    	},
		controller: WizardCtrl,
		templateUrl: "/tpls/wizard/wizard.tpl"
			
    });
    
    /* @ngInject */
    function WizardCtrl($scope, $timeout, FormUtils){
    	var ctrl = this;
    	
		this.$onInit = function() {
			ctrl.direction = ctrl.direction || "vertical";
		};
		
		this.addStep = function(step) {
			if (!_.isPlainObject(step)) {
				return false;
			}
			
			ctrl.$$steps = _.isArray(ctrl.$$steps) ? ctrl.$$steps : [];
			
			step.$first = _.isEmpty(ctrl.$$steps);
			step.$index = _.size(ctrl.$$steps);
			step.$last = false;
			step.$done = false;
			
			if (step.$first) {
				ctrl.$$currentStep = step;
				step.$stopAnimation = true;
				step.$active = true;
			}
			
			return ctrl.$$steps.push(step) - 1;
		};
		
		this.removeStep = function(step) {
			_.pull(ctrl.$$steps, step);
		};
		
		this.editStep = function(step) {
			return ctrl.$goToStep(step.$index);
		};
		
		this.$forward = function() {
			var form = $scope.chFormWizardForm;
			
			form.$setSubmitted();
			
			if (form.$invalid) {
				FormUtils.focusFirstInvalid(form.$name);
				return false;
			}
			
			if (ctrl.$goToStep(ctrl.$$currentStep.$index + 1)) {
				ctrl.onForward && ctrl.onForward({$form: form, $step: ctrl.$$currentStep});
			}
		};
		
		this.$back = function() {
			return ctrl.$goToStep(ctrl.$$currentStep.$index - 1);
		};
		
		this.$confirm = function() {
			var form = $scope.chFormWizardForm;
			
			form.$setSubmitted();
			
			if (form.$invalid) {
				FormUtils.focusFirstInvalid(form.$name);
				return false;
			}
			
			if (ctrl.$$currentStep.$last) {
				ctrl.onConfirm && ctrl.onConfirm({$form: form, $step: ctrl.$$currentStep});
			
			} else {
				ctrl.$forward();
			}
		};
		
		this.$goToStep = function(index) {
			if (index < 0 || index >= _.size(ctrl.$$steps)) {
				return false;
			}
			
			// disable all
			_.forEach(ctrl.$$steps, function(step, idx, collection) {
				step.$active = false;
				step.$stopAnimation = false;
				
				step.$first = (idx == 0);
				step.$last = (idx == _.size(collection) - 1);
			});
			
			ctrl.$$currentStep = ctrl.$$steps[index];
			// enable current
			ctrl.$$currentStep.$active = true;
				
			$timeout(function(){
				ctrl.$$currentStep.$stopAnimation = true;
			}, 1000);
			
			return index;
		};
    }
    
})();