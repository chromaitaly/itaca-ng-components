(function() {
	'use strict';
	
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
    		
    		ctrl.review.isNew = moment().isBefore(moment(ctrl.review.createdDate).add(ctrl.newLimit, 'days'));
    		
    		// genero il titolo in base allo score
    		ctrl.review.label = ReviewsUtils.generateScoreLabel(Math.floor(ctrl.review.score));
    		
    		ctrl.$getUserAvatar();
    		ctrl.$initLikes();
    		ctrl.$initWatchers();
    	};
    	
    	this.$initLikes = function() {
			ctrl.review.helpful = AppOptions.guest &&  AppOptions.guest.id && _.some(ctrl.review.likes, function(userId) {
				return _.isEqual(userId, AppOptions.guest.id);
			});
		};
    	
    	this.$getUserAvatar = function(){
    		
    		if(ctrl.review.createdBy && ctrl.review.createdBy.avatarType){
    			switch(ctrl.review.createdBy.avatarType){
    				case 'PORTAL' 	:
    					ctrl.userAvatar = ctrl.review.createdBy.avatar ? ctrl.imgBaseUrl + ctrl.review.createdBy.avatar : null; 
    					break;
    				case 'FACEBOOK' : ctrl.userAvatar = ctrl.review.createdBy.facebookImage; break;
    				case 'GOOGLE' 	: ctrl.userAvatar = ctrl.review.createdBy.googleImage; break;
    				default		  	: 
    					ctrl.userAvatar = ctrl.review.createdBy.avatar ? ctrl.imgBaseUrl + ctrl.review.createdBy.avatar : null; 
    					break;
    			}
    		}
    		
    		// default settings
    		ctrl.review.reviewSettings = _.isObjectLike(ctrl.review.reviewSettings) ? ctrl.review.reviewSettings : {};
    		ctrl.review.reviewSettings.showRealName = _.isBoolean(ctrl.review.reviewSettings.showRealName) ? ctrl.review.reviewSettings.showRealName : true; 
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