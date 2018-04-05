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
	function ShowOnScrollCtrl($scope, $element, $window, $timeout) {
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
    		
    		angular.element($element.children()).addClass('hide');
    	};
    	
    	this.$postLink = function() {
    		ctrl.$manageDisabled();
    	};
    	
    	this.$manageDisabled = function() {
    		ctrl.ngDisabled = _.isBoolean(ctrl.ngDisabled) ? ctrl.ngDisabled : false;
    		
    		if (ctrl.ngDisabled) {
    			ctrl.$disableShow();
    		
    		} else {    			
    			ctrl.$enableShow();
    		}
    	};
    	
    	this.$onChanges = function(changesObj) {
    		if (!changesObj) {
    			return;
    		}
    		
    		if (changesObj.ngDisabled) {
    			ctrl.$manageDisabled();
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
			
			$timeout(ctrl.$doToggle);
    	};
    	
    	this.$doToggle = function() {
			var contEl = $element.children();
			var transEl = angular.element(contEl.children());
			
			transEl && transEl.addClass("animated");
			
			/**
			 * se l'elemento è presente e non è visibile oppure
			 * se l'elemento non è presente e si supera l'offset dato mostro il pulsante
			 */
			var windowsOffset = $window.pageYOffset;
			if(document.body){
				var style = window.getComputedStyle(document.body);
				var top = style.getPropertyValue('top');
				
				windowsOffset += top ? Math.abs(parseInt(top)) : 0;
			} 
			
    	   	if(windowsOffset >= ctrl.offset && !ctrl.$checkVisible()){
    	   		if (transEl) {
    	   			transEl.addClass("visible " + ctrl.showClass);
    	   			transEl.removeClass(ctrl.hideClass);
    	   			angular.element($element.children()).removeClass('hide');
    	   		}
    		   
    	   	} else {
    	   		if (transEl) {
    	   			transEl.removeClass("visible " + ctrl.showClass);
    	   			transEl.addClass(ctrl.hideClass);
    	   		}
    	   	}
    	   	
    	   	$scope.$apply();
    	};
    	
    	this.$onDestroy = function() {
    		ctrl.$disableShow();
    	};
	}
})();