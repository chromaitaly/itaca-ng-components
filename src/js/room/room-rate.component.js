(function() {
    "use strict";
    
    angular.module("itaca.components").component("chRoomRate", {
    	transclude: true,
    	require: {
    		chRoomCtrl: "^chRoom",
    		chRoomRatesCtrl: "^chRoomRates"
		},
    	bindings: {
    		rate: "<",
    		isBestRate: "<?",
    		onAdd: "&?",
    		onRemove: "&?"
    	},
		controller: RoomRateCtrl,
		templateUrl: "/tpls/room/room-rate.tpl"
    });
    
    /* @ngInject */
    function RoomRateCtrl($scope, Navigator, ReservationUtils, $mdMedia, NumberUtils){
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
    		
    		ctrl.$getPromo();
    		ctrl.$adeguateRateAmount();
    	};
    	
    	this.$adeguateRateAmount = function(){
    		ctrl.$$totalAmount = ctrl.rate.amount.finalAmount;
    		ctrl.$$requiredservices = [];
    		_.forEach(ctrl.chRoomCtrl.$$includedPaidServices, function(service){
    			var _svr = ctrl.$createServiceSold(service, ctrl.chRoomCtrl.people, 1);
    			ctrl.$$totalAmount += _svr.amount.finalAmount;
    			ctrl.$$requiredservices.push(_svr);
    		})
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
    	
    	this.$toggleInfo = function(show) {
    		ctrl.$$showInfo = !_.isNil(show) && _.isBoolean(show) ? show : !ctrl.$$showInfo;
    		
    		ctrl.$$showInfo && Navigator.goToAnchor("ch-room-"+ctrl.chRoomCtrl.$$index+"-rates-"+ ctrl.$$index);
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
    
})();