(function() {
	'use strict';
	
	angular.module("itaca.components").component("chBookingForm", {
		bindings: {
    		reservation: "<",
    		requestPeople: "<",
    		minDate: "<?",
    		maxRange: "<?",
    		step: "<?",
    		currentCurrency: "<?",
    		hotelCurrency: "<?",
    		roomVatRate: "<?",
    		hotelCityTax: "<?",
    		onDateChanged: "&?",
    		onSearch: "&?",
    		onNext: "&?"
		},
		controller: BookingFormCtrl,
		templateUrl: "/tpls/booking-form/booking-form.tpl"
	});
	
	 /* @ngInject */
	function BookingFormCtrl($scope, $mdMedia, $timeout, DateUtils, ReservationUtils) {
		var ctrl = this;
		
		this.$mdMedia = $mdMedia;
		
		this.$onInit = function() {
			ctrl.minDate = _.isDate(ctrl.minDate) ? ctrl.minDate : _.isBoolean(ctrl.minDate) && ctrl.minDate ? DateUtils.absoluteDate() : null; 
			ctrl.reservation = ctrl.reservation || {}; 
			ctrl.step = !_.isNil(ctrl.step) ? parseInt(ctrl.step) : 0;
			ctrl.currentCurrency = ctrl.currentCurrency || "EUR";
			ctrl.hotelCurrency = ctrl.hotelCurrency || "EUR";
			ctrl.$initWatchers();
		};

		this.$next = function() {
			ctrl.onNext && ctrl.onNext();
		};
		
		this.$checkMinEndDate = function() {
			if (!ctrl.reservation.checkin) return;
			
			var start = DateUtils.absoluteMoment(ctrl.reservation.checkin);
			var minEnd = DateUtils.absoluteMoment(start).add(1, "days");
			ctrl.$$minEndDate = minEnd.toDate();
			var maxEnd = DateUtils.absoluteMoment(start).add(ctrl.maxRange, "days")
			ctrl.$$maxEndDate = maxEnd.toDate();
			
			if (!ctrl.reservation.checkout || DateUtils.absoluteMoment(ctrl.reservation.checkout).isBefore(minEnd, "day")) {
				ctrl.reservation.checkout = angular.copy(ctrl.$$minEndDate);
			
			} else if (ctrl.reservation.checkout && DateUtils.absoluteMoment(ctrl.reservation.checkout).isAfter(maxEnd, "day")) {
				ctrl.reservation.checkout = angular.copy(ctrl.$$maxEndDate);
			}
		};
		
		this.$calculateNights = function() {
			ctrl.reservation.nights = DateUtils.absoluteMoment(ctrl.reservation.checkout).diff(DateUtils.absoluteMoment(ctrl.reservation.checkin), 'days');
		};
		
		this.$search = function() {
			ctrl.onSearch && ctrl.onSearch({checkin: ctrl.reservation.checkin, checkout: ctrl.reservation.checkout, nights: ctrl.reservation.nights, people: ctrl.reservation.people});
		};
		
		this.$countRemainingPeople = function() {
//			var currentPeople = ReservationUtils.peopleByRooms(ctrl.reservation.rooms, true);
			var currentPeople = ReservationUtils.normalizePeople(ctrl.reservation.people);
			var requestPeople = ctrl.requestPeople || angular.copy(ctrl.reservation.requestPeople || ctrl.reservation.people);
			if (!requestPeople) {
				requestPeople = {};
			}
			
			requestPeople = ReservationUtils.normalizePeople(requestPeople);
			
			var remainingPeople = {
				adults: requestPeople.adults ? requestPeople.adults - currentPeople.adults : 0,
				boys: requestPeople.boys ? requestPeople.boys - currentPeople.boys : 0,
				children: requestPeople.children ? requestPeople.children - currentPeople.children : 0,
				kids: requestPeople.kids ? requestPeople.kids - currentPeople.kids : 0
			};
			
			ctrl.$$requestPeople = requestPeople;
			ctrl.$$remainingPeople = remainingPeople;
			ctrl.reservation.requestPeople = requestPeople;
			ctrl.reservation.remainingPeople = remainingPeople;
			
			return remainingPeople;
		};
		
		this.$initWatchers = function() {
			ctrl.$initDateWatch();
			
			$scope.$watch(function() {
				return ctrl.reservation.step;
			
			}, function(newVal, oldVal) {
				if (newVal > 1) {
					ctrl.$$dateWatch && ctrl.$$dateWatch();
					ctrl.$$dateWatch = null;
				
				} else {
					ctrl.$initDateWatch();
				}
			});
			
			$scope.$watchCollection(function() {
				return ctrl.reservation.people;
			
			}, function(newVal, oldVal) {
				if (ctrl.step == 1) {
					ctrl.requestPeople = angular.copy(ctrl.reservation.people);
					ctrl.reservation.requestPeople = ctrl.requestPeople;
				}
				
				ctrl.$countRemainingPeople();
				ctrl.reservation.guestsCount = ReservationUtils.guestsCount(ctrl.reservation.people);
			});
		};
		
		this.$initDateWatch = function() {
			if (!ctrl.$$dateWatch) {
				ctrl.$$dateWatch = $scope.$watchGroup([function() {
					return ctrl.reservation.checkin;
				}, function() {
					return ctrl.reservation.checkout;
					
				}], function(newValues, oldValues) {
					ctrl.$checkMinEndDate();
					ctrl.$calculateNights();
					
					if (!DateUtils.absoluteMoment(newValues[0]).isSame(DateUtils.absoluteMoment(oldValues[0]), "day") || !DateUtils.absoluteMoment(newValues[1]).isSame(DateUtils.absoluteMoment(oldValues[1]), "day")) {
						ctrl.onDateChanged && ctrl.onDateChanged({checkin: ctrl.reservation.checkin, checkout: ctrl.reservation.checkout, nights: ctrl.reservation.nights, people: ctrl.reservation.people});
					}
				});
			}
		}		
	}
})();