(function() {
    "use strict";
    
    angular.module("itaca.components").component("chRoomEditServices", {
    	bindings: {
    		room: "<",
    		nights: "<",
    		services: "<",
    		totalServices: "<",
    		previewSize: "<",
    		peopleAgeRanges: "<",
    		onAdd: "&?",
    		onRemove: "&?",
    		onChange: "&?"
    	},
		controller: RoomEditServicesCtrl,
		templateUrl: "/tpls/room-edit/room-edit-services.tpl"
    });
    
    /* @ngInject */
    function RoomEditServicesCtrl($scope, $translate, $mdMedia, Locale, IconUtils, Dialog, ReservationUtils, DateUtils, NumberUtils){
    	var ctrl = this;
    	
    	this.$mdMedia = $mdMedia;
    	this.$$servicesIcons = IconUtils.serviceIcons();
    	this.Locale = Locale;
    	
    	this.$onInit = function(){
    		if (_.isEmpty(ctrl.totalServices)) {
    			ctrl.totalServices = angular.copy(ctrl.services);
    		}
    		
    		ctrl.previewSize = ctrl.previewSize || _.size(ctrl.totalServices);
    		
    		ctrl.$initWatchers();
    	};
    	
		this.$toggleAllServices = function(show) {
			ctrl.$$showAllServices = !_.isNil(show) && _.isBoolean(show) ? show : !ctrl.$$showAllServices;
		};
		
		this.$onChanges = function(changesObj) {
			if (_.isEmpty(changesObj)) {
				return;
			}
			
			if (changesObj.services || changesObj.totalServices) {
				ctrl.$manageServices();
			}
			
//			if (changesObj.people) {
//				ctrl.$managePeopleLimits();
//			}
		};
		
		this.$managePeopleLimits = function() {
			ctrl.$$peopleLimits = {};
    		ctrl.$$peopleLimits.adults = ctrl.$normalizeRange(ctrl.$$peopleLimits.adults);
    		ctrl.$$peopleLimits.boys = ctrl.$normalizeRange(ctrl.$$peopleLimits.boys);
    		ctrl.$$peopleLimits.children = ctrl.$normalizeRange(ctrl.$$peopleLimits.children);
    		ctrl.$$peopleLimits.kids = ctrl.$normalizeRange(ctrl.$$peopleLimits.kids);
    		
    		var totalPeople = ReservationUtils.totalPeople(ctrl.room.people, ctrl.room.extraPeople);
    		
    		ctrl.$$peopleLimits.adults.max = totalPeople.adults;
    		ctrl.$$peopleLimits.boys.max = totalPeople.boys;
    		ctrl.$$peopleLimits.children.max = totalPeople.children;
    		ctrl.$$peopleLimits.kids.max = totalPeople.kids;
		};
		
		this.$normalizeRange = function(range) {
    		if (!range) {
    			range = {};
    		}
    		
    		range.min = range.min || 0;
    		
    		return range;
    	};
		
		this.$manageServices = function() {
			_.forEach(ctrl.totalServices, function(service) {
				service.$$editable = service.maxCount > 1 || service.paymentType == "PER_PERSON";
				service.$$editing = false;
				
				service.$$serviceSold = _.find(ctrl.services, function(serviceSold) {
					return serviceSold.service.type.nameKey == service.type.nameKey
				});
				
				if (service.paymentType == "PER_PERSON") {
					var bestOpt = _.minBy(service.paymentOptions, "amount.finalAmount")
					if (bestOpt) {
						service.$$bestPrice = bestOpt.amount.finalAmount;
					}
				}
			});
    	};
    	
    	this.$addService = function(service) {
    		if (service.$$serviceSold) {
    			// già prenotato
    			return false;
    		}
    		
    		if(service.paymentType != "PER_PERSON" && service.maxCount <= 1){
    			ctrl.$doAddService(ctrl.$createServiceSold(service));
    			
    		} else {
    			service.$$editing = true;
    			ctrl.$editService(service);
    		}    		
    	};
		
		this.$createServiceSold = function(service, people, count) {
			service.uid = service.uid || NumberUtils.uniqueNumber();
			var people = ReservationUtils.peopleByMax(people || ReservationUtils.totalPeople(ctrl.room.people, ctrl.room.extraPeople), service.people);
			var serviceSold = ReservationUtils.serviceSold(service, people, ReservationUtils.availableNights(ctrl.room.totalRate.startDate, ctrl.room.totalRate.endDate), count);
			serviceSold.uid = service.uid;
			return serviceSold;
		};
		
		this.$doAddService = function(serviceSold) {
			if (!_.isArray(ctrl.services)) {
				ctrl.services = [];
			}
			ctrl.services.push(serviceSold);
			ctrl.onAdd && ctrl.onAdd({$service: serviceSold});
		};
		
		this.$editService = function(service) {
			if (!service) {
				return false;
			}
			
			// adeguo people limits
			ctrl.$managePeopleLimits();
			
			service.$$editing = true;
			service.uid = service.uid || NumberUtils.uniqueNumber();
			if (service.$$serviceSold) {
				ctrl.$$editingService = ctrl.$createServiceSold(service, service.$$serviceSold.people, service.$$serviceSold.count);
			
			} else {
				ctrl.$$editingService = ctrl.$createServiceSold(service);
			}
			ctrl.$$editingService.uid = service.uid;
		};
		
		this.$confirmServiceEdit = function(editedServiceSold) {
			var serviceSold = _.find(ctrl.services, ["uid", editedServiceSold.uid]);
			var edited = false;
			
			if (serviceSold) {
				_.assign(serviceSold, ctrl.$createServiceSold(editedServiceSold.service, editedServiceSold.people, editedServiceSold.count))
				
				ctrl.onChange && ctrl.onChange({$service: serviceSold});				
				edited = true;
			
			} else {
				ctrl.$doAddService(editedServiceSold);
				edited = false;
			}
			
			editedServiceSold.$$editing = false;
			ctrl.$$editingService = undefined;
			ctrl.$manageServices();
			
			return edited;
		};
		
		this.$cancelServiceEdit = function(editedServiceSold) {
			var serviceSold = _.find(ctrl.services, ["uid", editedServiceSold.uid]);
			if (serviceSold) {
				serviceSold.$$editing = false;
			
			} else {
				editedServiceSold.$$editing = false;
			}
			
			ctrl.$$editingService = undefined;
			ctrl.$manageServices();
		};
		
		this.$removeService = function(serviceSold){
			var removed = serviceSold;
			
			if (_.includes(ctrl.services, serviceSold)) {
				_.pull(ctrl.services, serviceSold); 
			
			} else {
				removed = _.remove(ctrl.services, function(s){
					return s.service.uid && s.service.uid == (serviceSold.service || serviceSold).uid;
				});
			}
			
			if (!_.isNil(removed)) {
				ctrl.onRemove && ctrl.onRemove({$service: !_.isArray(removed) ? removed : _.size(removed) == 1 ? removed[0] : removed});
			}
		};
		
		this.$showServiceInfo = function(ev, service){
			// se contiene "service" è un serviceSold
			var s = (service.service || service);
			var title = s.type.nameKey;
			var desc =  s.type.descriptionKey;

			$translate([title, desc]).then(function(messages) {
				var description = messages[desc];
				
				var currentLang = ctrl.Locale.current();
				
				if (currentLang && s.description && s.description[currentLang.iso]) {
					description =  s.description[currentLang.iso];
				}
				
				Dialog.showAlertHtml(ev, messages[title], description);
			});
		};
		
		this.$initWatchers = function() {
			$scope.$watchCollection(function() {
				return ctrl.services;
				
			}, function(newVal, oldVal) {
				ctrl.$manageServices();
			});
			
			$scope.$watchCollection(function() {
				return ctrl.room.people;
				
			}, function(newVal, oldVal) {
				ctrl.$managePeopleLimits();
			});
			
			$scope.$watchCollection(function() {
				return ctrl.room.extraPeople;
				
			}, function(newVal, oldVal) {
				ctrl.$managePeopleLimits();
			});
		};
    }
})();