/**
 * Componente per la creazione di carte di credito
 * richiede angular-credit-cards
 * è richiesto il "novalidate" nei form altrimenti va in errore
 * @returns
 */
(function() {
	"use strict";
	
	angular.module("itaca.components").component("creditCardEdit", {
		bindings: {
			circuits: "<",
			paymentMethod: "<?",
			paymentType: "<?",
			onPaymentTypeChange: "&?",
			ngRequired: "<?"
		},
		controller: CreditCardEditCtrl,
		templateUrl: "/tpls/credit-card/credit-card-edit.tpl"
	});
	
	 /* @ngInject */
	function CreditCardEditCtrl($scope, $mdMedia, $translate, AppOptions, Dialog, REGEXP, IconUtils) {
		var ctrl = this;
		
		this.$mdMedia = $mdMedia;
		this.REGEXP = REGEXP;
		
		//circuiti accettati da angular-credit-cards
		this.$$types = {
			"Visa"				:"VISA",
			"MasterCard"		:"MASTERCARD",
			"Maestro"			:"MAESTRO",
			"American Express"	:"AMEX",
			"Diners Club"		:"DINERS_CLUB",
			"Discover"			:"DISCOVER",
			"JCB"				:"JCB",
			"UnionPay"			:"UNION_PAY"
		};
		
		this.$onInit = function(){
			
			ctrl.ngRequired = _.isBoolean(ctrl.ngRequired) ? ctrl.ngRequired : true;
			
			ctrl.paymentMethod = ctrl.paymentMethod || {};
			
			ctrl.$$paymentIcons = IconUtils.paymentIcons();
			
			//precompilo il circuito se non presente
			if(!ctrl.paymentMethod.circuit){
				ctrl.paymentMethod.circuit =  !_.isEmpty(ctrl.circuits) ? ctrl.circuits[0] : null;
			}
			
			ctrl.$createMonths();
			ctrl.$createYears();
			ctrl.$generateValidTypes();
			
		};
		
		this.$onChanges = function(changesObj){
			if(changesObj.circuits){
				ctrl.$generateValidTypes();
			}
		};
		
		this.$generateValidTypes = function(){
			ctrl.types = {};
			_.forEach(ctrl.circuits, function(c){
				_.forEach(ctrl.$$types, function(v,k){
					if(v == c.circuit){
						ctrl.types[k] = v;
					}
				});
			});
		};
		
		this.$updateMethod = function(ccType){
			if(!ccType){
				return;
			}
			
			var _cc = _.find(ctrl.circuits, ["circuit", ccType]);
			if(_cc){
				ctrl.paymentType = _cc.type;
				ctrl.paymentMethod.type = _cc.type;
				ctrl.paymentMethod.circuit = _cc.circuit;
				ctrl.onPaymentTypeChange && ctrl.onPaymentTypeChange({$type: ctrl.paymentType});
			}
		};
		
		this.$createMonths = function(){
			ctrl.$$months = _.range(12);
		};
		
		this.$createYears = function() {
			ctrl.$$years = [];
			
			var now = moment();
			
			for (var i = 0; i < 15; i++) {
				ctrl.$$years.push(now.year());
				now.add(1, "years");
			}
		};
	}
})();