(function() {
	"use strict";
	
	angular.module("itaca.components").component("chClock", {
		bindings: {
			offsetSeconds: "<",
			showDate: "<",
			showTime: "<",
			dateFormat: "@",
			timeFormat: "@"
		},
		controller: ClockCtrl,
		template: 
			"<div>" +
				"<div ng-if='$ctrl.showDate'><small>{{$ctrl.$$date|date:$ctrl.dateFormat:$ctrl.$$timezone}}</small></div>" +
				"<div ng-if='$ctrl.showTime'><strong>{{$ctrl.$$date|date:$ctrl.timeFormat:$ctrl.$$timezone}}</strong></div>" +
			"</div>"
	});

	/* @ngInject */
	function ClockCtrl($scope, $element, $attrs, DateUtils, $interval) {
		var ctrl = this;
		
		this.$onInit = function() {
			ctrl.$$timezone = DateUtils.secondsToOffsetString(ctrl.offsetSeconds);
			ctrl.showDate = _.isBoolean(ctrl.showDate) ? ctrl.showDate : true;
			ctrl.showTime = _.isBoolean(ctrl.showTime) ? ctrl.showTime : true;
			
			ctrl.dateFormat = ctrl.dateFormat || "mediumDate";
			ctrl.timeFormat = ctrl.timeFormat || "shortTime";
			
			ctrl.$$stop = $interval(function() {
				ctrl.$updateDate();
			}, 1000);
		};
		
		this.$onDestroy = function() {
			$interval.cancel(ctrl.$$stop);
		};
	
		this.$updateDate = function() {
			ctrl.$$date = new Date();
		};
	}
})();