(function() {
	"use strict";
	
	angular.module("itaca.components").component("chReviewTitleContent", {
		transclude: true,
		require: {
			chReviewTitleCtrl: "^chReviewTitle"
		},
		controller: ReviewTitleContentCtrl,
		template: "<div ng-transclude></div>"
	});
	
	 /* @ngInject */
	function ReviewTitleContentCtrl() {
		var ctrl = this;
		
		this.$onInit = function() {
			ctrl.chReviewTitleCtrl.noDefault = true;
		};
		
		this.$onDestroy = function() {
			ctrl.chReviewTitleCtrl.noDefault = false;
		};
	}
})();