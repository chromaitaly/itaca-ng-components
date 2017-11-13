/**
 * date counter left
 */
(function() {
	'use strict';
	
	angular.module("itaca.components").component('chDateLeft', {
        bindings: {
        	start: "<?",
        	end: "<?"
        },
        controller: DateCounterCtrl,
        template: '<span>{{$ctrl.$$dateLeft}}</span>',
	 });

	/* @ngInject */
	function DateCounterCtrl(scope, ReservationUtils, $translate) {
		var ctrl = this;
		
		this.$onInit = function() {
			ctrl.$initWatches();
		};
		
		this.$calculateDiff = function(){
			var start =  ctrl.start ? moment(ctrl.start) : moment();
			var end =  ctrl.start ? moment(ctrl.end) : moment();
			
			ctrl.$$dateLeft = start.to(end);
		};
		
		this.$initWatches = function() {
			$scope.$watchGroup([function() {
				return ctrl.start;
			
			}, function() {
				return ctrl.end;
			
			}], ctrl.$calculateDiff);
		};
	}
})();
