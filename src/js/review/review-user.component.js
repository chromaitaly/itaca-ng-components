(function() {
	'use strict';
	
	angular.module("itaca.components").component("chReviewUser", {
		transclude: true,
		require: {
			chReviewCtrl: '^chReview'
		},
		bindings: {
			dateFormat: "@",
			hideAvatar: "<?",
			hideUser: "<?",
			hideUserDetails: "<?",
			hideDate: "<?",
    		userState: "@?",
    		userStateParams: "<?",
    		userClick: "&?",
    		bgClass: "@",
    		avatarClass: "@",
		},
		controller: ReviewUserCtrl,
		template: 
			"<div flex>" +
				"<div ng-if=\"!$ctrl.noDefault && !$ctrl.hideUser\" class=\"{{$ctrl.bgClass}} flex layout-row layout-wrap layout-padding\">" +
		    		"<div class=\"layout-row layout-padding-sm no-padding no-outline\" ng-class=\"{'clickable': $ctrl.userState || $ctrl.userClick}\" ng-click=\"$ctrl.$userClick($event)\" aria-label=\"Toggle user action\">" +
		    			"<div ng-if=\"!$ctrl.hideAvatar\">" +
							"<span ng-if=\"$ctrl.userAvatar && $ctrl.review.reviewSettings.showAvatar && !$ctrl.review.reviewSettings.anonymous\"" +
								"class=\"relative {{$ctrl.avatarClass}} display-block overflow-hidden\">" +
								"<img alt=\"User profile image\" class=\"full-width\" ng-src=\"{{$ctrl.userAvatar}}\" lazy-image />" +
							"</span>" +
							"<span ng-if=\"(!$ctrl.review.reviewSettings.showAvatar || !$ctrl.userAvatar) && !$ctrl.review.reviewSettings.anonymous\"" +
								"class=\"bg-accent {{$ctrl.avatarClass}} layout-row layout-align-center-center\">" +
								"<span class=\"md-headline text-uppercase\">{{!$ctrl.review.reviewSettings.showRealName && $ctrl.$$user.nickname ? $ctrl.$$user.nickname.charAt(0) : $ctrl.$$user.name.charAt(0)}}</span>" +
							"</span>" +
							"<md-icon ng-if=\"$ctrl.review.reviewSettings.anonymous\" class=\"mdi mdi-account-circle md-38\"></md-icon>" +
						"</div>" +
			    		"<div ng-if=\"!$ctrl.hideUserDetails\" class=\"layout-align-center-start layout-column no-padding-bottom no-padding-top row-1\">" +
			    			"<span class=\"font-10 text-gray-light row-1\"><span translate=\"common.written.by.female\"></span></span>" +
			    			"<div>" +
				    			"<strong class=\"md-subhead\">"+
				    				"<span ng-if=\"!$ctrl.review.reviewSettings.anonymous && $ctrl.$$user\">" +
						    			"<span ng-if=\"!$ctrl.review.reviewSettings || $ctrl.review.reviewSettings.showRealName || !$ctrl.$$user.nickname\">" +
						    				"<span ng-if=\"$ctrl.$$user\">{{::$ctrl.$$user.name}}&nbsp;{{::$ctrl.$$user.surname}}</span>" +
						    				"<span ng-if=\"!$ctrl.$$user && $ctrl.$$user\">{{::$ctrl.$$user.name}}&nbsp;{{::$ctrl.$$user.surname}}</span>" +
					    				"</span>" +
					    				"<span ng-if=\"$ctrl.review.reviewSettings && !$ctrl.review.reviewSettings.showRealName && $ctrl.$$user.nickname\">" +
						    				"<span ng-if=\"$ctrl.$$user\">{{::$ctrl.$$user.nickname}}</span>" +
						    				"<span ng-if=\"!$ctrl.$$user && $ctrl.$$user\">{{::$ctrl.$$user.nickname}}</span>" +
					    				"</span>" +
				    				"</span>" +
					    			"<span ng-if=\"$ctrl.review.reviewSettings.anonymous || !$ctrl.$$user\" translate=\"common.anonymous\"></span>" +
					    		"</strong>" +
					    		"<span ng-if=\"$ctrl.review.createdDate && !$ctrl.hideDate\" class=\"font-10 text-gray-light\">" +
					    			"<span>&nbsp;-&nbsp;{{$ctrl.review.createdDate|date:$ctrl.dateFormat}}</span>" +
					    		"</span>" +
				    		"</div>" +
			    			"<small class=\"font-10 text-gray-light row-1 text-lowercase\" ng-if=\"!$ctrl.review.reviewSettings.anonymous && $ctrl.$$user.reviewsCount\">" +
								"<span>{{::$ctrl.$$user.reviewsCount}}&nbsp;</span>" +
								"<span ng-if=\"$ctrl.$$user.reviewsCount == 1\" translate=\"reviews.review\"></span>" +
								"<span ng-if=\"$ctrl.$$user.reviewsCount != 1\" translate=\"reviews.reviews\"></span>" +
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
			
			ctrl.hideAvatar = _.isBoolean(ctrl.hideAvatar) ? ctrl.hideAvatar : false;
			ctrl.hideUserDetails = _.isBoolean(ctrl.hideUserDetails) ? ctrl.hideUserDetails : false;
			
			ctrl.bgClass = ctrl.bgClass ? ctrl.bgClass : "bg-gray-lighter";
			ctrl.avatarClass = ctrl.avatarClass ? ctrl.avatarClass : "menu-user-avatar-small";
			
			ctrl.$initReview();
		};

		this.$initReview = function(){
    		if (!ctrl.chReviewCtrl.review) {
    			return;
    		}
    		
    		ctrl.review = ctrl.chReviewCtrl.review;
    		
    		ctrl.$$user = ctrl.review.reservation.guest ? ctrl.review.reservation.guest : ctrl.review.createdBy;
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