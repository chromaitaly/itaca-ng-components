/**
 * Input per carte di credito
 * è richiesto il "novalidate" nei form altrimenti va in errore
 * @returns
 */
(function() {
	"use strict";
	
	angular.module("itaca.components").component("creditCardInput", {
		require: {
        	ngModelCtrl: "ngModel" 
        },
		bindings: {
			ngModel: "=",
			types: "<",
			ngRequired: "<?",
			ngDisabled: "<?",
			onChange: "&?",
			
		},
		controller: CreditCardInputCtrl,
		templateUrl: "/tpls/credit-card/credit-card-input.tpl"
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
    		
    		ctrl.$$icon = "mdi mdi-credit-card";
			
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
			ctrl.$$icon = valid || !dirty ? "mdi mdi-credit-card text-gray-light material-icons" : "mdi mdi-credit-card-off text-danger material-icons";
			ctrl.$$icon = type && ctrl.types[type] ? ctrl.$$paymentIcons[ctrl.types[type]] : ctrl.$$icon;
		};
	}
})();
		
		