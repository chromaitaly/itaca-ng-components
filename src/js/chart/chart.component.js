(function() {
	'use strict';
	
	angular.module("itaca.company").component('chChart', {
		bindings: {
			type: "<",
			data: "<",
			options: "<?"
		},
		controller: ChartCtrl,
		template: "<div class=\"chart-container relative\"><canvas class=\"chartjs\"></canvas></div>"
	});

	/* @ngInject */
	function ChartCtrl($scope, $element) {
		var ctrl = this;
		
		this.$onInit = function(){
			ctrl.type = _.includes(["line", "bar", "horizontal-bar", "radar", "pie", "polar-area", "doughnut", "bubble"], ctrl.type) ? ctrl.type : "line";
			ctrl.data = ctrl.data || {};
			ctrl.ctx = $element.find('canvas')[0].getContext('2d');
			ctrl.$createChart();
		};
		
		this.$onChanges = function(changesObj) {
			if (changesObj.type && !changesObj.type.isFirstChange()) {
				ctrl.$createChart();
			}
			
			if (changesObj.data && !changesObj.data.isFirstChange()) {
				ctrl.$createChart();
			}
			
			if (changesObj.options && !changesObj.options.isFirstChange()) {
				ctrl.$createChart();
			}
		};
		
		this.$createChart = function(){
			if(!ctrl.ctx){
				return;
			}
			
			ctrl.$$chart = new Chart(ctrl.ctx, {
				type: ctrl.type,
				data: ctrl.data,
				options: ctrl.options,
				
			});
		};
	}
})();