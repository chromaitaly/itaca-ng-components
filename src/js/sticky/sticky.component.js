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
        	overflow: "<",
        	onSticky: "&?",
        	ngDisabled: "<"
    	},
		controller: StickyCtrl,
		template: "<div class=\"ch-sticky-wrapper\"><div class=\"ch-sticky\" ng-transclude></div></div>"
	});
	
	 /* @ngInject */
	function StickyCtrl($scope, $element, $window) {
		var ctrl = this;
		
		this.$onInit = function() {
			this.$$offsetParent = $element[0].offsetParent;			
			this.$$parentNode = this.stickyParent ? document.querySelector(this.stickyParent) : null;
	           
            if (!this.$$parentNode) {
            	this.$$parentNode = $element.parent()[0];
            }
            
            $element.parent().css("position", "relative");
            
            this.scrollContainer = (this.scrollContainer ? document.querySelector(this.scrollContainer) : null) || $window;
            this.stickyOffset = this.stickyOffset || 0;
	        
            !this.ngDisabled && this.scrollContainer.addEventListener("scroll", this.$doSticky);
		};
		
		this.$postLink = function() {
			ctrl.$$wrapperNode = $element[0].querySelector(".ch-sticky-wrapper");
	        ctrl.$$targetEl = angular.element($element[0].querySelector(".ch-sticky"));
	        ctrl.$$oriEl = angular.copy(ctrl.$$targetEl[0]);
		};
		
		this.$onChanges = function(changesObj) {
			if (changesObj.ngDisabled && !changesObj.ngDisabled.isFirstChange()) {
				if (!this.ngDisabled) {
					this.scrollContainer.addEventListener("scroll", this.$doSticky);
					
				} else {
					this.scrollContainer.removeEventListener("scroll", this.$doSticky);
					this.$reset();
				}
			}
		};
		
		this.$onDestroy = function() {
			this.scrollContainer.removeEventListener("scroll", this.$doSticky);
		};
		
		this.$doSticky = function () {
			var hasScrollMask = document.querySelector(".md-scroll-mask") != null;
			if (!hasScrollMask && (!ctrl.$getScrollOffset() || ctrl.$isIntoView())) {
				ctrl.$reset();
				return;
			}
			
        	var parentHeight = ctrl.$$parentNode.offsetHeight;
            var offsetTop = ctrl.$$offsetParent.offsetTop - ctrl.stickyOffset;
            var elementHeight = ctrl.$$targetEl[0].offsetHeight;
            
            // FIX per backdrop di angular-material 
            var hasBackdrop = !_.isEmpty(angular.element(document.querySelectorAll(".md-select-backdrop, .md-menu-backdrop, .md-dialog-backdrop, .md-bottom-sheet-backdrop")));
            
            var scrollOffset = hasBackdrop ? Math.abs(parseInt(document.body.style.top)) : ctrl.$getScrollOffset();
            
            if (ctrl.overflow || (scrollOffset <= (offsetTop + (parentHeight - elementHeight)))) {
            	ctrl.$$targetEl.css({"position":"fixed", "top": ctrl.stickyOffset + "px", "z-index": "1", "bottom": "", "width": ctrl.$$wrapperNode.offsetWidth +"px"});
            	
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
        
        this.$reset = function() {
        	ctrl.$$targetEl.removeAttr("style");
        	
        	if (ctrl.stickyClass){
            	ctrl.$$targetEl.removeClass(ctrl.stickyClass);
            }
        };
        
        this.$getScrollOffset = function() {
        	return !ctrl.scrollContainer.tagName || ctrl.scrollContainer.tagName.toLowerCase() == "body" ? $window.pageYOffset : ctrl.scrollContainer.scrollTop;
        };
        
        this.$isIntoView = function() {
        	return ctrl.$$offsetParent.offsetTop - ctrl.$getScrollOffset() - (ctrl.stickyOffset || 0) >= 0;
        };
    }
})();