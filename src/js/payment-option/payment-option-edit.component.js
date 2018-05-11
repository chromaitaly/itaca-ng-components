(function() {
	"use strict";
	
	angular.module("itaca.components").component("chPaymentOptionEdit", {
		bindings: {
			paymentOption: "<",
			sizes: "<?",
			disabledSizes: "<?",
			frequencies: "<?",
			disabledFrequencies: "<?",
			lengths: "<?",
			disabledLengths: "<?",
			amountType: "@?",
			title: "@?",
			subtitle: "@?",
			sizeTitle: "@?",
			sizeSubtitle: "@?",
			frequencyTitle: "@?",
			frequencySubitle: "@?",
			lengthTitle: "@?",
			lengthSubtitle: "@?",
			amountTitle: "@?",
			amountSubtitle: "@?",
			onSave: "&?",
			onCancel: "&?"
		},
		controller: PaymentOptionEditCtrl,
		templateUrl: "/tpls/payment-option/payment-option-edit.tpl"
	});
	
	 /* @ngInject */
	function PaymentOptionEditCtrl($scope, REGEXP, rangeFilter, FormUtils) {
		var ctrl = this;
		
		this.$$REGEXP = REGEXP;
		
		this.$$defaultSizes = ["SINGLE", "PER_PERSON", "PER_ADULT", "PER_BOY", "PER_CHILD", "PER_KID"];
		this.$$defaultFrequencies = ["LUMP_SUM", "DAILY", "NIGHTLY", "WEEKLY", "MONTHLY", "YEARLY"];
		this.$$minLengthUnits = ["DAYS", "WEEKS", "MONTHS", "YEARS"];
		
		this.$onInit = function() {
			ctrl.$$paymentOption = angular.copy(ctrl.paymentOption || {});
		};
		
		this.$postLink = function() {
			ctrl.$initSizes();
			ctrl.$initFrequencies();
		};
		
		this.$onChanges = function(changesObj) {
			if (changesObj.discount) {	
				ctrl.$$paymentOption = angular.copy(ctrl.paymentOption || {});
			}
			
			if (changesObj.sizes || changesObj.disabledSizes) {
				ctrl.$initSizes();
			}
			
			if (changesObj.frequencies || changesObj.disabledFrequencies) {
				ctrl.$initFrequencies();
			}
			
			if (changesObj.disabledLengths) {
				ctrl.$initLengths();
			}
		};
		
		this.$initSizes = function() {
			var sizes = angular.copy(ctrl.$$defaultSizes);
			if (!_.isEmpty(ctrl.sizes)) {
				sizes = _.intersection(ctrl.$$defaultSizes, ctrl.sizes);
			}
			
			ctrl.$$sizes = [];
			
			_.forEach(sizes, function(size) {
				ctrl.$$sizes.push({value: size, disabled: _.includes(ctrl.disabledSizes, size) && !(ctrl.paymentOption && ctrl.paymentOption.size == size)});
			});
		};
		
		this.$initFrequencies = function() {
			var frequencies = angular.copy(ctrl.$$defaultFrequencies);
			if (!_.isEmpty(ctrl.frequencies)) {
				frequencies = _.intersection(ctrl.$$defaultFrequencies, ctrl.frequencies);
			}
			
			ctrl.$$frequencies = [];
			
			_.forEach(frequencies, function(frequency) {
				ctrl.$$frequencies.push({value: frequency, disabled: _.includes(ctrl.disabledFrequencies, frequency) && !(ctrl.paymentOption && ctrl.paymentOption.frequency == frequency)});
			});
		};
		
		this.$onFrequencyChange = function() {
			switch(ctrl.$$paymentOption.frequency) {
			case "WEEKLY":
				ctrl.$$disabledMinLengthUnits = ["DAYS"];
				break;
			case "MONTHLY":
				ctrl.$$disabledMinLengthUnits = ["DAYS", "WEEKS"];
				break;
			case "YEARLY":
				ctrl.$$disabledMinLengthUnits = ["DAYS", "WEEKS", "MONTHS"];
				break;
			default: 
				ctrl.$$disabledMinLengthUnits = [];
				break;
			}
			
			if (_.isPlainObject(ctrl.$$paymentOption.minLength) && _.includes(ctrl.$$disabledMinLengthUnits, ctrl.$$paymentOption.minLength.unit)) {
				ctrl.$$paymentOption.minLength.unit = _.difference(ctrl.$$minLengthUnits, ctrl.$$disabledMinLengthUnits)[0];
			}
		};
		
		this.$cancel = function(ev) {
			ctrl.onCancel && ctrl.onCancel({$event: ev});			
		};
		
		this.$confirm = function(ev) {
			var form = $scope.chPaymentOptionForm;
			form.$setSubmitted();
			
			if (form.$invalid) {
				FormUtils.focusFirstInvalid(form.$name);
				return false;
			}
			
			ctrl.onSave && ctrl.onSave({$event: ev, $paymentOption: ctrl.$$paymentOption});
		};	
	}
})();