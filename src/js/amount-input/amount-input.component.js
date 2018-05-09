(function() {
	'use strict';
	
	angular.module("itaca.components").component('chAmountInput', {
		require: {
			ngModelCtrl: 'ngModel',
		},
		bindings: {
			ngModel: "<?",
			ngMin: "<?",
			ngStep: "<?",
			ngMax: "<?",
			amountType: "@",
			amountCurrency: "@",
			inputName: "@",
			label: "@",
			labelNoFloat: "<?",
			inputContainerClass: "@",
			ngRequired: "<?",
			ngDisabled: "<?",
			ngReadonly: "<?",
			allowNegative: "<?",
			errorMessages: "<?"
	    },
	    controller: AmountInputCtrl,
	    templateUrl: "/tpls/amount-input/amount-input.tpl"
	});

	/* @ngInject */
	function AmountInputCtrl($scope, REGEXP) {
	   var ctrl = this;
	   
	   this.$onInit = function() {
		   ctrl.ngModel = _.isPlainObject(ctrl.ngModel) ? ctrl.ngModel : {};
		   ctrl.inputName = ctrl.inputName || 'amount';
		   ctrl.allowNegative = _.isBoolean(ctrl.allowNegative) ? ctrl.allowNegative : false;
		   ctrl.ngMin = ctrl.ngMin < 0 && !ctrl.allowNegative ? 0 : ctrl.ngMin;
		   ctrl.ngStep = _.isFinite(ctrl.ngStep) ? ctrl.ngStep : 0.01; 
	   };
	   
	   this.$update = function() {
			ctrl.ngModelCtrl.$setViewValue(ctrl.ngModel);
		};	   
	}
})();