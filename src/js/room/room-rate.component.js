(function() {
    'use strict';
    
    angular.module("itaca.components").component("chRoomRate", {
    	transclude: true,
    	require: {
    		chRoomCtrl: '^chRoom',
    		chRoomRatesCtrl: '^chRoomRates'
		},
    	bindings: {
    		rate: "<",
    		isBestRate: "<?",
    		index: "<?",
    		localeIso: "<",
    		onAdd: "&?",
    		onRemove: "&?"
    	},
		controller: RoomRateCtrl,
		templateUrl: "/tpls/room/room-rate.tpl"
    });
    
    /* @ngInject */
    function RoomRateCtrl($scope, $mdDialog, $mdMedia, Navigator, NumberUtils, ReservationUtils){
    	var ctrl = this;
    	
    	this.$mdMedia = $mdMedia;
    	
    	this.$onInit = function(){
    		ctrl.$$index = ctrl.chRoomRatesCtrl.addRate(ctrl.rate);
    		
    		ctrl.$$nights = ctrl.chRoomCtrl.nights;
    		ctrl.$$counter = ctrl.chRoomRatesCtrl.counter;
    		ctrl.$$totalCounter = ctrl.chRoomRatesCtrl.totalCounter;
    		ctrl.$$vatTax = ctrl.chRoomRatesCtrl.vatTax;
    		ctrl.$$cityTax = ctrl.chRoomRatesCtrl.cityTax;
    		ctrl.$$deposit = ctrl.chRoomRatesCtrl.deposit;
    		
    		ctrl.$getIncludedPaidServices();
    		ctrl.$getPromo();
    		ctrl.$adeguateRateAmount();
    		
    		ctrl.$findRateType()
    	};
    	
    	this.$findRateType = function() {
    		ctrl.chRoomRatesCtrl.$findRateType(ctrl.rate);
    	};
    	
    	this.$getIncludedPaidServices = function() {
    		ctrl.chRoomCtrl.$$includedPaidServices = _.filter(ctrl.chRoomCtrl.room.services, function(srv){ return srv.bookability == 'INCLUDED' && srv.category == 'ROOM' && srv.paymentType && srv.paymentType != 'FREE'});
		};
    	
    	this.$adeguateRateAmount = function(){
    		ctrl.$$extraCost = 0;
    		ctrl.$$totalAmount = {
				initialAmount:ctrl.rate.amount.initialAmount,
				finalAmount:ctrl.rate.amount.finalAmount,
    		};
    		
    		ctrl.$$requiredservices = [];
    		_.forEach(ctrl.chRoomCtrl.$$includedPaidServices, function(service){
    			var _svr = ctrl.$createServiceSold(service, ctrl.chRoomCtrl.people, 1);
    			
    			ctrl.$$totalAmount.initialAmount += _svr.amount.initialAmount;
    			ctrl.$$totalAmount.finalAmount += _svr.amount.finalAmount;
    			ctrl.$$extraCost += _svr.amount.finalAmount;
    			
    			ctrl.$$requiredservices.push(_svr);
    		});
    	};
    	
		this.$createServiceSold = function(service, people, count) {
			service.uid = service.uid || NumberUtils.uniqueNumber();
			var people = ReservationUtils.peopleByMax(people, service.people);
			var serviceSold = ReservationUtils.serviceSold(service, people, ReservationUtils.availableNights(ctrl.rate.startDate, ctrl.rate.endDate), count);
			serviceSold.uid = service.uid;
			return serviceSold;
		};
    	
    	this.$onDestroy = function() {
    		ctrl.chRoomRatesCtrl.removeRate(ctrl.rate);
    	};
    	
    	this.$getPromo = function() {
    		if (!_.isEmpty(ctrl.rate.promotions)) {
    			ctrl.$$promotion = ctrl.rate.promotions[0];
			}
    	};
    	
    	this.$showInfo = function(ev, templateUrl, anchorId) {
    		templateUrl = templateUrl || '/tpls/room/room-rate-dialog.tpl';
    		anchorId = anchorId || 'rate-dialog-' + ctrl.chRoomCtrl.$$index + '-' + ctrl.index;
    		
    		var opts = {
				templateUrl: templateUrl, 
				controller: RoomRateDialogCtrl, 
				controllerAs: '$ctrl',
				locals: {
	    			rate: ctrl.rate,
		    		nights: ctrl.chRoomCtrl.nights,
		    		counter: ctrl.chRoomRatesCtrl.counter,
		    		totalCounter: ctrl.chRoomRatesCtrl.totalCounter,
		    		vatTax: ctrl.chRoomRatesCtrl.vatTax,
		    		cityTax: ctrl.chRoomRatesCtrl.cityTax,
		    		city:  ctrl.chRoomCtrl.city,
		    		roomtype:  ctrl.chRoomCtrl.room.roomType,
		    		deposit: ctrl.chRoomRatesCtrl.deposit,
		    		requiredservices: ctrl.$$requiredservices,
		    		extracost: ctrl.$$extraCost,
	    			totalAmount: ctrl.$$totalAmount,
	    			localeIso: ctrl.localeIso
	    		},
	    		bindToController: true,
				targetEvent: ev, 
				fullscreen: !$mdMedia('gt-sm'),
				clickOutsideToClose: true,
				escapeToClose: true,
				onComplete: function(){
//					location.hash = anchorId + '-' + Date.now();
				}
			};
			
			$mdDialog.show(opts).finally(function(){
//				history.pushState(null, null, location.href.split('#')[0]);
			});
    		
    	};
    	
    	this.$showPolicy = function(ev) {
    		this.$showInfo(ev, '/tpls/room/room-rate-policy-dialog.tpl', 'rate-dialog-policy-' + ctrl.chRoomCtrl.$$index + '-' + ctrl.index);
    	};
    	
    	this.$selectRate = function() {
    		ctrl.rate.count = 1; 
    		ctrl.$addRate();
    	};
    	
    	this.$addRate = function() {
    		_.isFunction(ctrl.onAdd) && ctrl.onAdd({$room: ctrl.chRoomCtrl.room, $rate: ctrl.rate});
    	};
    	
    	this.$removeRate = function() {
    		_.isFunction(ctrl.onRemove) && ctrl.onRemove({$room: ctrl.chRoomCtrl.room, $rate: ctrl.rate});
    	};
    }
    
    
    /* @ngInject */
	function RoomRateDialogCtrl($scope, $mdDialog){
		var ctrl = this; 
		
		this.$init = function(){
		};
		
		this.$close = function() {
			$mdDialog.hide();
		};
		
		this.$cancel = function() {
			$mdDialog.cancel();
		};
		
		// Init
		this.$init();
	}
})();