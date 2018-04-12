/**
 * People Input
 */
(function() {
	'use strict';
	
	angular.module("itaca.components").component('chPasswordInput', {
        require: {
        	ngModelCtrl: "ngModel"
        },
		bindings: {
			ngModel: "=",
			containerClass: "@?",
        	inputLabel: "@?",
        	inputName: "@?",
        	iconClass: "@?",
        	showIconClass: "@?",
        	hideIconClass: "@?",
        	errorMessages: "<?",
        	ngRequired: "<?",
        	ngDisabled: "<?",
        	ngReadonly: "<?",
        	mdNoAsterisk: "<?",
        	
        },
        controller: PasswordInputCtrl,
        templateUrl: "/tpls/password-input/password-input.tpl"
	});

	/* @ngInject */
	function PasswordInputCtrl($scope) {
		var ctrl = this;
		
		this.$onInit = function() {
			ctrl.containerClass = ctrl.containerClass || "md-block";
			ctrl.inputName = ctrl.inputName || "password";
			ctrl.iconClass = _.isNil(ctrl.iconClass) || _.isBoolean(ctrl.iconClass) && ctrl.iconClass ? "mdi mdi-key md-24" : ctrl.iconClass;
			ctrl.showIconClass = _.isNil(ctrl.showIconClass) || _.isBoolean(ctrl.showIconClass) && ctrl.showIconClass ? "mdi mdi-eye md-24" : ctrl.showIconClass;
			ctrl.hideIconClass = _.isNil(ctrl.hideIconClass) || _.isBoolean(ctrl.hideIconClass) && ctrl.hideIconClass ? "mdi mdi-eye-off md-24" : ctrl.hideIconClass;
			ctrl.mdNoAsterisk = _.isBoolean(ctrl.mdNoAsterisk) ? ctrl.mdNoAsterisk : false;
		};
	}
})();