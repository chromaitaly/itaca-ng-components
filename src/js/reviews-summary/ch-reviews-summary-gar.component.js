(function() {
	'use strict';
	
	angular.module("itaca-ui").component("chReviewsSummaryGar", {
		require: {
			chReviewsSummaryCtrl: '^chReviewsSummary'
		},
		bindings: {
    		title: "@?",
    		subtitle: "@?",
    		bgClass: "@?"     			
		},
		controller: ReviewsSummaryGarCtrl,
		template: 
			"<div ng-if=\"$ctrl.summary.gar\" class=\"layout-column layout-padding layout-align-center-center no-padding\">" +
				"<div class=\"border-radius layout-column layout-align-center-center layout-padding {{$ctrl.bgClass}}\">" +
					"<strong class=\"md-subhead\" translate=\"{{$ctrl.summary.garLabel}}\"></strong>" +
					"<span class=\"md-display-3 no-padding-top\">{{$ctrl.summary.gar.toFixed(1)}}</span>" +
					"<small ng-if=\"!$ctrl.$$hideTitle\" class=\"no-padding-bottom\">" +
						"<span ng-if=\"$ctrl.title\" ng-bind=\"$ctrl.title\"></span>" +
						"<span ng-if=\"!$ctrl.subtitle\" translate=\"review.score.total\"><span>" +
					"</small>" +
				"</div>" +
				"<div ng-if=\"!$ctrl.$$hideSubtitle\">" +
					"<small>" +
						"<span ng-if=\"$ctrl.subtitle\" ng-bind=\"$ctrl.subtitle\"></span>" +
						"<span ng-if=\"!$ctrl.subtitle\" translate=\"review.reviews.real\" translate-values=\"{num: $ctrl.summary.totalReviews}\"></span>" +
					"</small>" +
				"</div>" +
			"</div>"
	});
	
	 /* @ngInject */
	function ReviewsSummaryGarCtrl() {
		var ctrl = this;
		
		this.$onInit = function() {
			ctrl.bgClass = ctrl.bgClass || "bg-primary";
			ctrl.$$hideTitle = _.isBoolean(ctrl.title) && !ctrl.title;
			ctrl.$$hideSubtitle = _.isBoolean(ctrl.subtitle) && !ctrl.subtitle;
			
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