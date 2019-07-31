(function() {
    'use strict';
    
    angular.module("itaca.components").component("chRoomInfo", {
    	transclude: true,
    	require: {
    		chRoomCtrl: '^chRoom',
		},
		controller: RoomInfoCtrl,
		templateUrl: "/tpls/room/room-info.tpl"
    });
    
    /* @ngInject */
    function RoomInfoCtrl($scope, Navigator){
    	var ctrl = this;
    	
    	this.$onInit = function(){
    		ctrl.chRoomCtrl.$$hasInfo = true;
    		
    		ctrl.$initRoom();    		
    		ctrl.$hasFreeBeds();
    		ctrl.$getIncludedFreeServices();
    		ctrl.$getIncludedPaidServices();
    		ctrl.$getBookableServices();
    		ctrl.$getPopularServices();
    	};
    	
    	this.$initRoom = function() {
    		ctrl.$$room = ctrl.chRoomCtrl.room;
    	};
    	
    	this.$hasFreeBeds = function(){
    		if(!_.isEmpty(ctrl.$$room.otherBeds)){
    			ctrl.chRoomCtrl.$$hasFreeBeds = _.some(ctrl.$$room.otherBeds, function(bed){
    				if(!bed.people){
    					return false;
    				}

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
    	
    	this.$getIncludedFreeServices = function() {
			ctrl.$$includedServices = _.filter(ctrl.$$room.services, function(srv){ return srv.bookability == 'INCLUDED' && (srv.category != 'ROOM' || !srv.paymentType || srv.paymentType == 'FREE')});
		};
    	
    	this.$getIncludedPaidServices = function() {
    		ctrl.chRoomCtrl.$$includedPaidServices = _.filter(ctrl.$$room.services, function(srv){ return srv.bookability == 'INCLUDED' && srv.category == 'ROOM' && srv.paymentType && srv.paymentType != 'FREE'});
		};
    	
    	this.$getBookableServices = function() {
    		ctrl.chRoomCtrl.$$bookableServices = _.filter(ctrl.$$room.services, ['bookability', 'BOOKABLE']);
    	};
    	
    	//prendo solo i servizi più importanti inclusi
    	this.$getPopularServices = function(){
    		var isSmokingRoom = false;
    		ctrl.chRoomCtrl.$$popularServices = [];
    		
    		_.forEach(ctrl.$$includedServices, function(roomService){
				var service = {};
				
				if(roomService.type.nameKey == 'service.type.popular.wifi.room'){
					service.type = "WIFI";
					service.icon = "mdi mdi-wifi md-24";
					
				} else if(roomService.type.nameKey ==  'service.type.popular.pet.small' || 
						roomService.type.nameKey == 'service.type.popular.pet.medium' || 
						roomService.type.nameKey == 'service.type.popular.pet.large' || 
						roomService.type.nameKey == 'service.type.popular.pet.disabled'){
					service.type = "PET";
					service.icon = "mdi mdi-paw md-24";
					
				} else if(roomService.type.nameKey == 'service.type.popular.breakfast' || 
						roomService.type.nameKey == 'service.type.popular.breakfast.room' || 
						roomService.type.nameKey == 'service.type.popular.breakfast.continental'){
					service.type = "BREAKFAST";
					service.icon = "mdi mdi-food-variant md-24";
					
				} else if(roomService.type.nameKey == 'service.type.popular.smoking.room'){
					service.type = "SMOKING";
					service.icon = "mdi mdi-smoking md-24";
					isSmokingRoom = true;
				}
				
				service.labelKey = "service.type.inroom." + service.type;
				
				ctrl.chRoomCtrl.$$popularServices.push(service);
			});
    		
    		if(!isSmokingRoom){
    			ctrl.chRoomCtrl.$$popularServices.push({type: 'NO-SMOKING', icon: "mdi mdi-smoking-off md-24", labelKey: "service.type.inroom.NO-SMOKING"});
    		}
    	}
    	
    	this.$toggleInfo = function(show) {
    		ctrl.chRoomCtrl.$toggleInfo(show);
    		ctrl.chRoomCtrl.$toggleRates(false);
    	};
    	
    	this.$toggleRates = function(show) {
    		ctrl.chRoomCtrl.$toggleRates(show);
    		ctrl.chRoomCtrl.$toggleInfo(false);
    	};
    }    
})();