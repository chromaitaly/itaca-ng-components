(function() {
	'use strict';
	
	angular.module("itaca.components").component("chSteppers", {
		transclude: true,
		bindings: {
			currentStep: "<?", //?
			canContinue: "<?",
			hasConfirm: "<?",
			backFn: "&?",
			nextFn: "&?",
			confirmFn: "&?",
			previousFn: "&?",
			bgClass: "@",
			isFixed: "<?",
			backLabel: "@",
			stateParams: "<?",
    	},
		controller: SteppersCtrl,
		template: 
			"<div class=\"ch-steppers-container {{$ctrl.bgClass}}\" ng-class=\"{'fixed': $ctrl.isFixed}\">" +
				"<div ng-transclude></div>" +
				"<div class=\"ch-steppers-action layout-row layout-wrap md-padding no-padding-top\">" +
					"<div layout=\"column\" flex-xs flex-sm>" +
						"<md-button class=\"only-border md-button\" ng-click=\"$ctrl.$back()\" aria-label=\"go to back\">" +
							"<md-icon ng-if=\"$ctrl.action.hasBack\" class=\"mdi material-icons mdi-chevron-left\"></md-icon>" +
							"<span ng-if=\"$ctrl.action.hasBack\" translate=\"common.back\"></span>" +
							"<span ng-if=\"!$ctrl.action.hasBack\">{{$ctrl.backLabel}}</span>" +
						"</md-button>" +
					"</div>" +
					"<div flex hide show-gt-sm></div>" +
					"<div layout=\"column\" flex-xs flex-sm>" +
						"<md-button ng-if=\"$ctrl.action.hasNext || (!$ctrl.action.hasNext && $ctrl.action.hasConfirm)\" ng-class=\"!$ctrl.action.hasNext && $ctrl.action.hasConfirm ? 'bg-success text-white layout-padding' : 'md-primary md-raised'\" ng-click=\"$ctrl.$next()\" aria-label=\"go to next\" ng-disabled=\"!$ctrl.action.canContinue\">" +
							"<span ng-if=\"$ctrl.action.hasNext\">" +
								"<span translate=\"common.next.step\"></span>" +
								"<md-icon class=\"mdi material-icons mdi-chevron-right\"></md-icon>" +
							"</span>" +
							"<span ng-if=\"!$ctrl.action.hasNext && $ctrl.action.hasConfirm\">" +
								"<md-icon class=\"mdi material-icons mdi-checkbox-marked-circle-outline text-white\"></md-icon>" +
								"<span translate=\"common.confirm\"></span>" +
							"</span>" +
						"</md-button>" +
					"</div>" +
				"</div>" +
			"</div>" 
	});
	
	 /* @ngInject */
	function SteppersCtrl($scope, $q, $attrs, $translate, $state, $mdComponentRegistry, AppOptions) {
		var ctrl = this;
		
    	this.$onInit = function(){
    		ctrl.action = {
				canContinue: _.isBoolean(ctrl.canContinue) ? ctrl.canContinue : true,
				currentStep: ctrl.currentStep,
				isComplete: false,
				hasConfirm:  _.isBoolean(ctrl.hasConfirm) ? ctrl.hasConfirm : false,
				hasNext: false,
				hasBack: false,
    		};
    		
    		ctrl.stateParams = ctrl.stateParams || {};
    		
    		ctrl.bgClass = ctrl.bgClass || "";
    		
    		ctrl.steppers = [];
    		
    		ctrl.isFixed = _.isBoolean(ctrl.isFixed) ? ctrl.isFixed : false;
    		
    		ctrl.$initWatchers();
    		
    		$translate(["error.validation.fields.text", "common.back.list"]).then(function(translate){
    			ctrl.errorMessage = ctrl.errorMessage || translate["error.validation.fields.text"];
    			ctrl.backLabel = ctrl.backLabel || translate["common.back.list"];
    		});
    		
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
    	
    	this.$initStep = function(step){
    		ctrl.steppers.push(step);
    		step.$index = ctrl.steppers.length;
    		
    		if(step.view == $state.current.name){
    			// setto lo step come corrente
    			ctrl.action.currentStep = step.$index;
    			
    			// se lo step è disabilitato torno al primo step disponibile
    			if(step.isDisabled){
    				var closestActiveStep = _.findLast(ctrl.steppers, function(s){
    					return !s.isDisabled && s.$index < step.$index;
    				});
    				
    				if(closestActiveStep){
    					ctrl.$goToStep(closestActiveStep);
    				}
    			}
			}
    	};
    	
    	this.$initWatchers = function() {
    		$scope.$watch(function(){
    			return $state.current.name;
    		}, function(newVal, oldVal){
    			
    			ctrl.action.currentStep = _.findIndex(ctrl.steppers,function(s){return s.view == newVal;});
    			ctrl.action.currentStep += 1;
    			
    			ctrl.action.hasNext = ctrl.action.currentStep < ctrl.steppers.length;
        		
    			ctrl.action.hasBack = ctrl.action.currentStep > 1;
    		});
    		
    	};

    	this.$next = function(){
    		if(ctrl.action.canContinue){
    			
    			// check if next step exist
    			if(ctrl.action.hasNext){
    				
    				var currentStep = ctrl.steppers[ctrl.action.currentStep-1];
    				
	    			// execute nextFn if exist
	    			if(ctrl.nextFn){
	    				$q.when(ctrl.nextFn()).then(function(){
	    					currentStep.error = false;
	    					currentStep.errorMessage = null;
	    				}, function(){
	    					currentStep.error = true;
	    					currentStep.errorMessage = ctrl.errorMessage;
	    				
	    				}).finally(function() {
	    					//go to state
	    					ctrl.stateParams = angular.merge({}, ctrl.steppers[ctrl.action.currentStep].params, ctrl.stateParams);
	    					$state.go(ctrl.steppers[ctrl.action.currentStep].view, ctrl.stateParams);
	    				});
	    			}
	    			
	    		}
			}
    	};
    	
    	this.$confirm = function(isContinue){
			ctrl.confirmFn && ctrl.confirmFn({$isContinue: isContinue});
    	};
    	
    	this.$back = function(){
    		// check if previus step exist
    		if(ctrl.action.hasBack){
    			// execute backFn if exist
    			if(ctrl.backFn ){
    				 ctrl.backFn();
    			}
    			//go to state
    			ctrl.stateParams = angular.merge({}, ctrl.steppers[(ctrl.action.currentStep-2)].params, ctrl.stateParams);
				$state.go(ctrl.steppers[(ctrl.action.currentStep-2)].view, ctrl.stateParams);
    			
    		} else {
    			ctrl.previousFn && ctrl.previousFn();
    		}
    	};
    	
    	this.$goToStep = function(step){
    		var currentStep = ctrl.steppers[ctrl.action.currentStep-1];
    		
    		if(currentStep.$index == step.$index){
    			return;
    		}
    		
    		
    		// execute nextFn if exist
			if(ctrl.nextFn){
				$q.when(ctrl.nextFn()).then(function(){
					currentStep.error = false;
					currentStep.errorMessage = null;
				}, function(){
					currentStep.error = true;
					currentStep.errorMessage = ctrl.errorMessage;
				
				});
			}
    		
			var idx = ctrl.steppers.indexOf(step);
			
    		if(idx && idx < ctrl.steppers.length){
    			// go to selected step
    			ctrl.stateParams = angular.merge({}, step.params, ctrl.stateParams);
				$state.go(step.view, ctrl.stateParams);
    			
    		} else if(idx && idx > ctrl.steppers.length) {
    			// go to last step
    			ctrl.stateParams = angular.merge({}, ctrl.steppers[ctrl.steppers.length].params, ctrl.stateParams);
				$state.go(ctrl.steppers[ctrl.steppers.length].view, ctrl.stateParams);
    			
    		} else {
    			// go to first step
    			ctrl.stateParams = angular.merge({}, ctrl.steppers[0].params, ctrl.stateParams);
				$state.go(ctrl.steppers[0].view, ctrl.stateParams);
    		}
    	};
    	
    	this.$error = function (message, id) {
    		var currentStep = ctrl.steppers[id ? (id-1) : (ctrl.action.currentStep-1)];
    		
    		currentStep.error = true;
			currentStep.errorMessage = message || ctrl.errorMessage;
 	    };
 	    
 	    this.$clearError = function (id) {
 	    	var currentStep = ctrl.steppers[id ? (id-1) : (ctrl.action.currentStep-1)];
 	    	
 	    	currentStep.error = false;
			currentStep.errorMessage = null;
	    };

	}
})();