(function() {
	"use strict";
	
	angular.module("itaca.components").component("chButtonMenu", {
		bindings: {
			options: "<",
			cssClass: "@",
			ngDisabled: "<?"
		},
		controller: ButtonMenuCtrl,
		templateUrl: "/tpls/button-menu/button-menu.tpl"
	});
	
	 /* @ngInject */
	function ButtonMenuCtrl($scope) {
		var ctrl = this;
		
		this.$onInit = function() {
		};
		
		this.$onChanges = function(changesObj) {
		};
		
	}
})();