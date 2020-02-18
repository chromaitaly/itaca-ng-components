/**
 * Time picker button
 */
(function() {
	"use strict";
	
	angular.module("itaca.components").component("chTimePicker", {
        require: {
        	ngModelCtrl: "ngModel" 
        },
        bindings: {
        	buttonClass: "@",
        	wrapperClass: "@",
        	showIcon: "<?",
        	iconClass: "@",
        	label: "@",
        	hideLabel: "<?",
        	labelPosition: "@",
        	tooltip: "@",
        	ngModel: "=",
        	hideValue: "<?",
    		useUtc: "<?",
    		fullScreen: "<?",
    		onClose: "&?",
    		ngRequired: "<?",
    		ngDisabled: "<?",
    		ngReadonly: "<?",
    		size: "@"
        },
        controller: TimePickerTriggerCtrl,
        templateUrl: "/tpls/time-picker/time-picker-trigger.tpl"
	});

	/* @ngInject */
	function TimePickerTriggerCtrl($scope, $element, $mdPanel) {
		var ctrl = this;
		
		this.$onInit = function() {
			ctrl.labelPosition = _.includes(["top", "left"], ctrl.labelPosition) ? ctrl.labelPosition : "top";
			ctrl.showIcon = _.isBoolean(ctrl.showIcon) ? ctrl.showIcon : false;
			ctrl.hideLabel = _.isBoolean(ctrl.hideLabel) ? ctrl.hideLabel : false;
			ctrl.size = _.includes(["small", "medium", "big"], ctrl.size) ? ctrl.size : "big";
			ctrl.buttonClass = ctrl.buttonClass || "only-border";
			ctrl.fullScreen = _.isBoolean(ctrl.fullScreen) ? ctrl.fullScreen : false;
		};
	
		this.$onChange = function() {
			if(changesObj.ngModel){
        		ctrl.onClose && ctrl.onClose();
        	}
		};
	}
})();