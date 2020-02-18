(function() {
	"use strict";
	
	angular.module("itaca.components").component("chPriceRangePicker", {
        bindings: {
        	min: "=?",
    		max: "=?",
    		title: "@",
    		subtitle: "@",
    		wrapperClass: "@",
    		buttonClass: "@",
    		type: "@",
    		disableParentScroll: "<?",
    		disableBodyScroll: "<?",
    		hasBackdrop: "<?",
    		hasConfirm: "<?",
	    	hasClose: "<?",
    		ngDisabled: "<?" 
        },
        controller: PriceRangePickerCtrl,
        template: 
        	"<ng-form name=\"chPriceRangePickerForm\" class=\"flex no-padding layout-column\">" +
		  		"<md-button class=\"ch-price-range-picker-button flex minimal-button text-initial {{$ctrl.buttonClass}}\" ng-click=\"$ctrl.$openPanel($event)\" aria-label=\"Change price range\" ng-disabled=\"$ctrl.ngDisabled\">" +
		  			"<div class=\"{{$ctrl.wrapperClass}}\">" +
		  				"<div ng-show=\"$ctrl.max\" class=\"text-wrap row-mini\">" +
							"<strong ng-show=\"$ctrl.min\">{{$ctrl.min|chCurrency}}&nbsp;-&nbsp;</strong>" + 
							"<span ng-show=\"!$ctrl.min\"><span translate=\"common.up.to\"></span>&nbsp;</span>" +
							"<strong>{{$ctrl.max|chCurrency}}</strong>&nbsp;<span ng-if=\"$ctrl.type == 'nightly'\" class=\"text-lowercase\" translate=\"service.type.payment.NIGHTLY\"></span>" +
						"</div>" +
						"<div ng-show=\"!$ctrl.max\">" +
							"<span translate=\"filter.by\"></span>&nbsp;<span class=\"text-lowercase\" translate=\"common.price\"></span>" +
						"</div>" +
		  			"</div>" +
		  		"</md-button>" +
		  	"</ng-form>"
	});

	/* @ngInject */
	function PriceRangePickerCtrl($scope, $element, $mdPanel, $mdMedia) {
		var ctrl = this;
		
		this.$onInit = function() {
			ctrl.type = _.includes(["nightly", "normal"], _.toLower(ctrl.type)) ? _.toLower(ctrl.type) : "normal";
			ctrl.hasBackdrop = _.isNil(ctrl.hasBackdrop) ? false : ctrl.hasBackdrop;
			
			var targetEl = $element[0].querySelector(".ch-price-range-button");
			
			var position = $mdPanel.newPanelPosition()
		        .relativeTo(angular.element(targetEl))
		        .addPanelPosition($mdPanel.xPosition.CENTER, $mdPanel.yPosition.BELOW);
					    	
			ctrl.$$config = {
				attachTo: angular.element(document.body),
			    controller: "priceSliderCtrl",
			    controllerAs: "ctrl",
			    templateUrl: "/tpls/reservation-price-slider.part",
			    position: position,
			    clickOutsideToClose: true,
			    disableParentScroll: ctrl.disableParentScroll,
			    hasBackdrop: !$mdMedia("gt-sm") || ctrl.hasBackdrop,
			    fullscreen: !$mdMedia("gt-sm"),
			    panelClass: "panel-medium bg-white md-whiteframe-15dp",
			    trapFocus: true,
			    onCloseSuccess: function(panelRef, closeReason) {
			    	var tbc = _.isBoolean(ctrl.hasConfirm) ? ctrl.hasConfirm : true;
			    	
			    	if (!tbc || _.isBoolean(closeReason) && closeReason) {
			    		ctrl.$updateOriginal();
			    	}
			    	// sblocco scroll body
			    	(ctrl.hasBackdrop || ctrl.disableBodyScroll) && ctrl.$toggleBodyScroll(false);
			    },
			    onOpenComplete: function() {
			    	// blocco scroll body
			    	(ctrl.hasBackdrop || ctrl.disableBodyScroll) && ctrl.$toggleBodyScroll(true);
			    }
			 };
		};
		
		this.$toggleBodyScroll = function(block) {
			angular.element(document.body).css({overflow: block ? "hidden" : "auto"});
		};
		
		this.$openPanel = function(ev) {
			ctrl.$$data = {
				min: ctrl.min,
				max: ctrl.max
			};
			 
			 var locals = {
				hasConfirm: _.isBoolean(ctrl.hasConfirm) ? ctrl.hasConfirm : true,
				title: ctrl.title,
				subtitle: ctrl.subtitle,
				data: ctrl.$$data
			 };
	 		  	    		 
			 ctrl.$$config.openFrom = ev;
			 ctrl.$$config.hasBackdrop = !$mdMedia("gt-sm") || ctrl.hasBackdrop;
			 ctrl.$$config.fullscreen = !$mdMedia("gt-sm");
			 ctrl.$$config.locals = locals;
			 
			 // apro il pannello 
			 $mdPanel.open(ctrl.$$config);
		};
		 
		this.$updateOriginal = function() {
			 if (!ctrl.$$data) {
				 return;
			 }
			 
			 ctrl.min = ctrl.$$data.min;
			 ctrl.max = ctrl.$$data.max;
		};
	}
})();