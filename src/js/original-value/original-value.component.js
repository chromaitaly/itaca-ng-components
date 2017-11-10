(function() {
	'use strict';
	
	angular.module("chroma.components").component('chOriginalValue', {
		require: {
			ngModelCtrl: 'ngModel',
		},
		bindings: {
			ngModel: "=",
			referTo: "=?",
			label: "@",
			filter: "@",
			cssClass: "@"
		},
		controller: OriginalValueCtrl,
		template: 
	    	"<span class=\"{{$ctrl.cssClass}}\" ng-if=\"$ctrl.$$originalValue != $ctrl.ngModel\">" +
				"<span>{{$ctrl.label}}:&nbsp;</span>" +
				"<span ng-if=\"$ctrl.filter\">{{::($ctrl.$$originalValue|useFilter:$ctrl.filter)}}</span>" +
				"<span ng-if=\"!$ctrl.filter\">{{::$ctrl.$$originalValue}}</span>" +
			"</span>"
	});

	/* @ngInject */
	function OriginalValueCtrl($scope, $element, $attrs) {
	   var ctrl = this;   
	   
	   ctrl.$onInit = function() {
		   ctrl.$$originalValue = ctrl.referTo || angular.copy(ctrl.ngModel);
		   ctrl.cssClass = ctrl.cssClass || "label bg-blue-sea";
	   };
	}
})();