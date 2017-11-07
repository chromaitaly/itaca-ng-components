(function() {
	'use strict';
	
	angular.module("itaca-ui").component("chReviewActionsContent", {
		transclude: true,
		require: {
			chReviewActionsCtrl: '^chReviewActions'
		},
		controller: ReviewActionsContentCtrl,
		template: "<div ng-transclude></div>"
	});
	
	 /* @ngInject */
	function ReviewActionsContentCtrl() {
		var ctrl = this;
		
		this.$onInit = function() {
			ctrl.chReviewActionsCtrl.noDefault = true;
		};
		
		this.$onDestroy = function() {
			ctrl.chReviewActionsCtrl.noDefault = false;
		};
	}
})();