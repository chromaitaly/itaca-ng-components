(function() {
	'use strict';
	
	angular.module("itaca.components").component("countDownBadge", {
		bindings: {
			startDate: "<?",
			endDate: "<",
			offset: "@",
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
			"<div id=\"progress-countdown\" layout layout-wrap layout-padding layout-align=\"space-around\" ng-class=\"$ctrl.$$isFinish ? $ctrl.boxFinalCss : $ctrl.boxCss\">" +
				"<div layout=\"column\" layout-align=\"center center\">" +
					"<md-progress-circular md-mode=\"determinate\" value=\"{{$ctrl.$$countdown.progress}}\" md-diameter=\"{{$ctrl.diameter}}\"></md-progress-circular>" +
					"<div class=\"flex-100 layout-align-center-center layout-column row-1\">" +
						"<span>{{$ctrl.$$countdown.unit.value}}</span>" +
						"<small ng-if=\"$ctrl.$$countdown.unit.format\" translate=\"{{$ctrl.$$countdown.unit.format}}\"></small>" +
					"</div>" +
				"</div>" +
				"<div flex layout=\"column\" layout-align=\"center start\" class=\"md-subhead\" ng-if=\"!$ctrl.hideMessage\">" +
					"<strong ng-if=\"!$ctrl.$$isFinish\"><span translate=\"date.countdown.text\"></span>&nbsp;{{$ctrl.$$countdown.unit.value}}&nbsp;<span translate=\"{{$ctrl.$$countdown.unit.format}}\"></span></strong> " +
					"<span ng-if=\"!$ctrl.$$isFinish && $ctrl.message\" ng-bind-html=\"$ctrl.message\"></span>" +
					"<span ng-if=\"$ctrl.$$isFinish && $ctrl.finalMessagge\" ng-bind-html=\"$ctrl.finalMessagge\"></span>" +
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
			
			ctrl.$$isFinish = false;
			
			ctrl.diameter = ctrl.diameter || 100;
			
			ctrl.$$offset = ctrl.offset ? _.toNumber(ctrl.offset) : 0;
			ctrl.$$offset = _.isFinite(ctrl.$$offset) ? ctrl.$$offset : 0;
			
			ctrl.$$countdown = {
				start: 		ctrl.$getOffsetMoment(ctrl.startDate).valueOf(),
				end: 		ctrl.$getOffsetMoment(ctrl.endDate).valueOf(),
				interval: 	1000,
				progress: 	100,
				unit: {
					value: '!',
				},
			};
			
			ctrl.$$countdown.duration = moment.duration((ctrl.$$countdown.end - ctrl.$getOffsetMoment().valueOf()), 'milliseconds');
			
			ctrl.$intervalFn();
			
			ctrl.$$interval = $interval(ctrl.$intervalFn, ctrl.$$countdown.interval);
		};
		
		// applica se previsto l'offset
		this.$getOffsetMoment = function(date){
			return ctrl.$$offset ? moment(date).utcOffset(ctrl.$$offset, true) : moment(date);
		};
		
		this.$intervalFn = function(){
			if (ctrl.$$isFinish) {
				$interval.cancel(ctrl.$$interval);
				return;
			}
			
			ctrl.$$countdown.duration = moment.duration(ctrl.$$countdown.duration - ctrl.$$countdown.interval, 'milliseconds');
			
			if(ctrl.$$countdown.duration.asMilliseconds() <= 0){
            	ctrl.$finish();
            	
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
			ctrl.$$countdown.progress = 100 * (Math.max(0, ctrl.$$countdown.duration) / (ctrl.$$countdown.end - ctrl.$$countdown.start));
		};
		
		this.$finish = function(){
			$interval.cancel(ctrl.$$interval);
			ctrl.$$isFinish = true;
			ctrl.$$countdown.unit = {value: '!'};
			ctrl.$$countdown.progress = 100;
			
			ctrl.onFinish && ctrl.onFinish();
		};
		
	}
})();