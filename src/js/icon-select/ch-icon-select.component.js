(function() {
	'use strict';
	
	angular.module("itaca-ui").component("chIconSelect", {
		transclude: true,
		require: {
			ngModelCtrl: 'ngModel'
		},
		bindings: {
    		ngModel: "=",
    		options: "<",
    		ngDisabled: "<?",
    		contClass: "@?",
    		optionClass: "@?"
    	},
		controller: IconSelectCtrl,
		template: 
			"<div class=\"ch-icon-select {{$ctrl.contClass}}\">" +
				"<md-button ng-repeat=\"option in $ctrl.options\" class=\"ch-icon-select-option no-margin no-padding minimal-button text-wrap text-initial {{$ctrl.optionClass}}\" " +
					"ng-class=\"{'md-hover-icon': !option.selected}\"" +
					"ng-click=\"$ctrl.$updateModel(option)\" aria-label=\"{{option.label || (option.labelKey|translate)}}\" ng-disabled=\"$ctrl.ngDisabled\">" +
					"<div ng-if=\"option.iconClass\" class=\"no-padding\" layout layout-align=\"center center\">" +
						"<span><md-icon class=\"layout-padding material-icons {{option.iconClass}} {{option.colorClass}}\"  " +
							"ng-mouseover=\"$ctrl.$preview(option)\" ng-mouseout=\"$ctrl.$cancelPreview()\"></md-icon></span>" +
					"</div>" +
					"<div ng-if=\"option.label || option.labelKey\" class=\"text-small no-padding row-1 md-icon-text {{option.colorClass}}\">" +
						"<span ng-if=\"option.label\" ng-bind=\"option.label\"></span>" +
						"<span ng-show=\"!option.label && option.labelKey\"><span translate=\"{{option.labelkey}}\"></span></span>" +
					"</div >" +
				"</md-button>" + 
			"</div>" 
	});
	
	 /* @ngInject */
	function IconSelectCtrl($scope) {
		var ctrl = this;
    	
    	this.$onInit = function(){
    		ctrl.contClass = ctrl.contClass || "layout-row";
    		ctrl.optionClass = ctrl.optionClass || "flex md-raised";
    		ctrl.$select();
    		
    		ctrl.$initWatches();
    	};
    	
    	this.$select = function(val) {
    		var refValue = Math.floor(!_.isNil(val) ? val : ctrl.ngModel);
    		
    		var currOpt = _.find(ctrl.options, {value: refValue});
    		
    		ctrl.$$colorClass = currOpt ? currOpt.colorClass : null;
    		
    		_.forEach(ctrl.options, function(opt) {
    			opt.selected = opt.value == refValue;
    		});
    		
    		return true;
    	};
    	
    	this.$preview = function(option) {
    		if (!_.isEqual(ctrl.$$previewOpt, option)) {
    			ctrl.$$previewOpt = angular.copy(option);
    		}
    	};
    	
    	this.$cancelPreview = function() {
    		ctrl.$$previewOpt = null;
    	};
    	
    	this.$updateModel = function(option){
    		ctrl.ngModel = option.value;
    		ctrl.$cancelPreview();
    	};
    	
    	this.$initWatches = function() {
    		$scope.$watchCollection(function(){
    			return ctrl.$$previewOpt;
    		
    		}, function(newVal, oldVal) {
    			if (newVal) {
    				if (!oldVal || newVal.value != oldVal.value) {
    					ctrl.$select(newVal.value);
    				}
    			} else {
    				ctrl.$select();
    			}
    		});
    	};
	}
})();