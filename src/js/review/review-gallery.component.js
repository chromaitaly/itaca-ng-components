(function() {
	"use strict";
	
	angular.module("itaca.components").component("chReviewGallery", {
		transclude: true,
		require: {
			chReviewCtrl: "^chReview"
		},
		bindings: {
			imgBaseUrl: "@?",
			defaultImgUrl: "@?",
			title: "@"
		},
		controller: ReviewGalleryCtrl,
		template:
			"<div ng-if=\"$ctrl.review.gallery.length\" flex layout-padding>" +
				"<div class=\"layout-row layout-wrap layout-padding-sm layout-align-center-center layout-align-gt-sm-start-center\">" +
					"<span class=\"flex-100 font-12 ng-scope no-padding-bottom text-gray-light\">" +
						"<span ng-if=\"!$ctrl.title\"><span translate=\"common.gallery\"></span>:</span>" +
						"<span ng-if=\"$ctrl.title\" ng-bind=\"$ctrl.title\"></span>" +
					"</span>" +
					"<div ng-repeat=\"photo in $ctrl.review.gallery\" class=\"clickable\" ng-click=\"$ctrl.$openGallery($event, $index)\" aria-label=\"Open review gallery\">" +
						"<img ng-src=\"{{$ctrl.imgBaseUrl + photo.path}}\" alt=\"{{photo.tags[0]}}\" lazy-image" +
							"default-img-url=\"{{$ctrl.defaultImgUrl}}\" class=\"width-100\">" +
					"</div>" +
				"</div>" +
			"</div>"
	});
	
	 /* @ngInject */
	function ReviewGalleryCtrl(AppOptions, $translate, Dialog, StringUtils) {
		var ctrl = this;
		
		this.$onInit = function() {
			ctrl.imgBaseUrl = ctrl.imgBaseUrl || ctrl.chReviewCtrl.imgBaseUrl;
			
    		if (StringUtils.isBoolean(ctrl.imgBaseUrl)) {
    			ctrl.imgBaseUrl = StringUtils.toBoolean(ctrl.imgBaseUrl) && AppOptions.config && AppOptions.config.amz ? AppOptions.config.amz.baseUrl+"/"+AppOptions.config.amz.bucketName+"/" : "";
    		}
    		
    		ctrl.defaultImgUrl = ctrl.defaultImgUrl || "/resources/public/img/no-gallery-image.png";
			
			ctrl.$initReview();
		};
		
		this.$initReview = function(){
    		if (!ctrl.chReviewCtrl.review) {
    			return;
    		}
    		
    		ctrl.review = ctrl.chReviewCtrl.review;
		};
		
		this.$openGallery = function(ev, idx){
			$translate(ctrl.review.label).then(function(message){
				var title = ctrl.review.score + ":&nbsp;";
				title += ctrl.review.title ? ctrl.review.title : message;
					
				Dialog.showGallery(ev, title, ctrl.review.gallery, {storageUrl: ctrl.imgBaseUrl, initialSlide: idx || 0});
			});
		};
	}
})();