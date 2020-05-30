(function() {
	"use strict";
	
	angular.module("itaca-ui").component("chSearchableMap", {
		bindings: {
			disableUi: "<?",
	    	disableScrollwheel: "<?",
	    	mapClass: "@",
	    	center: "<",
	    	initialZoom: "<",
	    	markerLabel: "@",
	    	updateAddressOnMarkerDrag: "<",
	    	onLocationFound: "&?"
    	},
		controller: SearchableMapCtrl,
		templateUrl: "/tpls/searchable-map/searchable-map.tpl"
	});
	
	 /* @ngInject */
	 function SearchableMapCtrl($scope, $element, $timeout, GoogleAPI) {
		 var ctrl = this;
		 
		 this.$$geocoder = new google.maps.Geocoder();
		 
		 this.$onInit = function() {
			 // mostro i comandi di google 
			 ctrl.disableUi = _.isBoolean(ctrl.disableUi) ? ctrl.disableUi : false;
			 // classe mappa
			 ctrl.mapClass = ctrl.mapClass || "flex";
			 ctrl.disableScrollwheel = _.isBoolean(ctrl.disableScrollwheel) ? ctrl.disableScrollwheel : false;
			 ctrl.updateAddressOnMarkerDrag = _.isBoolean(ctrl.updateAddressOnMarkerDrag) ? ctrl.updateAddressOnMarkerDrag : true;
			 ctrl.initialZoom = ctrl.initialZoom || 18;
			 ctrl.$$markerIcon = "/resources/public/img/common/map-marker.01.png";
		 };
		 
		 this.$onChanges = function(changesObj) {
			if (changesObj.center) {
				ctrl.$$center = ctrl.center || "current";
			} 
		 };
    	
		 this.$initMap = function(map) {
    		ctrl.$$map = map;
    		ctrl.$getCenter(map);
    		
	    	google.maps.event.trigger(map, "resize");
		 };
		 
		 this.$getCenter = function(map) {
			 if (!map) {
				return;
			 }

			 if (ctrl.$$targetAddressInfo && _.has(ctrl.$$targetAddressInfo, "geo.coordinates[0]") && _.has(ctrl.$$targetAddressInfo, "geo.coordinates[1]")) {
				 ctrl.$$centerObj = new google.maps.LatLng(ctrl.$$targetAddressInfo.geo.coordinates[1], ctrl.$$targetAddressInfo.geo.coordinates[0])
			 }
  	  		
			 // aggiorna centro mappa
			 ctrl.$updateCenter(map);
		 };
		 
		 this.$updateCenter = function(map) {
			 $timeout(function() {
				 if (_.isPlainObject(ctrl.$$centerObj)) {
					 _.assign(ctrl.$$center, ctrl.$$centerObj.toJSON());
					 
				 } else {
					 ctrl.$$center = ctrl.center || "current";
				 }
	    			
				 google.maps.event.trigger(map, "resize");
			 }, 1000);
		 };
		 
		 this.$updateMarker = function() {
			 if (ctrl.$$targetAddressInfo && _.has(ctrl.$$targetAddressInfo, "geo.coordinates[0]") && _.has(ctrl.$$targetAddressInfo, "geo.coordinates[1]")) {
				 var latLng = new google.maps.LatLng(ctrl.$$targetAddressInfo.geo.coordinates[1], ctrl.$$targetAddressInfo.geo.coordinates[0]);
				 ctrl.$$marker = {position: latLng};
				 ctrl.$onMarkerPositionChanged({latLng: latLng});
					 
			 } else {
				 ctrl.$$marker = null;
			 }
		 };
		 
		 this.$onMarkerPositionChanged = function(ev) {
			 ctrl.$$marker = {position: ev.latLng};
			 
			 ctrl.$$geocoder.geocode({"location": ev.latLng}, function(results, status) {
				 if (status == google.maps.GeocoderStatus.OK) {
					 var result = results[0];
					 
					 GoogleAPI.placeDetails(result.place_id).then(function(data){
			    		var addressInfo = {};
			    	
			    		 for (var i = 0; i < data.address_components.length; i++) {
			    			 var address = data.address_components[i];
			    			 var type = address.types[0];
			    			 
			    			switch(type){
			    			case "street_address":
			    				addressInfo.address = address.long_name;
			    				break;
			    				
							case "route":
								addressInfo.street = address.long_name;
								break;
							
							case "street_number":
								addressInfo.number = address.long_name;
								break;
								
							case "postal_code":
								addressInfo.zipcode = address.long_name;
								break;
								
							case "country":
								addressInfo.country = address.long_name;
								break;
								
							case "locality":
							case "administrative_area_level_3":
							case "postal_town": 
								addressInfo.city = address.long_name;
								break;
								
							case "administrative_area_level_1":
								addressInfo.region = address.short_name;
								break;
								
							case "administrative_area_level_2":
								addressInfo.province = address.short_name;
								break;
							
							case "neighborhood":
							case "sublocality":
							case "sublocality_level_1":
							case "sublocality_level_2":
							case "sublocality_level_3":
							case "sublocality_level_4":
							case "sublocality_level_5":
								addressInfo.district = address.long_name;
								break;
							}
				    	}
			    	
				    	// via e civico
			    		 addressInfo.address = addressInfo.address ? addressInfo.address : addressInfo.street ? (addressInfo.street + (addressInfo.number ? " " + addressInfo.number : "")) : null;
					    					    	
			    		// Place Id di google
			    		addressInfo.placeId = data.place_id;
			    		
			    		//GeoJson (long lat)
			    		addressInfo.geo = {type: "Point", coordinates: []};
			    		addressInfo.geo.coordinates.push(data.geometry.location.lng());
			    		addressInfo.geo.coordinates.push(data.geometry.location.lat());
			    		
			    		addressInfo.offset = parseInt(data.utc_offset_minutes);
			    		addressInfo.formatted_address = data.formatted_address;
				    	addressInfo.addressComplete = result;
				    	
				    	if (ctrl.updateAddressOnMarkerDrag) {
				    		ctrl.$$targetAddressInfo = addressInfo;
				    	}
				    	
				    	ctrl.onLocationFound && ctrl.onLocationFound({$addressInfo: addressInfo});
				    	
			    	}, function(error){
			    		console.error("Error searching marker's place details [" + result.place_id + "]: " + error);
			    	});
	
	  	  		} else {
			    	console.error("Error geocoding marker [" + ev.latLng + "]: " + status);
			    }
			});
		 };
	 }		 
})();