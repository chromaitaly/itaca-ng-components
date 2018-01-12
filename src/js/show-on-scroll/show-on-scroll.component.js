(function() {
	'use strict';
	
	angular.module("itaca.components").component("chShowOnScroll", {
		transclude: true,
		bindings: {
    		offset: "@?",
    		element: "@?",
    		ngDisabled: "<?",
    		showClass: "@?",
			hideClass: "@?"
    	},
		controller: ShowOnScrollCtrl,
		template: "<div class=\"ch-show-on-scroll\" ng-transclude></div>"
	});
	
	 /* @ngInject */
	function ShowOnScrollCtrl($scope, $element, $window) {
		var ctrl = this;
    	
    	this.$onInit = function(){
    		ctrl.element = ctrl.element ||  null;
    		ctrl.offset = isFinite(parseInt(ctrl.offset)) ? parseInt(ctrl.offset) : 500;
    		ctrl.ngDisabled = _.isBoolean(ctrl.ngDisabled) ? ctrl.ngDisabled : false;
    		ctrl.showClass = ctrl.showClass || "zoomIn";
    		if (_.isBoolean(ctrl.showClass)) {
    			ctrl.showClass = ctrl.showClass ? "zoomIn" : "";
    		}
    		ctrl.hideClass = ctrl.hideClass || "zoomOut";
    		if (_.isBoolean(ctrl.hideClass)) {
    			ctrl.hideClass = ctrl.hideClass ? "zoomOut" : "";
    		}
    		
    		ctrl.$initWatchers();
    	};
    	
    	this.$postLink = function() {
    		if (ctrl.ngDisabled) {
    			ctrl.$disableShow();
    		
    		} else {    			
    			ctrl.$enableShow();
    		}
    	};
    	
    	this.$enableShow = function() {
    		angular.element($window).on("scroll", ctrl.$toggle);
    	};
    	
    	this.$disableShow = function() {
    		angular.element($window).off("scroll", ctrl.$toggle);
    	};
    	
    	this.$checkVisible = function() {
    		var el = document.querySelector(ctrl.element);
    		if(!el){
    			return false;
    		}
    		
			var rect = el.getBoundingClientRect();
			var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
			return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
		};
    	
    	this.$toggle = function() {
			if (ctrl.ngDisabled) {
				ctrl.$disableShow();
				return;
			}
			
			var contEl = $element.children();
			var transEl = angular.element(contEl.children());
			
			transEl && transEl.addClass("animated");
			
			/**
			 * se l'elemento è presente e non è visibile oppure
			 * se l'elemento non è presente e si supera l'offset dato mostro il pulsante
			 */
    	   	if($window.pageYOffset >= ctrl.offset && !ctrl.$checkVisible()){
    	   		if (transEl) {
    	   			transEl.addClass("visible " + ctrl.showClass);
    	   			transEl.removeClass(ctrl.hideClass);
    	   		}
    		   
    	   	} else {
    	   		if (transEl) {
    	   			transEl.removeClass("visible " + ctrl.showClass);
    	   			transEl.addClass(ctrl.hideClass);
    	   		}
    	   	}
    	   	
    	   	$scope.$apply();
    	};
    	
    	this.$initWatchers = function() {
    		$scope.$watch(function() {
    			return ctrl.ngDisabled;
    			
    		}, function(newVal) {
    			newVal = _.isBoolean(newVal) ? newVal : false;
    			
    			if (newVal) {
    				ctrl.$disableShow();    				
    			
    			} else {
    				ctrl.$enableShow();
    			}
    		});
    	};
    	
    	this.$onDestroy = function() {
    		ctrl.$disableShow();
    	};
	}
})();