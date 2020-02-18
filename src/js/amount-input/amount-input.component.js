(function() {
	"use strict";
	
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
			hideIcon: "<?",
			allowNegative: "<?",
			errorMessages: "<?",
			ngDisabled: "<?",
			updateOn: "@",
			onChange: "&"
	    },
	    controller: AmountInputCtrl,
	    templateUrl: "/tpls/amount-input/amount-input.tpl"
	});

	/* @ngInject */
	function AmountInputCtrl($scope, REGEXP) {
	   var ctrl = this;
	   
	   this.REGEXP = REGEXP;
	   
	   this.$onInit = function() {
//		   this.amount = _.isPlainObject(this.amount) ? this.amount : {};
		   this.inputName = this.inputName || "amount";
		   this.allowNegative = _.isBoolean(this.allowNegative) ? this.allowNegative : false;
		   this.ngMin = this.ngMin < 0 && !this.allowNegative ? 0 : this.ngMin;
		   this.ngStep = _.isFinite(this.ngStep) ? this.ngStep : this.amountType && this.amountType == "PERCENTAGE" ? 1 : 0.01;
		   
		   this.ngDisabled = _.isBoolean(this.ngDisabled) ? this.ngDisabled : false;
	   };
	   
	   this.$onChanges = function(changesObj) {
		   if (changesObj.updateOn) {
			 this.$initUpdateMode();
		   } 
		   
		   if (changesObj.amountType) {
			   this.$initType();
		   }
		   
		   if (changesObj.amountCurrency) {
			   this.$initCurrency();
		   }
	   };
	   
	   this.$initType = function() {		
		   var amount = this.ngModel || {};
		   amount.type = this.amountType;
		   
		   this.ngModelCtrl.$setViewValue(amount);
	   };
	   
	   this.$initCurrency = function() {		
		   var amount = this.ngModel || {};
		   amount.currency = this.amountCurrency;
		   
		   this.ngModelCtrl.$setViewValue(amount);
	   };
	   
	   this.$initUpdateMode = function() {
		   this.updateOn = _.includes(["default", "blur"], this.updateOn) ? this.updateOn : "default";
	   };
	   
	   this.$onChange = function() {
		   this.ngModelCtrl.$setViewValue(this.ngModel);
		   this.onChange && this.onChange();
	   };
	}
})();