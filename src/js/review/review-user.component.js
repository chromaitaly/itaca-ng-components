(function() {
	'use strict';
	
	angular.module("itaca.components").component("chReviewUser", {
		transclude: true,
		require: {
			chReviewCtrl: '^chReview'
		},
		bindings: {
			dateFormat: "@",
			hideUser: "<?",
			hideDate: "<?",
    		userState: "@?",
    		userStateParams: "<?",
    		userClick: "&?"
		},
		controller: ReviewUserCtrl,
		template: 
			"<div flex>" +
				"<div ng-if=\"!$ctrl.noDefault && !$ctrl.hideUser\" class=\"bg-gray-lighter flex layout-row layout-wrap layout-padding\">" +
		    		"<div class=\"layout-row layout-padding-sm no-padding no-outline\" ng-class=\"{'clickable': $ctrl.userState || $ctrl.userClick}\" ng-click=\"$ctrl.$userClick($event)\" aria-label=\"Toggle user action\">" +
		    			"<div>" +
							"<span ng-if=\"$ctrl.userAvatar && $ctrl.review.reviewSettings.showAvatar && !$ctrl.review.reviewSettings.anonymous\"" +
								"class=\"relative menu-user-avatar-small display-block overflow-hidden\">" +
								"<img alt=\"User profile image\" class=\"full-width\" ng-src=\"{{$ctrl.userAvatar}}\" lazy-image />" +
							"</span>" +
							"<span ng-if=\"(!$ctrl.review.reviewSettings.showAvatar || !$ctrl.userAvatar) && !$ctrl.review.reviewSettings.anonymous\"" +
								"class=\"bg-blue-sea menu-user-avatar-small layout-row layout-align-center-center\">" +
								"<span class=\"md-headline text-uppercase\">{{!$ctrl.review.reviewSettings.showRealName && ($ctrl.review.createdBy || $ctrl.review.reservation.guest).nickname ? ($ctrl.review.createdBy || $ctrl.review.reservation.guest).nickname.charAt(0) : ($ctrl.review.createdBy || $ctrl.review.reservation.guest).name.charAt(0)}}</span>" +
							"</span>" +
							"<md-icon ng-if=\"$ctrl.review.reviewSettings.anonymous\" class=\"mdi mdi-account-circle md-38\"></md-icon>" +
						"</div>" +
			    		"<div class=\"layout-align-center-start layout-column no-padding-bottom no-padding-top row-1\">" +
			    			"<span class=\"font-10 text-gray-light row-1\"><span translate=\"common.written.by.female\"></span></span>" +
			    			"<div>" +
				    			"<strong class=\"md-subhead\">"+
				    				"<span ng-if=\"!$ctrl.review.reviewSettings.anonymous && ($ctrl.review.createdBy || $ctrl.review.reservation.guest)\">" +
						    			"<span ng-if=\"!$ctrl.review.reviewSettings || $ctrl.review.reviewSettings.showRealName || !$ctrl.review.createdBy.nickname\">" +
						    				"<span ng-if=\"$ctrl.review.createdBy\">{{::$ctrl.review.createdBy.name}}&nbsp;{{::$ctrl.review.createdBy.surname}}</span>" +
						    				"<span ng-if=\"!$ctrl.review.createdBy && $ctrl.review.reservation.guest\">{{::$ctrl.review.reservation.guest.name}}&nbsp;{{::$ctrl.review.reservation.guest.surname}}</span>" +
					    				"</span>" +
					    				"<span ng-if=\"$ctrl.review.reviewSettings && !$ctrl.review.reviewSettings.showRealName && $ctrl.review.createdBy.nickname\">" +
						    				"<span ng-if=\"$ctrl.review.createdBy\">{{::$ctrl.review.createdBy.nickname}}</span>" +
						    				"<span ng-if=\"!$ctrl.review.createdBy && $ctrl.review.reservation.guest\">{{::$ctrl.review.reservation.guest.nickname}}</span>" +
					    				"</span>" +
				    				"</span>" +
					    			"<span ng-if=\"$ctrl.review.reviewSettings.anonymous || (!$ctrl.review.createdBy && !$ctrl.review.reservation.guest)\" translate=\"common.anonymous\"></span>" +
					    		"</strong>" +
					    		"<span ng-if=\"$ctrl.review.createdDate && !$ctrl.hideDate\" class=\"font-10 text-gray-light\">" +
					    			"<span>&nbsp;-&nbsp;{{$ctrl.review.createdDate|utcDate:$ctrl.dateFormat}}</span>" +
					    		"</span>" +
				    		"</div>" +
			    			"<small class=\"font-10 text-gray-light row-1 text-lowercase\" ng-if=\"!$ctrl.review.reviewSettings.anonymous && $ctrl.review.guest.reviewsCount\">" +
								"<span>{{::$ctrl.review.guest.reviewsCount}}&nbsp;</span>" +
								"<span ng-if=\"$ctrl.review.guest.reviewsCount == 1\" translate=\"reviews.review\"></span>" +
								"<span ng-if=\"$ctrl.review.guest.reviewsCount != 1\" translate=\"reviews.reviews\"></span>" +
							"</small>" +
			    		"</div>" +
			    	"</div>" +
		    	"</div>" +
				"<div flex ng-transclude></div>" +
			"</div>"
	});
	
	 /* @ngInject */
	function ReviewUserCtrl($scope, Navigator) {
		var ctrl = this;
		
		this.$onInit = function() {
			ctrl.hideUser = _.isBoolean(ctrl.hideUser) ? ctrl.hideUser : ctrl.chReviewCtrl.hideUser;
			ctrl.hideDate = _.isBoolean(ctrl.hideDate) ? ctrl.hideDate : ctrl.chReviewCtrl.hideDate;
			ctrl.dateFormat = !_.isNil(ctrl.dateFormat) ? ctrl.dateFormat : ctrl.chReviewCtrl.dateFormat;
			
			ctrl.$initReview();
		};

		this.$initReview = function(){
    		if (!ctrl.chReviewCtrl.review) {
    			return;
    		}
    		
    		ctrl.review = ctrl.chReviewCtrl.review;
		};
		
		this.$userClick = function(ev) {
    		if (ctrl.userState) {
    			Navigator.goToState(ctrl.userState, ctrl.userStateParams);
    			
    		} else {
    			ctrl.userClick && ctrl.userClick({$event: ev, $review: ctrl.review});
    		}
    	};
	}
})();