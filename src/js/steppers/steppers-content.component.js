(function() {
	"use strict";
	
	angular.module("itaca.components").component("chSteppersContent", {
		require: {
			steppersCtrl: "^chSteppers"
		},
		transclude: true,
		bindings: {
			cssClass: "@",
		},
		controller: SteppersContentCtrl,
		template: "<div class=\"ch-steppers-content {{$ctrl.cssClass}}\" ng-transclude></div>"
	});
	
	 /* @ngInject */
	function SteppersContentCtrl($scope) {
		var ctrl = this;
		
    	this.$onInit = function(){
    		ctrl.cssClass = ctrl.cssClass || "md-padding";
    	};
	}
})();