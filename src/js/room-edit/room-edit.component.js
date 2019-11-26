(function() {
    'use strict';
    
    angular.module("itaca.components").component("chRoomEdit", {
    	bindings: {
    		room: "<",
    		reservation:"<",
    		nights: "<?",
    		storageUrl: "<?",
    		title: "@",
    		localeIso: "<",
    		onRemove: "&?",
    		city: "@",
    		offset: "@",
    		legalAge: "<?",
    		peopleLimits: "<",
    		peopleAgeRanges: "<",
    		showConfig: "<?",
    		onToggleConfig: "&?",
    		onPeopleChange: "&?",
    		onExtraPeopleChange: "&?",
    		onBedAdd: "&?",
    		onBedRemove: "&?",
    		onBedChange: "&?",
    		onExtraBedAdd: "&?",
    		onExtraBedRemove: "&?",
    		onExtraBedChange: "&?",
    		onServiceAdd: "&?",
    		onServiceRemove: "&?",
    		onServiceChange: "&?",
    	},
		controller: RoomEditCtrl,
		templateUrl: "/tpls/room-edit/room-edit.tpl"
    });
    
    /* @ngInject */
    function RoomEditCtrl($scope, $mdMedia, $translate, IconUtils, NumberUtils, Dialog, ReservationUtils, Navigator){
    	var ctrl = this;
    	
    	this.$mdMedia = $mdMedia;
    	this.$$servicesIcons = IconUtils.serviceIcons();
    	
    	this.$onInit = function(){
    		ctrl.$$index = NumberUtils.uniqueNumber(); 
    		ctrl.$calculateTotalAmount();
    		ctrl.$getCover();
    		ctrl.$getPromo();
    		ctrl.$managePeople(ctrl.room.people, ctrl.room.extraPeople);
    		ctrl.$insertIncludedServices();
    		ctrl.$getFreeServices();    		
    		ctrl.$getPaymentServices();
    		    		
    		if (!_.isEmpty(ctrl.room.otherBeds)) {
    			ctrl.$toggleExtraBeds(true);
    		}
    		
    		if (!_.isEmpty(ctrl.room.identityDocuments)) {
    			ctrl.$toggleIdentityDocuments(true);
    		}
    	};
    	
    	this.$getCover = function(){
    		var roomImage = '/resources/public/img/no-gallery-image.png';
    		
    		_.forEach(ctrl.room.type.gallery, function(photo, index, collection) {
    			if (index == 0) {
    				roomImage = ctrl.storageUrl + photo.path;
    			}	
    			
    			if (photo.cover) {
    				roomImage = ctrl.storageUrl + photo.path;
    				return;
    			}				
    		});
    		
    		ctrl.$$roomImage = roomImage;
    	};
    	
    	this.$getPromo = function() {
			if (!_.isEmpty(ctrl.room.totalRate.promotions)) {
				ctrl.$$promotion = ctrl.room.totalRate.promotions[0];
			}		
		};
    	
    	this.$removeRoom = function(ev) {
    		ctrl.onRemove && ctrl.onRemove({$event: ev, $room: ctrl.room}); 
    	};
    	
    	this.$openGallery = function(ev){
			if (!_.isEmpty(ctrl.room.type.gallery)) {
				$translate([ctrl.room.type.roomType.nameKey, "room.category."+ctrl.room.type.category]).then(function(translations) {
					var title = translations[ctrl.room.type.roomType.nameKey] + "&nbsp;<small>(" + translations["room.category."+ctrl.room.type.category].toUpperCase() + ")</small>";
					
					Dialog.showGallery(ev, title, _.sortBy(ctrl.room.type.gallery, [function(o){ return +Boolean(o.cover)}]), {storageUrl: ctrl.storageUrl});
				});
			}
		};
		
		this.$calculateTotalAmount = function() {
			ReservationUtils.calculateRoomTotalPrice(ctrl.room);
		};
		
		this.$getIncludedServices = function() {
			ctrl.$$includedServices = _.filter(ctrl.room.type.services, ['bookability', 'INCLUDED']);
		};
		
		this.$getFreeServices = function() {
			ctrl.$$freeServices = _.filter(ctrl.room.type.services, function(service){
				return service.bookability == 'BOOKABLE' && service.paymentType == 'FREE';
			});
		};
		
		this.$getPaymentServices = function() {
			ctrl.$$paymentServices = _.filter(ctrl.room.type.services, function(service){
				return service.bookability == 'BOOKABLE' && service.paymentType != 'FREE';
			});
		};
		
		this.$getBookedServices = function() {
			ctrl.$$bookedServices = {
				payment: _.filter($scope.room.services, function(serviceSold){
					return !serviceSold.included && serviceSold.amount.finalAmount > 0;
				}),
				free: _.filter($scope.room.services, function(serviceSold){
					return !serviceSold.included && serviceSold.amount.finalAmount <= 0;
				})
			};
			ctrl.$$bookedServices.length =  (ctrl.$$bookedServices.length + ctrl.$$bookedServices.free.length);
		};
		
		this.$insertIncludedServices = function() {
			if (!_.isArray(ctrl.room.services)) {
				ctrl.room.services = [];
			}
			
			if (!ctrl.$$includedServices) {
				ctrl.$getIncludedServices();
			}
			
			_.forEach(ctrl.includedServices, function(service) {
				var exists = _.some(ctrl.room.services, function(value) {
					return value.service.id == service.id;
				});
				
				// se non esiste lo aggiungo
				if (!exists) {
					ctrl.room.services.push(ctrl.createServiceSold(service));
				}				
			});
		};
		
		this.$createServiceSold = function(service, people, count) {
			return ReservationUtils.serviceSold(service, people || ctrl.room.people, ReservationUtils.availableNights(ctrl.room.totalRate.startDate, ctrl.room.totalRate.endDate), count);
		};
		
		this.$toggleRoomConfig = function(show) {
			ctrl.showConfig = !_.isNil(show) && _.isBoolean(show) ? show : !ctrl.showConfig;
    		
    		if (ctrl.showConfig) {
    			Navigator.scrollToAnchor('ch-room-edit-'+ctrl.$$index+'-config');
    		}
    		
    		ctrl.onToggleConfig && ctrl.onToggleConfig({$room: ctrl.room, $open: ctrl.showConfig});
		};
		
		this.$toggleIncludedServices = function(show) {
			ctrl.$$showIncluedServices = !_.isNil(show) && _.isBoolean(show) ? show : !ctrl.$$showIncluedServices;
		};
		
		this.$managePeople = function(people, extraPeople) {
			ctrl.$$guestsCount = ReservationUtils.guestsCount(people, extraPeople);
		};
		
		this.$manageServices = function() {
			_.forEach(ctrl.room.services, function(roomSold) {
				
			});
		};
		
		this.$onPeopleChange = function(people) {
			ctrl.room.people = people;
			ctrl.$managePeople(ctrl.room.people, ctrl.room.extraPeople);
			ctrl.onPeopleChange && ctrl.onPeopleChange({$people: people});
		};
		
		this.$onExtraPeopleChange = function(people) {
			ctrl.room.extraPeople = people;
			ctrl.$managePeople(ctrl.room.people, ctrl.room.extraPeople);
			ctrl.onExtraPeopleChange && ctrl.onExtraPeopleChange({$people: people});
		};
		
		this.$onBedAdd = function(bed) {
			ctrl.onBedAdd && ctrl.onBedAdd(bed);
		};
		
		this.$onBedRemove = function(bed) {
			ctrl.onBedRemove && ctrl.onBedRemove(bed);
		};
		
		this.$onBedChange = function(bed) {
			ctrl.onBedChange && ctrl.onBedChange(bed);
		};
		
		this.$onExtraBedAdd = function(bed) {
			ctrl.$onExtraPeopleChange(ReservationUtils.peopleByBeds(ctrl.room.otherBeds));
			ctrl.onExtraBedAdd && ctrl.onExtraBedAdd(bed);
		};
		
		this.$onExtraBedRemove = function(bed) {
			ctrl.$onExtraPeopleChange(ReservationUtils.peopleByBeds(ctrl.room.otherBeds));
			ctrl.onExtraBedRemove && ctrl.onExtraBedRemove(bed);
		};
		
		this.$onExtraBedChange = function(bed) {
			ctrl.$onExtraPeopleChange(ReservationUtils.peopleByBeds(ctrl.room.otherBeds));
			ctrl.onExtraBedChange && ctrl.onExtraBedChange(bed);
		};
		
		this.$onServiceAdd = function(service) {
			ctrl.onServiceAdd && ctrl.onServiceAdd(service);
		};
		
		this.$onServiceRemove = function(service) {
			ctrl.onServiceRemove && ctrl.onServiceRemove(service);
		};
		
		this.$onServiceChange = function(service) {
			ctrl.onServiceChange && ctrl.onServiceChange(service);
		};
		
		this.$onToggleBedsConfig = function(open) {
			ctrl.$$bedsConfig = _.isBoolean(open) ? open : false;
		};
		
		this.$toggleExtraBeds = function(show) {
			ctrl.$$showExtraBeds = !_.isNil(show) && _.isBoolean(show) ? show : !ctrl.$$showExtraBeds;
    		
    		ctrl.$$showExtraBeds &&	Navigator.scrollToAnchor('ch-room-edit-'+ctrl.$$index+'-config-extra-beds');
		};
		
		this.$onToggleExtraBedsConfig = function(open) {
			ctrl.$$extraBedsConfig = _.isBoolean(open) ? open : false;
			
			!ctrl.$$extraBedsConfig && _.isEmpty(ctrl.room.otherBeds) && ctrl.$toggleExtraBeds(false);
		};
		
		this.$toggleIdentityDocuments = function(show) {
			ctrl.$$showIdentityDocuments = !_.isNil(show) && _.isBoolean(show) ? show : !ctrl.$$showIdentityDocuments;
    		
    		ctrl.$$showIdentityDocuments &&	Navigator.scrollToAnchor('ch-room-edit-'+ctrl.$$index+'-config-documents');
		};
    }
})();