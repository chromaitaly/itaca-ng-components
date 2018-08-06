(function() {
	'use strict';
	
	angular.module("itaca.company").component('chStatisticsChart', {
		bindings: {
			type: "@",
			values: "<",
			colors: "<?",
			onHover: "&?",
			onClick: "&?",
		},
		controller: StatisticsChartCtrl,
		template: "<ch-chart type=\"$ctrl.$$chart.type\" data=\"$ctrl.$$chart.data\" options=\"$ctrl.$$chart.options\"></ch-chart>"
	});

	/* @ngInject */
	function StatisticsChartCtrl($scope, StatisticsHelper) {
		var ctrl = this;
		
		this.$onInit = function(){
			ctrl.type = ctrl.type || "ANNUAL_RESERVATIONS_AMOUNT_TREND";
			ctrl.$$chart = {};
			
			ctrl.$createChart();
		};
		
		this.$onChanges = function(changesObj) {
			if (changesObj.type && !changesObj.type.isFirstChange()) {
				ctrl.$createChart();
			}
			
			if (changesObj.values && !changesObj.values.isFirstChange()) {
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
			ctrl.$$chart = StatisticsHelper.createChartData(ctrl.type, ctrl.values, ctrl.onHover, ctrl.onClick);
			ctrl.$updateColors();
		};
		
		this.$updateEvent = function(){
			if(!_.isNil(ctrl.$$chart) && !_.isNil(ctrl.$$chart.options)){
				ctrl.$$chart.options.onHover = angular.isFunction(ctrl.onHover) ? ctrl.onHover : null;
				ctrl.$$chart.options.onClick = angular.isFunction(ctrl.onClick) ? ctrl.onClick : null;
			}
			ctrl.$updateColors();
		};
		
		this.$updateColors = function(){
			////.....
		};
	}
})();