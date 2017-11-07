(function() {
	'use strict';
	
	angular.module("chroma.components").component("chReviewHotelInfo", {
		transclude: true,
		require: {
			chReviewCtrl: '^chReview'
		},
		bindings: {
			hideImage: "<?",
			imgBaseUrl: "@?"
		},
		controller: ReviewHotelInfoCtrl,
		template:
			"<div flex layout-padding class=\"md-subhead row-mini text-bold\">" +
				"<a ng-href=\"{{'/hotel/'+ $ctrl.review.hotel.id}}\" target=\"_blank\" class=\"display-block clickable\">" +
					"<span class=\"layout-row layout-align-start-center\">" +
						"<img ng-if=\"!$ctrl.hideImage && $ctrl.$$hotelImage\" class=\"md-margin menu-user-avatar-small no-margin-left no-margin-y-sides\" ng-src=\"{{$ctrl.$$hotelImage}}\">" +
						"<span class=\"no-padding layout-column\">" +
							"<span>" +
								"<span class=\"text-primary\">{{::$ctrl.review.hotel.name}}&nbsp;</span>" +
								"<span class=\"label label-xs\" translate=\"hotel.type.{{::$ctrl.review.hotel.type}}\"></span>" +
							"</span>" +
							"<small class=\"text-gray-light\">" +
								"<span>{{::$ctrl.review.hotel.addressInfo.city}}</span>,&nbsp;" +
								"<span>{{::$ctrl.review.hotel.addressInfo.address}}</span>" +
							"</small>" +
						"</span>" +
					"</span>" +
				"</a>" +
			"</div>"
	});
	
	 /* @ngInject */
	function ReviewHotelInfoCtrl($scope, AppOptions) {
		var ctrl = this;
		
		this.$onInit = function() {
			ctrl.hideImage = _.isBoolean(ctrl.hideImage) ? ctrl.hideImage : false;
			ctrl.imgBaseUrl = ctrl.imgBaseUrl || ctrl.chReviewCtrl.imgBaseUrl;
    		if (_.isBoolean(ctrl.imgBaseUrl)) {
    			ctrl.imgBaseUrl = ctrl.imgBaseUrl && AppOptions.config && AppOptions.config.amz ? AppOptions.config.amz.baseUrl+"/"+AppOptions.config.amz.bucketName+"/" : "";
    		}
			
			ctrl.$initReview();
			ctrl.$getHotelImage();
		};
		
		this.$initReview = function(){
    		if (!ctrl.chReviewCtrl.review) {
    			return;
    		}
    		
    		ctrl.review = ctrl.chReviewCtrl.review;
		};
		
		this.$getHotelImage = function(){
			var hotelImage = null;
			_.forEach(ctrl.review.hotel.gallery, function(photo, index, collection) {
				if (index == 0) {
					hotelImage = ctrl.imgBaseUrl + photo.path;
				}	
				
				if (photo.cover) {
					hotelImage = ctrl.imgBaseUrl + photo.path;
					return false;
				}				
			});
			
			ctrl.$$hotelImage = hotelImage;
		};
	}
})();