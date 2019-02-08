(function() {
	'use strict';
	
	angular.module("itaca.components").component('chStatisticsReport', {
		bindings: {
			dataset: "<",
			compareDataset: "<?",
			datasetType: "@",
			comparatorType: "<?",
			xtype: "@",
			ytype: "@",
			noData: "<?",
			hideChart: "<?"
		},
		controller: StatisticsReportCtrl,
		template: 
			"<div class=\"ch-statistics-report border-radius-8 md-whiteframe-1dp no-padding\">" +
				"<div layout-padding>" +
					"<div layout layout-align=\"start center\" class=\"no-padding\">" +
						"<h4 flex class=\"md-title no-margin\">{{::(($ctrl.datasetType + '.report') | translate)}}</h4>" +
						"<md-button class=\"md-icon-button\" ng-click=\"$ctrl.$showInfo(ev)\" aria-label=\"info\">" +
							"<md-icon class=\"mdi mdi-information-outline text-white\"></md-icon>" +
						"</md-button>" +
					"</div>" +
				"</div>" +
				
				"<div ng-if=\"!$ctrl.noData && !$ctrl.hideChart && $ctrl.$$chart\">" +
					"<ch-chart class=\"display-block flex\" type=\"$ctrl.$$chart.type\" data=\"$ctrl.$$chart.data\" options=\"$ctrl.$$chart.options\" linear-gradient=\"$ctrl.$$chart.gradient\"></ch-chart>" +
				"</div>" +
				
				"<md-content style=\"max-height:340px;\" class=\"bg-white no-border-left no-border-right only-border\">" +
					"<md-list class=\"no-padding\">" +
						"<md-subheader class=\"no-padding\">" +
							"<div layout layout-padding layout-align=\"start center\" class=\"no-padding\">" +
								"<div layout=\"column\" flex>" +
									"<strong translate-once=\"statistics.hotel.filter.date.period\"></strong>" +
									"<small class=\"text-small\" ng-if=\"$ctrl.xtype == 'MONTHS' || $ctrl.xtype == 'YEARS' || $ctrl.xtype == 'DAYS'\">" +
										"<strong>{{$ctrl.$$dataset[0].key |date:'MMMM yyyy'}}</strong>" +
										"<span> - </span>" +
										"<strong>{{$ctrl.$$dataset[$ctrl.$$dataset.length - 1].key |date:'MMMM yyyy'}}</strong>" +
									"</small>" +
								"</div>" +
								"<div layout=\"column\" flex=\"25\" class=\"text-small text-center\" ng-if=\"$ctrl.$$comparatorType\">" +
									"<strong translate-once=\"common.comparison\"></strong>" +
									"<strong>{{$ctrl.$$comparatorType}}</strong>" +
								"</div>" +
								"<div layout=\"column\" flex=\"25\" class=\"text-small text-center\" ng-if=\"$ctrl.$$comparatorType\">" +
									"<strong translate-once=\"statistics.statistics.trend.basic\"></strong>" +
								"</div>" +
							"</div>" +
							"<md-divider></md-divider>" +
						"</md-subheader>" +
						"<md-list-item ng-repeat=\"data in $ctrl.$$dataset\" class=\"no-padding\" ng-if=\"!$ctrl.noData\">" +
							"<div layout layout-align=\"center\" flex=\"100\">" +
								"<div flex class=\"md-padding\">" +
									"<span ng-if=\"$ctrl.xtype == 'MONTHS' || $ctrl.xtype == 'YEARS' || $ctrl.xtype == 'DAYS'\">{{data.key |date:$ctrl.$$format}}</span>" +
									"<span ng-if=\"!$ctrl.xtype\" translate-once=\"{{'channel.source.' + data.key.toLowerCase()}}\"></span>" +
								"</div>" +
								"<div layout=\"column\" flex=\"25\" class=\"md-padding border-left no-border-right no-border-y-sides only-border text-center\" ng-if=\"data.compare\">" +
									"<span>{{data.compare | chValue}}</span>" +
								"</div>" +
								"<div flex=\"25\" class=\"md-padding border-left no-border-right no-border-y-sides only-border text-center\">" +
									"<div>" +
										"<span>{{data.value | chValue}}</span>" +
									"</div>" +
									"<div ng-if=\"data.compare\">" +
										"<span ng-if=\"data.percentage != 0\" ng-class=\"data.percentage > 0 ? 'text-success' : 'text-danger'\">" +
											"<md-icon class=\"material-icon md-14\" ng-class=\"data.percentage > 0 ? 'mdi mdi-menu-up text-success' : 'mdi mdi-menu-down text-danger'\"></md-icon>" +
											"<small class=\"text-bold\">{{data.percentage}}%</small>" +
										"</span>" +
									"</div>" +
								"</div>" +
							"</div>" +
							"<md-divider ng-if=\"!$last\"></md-divider>" +
						"</md-list-item>" +
						"<md-list-item class=\"no-padding\" ng-if=\"$ctrl.noData\">" +
							"<div flex layout-align=\"center center\" layout=\"column\" layout-fill layout-padding>" +
								"<md-icon class=\"mdi mdi-alert-outline md-32\"></md-icon>" +
								"<span translate=\"statistics.statistics.no.report\">" +
							"</div>" +
						"</md-list-item>" +
					"</md-list>" +
				"</md-content>" +
				"<div layout layout-wrap layout-padding class=\"bg-gray-lighter no-padding-bottom\" ng-if=\"$ctrl.$$totalComparated && !$ctrl.noData && $ctrl.$$showTotal\">" +
					"<div flex>" +
						"<span><span translate-once=\"common.total\"></span> <span translate-once=\"common.comparisons\"></span>:</span>" +
					"</div>" +
					"<div flex=\"25\" class=\"text-center\">" +
						"<span>{{$ctrl.$$totalComparated | chValue}}</span>" +
					"</div>" +
				"</div>" +
				"<div layout layout-wrap layout-align=\"center center\" layout-padding class=\"bg-gray-lighter md-title\" ng-class=\"{'no-padding-y-sides': $ctrl.$$totalComparated}\" ng-if=\"$ctrl.$$showTotal && !$ctrl.noData\">" +
					"<div flex>" +
						"<span><span translate-once=\"common.total\"></span> <span ng-if=\"$ctrl.$$totalComparated\" translate-once=\"statistics.statistics.trend.basic\"></span>:</span>" +
					"</div>" +
					"<div flex=\"25\" class=\"text-center\">" +
						"<div>" +
							"<span ng-if=\"$ctrl.datasetType != 'statistics.reviews.avg'\">{{$ctrl.$$total | chValue}}</span>" +
							"<span ng-if=\"$ctrl.datasetType == 'statistics.reviews.avg'\">{{$ctrl.$$total.count.toFixed(1)}}</span>" +
						"</div>" +
						"<div ng-if=\"$ctrl.$$totalComparated\">" +
							"<span ng-if=\"$ctrl.$$totalPercentage != 0\" class=\"md-subhead\" ng-class=\"$ctrl.$$totalPercentage > 0 ? 'text-success' : 'text-danger'\">" +
								"<md-icon class=\"material-icon md-14\" ng-class=\"$ctrl.$$totalPercentage > 0 ? 'mdi mdi-menu-up text-success' : 'mdi mdi-menu-down text-danger'\"></md-icon>" +
								"<small class=\"text-bold\">{{$ctrl.$$totalPercentage}}%</small>" +
							"</span>" +
						"</div>" +
					"</div>" +
				"</div>" +
				"<div ng-if=\"!$ctrl.$$showTotal || $ctrl.noData\" layout layout-wrap layout-align=\"center center\" layout-padding class=\"bg-gray-lighter md-title\" style=\"height: 52px;\">&nbsp;</div>" +
			"</div>"
	});

	/* @ngInject */
	function StatisticsReportCtrl($scope, $translate, Dialog, AppOptions, NumberUtils) {
		var ctrl = this;
		
		this.$onInit = function(){
			
			ctrl.$$format = ctrl.xtype == 'YEARS' ? 'yyyy' : ctrl.xtype == 'MONTHS' ? 'MMMM yyyy' : 'mediumDate';
			
			ctrl.noData =  ctrl.noData && _.isBoolean(ctrl.noData) ? ctrl.noData : false;
			
			ctrl.hideChart = ctrl.hideChart && _.isBoolean(ctrl.hideChart) ? ctrl.hideChart : false;
			
			ctrl.$createReport();
		};
		
		this.$onChanges = function(changesObj) {
			if (changesObj.dataset && !changesObj.dataset.isFirstChange()) {
				ctrl.$createReport();
			}
			
			if (changesObj.compareDataset && !changesObj.compareDataset.isFirstChange()) {
				ctrl.$createReport();
			}
			
			if (changesObj.xtype && !changesObj.xtype.isFirstChange()) {
				ctrl.$$format = ctrl.xtype == 'YEARS' ? 'yyyy' : ctrl.xtype == 'MONTHS' ? 'MMMM yyyy' : 'mediumDate';
			}
			
			if (changesObj.comparatorType) {
				if(!ctrl.comparatorType){
					ctrl.$$comparatorType = false;
				} else {
					if(_.isFinite(ctrl.comparatorType)){
						ctrl.$$comparatorType = ctrl.comparatorType;
					} else if(ctrl.comparatorType && _.isBoolean(ctrl.comparatorType)) {
//						ctrl.$$comparatorType = ctrl.comparatorType;
					} else {
						ctrl.$$comparatorType = ctrl.comparatorType == 'PORTAL' ? AppOptions.about.uiName : $translate.instant('channel.source.' + ctrl.comparatorType.toLowerCase());
					}
				}
			}
			
			if (changesObj.noData && !changesObj.noData.isFirstChange()) {
				ctrl.$createReport();
			}
		}
		
		this.$createReport = function(){
			ctrl.$$dataset = [];
			var _total = 0;
			var _partialDivider = 0;
			var _totalDivider = 0;
			
			_.forEach(ctrl.dataset, function(value, key){
				
				_partialDivider += value > 0 ? 1 : 0;
				_totalDivider += 1;
				_total += value;
				
				var _key = ctrl.xtype == 'YEARS' || ctrl.xtype == 'MONTHS' || ctrl.xtype == 'DAYS'  ? key * 1000 : key;
				
				ctrl.$$dataset.push({'key': _key, 'value': {'unit': ctrl.ytype, 'count': NumberUtils.fixedDecimals(value)}});
			});
			
			ctrl.$$total = {
				'unit': ctrl.ytype, 
				'count': NumberUtils.fixedDecimals(_total),
			}
			
			if(ctrl.datasetType == 'statistics.reservation.avg.rate'){
				ctrl.$$total.count = NumberUtils.fixedDecimals(_total / (_partialDivider > 0 ? _partialDivider : 1));
				
			} else if(ctrl.datasetType == 'statistics.reservation.occupation.rate'){
				ctrl.$$total.count = NumberUtils.fixedDecimals(_total / (_totalDivider > 0 ? _totalDivider : 1));
				
			} else if(ctrl.datasetType == 'statistics.reviews.total.count'){
				ctrl.$$total.count = ctrl.$$dataset[ctrl.$$dataset.length -1].value.count;
			}
			
			//mostro il totale solo se è un totale
			ctrl.$$showTotal = !_.includes(['statistics.reviews.avg.daily', 'statistics.reviews.avg.monthly', 'statistics.reviews.avg.yearly', 'statistics.reviews.total.count', 'statistics.reviews.avg'], ctrl.datasetType);
			
			ctrl.$$totalComparated = null;
			ctrl.$$totalPercentage = null;
			
			//comparazione
			if(!_.isNil(ctrl.compareDataset) && !_.isEmpty(ctrl.compareDataset)){
				
				_total = 0;
				_partialDivider = 0;
				_totalDivider = 0;

				var _i = 0;
				_.forEach(ctrl.compareDataset, function(value, idx){
					
					_partialDivider += value > 0 ? 1 : 0;
					_totalDivider += 1;
					_total += value;
					
					var obj = ctrl.$$dataset[_i];
					
					if(obj){
						obj.compare = {'unit': ctrl.ytype, 'count': NumberUtils.fixedDecimals(value)};
						obj.percentage = obj.compare.count != 0 ? (((obj.value.count - obj.compare.count) / obj.compare.count) * 100) : (obj.value.count - obj.compare.count) == 0 ? 0 : 100;
						obj.percentage = obj.percentage > 0 || obj.percentage < 0 ? NumberUtils.fixedDecimals(obj.percentage) : 0;
					}
					
					_i++;
					
				});
				
				ctrl.$$totalComparated = {
					'unit': ctrl.ytype, 
					'count': NumberUtils.fixedDecimals(_total),
				}
				
				if(ctrl.datasetType == 'statistics.reservation.avg.rate'){
					ctrl.$$total.count = NumberUtils.fixedDecimals(_total / (_partialDivider > 0 ? _partialDivider : 1));
					
				} else if(ctrl.datasetType == 'statistics.reservation.occupation.rate'){
					ctrl.$$total.count = NumberUtils.fixedDecimals(_total / (_totalDivider > 0 ? _totalDivider : 1));
					
				} else if(ctrl.datasetType == 'statistics.reviews.total.count'){
					ctrl.$$totalComparated.count = ctrl.$$dataset[ctrl.$$dataset.length -1].compare.count;
				}
				
				ctrl.$$totalPercentage = ctrl.$$totalComparated.count != 0 ? NumberUtils.fixedDecimals(((ctrl.$$total.count - ctrl.$$totalComparated.count) / ctrl.$$totalComparated.count) * 100) : (ctrl.$$total.count - ctrl.$$totalComparated.count) == 0 ? 0 : 100;
			}
			
			ctrl.$initChart();
			
		};
		
		this.$initChart = function(){
			
			var _data = [], _comparated = [], _labels = [];
			
			_.forEach(ctrl.dataset, function(v){
				_data.push(v);
				_labels.push('');
			});
			
			if(!_.isNil(ctrl.compareDataset) && !_.isEmpty(ctrl.compareDataset)){
				_comparated = _.values(ctrl.compareDataset);
			}
			
			ctrl.$$chart = {
				type: 'line',
				data: {
					labels: _labels,
					datasets: [
						{
							data: _data,
							fill: true,
							borderColor: "#FFFF",
				            pointBorderColor: "#FFFF",
				            pointBackgroundColor: "#FFFF",
				            pointHoverBackgroundColor: "#FFFF",
				            pointHoverBorderColor: "#FFFF",
						}
					]
				},
				options: {
					responsive: true,
					maintainAspectRatio: false,
					legend: {
						display: false,
					},
					animation: {
					  easing: "easeInOutBack"
					},
					scales: {
						xAxes: [{
							gridLines: {
								display: false,
								drawBorder: false,
							},
							ticks: {
				                display: false,
				                beginAtZero: true,
				            },
						}],
						yAxes: [{
							gridLines: {
								display: false,
								drawBorder: false,
							},
							ticks: {
				                display: false
				            },
						}]
					},
					tooltips: {
						enabled: false,
					},
					layout: {
						padding: {
							top: 10,
							right: 0,
							bottom: 0,
							left: 0
						}
					},
					elements: { 
						point: { 
					        radius: 2,
					        hitRadius: 10, 
					        hoverRadius: 5,
						} 
					} 
				},
				gradient: [
					{0: "rgba(255, 255, 255, 0.4)", 1: "rgba(255, 255, 255, 0)"},
					{0: "rgba(25, 118, 210, 0.8)", 1: "rgba(25, 118, 210, 0.00)"}
				]
			};
			
			if(!_.isEmpty(_comparated)){
				ctrl.$$chart.data.datasets.unshift({
					data: _comparated,
					fill: true	 ,
					borderColor: "rgba(255, 255, 255, 0.8)",
		            pointBorderColor: "rgba(255, 255, 255, 0.8)",
		            pointBackgroundColor: "rgba(255, 255, 255, 0.8)",
		            pointHoverBackgroundColor: "rgba(255, 255, 255, 0.8)",
		            pointHoverBorderColor: "rgba(255, 255, 255, 0.8)",
				});
			}
			
		};
		
		this.$showInfo = function(ev){
			$translate([ctrl.datasetType + '.report', ctrl.datasetType +'.description']).then(function(translate){
				Dialog.showAlert(ev, translate[ctrl.datasetType + '.report'], translate[ctrl.datasetType +'.description']);
			});
		};
	}
})();