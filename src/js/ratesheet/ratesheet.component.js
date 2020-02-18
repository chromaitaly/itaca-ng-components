(function() {
    "use strict";
    
    angular.module("itaca.components").component("chRatesheet", {
    	bindings: {
    		startDate: "<",
    		endDate: "<",
    		onDateClosingToggle: "&"
    	},
    	transclude: true,
		controller: RatesheetCtrl,
    	templateUrl: "/tpls/ratesheet/ratesheet.tpl"
    });
    
    /* @ngInject */
    function RatesheetCtrl($scope, $mdMedia, DateUtils) {
    	
    	this.$mdMedia = $mdMedia;
    	
    	var ctrl = this;
    	
    	this.$onInit = function() {
    	};
    	
    	this.$onChanges = function(changesObj) {
    		if (changesObj.startDate || changesObj.endDate) {
    			this.$initDates();
    		}
    	};
    	
    	this.$initDates = function() {
    		var range = moment.range(moment(this.startDate).startOf("day"), moment(this.endDate).startOf("day"));
    		
    		this.$$dates = [];
    		
    		var now = moment();
    		var months = [];
    		
    		Array.from(range.by('day'), function(d) {
    			months.push(d.month());
    			
    			ctrl.$$dates.push({
    				id: d.valueOf(),
    				date: d.toDate(),
    				pastDate: d.isBefore(now, 'day'),
    				hotelClosed: false,
    				roomsClosed: false
    			});
    		});
    		
    		// uniq months
			months = _.uniq(months);
			
			var idx, monthLabel = "";
			
			for (idx in months) {
				var month = moment({month: months[idx], day: 1}).format("MMMM");
				monthLabel += idx > 0 ? " - " + month : month; 
			}
			
			this.$$monthLabel = monthLabel;
    	};
    	
    	this.$toggleDateClosing = function(date) {
//    		if (date) {
//    			date.roomsClosed = !date.roomsClosed;
//    		}
    		
    		// TODO notificare tutte le tipologie
    		
    		this.onDateClosingToggle && this.onDateClosingToggle({$date: date});
    	};
    	
    	this.addRoomTypeRatesheet = function(roomTypeRatesheet) {
    		this.$$roomTypeRatesheets = this.$$roomTypeRatesheets || [];
    		
    		this.$$roomTypeRatesheets.push(roomTypeRatesheet);
    	};
    	
    }
        
})();