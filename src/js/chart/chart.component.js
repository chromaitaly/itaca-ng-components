(function() {
	"use strict";
	
	angular.module("itaca.components").component("chChart", {
		bindings: {
			type: "<",
			data: "<",
			options: "<?",
			linearGradient: "<?"
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
			ctrl.ctx = $element.find("canvas")[0].getContext("2d");
			
			ctrl.ctx.height = $element[0].offsetHeight > 250 ? $element[0].offsetHeight : 250;
			
			ctrl.$createChart();
		};
		
		this.$onChanges = function(changesObj) {
			if (changesObj.type && !changesObj.type.isFirstChange()) {
				ctrl.$destory();
				ctrl.$createChart();
			}
			
			if (changesObj.data && !changesObj.data.isFirstChange()) {
				ctrl.$$chart.data = ctrl.data;
				ctrl.$$chart.update({
				    duration: 800,
				    easing: "easeOutBounce"
				});
			}
			
			if (changesObj.options && !changesObj.options.isFirstChange()) {
				ctrl.$$chart.options = ctrl.options;
				ctrl.$update();
			}
			
			if (changesObj.linearGradient && !changesObj.linearGradient.isFirstChange()) {
				ctrl.$update();
			}
		};
		
		this.$update = function(){
			ctrl.$generateGradient();
			ctrl.$$chart.update();
			ctrl.$$chart.resize();
			
			// fix per aggiornare il chart se cambiano i colori
			ctrl.data.$$updateChart = false;
		};
		
		this.$destory = function(){
			ctrl.$$chart.destroy();
		};
		
		/**
		 * funzione che genera e applica il colore gradiente al dataset assegnato
		 * 
		 * linear-gradient deve essere una array di dataset contenente una mappa di colori
		 * <position:colore> position: (posizione del gradiente), colore: hex o rgba
		 * 
		 * es: [{0:"#000", 1:"#fff"}, {0:"#000", 1:"#fff"}]
		 */
		this.$generateGradient = function(){
			if(_.isNil(ctrl.linearGradient) || _.isEmpty(ctrl.linearGradient)){
				return;
			}
			
			_.forEach(ctrl.linearGradient, function(color, idx){
				
				var gradient = ctrl.ctx.createLinearGradient(0, 0, 0, 400);
				
				_.forEach(color, function(v,k){
					gradient.addColorStop(k, v);
				})
				
				if(ctrl.data.datasets[idx]){
					ctrl.data.datasets[idx].backgroundColor = gradient;
				}
			});
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
			    	
			    	var textPosition = line.textPosition || 5;

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
			          ctx.fillText(line.text, xScale.getPixelForTick(0) + 2, yValue + ctx.lineWidth + textPosition );
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