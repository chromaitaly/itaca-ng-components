(function() {
    'use strict';
    
    angular.module("itaca.components").component("chCancellationPolicyInfo", {
    	bindings: {
    		rateType: "<",
    		cancellationPolicy: "<",
    		city: "@",
			offset: "@",
			title: "@",
    		titleClass: "@",
    	},
		controller: CancellationPolicyCtrl,
		templateUrl: "/tpls/cancellation-policy-info/cancellation-policy-info.tpl"
    });
    
    /* @ngInject */
    function CancellationPolicyCtrl($scope){
    	var ctrl = this;
    	
    	this.$onInit = function(){
    		ctrl.titleClass = "md-body-1 no-margin-bottom";
    	};
    }
})();