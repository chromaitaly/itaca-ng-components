/**
 * Date picker button
 */
(function() {
	'use strict';
	
	angular.module("chroma.components").component('chDatePicker', {
        require: {
        	ngModelCtrl: 'ngModel' 
        }
        bindings: {
        	buttonClass: "@",
        	wrapperClass: "@",
        	label: "@",
        	ngModel: "=",
        	minDate: "<?",
        	maxDate: "<?",
        	errorMessages: "<?",
    		useUtc: "<?",
    		showDiff: "<?",
    		hasBackdrop: "<?",
    		hasConfirm: "<?",
    		disableParentScroll: "<?",
    		disableBodyScroll: "<?",
    		onClose: "&?",
    		ngDisabled: "<?"
        },
        controller: DatePickerCtrl,
        template: 
        	"<ng-form name=\"chDateRangeForm\" class=\"flex no-padding layout-column\">" +
			  	"<md-button class=\"ch-date-picker-button flex minimal-button text-lowercase text-center {{$ctrl.buttonClass}}\" ng-click=\"$ctrl.$openPanel($event)\" aria-label=\"Change date\" ng-disabled=\"$ctrl.ngDisabled\">" +
			  		"<div class=\"{{$ctrl.wrapperClass}}\">" +
				  		"<div class=\"no-padding row-mini\"><small class=\"row-mini text-initial\" ng-bind-html=\"$ctrl.label\"></small></div>" +
						"<div class=\"layout-align-center-center layout-row no-padding\">" +
							"<span><md-icon class=\"mdi mdi-calendar md-32\"></md-icon></span>" +
							"<span class=\"md-display-1 layout-padding\">{{$ctrl.ngModel|date:\"dd\"}}</span>" +
							"<span class=\"layout-column row-mini\">" +
								"<span class=\"text-lowercase\">{{$ctrl.ngModel|date:\"MMM\"}}</span>" +
								"<span>{{$ctrl.ngModel|date:\"yyyy\"}}</span>" +
							"</span>" +
						"</div>"+
					"</div>"+
		  		"</md-button>" +
		    "</ng-form>"
	});

	/* @ngInject */
	function DatePickerCtrl($scope, $element, $mdPanel, $mdMedia, DateUtils) {
		var ctrl = this;
		
		this.$onInit = function() {
			ctrl.wrapperClass = ctrl.wrapperClass || "md-padding";
			ctrl.buttonClass = ctrl.buttonClass || "no-padding no-margin layout-padding";
			ctrl.hasBackdrop = _.isNil(ctrl.hasBackdrop) ? false : ctrl.hasBackdrop;
			ctrl.timezone = _.isBoolean(ctrl.useUtc) && ctrl.useUtc ? "UTC" : "";
			
			var targetEl = $element[0].querySelector(".ch-date-picker-button");
			
			var position = $mdPanel.newPanelPosition()
		        .relativeTo(angular.element(targetEl))
		        .addPanelPosition($mdPanel.xPosition.CENTER, $mdPanel.yPosition.BELOW);
					    	
			ctrl.$$config = {
				attachTo: angular.element(document.body),
			    controller: "dateRangeCtrl",
			    controllerAs: "ctrl",
			    templateUrl: "/tpls/date.part",
			    position: position,
			    clickOutsideToClose: true,
			    disableParentScroll: ctrl.disableParentScroll,
			    hasBackdrop: !$mdMedia('gt-xs') || ctrl.hasBackdrop,
			    fullscreen: !$mdMedia('gt-xs'),
			    panelClass: "bg-white md-whiteframe-15dp",
			    trapFocus: true,
			    onCloseSuccess: function(panelRef, closeReason) {
			    	if (_.isBoolean(closeReason) && closeReason) {
			    		ctrl.updateOriginal();
			    		ctrl.onClose && ctrl.onClose(ctrl.$$data);
			    	}
			    	
			    	// sblocco scroll body
			    	(ctrl.hasBackdrop || ctrl.disableBodyScroll) && ctrl.$$toggleBodyScroll(false);
			    },
			    onOpenComplete: function() {
			    	// blocco scroll body
			    	(ctrl.hasBackdrop || ctrl.disableBodyScroll) && ctrl.$$toggleBodyScroll(true);
			    }
			 };
		};
		
		this.$$toggleBodyScroll = function(block) {
			angular.element(document.body).css({overflow: block ? "hidden" : "auto"});
		};
		
		this.$openPanel = function(ev) {
			 ctrl.$$data = {
				current: ctrl.ngModel,
				min: ctrl.minDate,
				max: ctrl.maxDate,
			 };
			 
			 var locals = {
				hasConfirm: _.isBoolean(ctrl.hasConfirm) ? ctrl.hasConfirm : true,		    				 
				showDiff: _.isBoolean(ctrl.showDiffInCalendar) ? ctrl.showDiffInCalendar : true,
				diffLabelSingular: ctrl.diffLabelSingular,
				diffLabelPlural: ctrl.diffLabelPlural,
				useUtc: _.isBoolean(ctrl.useUtc) ? ctrl.useUtc : false,
				currentView: "end",
				data: ctrl.$$data
			 };
	 		  	    		 
			 ctrl.$$config.openFrom = ev;
			 ctrl.$$config.hasBackdrop = !$mdMedia('gt-xs') || ctrl.hasBackdrop;
			 ctrl.$$config.fullscreen = !$mdMedia('gt-xs');
			 ctrl.$$config.locals = locals;
			 
			 // apro il pannello 
			 $mdPanel.open(ctrl.$$config);
		};
		 
		this.$updateOriginal = function() {
			 if (!ctrl.$$data) {
				 return;
			 }
			 
			 ctrl.ngModel = ctrl.$getDate(ctrl.$$data.current);
			 ctrl.minDate = ctrl.$getDate(ctrl.$$data.min);
			 ctrl.maxDate = ctrl.$getDate(ctrl.$$data.max);
	
		};
		 
		this.$getDate = function(date) {
			 var m = ctrl.$getMoment(date);
			 return m ? m.toDate() : null;
		};
		 
		this.$getMoment = function(date) {
			 if (!date) {
				 return null;
			 }
			 
			 if (_.isBoolean(ctrl.useUtc) ? ctrl.useUtc : false) {
				return DateUtils.absoluteMoment(date);
			
			 } else {
				return moment(date);
			 }
		};
	}
})();