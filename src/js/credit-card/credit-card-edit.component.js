(function() {
	'use strict';
	
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
		
		/**
		 * Usa angular-credit-cards (da importare nel gruntjs)
		 */
		
		this.$mdMedia = $mdMedia;
		this.REGEXP = REGEXP;
		
		//circuiti accettati da angular-credit-cards
		this.$$ccType = {
			'Visa'				:'VISA',
			'Mastercard'		:'MASTERCARD',
			'Maestro'			:'MAESTRO',
			'American Express'	:'AMEX',
			'Diners Club'		:'DINERS_CLUB',
			'Discover'			:'DISCOVER',
			'JCB'				:'JCB',
			'UnionPay'			:'UNION_PAY'
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
			ctrl.$getCcType();
			
			ctrl.$initWatch();
			
		};
		
		this.$initWatch = function(){
			$scope.$watch('creditCardForm.number.ccNumberType', function(newVal, oldVal){
				var _cardType = _.find(ctrl.$$cardType, function(v,k){
					return k === newVal;
				});
				
				if(_cardType){
					var ct =_.find(ctrl.circuits, function(c){
						return c.circuit == _cardType;
					});
					
					ctrl.paymentMethod.circuit = ct ? ct.circuit : null;
					ctrl.$$updateMethod(ct.type);
				}
			});
		};
		
		this.$getCcType = function(){
			ctrl.$$cardType = [];
			_.forEach(ctrl.circuits, function(c){
				ctrl.$$validCcType[c.circuit] && ctrl.$$cardType.push(ctrl.$$validCcType[c.circuit]);
			});
		};
		
		this.$$updateMethod = function(type){
			if(!type){
				return;
			}
			
			ctrl.paymentType = type;
			ctrl.paymentMethod.type = type;
			ctrl.onPaymentTypeChange && ctrl.onPaymentTypeChange({$type: ctrl.paymentType});
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
		
		this.$cvvInfo = function(ev){
			$translate(['payment.cvv.question', 'payment.cvv.info', 'payment.cvv.amex.info']).then(function(translate){
				Dialog.showAlert(ev, translate['payment.cvv.question'], ctrl.paymentMethod.circuit == 'AMEX' ? translate['payment.cvv.amex.info'] :  translate['payment.cvv.info']);
			});
		};
	}
})();