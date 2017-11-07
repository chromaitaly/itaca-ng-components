(function() {
	'use strict';
	
	angular.module("chroma.components").component("chReviewsSummaryDetails", {
		require: {
			chReviewsSummaryCtrl: '^chReviewsSummary'
		},
		bindings: {
    		progressClass: "@?",
    		size: "@?"
		},
		controller: ReviewsSummaryDetailsCtrl,
		template: 
			"<div class=\"flex layout-column layout-padding-sm\">" +
				"<ch-reviews-summary-progress ng-repeat=\"entry in $ctrl.summary.reviewsScoreMap track by $index\" value=\"entry.key\" count=\"entry.value\" " +
					"size=\"{{$ctrl.size}}\" progress-class=\"{{$ctrl.progressClass}}\"></ch-review-summary-progress>" +
			"</div>"
	});
	
	 /* @ngInject */
	function ReviewsSummaryDetailsCtrl() {
		var ctrl = this;
		
		this.$onInit = function() {
			ctrl.progressClass = ctrl.progressClass || "md-primary";
			ctrl.size = _.includes(["small", "big"], _.toLower(ctrl.size)) ? _.toLower(ctrl.size) : "small";
			
			ctrl.$initSummary();
		};
		
		this.$initSummary = function() {
			if (!ctrl.chReviewsSummaryCtrl.summary) {
    			return;
    		}
    		
    		ctrl.summary = ctrl.chReviewsSummaryCtrl.summary;
		};
		
		this.$onDestroy = function() {
		};
	}
})();