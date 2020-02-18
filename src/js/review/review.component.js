(function() {
	"use strict";
	
	angular.module("itaca.components").component("chReview", {
		transclude: true,
		bindings: {
    		review: "<",
    		newLimit: "@?",
    		dateFormat: "@?",
    		hideUser: "<?",
    		hideDate: "<?",
    		imgBaseUrl: "@?" 
    	},
		controller: ReviewCtrl,
		template: "<div ng-transclude></div>" 
	});
	
	/* @ngInject */
	function ReviewCtrl($scope, ReviewsUtils, AppOptions) {
		var ctrl = this;
    	
    	this.$onInit = function(){
    		ctrl.newLimit = _.isFinite(parseInt(ctrl.newLimit)) ? parseInt(ctrl.newLimit) : 7;
    		ctrl.hideUser = _.isBoolean(ctrl.hideUser) ? ctrl.hideUser : false;
    		ctrl.imgBaseUrl = ctrl.imgBaseUrl || true;
    		if (_.isBoolean(ctrl.imgBaseUrl)) {
    			ctrl.imgBaseUrl = ctrl.imgBaseUrl && AppOptions.config && AppOptions.config.amz ? AppOptions.config.amz.baseUrl+"/"+AppOptions.config.amz.bucketName+"/" : "";
    		}
    		
    		ctrl.$initReview();
    	};
    	
    	this.$initReview = function(){
    		if (!ctrl.review) {
    			return;
    		}
    		
    		ctrl.review.isNew = moment().isBefore(moment(ctrl.review.createdDate).add(ctrl.newLimit, "days"));
    		
    		// genero il titolo in base allo score
    		ctrl.review.label = ReviewsUtils.generateScoreLabel(Math.floor(ctrl.review.score));
    		
    		ctrl.$initUser();
    	};
    	
    	this.$initUser = function() {
    		ctrl.$$user = _.get(ctrl.review, "reservation.guest") || ctrl.review.manager;
    		ctrl.$getUserAvatar();
    	};
    	
    	this.$getUserAvatar = function() {
    		if(ctrl.$$user && ctrl.$$user.avatarType){
    			switch(ctrl.$$user.avatarType){
    				case "PORTAL" 	:
    					ctrl.userAvatar = ctrl.$$user.avatar ? ctrl.imgBaseUrl + ctrl.$$user.avatar : null; 
    					break;
    				case "FACEBOOK" : ctrl.userAvatar = ctrl.$$user.facebookImage; break;
    				case "GOOGLE" 	: ctrl.userAvatar = ctrl.$$user.googleImage; break;
    				default		  	: 
    					ctrl.userAvatar = ctrl.$$user.avatar ? ctrl.imgBaseUrl + ctrl.$$user.avatar : null; 
    					break;
    			}
    		}
    		
    		// default settings
    		ctrl.review.reviewSettings = _.isObjectLike(ctrl.review.reviewSettings) ? ctrl.review.reviewSettings : {};
    		ctrl.review.reviewSettings.showRealName = _.isBoolean(ctrl.review.reviewSettings.showRealName) ? ctrl.review.reviewSettings.showRealName : true; 
    	};
	}
})();