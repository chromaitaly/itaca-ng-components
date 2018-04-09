(function() {
	'use strict';
	
	angular.module("itaca.components").component('chSocialShare', {
		bindings: {
			iconSize: "<?",
			title: "@",
			text: "@",
			url: "@",
			tags: "@",
			mediaUrl: "@",
			fbAppId: "@"
		},
		controller: SocialShareCtrl,
		template: 
			"<div class=\"layout-padding no-padding-top\" ng-cloak>" +
				"<div hide-gt-sm class=\"layout-align-center-center layout-row layout-wrap\">" +
					"<a class=\"auto-height button-mini md-button\" aria-label=\"whatsapp\"" +
				      "socialshare" +
				       "socialshare-provider=\"whatsapp\"" +
				       "socialshare-url=\"{{$ctrl.$$url}}\"" +
				       "socialshare-text=\"{{$ctrl.text}}\">" +
				       "<md-icon class=\"mdi mdi-whatsapp {{$ctrl.iconSize}} material-icons text-whatsapp\"></md-icon>" +
				       "<div class=\"font-12 row-mini text-initial text-wrap\">Whatsapp</div>" +
				    "</a>" +
				     "<a class=\"auto-height button-mini md-button\" aria-label=\"sms\"" +
				       "socialshare" +
				       "socialshare-provider=\"sms\"" +
				       "socialshare-text=\"{{$ctrl.text}}\"" +
				       "socialshare-url=\"{{$ctrl.$$url}}\">" +
				       "<md-icon class=\"mdi mdi-message-text {{$ctrl.iconSize}} material-icons text-primary\"></md-icon>" +
				       "<div class=\"font-12 row-mini text-initial text-wrap\">SMS</div>" +
				    "</a>" +
					"<a class=\"auto-height button-mini md-button\" aria-label=\"facebook messenger\"" +
						"socialshare" +
						"socialshare-provider=\"facebook-messenger\"" +
						"socialshare-url=\"{{$ctrl.$$url}}\">" +
						"<md-icon class=\"mdi mdi-facebook-messenger {{$ctrl.iconSize}} material-icons text-messenger\"></md-icon>" +
						"<div class=\"font-12 row-mini text-initial text-wrap\">Messenger</div>" +
					"</a>" +
				"</div>" +
				"<md-divider hide-gt-sm></md-divider>" +
				"<div class=\"layout-align-center-center layout-row layout-wrap\">" +
					"<md-button class=\"auto-height button-mini\" aria-label=\"email\"" +
				        "socialshare" +
				        "socialshare-provider=\"email\"" +
				        "socialshare-media=\"{{$ctrl.$$mediaUrl}}\"" +
				        "socialshare-subject=\"{{$ctrl.title}}\"" +
				        "socialshare-body=\"{{$ctrl.text}} - {{$ctrl.$$url}}\"" +
				        "socialshare-popup-height=\"300\"" +
				        "socialshare-popup-width=\"400\">" +
						"<md-icon class=\"mdi mdi-email {{$ctrl.iconSize}} material-icons text-primary\"></md-icon>" +
						"<div class=\"font-12 row-mini text-initial text-wrap\">E-mail</div>" +
					"</md-button>" +
					"<md-button class=\"auto-height button-mini\" aria-label=\"facebook\"" +
				        "socialshare" +
			            "socialshare-provider=\"facebook\"" +
			            "socialshare-via=\"{{$ctrl.fbAppId}}\"" +
			            "socialshare-type=\"feed\"" +
			            "socialshare-media=\"{{$ctrl.$$mediaUrl}}\"" +
			            "socialshare-text=\"{{$ctrl.title}}\"" +
			            "socialshare-url=\"{{$ctrl.$$url}}\"" +
			            "socialshare-redirect-uri=\"{{$ctrl.$$url}}\"" +
			            "socialshare-quote=\"{{$ctrl.title}}\"" +
			            "socialshare-hashtags=\"{{$ctrl.tags}}\"" +
			            "socialshare-popup-height=\"300\"" +
			            "socialshare-popup-width=\"400\"" +
			            "socialshare-trigger=\"click\">" +
						"<md-icon class=\"mdi mdi-facebook {{$ctrl.iconSize}} material-icons text-fb\"></md-icon>" +
						"<div class=\"font-12 row-mini text-initial text-wrap\">Facebook</div>" +
					"</md-button>" +
				    "<md-button class=\"auto-height button-mini\" aria-label=\"twitter\"" +
				        "socialshare" +
				        "socialshare-provider=\"twitter\"" +
				        "socialshare-hashtags=\"{{$ctrl.tags}}\"" +
				        "socialshare-text=\"{{$ctrl.text}}\"" +
				        "socialshare-url=\"{{$ctrl.$$url}}\"" +
				        "socialshare-popup-height=\"300\"" +
				        "socialshare-popup-width=\"400\"" +
				        "socialshare-trigger=\"click\">" +
						"<md-icon class=\"mdi mdi-twitter text-twitter {{$ctrl.iconSize}} material-icons\"></md-icon>" +
						"<div class=\"font-12 row-mini text-initial text-wrap\">Twitter</div>" +
				    "</md-button>" +
				    "<md-button class=\"auto-height button-mini\" aria-label=\"google plus\"" +
				        "socialshare" +
				        "socialshare-provider=\"google\"" +
				        "socialshare-url=\"{{$ctrl.$$url}}\"" +
				        "socialshare-popup-height=\"300\"" +
				        "socialshare-popup-width=\"400\"" +
				        "socialshare-trigger=\"click\">" +
						"<md-icon class=\"mdi mdi-google-plus text-gplus {{$ctrl.iconSize}} material-icons\"></md-icon>" +
						"<div class=\"font-12 row-mini text-initial text-wrap\">Google +</div>" +
				    "</md-button>" +
					"<md-button class=\"auto-height button-mini\" aria-label=\"telegram\"" +
				        "socialshare" +
				        "socialshare-provider=\"telegram\"" +
				        "socialshare-url=\"{{$ctrl.$$url}}\"" +
				        "socialshare-text=\"{{$ctrl.text}}\"" +
				        "socialshare-trigger=\"click\">" +
						"<md-icon class=\"mdi mdi-telegram text-telegram {{$ctrl.iconSize}} material-icons\"></md-icon>" +
						"<div class=\"font-12 row-mini text-initial text-wrap\">Telegram</div>" +
					"</md-button>" +
					"<md-button class=\"auto-height button-mini\" aria-label=\"skype\"" +
				        "socialshare" +
				        "socialshare-provider=\"skype\"" +
				        "socialshare-url=\"{{$ctrl.$$url}}\"" +
				        "socialshare-text=\"{{$ctrl.text}}\"" +
				        "socialshare-popup-height=\"800\"" +
				        "socialshare-popup-width=\"400\"" +
				        "socialshare-trigger=\"click\">" +
						"<md-icon class=\"mdi mdi-skype text-skype {{$ctrl.iconSize}} material-icons\"></md-icon>" +
						"<div class=\"font-12 row-mini text-initial text-wrap\">Skype</div>" +
					"</md-button>" +
					"<md-button class=\"auto-height button-mini\" aria-label=\"reddit\"" +
				        "socialshare" +
				        "socialshare-provider=\"reddit\"" +
				        "socialshare-text=\"{{$ctrl.text}}\"" +
				        "socialshare-url=\"{{$ctrl.$$url}}\"" +
				        "socialshare-popup-height=\"300\"" +
				        "socialshare-popup-width=\"400\"" +
				        "socialshare-trigger=\"click\">" +
				    	"<md-icon class=\"mdi mdi-reddit text-reddit {{$ctrl.iconSize}} material-icons\"></md-icon>" +
						"<div class=\"font-12 row-mini text-initial text-wrap\">Reddit</div>" +
					"</md-button>" +
				    "<md-button class=\"auto-height button-mini\" aria-label=\"linkedin\"" +
				        "socialshare" +
				        "socialshare-provider=\"linkedin\"" +
				        "socialshare-text=\"{{$ctrl.text}}\"" +
				        "socialshare-url=\"{{$ctrl.$$url}}\"" +
				        "socialshare-description=\"{{$ctrl.text}}\"" +
				        "socialshare-source=\"{{$ctrl.title}}\"" +
				        "socialshare-popup-height=\"300\"" +
				        "socialshare-popup-width=\"400\"" +
				        "socialshare-trigger=\"click\">" +
				       	"<md-icon class=\"mdi mdi-linkedin text-linkedin {{$ctrl.iconSize}} material-icons\"></md-icon>" +
						"<div class=\"font-12 row-mini text-initial text-wrap\">Linkedin</div>" +
					"</md-button>" +
					"<md-button class=\"auto-height button-mini\" aria-label=\"pinterest\"" +
				        "socialshare" +
				        "socialshare-media=\"{{$ctrl.$$mediaUrl}}\"" +
				        "socialshare-provider=\"pinterest\"" +
				        "socialshare-text=\"{{$ctrl.text}}\"" +
				        "socialshare-url=\"{{$ctrl.$$url}}\"" +
				        "socialshare-popup-height=\"300\"" +
				        "socialshare-popup-width=\"400\"" +
				        "socialshare-trigger=\"click\">" +
						"<md-icon class=\"mdi mdi-pinterest text-pinterest {{$ctrl.iconSize}} material-icons\"></md-icon>" +
						"<div class=\"font-12 row-mini text-initial text-wrap\">Pinterest</div>" +
					"</md-button>" +
					"<md-button class=\"auto-height button-mini\" aria-label=\"tumblr\"" +
				        "socialshare" +
				        "socialshare-provider=\"tumblr\"" +
				        "socialshare-type=\"link\"" +
				        "socialshare-text=\"{{$ctrl.text}}\"" +
				        "socialshare-url=\"{{$ctrl.$$url}}\"" +
				        "socialshare-popup-height=\"300\"" +
				        "socialshare-popup-width=\"540\"" +
				        "socialshare-trigger=\"click\">" +
						"<md-icon class=\"mdi mdi-tumblr text-tumblr {{$ctrl.iconSize}} material-icons\"></md-icon>" +
						"<div class=\"font-12 row-mini text-initial text-wrap\">Tumblr</div>" +
					"</md-button>" +
					"<md-button class=\"auto-height button-mini\" aria-label=\"vk\"" +
				        "socialshare" +
				        "socialshare-provider=\"vk\"" +
				        "socialshare-text=\"{{$ctrl.text}}\"" +
				        "socialshare-url=\"{{$ctrl.$$url}}\"" +
				        "socialshare-popup-height=\"300\"" +
				        "socialshare-popup-width=\"400\"" +
				        "socialshare-trigger=\"click\">" +
						"<md-icon class=\"mdi mdi-vk text-vk {{$ctrl.iconSize}} material-icons\"></md-icon>" +
						"<div class=\"font-12 row-mini text-initial text-wrap\">Vk</div>" +
					"</md-button>" +
				"</div>" +
			"</div>"
	});
	
	/* @ngInject */
	function SocialShareCtrl($scope, UrlUtils, AppOptions) {
		var ctrl = this;
		
		this.$onInit = function() {
			if(!AppOptions.about){
				return;
			}
			
			ctrl.iconSize = ctrl.iconSize || 'md-38';
			ctrl.mediaUrl = ctrl.mediaUrl || "/resources/img/favicon-96x96.png";
			
			ctrl.$$mediaUrl = UrlUtils.parseUrl(ctrl.mediaUrl).href;
			ctrl.$$url = UrlUtils.parseUrl(ctrl.url).href;
		};
	}
})();