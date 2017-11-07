(function() {
	'use strict';
	
	angular.module("itaca-ui").component("chReviewReportInfo", {
		transclude: true,
		require: {
			chReviewCtrl: '^chReview'
		},
		controller: ReviewReportInfoCtrl,
		template:
			"<div flex layout-padding ng-if=\"$ctrl.review.reportType\">" +
				"<div class=\"no-padding-bottom no-padding-right\">" +
					"<md-icon class=\"mdi md-18 mdi-flag-variant text-danger\"></md-icon>" +
					"<span translate=\"review.reporting.label\"></span>" +
				"</div>" +
			"</div>"
	});
	
	 /* @ngInject */
	function ReviewReportInfoCtrl() {
		var ctrl = this;
		
		this.$onInit = function() {
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