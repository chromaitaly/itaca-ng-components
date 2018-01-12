(function() {
    'use strict';
    
    angular.module("itaca.components").component("chSlidingGallery", {
    	bindings: {
    		gallery: "<?",
    		baseUrl: "<?",
    		sort: "<?",
    		sortFn: "&?",
    		openOnClick: "<?",
			tooltip: "@",
    		dialogTitle: "@",
			onReady: "&",
            slidesPerView: "<?",
            slidesPerColumn: "<?",
            spaceBetween: "<?",
            parallax: "<?",
            parallaxTransition: "@",
            paginationIsActive: "<?",
            paginationClickable: "<?",
            showNavButtons: "<?",
            showScrollBar: "<?",
            loop: "<?",
            autoplay: "<?",
            initialSlide: "<?",
            containerCls: "@",
            wrapperCls: "@",
            paginationCls: "@",
            slideCls: "@",
            direction: "@",
            swiper: "<?",
            overrideParameters: "<?",
        	lazyLoading: "<?"
    	},
		controller: GalleryCtrl,
		template: 
			"<div flex ng-if=\"$ctrl.gallery.length\">" +
				"<ks-swiper-container " +
					"override-parameters=\"$ctrl.$$overrideParameters\"" +
					"container-cls=\"{{$ctrl.containerCls}}\"" +
					"wrapper-cls=\"{{$ctrl.wrapperCls}}\"" +
					"pagination-cls=\"{{$ctrl.paginationCls}}\"" +
					"slide-cls=\"{{$ctrl.slideCls}}\"" +
					"slides-per-view=\"$ctrl.slidesPerView\"" +
					"slides-per-column=\"$ctrl.slidesPerColumn\"" +
				    "autoplay=\"$ctrl.autoplay\"" +
				    "direction=\"{{$ctrl.direction}}\"" +
		    		"show-nav-buttons=\"$ctrl.showNavButtons\"" +
		    		"show-scroll-bar=\"$ctrl.showScrollBar\"" +
		    		"pagination-is-active=\"$ctrl.paginationIsActive\"" +
		    		"pagination-clickable=\"$ctrl.paginationClickable\"" +
				    "initial-slide=\"$ctrl.initialSlide\"" +
		    		"space-between=\"$ctrl.spaceBetween\"" +
		    		"parallax=\"$ctrl.parallax\"" +
		    		"parallax-transition=\"{{$ctrl.parallaxTransition}}\"" +
		    		"loop=\"$ctrl.loop\"" +
		    		"swiper=\"$ctrl.swiper\"" +
		    		"on-ready=\"$ctrl.onReady\">" +
				    "<ks-swiper-slide slider-cls=\"no-bg\" ng-class=\"{'text-center': $ctrl.$$overrideParameters.centeredSlides}\" ng-repeat=\"image in $ctrl.gallery track by $index\">" +
						"<!-- Preloaded Image -->" +
		    			"<div ng-if=\"!$ctrl.$$overrideParameters.lazyLoading\" class=\"{{$ctrl.slideCls}} bg-center-center clickable\" ng-style=\"{'background-image': 'url('+$ctrl.baseUrl + image.path+')'}\"" +
		    				 "ng-click=\"$ctrl.$openGallery($event, $index)\"></div>" +
			    		 "<!-- Lazy Loading Image -->" +
			    		 "<div ng-if=\"$ctrl.$$overrideParameters.lazyLoading\" ng-attr-data-background=\"{{$ctrl.baseUrl}}{{image.path}}\" class=\"{{$ctrl.slideCls}} bg-center-center clickable swiper-lazy\"" +
			    		 	"ng-click=\"$ctrl.$openGallery($event, $index)\">" +
			                "<div class=\"swiper-lazy-preloader swiper-lazy-preloader-white\"></div>" +
			            "</div>" +
		    		"</ks-swiper-slide>" +
				"</ks-swiper-container>" +
				"<md-tooltip ng-if=\"$ctrl.openOnClick\">" +
					"<span ng-if=\"!$ctrl.tooltip\" translate=\"photo.gallery.click.to.open\"></span>" +
					"<span ng-if=\"$ctrl.tooltip\" ng-bind=\"$ctrl.tooltip\"></span>" +
				"</md-tooltip>" +
			"</div>"
    });
    
    /* @ngInject */
    function GalleryCtrl($scope, Dialog) {
    	var ctrl = this;
    	
    	this.$onInit = function() {
    		ctrl.direction = ctrl.direction || "horizontal";
    		ctrl.containerCls = ctrl.containerCls || "index-0 bg-gray-base";
    		ctrl.wrapperCls = ctrl.wrapperCls || "layout-row layout-align-start-center";
    		ctrl.paginationCls = ctrl.paginationCls || "swiper-pagination-white";
    		ctrl.slidesPerView = ctrl.slidesPerView || 1;
			ctrl.slidesPerColumn = ctrl.slidesPerColumn || 1;
			ctrl.loop = _.isBoolean(ctrl.loop) ? ctrl.loop : true;
			ctrl.showNavButtons = _.isBoolean(ctrl.showNavButtons) ? ctrl.showNavButtons : true;
			ctrl.paginationIsActive = _.isBoolean(ctrl.paginationIsActive) ? ctrl.paginationIsActive : true;
			ctrl.paginationClickable = _.isBoolean(ctrl.paginationClickable) ? ctrl.paginationClickable : true;
			ctrl.spaceBetween = ctrl.spaceBetween || 0;
			ctrl.lazyLoading = _.isBoolean(ctrl.lazyLoading) ? ctrl.lazyLoading : true;
    		
    		ctrl.$$overrideParameters = {
    			keyboardControl: true,  
    			grabCursor: ctrl.showNavButtons, 
				centeredSlides: true, 
				lazyLoading: ctrl.lazyLoading,
				preloadImages: !ctrl.lazyLoading,
				lazyLoadingInPrevNext: ctrl.lazyLoading, 
				autoplayDisableOnInteraction: false,
				pagination: false,
				watchSlidesVisibility: ctrl.lazyLoading && (ctrl.slidesPerView == 'auto' || ctrl.slidesPerView > 1)
    		};
    		
    		ctrl.$overrideConfig();
    		ctrl.$sortGallery();
    	};
    	
    	this.$sortGallery = function() {
    		var sortBy = angular.isFunction(ctrl.sortFn) ? ctrl.sortFn : _.isBoolean(ctrl.sort) && ctrl.sort ? function(o){ return +Boolean(o.cover)} : ctrl.sort;
    		
    		if (sortBy) {
    			ctrl.gallery = _.sortBy(ctrl.gallery, angular.isFunction(sortBy) ? [sortBy] : sortBy);
    		}
    	};
    	
    	this.$overrideConfig = function() {
    		_.assign(ctrl.$$overrideParameters, ctrl.overrideParameters);
    	};
    	
    	this.$openGallery = function(ev, idx){
    		if (ctrl.openOnClick && !_.isEmpty(ctrl.gallery)) {
    			Dialog.showGallery(ev, ctrl.dialogTitle, ctrl.gallery, {storageUrl: ctrl.baseUrl, initialSlide: idx || 0});
    		}
    	};
    }
})();
    