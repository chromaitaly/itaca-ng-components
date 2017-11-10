(function() {
	'use strict';
	
	angular.module("chroma.components").component('chArrayInputOption', {
	  	require: {
	  		chArrayInputCtrl: '^chArrayInput'
	  	},
	  	bindings: {
	  		ngValue: "<",
	  		buttonClass: "@",
	  		iconClass : "@",
	  		label: "@",
	  		labelClass: "@",
	  		selectedClass: "@"
	    },
	    controller: ArrayInputOptionCtrl,
	    template: 
	    	"<md-button class=\"{{$ctrl.buttonClass}}\" ng-class=\"$ctrl.option.selected ? $ctrl.selectedClass : ''\" ng-click=\"$ctrl.$toggle()\" aria-label=\"Toggle option\">" +
		    	"<md-icon ng-if=\"$ctrl.iconClass\" class=\"material-icons {{$ctrl.iconClass}}\"></md-icon>" +
				"<div ng-if=\"$ctrl.labelClass\" class=\"{{$ctrl.labelClass}}\" ng-bind-html=\"$ctrl.label\"></div>" +
    		"</md-button>"
	});

	/* @ngInject */
	function ArrayInputOptionCtrl($scope) {
		var ctrl = this;
		
		this.$onInit = function() {
			ctrl.buttonClass = ctrl.buttonClass || (ctrl.iconClass && !ctrl.label ? "md-icon-button" : "");
			ctrl.selectedClass = ctrl.selectedClass || "md-primary";
			
			ctrl.option =  {value: ctrl.ngValue, selected: false};
		  
			ctrl.chArrayInputCtrl.$addOption(ctrl.option);
		};
	  
		this.$toggle = function() {
			ctrl.chArrayInputCtrl.$toggleOption(ctrl.option);
		};
	}
})();
