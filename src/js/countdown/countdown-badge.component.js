(function() {
	'use strict';
	
	angular.module("itaca-ui").component("countDownBadge", {
		bindings: {
			endDate: "<",
			dateFormat: "@",
			message: "@",
			cssClass: "@"
		},
		controller: CountDownBadgeCtrl,
		template: 
			"<div layout layout-wrap layout-align=\"space-around\" class=\"{{$ctrl.cssClass}}\">" +
				"<div>" +
				"<md-progress-circular md-mode=\"determinate\" value=\"{{$ctrl.determinateValue}}\"></md-progress-circular>" +
				"</div>" +
				"<div ng-if=\"$ctrl.message\" flex>" +
					"<span ng-bind=\"$ctrl.message\"></div>" +
				"</div>" +
			"</div>"
	});
	
	 /* @ngInject */
	function CountDownBadgeCtrl($scope, $mdMedia, $translate, $log, AppOptions, Lang, Dialog, InterestPlaces, Navigator, Notification, Reservation) {
		var ctrl = this;
		
		this.$onInit = function(){
			
			moment.duration(x.diff(y)).humanize();
			
//			var eventTime= 1366549200; // Timestamp - Sun, 21 Apr 2013 13:00:00 GMT
//			var currentTime = 1366547400; // Timestamp - Sun, 21 Apr 2013 12:30:00 GMT
//			var diffTime = eventTime - currentTime;
//			var duration = moment.duration(diffTime*1000, 'milliseconds');
//			var interval = 1000;
//
//			setInterval(function(){
//			  duration = moment.duration(duration - interval, 'milliseconds');
//			    $('.countdown').text(duration.hours() + ":" + duration.minutes() + ":" + duration.seconds())
//			}, interval);
//			
			
			$interval(function() {

		        self.determinateValue += 1;
		        if (self.determinateValue > 100) {
		          self.determinateValue = 30;
		        }

		   }, 100);
			
			
		}
	}
})();