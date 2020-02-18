(function() {
    "use strict";
    
    angular.module("itaca.components").component("chPaymentOption", {
    	bindings: {
    		paymentOption: "<",
    		frequencyLabel: "@",
    		sizeLabel: "@",
    		amountClass: "@",
    		discount: "<?",
    	},
		controller: PaymentOptionCtrl,
		templateUrl: "/tpls/payment-option/payment-option.tpl"
    });
    
    /* @ngInject */
    function PaymentOptionCtrl($scope){
    	var ctrl = this;
    	
    	this.$onInit = function(){
    		
    		if(ctrl.paymentOption.amount && ctrl.paymentOption.amount.finalAmount){
    			
    			ctrl.$$initialAmount = angular.copy(ctrl.paymentOption.amount.initialAmount || ctrl.paymentOption.amount.finalAmount);
    			ctrl.$$finalAmount = angular.copy(ctrl.paymentOption.amount.finalAmount);
    			ctrl.$applyDiscount();
    		}	
    	};
    	
    	this.$applyDiscount = function(){
    		if(ctrl.discount && ctrl.discount.finalAmount){
    			var discount = ctrl.discount.type != "PRICE" ? ctrl.$$initialAmount - ((ctrl.$$initialAmount / 100) * parseFloat(ctrl.discount.finalAmount)) : 0;
    			ctrl.$$finalAmount = ctrl.$$finalAmount - discount;
    		}
    	};
    	
    	this.$onChanges = function(changes){
    		if(changes.discount){
    			ctrl.$applyDiscount();
    		}
    	};
    }
})();