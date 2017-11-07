(function() {
	'use strict';
	
	angular.module("chroma.components").component("chEasingBg", {
		transclude: true,
		bindings: {
    		bgClass: "@?",
    		easingClass: "@?",
    		easingClassLimit: "<",
    		opacityLimit: "<",
    		ngDisabled: "<"
    	},
		controller: EasingBgCtrl,
		template: 
			"<div class=\"ch-easing-bg\" ng-style=\"$ctrl.$$contStyle\">" +
				"<div class=\"{{$ctrl.bgClass}}\" ng-attr-style=\"{{$ctrl.$$bgStyle}}\"></div>" +
				"<div ng-transclude class=\"{{$ctrl.$$transClass}}\" ng-style=\"$ctrl.$$transStyle\"></div>" +
			"</div>"
	});
	
	/* @ngInject */
	function EasingBgCtrl($scope, $element, $window) {
		var ctrl = this;
    	
    	this.$onInit = function(){
    		ctrl.ngDisabled = _.isBoolean(ctrl.ngDisabled) ? ctrl.ngDisabled : false;
    		ctrl.bgClass = ctrl.bgClass || "bg-primary";
    		ctrl.easingClass = ctrl.easingClass || "text-white";
    		ctrl.easingClassLimit = isFinite(parseInt(ctrl.easingClassLimit)) ? parseInt(ctrl.easingClassLimit) : 0.5;
    		ctrl.easingClassLimit = ctrl.easingClassLimit <= 1 ? ctrl.easingClassLimit : 1;
    		ctrl.opacityLimit = isFinite(parseInt(ctrl.opacityLimit)) ? parseInt(ctrl.opacityLimit) : 450;
    		
    		ctrl.$$contStyle = {position: "fixed", width: "100%", top: "0", left: "0", "z-index": "25"};
    		ctrl.$$transStyle = {"z-index": "1"};
    		ctrl.$$baseBgStyle = "position: absolute; z-index: -1; height: 100%; width: 100%; top: 0; left: 0;";
    		
    		ctrl.$initWatches();
    	};
    	
    	this.$postLink = function() {
    		if (ctrl.ngDisabled) {
    			ctrl.$disableEasing();
    		
    		} else {    			
    			ctrl.$enableEasing();
    		}
    	};
    	
    	this.$enableEasing = function() {
    		ctrl.$$transClass = ctrl.easingClass;
    		angular.element($window).on("scroll", ctrl.$ease);
    	};
    	
    	this.$disableEasing = function() {
    		angular.element($window).off("scroll", ctrl.$ease);
    		ctrl.$$bgStyle = ctrl.$$baseBgStyle  + "opacity: 1 !important;";
    		ctrl.$$transClass = "";
    		$scope.$broadcast("easing-bg", {"opacity": 1});
    	};
    	
    	this.$ease = function() {
			if (ctrl.ngDisabled) {
				ctrl.$disableEasing();
				return;
			}
			
			var backdrop = angular.element(document.querySelectorAll('.md-select-backdrop, .md-menu-backdrop'));
//			var backdrop = angular.element($element[0].querySelectorAll('md-select[aria-expanded="true"], .md-menu.md-open'));
			var offset = 0 + $window.pageYOffset/(ctrl.opacityLimit - $element[0].childNodes[0].offsetHeight);
			var alpha = offset >= 1 ? 1 : offset;
    		 
			/* fix per backdrop di angular material */
			if(backdrop.length > 0){
				alpha = 1;
			}
    	   	
    	   	ctrl.$$bgStyle = ctrl.$$baseBgStyle  + "opacity: " + alpha + "!important;";
    	   	
    	   	if (alpha <= ctrl.easingClassLimit) {
    	   		ctrl.$$transClass = ctrl.easingClass;
    	   		
    	   	} else {
    	   		ctrl.$$transClass = "";
    	   	}
    	   	
    	   	$scope.$broadcast("easing-bg", {"opacity": alpha});
	        	   
    	   	$scope.$apply();
    	};
    	
    	this.$initWatches = function() {
    		$scope.$watch(function() {
    			return ctrl.ngDisabled;
    			
    		}, function(newVal) {
    			newVal = _.isBoolean(newVal) ? newVal : false;
    			
    			if (newVal) {
    				ctrl.$disableEasing();    				
    			
    			} else {
    				ctrl.$enableEasing();
    			}
    		});
    	};
    	
    	this.$onDestroy = function() {
    		ctrl.$disableEasing();
    	};
    	
	}
})();