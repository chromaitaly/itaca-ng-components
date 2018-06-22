/**
 * Date picker button
 */
(function() {
	'use strict';
	
	angular.module("itaca.components").component('chMonthPicker', {
        require: {
        	ngModelCtrl: 'ngModel' 
        },
        bindings: {
        	buttonClass: "@",
        	wrapperClass: "@",
        	label: "@",
        	labelPosition: "@",
        	ngModel: "=",
        	minDate: "<?",
        	maxDate: "<?",
        	errorMessages: "<?",
    		useUtc: "<?",
    		hasBackdrop: "<?",
    		hasConfirm: "<?",
    		disableParentScroll: "<?",
    		disableBodyScroll: "<?",
    		onClose: "&?",
    		ngRequired: "<?",
    		ngDisabled: "<?",
    		size: "@"
        },
        controller: MonthPickerTriggerCtrl,
        templateUrl: "/tpls/month-picker/month-picker-trigger.tpl"
	});

	/* @ngInject */
	function MonthPickerTriggerCtrl($scope, $element, $mdPanel, $mdMedia, DateUtils) {
		var ctrl = this;
		
		this.$onInit = function() {
			ctrl.labelPosition = _.includes(["top", "left"], ctrl.labelPosition) ? ctrl.labelPosition : "top";
			ctrl.size = _.includes(["small", "medium", "big"], ctrl.size) ? ctrl.size : "big";
			ctrl.buttonClass = ctrl.buttonClass || "no-margin";
			ctrl.hasBackdrop = _.isNil(ctrl.hasBackdrop) ? false : ctrl.hasBackdrop;
			ctrl.timezone = _.isBoolean(ctrl.useUtc) && ctrl.useUtc ? "UTC" : "";
			
			var targetEl = $element[0].querySelector(".ch-month-picker-button");
			
			var position = $mdPanel.newPanelPosition()
		        .relativeTo(angular.element(targetEl))
		        .addPanelPosition($mdPanel.xPosition.CENTER, $mdPanel.yPosition.BELOW);
					    	
			ctrl.$$config = {
				attachTo: angular.element(document.body),
			    controller: MonthPickerCtrl,
			    controllerAs: "$ctrl",
			    templateUrl: "/tpls/month-picker/month-picker.tpl",
			    position: position,
			    clickOutsideToClose: true,
			    disableParentScroll: ctrl.disableParentScroll,
			    hasBackdrop: !$mdMedia('gt-xs') || ctrl.hasBackdrop,
			    fullscreen: !$mdMedia('gt-xs'),
			    panelClass: "bg-white md-whiteframe-15dp",
			    trapFocus: true,
			    onCloseSuccess: function(panelRef, closeReason) {
			    	// touch dell'input
					$scope.chMonthPickerTriggerForm.date.$setTouched();
					
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
		};
		
		this.$$toggleBodyScroll = function(block) {
			angular.element(document.body).css({overflow: block ? "hidden" : "auto"});
		};
		
		this.$openPanel = function(ev) {
			if (ctrl.ngReadonly) {
				return;
			}
			
			ctrl.$$data = {
				current : ctrl.ngModel,
				min : ctrl.minDate,
				max : ctrl.maxDate,
			};

			var locals = {
				hasConfirm : _.isBoolean(ctrl.hasConfirm) ? ctrl.hasConfirm : true,
				useUtc : _.isBoolean(ctrl.useUtc) ? ctrl.useUtc : false,
				data : ctrl.$$data
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
			 
			// dirty dell'input
			 $scope.chMonthPickerTriggerForm.date.$setDirty();
			 
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
	
	/* @ngInject */
	function MonthPickerCtrl($scope, mdPanelRef, DateUtils, $timeout) {
		
		var _self = this;
		
		this.init = function() {
			_self.timezone = _.isBoolean(_self.useUtc) && _self.useUtc ? "UTC" : "";
			_self.modelOptions = _.isBoolean(_self.useUtc) && _self.useUtc ? {timezone: 'UTC'} : {};
		};
		
		$scope.$on("md-calendar-change", function(event, date) {
			if (!_self.hasConfirm) {
				_self.confirm();
			}
		});
		
		this.$$getMoment = function(date) {
			if (_self.useUtc) {
				return DateUtils.absoluteMoment(date);
			
			} else {
				return moment(date);
			}
		};
		
		/**
		 * Workaround per il timezone dell'ng-model-option non gestito negli md-calendar
		 * 
		 */
		$scope.$watch(function() { return _self.data.current;}, function(newValue, oldValue) {
			$scope.currentDate = _self.data.end ? _self.$$getMoment(_self.data.end).toDate() : null;
		});
		
		this.confirm = function() {
			mdPanelRef && mdPanelRef.close(true);
	    };
	    
	    this.cancel = function() {
			mdPanelRef && mdPanelRef.close(false);
	    };
	    
	    // init
	    this.init();
	}
})();