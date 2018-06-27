(function() {
    'use strict';
    
    angular.module("itaca.components").component("chPlanning", {
    	transclude: true,
    	bindings: {
    		rooms: "<",
    		reservations: "<",
    		view: "<?",
    		startDate: "<?"
    	},
		controller: PlanningCtrl,
		templateUrl: "/tpls/planning/planning.tpl"
    });
    
    /* @ngInject */
    function PlanningCtrl($scope, InfinitePaging){
    	var ctrl = this;
    	
    	this.$onInit = function(){
    	};
    	
    	this.$onChanges = function(changesObj) {
    		if (changesObj.rooms) {
    			ctrl.$initRooms();
    		}
    		
    		if (changesObj.startDate) {
    			ctrl.$setStartDate(ctrl.startDate);
    		}
    		
    		if (changesObj.view) {
    			ctrl.$setView(ctrl.view);
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
    	};
    	
    	this.$setStartDate = function(date) {
    		ctrl.$$startDate = angular.isDate(date) ? date : (moment.isMoment(date) && date.isValid() ? date.toDate() : moment().startOf("day").toDate());
    		
    		if (ctrl.$$currentView == "W") {
    			ctrl.$$endDate = moment(ctrl.$$startDate).add(7, "days").toDate();
    		}
    		
    		ctrl.$createDates();
    	};
    	
    	this.$createDates = function() {
			ctrl.$$loading = true;
			
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
			
			var idx, monthLabel = "";
			for (idx in months) {
				var month = moment({month: months[idx], day: 1}).format("MMMM");
				monthLabel += idx > 0 ? " - " + month : month; 
			}
			
			ctrl.$$monthLabel = monthLabel;
			
			ctrl.$$loading = false;
		};
    }
})();