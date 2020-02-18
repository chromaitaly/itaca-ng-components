(function() {
	"use strict";
	
	angular.module("itaca.components").component("chSteppersHeader", {
		require: {
			steppersCtrl: "^chSteppers"
		},
		transclude: true,
		bindings: {},
		controller: SteppersHeaderCtrl,
		template: "<div class=\"ch-steppers-header layout-row layout-align-center-start\" ng-transclude></div>"
	});
	
	 /* @ngInject */
	function SteppersHeaderCtrl($scope) {
		var ctrl = this;
		
    	this.$onInit = function(){
    		
    	};
	}
})();