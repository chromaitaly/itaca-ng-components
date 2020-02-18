(function() {
    "use strict";
    
    angular.module("itaca.components").component("chRoom", {
    	transclude: true,
    	bindings: {
    		room: "<",
    		storageUrl: "<?",
    		nights: "<?"
    	},
		controller: RoomCtrl,
		template: "<div id=\"{{'av-'+ $ctrl.$$index}}\" class=\"bg-gray-lighter md-margin no-margin-left no-margin-right relative\" ng-transclude></div>"
    });
    
    /* @ngInject */
    function RoomCtrl($scope, NumberUtils){
    	var ctrl = this;
    	
    	this.$onInit = function(){
    		ctrl.$$index = NumberUtils.uniqueNumber();  
    	};
    }
})();