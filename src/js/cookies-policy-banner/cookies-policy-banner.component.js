(function() {
	"use strict";
	
	angular.module("itaca.components").component("chCookiesPolicyBanner", {
		bindings: {
			baseUrl: "<?",
			cookieName: "<?"
		},
		controller: CookiesPolicyCtrl,
		templateUrl: "/tpls/cookies-policy-banner/cookies-policy-banner.tpl"
			
	});
       
	/* @ngInject */
    function CookiesPolicyCtrl($scope, $cookies) {
    	var ctrl = this;
    	
    	this.$onInit = function() {
    		ctrl.cookieName = ctrl.cookieName || "X-ITACA-COOKIES-POLICY";
    		
    		if ($cookies.get(ctrl.cookieName)){
				ctrl.$$cookiesPolicy = true;
			}		
    	};
    	
    	this.$acceptCookiesPolicy = function(){
			 $cookies.put(ctrl.cookieName, "true", {"expires": moment().add(1, "years").toDate()});
			 ctrl.$$cookiesPolicy = true;
		};
    }
})();