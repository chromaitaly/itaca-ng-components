(function() {
	'use strict';
	
	angular.module("itaca.components").component('chChart', {
		bindings: {
			type: "<",
			data: "<",
			options: "<?",
		},
		controller: ChartCtrl,
		template: "<canvas class=\"chartjs\"></canvas>"
	});

	/* @ngInject */
	function ChartCtrl($scope, $element) {
		var ctrl = this;
		
		this.$onInit = function(){
			ctrl.type = _.includes(["line", "bar", "horizontal-bar", "radar", "pie", "polar-area", "doughnut", "bubble"], ctrl.type) ? ctrl.type : "bar";
			ctrl.data = ctrl.data || {};
			ctrl.ctx = $element.find('canvas')[0].getContext('2d');
			
			ctrl.ctx.height = $element[0].offsetHeight > 250 ? $element[0].offsetHeight : 250;
			
			ctrl.$createChart();
		};
		
		this.$onChanges = function(changesObj) {
			if (changesObj.type && !changesObj.type.isFirstChange()) {
				ctrl.$createChart();
			}
			
			if (changesObj.data && !changesObj.data.isFirstChange()) {
				_.assign(ctrl.$$chart.data, ctrl.data);
				ctrl.$update();
			}
			
			if (changesObj.options && !changesObj.options.isFirstChange()) {
				_.assign(ctrl.$$chart.options, ctrl.options);
				ctrl.$update();
			}
		};
		
		this.$update = function(){
			ctrl.$$chart.update();
			ctrl.$$chart.resize();
			
			// fix per aggiornare il chart se cambiano i colori
			ctrl.data.$$updateChart = false;
		};
		
		this.$createChart = function(){
			if(!ctrl.ctx){
				return;
			}
			
			var horizonalLinePlugin = {
			  afterDatasetDraw: function(chartInstance) {
			    var yScale = chartInstance.scales["y-axis-0"];
			    var xScale = chartInstance.scales["x-axis-0"];
			    var canvas = chartInstance.chart;
			    var ctx = canvas.ctx;

			    if (chartInstance.options.horizontalLine) {
			      for (var i = 0; i < chartInstance.options.horizontalLine.length; i++) {
			    	var line = chartInstance.options.horizontalLine[i];
			    	
			    	var style, yValue;

			        if (!line.style) {
			          style = "rgba(0, 0, 0, .7)";
			        } else {
			          style = line.style;
			        }

			        if (line.y) {
			          yValue = yScale.getPixelForValue(line.y);
			        } else {
			          yValue = 0;
			        }

			        if (yValue) {
			          ctx.setLineDash([10,10]);
			          ctx.lineWidth = 1.5;
			          ctx.strokeStyle = style;
			          ctx.beginPath();
			          
			          ctx.moveTo(xScale.getPixelForTick(0), yValue);
			          ctx.lineTo(xScale.right, yValue);
			          ctx.stroke();
			          
			          ctx.beginPath();
			          ctx.setLineDash([]);
			        }

			        if (line.text) {
			          ctx.fillStyle = style;
			          ctx.font = "12px sans-serif";
			          ctx.textBaseline = "top";
			          ctx.fillText(line.text, xScale.getPixelForTick(0) + 2, yValue + ctx.lineWidth + 5 );
			        }
			      }
			      return;
			    };
			  }
			};
			Chart.pluginService.register(horizonalLinePlugin);
			
			ctrl.$$chart = new Chart(ctrl.ctx, {
				type: ctrl.type,
				data: ctrl.data,
				options: ctrl.options,
				
			});
			ctrl.$update();
		};
	}
})();