(function() {
	'use strict';
	
	angular.module("itaca.components").component("chReviewReportInfo", {
		transclude: true,
		require: {
			chReviewCtrl: '^chReview'
		},
		bindings: {
			contentClass: "@"
		},
		controller: ReviewReportInfoCtrl,
		template:
			"<div ng-if=\"$ctrl.review.reportType\" class=\"{{$ctrl.contentClass}}\">" +
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
			ctrl.contentClass = ctrl.contentClass || "layout-padding bg-gray-lighter text-danger";
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