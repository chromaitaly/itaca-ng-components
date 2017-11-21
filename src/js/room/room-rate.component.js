(function() {
    'use strict';
    
    angular.module("itaca.components").component("chRoomRate", {
    	transclude: true,
    	require: {
    		chRoomCtrl: '^chRoom',
    		chRoomRatesCtrl: '^chRoomRates'
		},
    	bindings: {
    		rate: "<"
    	},
		controller: RoomRateCtrl,
		templateUrl: "/tpls/room/room-rate.tpl"
    });
    
    /* @ngInject */
    function RoomRateCtrl($scope, $mdMedia){
    	var ctrl = this;
    	
    	this.$mdMedia = $mdMedia;
    	
    	this.$onInit = function(){
    	};
    	
    }
    
})();