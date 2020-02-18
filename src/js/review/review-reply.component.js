(function() {
	"use strict";
	
	angular.module("itaca.components").component("chReviewReply", {
		transclude: true,
		require: {
			chReviewCtrl: "^chReview"
		},
		bindings: {
			ngReadonly: "<?",
			ngEdit: "<?",
			showReply: "<?",
			replyTitle: "@",
			onReply: "&?",
			onCancelReply: "&?",
			responseClass: "@?",
			arrowClass: "@?"
		},
		controller: ReviewReplyCtrl,
		template:
			"<div ng-if=\"$ctrl.showReply || $ctrl.review.reply.response || $ctrl.noDefault\" class=\"ch-review-reply\">" +
				"<div class=\"ch-review-reply-arrow {{$ctrl.arrowClass}}\"></div>" +
				"<div class=\"layout-padding no-padding ch-review-reply-inner {{$ctrl.responseClass}}\">" +
					"<div ng-if=\"!$ctrl.noDefault\" class=\"layout-padding\">" +
						"<div class=\"layout-row layout-padding-sm no-padding layout-align-start-center\">" +
							"<div flex>" +
								"<strong ng-if=\"!$ctrl.replyTitle\"><span translate=\"common.answer\"></span>:</strong>" +
								"<strong ng-if=\"$ctrl.replyTitle\" ng-bind=\"$ctrl.replyTitle\"></strong>" +
							"</div>" +
							"<md-button ng-if=\"$ctrl.$$currentMode == 'edit'\" class=\"no-margin auto-height row-1 text-lowercase text-gray-light\" " +
								"ng-click=\"$ctrl.$cancelEdit($event, true)\" aria-label=\"Cancel reply\">" +
								"<small translate=\"common.cancel\"></small>" + 
							"</md-button>" +
						"</div>" +
						"<div ng-if=\"$ctrl.$$currentMode == 'view'\" class=\"layout-row layout-align-start-center no-padding-top no-padding-bottom no-padding-right\">" +
							"<div class=\"flex text-wrap\">" +
								"<span hm-read-more hm-text=\"{{$ctrl.review.reply.response}}\" hm-limit=\"200\" hm-more-text=\"{{'common.read.more'|translate}}\"" +
								"hm-less-text=\"{{'common.read.less'|translate}}\" hm-link-class=\"clickable text-primary\"></span>" +
							"</div>" +
							"<div ng-if=\"$ctrl.review.reply.response\">" +
								"<div class=\"no-padding-left no-padding-right no-padding-bottom\">" +
									"<md-button ng-if=\"!$ctrl.ngReadonly || $ctrl.ngEdit\" class=\"no-margin text-lowercase text-gray-light\" ng-class=\"{'md-icon-button': !$ctrl.$mdMedia('gt-sm')}\"" +
										"ng-click=\"$ctrl.$edit()\" aria-label=\"Edit reply\">" +
										"<md-icon class=\"mdi mdi-pencil\" ng-class=\"{'md-18': !$ctrl.$mdMedia('gt-sm'), 'md-14': $ctrl.$mdMedia('gt-sm')}\"></md-icon>" +
										"<small hide show-gt-sm translate=\"common.edit\"></small>" +
										"<md-tooltip hide-gt-sm><span translate=\"common.edit\"></span></md-tooltip>" +
									"</md-button>" +
								"</div>" +
							"</div>" +
						"</div>" +
						"<div ng-if=\"$ctrl.$$currentMode == 'edit'\" class=\"no-padding-top no-padding-bottom no-padding-right\">" +
							"<div layout layout-padding-sm class=\"layout-align-start-center\">" +
								"<div flex>" +
									"<md-input-container md-no-float class=\"md-block bg-white border-radius minimal-input no-margin\">" +
										"<textarea placeholder=\"{{'review.reply.label'|translate}}...\" ng-model=\"$ctrl.$$reply\" ng-disabled=\"$ctrl.$$saving\" " +
											"max-rows=\"5\" md-no-resize autofocus></textarea>" +
									"</md-input-container>" +
									"<md-progress-linear md-mode=\"query\" ng-show=\"$ctrl.$$saving\"></md-progress-linear>" +
								"</div>" +
								"<div ng-if=\"$ctrl.$$error\" class=\"am-fade-and-scale\">" +
									"<md-icon class=\"mdi mdi-alert-circle-outline md-18 text-danger material-icons\"></md-icon>" +
									"<md-tooltip><span translate=\"error.review.reply.saving\"></span></md-tooltip>" +
								"</div>" +
								"<div layout layout-align=\"center end\" class=\"no-padding am-fade-and-scale\" ng-if=\"$ctrl.$$reply && $ctrl.$$reply != $ctrl.$$oriReply\">" +
									"<md-button class=\"md-icon-button\" ng-class=\"{'md-raised':$ctrl.$$reply}\" ng-disabled=\"!$ctrl.$$reply || $ctrl.$$reply == $ctrl.$$oriReply || $ctrl.$$saving\" " +
										"ng-click=\"$ctrl.$save($event)\" aria-label=\"Send reply\">" +
										"<md-icon class=\"mdi mdi-send md-24 material-icons\" ng-class=\"{'text-gray-light': $ctrl.$$reply && $ctrl.$$reply != $ctrl.$$oriReply}\"></md-icon>" +
									"</md-button>" +
								"</div>" +
							"</div>" +
							"<div ng-if=\"!$ctrl.$$saving && $ctrl.$$error\" class=\"layout-padding-sm text-danger am-fade-and-scale\">" +
								"<small ng-if=\"$ctrl.error != true\" ng-bind=\"$ctrl.$$error\"></small>" +
								"<small ng-if=\"$ctrl.error == true\" translate=\"error.review.reply.saving\"></small>" +
							"</div>" +
						"</div>" +
					"</div>" +
					"<div ng-transclude class=\"no-padding\"></div>" +
				"</div>" +
			"</div>"
	});
	
	 /* @ngInject */
	function ReviewReplyCtrl($scope, $q, $mdMedia) {
		var ctrl = this;
		
		this.$mdMedia = $mdMedia;
		
		this.$onInit = function() {
			ctrl.$initReview();
			
			ctrl.$$currentMode = "view";
			ctrl.ngReadonly = _.isBoolean(ctrl.ngReadonly) ? ctrl.ngReadonly : true;
			ctrl.ngEdit = _.isBoolean(ctrl.ngEdit) ? ctrl.ngEdit : false;
			ctrl.responseClass = ctrl.responseClass || "bg-info-light";
			ctrl.arrowClass = ctrl.arrowClass || "border-info-light";
			ctrl.$manageShowReply();
		};
		
		this.$onChanges = function(changesObj) {
			if (!changesObj) {
				return;
			}
			
			if ((changesObj.ngEdit && !changesObj.ngEdit.isFirstChange()) || (changesObj.ngReadonly && !changesObj.ngReadonly.isFirstChange())) {				
				ctrl.$edit();
			}
			
			if (changesObj.showReply) {
				ctrl.$manageShowReply();
				ctrl.showReply && (!ctrl.review.reply || !ctrl.review.reply.response) && ctrl.$edit();
			}
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
		
		this.$manageShowReply = function() {
			if (!ctrl.review) {
				return;
			}
			
			ctrl.showReply = ctrl.review.reply && ctrl.review.reply.response ? true : _.isBoolean(ctrl.showReply) ? ctrl.showReply : false;
		};
		
		this.$edit = function() {
			if (ctrl.ngReadonly || !ctrl.ngEdit) {
				ctrl.$cancelEdit();
				return;
			}
			
			ctrl.$$oriReply = angular.copy(ctrl.review.reply ? ctrl.review.reply.response : null);
			ctrl.$$reply = angular.copy(ctrl.$$oriReply)
			ctrl.$$currentMode = "edit";
		};
		
		this.$cancelEdit = function(ev, notify) {
			ctrl.$$reply = null;
			ctrl.$$oriReply = null;
			ctrl.$$currentMode = "view";
			notify && ctrl.onCancelReply && ctrl.onCancelReply({$event: ev, $review: ctrl.review});			
		};
		
		this.$save = function(ev) {
			if (!ctrl.$$reply) {
				return;
			}
			
			ctrl.$onSaving();
			
			var ret = ctrl.onReply ? ctrl.onReply({$event: ev, $review: ctrl.review, $reply: ctrl.$$reply}) : ctrl.$$reply;			
			$q.when(ret).then(ctrl.$onSaveSuccess, ctrl.$onSaveFailure);
		};
		
		this.$onSaveSuccess = function() {
			ctrl.review.reply = ctrl.review.reply || {};
			ctrl.review.reply.response = angular.copy(ctrl.$$reply);
			
			ctrl.$$error = false;
			ctrl.$$saving = false;
			ctrl.$cancelEdit();
		};
		
		this.$onSaveFailure = function(error) {
			ctrl.$$error = _.isEmpty(error) ? true : error;
			ctrl.$$saving = false;
		};
		
		this.$onSaving = function() {
			ctrl.$$error = false;
			ctrl.$$saving = true;
		};
	}
})();