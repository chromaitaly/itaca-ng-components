(function() {
	"use strict";
	
	angular.module("itaca.components").component("chStatisticsChartLegend", {
		bindings: {
			datasets: "<",
			colors: "<?",
		},
		controller: StatisticsChartLegendCtrl,
		template: 
			"<div layout-align=\"center center\" layout-padding-sm layout layout-wrap>" +
				"<div layout layout-align=\"start center\" ng-repeat=\"(key, value) in $ctrl.$$legend\">" +
					"<span class=\"chart-legend\" ng-style=\"{'background-color': value.background}\"></span>" +
					"<span ng-if=\"key == 'portal'\" ng-bind=\" $ctrl.appOptions.about.name\"></span>" +
					"<span ng-if=\"key != 'portal'\" translate=\"{{'channel.source.' + key }}\"></span>" +
					"<span>&nbsp;(" +
						"<span>{{value.percentage}}%</span>" +
						"<small ng-if=\"value.increase\" ng-class=\"value.increase > 0 ? 'text-success' : 'text-danger'\"> {{value.increase}}%</small>" +
					")</span>" +
				"</div>" +
			"</div>"
	});

	/* @ngInject */
	function StatisticsChartLegendCtrl($scope, $translate, $mdMedia, AppOptions) {
		var ctrl = this;
		
		this.$onInit = function(){
			ctrl.appOptions = AppOptions;
			ctrl.$mdMedia = $mdMedia;
			ctrl.$$legend = {};
			
			ctrl.$initLegend();
		};
		
		this.$onChanges = function(changesObj) {
			if (changesObj.datasets && !changesObj.datasets.isFirstChange()) {
				ctrl.$initLegend();
			}
			
			if (changesObj.colors) {
				ctrl.$updateColors();
			}
		};
		
		this.$initLegend = function(){
			if(_.isNil(ctrl.datasets) || _.isEmpty(ctrl.datasets)){
				return;
			}
			
			// calcolo il totale del primo dataset	
			var _total = _.reduce(ctrl.datasets[0],function (sum, obj) {return sum + obj;}, 0);
			
			ctrl.$$legend = _.reduce(ctrl.datasets, function(result, obj) {
				_.forEach(obj,function(value, key){
					result[key.toLowerCase()] = result[key.toLowerCase()] || {};
					var el = result[key.toLowerCase()];
					el.values = el.values || [];
					
					el.values.push(value);
					el.percentage = (value / _total) * 100.0;
					el.percentage = el.percentage.toFixed(2);
					
					// calcolo incremento se presente almeno un altro dato
					if(el.values.length == 2){
						el.increase = ((el.values[0] - el.values[1]) / el.values[1]) * 100.0;
						el.increase = el.increase.toFixed(2);
					}
					
				});
			    return result;
			},{});
			
		};
		
		this.$updateColors = function(){
			if(_.isNil(ctrl.colors) || _.isEmpty(ctrl.colors)){
				return;
			}
			
			if(_.isNil(ctrl.$$legend) || _.isEmpty(ctrl.$$legend)){
				return;
			}
			
			_.forEach(ctrl.$$legend, function(value, key){
				value.background = ctrl.colors[key.toUpperCase()];
			});
		};
	}
})();