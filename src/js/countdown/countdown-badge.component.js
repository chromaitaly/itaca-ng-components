(function() {
	'use strict';
	
	angular.module("itaca.components").component("countDownBadge", {
		bindings: {
			endDate: "<",
			diameter: "@",
			message: "@",
			finalMessagge: "@",
			boxCss: "@",
			boxFinalCss: "@",
			hideMessage: "<?",
			onFinish: "&?"
		},
		controller: CountDownBadgeCtrl,
		template: 
			"<div id=\"progress-countdown\" layout layout-wrap layout-padding layout-align=\"space-around\" ng-class=\"$ctrl.boxCss\">" +
				"<div>" +
					"<md-progress-circular md-mode=\"determinate\" value=\"{{$ctrl.$$countdown.progress}}\" md-diameter=\"{{$ctrl.diameter}}\"></md-progress-circular>" +
					"<div class=\"flex-100 layout-align-center-center layout-column row-1\">" +
						"<span>{{$ctrl.$$countdown.unit.value}}</span>" +
						"<small ng-if=\"$ctrl.$$countdown.unit.format\" translate=\"{{$ctrl.$$countdown.unit.format}}\"></small>" +
					"</div>" +
				"</div>" +
				"<div flex layout=\"column\" layout-align=\"center start\" class=\"md-subhead\" ng-if=\"!$ctrl.hideMessage\">" +
					"<strong>Hai ancora {{$ctrl.$$countdown.unit.value}} <span translate=\"{{$ctrl.$$countdown.unit.format}}\"></span></strong> " +
					"<span ng-if=\"$ctrl.message\" ng-bind-html=\"$ctrl.message\"></div>" +
				"</div>" +
			"</div>"
	});
	
	 /* @ngInject */
	function CountDownBadgeCtrl($scope, $mdMedia, $interval) {
		var ctrl = this;
		
		this.$onInit = function(){
			
			ctrl.cssClass = ctrl.cssClass || null;
			ctrl.textCss = ctrl.textCss || null;
			
			ctrl.hideMessage = _.isBoolean(ctrl.hideMessage) ? ctrl.hideMessage : false;
			
			ctrl.diameter = ctrl.diameter || 100;
			
			ctrl.$$countdown = {
					start: new Date().getTime(),
					interval: 1000,
					progress: 100,
					unit: {
						value: '!',
					},
			};
			
			ctrl.$$countdown.end = (ctrl.endDate instanceof Date) ? ctrl.endDate.getTime() : new Date(ctrl.endDate).getTime();
			ctrl.$$countdown.duration = moment.duration((ctrl.$$countdown.end - ctrl.$$countdown.start), 'milliseconds');
			
			ctrl.$intervalFn();
			
			ctrl.$$interval = $interval(ctrl.$intervalFn, ctrl.$$countdown.interval);
		};
		
		
		this.$intervalFn = function(){
			ctrl.$$countdown.duration = moment.duration(ctrl.$$countdown.duration - ctrl.$$countdown.interval, 'milliseconds');
			
			if(ctrl.$$countdown.duration.asMilliseconds() <= 0){
            	ctrl.$finih();
            	
            } else {
	            ctrl.$getUnit();
	            ctrl.$getProgress();
            }
		};
		
		
		this.$getUnit = function(){
			ctrl.$$countdown.unit = {};
			
			var d = ctrl.$$countdown.duration.days(), h = ctrl.$$countdown.duration.hours(), m = ctrl.$$countdown.duration.minutes(), s = ctrl.$$countdown.duration.seconds();
			
			if(d > 0){
				ctrl.$$countdown.unit.value = d;
				ctrl.$$countdown.unit.format = d == 1 ? 'date.day' : 'date.days';
				
			} else if(h > 0){
				ctrl.$$countdown.unit.value = h;
				ctrl.$$countdown.unit.format = h == 1 ? 'date.hour' : 'date.hours';
				
			} else if(m > 0){
				ctrl.$$countdown.unit.value = m;
				ctrl.$$countdown.unit.format = m == 1 ? 'date.minute' : 'date.minutes';
				
			} else {
				ctrl.$$countdown.unit.value = s;
				ctrl.$$countdown.unit.format = s == 1 ? 'date.second' : 'date.seconds';
			}
			
		};
		
		this.$getProgress = function() {
			ctrl.$$countdown.progress = 100 * (Math.max(0, ctrl.$$countdown.end - new Date()) / (ctrl.$$countdown.end - ctrl.$$countdown.start));
		}
		
		
		this.$finih = function(){
			$interval.cancel(ctrl.$$interval);
			
			ctrl.onFinish && ctrl.onFinish();
		};
		
		this.$onDestroy = function(){
			ctrl.$finih();
		};
	}
})();