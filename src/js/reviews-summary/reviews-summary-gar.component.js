(function() {
	'use strict';
	
	angular.module("itaca.components").component("chReviewsSummaryGar", {
		require: {
			chReviewsSummaryCtrl: '^chReviewsSummary'
		},
		bindings: {
    		title: "@?",
    		subtitle: "@?",
    		bgClass: "@?",
    		size: "@?"
		},
		controller: ReviewsSummaryGarCtrl,
		template: 
			"<div ng-if=\"$ctrl.summary.gar\" class=\"layout-column layout-padding layout-align-center-center no-padding\">" +
				"<div class=\"border-radius layout-column layout-align-center-center {{$ctrl.bgClass}}\" ng-class=\"{'layout-padding': $ctrl.size == 'big'}\">" +
					"<strong class=\"md-subhead\" translate=\"{{$ctrl.summary.garLabel}}\"></strong>" +
					"<span class=\"no-padding-top\" ng-class=\"$ctrl.size == 'small' ? 'md-display-1' : 'md-display-3'\">{{$ctrl.summary.gar.toFixed(1)}}</span>" +
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
			ctrl.size = _.includes(["small", "big"], _.toLower(ctrl.size)) ? _.toLower(ctrl.size) : "big";
			
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