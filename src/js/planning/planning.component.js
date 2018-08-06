(function() {
    'use strict';
    
    angular.module("itaca.components").component("chPlanning", {
    	transclude: true,
    	bindings: {
    		rooms: "<",
    		planning: "<", // planning per camera {<id_camera>: <planning_camera>}
    		settings: "<",
//    		view: "<?",
    		startDate: "<?",
    		hideLegend: "<?",
    		sourcePortalLabel: "@",
    		onPeriodChange: "&?",
			onViewChange: "&?",
			onOpenRoom: "&?",
			onCloseRoom: "&?",
			onViewRates: "&?",
			onReservationClick: "&?",
			onOverbookingClick: "&?"
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
    		ctrl.$setView(ctrl.view, true);
    		ctrl.$setStartDate(ctrl.startDate);
    		ctrl.$initLegend();
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
    		
    		if (changesObj.planning && !changesObj.planning.isFirstChange()) {
    			ctrl.$initLegend();
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
    	
    	this.$initLegend = function() {
    		ctrl.$$currentReservationSources = [];
    		ctrl.$$isOverbookings = false;
    		
    		_.forEach(_.values(ctrl.planning), function(roomPlanning) {
    			_.forEach(roomPlanning, function(datePlanning) {
    				// aggiungo source della prenotazione attiva
    				datePlanning.active && datePlanning.active.reservation && ctrl.$$currentReservationSources.push(datePlanning.active.reservation.source);
    				// aggiungo source degli overbbokings
    				_.forEach(datePlanning.overbookings, function(overbooking) {
    					if (overbooking.reservation) {
    						ctrl.$$currentReservationSources.push(overbooking.reservation.source);
	    					ctrl.$$isOverbookings = true;
    					}
    				});
    			});
    		});
    		
    		ctrl.$$currentReservationSources = _.uniq(ctrl.$$currentReservationSources);
    	};
    	
    	this.$setView = function(type, noRefresh) {
    		ctrl.$$currentView = _.includes(["D", "W", "M"], type) ? type : "W";
    		!noRefresh && ctrl.$setStartDate(ctrl.$$startDate);
    		ctrl.onViewChange && ctrl.onViewChange({$view: ctrl.$$currentView});
    	};
    	
    	this.$setStartDate = function(date, noRefresh) {
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
    		
    		ctrl.$$isPastDates = moment(ctrl.$$startDate).isBefore(moment(), "day");
    		
    		if (!noRefresh) {
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