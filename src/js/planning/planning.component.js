(function() {
    'use strict';
    
    angular.module("itaca.components").component("chPlanning", {
    	transclude: true,
    	bindings: {
    		rooms: "<",
    		planning: "<", // planning per camera {<id_camera>: <planning_camera>}
    		view: "<?",
    		startDate: "<?",
    		hideLegend: "<?",
    		onPeriodChange: "&?",
			onViewChange: "&?",
			onOpenRoom: "&?",
			onCloseRoom: "&?",
			onViewRates: "&?",
			onReservationClick: "&?",
			onOverbookingsClick: "&?"
    	},
		controller: PlanningCtrl,
		templateUrl: "/tpls/planning/planning.tpl"
    });
    
    /* @ngInject */
    function PlanningCtrl($scope, $q, $mdMedia, InfinitePaging){
    	var ctrl = this;
    	
    	this.$mdMedia = $mdMedia;
    	
    	this.$$actionInProgress = false;
    	
    	this.$onInit = function(){
    		ctrl.$initRooms();
    		ctrl.$setView(ctrl.view);
    		ctrl.$setStartDate(ctrl.startDate);
    	};
    	
    	this.$onChanges = function(changesObj) {
    		if (changesObj.rooms && !changesObj.rooms.isFirstChange()) {
    			ctrl.$initRooms();
    		}
    		
    		if (changesObj.view && !changesObj.view.isFirstChange()) {
    			ctrl.$setView(ctrl.view);
    		}
    		
    		if (changesObj.startDate && !changesObj.startDate.isFirstChange()) {
    			ctrl.$setStartDate(ctrl.startDate);
    		}
    	};
    	
    	this.$initRooms = function() {
    		if (_.isArray(ctrl.rooms)) {
    			ctrl.$$roomsType = "1";
    			
			} else if (_.isObjectLike(ctrl.rooms) && ctrl.rooms instanceof InfinitePaging) {
				ctrl.$$roomsType = "2";
				ctrl.rooms.reset();
			
			} else {
				throw new Error("Rooms must be an array or an instance of InfinitePaging");
			}
    	};
    	
    	this.$setView = function(type) {
    		ctrl.$$currentView = _.includes(["D", "W", "M"], type) ? type : "W";
    		ctrl.$setStartDate(ctrl.$$startDate);
    		ctrl.onViewChange && ctrl.onViewChange({$view: ctrl.$$currentView});
    	};
    	
    	this.$setStartDate = function(date, notRefresh) {
    		date = angular.isDate(date) ? date : (moment.isMoment(date) && date.isValid() ? date.toDate() : moment().startOf("day").toDate());
    		
    		var m = moment(date).startOf("day");
    		
    		switch (ctrl.$$currentView) {
    		case "D":
    			ctrl.$$startDate = ctrl.$$startDate && m.isSame(ctrl.$$startDate, "days") ? ctrl.$$startDate : m.toDate();
    			ctrl.$$endDate = moment(date).endOf("day").toDate();
    			break;    		
    		case "W":
    			ctrl.$$startDate = ctrl.$$startDate && m.isSame(ctrl.$$startDate, "days") ? ctrl.$$startDate : m.toDate();
    			ctrl.$$endDate = moment(date).add(6, "days").toDate();
    			break;
    		case "M":
    			ctrl.$$startDate = ctrl.$$startDate && m.startOf("month").isSame(ctrl.$$startDate, "days") ? ctrl.$$startDate : m.toDate();
	    		ctrl.$$endDate = moment(date).endOf("month").toDate();
				break;
    		}
    		
    		if (!notRefresh) {
    			ctrl.$$actionInProgress = true;
    			ctrl.$createDates();
    			
    			if (ctrl.onPeriodChange) {
    				$q.when(ctrl.onPeriodChange({$start: ctrl.$$startDate, $end: ctrl.$$endDate})).finally(function() {
	    				ctrl.$$actionInProgress = false;
    				});
    				
    			} else {
    				ctrl.$$actionInProgress = false;
    			}
    		}
    	};
    	
    	this.$createDates = function() {
			ctrl.$$loading = true;
			
			ctrl.$$today = moment().startOf("day").toDate();
			
			// periodo
			var range = moment.range(moment(ctrl.$$startDate), moment(ctrl.$$endDate));
			
			var viewDates = [];
			
			Array.from(range.by('days'), function(m) {
				var d = m.toDate();
				this.push({
					uid: d.getTime(), 
					date: d,
					isPast: m.isBefore(moment(), "days"),
					hotelStatus: null
				});
				
			}, viewDates);
			
			ctrl.$$viewDates = viewDates;
			
			// carico stato hotel per ogni giorno (asynch)
//			$timeout(ctrl.$insertHotelStatus);
			
			ctrl.$$loading = false;
		};
		
		this.$getSelectedMonths = function() {
			ctrl.$setStartDate(ctrl.$$startDate, true);
			
			var range = moment.range(moment(ctrl.$$startDate), moment(ctrl.$$endDate));
			
			var months = [];
			
			Array.from(range.by("days"), function(m) {
				this.push(m.month());
			}, months);
			
			return _.uniq(months);
		};
    }
})();