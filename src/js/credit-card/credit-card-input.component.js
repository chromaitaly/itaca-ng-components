/**
 * Input per carte di credito
 * è richiesto il "novalidate" nei form altrimenti va in errore
 * @returns
 */
(function() {
	'use strict';
	
	angular.module("itaca.components").component("creditCardInput", {
		require: {
        	ngModelCtrl: 'ngModel' 
        },
		bindings: {
			ngModel: "=",
			types: "<",
			ngRequired: "<?",
			ngDisabled: "<?",
			onChange: "&?",
			
		},
		controller: CreditCardInputCtrl,
		template: 
			"<ng-form name=\"creditCardInputForm\" novalidate class=\"credit-card-input\">" +
				"<md-input-container class=\"md-block no-margin-bottom\">" +
					"<label><span translate=\"payment.card.number\"></span></label>" +
					"<md-icon class=\"{{$ctrl.$$icon}}\" style=\"position:absolute;\"></md-icon>" +
					"<input type=\"text\" name=\"number\" ng-model=\"$ctrl.ngModel\" ng-required=\"$ctrl.ngRequired\" ng-disabled=\"$ctrl.ngDisabled\" cc-format cc-number cc-eager-type  cc-type=\"{{$ctrl.$$types}}\">" +
					"<div class=\"text-gray-light text-italic\">" +
						"<md-icon class=\"mdi mdi-information-outline md-14\"></md-icon>" +
						"<small translate=\"payment.card.number.description\"></small>" +
					"</div>" +
					"<div ng-messages=\"creditCardInputForm.number.$error\">" +
						"<div ng-message=\"required\"><span translate=\"error.required\"></span></div>" +
						"<div ng-message=\"ccNumber\"><span translate=\"error.credit.card.invalid\"></span></div>" +
						"<div ng-message=\"ccNumberType\">" +
							"<span ng-if=\"creditCardInputForm.number.$ccEagerType\" translate=\"error.credit.card.type.invalid\" traslate-values=\"{type: creditCardInputForm.number.$ccEagerType}\"></span>" +
							"<span ng-if=\"!creditCardInputForm.number.$ccEagerType\" translate=\"error.credit.card.type.generics.invalid\"></span>" +
						"</div>" +
					"</div>" +
				"</md-input-container>" +
			"<ng-form>"
	});
	
	 /* @ngInject */
	function CreditCardInputCtrl($scope, $mdMedia, IconUtils) {
		var ctrl = this;
		
		this.$$paymentIcons = IconUtils.paymentIcons();
		
		this.$onInit = function(){
			ctrl.ngRequired = ctrl.ngRequired || false;
    		ctrl.ngDisabled = ctrl.ngDisabled || false;
    		ctrl.types = ctrl.types || null;
    		ctrl.$$types = _.keys(ctrl.types);
    		
    		ctrl.$$icon = 'mdi mdi-credit-card';
			
    		ctrl.$initWatch();
		};
		
		this.$onChanges = function(changesObj){
			if(changesObj.types){
				ctrl.$$types = _.keys(ctrl.types);
			}
		};
		
		this.$initWatch = function(){
			$scope.$watchCollection(function(){return $scope.creditCardInputForm.number}, function(newVal, oldVal){
				ctrl.$onChange(newVal);
			});
		};
		
		this.$onChange = function(model){
			ctrl.$adeguateIcon(model.$ccEagerType, model.$valid, model.$dirty);
			
			if(model.$ccType){
				ctrl.onChange && ctrl.onChange({$type: ctrl.types[model.$ccType]});
			}
		};
		
		this.$adeguateIcon = function(type, valid, dirty){
			ctrl.$$icon = valid || !dirty ? 'mdi mdi-credit-card text-gray-light material-icons' : 'mdi mdi-credit-card-off text-danger material-icons';
			ctrl.$$icon = type && ctrl.types[type] ? ctrl.$$paymentIcons[ctrl.types[type]] : ctrl.$$icon;
		};
	}
})();
		
		