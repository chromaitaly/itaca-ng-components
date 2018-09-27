(function() {
	'use strict';
	
	angular.module("itaca.components").component("chReviewsSummaryProgress", {
		require: {
			chReviewsSummaryCtrl: '^chReviewsSummary'
		},
		bindings: {
			value: "<",
			count: "<",
    		progressClass: "@?",
    		size: "@?"
		},
		controller: ReviewsSummaryProgressCtrl,
		template: 
			"<div title=\"{{$ctrl.$$percentage + '%'}}\" ng-class=\"$ctrl.$mdMedia('gt-sm')? 'no-padding-bottom' : 'no-padding-left no-padding-right'\">" +
				"<small>" +
					"<span ng-switch=\"$ctrl.value\">" +
						"<span ng-switch-when=\"4\"><span translate=\"review.score.bad\"></span>&nbsp;<em>(4)</em>:</span>" +
						"<span ng-switch-when=\"5\"><span translate=\"review.score.poor\"></span>&nbsp;<em>(5)</em>:</span>" +
						"<span ng-switch-when=\"6\"><span translate=\"review.score.sufficient\"></span>&nbsp;<em>(6)</em>:</span>" +
						"<span ng-switch-when=\"7\"><span translate=\"review.score.good\"></span>&nbsp;<em>(7)</em>:</span>" +
						"<span ng-switch-when=\"8\"><span translate=\"review.score.very.good\"></span>&nbsp;<em>(8)</em>:</span>" +
						"<span ng-switch-when=\"9\"><span translate=\"review.score.excellent\"></span>&nbsp;<em>(9)</em>:</span>" +
						"<span ng-switch-when=\"10\"><span translate=\"review.score.fabulous\"></span>&nbsp;<em>(10)</em>:</span>" +
					"</span>" +
				"</small>" +
				"<div class=\"layout-row layout-align-start-center\">" +
					"<div flex><md-progress-linear md-mode=\"determinate\" value=\"{{$ctrl.$$percentage}}\" class=\"{{$ctrl.$$sizeClass}}\" ng-class=\"$ctrl.count > 0 ? $ctrl.progressClass : 'md-accent'\"></md-progress-linear></div>" +
					"<div class=\"text-right\" style=\"width: 55px\"><small>&nbsp;{{$ctrl.$$percentage + '%'}}&nbsp;({{$ctrl.count}})</small></div>" +
				"</div>" +
			"</div>"
	});
	
	 /* @ngInject */
	function ReviewsSummaryProgressCtrl($scope, $mdMedia) {
		var ctrl = this;
		
		this.$mdMedia = $mdMedia;
		
		this.$onInit = function() {
			ctrl.progressClass = ctrl.progressClass || "md-primary";
			ctrl.size = _.includes(["small", "big"], _.toLower(ctrl.size)) ? _.toLower(ctrl.size) : "small";
			
			if (ctrl.size == "big") {
				ctrl.$$sizeClass = "md-progress-linear-big";
			}
			
			ctrl.$initSummary();
			ctrl.$initWatchers();
		};
		
		this.$initSummary = function() {
			if (!ctrl.chReviewsSummaryCtrl.summary) {
    			return;
    		}
    		
    		ctrl.summary = ctrl.chReviewsSummaryCtrl.summary;
		};
		
		this.$initWatchers = function() {
			$scope.$watch(function() {
				return ctrl.count;
				
			}, ctrl.$calculatePercentage);
		};
		
		this.$calculatePercentage = function() {
			ctrl.$$percentage = Math.round((ctrl.count || 0) * 100 / (ctrl.summary.totalReviews || 1));ctrl.$$percentage = ctrl.$$percentage.toFixed(2);
		};
		
		this.$onDestroy = function() {
		};
	}
})();