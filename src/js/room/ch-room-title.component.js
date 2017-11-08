(function() {
    'use strict';
    
    angular.module("chroma.components").component("chRoomTitle", {
    	require: {
    		chRoomCtrl: '^chRoom',
		},
    	bindings: {},
		controller: RoomTitleCtrl,
		template: 
			"<div class=\"img-title-bar layout-column layout-padding no-padding\">"+
				"<div class=\"layout-row layout-align-start-center\">"+
					"<div class=\"flex layout-column clickable\" ng-click=\"$ctrl.toggleRates()\" aria-label=\"show rate\">"+
						"<div class=\"md-title\">"+
							"<span translate=\"{{$ctrl.chRoomCtrl.room.roomType.nameKey}}\"></span>"+
						"</div>"+
						"<div>"+
							"<small class=\"text-uppercase\" translate=\"room.category.{{$ctrl.chRoomCtrl.room.category}}\"></small>"+
						"</div>"+
					"</div>"+
				 	"<div class=\"layout-column no-padding\">"+
				 		"<div class=\"layout-row layout-wrap layout-align-end-center\">"+
					 		"<ch-people-icons " +
						 		"people=\"$ctrl.chRoomCtrl.room.people\" " +
						 		"max=\"$ctrl.chRoomCtrl.room.guestsCount.standard\" " +
						 		"extra-people=\"$ctrl.chRoomCtrl.room.extraPeople\" " +
						 		"extra-max=\"$ctrl.chRoomCtrl.room.guestsCount.extra\">"+
					 		"</ch-people-icons>"+
				 		"</div>"+
					"</div>"+
				"</div>"+
			"</div>",
    });
    
    /* @ngInject */
    function RoomTitleCtrl($scope, Navigator){
    	var ctrl = this;
    	
    	this.toggleRates = function(){
    		ctrl.chRoomCtrl.showRoomRates = !ctrl.chRoomCtrl.showRoomRates;
    		ctrl.chRoomCtrl.showRoomInfo = false;
    		if(!ctrl.chRoomCtrl.showRoomRates){
    			Navigator.scrollToAnchor('av-'+ctrl.chRoomCtrl.$$index);
    		}else{
    			Navigator.scrollToAnchor('av-'+ctrl.chRoomCtrl.$$index+'-rates');
    		}
    	};
    	
    	this.$onInit = function(){
    	};
    }
    
})();