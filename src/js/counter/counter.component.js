(function() {
	'use strict';
	
	angular.module("itaca.components").component("chCounter", {
		transclude: true,
		require: {
			ngModelCtrl: "ngModel"
		},
		bindings: {
			flexible: "<?",
	  		wrapperClass: "@",
	  		btnClass: "@",
	  		btnActiveClass: "@",
	  		iconClass: "@",
	  		iconActiveClass: "@",
        	label: "@",
        	labelClass: "@",
        	labelDirection: "@",
        	count: "=ngModel",
        	countClass: "@",
        	fieldName: "@",
        	min: "<?",
        	max: "<?",
        	step: "<?",
        	ngDisabled: "<?",
        	minusDisabled: "<?",
        	plusDisabled: "<?",
    		onMinus: "&?",
    		onPlus: "&?"
    	},
		controller: CounterCtrl,
		templateUrl: "/tpls/counter/counter.tpl"
			
	});
       
	/* @ngInject */
    function CounterCtrl($scope, $element, $attrs) {
    	var ctrl = this;
    	
    	this.$onInit = function() {
        	ctrl.btnClass = ctrl.btnClass || "md-fab md-mini";
        	ctrl.btnActiveClass = ctrl.btnActiveClass || "md-primary";
        	ctrl.labelClass = ctrl.labelClass || "text-gray-light text-small";
        	        	
        	ctrl.count = angular.isNumber(ctrl.count) ? ctrl.count : 0;
        	ctrl.step = angular.isNumber(ctrl.step) ? ctrl.step : 1;
    	};
    	
    	this.$onChanges = function(changesObj) {
    		if (!changesObj) {
    			return;
    		}
    		
    		if (changesObj.flexible) {
    			ctrl.$manageFlexible();
    		}
    		
    		if (changesObj.labelDirection) {
    			ctrl.$manageLabelDirection();
    		}
    		
    		if (changesObj.min || changesObj.count) {
    			ctrl.$manageMin();
    		}
    		
    		if (changesObj.max || changesObj.count) {
    			ctrl.$manageMax();
    		}
    	};
    	
    	this.$manageFlexible = function() {
    		ctrl.flexible = _.isBoolean(ctrl.flexible) ? ctrl.flexible : $attrs.hasOwnProperty("flexible") && (ctrl.flexible === undefined || _.isEmpty(ctrl.flexible) || ctrl.flexible);
    		if (ctrl.flexible) {
    			$element.addClass("flex");
    		}
    	};
    	
    	this.$manageLabelDirection = function() {
    		ctrl.labelDirection = _.includes(["top", "right", "bottom", "left"], ctrl.labelDirection) ? ctrl.labelDirection : "top";
        	ctrl.labelContClass = _.includes(["right", "left"], ctrl.labelDirection) ? "layout-row" : "layout-column";
    	};
    	
    	this.$manageMin = function() {
    		ctrl.min = angular.isNumber(ctrl.min) && (angular.isNumber(ctrl.max) && ctrl.min > ctrl.max) ? ctrl.max - ctrl.step : ctrl.min;
    		
    		if (angular.isNumber(ctrl.min) && ctrl.count < ctrl.min) {
        		ctrl.count = ctrl.min;
        	}
    	};
    	
    	this.$manageMax = function() {
    		ctrl.max = angular.isNumber(ctrl.max) && (angular.isNumber(ctrl.min) && ctrl.max < ctrl.min) ? ctrl.min + ctrl.step : ctrl.max;
    		
    		if (angular.isNumber(ctrl.max) && ctrl.count > ctrl.max) {
        		ctrl.count = ctrl.max;
        	}
    	};
    	
    	this.$decrease = function(ev){
    		if (angular.isNumber(ctrl.min) && ctrl.count <= ctrl.min) {
    			return false;
    		}
    		
			ctrl.count = (ctrl.count || 0) - ctrl.step;
			ctrl.$updateModel();
			ctrl.onMinus && ctrl.onMinus({$event: ev, $count: ctrl.count});
    	};
    	
    	this.$increase = function(ev){
    		if (angular.isNumber(ctrl.max) && ctrl.count >= ctrl.max) {
    			return false;
    		}
    		
			ctrl.count = (ctrl.count || 0) + ctrl.step;
			ctrl.$updateModel();
			ctrl.onPlus && ctrl.onPlus({$event: ev, $count: ctrl.count});
    	};
    	
    	this.$updateModel = function(){
			ctrl.ngModelCtrl.$setViewValue(ctrl.count);
    	};
    }
})();