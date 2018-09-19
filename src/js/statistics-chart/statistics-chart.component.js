(function() {
	'use strict';
	
	angular.module("itaca.components").component('chStatisticsChart', {
		bindings: {
			type: "@",
			datasets: "<",
			tooltips: "<?",
			extra: "<?",
			colors: "<?",
			onHover: "&?",
			onClick: "&?",
		},
		controller: StatisticsChartCtrl,
		template: 
			"<div layout=\"column\" flex=\"100\">" +
				"<ch-chart class=\"display-block flex\" ng-class=\"{'auto-height': $ctrl.extra.noData}\" type=\"$ctrl.$$chart.type\" data=\"$ctrl.$$chart.data\" options=\"$ctrl.$$chart.options\"></ch-chart>" +
				"<div ng-if=\"$ctrl.$$loading || (!$ctrl.$$loading && $ctrl.extra.noData)\" class=\"overlay text-center\" layout layout-align=\"center center\">" +
					"<div ng-if=\"$ctrl.$$loading && !$ctrl.ctrl.datasets.length\">" +
						"<md-progress-circular class=\"md-primary ch-progress\" md-mode=\"indeterminate\" md-diameter=\"32\"></md-progress-circular>" +
			  		"</div>" +
					"<div ng-if=\"!$ctrl.$$loading && $ctrl.extra.noData\">" +
						"<span translate=\"statistics.statistics.no.data\">" +
					"</div>" +
				"</div>" +
			"</div>" +
			"<div layout=\"column\" flex=\"100\" ng-if=\"$ctrl.$$chart.type == 'doughnut' || $ctrl.$$chart.type == 'pie'\">" +
				"<ch-statistics-chart-legend datasets=\"$ctrl.datasets\" colors=\"$ctrl.colors\"></ch-statistics-chart-legend>" +
			"</div>"
	});

	/* @ngInject */
	function StatisticsChartCtrl($scope, StatisticsHelper, ColorsUtils) {
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
			
			if (changesObj.extra && !changesObj.extra.isFirstChange()) {
				ctrl.$createChart();
			}
			
			if (changesObj.onHover && !changesObj.onHover.isFirstChange()) {
				ctrl.$updateEvent();
			}
			
			if (changesObj.onClick && !changesObj.onClick.isFirstChange()) {
				ctrl.$updateEvent();
			}
			
			if (changesObj.colors) {
				ctrl.$updateColors();
			}
		};
		
		this.$createChart = function(){
			if(_.isNil(ctrl.type) || _.isNil(ctrl.datasets)){
				return;
			}
			
			ctrl.$$chart = StatisticsHelper.createChartData(ctrl.type, ctrl.datasets, ctrl.tooltips, ctrl.extra, ctrl.onHover, ctrl.onClick);
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
			if(_.isNil(ctrl.colors) || _.isEmpty(ctrl.colors)){
				return;
			}
			
			if(_.isNil(ctrl.datasets) || _.isEmpty(ctrl.datasets)){
				return;
			}
			
			var backgroundColor = [];
			var borderColor = [];
			
			
			_.forEach(ctrl.datasets[0], function(value, key){
				backgroundColor.push(ctrl.colors[key] || "#3f51b5");
				borderColor.push(ctrl.colors[key] || "#3f51b5");
			});
			
			_.forEach(ctrl.$$chart.data.datasets, function(dts){
				// Applico il background
				dts.backgroundColor = backgroundColor;
				// Applico i bordi solo se non è un grafico a torta o a ciambella
				dts.borderColor = (ctrl.$$chart.type != 'doughnut' && ctrl.$$chart.type != 'pie') ? borderColor : '#FFF';
			});
			
			// fix per aggiornare il chart se cambiano i colori
			ctrl.$$chart.data.$$updateChart = true;
		};
	}
})();