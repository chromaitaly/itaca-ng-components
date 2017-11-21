(function() {
    'use strict';
    
    angular.module("itaca.components").component("chRoomInfo", {
    	require: {
    		chRoomCtrl: '^chRoom',
		},
    	bindings: {
    		availability: "<",
    	},
		controller: RoomInfoCtrl,
		transclude: true,
		templateUrl: "/tpls/room/room-info.tpl"			
    });
    
    /* @ngInject */
    function RoomInfoCtrl($scope, Navigator){
    	var ctrl = this;
    	
    	this.$onInit = function(){
    		ctrl.chRoomCtrl.showInfoBtn = true;
    		
    		ctrl.getIncludedServices();
    		ctrl.getBookableServices();
    		ctrl.getPopularServices();
    	};
    	
    	//prendo solo i servizi più importanti inclusi
    	this.getPopularServices = function(){
    		var isSmokingRoom = false;
    		ctrl.chRoomCtrl.popularServices = [];
    		
    		_.forEach(ctrl.includedServices, function(roomService){
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
				
				ctrl.chRoomCtrl.popularServices.push(service);
			});
    		
    		if(!isSmokingRoom){
    			ctrl.chRoomCtrl.popularServices.push({type: 'NO-SMOKING', icon: "mdi mdi-smoking-off md-24", labelKey: "service.type.inroom.NO-SMOKING"});
    		}
    	};
    	
    	this.getIncludedServices = function() {
    		ctrl.includedServices = _.filter(ctrl.chRoomCtrl.room.services, ['bookability', 'INCLUDED']);
    	};
    	
    	this.getBookableServices = function() {
    		ctrl.bookableServices = _.filter(ctrl.chRoomCtrl.room.services, ['bookability', 'BOOKABLE']);
    	};
    	
    	this.toggleInfo = function(){
    		ctrl.chRoomCtrl.showRoomInfo = !ctrl.chRoomCtrl.showRoomInfo;
    		ctrl.chRoomCtrl.showRoomRates = false;
    		if(!ctrl.chRoomCtrl.showRoomInfo){
    			Navigator.scrollToAnchor('av-'+ctrl.chRoomCtrl.$$index);
    		}
    	};
    }
    
})();