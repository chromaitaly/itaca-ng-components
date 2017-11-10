(function() {
	'use strict';
	
	angular.module("chroma.components").component("chHotelMap", {
		bindings: {
			hotels: "<?",
	    	hotel: "<?",
	    	address: "<?",
	    	showGallery: "<?",
	    	markerType: "@",
	    	searchParams: "<?",
	    	disableUi: "<?",
	    	disableScrollwheel: "<?",
	    	mapClass: "@",
	    	onHotelClick: "&?"
    	},
		controller: HotelMapCtrl,
		template: 
	    	"<ng-map class=\"{{$ctrl.mapClass}}\" ng-style=\"$ctrl.$$mapStyle\" default-style=\"false\" zoom-to-inlude-markers=\"true\" disable-default-ui=\"{{$ctrl.disableUi}}\" " + 
	    		"center=\"[{{$ctrl.$$center.lat}}, {{$ctrl.$$center.lng}}]\" map-initialized=\"$ctrl.$initMap(map)\" zoom=\"14\" clickable-icons=\"false\" trigger-resize=\"true\" scrollwheel=\"{{!$ctrl.disableScrollwheel}}\">" +
	    		"<div ng-if=\"$ctrl.hotel\">" +
	    			"<ch-hotel-map-marker hotel=\"$ctrl.hotel\" marker-type=\"$ctrl.markerType\"></ch-hotel-map-marker>" +
	    		"</div>" + 
	    		"<div ng-if=\"$ctrl.hotels\" ng-repeat=\"hotel in $ctrl.hotels\">" +
	    			"<ch-hotel-map-marker hotel=\"hotel\" marker-type=\"$ctrl.markerType\"></ch-hotel-map-marker>" +
	    		"</div>" + 
	    		"<ch-hotel-map-info-window hotel=\"$ctrl.$$currHotel\" marker-type=\"$ctrl.markerType\" show-gallery=\"$ctrl.showGallery\" on-hotel-click=\"$ctrl.onHotelClick\"></ch-hotel-map-info-window>" +
			"</ng-map>"
	});
	
	 /* @ngInject */
	 function HotelMapCtrl($scope, $element, $timeout) {
		 var ctrl = this;
		 
		 this.$$geocoder = new google.maps.Geocoder();
		 
		 this.$onInit = function() {
			 // mostrare galleria?
			 ctrl.showGallery = _.isBoolean(scope.showGallery) ? scope.showGallery : false;	    	
			 // mostro i comandi di google 
			 ctrl.disableUi = _.isBoolean(scope.disableUi) ? scope.disableUi : false;
			 // tipo markers
			 ctrl.markerType = _.includes(["pointer", "price", "name"], _.toLower(scope.markerType)) ? _.toLower(scope.markerType) : "pointer";
			 // classe mappa
			 ctrl.mapClass = scope.mapClass || "flex";
			 ctrl.disableScrollwheel = _.isBoolean(scope.disableScrollwheel) ? scope.disableScrollwheel : false;
	    	
			 ctrl.$initLocations();
		 };
		 
		 this.$initLocations = function() {
    		if (!ctrl.hotel && !ctrl.hotels && !ctrl.address) {
    			throw new Error("You must pass an Hotel Object or Array of Hotel Objects or address at least");
    		}
    		
    		if (ctrl.hotel && !angular.isObject(ctrl.hotel)) {
    			throw new Error("You must pass an Hotel Object in 'hotel' parameter");
    		} 
    		
    		if (ctrl.hotels && !angular.isArray(ctrl.hotels)) {
    			throw new Error("You must pass an Array of Hotel Objects in 'hotels' parameter");
    		}
    		
    		ctrl.$$centerObj = new google.maps.LatLng(0, 0);
    		ctrl.$$center = ctrl.$$centerObj.toJSON();
		 };
    	
		 this.$initMap = function(map) {
    		ctrl.$$map = map;
    		ctrl.$getCenter(map);
    		
    		// init watches
    		ctrl.$initWatches();
    		
	    	google.maps.event.trigger(map, 'resize');
		 };
		 
		 this.$getCenter = function(map) {
			 if (!map) {
				return;
			 }
			
			 if(_.isEmpty(ctrl.hotels) && _.isNil(ctrl.hotel)){
				 if(_.isNil(ctrl.address)){
					ctrl.$$centerObj = new google.maps.LatLng(0, 0);
					
					// aggiorna centro mappa
					ctrl.$updateCenter(map);
					
				 } else {
					$$geocoder.geocode({'address': ctrl.address}, function(results, status) {
			  	  		if (status == google.maps.GeocoderStatus.OK) {
			  	  			ctrl.$$centerObj = results[0].geometry.location;
			
			  	  		} else {
					    	console.error("Error geocoding address: " + ctrl.address + ": " + status);
					    	ctrl.$$centerObj = new google.maps.LatLng(0, 0);
					    }
			  	  		
			  	  		// aggiorna centro mappa
			    		ctrl.$updateCenter(map);
					});
				 }
				
			 } else {
				 var totalLat = 0, totalLng = 0;
				
				 _.forEach(map.markers, function(marker) {
					 totalLat += marker.position.lat();
					 totalLng += marker.position.lng();
				 });
				
				 _.forEach(map.customMarkers, function(marker) {
					 totalLat += marker.position.lat();
					 totalLng += marker.position.lng();
				 });
				
				 var divider = _.size(map.markers) + _.size(map.customMarkers);
				
				 ctrl.$$centerObj = divider ? new google.maps.LatLng({lat: totalLat/divider, lng: totalLng/divider}) : new google.maps.LatLng(0, 0);
				
				 // aggiorna centro mappa
				 crl.$updateCenter(map);
			 }
		 };
		 
		 this.$updateCenter = function(map) {
			 $timeout(function() {
				 if (_.isNil(ctrl.$$centerObj)) {
					 ctrl.$$centerObj = new google.maps.LatLng(0, 0);
				 }
	    			
				 _.assign(ctrl.$$center, scope.$$centerObj.toJSON());
	    			
				 google.maps.event.trigger(map, 'resize');
			 }, 1000);
		 };
		 
		 this.$initWatches = function() {
			 scope.$watchCollection(function() {
    			return ctrl.$$map.markers;
			
			 }, function(newVal, oldVal) {
	    		ctrl.$getCenter(ctrl.$$map);
			 });
	    	
			 scope.$watchCollection(function() {
    			return ctrl.$$map.customMarkers;
			
			 }, function(newVal, oldVal) {
	    		ctrl.$getCenter(ctrl.$$map);
			 });
		 };
		 
		 // watch parent size
		 $scope.$watch(function() {
			 var parent = $element.parent()[0];
			 var paddingTop = parent.style.paddingTop || 0;
			 var paddingBottom = parent.style.paddingBottom || 0;
			 
			 return parent.offsetHeight - paddingTop - paddingBottom; 
		 
		 }, function(newVal, oldVal) {
			 ctrl.$$mapStyle = {height: newVal + 'px', width: "100%"};
     		
			 if (ctrl.$$map) {
				 google.maps.event.trigger(ctrl.$$map, 'resize');
				 ctrl.$getCenter(ctrl.$$map);
			 }
		 });
	 }
});