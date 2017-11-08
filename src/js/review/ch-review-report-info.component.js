(function() {
	'use strict';
	
	angular.module("chroma.components").component("chReviewReportInfo", {
		transclude: true,
		require: {
			chReviewCtrl: '^chReview'
		},
		controller: ReviewReportInfoCtrl,
		template:
			"<div class=\"no-padding flex\" ng-if=\"$ctrl.review.reportType\">" +
				"<div>" +
					"<md-icon class=\"mdi md-18 mdi-flag-variant text-danger\"></md-icon>" +
					"<small translate=\"review.reporting.label\"></small>" +
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