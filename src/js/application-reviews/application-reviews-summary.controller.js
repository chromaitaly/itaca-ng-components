/* @ngInject */
myApp.controller('applicationReviewsSummaryCtrl', function($scope, $log, $q, $mdMedia, ApplicationReviews, AppOptions, Info, ReviewsUtils) {
	var ctrl = this;
	
	this.loading = {best: false, worst: false};
	
	this.appOptions = AppOptions;
	
	this.init = function() {
		// statistiche generali recensioni
		ctrl.getReviewsStatistics();
		
		// migliore e peggiore recensione
		ctrl.getBestAndWorst();
	};
	
	this.getReviewsStatistics = function() {
		Info.get().then(function(data) {
			if (data && data.info && data.info.reviewsStatistics) {
				ctrl.reviewsStatistics = data.info.reviewsStatistics;
				// genero label dello score
				ctrl.reviewsStatistics.garLabel = ReviewsUtils.generateScoreLabel(Math.floor(data.info.reviewsStatistics.gar));
			}
			
		}, function(error) {
			$log.error("Error getting reviews summary info: " + error);
		});
	};

	this.getBestAndWorst = function() {
		ctrl.loading.best = true;
		ctrl.loading.worst = true;
		
		var finallyFn = function() {
			ctrl.loading.best = false;
			ctrl.loading.worst = false;
		};
		
		$q.all([
			ApplicationReviews.best(),
			ApplicationReviews.worst()
			
		]).then(function(datas) {
			ctrl.bestReview = datas[0].review;
			ctrl.worstReview = datas[1].review;
			
		}, function(errors) {
			$log.error("Error getting reviews: " + errors);
			
		}).finally(finallyFn);
	};
	
	// init
	this.init();	
});