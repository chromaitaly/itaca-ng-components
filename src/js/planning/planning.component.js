(function() {
    'use strict';
    
    angular.module("itaca.components").component("chPlanning", {
    	transclude: true,
    	bindings: {
    		rooms: "<",
    		reservations: "<", // mappa di prenotazioni per camera {<id_camera>: <lista_prenotazioni>}
    		view: "<?",
    		startDate: "<?",
    		hideLegend: "<?",
    		onPeriodChange: "&"
    	},
		controller: PlanningCtrl,
		templateUrl: "/tpls/planning/planning.tpl"
    });
    
    /* @ngInject */
    function PlanningCtrl($scope, $mdMedia, InfinitePaging){
    	var ctrl = this;
    	
    	this.$mdMedia = $mdMedia;
    	
    	this.$onInit = function(){
    		ctrl.$initRooms();
    		ctrl.$setView(ctrl.view);
    		ctrl.$setStartDate(ctrl.startDate);
    	};
    	
    	this.$onChanges = function(changesObj) {
    		if (changesObj.rooms) {
    			ctrl.$initRooms();
    		}
    		
    		if (changesObj.view) {
    			ctrl.$setView(ctrl.view);
    		}
    		
    		if (changesObj.startDate) {
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
    	};
    	
    	this.$setStartDate = function(date, notRefresh) {
    		date = angular.isDate(date) ? date : (moment.isMoment(date) && date.isValid() ? date.toDate() : moment().startOf("day").toDate());
    		
    		switch (ctrl.$$currentView) {
    		case "D":
    			ctrl.$$startDate = date;
    			ctrl.$$endDate = moment(date).endOf("day").toDate();
    			break;    		
    		case "W":
    			ctrl.$$startDate = date;
    			ctrl.$$endDate = moment(date).add(6, "days").toDate();
    			break;
    		case "M":
    			ctrl.$$startDate = moment(date).startOf("month").toDate();
	    		ctrl.$$endDate = moment(date).endOf("month").toDate();
				break;
    		}
    		
    		if (!notRefresh) {
    			ctrl.$createDates();
    			ctrl.onPeriodChange && ctrl.onPeriodChange({$start: ctrl.$$startDate, $end: ctrl.$$endDate})
    		}
    	};
    	
    	this.$createDates = function() {
			ctrl.$$loading = true;
			
			ctrl.$$today = moment().startOf("day").toDate();
			
			// periodo
			var range = moment.range(moment(ctrl.$$startDate), moment(ctrl.$$endDate));
			
			var months = [];
			var viewDates = [];
			
			Array.from(range.by('days'), function(m) {
				months.push(m.month());
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
			
			// uniq months
			months = _.uniq(months);
			
			var monthLabel = "";
			_.forEach(months, function(month, idx) {
				var month = moment({month: months[idx], day: 1}).format("MMMM");
				monthLabel += idx > 0 ? " - " + month : month;
			});
			
			ctrl.$$multiMonths = _.size(months) > 1;
			ctrl.$$monthLabel = monthLabel;
			
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