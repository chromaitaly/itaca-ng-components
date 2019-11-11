(function() {
    'use strict';
    
    angular.module("itaca.components").component("chRoomEditPeople", {
    	bindings: {
    		people: "<",
    		maxPeople: "<",
    		maxCount: "<",
    		limits: "<",
    		ageRanges: "<",
    		onChange: "&?"
    	},
		controller: RoomEditPeopleCtrl,
		templateUrl: "/tpls/room-edit/room-edit-people.tpl"
    });
    
    /* @ngInject */
    function RoomEditPeopleCtrl($scope, ReservationUtils){
    	var ctrl = this;
    	
    	this.$onInit = function(){
    		ctrl.$calculatePeopleCount();
//    		ctrl.$$showDetails = (ctrl.maxCount || 0) > 1;
    		ctrl.$$showDetails = false;
    	};
    	
    	this.$onChanges = function(changesObj) {
			if (changesObj.people || changesObj.limits || changesObj.maxCount) {
				ctrl.$calculatePeopleCount();
			}
		};
    	
		this.$toggleDetails = function(show) {
			ctrl.$$showDetails = !_.isNil(show) && _.isBoolean(show) ? show : !ctrl.$$showDetails;
		};
		
		this.$onPeopleChange = function(people) {
			ctrl.$calculatePeopleCount(people);
			ctrl.onChange && ctrl.onChange({$people: people});
		};
		
		this.$calculatePeopleCount = function(people) {
			ctrl.$$guestsCount = ReservationUtils.guestsCount(people || ctrl.people);
		};
    }
})();