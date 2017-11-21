/**
 * Date Range
 */
(function() {
	'use strict';
	
	angular.module("itaca.components").component('chDateRangePicker', {
        bindings: {
        	buttonClass: "@",
        	wrapperClass: "@",
        	placeholder: "@",
        	label: "@",
        	labelClass: "@",
        	startLabel: "@",
        	startInputName: "@",
        	start: "=",
        	startMinDate: "<?",
        	startMaxDate: "<?",
        	startErrorMessages: "<?",
        	endLabel: "@",
        	endInputName: "@",
        	end: "=",
    		endMinDate: "<?",
    		endMaxDate: "<?",
    		endErrorMessages: "<?",
    		maxRange: "<?",
    		useUtc: "<?",
    		showDiff: "<?",
    		showDiffInCalendar: "<?",
    		diffLabelSingular: "@",
    		diffLabelPlural: "@",
    		hasBackdrop: "<?",
    		largeTemplate: "<?",
    		disableParentScroll: "<?",
    		disableBodyScroll: "<?",
    		onClose: "&?",
    		ngDisabled: "<?"
        },
        controller: DateRangePickerCtrl,
        template: 
        	"<ng-form name=\"chDateRangeForm\" class=\"flex no-padding layout-column\">" +
			  	"<md-button class=\"ch-date-range-picker-button flex minimal-button text-lowercase text-center {{$ctrl.buttonClass}}\" ng-click=\"$ctrl.$openPanel($event)\" aria-label=\"Change period\" ng-disabled=\"$ctrl.ngDisabled\">" +
			  		"<div class=\"{{$ctrl.wrapperClass}}\">" +
				  		"<div ng-if=\"$ctrl.label || $ctrl.placeholder\" class=\"md-padding\">" +
				  			"<div class=\"{{$ctrl.labelClass}} text-initial text-wrap row-1\" ng-class=\"{\"text-small\": $ctrl.start || $ctrl.end}\">"+
				  				"<span ng-if=\"$ctrl.placeholder && !$ctrl.start && !$ctrl.end\" ng-bind-html=\"$ctrl.placeholder\"></span>" +
					  			"<span ng-if=\"$ctrl.label && (($ctrl.start || $ctrl.end) || !$ctrl.placeholder)\" ng-bind-html=\"$ctrl.label\"></span>" +
				  			"</div>"+
						"</div>" +
						"<div ng-if=\"!$ctrl.largeTemplate\">"+
							"<div ng-show=\"$ctrl.start || $ctrl.end\" class=\"layout layout-wrap layout-align-center-center row-mini\">" +
								"<span><span translate=\"date.from.abbr\"></span>&nbsp;<span class=\"md-subhead\"><strong>{{$ctrl.start|date:\"shortDate\":$ctrl.$$timezone}}</strong></span>&nbsp;</span>" +
								"<span><span translate=\"date.to.abbr\"></span>&nbsp;<span class=\"md-subhead\"><strong>{{$ctrl.end|date:\"shortDate\":$ctrl.$$timezone}}</strong></span></span>" +
								"<span ng-if=\"$ctrl.$$diff\" class=\"{{$ctrl.labelClass}} text-small no-padding no-margin text-lowercase\">" + 
								"&nbsp;(<span ng-bind=\"$ctrl.$$diff\">&nbsp;</span>" + 
						       		"<span ng-show=\"$ctrl.$$diff == 1\"><span ng-if=\"!$ctrl.$$diffLabelSingular\" translate=\"date.day\"></span><span ng-if=\"$ctrl.$$diffLabelSingular\" ng-bind=\"$ctrl.$$diffLabelSingular\"></span>)</span>" + 
						       		"<span ng-show=\"$ctrl.$$diff > 1\"><span ng-if=\"!$ctrl.$$diffLabelPlural\" translate=\"date.days\"></span><span ng-if=\"$ctrl.$$diffLabelPlural\" ng-bind=\"$ctrl.$$diffLabelPlural\"></span>)</span>" + 
						       	"</span>" +
							"</div>" +
						"</div>" +
						"<div ng-if=\"$ctrl.largeTemplate\" class=\"layout-row layout-wrap layout-align-center-center \">"+
							"<div class=\"layout-column flex-45 row-1\">" +
								"<small class=\"row-1 text-initial\" translate=\"date.checkin\"></small>" +
								"<div class=\"layout-align-center-center layout-row\">" +
									"<span><md-icon class=\"mdi mdi-calendar md-32\"></md-icon></span>" +
									"<span class=\"md-display-1 layout-padding\">{{$ctrl.start|date:\"dd\":$ctrl.$$timezone}}</span>" +
									"<span class=\"layout-column row-mini\">" +
										"<span>{{$ctrl.start|date:\"MMM\":$ctrl.$$timezone}}</span>" +
										"<span>{{$ctrl.start|date:\"yyyy\":$ctrl.$$timezone}}</span>" +
									"</span>" +
								"</div>" +
							"</div>" +
							"<div class=\"layout-column flex text-bold\">-</div>"+
							"<div class=\"layout-column flex-45 row-1\">" +
								"<small class=\"row-mini text-initial\" translate=\"date.checkout\"></small>" +
								"<div class=\"layout-align-center-center layout-row\">" +
									"<span><md-icon class=\"mdi mdi-calendar md-32\"></md-icon></span>" +
									"<span class=\"md-display-1 layout-padding\">{{$ctrl.end|date:\"dd\":$ctrl.$$timezone}}</span>" +
									"<span class=\"layout-column row-mini\">" +
										"<span>{{$ctrl.end|date:\"MMM\":$ctrl.$$timezone}}</span>" +
										"<span>{{$ctrl.end|date:\"yyyy\":$ctrl.$$timezone}}</span>" +
									"</span>" +
								"</div>" +
							"</div>" +
							"<div class=\"layout-column flex-100 row-1\">" +
								"<span ng-if=\"$ctrl.$$diff\" class=\"{{$ctrl.labelClass}} text-small no-padding no-margin text-lowercase\">" + 
						       		"&nbsp;(<span ng-bind=\"$ctrl.$$diff\">&nbsp;</span>" + 
						       		"<span ng-show=\"$ctrl.$$diff == 1\"><span ng-if=\"!$ctrl.$$diffLabelSingular\" translate=\"date.day\"></span><span ng-if=\"$ctrl.$$diffLabelSingular\" ng-bind=\"$ctrl.$$diffLabelSingular\"></span>)</span>" + 
						       		"<span ng-show=\"$ctrl.$$diff > 1\"><span ng-if=\"!$ctrl.$$diffLabelPlural\" translate=\"date.days\"></span><span ng-if=\"$ctrl.$$diffLabelPlural\" ng-bind=\"$ctrl.$$diffLabelPlural\"></span>)</span>" +
						       	"</span>" +
					       	"</div>" +
						"</div>" +
					"</div>" +
				"</md-button>" +
				"<input type=\"hidden\" name=\"{{$ctrl.startInputName}}\" ng-model=\"start\" required>" +
				"<input type=\"hidden\" name=\"{{$ctrl.endInputName}}\" ng-model=\"end\" required>" +
				"<div ng-messages=\"chDateRangeForm[$ctrl.startInputName].$error\" class=\"font-12 text-center text-danger\" ng-show=\"chDateRangeForm[$ctrl.startInputName].$dirty || chDateRangeForm.$submitted\">"+
	          		"<span ng-message=\"required\"><span translate-once=\"error.required\"></span></span>"+
	          		"<span ng-if=\"$ctrl.startErrorMessages\" ng-repeat=\"error in $ctrl.startErrorMessages\" ng-message=\"error.key\"><span translate=\"error.label\"></span></span>"+
	          	"</div>"+
	          	
	          	"<div ng-messages=\"chDateRangeForm[$ctrl.endInputName].$error\" class=\"font-12 text-center text-danger\" ng-show=\"!chDateRangeForm[$ctrl.startInputName].$invalid && (chDateRangeForm[$ctrl.endInputName].$dirty || chDateRangeForm.$submitted)\">"+
	          		"<span ng-message=\"required\"><span translate-once=\"error.required\"></span></span>"+
	          		"<span ng-if=\"$ctrl.endErrorMessages\" ng-repeat=\"error in $ctrl.endErrorMessages\" ng-message=\"error.key\"><span translate=\"error.label\"></span></span>"+
	          	"</div>"+
		    "</ng-form>"
	});

	/* @ngInject */
	function DateRangePickerCtrl($scope, $element, $mdPanel, $mdMedia, DateUtils) {
		var ctr = this;
		
		this.$onInit = function() {
			ctrl.startInputName = ctrl.startInputName || "start";
			ctrl.endInputName = ctrl.endInputName || "end";
			ctrl.wrapperClass = ctrl.wrapperClass || "md-padding";
			ctrl.buttonClass = ctrl.buttonClass || "no-padding no-margin layout-padding";
			ctrl.hasBackdrop = _.isNil(ctrl.hasBackdrop) ? false : ctrl.hasBackdrop;
			ctrl.$$timezone = _.isBoolean(ctrl.useUtc) && ctrl.useUtc ? "UTC" : "";
			ctrl.labelClass = ctrl.labelClass || "text-gray-light";
			
			//mostro un layout piu grande
			ctrl.largeTemplate = ctrl.largeTemplate || false;
			
			var targetEl = $element[0].querySelector(".ch-date-range-picker-button");
			
			var position = $mdPanel.newPanelPosition()
		        .relativeTo(angular.element(targetEl))
		        .addPanelPosition($mdPanel.xPosition.CENTER, $mdPanel.yPosition.BELOW);
					    	
			ctrl.$$config = {
				attachTo: angular.element(document.body),
			    controller: "dateRangeCtrl",
			    controllerAs: "ctrl",
			    templateUrl: "/tpls/date-range.part",
			    position: position,
			    clickOutsideToClose: true,
			    disableParentScroll: ctrl.disableParentScroll,
			    hasBackdrop: !$mdMedia('gt-xs') || ctrl.hasBackdrop,
			    fullscreen: !$mdMedia('gt-xs'),
			    panelClass: "bg-white md-whiteframe-15dp",
			    trapFocus: true,
			    onCloseSuccess: function(panelRef, closeReason) {
			    	if (_.isBoolean(closeReason) && closeReason) {
			    		ctrl.$updateOriginal();
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
			
			// init diff
			ctrl.calculateDiff();
		};
		
		this.$$toggleBodyScroll = function(block) {
			angular.element(document.body).css({overflow: block ? "hidden" : "auto"});
		};
		
		this.$openPanel = function(ev) {
			 ctrl.$$data = {
				start: ctrl.start,
				startMinDate: ctrl.startMinDate,
				startMaxDate: ctrl.startMaxDate,
				end: ctrl.end,
				endMinDate: ctrl.endMinDate,
				endMaxDate: ctrl.endMaxDate,
				maxRange: ctrl.maxRange
			 };
			 
			 var locals = {
				showDiff: _.isBoolean(ctrl.showDiffInCalendar) ? ctrl.showDiffInCalendar : true,
				diffLabelSingular: ctrl.$$diffLabelSingular,
				diffLabelPlural: ctrl.$$diffLabelPlural,
				useUtc: _.isBoolean(ctrl.useUtc) ? ctrl.useUtc : false,
				startTitle: ctrl.startLabel,
				endTitle: ctrl.endLabel,
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
			 
			 ctrl.start = ctrl.$getDate(ctrl.$$data.start);
			 ctrl.startMinDate = ctrl.$getDate(ctrl.$$data.startMinDate);
			 ctrl.startMaxDate = ctrl.$getDate(ctrl.$$data.startMaxDate);
			 ctrl.end = ctrl.$getDate(ctrl.$$data.end);
			 ctrl.endMinDate = ctrl.$getDate(ctrl.$$data.endMinDate);
			 ctrl.endMaxDate = ctrl.$getDate(ctrl.$$data.endMaxDate);
			 ctrl.calculateDiff();
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
		 
		 this.calculateDiff = function() {
			 if ((_.isBoolean(ctrl.showDiff) ? ctrl.showDiff : true) && ctrl.end && ctrl.start) {
				 ctrl.$$diff = ctrl.$getMoment(ctrl.end).diff(ctrl.$getMoment(ctrl.start), 'days');
			} else {
				ctrl.$$diff = null;
			}
		 };
	}
})();