(function() {
	'use strict';
	
	angular.module("itaca.component").component("chHotelInfo", {
		bindings: {
			hotel: "<",
			type: "<?",
			isDisabled: "<?",
			showInfo: "<?",
			nameRequired: "<?",
			mapMarker: "@",
		},
		controller: HotelInfoCtrl,
		templateUrl : "/tpls/hotel-info/hotel-info.tpl",
	});
	
	 /* @ngInject */
	function HotelInfoCtrl($scope, $mdMedia, AppOptions, Navigator) {
		var ctrl = this;
		
    	this.$onInit = function(){
    		ctrl.$mdMedia = $mdMedia;
    		ctrl.appOptions = AppOptions;
    		ctrl.navigator = Navigator;
    		
    		ctrl.hotel = ctrl.hotel || {};
    		ctrl.type = ctrl.type || 'HOTEL';
    		
    		ctrl.isDisabled = _.isBoolean(ctrl.isDisabled) ? ctrl.isDisabled : false;
    		
    		ctrl.showInfo = _.isBoolean(ctrl.showInfo) ? ctrl.showInfo : true;
    		
    		ctrl.nameRequired = _.isBoolean(ctrl.isDisabled) ? ctrl.isDisabled : false;
    		
    		ctrl.mapMarker = ctrl.mapMarker || '../resources/public/img/map-marker.01.png';
    		
    		ctrl.$hotelTypes = [
    			'HOTEL', 'BB', 'GUEST_HOUSE', 'APARTMENT', 'COUNTRY_HOUSE', 'HOMESTAY', 'FARM_STAY', 'LODGE',
                'HOLIDAY_HOME', 'VILLA', 'CHALET', 'HOSTEL', 'MOTEL', 'INN', 'CAPSULE_HOTEL', 'APARTHOTEL',
                'RESORT', 'HOLIDAY_PARK', 'CAMPSITE', 'LUXURY_TENT', 'RIAD', 'RYOKAN', 'LOVE_HOTEL', 'ECONOMY_HOTEL'
            ];
    		
    		if(ctrl.hotel.type && _.includes(['APARTMENT', 'COUNTRY_HOUSE', 'VILLA', 'HOLIDAY_HOME', 'CHALET', 'RIAD', 'LODGE'], ctrl.hotel.type) &&
    		   ctrl.hotel.roomsNumber && ctrl.hotel.roomsNumber == 1){
    			ctrl.$$isApartment = true;
    		};
    	};
    	
    	this.$onChanges = function(changesObj){
    		if(changesObj.isDisabled){
    			if(ctrl.hotel.type == 'HOTEL'){
	    			ctrl.stars = _.range(ctrl.hotel.stars);
	    		}
    			
    			if(ctrl.hotel.type && _.includes(['APARTMENT', 'COUNTRY_HOUSE', 'VILLA', 'HOLIDAY_HOME', 'CHALET', 'RIAD', 'LODGE'], ctrl.hotel.type) &&
	    		   ctrl.hotel.roomsNumber && ctrl.hotel.roomsNumber == 1){
    				ctrl.$$isApartment = true;
	    		} else {
	    			ctrl.$$isApartment = false;
	    		}
    		}
    	};
    	
    	this.$setApartment = function(bool){
    		ctrl.$$isApartment = bool;
    		ctrl.hotel.roomsNumber = bool ? 1 : null;
    		
    		//pulisco le rooms e le roomtypes precedentemente create
    		ctrl.hotel.rooms = null;
    		ctrl.hotel.roomtypes = null;
    	};
	}
})();