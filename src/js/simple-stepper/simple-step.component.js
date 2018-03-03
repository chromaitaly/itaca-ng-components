(function() {
    'use strict';
    
    angular.module("itaca.components").component("chSimpleStep", {
    	transclude: true,
    	require: {
    		chStepperCtrl: '^^chSimpleStepper',
		},
    	bindings: {
    		label: '@?',
            optional: '<',
            optionalLabel: '@',
            ngDisabled: "<",
            iconClass: "@",
            iconCompletedClass: "@",
    	},
		controller: StepCtrl,
		templateUrl: "/tpls/simple-stepper/simple-step.tpl"
    });
    
    /* @ngInject */
    function StepCtrl($element, $compile, $scope) {
    	var ctrl = this;	
    	
    	this.$onInit = function() {
    		this.$initWatchers();
    	};
       
        this.$postLink = function () {
            this.$$stepNumber = this.chStepperCtrl.$addStep(this);
        };
        
        this.isActive = function () {
        	return this.chStepperCtrl.isActiveStep(this);
        };
        
        this.$addOverlay = function () {
            var hasOverlay = !!$element.find('.ch-simple-step-body-overlay')[0];
           
            if (!hasOverlay) {
                var overlay = angular.element("<div class=\"ch-simple-step-body-overlay\"></div>\n<div class=\"ch-simple-step-body-loading\">\n<md-progress-circular md-mode=\"indeterminate\"></md-progress-circular>\n</div>");
                
                $compile(overlay)($scope);
                
                $element.find('.ch-simple-steppers-scope').append(overlay);
            }
        };
        
        this.$initWatchers = function() {
	        $scope.$watch(function () {
	            return ctrl.isActive();
	            
	        }, function (newVal, oldVal) {
	        	ctrl.$active = newVal;
	        	
	            if (newVal) {
	            	$element.addClass('md-active');
	                ctrl.$addOverlay();
	            }
	            else {
	            	$element.removeClass('md-active');
	            }
	        });
        }
    }
})();