(function() {
    "use strict";
    
    angular.module("itaca.components").component("chNoShowPolicyInfo", {
    	bindings: {
    		noShowPolicy: "<",
			title: "@",
    		titleClass: "@"
    	},
		controller: CancellationPolicyCtrl,
		templateUrl: "/tpls/no-show-policy-info/no-show-policy-info.tpl"
    });
    
    /* @ngInject */
    function CancellationPolicyCtrl($scope){
    	var ctrl = this;
    	
    	this.$onInit = function(){
    		ctrl.titleClass = "md-body-1 no-margin-bottom";
    	};
    }
})();