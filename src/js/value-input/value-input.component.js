(function() {
	'use strict';
	
	angular.module("itaca.components").component('chValueInput', {
		require: {
			ngModelCtrl: 'ngModel'
		},
		bindings: {
			ngModel: "<",
			counts: "<?", // ha precedenza su ngMin e ngMax
			disabledCounts: "<?",
			units: "<?",
			disabledUnits: "<?",
			hideUnit: "<?",
			ngMin: "<?", // viene ignorato se presente counts
			ngStep: "<?",
			ngMax: "<?", // viene ignorato se presente counts
			ngDisabled: "<?",
			ngReadonly: "<?",
			errorMessages: "<?"
		},
		controller: ValueInputCtrl,
		templateUrl: "/tpls/value-input/value-input.tpl"
	});
	
	function ValueInputCtrl($scope, rangeFilter) {
		var ctrl = this;
		
		this.$$defaultUnits = ["NUMBERS", "HOURS", "DAYS", "WEEKS", "MONTHS", "YEARS"];
		
		this.$onInit = function() {
			ctrl.ngModel = _.isPlainObject(ctrl.ngModel) ? ctrl.ngModel : {};
			
			ctrl.ngDisabled = _.isBoolean(ctrl.ngDisabled) ? ctrl.ngDisabled : false;
		};
		
		this.$postLink = function() {
			ctrl.$initCounts();
			ctrl.$initUnits();
		};
		
		this.$onChanges = function(changesObj) {
			if (changesObj.ngModel) {
				ctrl.ngModel = _.isPlainObject(ctrl.ngModel) ? ctrl.ngModel : {};
				
				if (changesObj.ngModel.isFirstChange()) {
					ctrl.$$initialValue = angular.copy(ctrl.ngModel); 
				}
			}			
			
			if (changesObj.counts || changesObj.disabledCounts || changesObj.ngMin || changesObj.ngStep || changesObj.ngMax) {
				ctrl.$initCounts();
			}
			
			if (changesObj.units || changesObj.disabledUnits) {
				ctrl.$initUnits();
			}
		};
		
		this.$initCounts = function() {
			var arr = []; 
			
			if (_.isArray(ctrl.counts) && !_.isEmpty(ctrl.counts)) {
				arr = angular.copy(ctrl.lengths);
			
			} else {
				var start = 1, end = 10, step = 1;
				
				if (ctrl.ngMin && _.isFinite(parseFloat(ctrl.ngMin))) {
					var $$min = parseFloat(ctrl.ngMin);
					start = $$min >= 0 ? $$min : start;
				}
				
				if (ctrl.ngStep && _.isFinite(parseFloat(ctrl.ngStep))) {
					step = parseFloat(ctrl.ngStep);
				}
				
				if (ctrl.ngMax && _.isFinite(parseFloat(ctrl.ngMax))) {
					end = parseFloat(ctrl.ngMax);
				}
				
				var size = end/step;
				size = size < 10 ? size : 10;
				
				arr = rangeFilter([], size, start, step);
			}
			
			ctrl.$$counts = _.map(arr, function(i) {
				return {value: i, disabled: _.includes(ctrl.disabledCounts, i) && !(ctrl.$$initialValue && ctrl.$$initialValue.count == i)};
			});
			
			ctrl.$manageManualCount();
		};
		
		this.$initUnits = function() {
			var units = angular.copy(ctrl.$$defaultUnits);
			if (!_.isEmpty(ctrl.units)) {
				units = _.intersection(ctrl.$$defaultUnits, ctrl.units);
			}
			
			ctrl.$$units = [];
			
			_.forEach(units, function(unit) {
				ctrl.$$units.push({value: unit, disabled: _.includes(ctrl.disabledUnits, unit) && !(ctrl.$$initialValue && ctrl.$$initialValue.unit == unit)});
			});
		};
		
		this.$toggleManualCount = function(open) {
			var isManual = _.isBoolean(open) ? open : !ctrl.$$manualCount;
			ctrl.$checkCount();
			
			if (!isManual) {
				// prima di passare alla select, verifico che il valore attuale
				// sia incluso nelle opzioni valide ed eventualmente lo setto
				// alla prima valida (se non ce ne sono, resto sull'input)
				var current = ctrl.ngModel ? ctrl.ngModel.count : null;
				
				if (!_.some(ctrl.$$counts, {"value": current, disabled: false})) {				
					var firstValid = _.find(ctrl.$$counts, ["disabled", false]);
					
					if (_.isNil(firstValid)) {
						isManual = true;
					
					} else {
						ctrl.ngModel = ctrl.ngModel || {};
						ctrl.ngModel.count = firstValid.value;
					}
				}				
			}
			
			ctrl.$$manualCount = isManual;
			
			return ctrl.$$manualCount;
		}
		
		this.$manageManualCount = function() {
			if (!ctrl.ngModel || !ctrl.ngModel.count) {
				return ctrl.$toggleManualCount(false);
			}
			
			return ctrl.$toggleManualCount(!_.some(ctrl.$$counts, ["value", ctrl.ngModel.count]));			
		};
		
		this.$checkCount = function() {
			if (!$scope.chValueForm) {
				return;
			}
			
			var countModelCtrl = $scope.chValueForm.minLength;
			
			if (!countModelCtrl) {
				return;
			}
			
			ctrl.$initManualCountValidator();
			
			countModelCtrl.$validate();
		};

		this.$initManualCountValidator = function() {
			if (!$scope.chValueForm) {
				return;
			}
			
			var countModelCtrl = $scope.chValueForm.count;
			
			if (!countModelCtrl) {
				return;
			}
			
			if (!countModelCtrl.$validators.exists) {
				countModelCtrl.$validators.exists = function(modelValue, viewValue) {
					if (!modelValue || isNaN(modelValue)) {
						return true;
					}
					
					var num = Number(modelValue);
					
					return !(_.includes(ctrl.disabledCounts, num) && !(ctrl.$$initialValue && ctrl.$$initialValue.count == num));
				};
			}
		};
		
		this.$update = function() {
			ctrl.ngModelCtrl.$setViewValue(ctrl.ngModel);
		};
	}
})();