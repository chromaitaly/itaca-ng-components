(function(){
	'use strict';
	
	angular.module("itaca-ui").component("chTimelineEvent", {
		require: {
			chTimelineCtrl: '^chTimeline'
		},
		transclude: true,
		bindings: {
			date: '<',
			eventTitle: '@',
			titleQuote: '<?',
			iconBg: '@',
			iconClass: '@',
			dateFormat: '@',
			isNew: '=?',
			ngDisabled: "=?"
    	},
		controller: EventCtrl,
		template: 
			"<div class=\"md-padding relative\" ch-animated=\"{{$ctrl.event.animatedClass}}\" ch-animated-delay=\"{{$ctrl.event.animatedDelay}}\">" +
	    		"<div class=\"ch-timeline-event-icon {{$ctrl.event.iconBg}}\">" +
		    		"<md-icon ng-if=\"$ctrl.event.iconClass\" class=\"material-icons {{$ctrl.event.iconClass}}\"></md-icon>" +
		    		"<div ng-if=\"!$ctrl.event.iconClass\" class=\"md-subhead ng-scope row-mini\">" +
		    			"<div class=\"text-bold\">{{$ctrl.event.date|utcDate:'d'}}</div>" +
		    			"<div class=\"text-small\">{{$ctrl.event.date|utcDate:'MMM'}}</div>" +
		    		"</div>"+
	    		"</div>"+			    		
	    		"<div class=\"ch-timeline-event-content layout-padding no-padding bg-white text-left md-whiteframe-1dp\"  ng-class=\"{'locked': $ctrl.ngDisabled}\">" +
		    		"<div ng-if=\"$ctrl.event.title || $ctrl.event.dateFormat\" class=\"layout-row layout-wrap layout-padding layout-align-start-center\">" +
		    			"<div class=\"md-subhead text-left\" ng-class=\"!$mdMedia('gt-sm') ? 'flex-100': 'flex'\">"+
			    			"<span ng-if=\"$ctrl.isNew\"><md-icon class=\"mdi mdi-new-box text-info material-icons\"></md-icon></span>"+
			    			"<strong ng-if=\"$ctrl.event.title\">"+
					    		"<em>"+
				    				"<span ng-if=\"$ctrl.titleQuote\">&ldquo;</span>"+
				    				"<span>{{$ctrl.event.title}}</span>"+
				    				"<span ng-if=\"$ctrl.titleQuote\">&bdquo;</span>"+
			    				"</em>"+
		    				"</strong>"+
		    			"</div>" +
		    			"<div class=\"text-gray-light text-small\">{{$ctrl.event.date|utcDate:$ctrl.event.dateFormat}}</div>" +
		    		"</div>" +
		    		"<div class=\"no-padding\" ng-transclude></div>" +
		    	"</div>"+
	    	"</div>"
	});
	
	 /* @ngInject */
	function EventCtrl($scope, $element, $mdMedia) {
		$scope.$mdMedia = $mdMedia;
		
		var ctrl = this;
		
		this.$onInit = function() {
			ctrl.event = {
				date: ctrl.date,
	      		title: ctrl.eventTitle,
	      		iconBg: ctrl.iconBg,
	      		iconClass: ctrl.iconClass,
	      		dateFormat: ctrl.dateFormat,
	      		animatedClass: ctrl.chTimelineCtrl.animatedClass
			};
			
			ctrl.chTimelineCtrl.addEvent(ctrl.event);
	      
			ctrl.titleQuote = _.isBoolean(ctrl.titleQuote) ? ctrl.titleQuote : true;
			
			$element.addClass("ch-timeline-event flex-xs-100 relative layout-column");
			$element.addClass(ctrl.event.align == 'CENTER' ? 'flex-50' : 'flex-100');
			
			ctrl.registerWatches();
		};
		
		this.registerWatches = function() {
			$scope.$watch(function() {
				return ctrl.eventTitle;
				
			}, function(newVal, oldVal){
				ctrl.event.title = newVal;
			});
		      
			$scope.$watch(function() {
				return ctrl.date;
				
			}, function(newVal,oldVal){
				ctrl.event.date = newVal;
			});
		};
		
		this.$onDestroy = function() {
			ctrl.chTimelineCtrl.removeEvent(ctrl.event);
		};
	}
})();