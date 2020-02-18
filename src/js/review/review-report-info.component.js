(function() {
	"use strict";
	
	angular.module("itaca.components").component("chReviewReportInfo", {
		transclude: true,
		require: {
			chReviewCtrl: "^chReview"
		},
		bindings: {
			contentClass: "@",
			showDetails: "<"
		},
		controller: ReviewReportInfoCtrl,
		template:
			"<div ng-if=\"$ctrl.review.reportType\" class=\"{{$ctrl.contentClass}}\">" +
				"<div class=\"layout-padding-sm no-padding\">" +
					"<div>" +
						"<md-icon class=\"mdi md-18 mdi-flag-variant text-danger\"></md-icon>" +
						"<small translate=\"review.reporting.label\"></small>" +
					"</div>" +
					"<div ng-if=\"$ctrl.showDetails\" ng-switch=\"$ctrl.review.reportType\">" +
						"<small><i>" +
							"<span ng-switch-when=\"OTHER\">\"{{$ctrl.review.reportNote}}\"</span>" +
							"<span ng-switch-default>\"<span translate=\"{{'review.report.type.' + $ctrl.review.reportType +'.label'}}\"></span>\"</span>" +
						"</i></small>" +
					"</div>" +
				"</div>" +
			"</div>"
	});
	
	 /* @ngInject */
	function ReviewReportInfoCtrl() {
		var ctrl = this;
		
		this.$onInit = function() {
			ctrl.contentClass = ctrl.contentClass || "layout-padding bg-gray-lighter text-danger";
			ctrl.showDetails = _.isBoolean(ctrl.showDetails) ? ctrl.showDetails : false;
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