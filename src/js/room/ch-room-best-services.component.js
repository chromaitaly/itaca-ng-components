(function() {
    'use strict';
    
    angular.module("itaca-ui").component("chRoomBestServices", {
    	require: {
    		chRoomCtrl: '^chRoom',
		},
    	bindings: {
    		services: "<?"
    	},
		controller: RoomBestServicesCtrl,
		template:
			"<div layout layout-wrap layout-align=\"end start\" ng-if=\"$ctrl.services.length\">"+
				"<span ng-repeat=\"service in $ctrl.services track by $index\">"+
					"<span>" +
						"<md-icon class=\"{{service.icon}} layout-padding no-padding-top\" ng-class=\"{'text-white': $ctrl.chRoomCtrl.room.gallery.length}\"></md-icon>"+
						"<md-tooltip ng-if=\"service.label || service.labelKey\"><span ng-if=\"service.label\" ng-bind=\"service.label\"></span><span ng-if=\"!service.label\" translate=\"{{service.labelKey}}\"></span></md-tooltip>"+
					"</span>" +
				"</span>"+
			"</div>",
		
    });
    
    /* @ngInject */
    function RoomBestServicesCtrl($scope){
    	var ctrl = this;
    	
    	this.$onInit = function(){
    		ctrl.services = _.isArray(ctrl.services) ? ctrl.services : ctrl.chRoomCtrl.popularServices;
    	};
    };
})();