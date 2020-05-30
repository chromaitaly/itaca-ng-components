(function() {
	"use strict";
	
	angular.module("itaca.components").component("chMouseScrollBtn", {
		bindings: {
			anchor: "@",
			offset: "@" 
		},
		controller: MouseScrollBtnCtrl,
		template: 
			"<div class=\"mouse-scroll-btn\">" +
				"<button class=\"no-bg no-border\" ng-click=\"$ctrl.navigator.goToAnchor($ctrl.anchor, $ctrl.offset)\">" +
					"<span class=\"mouse\"><span></span></span>" +
				"</button>" +
				"<p translate=\"common.scroll.me\"></p>" +
			"</div>"
	});
	
	/* @ngInject */
	function MouseScrollBtnCtrl(Navigator) {
		var ctrl = this;
		
		this.$onInit = function(){
			ctrl.navigator = Navigator;
			
			ctrl.anchor = ctrl.anchor || "body";
		};
	}
})();