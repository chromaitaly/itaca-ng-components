(function() {
	'use strict';
	
	angular.module("itaca.components").component('chStatisticsChart', {
		bindings: {
			type: "@",
			datasets: "<",
			tooltips: "<?",
			colors: "<?",
			onHover: "&?",
			onClick: "&?",
		},
		controller: StatisticsChartCtrl,
		template: 
			"<ch-chart type=\"$ctrl.$$chart.type\" data=\"$ctrl.$$chart.data\" options=\"$ctrl.$$chart.options\"></ch-chart>" +
			"<div ng-if=\"$ctrl.$$loading || (!$ctrl.$$loading && !$ctrl.$$chart.data)\" class=\"overlay\" layout layout-align=\"center center\">" +
				"<div ng-if=\"$ctrl.$$loading && !$ctrl.ctrl.datasets.length\">" +
					"<md-progress-circular class=\"md-primary ch-progress\" md-mode=\"indeterminate\" md-diameter=\"32\"></md-progress-circular>" +
		  		"</div>" +
				"<div ng-if=\"!$ctrl.$$loading && !$ctrl.ctrl.datasets.length\">" +
					"<span translate=\"statistics.statistics.no.data\">" +
				"</div>" +
			"</div>"
	});

	/* @ngInject */
	function StatisticsChartCtrl($scope, StatisticsHelper) {
		var ctrl = this;
		
		this.$onInit = function(){
			ctrl.type = ctrl.type || "RESERVATIONS_AMOUNT_TREND";
			ctrl.$$chart = {};
			
			ctrl.$$loading = true;
			
			ctrl.$createChart();
		};
		
		this.$onChanges = function(changesObj) {
			if (changesObj.type && !changesObj.type.isFirstChange()) {
				ctrl.$createChart();
			}
			
			if (changesObj.datasets && !changesObj.datasets.isFirstChange()) {
				ctrl.$createChart();
			}
			
			if (changesObj.tooltips && !changesObj.tooltips.isFirstChange()) {
				ctrl.$createChart();
			}
			
			if (changesObj.onHover && !changesObj.onHover.isFirstChange()) {
				ctrl.$updateEvent();
			}
			
			if (changesObj.onClick && !changesObj.onClick.isFirstChange()) {
				ctrl.$updateEvent();
			}
			
			if (changesObj.colors && !changesObj.colors.isFirstChange()) {
				ctrl.$updateColors();
			}
		};
		
		this.$createChart = function(){
			if(_.isNil(ctrl.type) || _.isNil(ctrl.datasets)){
				return;
			}
			
			ctrl.$$chart = StatisticsHelper.createChartData(ctrl.type, ctrl.datasets, ctrl.tooltips, ctrl.onHover, ctrl.onClick);
			ctrl.$updateColors();
			ctrl.$$loading = false;
		};
		
		this.$updateEvent = function(){
			if(!_.isNil(ctrl.$$chart) && !_.isNil(ctrl.$$chart.options)){
				ctrl.$$chart.options.onHover = angular.isFunction(ctrl.onHover) ? ctrl.onHover : null;
				ctrl.$$chart.options.onClick = angular.isFunction(ctrl.onClick) ? ctrl.onClick : null;
			}
			ctrl.$updateColors();
		};
		
		this.$updateColors = function(){
			if(_.isNil(ctrl.colors) || (!_.isPlainObject(ctrl.colors) && !_.isArray(ctrl.colors))){
				return;
			}
			
			_.forEach(ctrl.$$chart.chartData.data.datasets, function(dataset){
				dataset.backgroundColor = ctrl.colors;
			});
		};
	}
})();