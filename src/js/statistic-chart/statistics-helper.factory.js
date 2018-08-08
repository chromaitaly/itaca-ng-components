(function() {
    'use strict';
    
    angular.module("itaca.components").factory('StatisticsHelper', StatisticsHelper);
    
    /* @ngInject */
    function StatisticsHelper($translate) {			
    	var $$service = {};
    	
    	$$service.createChartData = function(type, datasets, tooltips, onHoverEv, onClickEv){
    		var chartData = $$service.$createDefaultChartData(datasets, tooltips, onHoverEv, onClickEv);
    		
    		switch(type) {
    		case "RESERVATIONS_AMOUNT_TREND":
    			chartData.type = 'bar';
    			
    			_.forEach(chartData.data.datasets, function(d){
    				d.label = $translate.instant('statistics.statistics.revenue') + '€';
    			});
    			
    			// Y
    			chartData.options.scales.yAxes[0].ticks.callback = function(value, index, values) {
                    return value + ' €';
				};
    			
    			// X
    			chartData.options.scales.xAxes[0].ticks.callback = function(value, index, values) {
                   return moment.unix(value).format("MMM YY");
				};
    			
    			chartData.options.legend.display = false;
    			
    			break;
    			
    		case "RESERVATIONS_SOURCE_TREND":
    			chartData.type = 'doughnut';
    			chartData.options = {
    				responsive: true,
    				legend: {
    					position: 'bottom',
    				},
    				animation: {
    					animateScale: true,
    					animateRotate: true
    				},
    				scales: {
    					xAxes: [
    						{
    	    					display: false,
    							ticks: {
		    						callback: function(value, index, values) {
		    	                        return $translate.instant('channel.source.' + value.toLowerCase());
		    	                    }
    							},
    							scaleLabel: {
    								display: true,
    							},
    						}
    					]
    				}
    			};
    			
    			
    			break;
    			
    		case "REVIEWS_COUNT_TREND":
    			chartData.type = 'bar';
    			break;
    		}    	
    		
    		return chartData;
    		
    	};
    	
    	$$service.$createDefaultChartData = function(datasets, tooltips, onHoverEv, onClickEv) {
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
							}
			            }],
			            xAxes: [{
							display: true,
							scaleLabel: {
								display: true,
							},
							ticks: {
								 beginAtZero: true //imposto l'asse x a partire da 0
							}
			            }]
					},
					legend: {},
//					tooltips: {
//						enabled: false,
//						mode: 'index',
//						position: 'nearest',
//						custom: $$service.$tooltipsGenerator
//					},
					hover: {
						mode: 'index',
						intersect: true
					},
					animation: {
    					animateScale: true,
    					animateRotate: true
    				}
				}
    		};
    		
    		//mostro altre informazioni nei tooltip
    		if(_.isArray(tooltips) && !_.isEmpty(tooltips)){
    			chartData.options.tooltips = {
    				mode: 'index',
					callbacks: {
						label: function(tooltipItem, data) {
							var label = '';
							_.forEach(tooltips, function(tp){
								
								var idx = data.labels[tooltipItem.index];
								
								label += tp[idx].key + ': ';
								label += tp[idx].value + '\\n';
							});
							return label;
						},
					},
				}
    		}
    		
    		if (_.isPlainObject(datasets)) {
    			chartData.data.labels = Object.keys(datasets);
    			chartData.data.datasets.push({
    				data: Object.values(datasets),
    				backgroundColor: "#92278f", // test
    				label: $translate.instant('reservations.reservations'), //test
    			});
    			
    		} else if (_.isArray(datasets)) {
	    		_.forEach(datasets, function(v) {
	    			chartData.data.labels = Object.keys(v);
	    			chartData.data.datasets.push({
	    				data: Object.values(v),
	    				backgroundColor: "#92278f", // test
	    				label: $translate.instant('reservations.reservations'), //test
	    				fill: false,
	    			});
	    		});
	    		
	    		chartData.data.labels = _.uniq(chartData.data.labels);
	    		
    		} else {
    			throw new Error("values is not valid. Should be array or object");
    		}
    		
    		return chartData;
    	};
    	
    	//TODO genero una tooltip custom
    	$$service.$tooltipsGenerator = function(tooltipModel){
    		
    		// Tooltip Element
            var tooltipEl = document.getElementById('chartjs-tooltip');

            // Create element on first render
            if (!tooltipEl) {
                tooltipEl = document.createElement('div');
                tooltipEl.id = 'chartjs-tooltip';
                tooltipEl.innerHTML = "<table></table>";
                document.body.appendChild(tooltipEl);
            }

            // Hide if no tooltip
            if (tooltipModel.opacity === 0) {
                tooltipEl.style.opacity = 0;
                return;
            }

            // Set caret Position
            tooltipEl.classList.remove('above', 'below', 'no-transform');
            if (tooltipModel.yAlign) {
                tooltipEl.classList.add(tooltipModel.yAlign);
            } else {
                tooltipEl.classList.add('no-transform');
            }

            function getBody(bodyItem) {
                return bodyItem.lines;
            }

            // Set Text
            if (tooltipModel.body) {
                var titleLines = tooltipModel.title || [];
                var bodyLines = tooltipModel.body.map(getBody);

                var innerHtml = '<thead>';

                titleLines.forEach(function(title) {
                    innerHtml += '<tr><th>' + title + '</th></tr>';
                });
                innerHtml += '</thead><tbody>';

                bodyLines.forEach(function(body, i) {
//                    var colors = tooltipModel.labelColors[i];
//                    var style = 'background:' + colors.backgroundColor;
//                    style += '; border-color:' + colors.borderColor;
//                    style += '; border-width: 2px';
//                    var span = '<span style="' + style + '"></span>';
                    innerHtml += '<tr><td>' + body + '</td></tr>';
                });
                innerHtml += '</tbody>';

                var tableRoot = tooltipEl.querySelector('table');
                tableRoot.innerHTML = innerHtml;
            }

            // `this` will be the overall tooltip
            var position = this._chart.canvas.getBoundingClientRect();

            // Display, position, and set styles for font
            tooltipEl.style.opacity = 1;
            tooltipEl.style.position = 'absolute';
            tooltipEl.style.left = position.left + tooltipModel.caretX + 'px';
            tooltipEl.style.top = position.top + tooltipModel.caretY + 'px';
            tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily;
            tooltipEl.style.fontSize = tooltipModel.bodyFontSize + 'px';
            tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle;
            tooltipEl.style.padding = tooltipModel.yPadding + 'px ' + tooltipModel.xPadding + 'px';
        };
    	
    	return $$service;
    }
})();