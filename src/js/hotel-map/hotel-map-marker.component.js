(function(){
	"use strict";
	
	angular.module("itaca.components").component("chHotelMapMarker", {
		require: {
			chHotelMapCtrl: "^chHotelMap",
		},
		bindings: {
			hotel: "<",
			markerType: "@"
    	},
		controller: HotelMapMarkerCtrl,
		template:
			"<div ng-if='$ctrl.hotel' ng-switch='$ctrl.markerType'>" +
				"<div ng-switch-when='pointer'>" +
					"<marker class='clickable' id='mk_{{$ctrl.hotel.id}}' ng-if='$ctrl.$$position' position='[{{$ctrl.$$position.lat()}}, {{$ctrl.$$position.lng()}}]' " +
						"icon='{{$ctrl.$$markerIcon}}' on-mouseover='$ctrl.$showDetails($ctrl.hotel)'></marker>" +
				"</div>" + 
				"<div ng-switch-default>" +
		    		"<custom-marker id='cmk_{{$ctrl.hotel.id}}' ng-if='$ctrl.$$position' position='[{{$ctrl.$$position.lat()}}, {{$ctrl.$$position.lng()}}]'" +
		    			"on-click='$ctrl.$showDetails($ctrl.hotel, true)' on-mouseover='$ctrl.$setSelected($ctrl.hotel, true)' on-mouseout='$ctrl.$setSelected($ctrl.hotel, false)'>" +
		    			"<div class='clickable' ng-class='{\"animated bounce\": $ctrl.hotel.selected && $ctrl.hotel.selectEffect}'>" +
				    		"<div class='ch-marker-inner md-caption' ng-class='{\"bg-primary\": $ctrl.markerType == \"name\" || $ctrl.hotel.selected," +  
			    				"\"bg-primary-light\": $ctrl.markerType == \"price\" && !$ctrl.hotel.selected && $ctrl.hotel.price ," + 
				    			"\"bg-gray-light\": $ctrl.markerType == \"price\" && !$ctrl.hotel.selected && !$ctrl.hotel.price}' ng-switch='$ctrl.markerType'>" +
			    				"<span ng-switch-when='price'>" +
				    				"<div ng-if='$ctrl.hotel.price'>" +
				    					"<span>{{($ctrl.hotel.price.amount.finalAmount|chCurrency)}}</span>" +
				    				"</div>" +
				    				"<div ng-if='!$ctrl.hotel.price'>" +
				    					"<md-icon class='mdi mdi-emoticon-sad md-18 text-white'></md-icon>" +
				    				"</div>" +
			    				"</span>" +
			    				"<strong ng-switch-default>{{$ctrl.hotel.name}}</strong>" +
			    			"</div>" +
			    			"<div class='arrow-down arrow-sm' ng-class='{\"border-primary\": $ctrl.markerType == \"name\" || $ctrl.hotel.selected," +  
			    				"\"border-primary-light\": $ctrl.markerType == \"price\" && !$ctrl.hotel.selected && $ctrl.hotel.price ," + 
				    			"\"border-gray-light\": $ctrl.markerType == \"price\" && !$ctrl.hotel.selected && !$ctrl.hotel.price}'></div>" + 
		    			"</div>" +
		    		"</custom-marker>" +
	    		"</div>" +
			"</div>"
	});
	
	/* @ngInject */
	function HotelMapMarkerCtrl($scope) {
		var ctrl = this;
		
		this.$onInit = function() {
			ctrl.markerType = _.includes(["pointer", "price", "name"], _.toLower(ctrl.markerType)) ? _.toLower(ctrl.markerType) : "pointer";
			ctrl.$$markerIcon = "/resources/public/img/common/map-marker.01.png";
			ctrl.$getMarkerPosition();
		};
		
		scope.getMarkerPosition = function() {
    		if (!ctrl.hotel || !ctrl.hotel.addressInfo) {
    			return;
    		}
    		
    		if (ctrl.hotel.addressInfo.geo && !_.isEmpty(ctrl.hotel.addressInfo.geo.coordinates)) {
    			ctrl.$$position = new google.maps.LatLng({lat: ctrl.hotel.addressInfo.geo.coordinates[1], lng: ctrl.hotel.addressInfo.geo.coordinates[0]});
    			
    		} else {	    		
    	  	  	var fullAddress = ctrl.hotel.addressInfo.address +", "+ ctrl.hotel.addressInfo.city +", "+ ctrl.hotel.addressInfo.zipcode;

    	  	  ctrl.chHotelMapCtrl.$$geocoder.geocode({"address": fullAddress}, function(results, status) {
    	  	  		if (status == google.maps.GeocoderStatus.OK) {
    	  	  		ctrl.$$position = results[0].geometry.location;

    	  	  		} else {
				    	console.error("Error geocoding hotel '" + ctrl.hotel.name + "' (address: " + fullAddress + "): " + status);
				    }
				});
    		}
    	};
    	
    	this.$setSelected = function(ev, hotel, selected) {
    		if (hotel) {
    			hotel.selectEffect = false;
    			hotel.selected = _.isBoolean(selected) ? selected : true;
    		}
    	};
    	
    	this.$showDetails = function(ev, hotel, isCustomMarker) {
    		// chiudo i dettagli attuali (se diversi dall"hotel passato)
    		if (!ctrl.chHotelMapCtrl.$$currHotel || ctrl.chHotelMapCtrl.$$currHotel.id != hotel.id) {
    			ctrl.$hideDetails(ev, ctrl.chHotelMapCtrl.$$currHotel);
	    		// imposto a selezionato
	    		ctrl.$setSelected(ev, hotel, true);
	    		// aggiorno l"hotel corrente
	    		ctrl.chHotelMapCtrl.$$currHotel = hotel;
    		}

    		// mostro i dettagli dell"hotel
    		ctrl.chHotelMapCtrl.$$map.showInfoWindow("hotel-iw", isCustomMarker ? "cmk_" + hotel.id : "mk_" + hotel.id);
    	};
    	
    	this.$hideDetails = function(ev, hotel) {
    		// rimuovo il selezionato
    		ctrl.$setSelected(ev, hotel, false);
    		// chiudo i dettagli dell"hotel
    		ctrl.chHotelMapCtrl.$$map.hideInfoWindow("hotel-iw");
    	};
	}
})();