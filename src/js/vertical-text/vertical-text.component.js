(function() {
	'use strict';
	
	angular.module("itaca.components").component("chVerticalText", {
		bindings: {
			text: '<',
    	},
		controller: VerticalTextCtrl,
		template: 
			"<div>" +
				"<p ng-repeat=\"char in $ctrl.$$textArr\">{{char}}</p>"+	
			"</div>"
	});
	
	/* @ngInject */
	function VerticalTextCtrl($scope) {
		var ctrl = this;
		 
		this.$onInit = function() {
			ctrl.$initWatchers();
		};
		 
		this.$prepareText = function() {
			ctrl.$$textArr = _.split(ctrl.text, "");
		};
		 
		this.$initWatchers = function() {
			$scope.$watch(function() {
				return ctrl.text;
			
			}, ctr.$prepareText); 
		};
	}
})();