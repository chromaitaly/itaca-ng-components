(function() {
    'use strict';
    
    angular.module("itaca.components").component("chRoomImage", {
    	require: {
    		chRoomCtrl: '^chRoom',
    		chRoomHeaderCtrl: '^chRoomHeader',
		},
    	bindings: {},
		controller: RoomImageCtrl,
		template:
			"<div class=\"flex layout-column layout-align-center-center\">"+
   				"<img ng-src=\"{{$ctrl.roomImage}}\" class=\"full-width display-block img-size\" ng-class=\"{'clickable': $ctrl.chRoomCtrl.room.gallery.length}\" ng-click=\"$ctrl.openGallery($event)\" alt=\"Room cover image\" lazy-image default-img-url=\"'/resources/public/img/no-gallery-image.png'\">"+
   				"<md-tooltip ng-if=\"$ctrl.chRoomCtrl.room.gallery.length\"><span translate=\"photo.photos.view.all\"></span></md-tooltip>"+
   			"</div>",
    });
    
    /* @ngInject */
    function RoomImageCtrl($scope, AboutStorage, $translate, Dialog){
    	var ctrl = this;
    	
    	this.$onInit = function(){
    		ctrl.chRoomCtrl.config = ctrl.chRoomCtrl.config || {};
    		
    		if(!ctrl.chRoomCtrl.storageUrl){
	    		AboutStorage.get().then(function(data) {
	    			ctrl.chRoomCtrl.storageUrl = data.url;
	    			ctrl.getRoomCover();
	    		});
	    	} else {
	    		ctrl.getRoomCover();
	    	}
    	};
    	
    	this.getRoomCover = function(){
			ctrl.$findRoomCover();
    	};
    	
    	this.openGallery = function(ev){
			$translate([ctrl.chRoomCtrl.room.roomType.nameKey, "room.category." + ctrl.chRoomCtrl.room.category]).then(function(translations) {
				var title = translations[ctrl.chRoomCtrl.room.roomType.nameKey] + " <small>(" + translations["room.category." + ctrl.chRoomCtrl.room.category].toUpperCase() + ")</small>";
				
				Dialog.showGallery(ev, title, _.sortBy(ctrl.chRoomCtrl.room.gallery, [function(o){ return +Boolean(o.cover);}]), {storageUrl: ctrl.chRoomCtrl.storageUrl});
			});
    	};
    	
    	this.$findRoomCover = function(){
    		var roomImage = '/resources/public/img/no-gallery-image.png';
    		_.forEach(ctrl.chRoomCtrl.room.gallery, function(gallery, index, collection) {
    			if (index == 0) {
    				roomImage = ctrl.chRoomCtrl.storageUrl + gallery.path;
    			}	
    			
    			if (gallery.cover) {
    				roomImage = ctrl.chRoomCtrl.storageUrl + gallery.path;
    				return;
    			}				
    		});
    		
    		ctrl.roomImage = roomImage;
    	};
    }
    
})();