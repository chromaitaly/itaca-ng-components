(function() {
	'use strict';
	
	angular.module('itaca.components').component('chPaymentOptionEdit', {
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
			sizeTitle: "@?",
			frequencyTitle: "@?",
			minLengthTitle: "@?",
			amountTitle: "@?",
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
		
		this.$onInit = function() {
			ctrl.$$paymentOption = angular.copy(ctrl.paymentOption || {});
		};
		
		this.$postLink = function() {
			ctrl.$initLengths();
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
				ctrl.$$frequencies.push({value: frequency, disabled: _.includes(ctrl.disabledSizes, frequency) && !(ctrl.paymentOption && ctrl.paymentOption.frequency == frequency)});
			});
		};
		
		this.$initLengths = function() {
			ctrl.$$lengths = rangeFilter([], 5, 1, 1, function(i) {
				return {value: i, disabled: _.includes(ctrl.disabledLengths, i) && !(ctrl.paymentOption && ctrl.paymentOption.minLength == i)};
			});
			
			ctrl.$manageManualMinLength();
		};
		
		this.$toggleManualMinLength = function(open) {
			var isManual = _.isBoolean(open) ? open : !ctrl.$$manualMinLength;
			ctrl.$checkMinLength();
			
			if (!isManual) {
				// prima di passare alla select, verifico che la size attuale
				// sia inclusa nelle opzioni valide ed eventualmente lo setto
				// alla prima valida (se non ce ne sono, resto sull'input)
				var current = ctrl.$$paymentOption ? ctrl.$$paymentOption.minLength : null;
				
				if (!_.some(ctrl.$$lengths, {"value": current, disabled: false})) {				
					var firstValid = _.find(ctrl.$$lengths, ["disabled", false]);
					
					if (_.isNil(firstValid)) {
						isManual = true;
					
					} else {
						ctrl.$$paymentOption = ctrl.$$paymentOption || {};
						ctrl.$$paymentOption.minLength = firstValid.value;
					}
				}				
			}
			
			ctrl.$$manualMinLength = isManual;
			
			return ctrl.$$manualMinLength;
		}
		
		this.$manageManualMinLength = function() {
			if (!ctrl.$$paymentOption || !ctrl.$$paymentOption.minLength) {
				return ctrl.$toggleManualMinLength(false);
			}
			
			return ctrl.$toggleManualMinLength(!_.some(ctrl.$$lengths, ["value", ctrl.$$paymentOption.minLength]));			
		};
		
		this.$initManualMinLengthValidator = function() {
			if (!$scope.paymentOptionForm) {
				return;
			}
			
			var minLengthModelCtrl = $scope.paymentOptionForm.minLength;
			
			if (!minLengthModelCtrl) {
				return;
			}
			
			if (!minLengthModelCtrl.$validators.exists) {
				minLengthModelCtrl.$validators.exists = function(modelValue, viewValue) {
					if (!modelValue || isNaN(modelValue)) {
						return true;
					}
					
					var num = Number(modelValue);
					
					return !(_.includes(ctrl.disabledSizes, num) && !(ctrl.paymentOption && ctrl.paymentOption.minLength == num));
				};
			}
		};
		
		this.$checkMinLength = function() {
			if (!$scope.paymentOptionForm) {
				return;
			}
			
			var minLengthModelCtrl = $scope.paymentOptionForm.minLength;
			
			if (!minLengthModelCtrl) {
				return;
			}
			
			ctrl.$initManualMinLengthValidator();
			
			minLengthModelCtrl.$validate();
		};
		
		this.$cancel = function(ev) {
			ctrl.onCancel && ctrl.onCancel({$event: ev});			
		};
		
		this.$confirm = function(ev) {
			ctrl.$checkMinLength();
			
			var form = $scope.paymentOptionForm;
			form.$setSubmitted();
			
			if (form.$invalid) {
				FormUtils.focusFirstInvalid(form.$name);
				return false;
			}
			
			ctrl.onSave && ctrl.onSave({$event: ev, $paymentOption: ctrl.$$paymentOption});
		};	
	}
})();