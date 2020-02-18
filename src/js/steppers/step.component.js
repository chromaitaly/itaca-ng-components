(function() {
	"use strict";
	
	angular.module("itaca.components").component("chStepper", {
		require: {
			steppersCtrl: "^chSteppers"
		},
		bindings: {
			title: "@",
			subtitle: "@",
			view: "@",
			step: "<?",
			params: "<?",
			isDisabled: "<?",
			isSelectable: "<?",
    	},
		controller: StepperCtrl,
		template: 
			"<div>" +
				"<md-button class=\"text-initial text-wrap no-margin\"  ng-click=\"$ctrl.$goToStep()\" aria-label=\"go to back\" ng-disabled=\"$ctrl.step.isDisabled\">" +
//					"<div class=\"layout-padding layout-row layout-wrap no-padding row-1 layout-align-center-center\" ng-if=\"!$ctrl.step.error || ($ctrl.step.error && $ctrl.steppersCtrl.action.currentStep != $ctrl.step.$index)\">" +
					"<div class=\"layout-padding layout-row layout-wrap no-padding row-1 layout-align-center-center\" ng-if=\"!$ctrl.step.error\">" +
						"<div class=\"layout-column layout-align-center-center no-padding-bottom no-padding-right no-padding-top\">" +
							"<span class=\"no-padding\" ng-show=\"$ctrl.steppersCtrl.action.currentStep < $ctrl.step.$index\">" +
								"<span class=\"bg-gray-lighter circle-step text-bold text-gray-6\">{{::$ctrl.step.$index}}</span>" +
							"</span>" +
							"<span class=\"no-padding\" ng-show=\"$ctrl.steppersCtrl.action.currentStep == $ctrl.step.$index\">" +
								"<md-icon class=\"mdi material-icons md-32 mdi-pencil-circle text-success no-padding\"></md-icon> " +
							"</span>" +
							"<span class=\"no-padding\" ng-show=\"$ctrl.steppersCtrl.action.currentStep > $ctrl.step.$index\">" +
								"<md-icon class=\"mdi material-icons md-32 mdi-check-circle text-success no-padding\"></md-icon> " +
							"</span>" +
						"</div>" +
						"<div class=\"layout-align-center-start layout-column text-gray-3\">" +
							"<span ng-class=\"{'md-subhead text-bold row-1': $ctrl.steppersCtrl.action.currentStep == $ctrl.step.$index}\">{{$ctrl.step.title}}</span>" +
							"<small class=\"text-gray-6 hide show-gt-sm\" ng-if=\"$ctrl.step.subtitle\">{{$ctrl.step.subtitle}}</small>" +
						"</div>" +
					"</div>" +
//					"<div class=\"layout-padding layout-row layout-wrap no-padding row-1 layout-align-center-center\" ng-if=\"$ctrl.step.error && $ctrl.steppersCtrl.action.currentStep == $ctrl.step.$index\">" +
					"<div class=\"layout-padding layout-row layout-wrap no-padding row-1 layout-align-center-center\" ng-if=\"$ctrl.step.error\">" +
					"<div class=\"layout-column layout-align-center-center no-padding-bottom no-padding-right no-padding-top\">" +
							"<span class=\"no-padding\">" +
								"<span class=\"bg-danger text-white circle-step text-bold\">{{::$ctrl.step.$index}}</span>" +
							"</span>" +
						"</div>" +
						"<div class=\"layout-align-center-start layout-column text-danger\">" +
							"<span class=\"md-subhead text-bold row-1\">{{$ctrl.step.title}}</span>" +
							"<small class=\"text-gray-6 hide show-gt-sm\" ng-if=\"$ctrl.step.errorMessage\">{{$ctrl.step.errorMessage}}</small>" +
						"</div>" +
					"</div>" +
				"</md-button>" +
			"</div>" 
	});
	
	 /* @ngInject */
	function StepperCtrl($scope, $element, AppOptions) {
		var ctrl = this;
    	
    	this.$onInit = function(){
    		ctrl.step = ctrl.step ? ctrl.step : {
    			title: ctrl.title,
    			subtitle: ctrl.subtitle,
    			view: ctrl.view,
    			params: _.isNil(ctrl.params) ? null : ctrl.params,
    			isDisabled: _.isBoolean(ctrl.isDisabled) ? ctrl.isDisabled : false,
				isSelectable: _.isBoolean(ctrl.isSelectable) ? ctrl.isSelectable : true,
    		};
    		
    		ctrl.steppersCtrl.$initStep(ctrl.step);
    		
    		$element.addClass("flex layout-column " + (ctrl.step.$index == 1 ? "layout-align-center-start" : "layout-align-center-center"));
    	};
    	
    	this.$onChanges = function(changesObj){
    		if(changesObj.title || changesObj.subtitle || changesObj.params || changesObj.isDisabled || changesObj.isSelectable){
    			ctrl.$updateStep();
    		}
    	};
    	
    	this.$goToStep = function(){
    		ctrl.step.isSelectable && ctrl.steppersCtrl.$goToStep(ctrl.step);
    	};
    	
    	this.$updateStep = function(){
    		_.assign(ctrl.step, {
    			title: ctrl.title,
    			subtitle: ctrl.subtitle,
    			params: ctrl.params,
    			isDisabled: _.isBoolean(ctrl.isDisabled) ? ctrl.isDisabled : false,
				isSelectable: _.isBoolean(ctrl.isSelectable) ? ctrl.isSelectable : true,
    		});
    	};
    	
	}
})();