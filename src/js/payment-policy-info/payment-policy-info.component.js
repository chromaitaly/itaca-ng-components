(function() {
    'use strict';
    
    angular.module("itaca.components").component("chPaymentPolicyInfo", {
    	bindings: {
    		rateType: "<",
    		cancellationPolicy: "<",
    		city: "@",
			offset: "@",
			title: "@",
    		titleClass: "@",
    		isCharged: "<?"
    	},
		controller: PaymentPolicyCtrl,
		templateUrl: "/tpls/payment-policy-info/payment-policy-info.tpl"
    });
    
    /* @ngInject */
    function PaymentPolicyCtrl($scope){
    	var ctrl = this;
    	
    	this.$onInit = function(){
    		ctrl.titleClass = "md-body-1 no-margin-bottom";
    		
    		ctrl.isCharged = _.isBoolean(ctrl.isCharged) ? ctrl.isCharged : false; 
    	};
    }
})();