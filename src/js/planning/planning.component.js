(function() {
    'use strict';
    
    angular.module("itaca.components").component("chPlanning", {
    	bindings: {
    		rooms: "<",
    		reservations: "<"    		
    	},
		controller: PlanningCtrl,
		templateUrl: "/tpls/planning/planning.tpl"
    });
    
    /* @ngInject */
    function RoomEditCtrl($scope, InfinitePaging){
    	var ctrl = this;
    	
    	this.$onInit = function(){
    	};
    	
    	this.$onChanges = function(changesObj) {
    		if (changesObj.rooms) {
    			ctrl.$initRooms();
    		}
    	};
    	
    	this.$initRooms = function() {
    		if (_.isArray(ctrl.rooms)) {
    			ctrl.$$roomsType = "1";
    			
			} else if (_.isObjectLike(ctrl.rooms) && ctrl.rooms instanceof InfinitePaging) {
				ctrl.$$roomsType = "2";
				ctrl.rooms.reset();
			
			} else {
				throw new Error("Rooms must be an array or an instance of InfinitePaging");
			}
    	};
    }
})();