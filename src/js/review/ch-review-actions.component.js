(function() {
	'use strict';
	
	angular.module("chroma.components").component("chReviewActions", {
		transclude: true,
		require: {
			chReviewCtrl: '^chReview'
		},
		bindings: {
			hideUser: "<?",
    		userState: "@?",
    		userStateParams: "<?",
    		userClick: "&?",
    		hideLikes: "<?",
    		likeLabel: "@?",
    		unlikeLabel: "@?",
    		likeClick: "&?"
		},
		controller: ReviewActionsCtrl,
		template: 
			"<div flex>" +
				"<div ng-if=\"!$ctrl.noDefault && (!$ctrl.hideUser || !$ctrl.hideLikes)\" class=\"bg-gray-lighter flex layout-row layout-wrap layout-padding\">" +
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
			    			"<small class=\"font-10 text-gray-light row-1\"><span translate=\"common.written.by.female\"></span>:</small>" +
			    			"<strong class=\"md-subhead\">"+
			    				"<span ng-if=\"!$ctrl.review.reviewSettings.anonymous && ($ctrl.review.createdBy || $ctrl.review.reservation.guest)\">" +
					    			"<span ng-if=\"!$ctrl.review.reviewSettings.showRealName || !$ctrl.review.createdBy.nickname\">" +
					    				"<span ng-if=\"$ctrl.review.createdBy\">{{::$ctrl.review.createdBy.name}}&nbsp;{{::$ctrl.review.createdBy.surname}}</span>" +
					    				"<span ng-if=\"!$ctrl.review.createdBy && $ctrl.review.reservation.guest\">{{::$ctrl.review.reservation.guest.name}}&nbsp;{{::$ctrl.review.reservation.guest.surname}}</span>" +
				    				"</span>" +
				    				"<span ng-if=\"!$ctrl.review.reviewSettings.showRealName && $ctrl.review.createdBy.nickname\">" +
					    				"<span ng-if=\"$ctrl.review.createdBy\">{{::$ctrl.review.createdBy.nickname}}</span>" +
					    				"<span ng-if=\"!$ctrl.review.createdBy && $ctrl.review.reservation.guest\">{{::$ctrl.review.reservation.guest.nickname}}</span>" +
				    				"</span>" +
			    				"</span>" +
				    			"<span ng-if=\"$ctrl.review.reviewSettings.anonymous || (!$ctrl.review.createdBy && !$ctrl.review.reservation.guest)\" translate=\"common.anonymous\"></span>" +
				    		"</strong>" +
			    			"<small class=\"font-10 text-gray-light row-1 text-lowercase\" ng-if=\"!$ctrl.review.reviewSettings.anonymous && $ctrl.review.guest.reviewsCount\">" +
								"<span>{{::$ctrl.review.guest.reviewsCount}}&nbsp;</span>" +
								"<span ng-if=\"$ctrl.review.guest.reviewsCount == 1\" translate=\"reviews.review\"></span>" +
								"<span ng-if=\"$ctrl.review.guest.reviewsCount != 1\" translate=\"reviews.reviews\"></span>" +
							"</small>" +
			    		"</div>" +
			    	"</div>" +
		    		"<div ng-if=\"!$ctrl.hideLikes\" class=\"no-padding flex-gt-sm flex-xs-100 flex-sm-100 layout-row layout-align-center-center layout-align-gt-sm-end-center\">" +
		    			"<md-button class=\"auto-height md-primary md-raised no-margin\" ng-click=\"$ctrl.$likeClick($event)\" aria-label=\"Toggle like\">" +
							"<md-icon ng-show=\"!$ctrl.review.helpful\" class=\"mdi md-18 mdi-thumb-up\"></md-icon>&nbsp;" +
							"<small ng-if=\"!$ctrl.review.helpful\"><span ng-if=\"!$ctrl.likeLabel\" translate=\"review.likes.button\"></span><span ng-if=\"$ctrl.likeLabel\" ng-bind=\"$ctrl.likeLabel\"></span></small>" +
							"<small ng-if=\"$ctrl.review.helpful\"><span ng-if=\"!$ctrl.unlikeLabel\" translate=\"review.likes.button.undo\"></span><span ng-if=\"$ctrl.unlikeLabel\" ng-bind=\"$ctrl.unlikeLabel\"></span></small>" +
						"</md-button>" +
					"</div>" +
		    	"</div>" +
			
				"<div flex ng-transclude></div>" +
				"<md-divider></<md-divider>" +
			"</div>"
	});
	
	 /* @ngInject */
	function ReviewActionsCtrl($scope, Navigator) {
		var ctrl = this;
		
		this.$onInit = function() {
			ctrl.hideUser = _.isBoolean(ctrl.hideUser) ? ctrl.hideUser : ctrl.chReviewCtrl.hideUser;
			ctrl.hideLikes = _.isBoolean(ctrl.hideLikes) ? ctrl.hideLikes : ctrl.chReviewCtrl.hideLikes;
			
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
    			ctrl.userClick && ctrl.userClick({$event: ev, review: ctrl.review});
    		}
    	};
    	
    	this.$likeClick = function(ev) {
    		ctrl.likeClick && ctrl.likeClick({$event: ev, review: ctrl.review});
    	};
	}
})();
