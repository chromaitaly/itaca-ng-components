(function() {
    'use strict';
    
    angular.module("itaca.components").factory('StatisticsHelper', StatisticsHelper);
    
    /* @ngInject */
    function StatisticsHelper($translate, $mdMedia, AppOptions, ColorsUtils, chValueFilter, NumberUtils) {			
    	var $$service = {};
    	
    	$$service.createChartData = function(type, datasets, tooltips, extra, onHoverEv, onClickEv){
    		
    		extra = extra || {};
    		
    		if(extra.xType){
    			extra.format = extra.xType == 'DAYS' ? {small: 'DD/MM/YY', big: 'DD MMM YYYY', tooltips: 'DD MMMM YYYY'} :  extra.xType == 'MONTHS' ? {small: 'MMM', big: 'MMMM', tooltips: 'MMMM YYYY'} : {small: 'YYYY', big: 'YYYY', tooltips: 'YYYY'};
			} else {
				extra.format = {small: 'DD/MM/YY', big: 'DD MMM YYYY', tooltips: 'DD MMMM YYYY'};
			}
    		
    		var chartData = $$service.$createDefaultChartData(datasets, tooltips, extra, onHoverEv, onClickEv);
    		
    		switch(type) {
    		case "RESERVATIONS_AMOUNT_TREND":
    			chartData.type = 'bar';
    			
    			// 1 dataset primary 
    			chartData.data.datasets[0].backgroundColor = ColorsUtils.hex2rgba("#42a5f5", 80);
    			chartData.data.datasets[0].borderColor = ColorsUtils.hex2rgba("#42a5f5");
    			chartData.data.datasets[0].fill = true;
    			chartData.data.datasets[0].label = $translate.instant('reservations.reservations'); 
    			
    			// 2 dataset primary light 
    			if(chartData.data.datasets[1]){
    				chartData.data.datasets[0].label = $translate.instant('statistics.statistics.trend.basic'); 
	    			chartData.data.datasets[1].backgroundColor = ColorsUtils.hex2rgba("#1976d2", 80);
	    			chartData.data.datasets[1].borderColor = ColorsUtils.hex2rgba("#1976d2");
	    			chartData.data.datasets[1].fill = true;
	    			chartData.data.datasets[1].label = $translate.instant('common.comparison'); 
    			}
    			
    			
    			// Y
    			chartData.options.scales.yAxes[0].ticks.callback = function(value, index, values) {
                    return NumberUtils.formatter(value, 2);
				};
				chartData.options.scales.yAxes[0].scaleLabel = {
					display: true,
		        	labelString: extra.yType == 'CURRENCY' ? 'Euro €' : extra.yType == 'PERCENTAGE' ? $translate.instant('common.percentage') + ' %' : '',
				};
    			
    			// X
    			chartData.options.scales.xAxes[0].ticks.callback = function(value, index, values) {
    				if(value){
    					return moment.unix(value).format((extra.isSmall || !$mdMedia('gt-sm')) ? extra.format.small : extra.format.big );
    				}
				};
				chartData.options.scales.xAxes[0].scaleLabel = {
						display: true,
			        	labelString: '', //TODO mettere un range di anni (o di mesi nel caso di vista giornaliera)
					};
				
    			
				chartData.options.tooltips.callbacks.label = function(tooltipItem, data) {
					return $translate.instant('reservations.reservations'); 
				};
				
    			chartData.options.legend.display = false;
    			
    			// Tooltips in caso di più di un dataset
    			if(chartData.data.datasets.length > 1){
					chartData.options.tooltips = {
							backgroundColor: '#FFF',
	    					borderColor: 'rgba(0,0,0, .7)',
	    					titleFontColor: '#000',
	    					bodyFontColor: '#000',
	    					footerFontColor: '#000',
	    					mode: 'index',
	    		            intersect: false,
	    					callbacks: {
	    						label: function(tooltipItem, data) {
	    							var label = '';
	    							
	    							if(extra.tooltipTitle){
	    								label = $translate.instant(extra.tooltipTitle);
	    							}
	    							
	    							if(tooltipItem.datasetIndex > 0 && extra.comparationTitle){
	    								if(_.isFinite(extra.comparationTitle)){
	    									label = label + ' (' + extra.comparationTitle + ') ';
	    								} else {
	    									label = label + ' (' + (extra.comparationTitle == 'PORTAL' ? AppOptions.about.uiName : $translate.instant('channel.source.' + extra.comparationTitle.toLowerCase())) + ') ';
	    								}
	    							}
	    							
	    							label = label + ': ' + chValueFilter({count: tooltipItem.yLabel, unit: extra.yType });
	    							return label;
	    						}
	    					}
					};
					chartData.options.legend.display = true;
				}
    			
    			
    			break;
    			
    		case "RESERVATIONS_SOURCE_TREND":
    			chartData.type = 'doughnut';
    			
    			_.forEach(chartData.data.datasets, function(ds){
    				ds.backgroundColor = ColorsUtils.hex2rgba("#92278f");
    				ds.borderColor = "#FFF";
    				ds.borderWidth = 4;
    				ds.hoverBorderWidth = 0;
    				ds.hoverBorderColor = "#FFF";
    			});
    			
    			var tp = chartData.options.tooltips;
    			tp.callbacks = {
					title: function(tp, data) {
						return data.labels[tp[0].index] == 'PORTAL' ? AppOptions.about.name : $translate.instant('channel.source.' + data.labels[tp[0].index].toLowerCase());
					},
					label: function(tooltipItem, data) {
						return ' '; //label vuota ma con il quadratino colorato
					},
					footer: function(tp, data) {
						var label = [];
						
						var tooltip = _.find(tooltips[0], function(value, key){
							return key == data.labels[tp[0].index];
						});

						if(tooltip){
							_.forEach(tooltip, function(obj, key){
								label.push($translate.instant(obj.key) + ": " + chValueFilter(obj.value));
							});
						}

						return label;
					},
    			};
    			
    			chartData.options = {
					layout: {
			            padding: {
			            	left: 10,
			                right: 10,
			                top: 10,
			                bottom: 10
			            }
					},
					animationSteps : 100,
					animationEasing : "easeOutBounce",
    				responsive: true,
    				legend: false,
    				tooltips: tp,
    				animation: {
    					animateScale: true,
    					animateRotate: true
    				},
    				cutoutPercentage: 60,
    				scales: {
    					xAxes: [
    						{
    	    					display: false,
    							scaleLabel: {
    								display: true,
    							},
    						}
    					]
    				}
    			};
    			
    			break;
    			
    		case "REVIEWS_COUNT_TREND":
    			chartData.type = 'line';
    			
    			//mostro la linea di divisione
    			if(extra && (extra.benchmarkValue || extra.currentValue) && (extra.tooltipTitle == "statistics.reviews.avg" ||  extra.tooltipTitle == "statistics.reviews.avg.monthly" || extra.tooltipTitle == "statistics.reviews.avg.daily" || extra.tooltipTitle == "statistics.reviews.avg.yearly")){
    				chartData.options.horizontalLine = chartData.options.horizontalLine || [];
    				
    				if(extra.benchmarkValue){
	    				chartData.options.horizontalLine.push({
					      "y": extra.benchmarkValue,
					      "style": "#444",
					      "text": $translate.instant("statistics.statistic.benchmark"),
					      "textPosition" : 5,
					    });
    				}
    				
    				if(extra.currentValue){
    					chartData.options.horizontalLine.push({
					      "y": extra.currentValue,
					      "style": "#444",
					      "text": extra.currentValue + ' ' + $translate.instant("statistics.reviews.score.current"),
					      "textPosition" : 5,
					    });
    					
    					// posiziono il testo distanziandolo in caso di vicinanza di 1 punto base
    					// applico la distanza all' elemento che si trova più in alto
    					if((extra.currentValue - extra.benchmarkValue) < 1 || (extra.currentValue - extra.benchmarkValue) > -1){
    						chartData.options.horizontalLine[extra.currentValue > extra.benchmarkValue ? 1 : 0].textPosition = -20;
    						chartData.options.horizontalLine[0].style = "#888";
        				}
    				}
    			}
    			
    			// 1 dataset primary 
    			chartData.data.datasets[0].backgroundColor = ColorsUtils.hex2rgba("#42a5f5", 50);
    			chartData.data.datasets[0].borderColor = ColorsUtils.hex2rgba("#42a5f5");
    			chartData.data.datasets[0].fill = true;
    			chartData.data.datasets[0].pointRadius = 2;
    			chartData.data.datasets[0].pointHoverRadius = 4;
    			chartData.data.datasets[0].lineTension = 0;
    			
    			// 2 dataset primary light 
    			if(chartData.data.datasets[1]){
    				chartData.data.datasets[0].label = $translate.instant('statistics.statistics.trend.basic'); 
	    			chartData.data.datasets[1].backgroundColor = ColorsUtils.hex2rgba("#1976d2", 80);
	    			chartData.data.datasets[1].borderColor = ColorsUtils.hex2rgba("#1976d2");
	    			chartData.data.datasets[1].fill = true;
	    			chartData.data.datasets[0].pointRadius = 2;
	    			chartData.data.datasets[0].pointHoverRadius = 4;
	    			chartData.data.datasets[0].lineTension = 0;
    			}
    		
    			chartData.options.scales.xAxes[0].ticks.callback = function(value, index, values) {
    				if(value){
    					return moment.unix(value).format((extra.isSmall || !$mdMedia('gt-sm')) ? extra.format.small : extra.format.big );
    				}
 				};

 				chartData.options.legend.display = false;
 				
 				if(extra.isSmall || _.includes(['statistics.reviews.avg','statistics.reviews.avg.daily','statistics.reviews.avg.monthly','statistics.reviews.avg.yearly'], extra.tooltipTitle)){
	 				chartData.options.scales.yAxes[0].ticks.min = 4;
	 				chartData.options.scales.yAxes[0].ticks.max = 12;
 				}
 				
 				chartData.options.tooltips.callbacks.label = function(tooltipItem, data) {
					return $translate.instant('reviews.reviews');
				};
				
				if(_.includes(['statistics.reviews.avg','statistics.reviews.avg.daily','statistics.reviews.avg.monthly','statistics.reviews.avg.yearly'], extra.tooltipTitle)){
					chartData.options.scales.yAxes[0].scaleLabel = {
						display: true,
			        	labelString: $translate.instant('common.opinion'),
					};
				}
				
				if(chartData.data.datasets[1]){
					chartData.data.datasets[0].label = $translate.instant('statistics.statistics.trend.basic'); 
					chartData.data.datasets[1].label = $translate.instant('common.comparison'); 
				}
				
				chartData.gradient = [
					{0: "rgba(33, 150, 243, 0.3)", 1: "rgba(133, 150, 243, 0.00)"},
					{0: "rgba(25, 118, 210, 0.3)", 1: "rgba(25, 118, 210, 0.00)"}
				];
				
				// Tooltips in caso di più di un dataset
    			if(chartData.data.datasets.length > 1){
					chartData.options.tooltips = {
	    					backgroundColor: '#FFF',
	    					borderColor: 'rgba(0,0,0, .7)',
	    					titleFontColor: '#000',
	    					bodyFontColor: '#000',
	    					footerFontColor: '#000',
	    					mode: 'index',
	    		            intersect: false,
	    					callbacks: {
	    						label: function(tooltipItem, data) {
	    							var label = '';
	    							
	    							if(extra.tooltipTitle){
	    								label = $translate.instant(extra.tooltipTitle);
	    							}
	    							
	    							if(tooltipItem.datasetIndex > 0 && extra.comparationTitle){
	    								if(_.isFinite(extra.comparationTitle)){
	    									label = label + ' (' + extra.comparationTitle + ') ';
	    								}
	    							}
	    							
	    							label = label + ': ' + chValueFilter({count: tooltipItem.yLabel, unit: extra.yType });
	    							return label;
	    						}
	    					}
					};
					chartData.options.legend.display = true;
				}
 				
    			break;
    			
    		case "TRANSFERS_TREND":
    			chartData.type = 'bar';
    			
 				// Y
    			chartData.options.scales.yAxes[0].ticks.callback = function(value, index, values) {
                    return NumberUtils.formatter(value, 2);
				};
				chartData.options.scales.yAxes[0].scaleLabel = {
					display: true,
		        	labelString: extra.yType == 'CURRENCY' ? 'Euro €' : extra.yType == 'PERCENTAGE' ? $translate.instant('common.percentage') + ' %' : '',
				};
    			
    			// X
    			chartData.options.scales.xAxes[0].ticks.callback = function(value, index, values) {
    				if(value){
    					return moment.unix(value).format((extra.isSmall || !$mdMedia('gt-sm')) ? extra.format.small : extra.format.big );
    				}
				};

 				chartData.options.legend.display = false;
 				
 				chartData.options.tooltips.callbacks.label = function(tooltipItem, data) {
					return $translate.instant('service.transfer');
				};
				
				
				// 1 dataset primary 
    			chartData.data.datasets[0].backgroundColor = ColorsUtils.hex2rgba("#42a5f5", 80);
    			chartData.data.datasets[0].borderColor = ColorsUtils.hex2rgba("#42a5f5");
    			chartData.data.datasets[0].fill = true;
    			chartData.data.datasets[0].label = $translate.instant('reservations.reservations'); 
    			
    			// 2 dataset primary light 
    			if(chartData.data.datasets[1]){
    				chartData.data.datasets[0].label = $translate.instant('statistics.statistics.trend.basic'); 
	    			chartData.data.datasets[1].backgroundColor = ColorsUtils.hex2rgba("#1976d2", 80);
	    			chartData.data.datasets[1].borderColor = ColorsUtils.hex2rgba("#1976d2");
	    			chartData.data.datasets[1].fill = true;
	    			chartData.data.datasets[1].label = $translate.instant('common.comparison'); 
    			}
				
    			
    			break;
    		} 
    		
    		return chartData;
    	};
    	
    	$$service.$createDefaultChartData = function(datasets, tooltips, extra, onHoverEv, onClickEv) {
    		
			var max = _.isArray(datasets) ? _.max(datasets[0]) : null;
			if(max){
				max = max + 10;
			}
    		
    		var chartData = {
				data: {
					labels: [],
					datasets: []
				}, 
				options:{
					responsive: true,
                    maintainAspectRatio: false,
					onHover: angular.isFunction(onHoverEv) ? onHoverEv : null,
					onClick: angular.isFunction(onClickEv) ? onClickEv : null,
					scales: {
			            yAxes: [{
							display: true,
							scaleLabel: {
								display: true,
							},
							ticks: {
								 beginAtZero: true, //imposto l'asse x a partire da 0
				    			 max: max,
							},
							gridLines: {
							   tickMarkLength: 10
							},
							offset: true,
			            }],
			            xAxes: [{
							display: true,
							scaleLabel: {
								display: true,
							},
							ticks: {
								 beginAtZero: true //imposto l'asse x a partire da 0
							},
							gridLines: {
							   tickMarkLength: 10
							},
			            }]
					},
					legend: {},
					hover: {
						mode: 'index',
						intersect: true
					},
					animation: {
    					animateScale: true,
    					animateRotate: true
    				},
    				tooltips: {
    					backgroundColor: '#FFF',
    					borderColor: 'rgba(0,0,0, .7)',
    					titleFontColor: '#000',
    					bodyFontColor: '#000',
    					footerFontColor: '#000',
    				}
				}
    		};
    		
    		//mostro altre informazioni nei tooltip
    		if(_.isArray(tooltips) && !_.isEmpty(tooltips)){
    			chartData.options.tooltips = {
    				mode: 'index',
					callbacks: {
						title: function(tp, data) {
							return _.capitalize(moment.unix(data.labels[tp[0].index]).format(extra.format.tooltips));
						},
						
						label: function(tooltipItem, data) {
							return ''; //label vuota ma con il quadratino colorato
						},
						
						footer: function(tp, data) {
							var label = [];
							
							var tooltip = _.find(tooltips[0], function(value, key){
								return key == data.labels[tp[0].index];
							});

							if(tooltip){
								_.forEach(tooltip, function(obj, key){
									label.push($translate.instant(obj.key) + ": " + chValueFilter(obj.value));
								});
							}

							return label;
						},
					},
					backgroundColor: '#FFF',
					borderColor: '#666',
					borderWidth: 1,
					titleFontColor: '#000',
					bodyFontColor: '#222',
					footerFontColor: '#444',
				}
    		}
    		
    		if (_.isPlainObject(datasets)) {
    			chartData.data.labels = Object.keys(datasets);
    			chartData.data.datasets.push({
    				data: Object.values(datasets),
    				backgroundColor:ColorsUtils.hex2rgba("#42a5f5", 80),
    				fill: true,
    			});
    			
    		} else if (_.isArray(datasets)) {
	    		_.forEach(datasets, function(v) {
	    			//prendo le labels solo dal primo dataset
	    			if(_.isEmpty(chartData.data.labels)){
	    				chartData.data.labels = Object.keys(v);
	    			}
	    			chartData.data.datasets.push({
	    				data: Object.values(v),
	    				backgroundColor: ColorsUtils.hex2rgba("#1976d2", 80),
	    				fill: true,
	    			});
	    		});
	    		
	    		chartData.data.labels = _.uniq(chartData.data.labels);
	    		
    		} else {
    			throw new Error("values is not valid. Should be array or object");
    		}
    		
    		return chartData;
    	};
    	
    	return $$service;
    }
})();