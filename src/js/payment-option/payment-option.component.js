(function() {
    'use strict';
    
    angular.module("itaca.components").component("chPaymentOption", {
    	bindings: {
    		paymentOption: "<",
    		frequencyLabel: "@",
    		sizeLabel: "@",
    		amountClass: "@"
    	},
		controller: PaymentOptionCtrl,
		templateUrl: "/tpls/payment-option/payment-option.tpl"
    });
    
    /* @ngInject */
    function PaymentOptionCtrl($scope){
    	var ctrl = this;
    	
    	this.$onInit = function(){
    	};
    }
})();