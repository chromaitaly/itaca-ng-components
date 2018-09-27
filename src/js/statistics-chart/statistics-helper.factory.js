(function() {
    'use strict';
    
    angular.module("itaca.components").factory('StatisticsHelper', StatisticsHelper);
    
    /* @ngInject */
    function StatisticsHelper($translate, $mdMedia, AppOptions, ColorsUtils, chValueFilter, NumberUtils) {			
    	var $$service = {};
    	
    	$$service.createChartData = function(type, datasets, tooltips, extra, onHoverEv, onClickEv){
    		var chartData = $$service.$createDefaultChartData(datasets, tooltips, extra, onHoverEv, onClickEv);
    		
    		switch(type) {
    		case "RESERVATIONS_AMOUNT_TREND":
    			chartData.type = 'bar';
    			
    			_.forEach(chartData.data.datasets, function(data){
 					data.backgroundColor = ColorsUtils.hex2rgba("#92278f", 80);
 					data.borderColor = ColorsUtils.hex2rgba("#92278f");
 					data.fill = true;
 				});
    			
    			// Y
    			chartData.options.scales.yAxes[0].ticks.callback = function(value, index, values) {
                    return NumberUtils.formatter(value, 2);
				};
				chartData.options.scales.yAxes[0].scaleLabel = {
					display: true,
		        	labelString: 'Euro €',
				};
    			
    			// X
    			chartData.options.scales.xAxes[0].ticks.callback = function(value, index, values) {
    				if(!$mdMedia('gt-sm')){
    					return index % 2 === 0 ? moment.unix(value).format("MMM YY") : '';
    				}
                	return moment.unix(value).format("MMM YY");
				};
    			
				chartData.options.tooltips.callbacks.label = function(tooltipItem, data) {
					return $translate.instant('reservations.reservations'); 
				},
				
    			chartData.options.legend.display = false;
    			
    			break;
    			
    		case "RESERVATIONS_SOURCE_TREND":
    			chartData.type = 'doughnut';
    			
    			_.forEach(chartData.data.datasets, function(ds){
    				ds.backgroundColor = ColorsUtils.hex2rgba("#92278f");
    				ds.borderColor = "#FFF";
    				ds.borderWidth = 4;
    				ds.hoverBorderWidth = 0;
    				ds.hoverBorderColor = "#FFF";
//    				ds.fill = false;
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
    			if(extra && extra.benchmarkValue){
    				chartData.options.horizontalLine = [{
				      "y": extra.benchmarkValue,
				      "style": "#444",
				      "text": $translate.instant("statistics.statistic.benchmark"),
				    }];
    				
    			}
    			
    			_.forEach(chartData.data.datasets, function(ds){
    				ds.backgroundColor = ColorsUtils.hex2rgba("#92278f", 60);
    				ds.borderColor = ColorsUtils.hex2rgba("#92278f");
    				ds.pointBackgroundColor = ColorsUtils.hex2rgba("#92278f");
    				ds.pointRadius = 2;
    				ds.pointHoverRadius = 4;
    				ds.lineTension = 0;
    			});
    		
    			chartData.options.scales.xAxes[0].ticks.callback = function(value, index, values) {
    				if(!$mdMedia('gt-sm')){
    					return index % 2 === 0 ? moment.unix(value).format("MMM YY") : '';
    				}
                    return moment.unix(value).format("MMM YY");
 				};

 				chartData.options.legend.display = false;
 				
 				chartData.options.scales.yAxes[0].ticks.min = 4;
 				chartData.options.scales.yAxes[0].ticks.max = 10;
 				
 				chartData.options.tooltips.callbacks.label = function(tooltipItem, data) {
					return $translate.instant('reviews.reviews');
				};
				
				chartData.options.scales.yAxes[0].scaleLabel = {
					display: true,
		        	labelString: $translate.instant('common.opinion'),
				};
 				
    			break;
    		}    	
    		
    		return chartData;
    	};
    	
    	$$service.$createDefaultChartData = function(datasets, tooltips, extra, onHoverEv, onClickEv) {
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
								 beginAtZero: true //imposto l'asse x a partire da 0
							},
							gridLines: {
							   tickMarkLength: 10
							},
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
							return _.capitalize(moment.unix(data.labels[tp[0].index]).format("MMMM YYYY"));
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
    		
    		//default background color
    		var backgroundColor = ColorsUtils.hex2rgba("#92278f");
    		
    		if (_.isPlainObject(datasets)) {
    			chartData.data.labels = Object.keys(datasets);
    			chartData.data.datasets.push({
    				data: Object.values(datasets),
    				backgroundColor:backgroundColor,
    				fill: true,
    			});
    			
    		} else if (_.isArray(datasets)) {
	    		_.forEach(datasets, function(v) {
	    			chartData.data.labels = Object.keys(v);
	    			chartData.data.datasets.push({
	    				data: Object.values(v),
	    				backgroundColor:backgroundColor,
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