(function(){
	"use strict";
	
	angular.module("itaca.components").component("chHotelMapInfoWindow", {
		bindings: {
			hotel: "<",
			showGallery: "<?",
			storageUrl: "@",
			markerType: "@",
			onHotelClick: "&?"
    	},
		controller: HotelMapInfoWindowCtrl,
		template:
	     	"<div ng-if='$ctrl.hotel' style='max-width: 300px;'>" +
	     		"<div ng-if='$ctrl.showGallery' style='width: 100%; max-height: 200px; min-height: 100px'>" +
		     		"<div class='relative'>" +	
						"<div class='img-top-bar'>" +
							"<div class='img-top-left-cont layout-row'>" +
								"<div class='md-subhead row-mini' ng-if='$ctrl.hotel.recommended'>" +
				           	 		"<small class='label gradient-yellow'>" +
				          				"<md-icon class='mdi mdi-thumb-up md-14 text-white'></md-icon>&nbsp;" +
				             			"<span translate='common.recommended'></span>" +
				             		"</small>" +
				             	"</div>" +
								"<div flex></div>" +
								"<ch-hotel-favorite ng-if='$ctrl.hotel' hotel='$ctrl.hotel'></ch-hotel-favorite>" +
							"</div>" +
						"</div>" +	
						"<img ng-if='!$ctrl.hotel.gallery.length' class='main-image' ng-attr-alt='{{$ctrl.hotel.name}}' src='/resources/public/img/common/header.jpg'>" +
			     		"<ch-sliding-gallery ng-if='$ctrl.hotel.gallery.length'" +
				    		"gallery='$ctrl.hotel.gallery'" +
				    		"dialog-title='{{$ctrl.hotel.name}}'" +
				    		"tooltip=\"{{\"hotel.gallery.view.click\"|translate}}\"" +
				    		"base-url='$ctrl.storageUrl'" +
				    		"sort='true'" +
				    		"autoplay='0'" +
				    		"slide-cls='bg-header bg-cover'" +
				    		"container-cls='full-height'" +
							"wrapper-cls='layout-row layout-align-start-center'" +
				    		"open-on-click='true' layout style='height:150px'>" +
				    	"</ch-sliding-gallery>" +
			    	"</div>" +
				"</div>" +
				"<div layout='column' class='md-padding no-padding-left no-padding-right no-padding-bottom text-left'>" +
					"<div flex>" +
	          			"<div md-truncate>" +
			            	"<span class='md-subhead' ng-bind='$ctrl.hotel.name'></span>" +
			            "</div>" +
			            "<div layout>" +
			            	"<div flex>" +
			            		"<div ng-if='$ctrl.hotel.type'><small class='label label-inline-block gradient-gray text-white text-wrap'><span translate='hotel.type.{{$ctrl.hotel.type}}'></span></small></div>" + 
					            "<div class='md-body-1 text-gray-light'>" +
					            	"<span>{{$ctrl.hotel.addressInfo.district}}</span>,&nbsp;<strong>{{$ctrl.hotel.addressInfo.city}}</strong>" +
					            "</div>" +
					            "<div class='md-body-1 text-gray-light'>" +
					            	"<md-icon class='mdi mdi-map-marker md-14'></md-icon>&nbsp;<small><em>{{$ctrl.hotel.addressInfo.address}},&nbsp;{{$ctrl.hotel.addressInfo.zipcode}}</em></small>" +
					            "</div>" +
				            "</div>" +								     
				            "<div ng-if='$ctrl.markerType == \"price\"'>" + 
						      	"<md-button ng-if='$ctrl.hotel.price' class='only-border border-success text-success no-margin-top no-margin-right' ng-click='$ctrl.$hotelClick()' aria-label='Book now'>" +
			          				"<div class='row-mini text-left'>" +
				          				"<div layout='column'>" +
							        		"<small>" +
							        			"<span class='text-initial' translate='common.from'></span>" +
							        			"<i ng-if='$ctrl.hotel.price.amount.initialAmount > 0 && $ctrl.hotel.price.amount.initialAmount > $ctrl.hotel.price.amount.finalAmount'>&nbsp;<del>{{$ctrl.hotel.price.amount.initialAmount|chCurrency}}</del></i>" +
							        		"</small>" +
								        	"<span class='md-subhead row-mini'><strong>{{($ctrl.hotel.price.amount.finalAmount|chCurrency)}}</strong></span>" +
								        	"<small ng-if='$ctrl.hotel.nights > 0' class='text-lowercase'>" +
								        		"<span translate='common.for'></span>&nbsp;{{$ctrl.hotel.nights}}&nbsp;" +
								        		"<span ng-show='$ctrl.hotel.nights == 1' translate='common.night'></span>" +
								        		"<span ng-show='$ctrl.hotel.nights > 1' translate='common.nights'></span>" +
								        	"</small>" +
							        	"</div>" +
									"</div>" +
			          			"</md-button>" +
			          			"<div ng-if='!$ctrl.hotel.price' layout='column' class='text-warn'>" +
			          				"<md-icon class='mdi mdi-emoticon-sad md-32 text-warn'></md-icon>" +
			          				"<strong translate='reservation.availability.missed'></strong>" +
			          			"</div>" +
		          			"</div>" +
	          			"</div>" +
          			"</div>" +
          			"<div ng-if='$ctrl.markerType == \"price\"'>" + 
	          			"<div layout layout-padding layout-wrap class='no-padding-right no-padding-left no-padding-bottom' ng-if='$ctrl.hotel.price && $ctrl.hotel.roomsCounter.actual >= 1'>" +
	          				"<div flex-xs='100' flex-gt-xs layout layout-align='start center' class='text-success no-padding-left'>" +
          						"<strong><em translate='reservation.availability.ok.simple'></em></strong>" +
	          				"</div>" +
	          				"<div flex-xs='100' flex layout='column' class='no-padding'>" + 
		          				"<md-button class='bg-success no-margin-left no-margin-right' ng-click='$ctrl.$hotelClick()' aria-label='Book now'>" +
									"<span translate='common.book'></span>" +
								"</md-button>" +
		          			"</div>" +
	          			"</div>" +
	          			"<div layout layout-padding layout-wrap class='no-padding-right no-padding-left no-padding-bottom' ng-if='!$ctrl.hotel.price || $ctrl.hotel.roomsCounter.actual <= 0'>" +
	          				"<div flex-xs='100' flex-gt-xs layout layout-align='start center' class='text-warn no-padding-left'>" +
          						"<strong><em translate='reservation.availability.missed.full'></em></strong>" +
	          				"</div>" +
	          				"<div flex-xs='100' flex layout='column' class='no-padding'>" + 
		          				"<md-button class='bg-warn no-margin-left no-margin-right' ng-click='$ctrl.$hotelClick()' aria-label='Search other dates'>" +
									"<span translate='reservation.view.other.period'></span>" +
								"</md-button>" +
		          			"</div>" +
	          			"</div>" +
          			"</div>" +			          			
		      	"</div>" +
	     	"</div>"
	});
	
	/* @ngInject */
	function HotelMapInfoWindowCtrl($scope) {
		var ctrl = this;
		
		this.$onInit = function() {
			ctrl.markerType = _.includes(["pointer", "price", "name"], _.toLower(ctrl.markerType)) ? _.toLower(ctrl.markerType) : "pointer";
		};
		
		this.$hotelClick = function(ev) {
			ctrl.onHotelClick && ctrl.onHotelClick({$event: ev, hotel: ctrl.hotel});
		};
	}
})();