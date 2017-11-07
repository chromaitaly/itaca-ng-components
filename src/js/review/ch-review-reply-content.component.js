(function() {
	'use strict';
	
	angular.module("chroma.components").component("chReviewReplyContent", {
		transclude: true,
		require: {
			chReviewReplyCtrl: '^chReviewReply'
		},
		controller: ReviewReplyContentCtrl,
		template: "<div ng-transclude></div>"
	});
	
	 /* @ngInject */
	function ReviewReplyContentCtrl() {
		var ctrl = this;
		
		this.$onInit = function() {
			ctrl.chReviewReplyCtrl.noDefault = true;
		};
		
		this.$onDestroy = function() {
			ctrl.chReviewReplyCtrl.noDefault = false;
		};
	}
})();