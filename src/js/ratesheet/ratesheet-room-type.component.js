(function() {
    "use strict";
    
    angular.module("itaca.components").component("chRatesheetRoomType", {
    	require: {
    	    ratesheetCtrl: "^chRatesheet"
    	},
    	bindings: {
    		roomTypeRatesheet: "<",
    		minAmount: "<",
    		maxAmount: "<",
    		onRoomTypeClosingToggle: "&",
    		onAvailabilityClick: "&",
    		onRateClosingToggle:  "&",
    		onAmountChange:  "&",
    		onMinLosChange:  "&",
    		onMaxLosChange:  "&",
    		onClosedToArrivalToggle: "&",
    		onClosedToDepartureToggle: "&",
    		onBulkEdit: "&"
    	},
		controller: RatesheetRoomTypeCtrl,
    	templateUrl: "/tpls/ratesheet/ratesheet-room-type.tpl"
    });
    
    /* @ngInject */
    function RatesheetRoomTypeCtrl($scope, $mdMedia, $mdDialog) {
    	var ctrl = this;
    	
    	this.$mdMedia = $mdMedia;
    	
    	this.$onInit = function() {
    		this.ratesheetCtrl.addRoomTypeRatesheet(this.roomTypeRatesheet);
    		this.$$checkMainRatePlan();
    	};
    	
    	this.$$checkMainRatePlan = function() {
    		// verifica che ci sia almeno un piano tariffario principale (non derivato)
    		this.$$hasMainRatePlan = _.some(this.roomTypeRatesheet.ratePlans, function(ratePlanRow) {
    			return !ratePlanRow.ratePlan.parentRatePlanDerivation;
    		});
    	};
    	
    	this.$toggleRoomTypeView = function() {
    		this.$$created = true;
    		this.roomTypeRatesheet.$$show = !this.roomTypeRatesheet.$$show;
    	};
    	
    	this.$onAmountChange = function(ratePlanId, rate) {
    		var ngCtrl = this.$getModelCtrl("amount", ratePlanId, rate.id);
    		
    		if (ngCtrl && ngCtrl.$valid) {
    			this.onAmountChange && this.onAmountChange({$roomTypeId: ctrl.roomTypeRatesheet.roomType.id, $ratePlanId: ratePlanId, $rate: rate});
    		}
    	};
    	
    	this.$onMinLosChange = function(ratePlanId, rate) {
    		var ngCtrl = this.$getModelCtrl("minLOS", ratePlanId, rate.id);
    		
    		if (ngCtrl && ngCtrl.$valid) {
    			this.onMinLosChange && this.onMinLosChange({$roomTypeId: ctrl.roomTypeRatesheet.roomType.id, $ratePlanId: ratePlanId, $rate: rate});
    		}
    	};
    	
    	this.$onMaxLosChange = function(ratePlanId, rate) {
    		var ngCtrl = this.$getModelCtrl("maxLOS", ratePlanId, rate.id);
    		
    		if (ngCtrl && ngCtrl.$valid) {
    			this.onMaxLosChange && this.onMaxLosChange({$roomTypeId: ctrl.roomTypeRatesheet.roomType.id, $ratePlanId: ratePlanId, $rate: rate});
    		}
    	};
    	
    	this.$toggleClosedToArrival = function(ratePlanId, rate) {
//    		rate.closedToArrival = !rate.closedToArrival;
    		
    		this.onClosedToArrivalToggle && this.onClosedToArrivalToggle({$roomTypeId: ctrl.roomTypeRatesheet.roomType.id, $ratePlanId: ratePlanId, $rate: rate});
    	};
    	
    	this.$toggleClosedToDeparture = function(ratePlanId, rate) {
//    		rate.closedToDeparture = !rate.closedToDeparture;
    		
    		this.onClosedToDepartureToggle && this.onClosedToDepartureToggle({$roomTypeId: ctrl.roomTypeRatesheet.roomType.id, $ratePlanId: ratePlanId, $rate: rate});
    	};
    	
    	this.$getModelCtrl = function(type, ratePlanId, rateId) {
    		var el = angular.element(document.querySelector("#"+type+"_"+ratePlanId+"_"+rateId));
    		return el ? el.controller("ngModel") : null;
    	};
    	
    	this.$bulkEdit = function(ev, ratePlanRow) {
    		var opts = {
				templateUrl: "/tpls/ratesheet/ratesheet-room-type-bulk-edit-dialog.tpl", 
				controller: RatesheetRoomTypeBulkEditDialogCtrl,
				controllerAs: "$ctrl",
				bindToController: true,
				locals: {
					roomType: ctrl.roomTypeRatesheet.roomType,
					ratePlanRow: ratePlanRow,
					minAmount: ctrl.minAmount,
					maxAmount: ctrl.maxAmount,
					onConfirm: ctrl.onBulkEdit
				},
				targetEvent: ev, 
				fullscreen: !$mdMedia("gt-sm"),
				escapeToClose: false
			};
			
    		$mdDialog.show(opts);
    	};
    }
    
    /* @ngInject */
    function RatesheetRoomTypeBulkEditDialogCtrl($scope, $mdMedia, $mdDialog, $q, FormUtils, DateUtils, IconUtils, ChannelManager) {
    	var ctrl = this;
    	
    	this.$mdMedia = $mdMedia;
    	this.$$portalIcons = IconUtils.portalIcons();
    	
    	this.$$config = {
    		minDate: moment().startOf("day").toDate(),
    		maxDate: moment().startOf("day").add(2, "years").toDate(),
    		weekdays: DateUtils.weekdays()
    	};   	
    	
    	this.$init = function() {
    		// carico i canali configurati
			ChannelManager.all().then(function(data) {
				ctrl.$$config.channels = data.content;

				_.remove(ctrl.$$config.channels, function(cs) {
					return !_.includes(ctrl.roomType.linkedChannels, cs.channel) || !_.includes(ctrl.ratePlanRow.linkedChannels, cs.channel);
				});
			});
    	};
    	
    	this.$confirm = function() {
    		var form = $scope.calendarBulkEditForm;
    		form.$setSubmitted();
    		
    		if (form.$invalid) {
    			FormUtils.focusFirstInvalid(form.$name);
    			return false;
    		}    		
    		
    		ctrl.$$error = false;
    		
    		this.$$form.roomTypes = [this.roomType];
    		this.$$form.targetRate.ratePlan = this.ratePlanRow.ratePlan;
    		
    		if (this.onConfirm) {
    			$q.when(this.onConfirm({$data: this.$$form})).then(function(data) {
    				$mdDialog.hide(data);
    				
    			}, function(error) {
    				ctrl.$$error = true;
    				ctrl.$$errorMsg = error;
    			});
    		} else {
    			$mdDialog.hide(this.$$form);
    		}
    	};	
    	
    	this.$close = function() {
            $mdDialog.cancel();
        };
        
        this.$init();
    }
        
})();