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
			onChange: "&",
			autofocus: "<"
	    },
	    controller: AmountInputCtrl,
	    templateUrl: "/tpls/amount-input/amount-input.tpl"
	});

	/* @ngInject */
	function AmountInputCtrl($scope, $element, REGEXP) {
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
	   
	   this.$postLink = function() {
		   if (this.autofocus) {
			   $element[0].querySelector("input").focus();
		   }
	   };
	   
	   this.$initType = function() {	
		   if (!this.amountType) {
			   return;
		   }
		   
		   var amount = this.ngModel || {};
		   amount.type = this.amountType;
		   
		   this.ngModelCtrl.$setViewValue(amount);
	   };
	   
	   this.$initCurrency = function() {
		   if (!this.amountCurrency) {
			   return;
		   }
		   
		   var amount = this.ngModel || {};
		   amount.currency = this.amountCurrency;
		   
		   this.ngModelCtrl.$setViewValue(amount);
	   };
	   
	   this.$initUpdateMode = function() {
		   this.updateOn = this.updateOn || "default";
	   };
	   
	   this.$onChange = function() {
		   this.ngModelCtrl.$setViewValue(this.ngModel);
		   this.onChange && this.onChange();
	   };
	}
})();