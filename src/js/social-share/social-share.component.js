(function() {
	"use strict";
	
	angular.module("itaca.components").component("chSocialShare", {
		bindings: {
			iconSize: "@?",
			title: "@",
			text: "@",
			url: "@",
			tags: "@",
			mediaUrl: "@",
			fbAppId: "@"
		},
		controller: SocialShareCtrl,
		templateUrl: "/tpls/social-share/social-share.tpl"			
	});
	
	/* @ngInject */
	function SocialShareCtrl($scope, $mdMedia, UrlUtils, AppOptions) {
		var ctrl = this;
		
		this.$mdMedia = $mdMedia;
		
		this.$$config = {
			showMore: $mdMedia("gt-sm")
		};
		
		this.$onInit = function() {
			if(!AppOptions.about){
				return;
			}
			
			ctrl.iconSize = ctrl.iconSize || "md-38";
			ctrl.mediaUrl = ctrl.mediaUrl || "/resources/img/common/favicon-96x96.png";
			
			ctrl.$$mediaUrl = UrlUtils.parseUrl(ctrl.mediaUrl).href;
			ctrl.$$url = UrlUtils.parseUrl(ctrl.url).href;
		};
	}
})();