(function() {
	'use strict';
	
	angular.module("chroma.components").component("chReviewsSummary", {
		transclude: true,
		bindings: {
    		summary: "<"
		},
		controller: ReviewsSummaryCtrl,
		template: "<div ng-transclude></div>"
	});
	
	 /* @ngInject */
	function ReviewsSummaryCtrl(ReviewsUtils) {
		var ctrl = this;
		
		this.$onInit = function() {
			ctrl.$initSummary();
		};
		
		this.$initSummary = function() {
			if (!ctrl.summary) {
				var scoreMap = [];
				
				_.forEach(_.rangeRight(4, 11), function(val){
					scoreMap.push({key: val, value: 0});
				});
				
				ctrl.summary = {totalReviews: 0, gar: null, reviewsScoreMap: scoreMap};
			}
			
			// genero il titolo in base allo score
    		ctrl.summary.garLabel = ReviewsUtils.generateScoreLabel(Math.floor(ctrl.summary.gar));
		};
		
		this.$onDestroy = function() {
		};
	}
})();