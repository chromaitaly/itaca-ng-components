(function() {
	'use strict';
	
	angular.module("itaca.components").component('chPadTop', {
       transclude: true,
       bindings: {
    	   targetEl: "@",
    	   chDisabled: "<?"
   		},
		controller: PadTopCtrl,
		template: "<div flex class=\"ch-pad-top\" ng-transclude></div>"
	});
		
	/* @ngInject */
	function PadTopCtrl($scope, $element) {
		var ctrl = this;
		
		this.$onInit = function() {
			ctrl.$initWatches();
		};
		
		this.$postLink = function() {
			ctrl.$$innerEl = angular.element($element[0].querySelector(".ch-pad-top"));
			ctrl.$setTop();
		};
		
		this.$onChanges = function(changesObj) {
    		if (!changesObj) {
    			return;
    		}
    		
    		if (changesObj.targetEl || changesObj.chDisabled) {
    			ctrl.$setTop();
    		}
    	};
    	
    	this.$setTop = function(/* Number */ top) {
    		if (!ctrl.$$innerEl) {
    			return;
    		}
    		
    		top = isFinite(top) ? top : ctrl.$getTargetElHeight();
    		
    		ctrl.$$innerEl.css({"padding-top": ctrl.chDisabled ? 0 : top + 'px'});
    	};
       	
       	this.$getTargetElHeight = function() { 
       		var el = ctrl.targetEl ? document.querySelector(ctrl.targetEl) : null;
            
           	if (!el) {
           		return;
           	}
           	
       		var h = el.offsetHeight;
       		
       		if (!h) {
       			h = el.childNodes[0] ? el.childNodes[0].offsetHeight : h;
       		}
       		
       		return h;
       	};
       	
       	this.$initWatches = function() { 
	       	$scope.$watch(ctrl.$getTargetElHeight, function(newValue, oldValue) {
	       		ctrl.$setTop(newValue);
	       	});
       	};
	}
})();