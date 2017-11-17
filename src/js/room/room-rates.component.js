(function() {
    'use strict';
    
    angular.module("itaca.components").component("chRoomRates", {
    	require: {
    		chRoomCtrl: '^chRoom',
		},
    	bindings: {
    		availability: "=",
    	},
		controller: RoomRatesCtrl,
		template: "<div id=\"{{$ctrl.chRoomCtrl.$$index + '-rates'}}\" ng-show=\"$ctrl.chRoomCtrl.showRoomRates\"  ng-class=\"{'animated fadeIn': $ctrl.chRoomCtrl.showRoomRates}\" ng-transclude></div>",
		transclude: true,
		
    });
    
    /* @ngInject */
    function RoomRatesCtrl($scope, ReservationUtils, DateUtils){
    	var ctrl = this;
    	
    	this.$onInit = function(){
    		ctrl.chRoomCtrl.showRateBtn = true;
    		
    		ctrl.getLowestRate();
    		ctrl.isOnArrival();
    		ctrl.bestPromotion();
    		ctrl.hasFreeBeds();
    	};
    	
    	// controllo se c'è almeno un letto extra gratis, se c'è mostro la frase nello step1
    	this.hasFreeBeds = function(){
    		if(!_.isEmpty(ctrl.availability.roomType.otherBeds)){
    			ctrl.availability.hasFreeBeds = _.some(ctrl.availability.roomType.otherBeds, function(bed){
    				
    				if(bed.people.adults){
    					return bed.adultsPrice <= 0;
    				
    				} else if(bed.people.boys){
    					return bed.boysPrice <= 0;
    				
    				} else if(bed.people.children){
    					return bed.childrenPrice <= 0;
    				
    				} else if(bed.people.kids){
    					return bed.kidsPrice <= 0;
    				
    				} else {
    					return false;
    				}
    			});
    		}
    	};
    	
    	// la migliore promozione
    	this.bestPromotion = function(){
    		var promotions = [];
    		_.forEach(ctrl.availability.totalRates, function(rate){
    			if (!_.isEmpty(rate.promotions)) {
    				promotions = _.concat(promotions, rate.promotions);
    			}
    		});
    		
    		ctrl.chRoomCtrl.bestPromo = ReservationUtils.bestPromotion(promotions);
    	};
    	
    	// il rate più basso
    	this.getLowestRate = function() {
    		ctrl.chRoomCtrl.bestRate = _.minBy(ctrl.availability.totalRates, function(rate) { return rate.amount.finalAmount; });
    	};
    	
    	this.isOnArrival = function(){
    		ctrl.chRoomCtrl.onArrival = ctrl.availability.onArrival;
    	};
    }
    
})();