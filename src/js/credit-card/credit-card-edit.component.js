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
		
		this.$mdMedia = $mdMedia;
		this.REGEXP = REGEXP;
		
		this.$onInit = function(){
			
			ctrl.ngRequired = _.isBoolean(ctrl.ngRequired) ? ctrl.ngRequired : true;
			
			ctrl.paymentMethod = ctrl.paymentMethod || {};
			
			ctrl.$$paymentIcons = IconUtils.paymentIcons();
			
			//preompilo il circuito se non presente
			ctrl.paymentMethod.circuit = ctrl.paymentMethod.circuit || ctrl.circuits[0];
			
			ctrl.$createMonths();
			ctrl.$createYears();
			
			ctrl.$initWatch();
			
		};
		
		this.$initWatch = function(){
			$scope.$watch(function(){return ctrl.paymentMethod.circuit;}, function(newVal, oldVal){
				ctrl.$$updateMethod();
			});
		};
		
		
		this.$$updateMethod = function(){
			var _cc = _.find(ctrl.circuits, function(c){
				return c.circuit == ctrl.paymentMethod.circuit;
			});
			
			if(_cc){
				ctrl.paymentType = _cc.type;
				ctrl.paymentMethod.type = _cc.type;
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
		
		this.$cvvInfo = function(ev){
			$translate(['payment.cvv.question', 'payment.cvv.info', 'payment.cvv.amex.info']).then(function(translate){
				Dialog.showAlert(ev, translate['payment.cvv.question'], ctrl.paymentMethod.circuit == 'AMEX' ? translate['payment.cvv.amex.info'] :  translate['payment.cvv.info']);
			});
		};
	}
})();