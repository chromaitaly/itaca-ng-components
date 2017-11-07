(function() {
	'use strict';
	
	angular.module("chroma.components").component("chReviewReservationInfo", {
		transclude: true,
		require: {
			chReviewCtrl: '^chReview'
		},
		bindings: {
			title: "@"
		},
		controller: ReviewReservationInfoCtrl,
		template:
			"<div layout-padding>" +
				"<div class=\"no-padding-bottom no-padding-right\">" +
					"<div>" +
						"<small>" +
							"<span ng-if=\"!$ctrl.title\"><span translate=\"review.source\"></span>&nbsp;</span>" +
							"<span ng-if=\"$ctrl.title\"><span ng-bind=\"$ctrl.title\"></span>&nbsp;</span>" +
							"<strong ng-switch=\"$ctrl.review.reservation.source\">" +
								"<span ng-switch-when=\"PORTAL\">{{$ctrl.appOptions.about.uiName}}</span>" +
								"<span ng-switch-default translate=\"channel.source.{{$ctrl.review.reservation.source.toLowerCase()}}\"></span>" +
							"</strong>" +
						"</small>" +
						"<span><md-icon class=\"{{$ctrl.portalIcons[$ctrl.review.reservation.source]}} channel-icon-mini\"></md-icon></span>" + 
					"</div>" +
					"<div ng-if=\"$ctrl.$$period\"><small ng-bind=\"$ctrl.$$period\"></small></div>" +
				"</div>" +
			"</div>"
	});
	
	 /* @ngInject */
	function ReviewReservationInfoCtrl(AppOptions, IconUtils, DateUtils) {
		var ctrl = this;
		
		this.appOptions = AppOptions;
		this.portalIcons = IconUtils.portalIcons();
		
		this.$onInit = function() {
			ctrl.textLimit = isFinite(parseInt(ctrl.textLimit)) ? parseInt(ctrl.textLimit) : 200;
			
			ctrl.$initReview();
		};
		
		this.$initReview = function(){
    		if (!ctrl.chReviewCtrl.review) {
    			return;
    		}
    		
    		ctrl.review = ctrl.chReviewCtrl.review;
    		
    		ctrl.$getPeriod();
		};
		
		this.$getPeriod = function(){
			var checkin = DateUtils.absoluteMoment(ctrl.review.reservation.checkin);
			var checkout = DateUtils.absoluteMoment(ctrl.review.reservation.checkout);
			
			if(checkin.get('month') == checkout.get('month')){
				ctrl.$$period = checkin.format('MMMM YYYY');
				
			} else {
				ctrl.$$period = checkin.format('MMMM YYYY') + '/'+ checkout.format('MMMM YYYY');
			}
		};
	}
})();