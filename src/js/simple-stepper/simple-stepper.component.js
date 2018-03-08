(function() {
    "use strict";
    
    angular.module("itaca.components").component("chSimpleStepper", {
    	transclude: true,
    	bindings: {
    		linear: "<?",
    		previousStepClick: "<?",
            alternative: "<?",
            vertical: "<?",
            mobileMode: "<?",
            labelStep: "@?",
            labelOf: "@?"
    	},
		controller: StepperCtrl,
		templateUrl: "/tpls/simple-stepper/simple-stepper.tpl"
    });
    
    /* @ngInject */
    function StepperCtrl($scope, $mdComponentRegistry, $attrs, $log) {
        var ctrl = this;    	
    	
	    this.$onInit = function () {
	        this.mobileMode = _.isBoolean(this.mobileMode) ? this.mobileMode : false;
	        this.previousStepClick = _.isBoolean(this.previousStepClick) ? this.previousStepClick : false;
	        this.linear = _.isBoolean(this.linear) ? this.linear : true;
	        this.alternative = _.isBoolean(this.alternative) ? this.alternative : true;
	        this.labelStep = this.labelStep || "Step";
	        this.labelOf = this.labelOf || "of";
	        
	        this.$$steps = [];
	        this.$$currentStep = {index: 0};
	        
	    };
	    
	    this.$postLink = function () {
	        if (!$attrs.id) {
	            $log.warn("You must set an id attribute to the stepper");
	        }
	        
	        this.registeredStepper = $mdComponentRegistry.register(this, $attrs.id);
	    };
	    
	    this.$onDestroy = function () {
	        this.registeredStepper && this.registeredStepper();
	    };
	    
	    /**
		 * Register component step to this stepper.
		 * 
		 * @param {StepCtrl}
		 *            step The step to add.
		 * @returns number - The step number.
		 */
	    this.$addStep = function (step) {
	        var idx = this.$$steps.push(step) - 1;
	        
	        // update current step info
        	this.$setCurrentStep(this.$$currentStep.index);
	        
	        return idx;
	    };
	    
	    /**
	     * Set the current step.
	     * 
	     * @param {StepCtrl}|number
	     * 			step The step to set or its index.
	     * @returns {StepCtrl}|boolean - Step set of false if step not exists.
	     */
	    this.$setCurrentStep = function(step) {
	    	step = _.isFinite(step) ? this.$$steps[step] : _.includes(this.$$steps, step) ? step : null;
	    	
	    	if (!step) {
	    		return false;
	    	}
	    	
	    	var previousStepIdx = parseInt(this.$$currentStep.index);
	    	
	    	this.$$currentStep = _.isPlainObject(this.$$currentStep) ? this.$$currentStep : {};
	    	this.$$currentStep.index = step.$$stepNumber || _.indexOf(this.$$steps, step);
	    	this.$$currentStep.first = this.$$currentStep.index == 0;
	    	this.$$currentStep.last = this.$$currentStep.index == this.$$steps.length - 1;
	    	this.$$currentStep.lastButOne = this.$$currentStep.index == this.$$steps.length - 2;
	    	this.$$currentStep.label = step.label;
	    	this.$$currentStep.completedLabel = step.completedLabel;
	    	this.$$currentStep.subtitle = step.subtitle;
	    	this.$$currentStep.completedSubtitle = step.completedSubtitle;
        	this.$$currentStep.optional = step.optional;
        	this.$$currentStep.optionalLabel = step.optionalLabel;
        	
        	this.$onStepChange(this.$$currentStep.index);
        	this.$onStepChange(previousStepIdx);
        	
        	return step;
	    };
	    
	    this.$onStepChange = function(stepNumber) {
	    	var step = _.isFinite(stepNumber) ? this.$$steps[stepNumber] : null;
	    	
	    	if (!step) {
	    		return false;
	    	}
	    	
	    	step.$completed = this.isCompleted(stepNumber);
	    	step.$active = this.isActive(stepNumber);
	    };
	    
	    /**
		 * Complete the current step and move one to the next. Using this method on
		 * editable $$steps (in linear stepper) it will search by the next step
		 * without "completed" state to move. When invoked it dispatch the event
		 * onstepcomplete to the step element.
		 * 
		 * @returns boolean - True if move and false if not move (e.g. On the last
		 *          step)
		 */
	    this.next = function () {
	        if (this.$$currentStep.index < this.$$steps.length) {
	            this.clearError();
	            this.$setCurrentStep(this.$$currentStep.index + 1);
	            this.clearFeedback();
	            return true;
	        }
	        return false;
	    };
	    
	    /**
		 * Move to the previous step without change the state of current step. Using
		 * this method in linear stepper it will check if previous step is editable
		 * to move.
		 * 
		 * @returns boolean - True if move and false if not move (e.g. On the first
		 *          step)
		 */
	    this.back = function () {
	        if (this.$$currentStep.index > 0) {
	            this.clearError();
	            this.$setCurrentStep(this.$$currentStep.index - 1);
	            this.clearFeedback();
	            return true;
	        }
	        return false;
	    };
	    
	    /**
		 * Move to the next step without change the state of current step. This
		 * method works only in optional $$steps.
		 * 
		 * @returns boolean - True if move and false if not move (e.g. On
		 *          non-optional step)
		 */
	    this.skip = function () {
	        var step = this.$$steps[this.$$currentStep.index];
	        if (step.optional) {
	        	this.$setCurrentStep(this.$$currentStep.index + 1);
	            this.clearFeedback();
	            return true;
	        }
	        return false;
	    };
	    
	    /**
		 * Defines the current step state to "error" and shows the message parameter
		 * on title message element.When invoked it dispatch the event onsteperror
		 * to the step element.
		 * 
		 * @param {string}
		 *            message The error message
		 */
	    this.error = function (message) {
	        var step = this.$$steps[this.$$currentStep.index];
	        this.$$currentStep.hasError = step.hasError = true;
	        this.$$currentStep.message = step.message = message;
	        this.clearFeedback();
	    };
	    
	    /**
		 * Defines the current step state to "normal" and removes the message
		 * parameter on title message element.
		 */
	    this.clearError = function () {
	        var step = this.$$steps[this.$$currentStep.index];
	        this.$$currentStep.hasError = step.hasError = false;
	    };
	    
	    /**
		 * Move "active" to specified step id parameter. The id used as reference is
		 * the integer number shown on the label of each step (e.g. 2).
		 * 
		 * @param {number}
		 *            stepNumber (description)
		 * @returns boolean - True if move and false if not move (e.g. On id not
		 *          found)
		 */
	    this.goto = function (stepNumber) {
	        if (stepNumber < this.$$steps.length) {
	            this.$setCurrentStep(stepNumber);
	            this.clearFeedback();
	            return true;
	        }
	        return false;
	    };
	    
	    /**
		 * Shows a feedback message and a loading indicador.
		 * 
		 * @param {string}
		 *            [message] The feedbackMessage
		 */
	    this.showFeedback = function (message) {
	        this.hasFeedback = true;
	        this.feedbackMessage = message;
	    };
	    
	    /**
		 * Removes the feedback.
		 */
	    this.clearFeedback = function () {
	        this.hasFeedback = false;
	    };
	    
	    this.isCompleted = function (stepNumber) {
	        return this.linear && stepNumber < this.$$currentStep.index;
	    };
	    
	    this.isActive = function (stepNumber) {
	        return stepNumber === this.$$currentStep.index;
	    };
    }
})();