(function() {
	'use strict';
	
	angular.module("itaca.components").component("chBookingForm", {
		bindings: {
    		reservation: "<",
    		minDate: "<?",
    		maxRange: "<?",
    		step: "<?",
    		onDateChanged: "&?",
    		onSearch: "&?",
    		onNext: "&?"
		},
		controller: BookingFormCtrl,
		template: 
			"<ng-form name=\"bookingForm\" novalidate layout=\"column\" layout-padding>" +
				"<div class=\"md-subhead no-padding-top no-padding-bottom text-gray-light text-center\">" +
					"<strong ng-if=\"$ctrl.reservation.nights && $ctrl.reservation.rooms.length\"><span translate=\"reservation.summary.your\"></span></strong>" +
					"<strong ng-if=\"$ctrl.reservation.nights && !$ctrl.reservation.rooms.length\"><span translate=\"reservation.summary.search\"></span></strong>" +
					"<strong ng-if=\"!$ctrl.reservation.nights\" ><span translate=\"reservation.search.your.room\"></span></strong>" +
				"</div>" +	
				"<div ng-if=\"!$ctrl.step || $ctrl.step <= 1\" class=\"no-padding-top no-padding-bottom\">" +
					"<div flex layout=\"column\">" +
						"<ch-date-range-picker " +
							"label=\"{{'reservation.when.question'|translate}}\"" +
							"start-label=\"{{'date.checkin.select.alt'|translate}}\"" +
							"start=\"$ctrl.reservation.checkin\"" +
							"start-min-date=\"$ctrl.minDate\"" +
							"start-error-messages=\"{mindate: ('error.date.before.today'|translate)}\"" +
							"end-label=\"{{'date.checkout.select.alt'|translate}}\"" + 
							"end=\"$ctrl.reservation.checkout\"" +
							"end-min-date=\"$ctrl.$$minEndDate\" end-max-date=\"$ctrl.$$maxEndDate\"" +
							"end-error-messages=\"{mindate: ('error.date.end.before.start'|translate), maxdate: ('error.reservation.search.maxdate'|translate)}\"" + 
							"max-range=\"$ctrl.maxRange\"" +
							"diff-label-singular=\"{{'common.night'|translate}}\"" +
							"diff-label-plural=\"{{'common.nights'|translate}}\"" +
							"use-utc=\"true\" disable-body-scroll=\"true\"></ch-date-range-picker>" +
					"</div>" +
					"<div><md-divider></md-divider></div>" +
					"<div flex layout=\"column\">" +
						"<ch-people-picker " + 
							"label=\"{{'reservation.people.question'|translate}}\"" + 
							"people=\"$ctrl.reservation.requestPeople\"" + 
							"ng-required=\"true\"" + 
							"has-confirm=\"false\"" + 
							"disable-body-scroll=\"true\">" +
						"</ch-people-picker>" +
					"</div>" +
				"</div>" +
				"<div ng-if=\"$ctrl.step > 1\" class=\"no-padding-top no-padding-bottom\">" +
					"<div flex layout=\"column\">" +
						"<div layout=\"column\" layout-padding class=\"text-center\">" + 
				  			"<div class=\"text-gray-light text-small no-padding-bottom\">" + 
								"<span>{{'reservation.when.question'|translate}}</span>" + 
							"</div>" +
							"<div class=\"layout layout-wrap layout-align-center-center row-mini text-lowercase no-padding-bottom\">" + 
								"<span><span translate=\"date.from.abbr\"></span>&nbsp;<span class=\"md-subhead\"><strong>{{$ctrl.reservation.checkin|utcDate:\"shortDate\"}}</strong></span>&nbsp;</span>" + 
								"<span><span translate=\"date.to.abbr\"></span>&nbsp;<span class=\"md-subhead\"><strong>{{$ctrl.reservation.checkout|utcDate:\"shortDate\"}}</strong></span></span>" + 
								"<span ng-if=\"$ctrl.reservation.nights\" class=\"text-gray-light text-small no-padding no-margin text-lowercase\">" +  
						       		"(<span>&nbsp;{{$ctrl.reservation.nights}}&nbsp;</span>" +
						       		"<span ng-show=\"$ctrl.reservation.nights == 1\">{{'common.night'|translate}})</span> " +
						       		"<span ng-show=\"$ctrl.reservation.nights > 1\">{{'common.nights'|translate}})</span>" +  
						       	"</span>" + 
							"</div>" + 
						"</div>" +
					"</div>" +
					"<div><md-divider></md-divider></div>" +
					"<div flex layout=\"column\">" +
						"<div layout=\"column\" layout-padding class=\"text-center\">" +
							"<div class=\"text-gray-light text-small no-padding-bottom\">" +
								"<span translate=\"reservation.people.question\"></span>" +
							"</div>" +
							"<div ng-if=\"$ctrl.reservation.people\" class=\"md-subhead text-wrap row-mini no-padding-bottom\">" +
								"<strong><ch-people-summary people=\"$ctrl.reservation.people\"></ch-people-summary></strong>" +
							"</div>" +
							"<div ng-if=\"$ctrl.step == 2 && ($ctrl.reservation.remainingPeople.adults > 0 || $ctrl.reservation.remainingPeople.boys > 0 || $ctrl.reservation.remainingPeople.children > 0 || $ctrl.reservation.remainingPeople.kids > 0)\"" + 
								"class=\"text-lowercase text-small text-warn\">" +
								"<md-icon class=\"mdi mdi-alert md-14 text-warn\"></md-icon>" +
								"<span translate=\"reservation.people.unsatisfied\"></span>:&nbsp;<strong><ch-people-summary people=\"$ctrl.reservation.remainingPeople\"></ch-people-summary></strong>&nbsp;<span translate=\"reservation.people.unsatisfied.to.arrange\"></span>." +
								"<span class=\"text-initial\" translate=\"reservation.people.unsatisfied.add.beds.or.rooms\"></span>." +
							"</div>" +
						"</div>" +
					"</div>" +
				"</div>" +
				"<div class=\"no-padding-top\"><md-divider></md-divider></div>" +
				"<div id=\"booking-summary\" class=\"no-margin-top no-margin-bottom no-padding-top no-padding-bottom\" ng-show=\"$ctrl.reservation.totalAmount.finalAmount && $ctrl.reservation.totalAmount.finalAmount > 0\">" +
					"<div class=\"text-gray-light text-small text-center\">" +
						"<span translate=\"reservation.rooms.details\"></span>:" +
					"</div>" +
					"<ul>" +
						"<li ng-repeat=\"room in $ctrl.reservation.rooms\" class=\"padding-left layout-row layout-wrap \">" +
							"<small class=\"flex\">" +
								"<strong>1&nbsp;<span translate=\"{{room.type.roomType.nameKey}}\"></span>&nbsp;</strong>" +
								"<span ng-if=\"$ctrl.reservation.nights > 1\">" +
									"(<span>{{room.totalRate.dailyRates[0].amount.finalAmount|chCurrency}}</span>" +
									"<span>&nbsp;x&nbsp;{{$ctrl.reservation.nights}}<span translate=\"date.days.abbr\"></span></span>)" +
								"</span>" +
							"</small>" +
							"<div class=\"text-right\">" +
								"<div class=\"text-gray-light\" ng-if=\"room.totalRate.amount.initialAmount != room.totalRate.amount.finalAmount\">" +
									"<small>" +
										"<del><em>{{room.totalRate.amount.initialAmount|chCurrency}}</em></del>" +
									"</small>" +
								"</div>" +
								"<div>" +
									"<span>{{room.totalRate.amount.finalAmount|chCurrency}}</span>" +
								"</div>" +
							"</div>" +
							"<ul class=\"flex-100 no-padding no-margin\">" +
								"<li ng-if=\"!serviceSold.included\" ng-repeat=\"serviceSold in room.services\" class=\"padding-left layout-row layout-wrap\" ng-class=\"{'text-danger': serviceSold.toRemove}\">" +
									"<small class=\"flex\">" +
										"<span>" +
											"<span ng-if=\"serviceSold.count > 1\">{{serviceSold.count}}&nbsp;x&nbsp;</span>" +
											"<span ng-if=\"serviceSold.count <= 1\">1&nbsp;</span>" +
											"<span translate=\"{{serviceSold.service.type.nameKey}}\"></span>&nbsp;" +
										"</span>" +
										"<span ng-if=\"serviceSold.service.paymentType == 'PER_PERSON' && ! serviceSold.toRemove\">" +
											"<ch-people-summary people=\"serviceSold.people\" no-details=\"true\"></ch-people-summary>&nbsp;" +
										"</span>" +
										"<span ng-if=\"$ctrl.reservation.nights > 1 && serviceSold.service.frequency == 'DAILY'\">(x&nbsp;{{$ctrl.reservation.nights}}<span translate=\"date.days.abbr\"></span>)</span>" +
									"</small>" +
									"<span class=\"text-right\">" +
										"<span ng-if=\"serviceSold.amount.finalAmount > 0\">{{serviceSold.amount.finalAmount|chCurrency}}</span>" +													
										"<i ng-if=\"serviceSold.amount.finalAmount <= 0\" translate=\"common.free\"></i>" +
									"</span>" +
								"</li>" +
							"</ul>" +
							"<ul class=\"flex-100 no-padding no-margin\">" +
								"<li ng-repeat=\"bed in room.otherBeds\" class=\"padding-left layout-row layout-wrap\">" +
									"<small class=\"flex\">" +
										"<span>1&nbsp;<span class=\"text-lowercase\" translate=\"bed.bed\"></span>&nbsp;<span translate=\"{{'bed.' + bed.bed.type}}\"></span>&nbsp;</span>" +
										"<span ng-if=\"$ctrl.reservation.nights > 1\">(x&nbsp;{{$ctrl.reservation.nights}}<span translate=\"date.days.abbr\"></span>)</span>" +
									"</small>" +
									"<span class=\"text-right\">" +
										"<span>{{bed.amount.finalAmount|chCurrency}}</span>" +													
									"</span>" +
								"</li>" +
							"</ul>" +
						"</li>" +
					"</ul>" +
					"<md-divider></md-divider>" +
					"<div class=\"layout-row layout-wrap layout-padding no-padding-left no-padding-right\" ng-if=\"$ctrl.reservation.totalAmount.finalAmount\">" +
						"<div class=\"flex no-padding\" style=\"min-width: 125px\">" +
							"<div class=\"md-headline\">" +
								"<span translate=\"common.total\"></span>:" +
							"</div>" +
							"<div style=\"margin-top:-6px;\" ng-if=\"appOptions.currentCurrency != hotel.currency\">" +
								"<small>(<span translate=\"currency.your.currency\"></span>)</small>" +
							"</div>" +
						"</div>" +
						"<div class=\"text-right no-padding md-headline\">" +
							"<span>{{$ctrl.reservation.totalAmount.finalAmount|chCurrency}}</span>" +
							"<span ng-if=\"appOptions.currentCurrency != hotel.currency\">*</span>" +
						"</div>" +
					"</div>" +
					"<div class=\"layout-row layout-padding no-padding-left no-padding-right no-padding-top\" ng-if=\"$ctrl.reservation.totalAmount.finalAmount && appOptions.currentCurrency != hotel.currency\">" +
						"<div class=\"flex no-padding\">" +
							"<div class=\"md-subhead\">" +
								"<span translate=\"common.total\"></span>:" +
							"</div>" +
							"<div style=\"margin-top:-6px;\">" +
								"<small>(<span translate=\"currency.hotel.currency\"></span>)</small>" +
							"</div>" +
						"</div>" +
						"<div class=\"md-subhead text-right no-padding\">" +
							"<span>{{$ctrl.reservation.totalAmount.finalAmount | chCurrency:hotel.currency }}</span>" +
						"</div>" +
					"</div>" +
					"<div class=\"text-gray-light layout-row no-padding\" ng-if=\"$ctrl.reservation.totalAmount.finalAmount && appOptions.currentCurrency != hotel.currency\">" +
						"<small class=\"layout-column layout-margin no-margin\">" +
							"<span class=\"no-margin\">" +
								"<span translate=\"currency.info.payment\" translate-values=\"{name: hotel.name}\"></span>" +
								"<span>:&nbsp;{{ 1 | chCurrency:hotel.currency}} = {{ 1 | chCurrency}}</span>" +
							"</span>" +
							"<span class=\"no-margin-left no-margin-bottom no-margin-right\"><span translate=\"currency.info.payment2\"></span></span>" +	
						"</small>" +		
					"</div>" +
				"</div>" +
				"<div layout=\"column\" class=\"no-padding\" ng-switch=\"$ctrl.step\">" +
		  			"<div ng-switch-default layout=\"column\">" +
						"<md-button class=\"md-raised md-primary row-1\" ng-disabled=\"bookingForm.$invalid\" ch-click=\"$ctrl.$search()\" aria-label=\"Check availability\">" +
			  				"<div layout=\"column\" layout-padding>" +
			  					"<span translate=\"reservation.availability.check\"></span>" +
			  				"</div>" +
			  			"</md-button>" +
			  		"</div>" +
			  		"<div ng-switch-when=\"1\" layout=\"column\">" +
			  			"<md-button class=\"md-raised md-primary row-1\" ng-disabled=\"$ctrl.reservation.rooms.length <= 0\" ng-click=\"$ctrl.$next()\" aria-label=\"Book now\">" +
			  				"<div layout=\"column\" layout-padding>" +
			  					"<span ng-if=\"$ctrl.reservation.rooms.length\">" +
			  						"<span translate=\"reservation.instant\"></span>" +
			  						"<md-icon class=\"mdi mdi-chevron-down\" ng-class=\"{'animated infinite bounce':$ctrl.reservation.rooms.length}\"></md-icon>" +
			  					"</span>" +
			  					"<span ng-if=\"!$ctrl.reservation.rooms.length\">" +
			  						"<span translate=\"reservation.rooms.select\"></span>" +
			  					"</span>" +
			  				"</div>" +
			  			"</md-button>" +
		  			"</div>" +
			  		"<div ng-switch-when=\"2|3|4\" ng-switch-when-separator=\"|\" layout=\"column\">" +
			  			"<md-button class=\"md-raised row-1\" ng-class=\"{'md-primary': $ctrl.step == 2, 'bg-success': $ctrl.step == 3}\" ng-click=\"$ctrl.$next()\" aria-label=\"Book now\" ng-switch=\"$ctrl.step\">" +
			  				"<div ng-switch-when=\"2\" layout=\"column\" layout-padding>" +
			  					"<span>" +
				  					"<span translate=\"common.last.step\"></span>" +
				  					"<md-icon class=\"mdi mdi-chevron-down animated infinite bounce\"></md-icon>" +
				  				"</span>" +
			  				"</div>" +
			  				"<div ng-switch-when=\"3\" layout=\"column\" layout-padding>" +
								"<div class=\"text-initial no-padding\"><small translate=\"reservation.text.alright\"></small></div>" +
								"<div class=\"text-uppercase no-padding\">" +
									"<strong translate=\"reservation.book.now\" style=\"margin-left: 24px;\"></strong>" +
									"<md-icon class=\"mdi mdi-chevron-down text-white animated infinite bounce\"></md-icon>" +	
								"</div>" +
								"<small ng-if=\"$ctrl.reservation.guest.email\" class=\"ng-binding ng-scope no-padding text-initial text-wrap\">" +
									"<span><span translate=\"reservation.email.confirm.to\"></span>:</span>" +
									"<span>{{$ctrl.reservation.guest.email}}</span>" +
								"</small>" +
							"</div>" +
			  			"</md-button>" +
		  			"</div>" +
		  		"</div>" +
		  		"<div class=\"layout-column layout-padding no-padding text-center\" ng-if=\"$ctrl.step == 1 && $ctrl.reservation.rooms.length > 0\">" +
		  			"<span class=\"no-padding-bottom\">" +
		  				"<md-icon class=\"mdi mdi-checkbox-marked-circle-outline text-success md-18\"></md-icon>" +
		  				"<span class=\"text-success\" translate=\"common.only.two.min\"></span>" +
		  			"</span>" +
		  		"</div>" +
				"<div layout=\"column\" class=\"text-gray-light\" ng-if=\"$ctrl.reservation.nights\">" +
	       			"<small>" +
	       				"<span ng-if=\"$ctrl.reservation.nights == 1\" translate=\"reservation.rates.info.night\"></span>" +
	       				"<span ng-if=\"$ctrl.reservation.nights > 1\" translate=\"reservation.rates.info.nights\" translate-value-count=\"{{$ctrl.reservation.nights}}\"></span>" +
	       			"</small>" +
	       			"<small ng-if=\"hotel.vatTax\">" +
	       				"<strong><span translate=\"common.included\"></span>:</strong>&nbsp;{{::hotel.vatTax.finalAmount}}%&nbsp;<span translate=\"billing.vat.tax\"></span>" +
	       			"</small>" +
	       			"<small ng-if=\"hotel.cityTax || $ctrl.reservation.checkinDetails\">" +
	       				"<strong><span translate=\"common.included.not\"></span>:</strong>&nbsp;" +
	       				"<span ng-if=\"hotel.cityTax && hotel.cityTax.finalAmount\">" +
	       					"{{::(hotel.cityTax.finalAmount|chCurrency:hotel.currency)}}&nbsp;" +
	       					"<span translate=\"reservation.cityTax.description\"></span>" +
	       				"</span>" +
	       				"<span ng-if=\"$ctrl.reservation.checkinDetails && $ctrl.reservation.checkinDetails.amount.finalAmount\">" +
	       					"<span ng-if=\"hotel.cityTax.finalAmount\">,&nbsp;</span>" +
	       					"{{::($ctrl.reservation.checkinDetails.amount.finalAmount|chCurrency:hotel.currency)}}&nbsp;" +
	       					"<span translate=\"reservation.checkinDetails.description\"></span>" +
	       				"</span>" +
	       			"</small>" +
	       		"</div>" +
	   		"</ng-form>"
	});
	
	 /* @ngInject */
	function BookingFormCtrl($scope, $timeout, DateUtils) {
		var ctrl = this;
		
		this.$onInit = function() {
			ctrl.reservation = ctrl.reservation || {};
			ctrl.step = !_.isNil(ctrl.step) ? parseInt(ctrl.step) : 1;
			ctrl.$initWatches();
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
		
		this.$initWatches = function() {
			$scope.$watchGroup([function() {
				return ctrl.reservation.checkin;
			}, function() {
				return ctrl.reservation.checkout;
				
			}], function(newValues, oldValues) {
				ctrl.$checkMinEndDate();
				ctrl.$calculateNights();
				
				if (!DateUtils.absoluteMoment(newValues[0]).isSame(DateUtils.absoluteMoment(oldValues[0]), "day") || !DateUtils.absoluteMoment(newValues[1]).isSame(DateUtils.absoluteMoment(oldValues[1]), "day")) {
					ctrl.onDateChanged && ctrl.onDateChanged({checkin: ctrl.reservation.checkin, checkout: ctrl.reservation.checkout, nights: ctrl.reservation.nights});
				}
			});
		};
	}
})();