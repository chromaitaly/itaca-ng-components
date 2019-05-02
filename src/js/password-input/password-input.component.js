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
        	ngChange: "&",
        	mdNoAsterisk: "<?",
        	autocomplete: "@?"
        },
        controller: PasswordInputCtrl,
        templateUrl: "/tpls/password-input/password-input.tpl"
	});

	/* @ngInject */
	function PasswordInputCtrl($scope, StringUtils) {
		var ctrl = this;
		
		this.$onInit = function() {
			ctrl.containerClass = ctrl.containerClass || "md-block";
			ctrl.inputName = ctrl.inputName || "password";
			ctrl.iconClass = _.isNil(ctrl.iconClass) || StringUtils.isBoolean(ctrl.iconClass) && StringUtils.toBoolean(ctrl.iconClass) ? "mdi mdi-key md-24" : _.isNil(StringUtils.toBoolean(ctrl.iconClass)) ? ctrl.iconClass : StringUtils.toBoolean(ctrl.iconClass);
			ctrl.showIconClass = _.isNil(ctrl.showIconClass) || StringUtils.isBoolean(ctrl.showIconClass) && StringUtils.toBoolean(ctrl.showIconClass) ? "mdi mdi-eye md-24" : _.isNil(StringUtils.toBoolean(ctrl.showIconClass)) ? ctrl.showIconClass : StringUtils.toBoolean(ctrl.showIconClass);
			ctrl.hideIconClass = _.isNil(ctrl.hideIconClass) || StringUtils.isBoolean(ctrl.hideIconClass) && StringUtils.toBoolean(ctrl.hideIconClass) ? "mdi mdi-eye-off md-24" : _.isNil(StringUtils.toBoolean(ctrl.hideIconClass)) ? ctrl.hideIconClass : StringUtils.toBoolean(ctrl.hideIconClass);
			ctrl.mdNoAsterisk = _.isBoolean(ctrl.mdNoAsterisk) ? ctrl.mdNoAsterisk : false;
		};
	}
})();