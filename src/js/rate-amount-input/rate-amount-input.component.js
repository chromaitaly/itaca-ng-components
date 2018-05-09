(function() {
	'use strict';
	
	angular.module("itaca.components").component('chRateAmountInput', {
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
	    controller: RateAmountInputCtrl,
	    templateUrl: "/tpls/rate-amount-input/rate-amount-input.tpl"
	});

	/* @ngInject */
	function RateAmountInputCtrl($scope, REGEXP, $translate, NumberUtils, Locale) {
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
			
			ctrl.$initWatchers();
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
	   
	   this.$initWatchers = function() {
		   $scope.$watch(function(){
			   return ctrl.ngModel.finalAmount;
			   
	   		}, function(newVal, oldVal){
			   ctrl.$adeguateAmount();
		    });
	   };
	   
	}
})();