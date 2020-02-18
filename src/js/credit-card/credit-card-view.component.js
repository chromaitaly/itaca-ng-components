(function() {
	"use strict";
	
	angular.module("itaca.components").component("creditCardView", {
		bindings: {
			paymentMethod: "<",
			mask: "<?"
		},
		controller: CreditCardViewCtrl,
		templateUrl: "/tpls/credit-card/credit-card-view.tpl"			
	});
	
	 /* @ngInject */
	function CreditCardViewCtrl($scope, $mdMedia, IconUtils) {
		var ctrl = this;
		
		this.$mdMedia = $mdMedia;
		
		this.$onInit = function(){
			
			ctrl.$$paymentIcons = IconUtils.paymentIcons();
			
			ctrl.mask = _.isBoolean(ctrl.mask) ? ctrl.mask : false;
		};
		
		
	}
})();