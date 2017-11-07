(function() {
	'use strict';
	
	angular.module("chroma.components").component("chReviewTitle", {
		transclude: true,
		require: {
			chReviewCtrl: '^chReview'
		},
		bindings: {
			titleQuote: "@?",
			hideNewIcon: "<?"
		},
		controller: ReviewTitleCtrl,
		template:
			"<div flex>" +
				"<div ng-if=\"!$ctrl.noDefault\" class=\"flex layout-padding\">" +
					"<div class=\"md-subhead flex ellipsis text-wrap\">"+
		    			"<span ng-if=\"!$ctrl.hideNewIcon && $ctrl.review.isNew\"><md-icon class=\"material-icons mdi mdi-new-box text-info\"></md-icon>&nbsp;</span>"+
		    			"<strong>"+
				    		"<em ng-if=\"$ctrl.review.title\">"+
			    				"<span ng-if=\"$ctrl.titleQuote\">&ldquo;</span>"+
			    				"<span ng-bind=\"$ctrl.review.title\"></span>"+
			    				"<span ng-if=\"$ctrl.titleQuote\">&bdquo;</span>"+
		    				"</em>"+
		    				"<span ng-if=\"!$ctrl.review.title\">" +
		    					"<span translate=\"{{$ctrl.review.label}}\"></span>"+
		    				"</span>" +
						"</strong>"+
					"</div>" +
				"</div>" +
				"<div ng-transclude></div>" +
			"</div>"
	});
	
	 /* @ngInject */
	function ReviewTitleCtrl($scope, ReviewsUtils, $mdMedia) {
		$scope.$mdMedia = $mdMedia;
		
		var ctrl = this;
		
		this.$onInit = function() {
			ctrl.titleQuote = _.isBoolean(ctrl.titleQuote) ? ctrl.titleQuote : true;
			ctrl.hideNewIcon = _.isBoolean(ctrl.hideNewIcon) ? ctrl.hideNewIcon : false;
			
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