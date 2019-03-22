(function() {
	'use strict';
	
	angular.module("itaca.components").component("virtualCardView", {
		bindings: {
			source: "<",
		},
		controller: VirtualCardViewCtrl,
		template: 
			"<div ng-show=\"$ctrl.source\" class=\"card-layout card-virtual text-white margin-auto {{$ctrl.source ? 'card-virtual-' + $ctrl.source.toLowerCase() : ''}}\" ng-class=\"{'md-margin': $ctrl.$mdMedia('gt-sm')}\">" +
				"<div layout=\"column\" layout-fill class=\"card-fill\">" +
					"<div layout>" +
						"<div flex layout=\"column\" layout-align=\"center start\" class=\"flex-offset-5 text-bold\">" +
							"<em>Virtual Card</em>" +
						"</div>" +
						"<div class=\"card-logo text-right\">" +
							"<md-icon class=\"{{$ctrl.$$portalIcons[$ctrl.source]}} material-icons md-48 text-white\"></md-icon>" +
						"</div>" +
						"<div class=\"card-contactless text-right\">" +
							"<md-icon class=\"mdi mdi-contactless-payment md-24 text-white\"></md-icon>" +
						"</div>" +
					"</div>" +
					"<div flex layout layout-align=\"start end\">" +
						"<span layout-padding class=\"no-padding md-headline\">" +
							"<span>XXXX XXXX XXXX XXXX</span>" +
						"</span>" +
					"</div>" +
					"<div layout layout-padding class=\"no-padding\">" +
						"<div layout=\"column\" flex class=\"text-left\">" +
							"<small class=\"text-mini\" translate=\"payment.card.holder\"></small>" +
							"<span class=\"md-title text-bold\">XXXXXX XXXXX</span>" +
						"</div>" +
						"<div layout=\"column\" layout-align=\"start center\">" +
							"<small class=\"text-mini\" translate=\"common.document.expirationDate\"></small>" +
							"<span class=\"md-subhead text-bold\">XX/XX</span>" +
						"</div>" +
					"</div>" +
				"</div>" +
				"<div class=\"card-pattern\"></div>" +
			"</div>"
	});
	
	 /* @ngInject */
	function VirtualCardViewCtrl($scope, $mdMedia, IconUtils) {
		var ctrl = this;
		
		this.$mdMedia = $mdMedia;
		
		this.$onInit = function(){
			
			ctrl.$$portalIcons = IconUtils.portalIcons();
		};
	}
})();