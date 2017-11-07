(function() {
	'use strict';
	
	angular.module("itaca-ui").component("chReviewProCon", {
		transclude: true,
		require: {
			chReviewCtrl: '^chReview'
		},
		bindings: {
			textLimit: "<?"
		},
		controller: ReviewProConCtrl,
		template:
			"<div ng-if=\"$ctrl.review.pro || $ctrl.review.con\" flex layout-padding>" +
				"<div ng-if=\"$ctrl.review.pro\" class=\"md-padding no-padding-top\">" +
					"<md-icon class=\"mdi mdi-thumb-up-outline text-success md-24\"></md-icon>&nbsp;" +
					"<strong><span translate=\"review.pro\"></span>:</strong>" +
					"<div class=\"layout-margin no-margin-x-sides text-ellipsis\">" +
						"<span hm-read-more hm-text=\"{{$ctrl.review.pro}}\" hm-limit=\"$ctrl.textLimit\"" +
							"hm-more-text=\"{{'common.read.more'|translate}}\"" +
							"hm-less-text=\"{{'common.read.less'|translate}}\"" +
							"hm-link-class=\"clickable text-primary\"></span>" +
					"</div>" +
				"</div>" +
				"<div ng-if=\"$ctrl.review.con\" class=\"md-padding no-padding-top\">" +
					"<md-icon class=\"mdi mdi-thumb-down-outline text-warn md-24\"></md-icon>&nbsp;" +
					"<strong><span translate=\"review.con\"></span>:</strong>" +
					"<div class=\"layout-margin no-margin-x-sides text-ellipsis\">" +
						"<span hm-read-more hm-text=\"{{$ctrl.review.con}}\" hm-limit=\"$ctrl.textLimit\"" +
							"hm-more-text=\"{{'common.read.more'|translate}}\"" +
							"hm-less-text=\"{{'common.read.less'|translate}}\"" +
							"hm-link-class=\"clickable text-primary\"></span>" +
					"</div>" +
				"</div>" +
			"</div>"
	});
	
	 /* @ngInject */
	function ReviewProConCtrl() {
		var ctrl = this;
		
		this.$onInit = function() {
			ctrl.textLimit = isFinite(parseInt(ctrl.textLimit)) ? parseInt(ctrl.textLimit) : 200;
			
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