/* @ngInject */
myApp.controller('applicationReviewsCtrl', function($scope, $log, $q, $mdMedia, Notification, ApplicationReviews, InfinitePaging, AppOptions, Info, ReviewsUtils, reviewsStatistics) {
	var ctrl = this;
	
	this.init = function() {
		ctrl.initVars();
		
		// se non presenti, recupero le statistiche generali delle recensioni
		if (!ctrl.reviewsStatistics) {
			ctrl.getReviewsStatistics();
		}
		
		// carico la prima pagina
		ctrl.loadMore();
	};
	
	this.initVars = function() {
		ctrl.$mdMedia = $mdMedia;
		ctrl.appOptions = AppOptions;
		ctrl.reviewsStatistics = angular.copy(reviewsStatistics);
		
		ctrl.defaultReviewOptions = [
			{value: 4, labelKey: "review.score.bad", iconClass: "mdi mdi-star md-32", colorClass: "text-gray-base"},
			{value: 5, labelKey: "review.score.poor", iconClass: "mdi mdi-star md-32", colorClass: "text-gray-light"},
			{value: 6, labelKey: "review.score.sufficient", iconClass: "mdi mdi-star md-32", colorClass: "text-warn"},
			{value: 7, labelKey: "review.score.good", iconClass: "mdi mdi-star md-32", colorClass: "text-yellow"},
			{value: 8, labelKey: "review.score.very.good", iconClass: "mdi mdi-star md-32", colorClass: "text-success"},
			{value: 9, labelKey: "review.score.excellent", iconClass: "mdi mdi-star md-32", colorClass: "text-primary-light"},
			{value: 10, labelKey: "review.score.fabulous", iconClass: "mdi mdi-star md-32", colorClass: "text-primary"}
		];
		
		ctrl.loader = new InfinitePaging(ApplicationReviews, {
			size : 10,
			sort : ["createdDate,desc"],
		});
	};
	
	this.getReviewsStatistics = function() {
		ctrl.loadingSummary = true;
		
		var finallyFn = function() {
			ctrl.loadingSummary = false;
		};
		
		Info.get().then(function(data) {
			if (data && data.info && data.info.reviewsStatistics) {
				ctrl.reviewsStatistics = data.info.reviewsStatistics;
				// genero label dello score
				ctrl.reviewsStatistics.garLabel = ReviewsUtils.generateScoreLabel(Math.floor(data.info.reviewsStatistics.gar));
			}
			
		}, function(error) {
			$log.error("Error getting reviews summary info: " + error);
			Notification.error(error);
		
		}).finally(finallyFn);
	};

	this.loadMore = function() {
		ctrl.loader.nextPage();
	};
	
	// init
	this.init();	
});