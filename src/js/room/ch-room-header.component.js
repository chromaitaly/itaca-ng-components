(function() {
    'use strict';
    
    angular.module("itaca.components").component("chRoomHeader", {
    	require: {
    		chRoomCtrl: '^chRoom',
		},
    	bindings: {
    	},
		controller: RoomHeaderCtrl,
		template: 
			"<div class=\"ch-room-header-content layout-column\">" +
	   			"<ng-transclude></ng-transclude>" +
   				
   				"<div ng-if=\"$ctrl.chRoomCtrl.showInfoBtn\" class=\"img-bottom-left-bar layout-row layout-wrap layout-align-center-center\">" +
		        	"<md-button ng-class=\"{'md-icon-button' : $ctrl.$mdMedia('xs')}\" ng-click=\"$ctrl.toggleInfo()\" aria-label=\"Open room information\">" +
		        		"<div class=\"row-mini\">" +
			        		"<md-icon class=\"mdi mdi-information-outline md-18 text-white\"></md-icon>" +
			        		"<small class=\"hide-xs hide-sm\" translate=\"common.information\"></small>" +
			        	"</div>" +
		        	"</md-button>" +							        	
		        "</div>" +
		        
   				"<div ng-if=\"$ctrl.chRoomCtrl.showRateBtn\" ng-class=\"::{'img-right-bar': $ctrl.$mdMedia('gt-xs'), 'img-bottom-right-bar': $ctrl.$mdMedia('xs')}\" class=\"layout-row layout-align-center-center\">" +
		        	"<md-button ng-click=\"$ctrl.toggleRates()\" aria-label=\"Open room prices\">" +
			        	"<div layout class=\"row-mini text-left layout-padding no-padding\">" +
				        	"<div layout=\"column\">" +
					        	"<small>" +
					        		"<span class=\"text-initial\" translate=\"common.from\"></span>" +
					        		"<i ng-if=\"$ctrl.chRoomCtrl.bestRate.amount.initialAmount > 0 && $ctrl.chRoomCtrl.bestRate.amount.initialAmount > $ctrl.chRoomCtrl.bestRate.amount.finalAmount\">&nbsp;<del>{{$ctrl.chRoomCtrl.bestRate.amount.initialAmount|chCurrency}}</del></i>" +
					        	"</small>" +
					        	"<span class=\"md-title\"><strong>{{$ctrl.chRoomCtrl.bestRate.amount.finalAmount|chCurrency}}</strong></span>" +
					        	"<small ng-if=\"$ctrl.chRoomCtrl.nights > 0\" class=\"text-lowercase\">" +
					        		"<span translate=\"common.for\"></span>&nbsp;{{$ctrl.chRoomCtrl.nights}}" +
					        		"<span ng-show=\"$ctrl.chRoomCtrl.nights == 1\" translate=\"common.night\"></span>" +
					        		"<span ng-show=\"$ctrl.chRoomCtrl.nights > 1\" translate=\"common.nights\"></span>" +
					        	"</small>" +
					        "</div>" +
					        "<div layout=\"column\">" +
					        	"<md-icon class=\"mdi md-48 text-white\" ng-class=\"$ctrl.chRoomCtrl.showRoomRates ? 'mdi-chevron-up' : 'mdi-chevron-down animated infinite bounce'\"></md-icon>" +
					        "</div>" +
					        "<md-tooltip hide-xs>" +
					        	"<span ng-if=\"!$ctrl.chRoomCtrl.showRoomRates\" translate=\"ratesheet.rates.all.view\"></span>" +
					        	"<span ng-if=\"$ctrl.chRoomCtrl.showRoomRates\" translate=\"ratesheet.rates.hide\"></span>" +
					        "</md-tooltip>" +
						"</div>" +
					"</md-button>" +
		        "</div>" +
		        
			"</div>",
		transclude: true,
		
    });
    
    /* @ngInject */
    function RoomHeaderCtrl($scope, $mdMedia, Navigator){
    	var ctrl = this;
    	
    	this.$mdMedia = $mdMedia;
    	
    	this.$onInit = function(){
    		ctrl.chRoomCtrl.showRoomRates = false;
    		ctrl.chRoomCtrl.showRoomInfo = false;
    	};
    	
    	this.toggleInfo = function(){
    		ctrl.chRoomCtrl.showRoomInfo = !ctrl.chRoomCtrl.showRoomInfo;
    		ctrl.chRoomCtrl.showRoomRates = false;
    		if(!ctrl.chRoomCtrl.showRoomInfo){
    			Navigator.scrollToAnchor('av-'+ctrl.chRoomCtrl.$$index);
    		}
    	};
    	
    	this.toggleRates = function(){
    		ctrl.chRoomCtrl.showRoomRates = !ctrl.chRoomCtrl.showRoomRates;
    		ctrl.chRoomCtrl.showRoomInfo = false;
    		if(!ctrl.chRoomCtrl.showRoomRates){
    			Navigator.scrollToAnchor('av-'+ctrl.chRoomCtrl.$$index);
    		}else{
    			Navigator.scrollToAnchor('av-'+ctrl.chRoomCtrl.$$index+'-rates');
    		}
    	};
    }
    
})();