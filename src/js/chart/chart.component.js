(function() {
	'use strict';
	
	angular.module("itaca.components").component('chChart', {
		bindings: {
			type: "<",
			values: "<"
		},
		controller: ChartCtrl,
		template: 
			"<canvas id=\"{{ctrl.$$chart.chartType}}\" " +
				"class=\"{{'chart chart-' + ctrl.$$chart.chartType}}\" " +
				"chart-data=\"$ctrl.$$chart.data\" " +
				"chart-labels=\"$ctrl.$$chart.labels\" " +
				"chart-series=\"$ctrl.$$chart.series\" " +
				"chart-options=\"$ctrl.$$chart.options\" " +
				"chart-dataset-override=\"datasetOverride\" " +
				"chart-click=\"onClick\" " +
				">" +
			"</canvas>"
	});

	/* @ngInject */
	function ChartCtrl($scope, $element, $attrs, DateUtils, $interval) {
		var ctrl = this;
		
		
		this.$$chartTypes = ["line", "bar", "horizontal-bar", "radar", "pie", "polar-area", "doughnut", "bubble"];
		
		this.$$types = ["ANNUAL_RESERVATION_AMOUNT_TREND", "ANNUAL_RESERVATION_COUNT_TREND"];
		
		this.$onInit = function() {
			ctrl.$$chart = {};
			ctrl.$mangageType();
		};
		
		this.$onChanges = function(changesObj) {
			if (changesObj.type) {
				ctrl.$mangageType();
			}
		};
		
		this.$mangageType = function() {
			ctrl.type = _.includes(ctrl.$$types, ctrl.type) ? ctrl.type : "ANNUAL_RESERVATION_AMOUNT_TREND";
			ctrl.$generateChart();
		};
		
		this.$generateChart = function() {
			var _chart = {
				labels	: !_.isEmpty(ctrl.values) ? _.keys(ctrl.values)   : {},
				data 	: !_.isEmpty(ctrl.values) ? _.values(ctrl.values) : {},
			};
			
			_.forEach(ctrl.$$types, function(type) {

				switch(type) {
					case "ANNUAL_RESERVATION_AMOUNT_TREND":
						
						_chart.series = {};
						
						_chart.options = {
							scales: {
					            yAxes: [{
									display: true, // TODO gestire
									scaleLabel: {
										display: true,
										labelString: ""
									},
									ticks: {
										callback: function(value, index, values) {
					                        return '$' + value;
					                    }
									}
					            }]
							}
						};
						break;
						
					case "ANNUAL_RESERVATION_COUNT_TREND":
						
						_chart.chartType = ctrl.$$chartTypes[0] //lines
						_chart.series = {};
						_chart.options = {
							scales: {
					            yAxes: [{
									display: true, // TODO gestire
									scaleLabel: {
										display: true,
										labelString: ""
									},
									ticks: {
										callback: function(value, index, values) {
					                        return '$' + value;
					                    }
									}
					            }]
							}
						};
						break;
				}
				
			});
			
			_.assign(ctrl.$$chart, _chart);
		};
	}
})();