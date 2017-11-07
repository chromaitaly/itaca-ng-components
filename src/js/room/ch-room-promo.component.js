(function() {
    'use strict';
    
    angular.module("itaca-ui").component("chRoomPromo", {
    	require: {
    		chRoomCtrl: '^chRoom',
		},
    	bindings: {},
		controller: RoomPromoCtrl,
		template:
			"<div class=\"layout-column layout-margin-sm no-margin-left\">" +
				"<div ng-if=\"$ctrl.chRoomCtrl.onArrival\" class=\"no-margin-left\">" +
					"<div class=\"layout-column layout-padding no-padding row-mini bg-success md-subhead\">" +
						"<strong>" +
							"<md-icon class=\"mdi mdi-thumb-up md-18 text-white\"></md-icon>" +
							"<span translate=\"reservation.pay.at.hotel\"></span>" +
						"</strong>" +
					"</div>" +
				"</div>" +
				"<div ng-if=\"$ctrl.chRoomCtrl.bestPromo\" class=\"no-margin-left\">" +
					"<div class=\"layout-column layout-padding no-padding row-mini md-subhead\" "+
						"ng-class=\"{'bg-success': $ctrl.chRoomCtrl.bestPromo.onArrival || $ctrl.chRoomCtrl.bestPromo.promotionType == 'EARLY_BOOKING', "+
						"'bg-info' : !$ctrl.chRoomCtrl.bestPromo.onArrival && $ctrl.chRoomCtrl.bestPromo.promotionType == 'STANDARD',  "+
						"'bg-primary-light': !$ctrl.chRoomCtrl.bestPromo.onArrival && $ctrl.chRoomCtrl.bestPromo.promotionType == 'MINIMUM_STAY', "+
						"'bg-primary': !$ctrl.chRoomCtrl.bestPromo.onArrival && $ctrl.chRoomCtrl.bestPromo.promotionType == 'BOOK_TODAY', "+
						"'bg-blue-sea': !$ctrl.chRoomCtrl.bestPromo.onArrival && $ctrl.chRoomCtrl.bestPromo.promotionType == 'LAST_MINUTE', "+
						"'bg-warn': !$ctrl.chRoomCtrl.bestPromo.onArrival && $ctrl.chRoomCtrl.bestPromo.promotionType == 'LAST_SECOND'}\"> "+
						"<strong ng-if=\"!$ctrl.chRoomCtrl.bestPromo.onArrival\" ng-switch=\"$ctrl.chRoomCtrl.bestPromo.promotionType\"> "+
							"<md-icon class=\"mdi mdi-sale md-10 text-white\"></md-icon> "+
							"<span ng-switch-when=\"STANDARD\">" +
								"<span translate=\"common.offer.special\"></span>&nbsp;<span ng-if=\"$ctrl.chRoomCtrl.bestPromo.discount.type=='PERCENTAGE'\">-{{$ctrl.chRoomCtrl.bestPromo.discount.finalAmount}}%</span><span ng-if=\"$ctrl.chRoomCtrl.bestPromo.discount.type=='PRICE'\">-{{$ctrl.chRoomCtrl.bestPromo.discount.finalAmount|chCurrency}}</span>" +
							"</span>"+
				      		"<span ng-switch-when=\"MINIMUM_STAY\">" +
				      			"<span translate=\"promotions.promotion.label.minstay.nigths\" translate-value-count=\"{{$ctrl.chRoomCtrl.bestPromo.minStay}}\"></span>&nbsp;<span ng-if=\"$ctrl.chRoomCtrl.bestPromo.discount.type=='PERCENTAGE'\">-{{$ctrl.chRoomCtrl.bestPromo.discount.finalAmount}}%</span><span ng-if=\"$ctrl.chRoomCtrl.bestPromo.discount.type=='PRICE'\">-{{$ctrl.chRoomCtrl.bestPromo.discount.finalAmount|chCurrency}}</span>" +
				      		"</span>"+
				      		"<span ng-switch-when=\"BOOK_TODAY\">" +
				      			"<span translate=\"promotions.promotion.label.only.today\"></span>!&nbsp;<span ng-if=\"$ctrl.chRoomCtrl.bestPromo.discount.type=='PERCENTAGE'\">-{{$ctrl.chRoomCtrl.bestPromo.discount.finalAmount}}%</span><span ng-if=\"$ctrl.chRoomCtrl.bestPromo.discount.type=='PRICE'\">-{{$ctrl.chRoomCtrl.bestPromo.discount.finalAmount|chCurrency}}</span>" +
				      		"</span>" +
				      		"<span ng-switch-when=\"EARLY_BOOKING\">" +
				      			"<span translate=\"promotions.early\"></span>&nbsp;<span ng-if=\"$ctrl.chRoomCtrl.bestPromo.discount.type=='PERCENTAGE'\">-{{$ctrl.chRoomCtrl.bestPromo.discount.finalAmount}}%</span><span ng-if=\"$ctrl.chRoomCtrl.bestPromo.discount.type=='PRICE'\">-{{$ctrl.chRoomCtrl.bestPromo.discount.finalAmount|chCurrency}}</span>" +
				      		"</span>" +
				      		"<span ng-switch-when=\"LAST_MINUTE\">" +
				      			"<span translate=\"promotions.last.minute\"></span>&nbsp;<span ng-if=\"$ctrl.chRoomCtrl.bestPromo.discount.type=='PERCENTAGE'\">-{{$ctrl.chRoomCtrl.bestPromo.discount.finalAmount}}%</span><span ng-if=\"$ctrl.chRoomCtrl.bestPromo.discount.type=='PRICE'\">-{{$ctrl.chRoomCtrl.bestPromo.discount.finalAmount|chCurrency}}</span>" +
				      		"</span>" +
				      		"<span ng-switch-when=\"LAST_SECOND\">" +
				      			"<span translate=\"promotions.last.second\"></span>&nbsp;<span ng-if=\"$ctrl.chRoomCtrl.bestPromo.discount.type=='PERCENTAGE'\">-{{$ctrl.chRoomCtrl.bestPromo.discount.finalAmount}}%</span><span ng-if=\"$ctrl.chRoomCtrl.bestPromo.discount.type=='PRICE'\">-{{$ctrl.chRoomCtrl.bestPromo.discount.finalAmount|chCurrency}}</span>" +
				      		"</span>" +
						"</strong>" +
					"</div>" +
				"</div>" +
			"</div>",
		transclude: true,
		
    });
    
    /* @ngInject */
    function RoomPromoCtrl($scope){
    	var ctrl = this;
    	
    	this.$onInit = function(){
    	};
    };
    
})();