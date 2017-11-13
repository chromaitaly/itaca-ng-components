(function() {
    'use strict';
    
    angular.module("itaca.components").component("chRoomContent", {
    	require: {
    		chRoomCtrl: '^chRoom',
		},
    	bindings: {
    	},
		controller: RoomContentCtrl,
		template: "<ng-transclude></ng-transclude>",
		transclude: true,
		
    });
    
    /* @ngInject */
    function RoomContentCtrl($scope){
    	var ctrl = this;
    	
    	this.$onInit = function(){
    	};
    	
    }    
})();