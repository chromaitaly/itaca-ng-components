(function() {
	"use strict";
	
	angular.module("itaca.components").component("chStatisticsChart", {
		transclude: true,
		bindings: {
			type: "@",
			datasets: "<",
			compareDatasets: "<?",
			comparatorType: "<?",
			tooltips: "<?",
			extra: "<?",
			colors: "<?",
			onHover: "&?",
			onClick: "&?",
			onDatasetChange: "&?"
		},
		controller: StatisticsChartCtrl,
		template: 
			"<div layout=\"column\" flex=\"100\">" +
				"<div layout layout-wrap layout-align=\"end center\">" +
					"<div ng-if=\"$ctrl.$$currentDataset && $ctrl.datasets.length > 1\" flex flex-xs=\"100\" flex-sm=\"100\" layout-xs layout-sm layout-align-xs=\"center-center\" layout-align-sm=\"center-center\">" +
						"<strong flex-xs flex-sm class=\"text-capitalize\"><span translate-once=\"statistics.statistics.show.chart\"></span>:</strong>" +
						"<md-menu>" +
							"<md-button aria-label=\"change chart\" ng-click=\"$ctrl.$$openMenu($mdMenu, $event)\" class=\"md-square-button bg-success\">" +
								"<span translate=\"{{$ctrl.$$currentDataset.title + '.of'}}\" class=\"row-1 text-wrap\" ></span>" +
								"<md-icon class=\"mdi mdi-menu-down text-white\"></md-icon>" +
					    	"</md-button>" +
						    "<md-menu-content width=\"4\">" +
						    	"<md-menu-item ng-repeat=\"dataset in $ctrl.datasets\">" +
						    		"<md-button ng-click=\"$ctrl.$changeDataset(dataset, $index)\" aria-label=\"{{::(dataset.title | translate)}}\">" +
						    			"<span translate-once=\"{{dataset.title+ '.of'}}\"></span>" +
						    		"</md-button>" +
						    	"</md-menu-item>" +
						    "</md-menu-content>" +
					    "</md-menu>" +
				     "</div>" +
				     "<div layout=\"column\" flex-xs=\"100\" flex-sm=\"100\" ng-transclude></div>" +
				"</div>" + 
			"</div>" +
			"<div layout=\"column\" flex=\"100\">" +
				"<ch-chart ng-if=\"$ctrl.$$chart\" class=\"display-block flex\" ng-class=\"{'chart-pie-max-width': $ctrl.type == 'RESERVATIONS_SOURCE_TREND'}\" " +
					"type=\"$ctrl.$$chart.type\" data=\"$ctrl.$$chart.data\" options=\"$ctrl.$$chart.options\"></ch-chart>" +
				"<div ng-if=\"$ctrl.$$loading || (!$ctrl.$$loading && $ctrl.extra.noData)\" class=\"overlay text-center\" layout layout-align=\"center center\">" +
					"<div ng-if=\"$ctrl.$$loading && !$ctrl.ctrl.datasets.length\">" +
						"<md-progress-circular class=\"md-primary ch-progress\" md-mode=\"indeterminate\" md-diameter=\"32\"></md-progress-circular>" +
			  		"</div>" +
					"<div ng-if=\"!$ctrl.$$loading && $ctrl.extra.noData\" layout=\"column\" layout-padding>" +
						"<md-icon class=\"mdi mdi-alert-outline md-32\"></md-icon>" +
						"<span translate=\"statistics.statistics.no.data\">" +
					"</div>" +
				"</div>" +
			"</div>" +
			"<div layout=\"column\" flex=\"100\" ng-if=\"$ctrl.$$chart.type == 'doughnut' || $ctrl.$$chart.type == 'pie'\">" +
				"<ch-statistics-chart-legend datasets=\"$ctrl.$$datasets\" colors=\"$ctrl.colors\"></ch-statistics-chart-legend>" +
			"</div>"
	});

	/* @ngInject */
	function StatisticsChartCtrl($scope, $mdMenu, StatisticsHelper, ColorsUtils) {
		var ctrl = this;
		
		this.$onInit = function(){
			ctrl.type = ctrl.type || "RESERVATIONS_AMOUNT_TREND";
			ctrl.$$chart = {};
			
			ctrl.$$loading = true;
			
			if(!_.isEmpty(ctrl.datasets)){
				ctrl.$$currentDataset = ctrl.datasets[0];
				ctrl.$$datasetIndex = 0;
				ctrl.$createChart();
			}
		};
		
		this.$onChanges = function(changesObj) {
			if (changesObj.type && !changesObj.type.isFirstChange()) {
				ctrl.$createChart();
			}
			
			if (changesObj.datasets && !changesObj.datasets.isFirstChange()) {
				if(!_.isEmpty(ctrl.datasets)){
					ctrl.$$currentDataset =  ctrl.datasets[ctrl.$$datasetIndex || 0];
				}
				
				ctrl.$createChart();
			}
			
			if (changesObj.compareDatasets && !changesObj.compareDatasets.isFirstChange()) {
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
			if(_.isNil(ctrl.type) || _.isNil(ctrl.datasets) || _.isEmpty(ctrl.datasets)){
				ctrl.$$loading = false;
				return;
			}
			
			if(_.isNil(ctrl.$$currentDataset)){
				ctrl.$$currentDataset = ctrl.datasets[0];
				ctrl.$$datasetIndex = 0;
			}
			
			ctrl.$$datasets = [];
			ctrl.$$datasets.push(ctrl.$$currentDataset.entries);
			
			if(!_.isEmpty(ctrl.compareDatasets)){
				var _data = _.find(ctrl.compareDatasets, function(v, i){
					return v.title === ctrl.$$currentDataset.title;
				});
				if(_data){
					ctrl.$$datasets.push(_data.entries);
				}
			}	
			
			ctrl.extra.tooltipTitle = ctrl.$$currentDataset.title;
			ctrl.extra.xType = ctrl.$$currentDataset.xType;
			ctrl.extra.yType = ctrl.$$currentDataset.yType;
			ctrl.extra.comparationTitle = ctrl.comparatorType;
			
			
			ctrl.$$chart = StatisticsHelper.createChartData(ctrl.type, ctrl.$$datasets, ctrl.tooltips, ctrl.extra, ctrl.onHover, ctrl.onClick);
			ctrl.$updateColors();
			ctrl.$$loading = false;
		};
		
		this.$$openMenu = function($mdMenu, ev) {
	      $mdMenu.open(ev);
	    };
	    
	    this.$changeDataset = function(dataset, idx){
	    	ctrl.$$currentDataset = angular.copy(dataset);
	    	ctrl.$$datasetIndex = idx;
	    	ctrl.$createChart();
	    	
	    	ctrl.onDatasetChange && ctrl.onDatasetChange({$title: dataset.title});
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
			
			if(_.isNil(ctrl.$$datasets) || _.isEmpty(ctrl.$$datasets)){
				return;
			}
			
			var backgroundColor = [];
			var borderColor = [];
			
			
			_.forEach(ctrl.$$datasets[0], function(value, key){
				backgroundColor.push(ctrl.colors[key] || "#3f51b5");
				borderColor.push(ctrl.colors[key] || "#3f51b5");
			});
			
			_.forEach(ctrl.$$chart.data.datasets, function(dts){
				// Applico il background
				dts.backgroundColor = backgroundColor;
				// Applico i bordi solo se non è un grafico a torta o a ciambella
				dts.borderColor = (ctrl.$$chart.type != "doughnut" && ctrl.$$chart.type != "pie") ? borderColor : "#FFF";
			});
			
			//TODO applicare colori diversi se ci sono più dataset
			
			// fix per aggiornare il chart se cambiano i colori
			ctrl.$$chart.data.$$updateChart = true;
		};
	}
})();