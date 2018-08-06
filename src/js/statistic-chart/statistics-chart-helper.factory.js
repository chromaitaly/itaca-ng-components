/**
 * Servizio per le info dell'applicazione
 * 
 * per i parametri vedere: http://www.chartjs.org/docs/latest/
 */
(function() {
    'use strict';
    
    angular.module("itaca.components").factory('StatisticsHelper', StatisticsHelper);
    
    /* @ngInject */
    function StatisticsHelper($translate) {			
    	var $$service = {};
    	
    	$$service.createChartData = function(type, values, onHoverEv, onClickEv){
    		var chartData = $$service.$createDefaultChartData(values, onHoverEv, onClickEv);
    		
    		switch(type) {
    		case "ANNUAL_RESERVATIONS_AMOUNT_TREND":
    			chartData.type = 'line';
    			
    			_.forEach(chartData.data.datasets, function(d){
    				d.label = $translate.instant('reservations.reservations');
    			});
    			
    			// X
    			chartData.options.scales.yAxes.scaleLabel.labelString = $translate.instant('reservations.reservations');
    			chartData.options.scales.yAxes.ticks = {
					callback: function(value, index, values) {
                        return value + '€';
                    }
				};
    			
    			// Y
    			chartData.options.scales.xAxes.scaleLabel.labelString = moment(chartData.data.labels[0]).format('YYYY');
    			chartData.options.scales.xAxes.ticks = {
					callback: function(value, index, values) {
                        return moment(value).format('MMMM');
                    }
				};
    			
    			break;
    			
    		case "ANNUAL_RESERVATIONS_COUNT_TREND":
    			chartData.type = 'doughnut';
    			
    		case "ANNUAL_REVIEWS_COUNT_TREND":
    			chartData.type = 'bar';
    			chartData.options.scales.xAxes.ticks = {
	                beginAtZero: true
	            };
    			break;
    		}    	
    		
    		return chartData;
    		
    	};
    	
    	$$service.$createDefaultChartData = function(values, onHoverEv, onClickEv) {
    		var chartData = {
    			type: 'line',
				data: {
					labels: [],
					datasets: []
				}, 
				options:{
					onHover: angular.isFunction(onHoverEv) ? onHoverEv : null,
					onClick: angular.isFunction(onClickEv) ? onClickEv : null,
					scales: {
			            yAxes: [{
							display: true,
							scaleLabel: {
								display: true,
							},
			            }],
			            xAxes: [{
							display: true,
							scaleLabel: {
								display: true,
							},
			            }]
					}
				}
    		};
    		
    		if (_.isPLainObject(values)) {
    			chartData.data.labels.push(_.keys(values));
    			chartData.data.datasets.push({data: _.values(values)});
    			
    		} else if (_.isArray(values)) {
	    		_.forEach(values, function(v) {
	    			chartData.data.labels.push(_.keys(v));
	    			chartData.data.datasets.push({data: _.values(v)});
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