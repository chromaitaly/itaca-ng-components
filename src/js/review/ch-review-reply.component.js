(function() {
	'use strict';
	
	angular.module("chroma.components").component("chReviewReply", {
		transclude: true,
		require: {
			chReviewCtrl: '^chReview'
		},
		bindings: {
			ngReadonly: "<?",
			ngEdit: "<?",
			title: "@",
			onReply: "&?",
			responseClass: "@?",
			arrowClass: "@?"
		},
		controller: ReviewReplyCtrl,
		template:
			"<div ng-show=\"!$ctrl.ngReadonly || $ctrl.review.reply.response || $ctrl.noDefault\" class=\"ch-review-reply\">" +
				"<div class=\"ch-review-reply-arrow {{$ctrl.arrowClass}}\"></div>" +
				"<div class=\"layout-padding no-padding ch-review-reply-inner {{$ctrl.responseClass}}\">" +
					"<div ng-if=\"!$ctrl.noDefault\" class=\"layout-padding-sm\">" +
						"<div><strong><span ng-if=\"!$ctrl.title\"><span translate=\"common.answer\"></span>:</span><span ng-if=\"$ctrl.title\" ng-bind=\"$ctrl.title\"></strong></div>" +
						"<div ng-if=\"$ctrl.$$currentMode == 'view'\">" +
							"<div class=\"text-ellipsis text-wrap\">" +
								"<span hm-read-more hm-text=\"{{$ctrl.review.reply.response}}\" hm-limit=\"200\" hm-more-text=\"{{'common.read.more'|translate}}\"" +
								"hm-less-text=\"{{'common.read.less'|translate}}\" hm-link-class=\"clickable text-primary\"></span>" +
							"</div>" +
							"<div ng-if=\"!$ctrl.ngReadonly\">" +
								"<md-button ng-if=\"$ctrl.ngEdit\" class=\"minimal-button no-margin-x-sides auto-height row-1 text-initial\" ng-click=\"$ctrl.$editReply($event)\" aria-label=\"Edit reply\">" +
									"<small translate=\"common.edit\"></small>" +
								"</md-button>" +
							"</div>" +
						"</div>" +
						"<div ng-if=\"$ctrl.$$currentMode == 'edit'\" layout layout-padding-sm>" +
							"<div flex>" +
								"<md-input-container md-no-float class=\"md-block bg-white minimal-input no-margin\">" +
									"<textarea placeholder=\"{{'review.reply.label'|translate}}...\" ng-model=\"$ctrl.$$reply\" max-rows=\"5\" md-no-resize></textarea>" +
								"</md-input-container>" +
							"</div>" +
							"<div layout layout-align=\"center end\" class=\"no-padding\">" +
								"<md-button class=\"md-icon-button md-raised\" ng-disabled=\"!$ctrl.$$reply\" ng-click=\"$ctrl.$sendReply($event)\" aria-label=\"Send reply\">" +
									"<md-icon class=\"mdi mdi-send md-24\"></md-icon>" +
								"</md-button>" +
							"</div>" +
						"</div>" +
					"</div>" +
					"<div ng-transclude class=\"no-padding\"></div>" +
				"</div>" +
			"</div>"
	});
	
	 /* @ngInject */
	function ReviewReplyCtrl($scope) {
		var ctrl = this;
		
		this.$onInit = function() {
			ctrl.ngReadonly = _.isBoolean(ctrl.ngReadonly) ? ctrl.ngReadonly : true;
			if (ctrl.ngReadonly) {
				ctrl.$$currentMode = "view";
			}
			
			ctrl.ngEdit = _.isBoolean(ctrl.ngEdit) ? ctrl.ngEdit : false;
			
			ctrl.responseClass = ctrl.responseClass || "bg-info-light";
			ctrl.arrowClass = ctrl.arrowClass || "border-info-light";
			
			ctrl.$initReview();
		};
		
		this.$initReview = function(){
    		if (!ctrl.chReviewCtrl.review) {
    			return;
    		}
    		
    		ctrl.review = ctrl.chReviewCtrl.review;
    		
    		if (!ctrl.ngReadonly && (!ctrl.review.reply || !ctrl.review.reply.response)) {
    			ctrl.$$currentMode = "edit";
    		}
		};
		
		this.$editReply = function(ev) {
			if (ctrl.ngReadonly) {
				ctrl.$cancelReplyEdit(ev);
				return;
			}
			
			ctrl.$$reply = angular.copy(ctrl.review.reply.response);
			ctrl.$$currentMode = "edit";
		};
		
		this.$cancelReplyEdit = function(ev) {
			ctrl.$$reply = null;
			ctrl.$$currentMode = "view";
		};
		
		this.$sendReply = function(ev) {
			ctrl.review.reply.response = angular.copy(ctrl.$$reply);
			ctrl.onReply && ctrl.onReply({$event: ev, reply: ctrl.review.reply.response});
			ctrl.$cancelReplyEdit(ev);
		};
	}
})();