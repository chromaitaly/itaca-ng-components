(function() {
    'use strict';
    
    angular.module("itaca.components").component("chReviewContent", {
    	transclude: true,
    	require: {
			chReviewCtrl: '^chReview'
		},
		bindings: {
			showDate: "<",
			dateFormat: "@"
		},
		controller: ReviewContentCtrl,
    	template: 
    		"<div>" +
		    	"<div class=\"layout-row layout-wrap layout-align-center-center layout-padding\">" +
		    		"<div class=\"layout-column flex-xs-100 flex-sm-100 flex-gt-sm\">" +
		    			"<div ng-show=\"!$ctrl.review.showDetails\">" +
		    				"<div class=\"md-margin ng-scope no-margin-top no-margin-x-sides\">" +
		    					"<small><span translate=\"review.score.total\"></span>:</small>" +
		    					"<md-progress-linear md-mode=\"determinate\" value=\"{{($ctrl.review.score * 10)}}\"></md-progress-linear>" +
		    				"</div>" +
		    			"</div>" +
		    			"<div ng-show=\"$ctrl.review.showDetails\">" +
		    				"<div ng-repeat=\"feedback in $ctrl.review.feedbacks track by $index\" class=\"md-margin ng-scope no-margin-top no-margin-x-sides\"" + 
		    					"title=\"{{::feedback.value}}\" ng-switch=\"feedback.type\">" +
		    					"<small class=\"layout-row flex-100\"><span class=\"flex\" translate=\"{{::feedback.titleKey}}\" translate-values=\"{{feedback.titleParams}}\"></span><span ng-if=\"feedback.type == 'RANK'\">{{::feedback.value}}</span></small>" +
		    					"<md-progress-linear ng-switch-when=\"RANK\" md-mode=\"determinate\" value=\"{{(feedback.value * 10)}}\"></md-progress-linear>" +
		    					"<div ng-switch-default>" +
		    						"<small ng-if=\"feedback.value\">{{feedback.value}}</small>" +
		    						"<small ng-if=\"!feedback.value\" class=\"text-gray-light text-lowercase\"><em>({{::('review.comment.none'|translate)}})</em></small>" +
		    					"</div>" +
		    				"</div>" +
		    			"</div>" +
		    			"<div class=\"text-right\">" +
		    				"<md-button class=\"auto-height no-margin row-1 text-capitalize text-gray-light text-small\" ng-click=\"$ctrl.review.showDetails = !$ctrl.review.showDetails\" aria-label=\"show details\">" +
		    					"<span ng-if=\"!$ctrl.review.showDetails\" translate=\"common.show\"></span>" +
		    					"<span ng-if=\"$ctrl.review.showDetails\" translate=\"common.hide\"></span>" +
		    					"&nbsp;<span class=\"text-lowercase\" translate=\"common.details\"></span>" + 
		    					"<md-icon ng-class=\"$ctrl.review.showDetails ? 'mdi-chevron-up' : 'mdi-chevron-down'\" class=\"mdi md-18\"></md-icon>" +
		    				"</md-button>" +
		    			"</div>" +
		    		"</div>" +
		    		"<div class=\"flex-100 flex-gt-sm-25 layout-column\" ng-class=\"$ctrl.review.showDetails ? 'layout-align-center-center' : 'layout-align-start-center'\">" +
		    			"<small ng-if=\"$ctrl.review.showDetails\" class=\"font-12 text-gray-light text-center\" translate=\"review.score.total\"></small>" +
		    			"<span class=\"md-headline\">{{::$ctrl.review.score.toFixed(1)}}</span>" +
		    			"<span class=\"text-center\" translate=\"{{$ctrl.review.label}}\"></span>" +
		    		"</div>" +
		    	"</div>" +
		    	"<div class=\"overflow-hidden\" ng-transclude></div>" +
		    	"<div ng-if=\"$ctrl.review.createdDate && $ctrl.showDate\">" +
		    		"<md-divider></md-divider>" +
		    		"<div class=\"layout-padding text-gray-light\">" +
	    				"<small>{{$ctrl.review.createdDate|utcDate:$ctrl.dateFormat}}</small>" +
    				"</div>" +
	    		"</div>" +
	    	"</div>"
    });
    
    /* @ngInject */
    function ReviewContentCtrl($scope){
    	var ctrl = this;
    	
    	this.$onInit = function(){
    		ctrl.$initReview();
    		
    		ctrl.showDate = _.isBoolean(ctrl.showDate) ? ctrl.showDate : false;
			ctrl.dateFormat = !_.isNil(ctrl.dateFormat) ? ctrl.dateFormat : ctrl.chReviewCtrl.dateFormat;
    	};
    	
    	this.$initReview = function(){
    		if (!ctrl.chReviewCtrl.review) {
    			return;
    		}
    		
    		ctrl.review = ctrl.chReviewCtrl.review;
    		
    		ctrl.review.showDetails = true;
    	};
    }
})();