(function() {
	"use strict";
	
	angular.module("itaca.components").component("chButtonMenuItem", {
		bindings: {
			options: "<",
			cssClass: "@",
			ngDisabled: "<?"
		},
		controller: ButtonMenuItemCtrl,
		templateUrl: "/tpls/button-menu/button-menu-item.tpl"
	});
	
	 /* @ngInject */
	function ButtonMenuItemCtrl($scope) {
		var ctrl = this;
		
		this.$onInit = function() {
		};
		
		this.$onChanges = function(changesObj) {
		};
		
	}
})();