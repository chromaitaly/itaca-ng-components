/**
 * date counter left
 */
(function() {
	'use strict';
	
	angular.module("itaca.components").component("chTimeLeft", {
		bindings: {
			start: "<?",
        	end: "<?"
    	},
		controller: TimeLeftCtrl,
		template: "<span ng-bind=\"$ctrl.$$timeLeft\"></span>"
	});

	/* @ngInject */
	function TimeLeftCtrl($scope) {
		var ctrl = this;
		
		this.$onInit = function() {
			$scope.$watchGroup([function() {
				return ctrl.start;
				
			}, function() {
				return ctrl.end;
				
			}], ctrl.$calculateDiff);
		};
    	
    	this.$calculateDiff = function(){
    		var start =  ctrl.start ? moment(ctrl.start) : moment();
	    	var end =  ctrl.start ? moment(ctrl.end) : moment();
	    	
    		ctrl.$$timeLeft = start.to(end);
    	};
	}
})();