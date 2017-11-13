(function() {
	'use strict';
	
	angular.module("itaca.components").component('chAmountInput', {
		require: {
			ngModelCtrl: 'ngModel',
		},
		bindings: {
			ngModel: "=",
			ngMin: "<?",
			inputName: "@",
			promotion: "<?",
			errorMessages: "@",
			cssClass: "@",
			hideIcon: "@",
			iconClass: "@",
			readOnlyView: "<?",
			hideInitialValue : "<?",
			showOriginalValue : "<?",
			originalValueClass : "<?",
			originalValueLabel : "<?",
			ngDisabled: "<?",
			disabledLimit: "<?",
			hideRefreshIcon: "<?",
			refreshIconClass: "@",
			allowNegative: "<?",
			onUpdate: "&?"
	    },
	    controller: AmountInputCtrl,
	    template: 
	    	"<ng-form name=\"chAmountInputForm\" ng-class=\"{\"text-gray-light cursor-disabled\": $ctrl.ngDisabled}\">"+
		    	"<div class=\"no-padding-bottom no-padding-top row-mini layout-column layout-align-center-center\">"+
					"<span ng-if=\"$ctrl.promotion\" ng-switch=\"$ctrl.promotion.promotionType\">"+
						"<span ng-switch-when=\"STANDARD\" class=\"label label-xs bg-info\">"+
								"<ch-truncate text=\"{{$ctrl.promotion.name[$ctrl.$$currentLang.iso]}}\" max-length=\"20\"  suffix=\"...\"></ch-truncate>&nbsp;<span ng-if=\"$ctrl.promotion.discount.type==\"PERCENTAGE\"\">-{{$ctrl.promotion.discount.finalAmount}}%</span><span ng-if=\"$ctrl.promotion.discount.type==\"PRICE\"\">-{{$ctrl.promotion.discount.finalAmount|chCurrency}}</span>"+
						"</span>"+
			      		"<span ng-switch-when=\"MINIMUM_STAY\" class=\"label label-xs bg-primary-light\">"+
			      				"<span translate=\"promotions.promotion.label.minstay.nigths\" translate-value-count=\"{{$ctrl.promotion.days}}\"></span>&nbsp;<span ng-if=\"$ctrl.promotion.discount.type==\"PERCENTAGE\"\">-{{$ctrl.promotion.discount.finalAmount}}%</span><span ng-if=\"$ctrl.promotion.discount.type==\"PRICE\"\">-{{$ctrl.promotion.discount.finalAmount|chCurrency}}</span>"+
			      				"</span>"+
			      		"<span ng-switch-when=\"BOOK_TODAY\" class=\"label label-xs bg-danger\">"+
			      				"<span translate-once=\"promotions.promotion.label.only.today\"></span>!&nbsp;<span ng-if=\"$ctrl.promotion.discount.type==\"PERCENTAGE\"\">-{{$ctrl.promotion.discount.finalAmount}}%</span><span ng-if=\"$ctrl.promotion.discount.type==\"PRICE\"\">-{{$ctrl.promotion.discount.finalAmount|chCurrency}}</span>"+
			      				"</span>"+
			      		"<span ng-switch-when=\"EARLY_BOOKING\" class=\"label label-xs bg-warn\">"+
			      				"<span translate-once=\"promotions.early\"></span>&nbsp;<span ng-if=\"$ctrl.promotion.discount.type==\"PERCENTAGE\"\">-{{$ctrl.promotion.discount.finalAmount}}%</span><span ng-if=\"$ctrl.promotion.discount.type==\"PRICE\"\">-{{$ctrl.promotion.discount.finalAmount|chCurrency}}</span>"+
			      		"</span>"+
			      		"<span ng-switch-when=\"LAST_MINUTE\" class=\"label label-xs bg-primary\">"+
			      				"<span translate-once=\"promotions.last.minute\"></span>&nbsp;<span ng-if=\"$ctrl.promotion.discount.type==\"PERCENTAGE\"\">-{{$ctrl.promotion.discount.finalAmount}}%</span><span ng-if=\"$ctrl.promotion.discount.type==\"PRICE\"\">-{{$ctrl.promotion.discount.finalAmount|chCurrency}}</span>"+
			      		"</span>"+
			      		"<span ng-switch-when=\"LAST_SECOND\" class=\"label label-xs bg-success\">"+
			      				"<span translate-once=\"promotions.last.second\"></span>&nbsp;<span ng-if=\"$ctrl.promotion.discount.type==\"PERCENTAGE\"\">-{{$ctrl.promotion.discount.finalAmount}}%</span><span ng-if=\"$ctrl.promotion.discount.type==\"PRICE\"\">-{{$ctrl.promotion.discount.finalAmount|chCurrency}}</span>"+
			      		"</span>"+
					"</span>"+
					"<small class=\"text-gray-light\" ng-if=\"!$ctrl.hideInitialValue\">"+
						"<span ng-if=\"$ctrl.ngModel.initialAmount > 0 && $ctrl.ngModel.initialAmount > $ctrl.ngModel.finalAmount\">"+
		        			"<i><del>{{($ctrl.ngModel.initialAmount|chCurrency)}}</del></i>"+
		        		"</span>"+
		        		"<span ng-if=\"!($ctrl.ngModel.initialAmount > 0 && $ctrl.ngModel.initialAmount > $ctrl.ngModel.finalAmount)\"></span>"+
		        	"</small>"+
		        "</div>"+
			    "<div class=\"no-padding-top\">"+
					"<div ng-if=\"$ctrl.readOnlyView\" class=\"text-center\">{{$ctrl.ngModel.finalAmount|chCurrency}}</div>"+
					"<div ng-if=\"!$ctrl.readOnlyView\">"+
						"<div class=\"text-right\" ng-if=\"$ctrl.showOriginalValue\">"+
							"<ch-original-value ng-model=\"$ctrl.ngModel.finalAmount\" refer-to=\"$ctrl.ngModel.$originalValue.finalAmount\" filter=\"chCurrency\" label=\"{{$ctrl.originalValueLabel}}\" css-class=\"{{$ctrl.originalValueClass}}\"></ch-original-value>"+
						"</div>"+
						"<div class=\"layout-align-end-center layout-row row-mini\">"+
							"<md-input-container class=\"{{$ctrl.cssClass}}\" ng-class=\"{\"md-icon-right\": !$ctrl.hideRefreshIcon && $ctrl.ngModel.finalAmount != $ctrl.ngModel.$originalValue.finalAmount}\">"+
								"<md-icon ng-if=\"!$ctrl.hideIcon && !$ctrl.ngDisabled\" class=\"{{$ctrl.iconClass}}\"></md-icon>"+
								"<input type=\"number\" name=\"{{$ctrl.inputName}}\" ng-model=\"$ctrl.ngModel.finalAmount\" ng-min=\"$ctrl.ngMin\" step=\"0.01\" ng-max=\"$ctrl.max\" ng-pattern=\"$ctrl.$$pattern\" required ng-disabled=\"$ctrl.ngDisabled\" aria-label=\"Edit amount\" class=\"text-center\">"+
								"<md-icon ng-if=\"!$ctrl.hideRefreshIcon && !$ctrl.ngDisabled && $ctrl.ngModel.finalAmount != $ctrl.ngModel.$originalValue.finalAmount\" class=\"{{$ctrl.refreshIconClass}} clickable\" ng-click=\"$ctrl.$refreshPrice()\" aria-label=\"reset price\">"+
									"<md-tooltip><span translate-once=\"common.restore\"></span></md-tooltip>"+
								"</md-icon>"+
								 "<div ng-messages=\"chAmountInputForm[$ctrl.inputName].$error\">"+
					          		"<span ng-message=\"required\"><span translate-once=\"error.required\"></span></span>"+
					          		"<span ng-message=\"min\"><span translate=\"error.amount.min\" translate-values=\"{num: ($ctrl.ngMin | chCurrency)}\"></span></span>"+
					          		"<span ng-message=\"max\"><span translate=\"error.amount.max\" translate-values=\"{num: ($ctrl.max | chCurrency)}\"></span></span>"+
					          		"<span ng-message=\"$$pattern\"><span translate-once=\"error.field.generic.invalid\"></span></span>"+
					          		"<span ng-if=\"errorMessages\" ng-repeat=\"error in $ctrl.errorMessages\" ng-message=\"error.key\"><span translate=\"error.label\"></span></span>"+
					          	"</div>"+
							"</md-input-container>"+
						"</div>"+
					"</div>"+
			   "</div>"+
		   "</ng-form>"
	});

	/* @ngInject */
	function AmountInputCtrl($scope, REGEXP, $translate, NumberUtils, Locale) {
	   var ctrl = this;
	   
	   this.$onInit = function() {
		   ctrl.ngModel.$originalValue = ctrl.ngModel.$originalValue || angular.copy(ctrl.ngModel);
		   ctrl.hideInitialValue = _.isBoolean(ctrl.hideInitialValue) ? ctrl.hideInitialValue : false;
		   ctrl.$$pattern = _.isBoolean(ctrl.allowNegative) && ctrl.allowNegative ? REGEXP.priceNoStrict : REGEXP.price;
		   ctrl.$$currentLang = Locale.current();
			
			// Classi
		   ctrl.cssClass = ctrl.cssClass || "font-18 no-margin minimal-input max-width-130px ";
		   ctrl.iconClass = ctrl.iconClass || "mdi mdi-pencil md-18 text-primary material-icons";
		   ctrl.originalValueClass = ctrl.originalValueClass || "md-caption text-gray-light";
		   ctrl.refreshIconClass = ctrl.refreshIconClass || "mdi mdi-refresh md-18 material-icons";
		   
			// Label
		   if(!ctrl.originalValueLabel){
			   	$translate('common.amount.original').then(function(translate){
			   		ctrl.originalValueLabel =  translate;
			   	}, _.stubFalse());
		   }
			
			// Toggle
		   ctrl.hideIcon =  _.isBoolean(ctrl.hideIcon) ? ctrl.hideIcon : false;
		   ctrl.readOnlyView =  _.isBoolean(ctrl.readOnlyView) ? ctrl.readOnlyView : false;
		   ctrl.showOriginalValue =  _.isBoolean(ctrl.showOriginalValue) ? ctrl.showOriginalValue : false;
			
			// Salvo il finalAmount se initialAmount non esiste
			if(!ctrl.ngModel.initialAmount || ctrl.ngModel.initialAmount == ctrl.ngModel.finalAmount){
				//se la variabile è 0 devo lasciare 0
				ctrl.ngModel.initialAmount = ctrl.ngModel.initialAmount !== 0 ? ctrl.ngModel.finalAmount : ctrl.ngModel.initialAmount;
			}
			
			//limite di MAX
			if(ctrl.disabledLimit){
				ctrl.max = false;
				
			} else {
				ctrl.max = ctrl.ngModel.initialAmount;
				
				if(ctrl.promotion && ctrl.promotion.discount && ctrl.promotion.discount.finalAmount){
					var discountPrice = 0;
					if(ctrl.promotion.discount.type== 'PERCENTAGE'){
						discountPrice = NumberUtils.calculateDiscount(ctrl.ngModel.initialAmount, ctrl.promotion.discount.finalAmount, "PERCENTAGE");
						
					} else {
						discountPrice = ctrl.promotion.discount.finalAmount;
					}
					
					ctrl.max = ctrl.max - discountPrice;
				}
			}
			
			ctrl.$initWatches();
	   };
	   
	   this.$refreshPrice = function(){
		   if(ctrl.ngModel && ctrl.ngModel.$originalValue){
			   ctrl.ngModel.finalAmount = angular.copy(ctrl.ngModel.$originalValue.finalAmount);
			   ctrl.ngModel.initialAmount = angular.copy(ctrl.ngModel.$originalValue.initialAmount);
			   
			   angular.isFunction(ctrl.onUpdate) && ctrl.onUpdate({value: ctrl.ngModel});
		   }
	   };
	   
	   this.$adeguateAmount = function(){
		   if(ctrl.ngModel.$originalValue && ctrl.ngModel.finalAmount != ctrl.ngModel.$originalValue.finalAmount){
				// adeguo l'inizial in base alla promozione
				if(!_.isNil(ctrl.promotion) && ctrl.promotion.discount && ctrl.promotion.discount.finalAmount){
					var discountPrice = 0;
					if(ctrl.promotion.discount.type== 'PERCENTAGE'){
						discountPrice = (100 * ctrl.ngModel.finalAmount) / (100 - ctrl.promotion.discount.finalAmount);
						
					} else {
						discountPrice = ctrl.ngModel.finalAmount + ctrl.promotion.discount.finalAmount;
					}
					
					ctrl.ngModel.initialAmount = discountPrice;
						 
				} else if(ctrl.ngModel.initialAmount < ctrl.ngModel.finalAmount){
					// se il final è più alto dell'initial adeguo l'initial
					ctrl.ngModel.initialAmount = ctrl.ngModel.finalAmount;
				}
				
				angular.isFunction(ctrl.onUpdate) && ctrl.onUpdate({value: ctrl.ngModel});
		   } 
	   };
	   
	   this.$initWatches = function() {
		   $scope.$watch(function(){
			   return ctrl.ngModel.finalAmount;
			   
	   		}, function(newVal, oldVal){
			   ctrl.$adeguateAmount();
		    });
	   };
	   
	}
})();