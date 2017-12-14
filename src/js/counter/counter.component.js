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
		template: 
			"<div class=\"layout-column {{$ctrl.wrapperClass}}\" ng-class=\"{'flex': $ctrl.flexible}\" ng-style=\"{'display': $ctrl.flexible ? 'inherit' : 'inline-block'}\" style=\"min-width: 150px;\">" +
	    		"<div class=\"{{$ctrl.labelContClass}} layout-padding-sm no-padding\">" +
	        		"<div ng-if=\"$ctrl.label && ($ctrl.labelDirection == 'left' || $ctrl.labelDirection == 'top')\" class=\"layout-row layout-align-center-center {{$ctrl.labelClass}}\">" +
	        			"<span ng-bind-html=\"$ctrl.label\"></span>" +
	        		"</div>" +
		        	"<div class=\"layout-row layout-align-center-center flex\">" +
						"<md-button class=\"{{$ctrl.btnClass}} no-margin\" ng-class=\"!$ctrl.$$decreaseDisabled ? $ctrl.btnActiveClass : ''\" aria-label=\"Minus\" ng-disabled=\"$ctrl.$$decreaseDisabled\" ng-click=\"$ctrl.$decrease()\">" +
				  			"<md-icon class=\"material-icons mdi mdi-minus md-18 {{$ctrl.iconClass}}\" ng-class=\"!$ctrl.$$decreaseDisabled ? $ctrl.iconActiveClass : ''\"></md-icon>" +
				  		"</md-button>" +
				  		"<div class=\"layout-column layout-padding layout-align-center-center\" ng-class=\"{'flex': $ctrl.flexible}\">" +
				  			"<span class=\"{{$ctrl.countClass}} border-gray-lighter border-radius\">{{$ctrl.count || 0}}</span>" +
				  		"</div>" +
				  		"<md-button class=\"{{$ctrl.btnClass}} no-margin\" ng-class=\"!$ctrl.$$increaseDisabled ? $ctrl.btnActiveClass : ''\" aria-label=\"Plus\" ng-disabled=\"$ctrl.$$increaseDisabled\" ng-click=\"$ctrl.$increase()\">" +
				  			"<md-icon class=\"material-icons mdi mdi-plus md-18 {{$ctrl.iconClass}}\" ng-class=\"!$ctrl.$$increaseDisabled ? $ctrl.iconActiveClass : ''\"></md-icon>" +
				  		"</md-button>" +
				  	"</div>" +
				  	"<div ng-if=\"$ctrl.label && ($ctrl.labelDirection == 'right' || $ctrl.labelDirection == 'bottom')\" class=\"layout-row layout-align-center-center {{$ctrl.labelClass}}\">" +
				  		"<span ng-bind-html=\"$ctrl.label\"></span>" +
	        		"</div>" +
			  	"</div>" + 
			  	"<div class=\"no-padding\">" +
				  	"<md-input-container md-no-float class=\"md-block minimal-input no-margin no-padding\">" +
				  		"<input ng-if=\"$ctrl.fieldName\" type=\"hidden\" name=\"{{$ctrl.fieldName}}\">" +
			  			"<small ng-transclude class=\"no-padding text-center\"></small>" +
		  			"</md-input-container>" +
		  		"</div>" +
	  		"</div>"
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
        	
        	ctrl.$isDecreaseDisabled();
        	ctrl.$isIncreaseDisabled();
        	ctrl.$initWatchers();
    	};
    	
    	this.$observeFlexible = function() {
    		ctrl.flexible = _.isBoolean(ctrl.flexible) ? ctrl.flexible : $attrs.hasOwnProperty("flexible") && (ctrl.flexible === undefined || _.isEmpty(ctrl.flexible) || ctrl.flexible);
    		if (ctrl.flexible) {
    			$element.addClass("flex");
    		}
    	};
    	
    	this.$observeLabelDirection = function() {
    		ctrl.labelDirection = _.includes(["top", "right", "bottom", "left"], ctrl.labelDirection) ? ctrl.labelDirection : "top";
        	ctrl.labelContClass = _.includes(["right", "left"], ctrl.labelDirection) ? "layout-row" : "layout-column";
    	};
    	
    	this.$observeMin = function() {
    		ctrl.min = angular.isNumber(ctrl.min) && (angular.isNumber(ctrl.max) && ctrl.min > ctrl.max) ? ctrl.max - ctrl.step : ctrl.min;
    		
    		if (angular.isNumber(ctrl.min) && ctrl.count < ctrl.min) {
        		ctrl.count = ctrl.min;
        	}
    		
    		ctrl.$isDecreaseDisabled();
    	};
    	
    	this.$observeMax = function() {
    		ctrl.max = angular.isNumber(ctrl.max) && (angular.isNumber(ctrl.min) && ctrl.max < ctrl.min) ? ctrl.min + ctrl.step : ctrl.max;
    		
    		if (angular.isNumber(ctrl.max) && ctrl.count > ctrl.max) {
        		ctrl.count = ctrl.max;
        	}
    		
    		ctrl.$isIncreaseDisabled();
    	};
    	
    	this.$decrease = function(){
    		if(!ctrl.$isDecreaseDisabled()){
    			ctrl.count = (ctrl.count || 0) - ctrl.step;
    			ctrl.$updateModel();
    			ctrl.onMinus && ctrl.onMinus();
    		}
    	};
    	
    	this.$increase = function(){
    		if(!ctrl.$isIncreaseDisabled()){
    			ctrl.count = (ctrl.count || 0) + ctrl.step;
    			ctrl.$updateModel();
    			ctrl.onPlus && ctrl.onPlus();
    		}
    	};
    	
    	this.$isDecreaseDisabled = function() {
    		ctrl.$$decreaseDisabled = ctrl.ngDisabled ? ctrl.ngDisabled : ctrl.minusDisabled ? ctrl.minusDisabled : (angular.isNumber(ctrl.min) && ctrl.count <= ctrl.min);
    		return ctrl.$$decreaseDisabled;
    	};
    	
    	this.$isIncreaseDisabled = function() {
    		ctrl.$$increaseDisabled = ctrl.ngDisabled ? ctrl.ngDisabled : ctrl.plusDisabled ? ctrl.plusDisabled : (angular.isNumber(ctrl.max) && ctrl.count >= ctrl.max);
    		return ctrl.$$increaseDisabled;
    	};
    	
    	this.$updateModel = function(){
			ctrl.ngModelCtrl.$setViewValue(ctrl.count);
    	};
    	
    	this.$initWatchers = function() {
	    	$scope.$watch(function() {
	    		return ctrl.flexible;
	    	}, ctrl.$observeFlexible);
	    	
	    	$scope.$watch(function() {
	    		return ctrl.labelDirection;
	    	}, ctrl.$observeLabelDirection);
	    	
	    	$scope.$watch(function() {
	    		return ctrl.min;
	    	}, ctrl.$observeMin);  
	    	
	    	$scope.$watch(function() {
	    		return ctrl.max;
	    	}, ctrl.$observeMax);
    	};
    }
})();