(function() {
    'use strict';
    
    angular.module("chroma.components").component("chRoomGallery", {
    	require: {
    		chRoomCtrl: '^chRoom',
    		chRoomHeaderCtrl: '^chRoomHeader'
		},
    	bindings: {
    		cols: "@",
    		rowspan: "@?",
    		ratio: "@?",
    		maxItems: "<?"
    	},
		controller: RoomGalleryCtrl,
		template: 
			"<ch-gallery gallery=\"$ctrl.chRoomCtrl.room.gallery\" gallery-title=\"{{$ctrl.title}}\" storage-url=\"$ctrl.chRoomCtrl.storageUrl\" cols=\"{{$ctrl.cols}}\" rowspan=\"{{$ctrl.rowspan}}\" ratio=\"{{$ctrl.ratio}}\" max-items=\"$ctrl.maxItems\"></ch-gallery>"
    });
    
    /* @ngInject */
    function RoomGalleryCtrl($scope, AboutStorage, $translate, Dialog, NumberUtils){
    	var ctrl = this;
    	
    	this.$onInit = function(){
    		if(!ctrl.chRoomCtrl.storageUrl){
	    		AboutStorage.get().then(function(data) {
	    			ctrl.chRoomCtrl.storageUrl = data.url;
	    		});
	    	}
    		
    		$translate([ctrl.chRoomCtrl.room.roomType.nameKey, "room.category." + ctrl.chRoomCtrl.room.category]).then(function(translations) {
    			ctrl.title = translations[ctrl.chRoomCtrl.room.roomType.nameKey] + " <small>(" + translations["room.category." + ctrl.chRoomCtrl.room.category].toUpperCase() + ")</small>";
			});
    	};
    	
    	this.openGallery = function(ev){
			$translate([ctrl.chRoomCtrl.room.roomType.nameKey, "room.category." + ctrl.chRoomCtrl.room.category]).then(function(translations) {
				var title = translations[ctrl.chRoomCtrl.room.roomType.nameKey] + " <small>(" + translations["room.category." + ctrl.chRoomCtrl.room.category].toUpperCase() + ")</small>";
				
				Dialog.showGallery(ev, title, _.sortBy(ctrl.chRoomCtrl.room.gallery, [function(o){ return +Boolean(o.cover)}]), {storageUrl: ctrl.chRoomCtrl.storageUrl});
			});
    	};
    	
    }
    
})();