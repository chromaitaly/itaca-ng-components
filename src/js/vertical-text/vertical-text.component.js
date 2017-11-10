(function() {
	'use strict';
	
	angular.module("chroma.components").component("chVerticalText", {
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
			ctrl.$initWatches();
		};
		 
		this.$prepareText = function() {
			ctrl.$$textArr = _.split(ctrl.text, "");
		};
		 
		this.$initWatches = function() {
			$scope.$watch(function() {
				return ctrl.text;
			
			}, ctr.$prepareText); 
		};
	}
})();