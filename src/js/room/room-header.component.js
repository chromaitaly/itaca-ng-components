(function() {
    "use strict";
    
    angular.module("itaca.components").component("chRoomHeader", {
    	transclude: true,
    	require: {
    		chRoomCtrl: "^chRoom"
		},
		controller: RoomHeaderCtrl,
		template: 
			"<div class=\"ch-room-header-content layout-column\">" +
	   			"<ng-transclude></ng-transclude>" +
   				
   				"<div ng-if=\"$ctrl.chRoomCtrl.$$hasInfo\" class=\"img-bottom-left-bar layout-row layout-wrap layout-align-center-center\">" +
		        	"<md-button ng-class=\"{'md-icon-button' : $ctrl.$mdMedia('xs')}\" ng-click=\"$ctrl.$toggleInfo()\" aria-label=\"Open room information\">" +
		        		"<div class=\"row-mini\">" +
			        		"<md-icon class=\"mdi mdi-information-outline md-18 text-white\"></md-icon>&nbsp;" +
			        		"<small class=\"hide-xs hide-sm\" translate=\"common.information\"></small>" +
			        	"</div>" +
		        	"</md-button>" +							        	
		        "</div>" +
   				"<div ng-if=\"$ctrl.chRoomCtrl.$$hasRates\" ng-class=\"::{'img-right-bar': $ctrl.$mdMedia('gt-xs'), 'img-bottom-right-bar': $ctrl.$mdMedia('xs')}\" " +
   					"class=\"layout-row layout-align-center-center\">" +
		        	"<md-button ng-click=\"$ctrl.$toggleRates()\" aria-label=\"Open room prices\" class=\"md-square-button\">" +
			        	"<div layout class=\"row-mini text-left layout-padding no-padding\">" +
				        	"<div layout=\"column\">" +
					        	"<small>" +
					        		"<span class=\"text-initial\" translate=\"common.from\"></span>" +
					        		"<i ng-if=\"$ctrl.chRoomCtrl.$$bestRate.amount.initialAmount > 0 && $ctrl.chRoomCtrl.$$bestRate.amount.initialAmount > $ctrl.chRoomCtrl.$$bestRate.amount.finalAmount\">&nbsp;<del>{{$ctrl.chRoomCtrl.$$bestRate.amount.initialAmount|chCurrency}}</del></i>" +
					        	"</small>" +
					        	"<span class=\"md-title\"><strong>{{$ctrl.chRoomCtrl.$$bestRate.amount.finalAmount|chCurrency}}</strong></span>" +
					        	"<small ng-if=\"$ctrl.chRoomCtrl.nights > 0\" class=\"text-lowercase\">" +
					        		"<span translate=\"common.for\"></span>&nbsp;{{$ctrl.chRoomCtrl.nights}}&nbsp;" +
					        		"<span ng-show=\"$ctrl.chRoomCtrl.nights == 1\" translate=\"common.night\"></span>" +
					        		"<span ng-show=\"$ctrl.chRoomCtrl.nights > 1\" translate=\"common.nights\"></span>" +
					        	"</small>" +
					        "</div>" +
					        "<div class=\"layout-align-center-center layout-column no-padding-right\">" +
					        	"<div class=\"bg-primary md-button no-margin layout-padding\">" +
					        		"<small class=\"text-initial\"><span translate=\"common.more.options\"></span></small>" +
					        	"</div>" +
					        "</div>" +
					        "<md-tooltip hide-xs>" +
					        	"<span ng-if=\"!$ctrl.chRoomCtrl.$$showRates\" translate=\"ratesheet.rates.all.view\"></span>" +
					        	"<span ng-if=\"$ctrl.chRoomCtrl.$$showRates\" translate=\"ratesheet.rates.hide\"></span>" +
					        "</md-tooltip>" +
						"</div>" +
						"<div hide show-gt-sm ng-if=\"$ctrl.chRoomCtrl.$$includedPaidServices.length\" class=\"bg-opaque-8 border-radius-2 hide md-margin ng-scope no-margin-top no-margin-x-sides row-mini show-gt-sm text-initial\">+&nbsp;<span translate=\"common.service.included.paid\"></span></div>" +
					"</md-button>" +
		        "</div>" +
			"</div>"
    });
    
    /* @ngInject */
    function RoomHeaderCtrl($scope, $mdMedia){
    	var ctrl = this;
    	
    	this.$mdMedia = $mdMedia;
    	
    	this.$onInit = function(){
    		ctrl.$initRoom();
    	};
    	
    	this.$initRoom = function() {
    		ctrl.$$room = ctrl.chRoomCtrl.room;
    	};
    	
    	this.$toggleInfo = function(show) {
    		ctrl.chRoomCtrl.$toggleInfo(show);
    		ctrl.chRoomCtrl.$toggleRates(false);
    	};
    	
    	this.$toggleRates = function(show) {
    		ctrl.chRoomCtrl.$toggleRates(show);
    		ctrl.chRoomCtrl.$toggleInfo(false);
    	};
    }    
})();