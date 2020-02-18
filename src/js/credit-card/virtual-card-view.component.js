(function() {
	"use strict";
	
	angular.module("itaca.components").component("virtualCardView", {
		bindings: {
			source: "<",
		},
		controller: VirtualCardViewCtrl,
		templateUrl: "/tpls/credit-card/virtual-card-view.tpl"
	});
	
	 /* @ngInject */
	function VirtualCardViewCtrl($scope, $mdMedia, IconUtils) {
		var ctrl = this;
		
		this.$mdMedia = $mdMedia;
		
		this.$onInit = function(){
			
			ctrl.$$portalIcons = IconUtils.portalIcons();
		};
	}
})();