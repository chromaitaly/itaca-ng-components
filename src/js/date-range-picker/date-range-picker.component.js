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
        	startHintLabel: "@",
        	startInputName: "@",
        	start: "=",
        	startMinDate: "<?",
        	startMaxDate: "<?",
        	startErrorMessages: "<?",
        	endLabel: "@",
        	endHintLabel: "@",
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
    		ngRequired: "<?",
    		ngDisabled: "<?"
        },
        controller: DateRangePickerTriggerCtrl,
        templateUrl: "/tpls/date-range-picker/date-range-picker-trigger.tpl"
        	
	});

	/* @ngInject */
	function DateRangePickerTriggerCtrl($scope, $element, $mdPanel, $mdMedia, DateUtils) {
		var ctrl = this;
		
		this.$mdMedia = $mdMedia;
		
		this.$onInit = function() {
			ctrl.startInputName = ctrl.startInputName || "start";
			ctrl.endInputName = ctrl.endInputName || "end";
			ctrl.wrapperClass = ctrl.wrapperClass || "md-padding";
			ctrl.buttonClass = ctrl.buttonClass || "no-padding no-margin layout-padding";
			ctrl.hasBackdrop = _.isBoolean(ctrl.hasBackdrop) ? ctrl.hasBackdrop : false;
			ctrl.$$timezone = _.isBoolean(ctrl.useUtc) && ctrl.useUtc ? "UTC" : "";
			ctrl.labelClass = ctrl.labelClass || "text-gray-light";
			ctrl.showDiff = _.isBoolean(ctrl.showDiff) ? ctrl.showDiff : true;
			ctrl.showDiffInCalendar = _.isBoolean(ctrl.showDiffInCalendar) ? ctrl.showDiffInCalendar : true;
			
			//mostro un layout piu grande
			ctrl.largeTemplate = ctrl.largeTemplate || false;
			
			var targetEl = $element[0].querySelector(".ch-date-range-picker-button");
			
			var position = $mdPanel.newPanelPosition()
		        .relativeTo(angular.element(targetEl))
		        .addPanelPosition($mdPanel.xPosition.CENTER, $mdPanel.yPosition.BELOW);
					    	
			ctrl.$$config = {
				attachTo: angular.element(document.body),
			    controller: DateRangePickerCtrl,
			    controllerAs: "$ctrl",
			    templateUrl: "/tpls/date-range-picker/date-range-picker.tpl",
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
			    		ctrl.onClose && ctrl.onClose({$start: ctrl.$$data.start, $end: ctrl.$$data.end});
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
		
		this.$onChanges = function(changesObj) {
			if (changesObj.startErrorMessages) {
				ctrl.startErrorMessages = _.isArray(ctrl.startErrorMessages) ? ctrl.startErrorMessages : [];
				
				if (!_.some(ctrl.startErrorMessages, ["error", "required"])) {
					ctrl.startErrorMessages.push({error: "required", messageKey: "error.required"});
				}
			}
			
			if (changesObj.endErrorMessages) {
				ctrl.endErrorMessages = _.isArray(ctrl.endErrorMessages) ? ctrl.endErrorMessages : [];
				
				if (!_.some(ctrl.endErrorMessages, ["error", "required"])) {
					ctrl.endErrorMessages.push({error: "required", messageKey: "error.required"});
				}
			}
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
				startTitle: ctrl.startHintLabel,
				endTitle: ctrl.endHintLabel,
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
	
	/* @ngInject */
	function DateRangePickerCtrl($scope, mdPanelRef, DateUtils, $timeout) {
		
		var _self = this;
		
		this.currentView = this.currentView || "start";
		
		this.init = function() {
			_self.timezone = _.isBoolean(_self.useUtc) && _self.useUtc ? "UTC" : "";
			_self.modelOptions = _.isBoolean(_self.useUtc) && _self.useUtc ? {timezone: 'UTC'} : {};
			_self.showDiff = _.isBoolean(_self.shshowDiffowDiff) ? _self.showDiff : true;
			
			if (_self.showDiff) {
				$scope.$watchGroup([function() { return _self.data.start;}, function() { return _self.data.end;}], function(newValues, oldValues) {
					_self.calculateDiff();
				});
			}
		};
		
		$scope.$on("md-calendar-change", function(event, date) {
			_self.dateChanged = true;

			if (_self.currentView == "end" && !_self.hasConfirm) {
				_self.confirm();
			}
		});
		
		this.toggleView = function() {
			_self.dateChanged = false;
			
			if (_self.currentView == "start") {
				_self.currentView = "end";
				
			} else {
				_self.currentView = "start";
			}
		};
		
		this.checkEndDate = function(fixEnd) {
			if (!_self.data.start) return;
			
			var start = _self.$$getMoment(_self.data.start);
			var end = _self.$$getMoment(_self.data.end);
			var minEnd = _self.$$getMoment(start).add(1, "days");
			
			var maxEnd = null;
			if (_self.data.maxRange) {	        		
	    		maxEnd = _self.$$getMoment(start).add(_self.data.maxRange, "days");
			}
			
			if (!_self.data.end || _self.$$getMoment(_self.data.end).isBefore(minEnd, "day")) {
				fixEnd ? end = minEnd.toDate() : end = null;
			
			} else if (maxEnd && _self.data.end && _self.$$getMoment(_self.data.end).isAfter(maxEnd, "day")) {
				fixEnd ? end = maxEnd.toDate() : end == null;
			}
			
			_self.updateEnd(end, minEnd.toDate(), maxEnd && maxEnd.toDate());
		};
		
		this.updateEnd = function(date, minDate, maxDate) {
			_self.data.end = date ? _self.$$getMoment(date).toDate() : null;
			
			if (minDate) {
				_self.data.endMinDate = minDate;
			}
			
			if (maxDate) {
				_self.data.endMaxDate = maxDate;
			}
		};
		
		this.calculateDiff = function() {
			if (_self.showDiff && _self.data.end && _self.data.start) {
				_self.data.diff = _self.$$getMoment(_self.data.end).diff(_self.$$getMoment(_self.data.start), 'days');
			} else {
				_self.data.diff = null;
			}
		};
		
		this.$$getMoment = function(date) {
			if (_self.useUtc) {
				return DateUtils.absoluteMoment(date);
			
			} else {
				return moment(date);
			}
		};
		
		$scope.$watch(function() { return _self.data.start;}, function(newValue, oldValue) {
			_self.checkEndDate();
			_self.dateChanged && _self.toggleView();
		});
		
		/**
		 * Workaround per il timezone dell'ng-model-option non gestito negli md-calendar
		 * 
		 */
		$scope.$watchGroup([function() { return _self.data.start;}, function() { return _self.data.end;}], function(newValues, oldValues) {
			_self.$$startDate = _self.data.start ? _self.$$getMoment(_self.data.start).toDate() : null;
			$scope.$$endDate = _self.data.end ? _self.$$getMoment(_self.data.end).toDate() : null;
		});
		
		this.confirm = function() {
			_self.checkEndDate(true);
			mdPanelRef && mdPanelRef.close(true);
	    };
	    
	    this.cancel = function() {
			mdPanelRef && mdPanelRef.close(false);
	    };
	    
	    // init
	    this.init();
	}
})();