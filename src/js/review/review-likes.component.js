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
						"<span ng-if=\"$ctrl.review.likes.length > 1\" ng-switch on=\"$ctrl.review.likes.length-1\">" +
							"<span ng-switch-when=\"1\" translate=\"review.likes.you.other\"></span>" +
							"<span ng-switch-default translate=\"review.likes.you.others\" translate-values=\"{num: $ctrl.review.likes.length-1}\"></span>" +
						"</span>" +
					"</span>" +
				"</small>" +
			"</div>"
	});
	
	 /* @ngInject */
	function ReviewLikesCtrl($scope, AppOptions) {
		var ctrl = this;
		
		this.$onInit = function() {
			ctrl.contentClass = ctrl.contentClass || "layout-padding bg-gray-lighter text-primary";
			ctrl.$initReview();
			ctrl.$initLikes();
			ctrl.$initWatchers();
		};
		
		this.$initReview = function(){
    		if (!ctrl.chReviewCtrl.review) {
    			return;
    		}
    		
    		ctrl.review = ctrl.chReviewCtrl.review;
		};
		
		this.$initLikes = function() {
			ctrl.review.helpful = AppOptions.guest &&  AppOptions.guest.id && _.some(ctrl.review.likes, function(userId) {
				return _.isEqual(userId, AppOptions.guest.id);
			});
		};
		
		this.$initWatchers = function() {
    		$scope.$watchCollection(function() {
    			return ctrl.review.likes;
    			
    		}, function(newVal, oldVal) {
    			ctrl.$initLikes();
				ctrl.review.thanksNow = _.isEqual(newVal, oldVal) ? false : Boolean(ctrl.review.helpful);
    		});  		
    	};
	}
})();