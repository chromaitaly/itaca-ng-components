(function() {
    'use strict';
    
    angular.module("itaca.components").component("chRoomEditBeds", {
    	bindings: {
    		room: "<",
    		nights: "<",
    		beds: "<",
    		totalBeds: "<",
    		minCount: "<",
    		maxCount: "<",
    		peopleAgeRanges: "<",
    		configBed: "<",
    		onToggleConfig: "&?",
    		onAdd: "&?",
    		onRemove: "&?",
    		onChange: "&?"
    	},
		controller: RoomEditBedsCtrl,
		templateUrl: "/tpls/room-edit/room-edit-beds.tpl"
    });
    
    /* @ngInject */
    function RoomEditBedsCtrl($scope, $translate, $mdMedia, Dialog, ReservationUtils, DateUtils, NumberUtils){
    	var ctrl = this;
    	
    	this.$mdMedia = $mdMedia;
    	
    	this.$onInit = function(){
    		ctrl.configBed = _.isBoolean(ctrl.configBed) ? ctrl.configBed : false;
    		
    		// se i letti sono vuoti, apro direttamente i dettagli
    		_.isEmpty(ctrl.beds) && ctrl.$toggleDetails(true);
    		
    		ctrl.$checkLimits();
    		ctrl.$initWatchers();
    	};
    	
		this.$toggleDetails = function(show) {
			ctrl.$$showDetails = !_.isNil(show) && _.isBoolean(show) ? show : !ctrl.$$showDetails;
			
			ctrl.onToggleConfig && ctrl.onToggleConfig({$open: ctrl.$$showDetails});
			ctrl.$manageBeds();
			ctrl.$$editingBed = undefined;
		};
		
		this.$onChanges = function(changesObj) {
			if (_.isEmpty(changesObj)) {
				return;
			}
			
			if (changesObj.totalBeds || changesObj.maxCount) {
				ctrl.$manageBeds();
			}
		};
		
		this.$managePeopleLimits = function() {
			ctrl.$$peopleLimits = ctrl.$$peopleLimits || {};
    		ctrl.$$peopleLimits.adults = ctrl.$normalizeRange(ctrl.$$peopleLimits.adults);
    		ctrl.$$peopleLimits.boys = ctrl.$normalizeRange(ctrl.$$peopleLimits.boys);
    		ctrl.$$peopleLimits.children = ctrl.$normalizeRange(ctrl.$$peopleLimits.children);
    		ctrl.$$peopleLimits.kids = ctrl.$normalizeRange(ctrl.$$peopleLimits.kids);
    		
    		ctrl.$$peopleLimits.adults.max = ctrl.room.people.adults;
    		ctrl.$$peopleLimits.boys.max = ctrl.room.people.boys;
    		ctrl.$$peopleLimits.children.max = ctrl.room.people.children;
    		ctrl.$$peopleLimits.kids.max = ctrl.room.people.kids;
		};
		
		this.$normalizeRange = function(range) {
    		if (!range) {
    			range = {};
    		}
    		
    		range.min = range.min || 0;
    		
    		return range;
    	};
		
		this.$manageBeds = function() {
    		ctrl.$$availableBeds = ReservationUtils.bedsAvailability(ctrl.totalBeds, ctrl.beds, ctrl.maxCount, !ctrl.configBed);
    		ctrl.$$preselectedBeds = _.filter(ctrl.$$availableBeds, ['$$available', false]);
    		ctrl.$checkLimits();
    	};
    	
    	this.$selectBed = function(bed) {
    		if (!bed.$$available || bed.$$blocked) {
    			return false;
    		}
    		
    		if (!ctrl.configBed) {
    			if (ctrl.beds.length <= ctrl.maxCount){
    				ctrl.$doAddBed(ctrl.$createBedSold(bed));
    				return true;
    			}
    			
    			return false;
    		
    		} else {
    			bed.$$editing = true;
    			ctrl.$editBed(ctrl.$createBedSold(bed));
    		}    		
    	};
		
		this.$createBedSold = function(bed, people) {
			var people = ReservationUtils.peopleByMax(people || ctrl.room.people, bed.people, bed.maxPerson);
			var bedSold = ReservationUtils.bedSold(bed, people, ReservationUtils.availableNights(ctrl.room.totalRate.startDate, ctrl.room.totalRate.endDate), ctrl.room.totalRate.amount.vatRate);
			bedSold.uid = bedSold.uid || NumberUtils.uniqueNumber();
			return bedSold;
		}
		
		this.$doAddBed = function(bedSold) {
			if (!_.isArray(ctrl.beds)) {
				ctrl.beds = [];
			}
			ctrl.beds.splice(0, 0, bedSold);
			ctrl.onAdd && ctrl.onAdd({$bed: bedSold});
		};
		
		this.$editBed = function(bedSold) {
			if (!ctrl.configBed) {
				return false;
			}
			
			bedSold.$$editing = true;
			bedSold.uid = bedSold.uid || NumberUtils.uniqueNumber();
			ctrl.$$editingBed = ctrl.$createBedSold(bedSold.bed, bedSold.people);
			ctrl.$$editingBed.uid = bedSold.uid;
		};
		
		this.$confirmBedEdit = function(editedBedSold) {
			var bedSold = _.find(ctrl.beds, ["uid", editedBedSold.uid]);
			var edited = false;
			
			if (bedSold) {
				_.assign(bedSold, ctrl.$createBedSold(editedBedSold.bed, editedBedSold.people))
				
				ctrl.onChange && ctrl.onChange({$bed: bedSold});				
				edited = true;
			
			} else {
				ctrl.$doAddBed(editedBedSold);
				edited = false;
			}
			
			editedBedSold.$$editing = false;
			ctrl.$$editingBed = undefined;
			ctrl.$manageBeds();
			
			return edited;
		};
		
		this.$cancelBedEdit = function(editedBedSold) {
			var bedSold = _.find(ctrl.beds, ["uid", editedBedSold.uid]);
			if (bedSold) {
				bedSold.$$editing = false;
			
			} else {
				editedBedSold.$$editing = false;
			}
			
			ctrl.$$editingBed = undefined;
			ctrl.$manageBeds();
		};

		this.$removeBed = function(bedSold){
			var removed = bedSold;
			
			if (_.includes(ctrl.beds, bedSold)) {
				_.pull(ctrl.beds, bedSold); 
			
			} else {
				removed = _.remove(ctrl.beds, function(b){
					return b.bed.uid && b.bed.uid == (bedSold.bed || bedSold).uid;
				});
			}
			
			if (!_.isNil(removed)) {
				ctrl.onRemove && ctrl.onRemove({$bed: !_.isArray(removed) ? removed : _.size(removed) == 1 ? removed[0] : removed});
			}
		};
		
		this.$showBedInfo = function(ev, bed){
			// se contiene 'bed' è un bedSold
			var type = (bed.bed || bed).type;
			var title = 'bed.'+ type;
			var desc =  'bed.'+ type +'.description';
			
			$translate([title, desc]).then(function(messages) {
				Dialog.showAlert(ev, messages[title],  messages[desc]);
			});
		};
		
		this.$checkLimits = function() {
			if (_.isNil(ctrl.minCount) || _.size(ctrl.beds) >= ctrl.minCount) {
				ctrl.$$errors = ctrl.$$errors || {};
				ctrl.$$errors.min = false;
			} else {
				ctrl.$$errors = ctrl.$$errors || {};
				ctrl.$$errors.min = true;
			}
			
			if (_.isNil(ctrl.maxCount) || _.size(ctrl.beds) <= ctrl.maxCount) {
				ctrl.$$errors = ctrl.$$errors || {};
				ctrl.$$errors.max = false;
			} else {
				ctrl.$$errors = ctrl.$$errors || {};
				ctrl.$$errors.max = true;
			}
		};
		
		this.$confirm = function() {
			ctrl.$checkLimits();
			!ctrl.$$errors.min && !ctrl.$$errors.max &&	ctrl.$toggleDetails(false);
		};
		
		this.$initWatchers = function() {
			$scope.$watchCollection(function() {
				return ctrl.beds;
				
			}, function(newVal, oldVal) {
				if (_.isEqual(newVal, oldVal)) {
					return;
				}
				
				ctrl.$manageBeds();
			});
			
			$scope.$watchCollection(function() {
				return ctrl.room.people;
				
			}, function(newVal, oldVal) {
				ctrl.$managePeopleLimits();
			});
		};
    }
})();