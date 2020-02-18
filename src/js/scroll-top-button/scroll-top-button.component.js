(function() {
	"use strict";
	
	angular.module("itaca.components").component("chScrollTopButton", {
		bindings: {
			behavior: "@"
		},
		controller: ScrollTopButtonCtrl,
		template: 
	    	"<ch-show-on-scroll>" +
		    	"<md-button class=\"md-fab md-primary ch-fab-bottom-right\" aria-label=\"Scroll to top\" ng-click=\"$ctrl.navigator.topAnimated(false, $ctrl.behavior)\">" +
		    		"<md-icon class=\"mdi mdi-arrow-up md-24 text-white\"></md-icon>" +
		    	"</md-button>" +
	    	"</ch-show-on-scroll>"
	});
	
	 /* @ngInject */
	function ScrollTopButtonCtrl($scope, Navigator) {
		var ctrl = this;
		
		this.navigator = Navigator;
		
		this.$onInit = function() {
		};
 
 	}
})();