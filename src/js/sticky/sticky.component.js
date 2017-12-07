/**
 * Sticky element
 */
(function() {
	"use strict";
	
	angular.module("itaca.components").component("chSticky", {
		transclude: true,
		bindings: {
			stickyParent: "@",
        	stickyOffset: "@",
        	stickyClass: "@",
        	scrollContainer: "@",
        	onSticky: "&?"
    	},
		controller: StickyCtrl,
		template: "<div class=\"ch-sticky-wrapper\"><div class=\"ch-sticky\" ng-transclude></div></div>"
	});
	
	 /* @ngInject */
	function StickyCtrl($scope, $element, $window) {
		var ctrl = this;
		
		this.$onInit = function() {
			ctrl.$$parentNode = ctrl.stickyParent ? document.querySelector(ctrl.stickyParent) : null;
	           
            if (!ctrl.$$parentNode) {
            	ctrl.$$parentNode = $element.parent()[0];
            }
            
            ctrl.$$parentNode.style.position = "relative";
            
            ctrl.$$wrapperNode = $element[0].querySelector(".ch-sticky-wrapper");
	        ctrl.$$targetEl = angular.element($element[0].querySelector(".ch-sticky"));
	        ctrl.stickyOffset = ctrl.stickyOffset || 0;
	        ctrl.scrollContainer = (ctrl.scrollContainer ? document.querySelector(ctrl.scrollContainer) : null) || $window;
	        
	        ctrl.scrollContainer.addEventListener("scroll", ctrl.$doSticky);
		};
		
		this.$onDestroy = function() {
			ctrl.scrollContainer.removeEventListener("scroll", ctrl.$doSticky);
		};
		
		this.$doSticky = function () {
        	var parentHeight = ctrl.$$parentNode.offsetHeight;
            var offsetTop = ctrl.$$parentNode.offsetTop - ctrl.stickyOffset;
            var elementHeight = ctrl.$$targetEl[0].offsetHeight;
            
            // FIX per backdrop di angular-material 
            var hasBackdrop = !_.isEmpty(angular.element(document.querySelectorAll(".md-select-backdrop, .md-menu-backdrop, .md-dialog-backdrop, .md-bottom-sheet-backdrop")));
            
            var scrollOffset = hasBackdrop ? Math.abs(parseInt(document.body.style.top)) : $window.pageYOffset;
            
            if (scrollOffset >= offsetTop && scrollOffset <= (offsetTop + (parentHeight - elementHeight)) ) {
            	ctrl.$$targetEl.css({"position":"fixed", "top": ctrl.stickyOffset + "px", "z-index": "10", "bottom": "", "width": ctrl.$$wrapperNode.offsetWidth +"px"});
            	
            	if(ctrl.stickyClass){
            		ctrl.$$targetEl.addClass(ctrl.stickyClass);
            	}
            	
            	ctrl.onSticky && onSticky();
            	
            } else {
            	if(scrollOffset >= offsetTop && scrollOffset > (offsetTop + (parentHeight - elementHeight))){
            		ctrl.$$targetEl.css({"position":"absolute", "bottom":"0", "z-index": "",  "top":"", "width": ""});
            	}else{
            		ctrl.$$targetEl.css({"position":"absolute", "bottom":"", "z-index": "",  "top":"0", "width": ""});
            	}
                
                if(ctrl.stickyClass){
                	ctrl.$$targetEl.removeClass(ctrl.stickyClass);
                }
            }
        };
    }
})();