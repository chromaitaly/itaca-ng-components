(function() {
    'use strict';
    
    angular.module("itaca.components").component("chRoomEdit", {
    	bindings: {
    		room: "<",
    		nights: "<?",
    		storageUrl: "<?",
    		title: "@",
    		localeIso: "<",
    		onRemove: "&?",
    		city: "@",
    		offset: "@"	
    	},
		controller: RoomEditCtrl,
		templateUrl: "/tpls/room-edit/room-edit.tpl"
    });
    
    /* @ngInject */
    function RoomEditCtrl($scope, NumberUtils, Dialog, ReservationUtils, Navigator){
    	var ctrl = this;
    	
    	this.$onInit = function(){
    		ctrl.$$index = NumberUtils.uniqueNumber(); 
    		ctrl.$calculateTotalAmount();
    		ctrl.$getCover();
    		ctrl.$getPromo();
    	};
    	
    	this.$getCover = function(){
    		var roomImage = '/resources/public/img/no-gallery-image.png';
    		
    		_.forEach(ctrl.room.type.gallery, function(photo, index, collection) {
    			if (index == 0) {
    				roomImage = ctrl.storageUrl + photo.path;
    			}	
    			
    			if (photo.cover) {
    				roomImage = ctrl.storageUrl + photo.path;
    				return;
    			}				
    		});
    		
    		ctrl.$$roomImage = roomImage;
    	};
    	
    	this.$getPromo = function() {
			if (!_.isEmpty(ctrl.room.totalRate.promotions)) {
				ctrl.$$promotion = ctrl.room.totalRate.promotions[0];
			}		
		};
    	
    	this.$removeRoom = function(ev) {
    		ctrl.onRemove && ctrl.onRemove({$event: ev, $room: ctrl.room}); 
    	};
    	
    	this.$openGallery = function(ev){
			if (!_.isEmpty(ctrl.room.type.gallery)) {
				$translate([ctrl.room.type.roomType.nameKey, "room.category."+ctrl.room.type.category]).then(function(translations) {
					var title = translations[ctrl.room.type.roomType.nameKey] + "&nbsp;<small>(" + translations["room.category."+ctrl.room.type.category].toUpperCase() + ")</small>";
					
					Dialog.showGallery(ev, title, _.sortBy(ctrl.room.type.gallery, [function(o){ return +Boolean(o.cover)}]), {storageUrl: ctrl.storageUrl});
				});
			}
		};
		
		this.$calculateTotalAmount = function() {
			ReservationUtils.calculateRoomTotalPrice(ctrl.room);
		};
    	
    	this.$toggleInfo = function(show) {
    		ctrl.$$showInfo = !_.isNil(show) && _.isBoolean(show) ? show : !ctrl.$$showInfo;
    		
    		ctrl.$$showInfo && Navigator.scrollToAnchor('ch-room-'+ctrl.$$index+'-info');
    	};
    	
    	this.$toggleRates = function(show) {
    		ctrl.$$showRates = !_.isNil(show) && _.isBoolean(show) ? show : !ctrl.$$showRates;
    		
    		ctrl.$$showRates && Navigator.scrollToAnchor('ch-room-'+ctrl.$$index+'-rates');
    	};
    }
})();