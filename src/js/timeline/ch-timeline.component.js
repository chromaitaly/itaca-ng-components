(function() {
	'use strict';
	
	angular.module("chroma.components").component("chTimeline", {
		transclude: true,
		bindings: {
			align: '@',
			randomBg: '<?',
			hideIcon: '<?'
    	},
		controller: TimelineCtrl,
		template: '<div class="ch-timeline {{$ctrl.alignClass}} {{$ctrl.barClass}} {{$ctrl.hideIcon ? \'no-icon\' : null}}"><div class="layout-row layout-wrap" ng-transclude></div><bar></bar></div>'
	});
	
	 /* @ngInject */
	 function TimelineCtrl($scope, $mdMedia, NumberUtils) {
		 var ctrl = this;
		
		 this.events = [];
		
		 this.bgArray = [
			'bg-success text-white', 'bg-info text-white',
			'bg-warn text-white', 'bg-danger text-white',
			'bg-primary text-white', 'bg-primary-light text-white',
			'bg-blue-sea text-white', 'bg-gray-light text-white',
			'bg-gray-lighter only-border text-gray-light'
		];
		
		this.$onInit = function() {
			ctrl.hideIcon = _.isBoolean(ctrl.hideIcon) ? ctrl.hideIcon : false;
			ctrl.randomBg = _.isBoolean(ctrl.randomBg) ? ctrl.randomBg : true;
			
			ctrl.manageAlign();
			
			ctrl.registerWatches();
		};
		
		this.manageAlign = function() {
			ctrl.align = _.includes(['LEFT', 'CENTER', 'RIGHT'], ctrl.align) ? ctrl.align : 'CENTER'; 
			ctrl.align = $mdMedia('gt-xs') ? ctrl.align : 'RIGHT';  
	    	
			ctrl.alignClass = 'ch-timeline-' + ctrl.align.toLowerCase();
			
			ctrl.animatedClass = ctrl.align == 'RIGHT' ? 'slideInRight' : ctrl.align == 'LEFT' ? 'slideInLeft' : 'slideInUp';
		};
    	  
        this.manageIconBgColor = function(ev){
        	 if(!_.isNil(ev.iconBg) || !ctrl.randomBg){
        		 return;
        	 }
        	  
        	 ctrl.bgArrayLeft = _.isEmpty(ctrl.bgArrayLeft) ? angular.copy(ctrl.bgArray) : ctrl.bgArrayLeft; 
        	 
        	 ev.iconBg = _.sample(ctrl.bgArrayLeft);
        	 
        	 _.pull(ctrl.bgArrayLeft, ev.iconBg);
        	 
        	 if(!ctrl.lastIconBg && ctrl.lastIconBg != ev.iconBg){
        		 ctrl.lastIconBg = ev.iconBg;
        	 
        	 } else {
        		 ctrl.manageIconBgColor(ev);	        		 
        	 }
        };
          
        this.addEvent = function(timelineEvent) {
        	timelineEvent.align = ctrl.align;
        	  
        	ctrl.manageIconBgColor(timelineEvent);
        	  
        	timelineEvent.index = ctrl.events.push(timelineEvent) - 1;
        	timelineEvent.animatedDelay = timelineEvent.index >= 0 && timelineEvent.index <= 10 ? timelineEvent.index * 100 : 1000;
        	  
        	//even or odd (per la posizione della barra)
        	ctrl.barClass = NumberUtils.isOdd(ctrl.events.length) ? 'ch-timeline-odd': 'ch-timeline-even';
        };
        
        this.removeEvent = function(timelineEvent) {
        	_.pull(ctrl.events, timelineEvent);
        	
        	//even or odd (per la posizione della barra)
        	ctrl.barClass = NumberUtils.isOdd(ctrl.events.length) ? 'ch-timeline-odd': 'ch-timeline-even';
        };
        
        this.registerWatches = function() {
	        $scope.$watch(function() {
	        	return ctrl.hideIcon;
	
	        }, function(newVal,oldVal){
	        	ctrl.hideIcon = _.isBoolean(newVal) ? newVal : false;
	        });
	          
	        $scope.$watch(function() {
	    		return ctrl.align;
	
	        }, function(newVal,oldVal){
	        	ctrl.manageAlign();
	        	  
	        	_.forEach(ctrl.events, function(e){
	        		e.align = newVal;
	        	});
	        });
        };
	}
})();