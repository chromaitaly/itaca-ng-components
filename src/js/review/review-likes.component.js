(function() {
	'use strict';
	
	angular.module("itaca.components").component("chReviewLikes", {
		require: {
			chReviewCtrl: '^chReview'
		},
		bindings: {
			contentClass: "@"
		},
		controller: ReviewLikesCtrl,
		template:
			"<div ng-if=\"$ctrl.review.likes.length\" class=\"{{$ctrl.contentClass}}\" >" +
				"<small>" +
					"<md-icon class=\"mdi md-14 mdi-thumb-up text-primary\"></md-icon>&nbsp;" +
					"<span ng-if=\"!$ctrl.review.helpful\" class=\"text-lowercase\">" +
						"<span>{{$ctrl.review.likes.length}}&nbsp;</span>" +
						"<span ng-if=\"$ctrl.review.likes.length == 1\" translate=\"review.likes.count\"></span>" +
						"<span ng-if=\"$ctrl.review.likes.length != 1\" translate=\"review.likes.count.plur\"></span>" +
					"</span>" +
					"<span ng-if=\"$ctrl.review.helpful\">" +
						"<span ng-if=\"$ctrl.review.likes.length == 1\" translate=\"review.likes.you\"></span>" +
						"<span ng-if=\"$ctrl.review.likes.length != 1\" translate=\"review.likes.you.other\" translate-values=\"{num: $ctrl.review.likes.length}\"></span>" +
					"</span>" +
				"</small>" +
			"</div>"
	});
	
	 /* @ngInject */
	function ReviewLikesCtrl($scope) {
		var ctrl = this;
		
		this.$onInit = function() {
			ctrl.contentClass = ctrl.contentClass || "layout-padding bg-gray-lighter text-primary";
			ctrl.$initReview();
		};
		
		this.$initReview = function(){
    		if (!ctrl.chReviewCtrl.review) {
    			return;
    		}
    		
    		ctrl.review = ctrl.chReviewCtrl.review;
		};
	}
})();