(function() {
	'use strict';
	
	angular.module("itaca.components").component("creditCardView", {
		bindings: {
			paymentMethod: "<",
			mask: "<?"
		},
		controller: CreditCardViewCtrl,
		template: 
			"<div ng-show=\"$ctrl.paymentMethod.circuit\" class=\"card-layout text-white margin-auto {{$ctrl.paymentMethod.circuit ? 'card-' + $ctrl.paymentMethod.circuit.toLowerCase() : ''}}\" ng-class=\"{'md-margin': $ctrl.$mdMedia('gt-sm')}\">" +
				"<div layout=\"column\" layout-fill class=\"card-fill\">" +
					"<div layout>" +
						"<div flex layout=\"column\" layout-align=\"center start\" class=\"flex-offset-5 text-bold\">" +
							"<em ng-if=\"$ctrl.paymentMethod.type == 'OTHER_CARD'\">Debit</em>" +
							"<em ng-if=\"$ctrl.paymentMethod.type == 'CREDIT_CARD'\">Credit</em>" +
						"</div>" +
						"<div class=\"card-logo text-right\">" +
							"<md-icon class=\"{{$ctrl.$$paymentIcons[$ctrl.paymentMethod.circuit]}} ch-pay-icon-single md-70\"></md-icon>" +
						"</div>" +
						"<div class=\"card-contactless text-right\">" +
							"<md-icon class=\"mdi mdi-contactless-payment md-24 text-white\"></md-icon>" +
						"</div>" +
					"</div>" +
					"<div flex layout layout-align=\"start end\">" +
						"<span layout-padding class=\"no-padding md-headline\">" +
						"<span ng-if=\"$ctrl.mask && $ctrl.paymentMethod.pan\">{{$ctrl.paymentMethod.pan | maskCard}}</span>" +
						"<span ng-if=\"!$ctrl.mask && $ctrl.paymentMethod.pan\">{{$ctrl.paymentMethod.pan | beautifyCard}}</span>" +
						"</span>" +
					"</div>" +
					"<div layout layout-padding class=\"no-padding\">" +
						"<div layout=\"column\" flex class=\"text-left no-padding-right\" ng-if=\"$ctrl.paymentMethod.holder\">" +
							"<small class=\"text-mini\" translate=\"payment.card.holder\"></small>" +
							"<span class=\"md-subhead text-bold\">{{$ctrl.paymentMethod.holder}}</span>" +
						"</div>" +
						"<div layout=\"column\" layout-align=\"start center\" ng-if=\"$ctrl.paymentMethod.expiration || (($ctrl.paymentMethod.expirationMonth+1) && $ctrl.paymentMethod.expirationYear)\">" +
							"<small class=\"text-mini\" translate=\"common.document.expirationDate\"></small>" +
							"<span ng-if=\"!$ctrl.paymentMethod.expiration\" class=\"md-subhead text-bold\">{{$ctrl.paymentMethod.expirationMonth+1}}/{{$ctrl.paymentMethod.expirationYear}}</span>" +
							"<span ng-if=\"$ctrl.paymentMethod.expiration\" class=\"md-subhead text-bold\">{{$ctrl.paymentMethod.expiration| date: 'MM/yy'}}</span>" +
						"</div>" +
					"</div>" +
				"</div>" +
				"<div class=\"card-pattern\"></div>" +
			"</div>"
	});
	
	 /* @ngInject */
	function CreditCardViewCtrl($scope, $mdMedia, IconUtils) {
		var ctrl = this;
		
		this.$mdMedia = $mdMedia;
		
		this.$onInit = function(){
			
			ctrl.$$paymentIcons = IconUtils.paymentIcons();
			
			ctrl.mask = _.isBoolean(ctrl.mask) ? ctrl.mask : false;
		};
		
		
	}
})();