(function(){
	'use strict';
	
	angular.module("itaca.components").component("chHotelMapInfoWindow", {
		require: {
			chHotelMapCtrl: '^chHotelMap',
			ngMapCtrl: "ngMap"
		},
		bindings: {
			hotel: "<",
			showGallery: "<?",
			markerType: "@",
			onHotelClick: "&?"
    	},
		controller: HotelMapInfoWindowCtrl,
		template:
			'<info-window id="hotel-iw">' +
		     	'<div ng-non-bindable style="max-width: 300px;">' +
		     		'<div ng-if="$ctrl.showGallery" style="width: 100; max-height: 200px" ng-init="config.noTop = true">' +
						'<div flex ng-controller="slideGalleryCtrl" ng-init="bindGallery($ctrl.hotel.gallery); overrideConfig({autoplay: 0});">' +
							'<div class="relative">' +				   		  			
								'<div class="img-top-bar">' +
									'<div class="img-top-left-cont layout-row">' +
										'<div class="md-subhead row-mini" ng-if="$ctrl.hotel.recommended">' +
						           	 		'<small class="label gradient-yellow">' +
						          				'<md-icon class="mdi mdi-thumb-up md-14 text-white"></md-icon>&nbsp;' +
						             			'<span translate="common.recommended"></span>' +
						             		'</small>' +
						             	'</div>' +
										'<div flex></div>' +
										'<span ng-if="$ctrl.hotel" ng-controller="favoriteCtrl" ng-init="init($ctrl.hotel)">' +
							        		'<md-button class="md-icon-button bg-opaque-5" ng-click="setFavorite()" aria-label="Like hotel">' +
								        		'<md-icon ng-show="!$ctrl.hotel.favorite" class="mdi mdi-heart-outline text-white md-24"></md-icon>' +
								        		'<md-icon ng-show="$ctrl.hotel.favorite" class="mdi mdi-heart text-danger md-24" ng-class="{\'animated rubberBand\': $ctrl.hotel.favorite}"></md-icon>' +
								        		'<md-tooltip><span translate="common.favorite.set"></span></md-tooltip>' +
								        	'</md-button>' +
							        	'</span>' +
									'</div>' +
								'</div>' +
								'<div ng-show="loading" flex layout layout-align="center center">' +
						   	 		'<md-progress-circular class="md-primary ch-progress" md-mode="indeterminate" md-diameter="40"></md-progress-circular>' +
							  	'</div>' +
							  	'<img ng-if="!gallery.length && !loading" class="main-image" ng-attr-alt="{{$ctrl.hotel.name}}" src="/resources/public/img/header.jpg">' +
								'<ks-swiper-container class="button-mini" ng-if="gallery.length && galleryConfig.storageUrl && !loading"' + 
									'override-parameters="{' +
										'grabCursor: galleryConfig.navButtons,' + 
										'keyboardControl: galleryConfig.keyboardControl,' + 
										'onSlideChangeStart: loadImageTags,'+  
										'centeredSlides: galleryConfig.centered,' + 
										'autoplayDisableOnInteraction: galleryConfig.autoplayDisableOnInteraction,' +
										'preloadImages: !galleryConfig.lazyLoading,' + 
										'lazyLoading: galleryConfig.lazyLoading,' +
										'lazyLoadingInPrevNext: galleryConfig.lazyLoading,' + 
										'pagination: false,' +
										'watchSlidesVisibility: galleryConfig.lazyLoading && (galleryConfig.slidesPerView == \'auto\' || galleryConfig.slidesPerView > 1)}"' +
									'container-cls="index-0 bg-gray-base"' + 
									'wrapper-cls="layout-row layout-align-start-center"' +
									'pagination-cls="swiper-pagination-white"' +
									'slides-per-view="galleryConfig.slidesPerView"' +
									'slides-per-column="galleryConfig.slidesPerColumn"' +
								    'centered="galleryConfig.centered"' +
								    'autoplay="galleryConfig.autoplay"' + 
								    'direction="{{galleryConfig.direction}}"' +
						    		'show-nav-buttons="galleryConfig.navButtons"' +
						    		'pagination-is-active="galleryConfig.pagination"' +
						    		'pagination-clickable="galleryConfig.paginationClickable"' +
								    'initial-slide="galleryConfig.initialSlide"'+  
						    		'space-between="galleryConfig.spaceBetween"' + 
						    		'loop="galleryConfig.loop">' +
								    '<ks-swiper-slide slider-cls="no-bg" ng-class="{\'text-center\': galleryConfig.centered}" ng-repeat="image in gallery track by $index">' +
						    			'<div ng-if="!galleryConfig.lazyLoading" class="main-image" ng-style="{\'background-image\': \'url(\'+galleryConfig.storageUrl + image.path+\')\'}"></div>' +
							    		 '<div ng-if="galleryConfig.lazyLoading" ng-attr-data-background="{{galleryConfig.storageUrl}}{{image.path}}" class="main-image swiper-lazy">' +
							                '<div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>' +
							            '</div>' +
						    		'</ks-swiper-slide>' +
								'</ks-swiper-container>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div layout="column" class="md-padding no-padding-left no-padding-right no-padding-bottom text-left">' +
						'<div layout>' +
							'<div flex>' +
			          			'<div md-truncate>' +
					            	'<span class="md-subhead">{{$ctrl.hotel.name}}</span>' +
					            '</div>' +
					            '<div layout>' +
					            	'<div flex>' +
					            		'<div><small class="label label-inline-block gradient-gray text-white text-wrap"><span translate="hotel.type.{{$ctrl.hotel.type}}"></span></small></div>' + 
							            '<div class="md-body-1 text-gray-light">' +
							            	'<span>{{$ctrl.hotel.addressInfo.district}}</span>,&nbsp;<strong>{{$ctrl.hotel.addressInfo.city}}</strong>' +
							            '</div>' +
							            '<div class="md-body-1 text-gray-light">' +
							            	'<md-icon class="mdi mdi-map-marker md-14"></md-icon>&nbsp;<small><em>{{$ctrl.hotel.addressInfo.address}},&nbsp;{{$ctrl.hotel.addressInfo.zipcode}}</em></small>' +
							            '</div>' +
						            '</div>' +								     
						            '<div ng-if="$ctrl.markerType == \'price\'">' + 
								      	'<md-button ng-if="$ctrl.hotel.price" class="only-border border-success text-success no-margin-top no-margin-right">' +
					          				'<div class="row-mini text-left">' +
						          				'<div layout="column">' +
									        		'<small>' +
									        			'<span class="text-initial" translate="common.from"></span>' +
									        			'<i ng-if="$ctrl.hotel.price.amount.initialAmount > 0 && $ctrl.hotel.price.amount.initialAmount > $ctrl.hotel.price.amount.finalAmount">&nbsp;<del>{{$ctrl.hotel.price.amount.initialAmount|chCurrency}}</del></i>' +
									        		'</small>' +
										        	'<span class="md-subhead row-mini"><strong>{{($ctrl.hotel.price.amount.finalAmount|chCurrency)}}</strong></span>' +
										        	'<small ng-if="$ctrl.hotel.nights > 0" class="text-lowercase">' +
										        		'<span translate="common.for"></span>&nbsp;{{$ctrl.hotel.nights}}&nbsp;' +
										        		'<span ng-show="$ctrl.hotel.nights == 1" translate="common.night"></span>' +
										        		'<span ng-show="$ctrl.hotel.nights > 1" translate="common.nights"></span>' +
										        	'</small>' +
									        	'</div>' +
											'</div>' +
					          			'</md-button>' +
					          			'<div ng-if="!$ctrl.hotel.price" layout="column" class="text-warn">' +
					          				'<md-icon class="mdi mdi-emoticon-sad md-32 text-warn"></md-icon>' +
					          				'<strong translate="reservation.availability.missed"></strong>' +
					          			'</div>' +
				          			'</div>' +
			          			'</div>' +
					      	'</div>' +
	          			'</div>' +
	          			'<div ng-if="$ctrl.markerType == \'price\'">' + 
		          			'<div layout layout-padding layout-wrap class="no-padding-right no-padding-left no-padding-bottom" ng-if="$ctrl.hotel.price && $ctrl.hotel.roomsCounter.actual >= 1">' +
		          				'<div flex-xs="100" flex-gt-xs layout layout-align="start center" class="text-success no-padding-left">' +
	          						'<strong><em translate="reservation.availability.ok.simple"></em></strong>' +
		          				'</div>' +
		          				'<div flex-xs="100" flex layout="column" class="no-padding">' + 
			          				'<md-button class="bg-success no-margin-left no-margin-right" ng-click="$ctrl.$hotelClick()" aria-label="Book now">' +
										'<span translate="common.book"></span>' +
									'</md-button>' +
			          			'</div>' +
		          			'</div>' +
		          			'<div layout layout-padding layout-wrap class="no-padding-right no-padding-left no-padding-bottom" ng-if="!$ctrl.hotel.price || $ctrl.hotel.roomsCounter.actual <= 0">' +
		          				'<div flex-xs="100" flex-gt-xs layout layout-align="start center" class="text-warn no-padding-left">' +
	          						'<strong><em translate="reservation.availability.missed.full"></em></strong>' +
		          				'</div>' +
		          				'<div flex-xs="100" flex layout="column" class="no-padding">' + 
			          				'<md-button class="bg-warn no-margin-left no-margin-right" ng-click="$ctrl.$hotelClick()" aria-label="Search other dates">' +
										'<span translate="reservation.view.other.period"></span>' +
									'</md-button>' +
			          			'</div>' +
		          			'</div>' +
	          			'</div>' +			          			
			      	'</div>' +
		     	'</div>' +
	     	'</info-window>'
	});
	
	/* @ngInject */
	function HotelMapInfoWindowCtrl($scope) {
		var ctrl = this;
		
		this.$onInit = function() {
		};
		
		this.$hotelClick = function(ev) {
			ctrl.onHotelClick && ctrl.onHotelClick({$event: ev, hotel: ctrl.hotel});
		};
	}
})();
	