(function() {
    "use strict";
    
    angular.module("itaca.components").component("chRoomRates", {
    	transclude: true,
    	require: {
    		chRoomCtrl: "^chRoom"
		},
		bindings: {
    		counter: "<",
    		totalCounter: "<",
    		vatTax: "<",
    		cityTax: "<",
    		deposit: "<?",
    		paymentSettings: "<"
    	},
		controller: RoomRatesCtrl,
		template: 
			"<div id=\"{{'ch-room-' + $ctrl.chRoomCtrl.$$index + '-rates'}}\" ng-show=\"$ctrl.chRoomCtrl.$$showRates\" " +
				"ng-class=\"{'animated fadeIn': $ctrl.chRoomCtrl.$$showRates}\" ng-transclude></div>"
    });
    
    /* @ngInject */
    function RoomRatesCtrl($scope, ReservationUtils){
    	var ctrl = this;
    	
    	this.$onInit = function(){
    		ctrl.chRoomCtrl.$$hasRates = true;
    		
    		ctrl.$initRoom();
    		
    		ctrl.counter = ctrl.counter || {total: 1, actual: 1};
    		ctrl.totalCounter = ctrl.totalCounter || {total: 1, actual: 1};
    	};
    	
    	this.$initRoom = function() {
    		ctrl.$$room = ctrl.chRoomCtrl.room;
    	};
    	
    	this.addRate = function(rate) {
    		ctrl.$$rates = _.isArray(ctrl.$$rates) ? ctrl.$$rates : [];
    		
    		ctrl.$$rates.push(rate);
    		
    		ctrl.$findBestRate();
    		ctrl.$findBestPromotion();
    		ctrl.$isOnArrival();
    		
    		return ctrl.$$rates.indexOf(rate);
    	};
    	
    	this.removeRate = function(rate) {
    		_.pull(ctrl.$$rates, rate);
    		
    		ctrl.$findBestRate();
    		ctrl.$findBestPromotion();
    		ctrl.$isOnArrival();
    	};
    	
    	this.$findBestRate = function() {
    		ctrl.chRoomCtrl.$$bestRate = _.minBy(ctrl.$$rates, function(rate) { return rate.amount.finalAmount; });
    	};
    	
    	this.$findBestPromotion = function(){
    		var promotions = [];
    		_.forEach(ctrl.$$rates, function(rate){
    			if (!_.isEmpty(rate.promotions)) {
    				promotions = _.concat(promotions, rate.promotions);
    			};
    		});
    		
    		ctrl.chRoomCtrl.$$bestPromo = ReservationUtils.bestPromotion(promotions);
    	};
    	
    	this.$isOnArrival = function(){
    		ctrl.chRoomCtrl.$$onArrival = _.some(ctrl.$$rates, function(rate){
    			return !_.isEmpty(rate.promotions) && rate.promotions[0].onArrival;
    		});
    	};
    }    
})();