(function() {
    'use strict';
    
    angular.module("itaca.components").component("chArrayOption", {
    	require: {
			chArrayInputCtrl: '^chArrayInput'
		},
    	bindings: {
    		ngValue: "<",
	  		buttonClass: "@",
	  		iconClass : "@",
	  		selectedIconClass : "@",
	  		label: "@",
	  		labelClass: "@",
	  		selectedClass: "@"
    	},
		controller: ArrayOptionCtrl,
		template: 
	    	"<md-button class=\"{{$ctrl.buttonClass}}\" ng-class=\"$ctrl.$$option.selected ? $ctrl.selectedClass : ''\" " +
	    		"ng-click=\"$ctrl.$toggle()\" aria-label=\"Toggle option\">" +
	    		"<md-icon ng-if=\"$ctrl.iconClass\" ng-show=\"!$ctrl.$$option.selected || !$ctrl.selectedIconClass\" " +
	    			"class=\"material-icons {{$ctrl.iconClass}}\"></md-icon>" +
	    		"<md-icon ng-show=\"$ctrl.selectedIconClass && $ctrl.$$option.selected\" " +
	    			"class=\"material-icons {{$ctrl.selectedIconClass}}\"></md-icon>" +
				"<span ng-if=\"$ctrl.label\" class=\"{{$ctrl.labelClass}}\" ng-bind-html=\"$ctrl.label\"></span>" +
    		"</md-button>"
    });
    
    /* @ngInject */
    function ArrayOptionCtrl($scope) {
    	
    	var ctrl = this;
		
		this.$onInit = function() {
			ctrl.buttonClass = ctrl.buttonClass || (ctrl.iconClass && !ctrl.label ? "md-icon-button" : "");
			ctrl.selectedIconClass = ctrl.selectedIconClass || !ctrl.iconClass ? "mdi mdi-check md-24" : "";
			ctrl.selectedClass = ctrl.selectedClass || "md-primary";
	    	
			ctrl.$$option =  {value: ctrl.ngValue, selected: false};
	      
	    	ctrl.chArrayInputCtrl.addOption(ctrl.$$option);
		};
		
		this.$toggle = function() {
			ctrl.chArrayInputCtrl.toggleOption(ctrl.$$option);
    	};
	}
})();