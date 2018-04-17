/*******************************************************************************
********************************************************************************
********************************************************************************
***	   itaca-ng-components														 
***    Copyright (C) 2016   Chroma Italy Hotels srl	 
***                                                                          
***    This program is free software: you can redistribute it and/or modify  
***    it under the terms of the GNU General Public License as published by  
***    the Free Software Foundation, either version 3 of the License, or     
***    (at your option) any later version.                                   
***                                                                          
***    This program is distributed in the hope that it will be useful,       
***    but WITHOUT ANY WARRANTY; without even the implied warranty of        
***    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the         
***    GNU General Public License for more details.                          
***                                                                          
***    You should have received a copy of the GNU General Public License     
***    along with this program.  If not, see <http://www.gnu.org/licenses/>. 
********************************************************************************
********************************************************************************
*******************************************************************************/
(function() {
    "use strict";
    angular.module("itaca.components", [ "itaca.components-templates", "ngMaterial", "itaca.services", "itaca.utils", "pascalprecht.translate", "tmh.dynamicLocale" ]);
    angular.module("itaca.components").config([ "$windowProvider", "$translateProvider", "tmhDynamicLocaleProvider", function($windowProvider, $translateProvider, tmhDynamicLocaleProvider) {
        var defaultLocale = ($windowProvider.$get().navigator.language || $windowProvider.$get().navigator.userLanguage).split("-")[0].toLowerCase();
        $translateProvider.useLoader("i18nLoader");
        $translateProvider.preferredLanguage(defaultLocale);
        $translateProvider.useCookieStorage();
        $translateProvider.useMissingTranslationHandlerLog();
        $translateSanitizationProvider.addStrategy("sce", "sceStrategy");
        $translateProvider.useSanitizeValueStrategy("sce");
        tmhDynamicLocaleProvider.localeLocationPattern("/resources/public/js/i18n/angular-locale_{{locale}}.js");
        tmhDynamicLocaleProvider.useCookieStorage();
        tmhDynamicLocaleProvider.defaultLocale(defaultLocale);
    } ]);
})();

(function() {
    "use strict";
    AmountInputCtrl.$inject = [ "$scope", "REGEXP", "$translate", "NumberUtils", "Locale" ];
    angular.module("itaca.components").component("chAmountInput", {
        require: {
            ngModelCtrl: "ngModel"
        },
        bindings: {
            ngModel: "=",
            ngMin: "<?",
            inputName: "@",
            promotion: "<?",
            errorMessages: "@",
            cssClass: "@",
            hideIcon: "@",
            iconClass: "@",
            readOnlyView: "<?",
            hideInitialValue: "<?",
            showOriginalValue: "<?",
            originalValueClass: "<?",
            originalValueLabel: "<?",
            ngDisabled: "<?",
            disabledLimit: "<?",
            hideRefreshIcon: "<?",
            refreshIconClass: "@",
            allowNegative: "<?",
            onUpdate: "&?"
        },
        controller: AmountInputCtrl,
        template: '<ng-form name="chAmountInputForm" ng-class="{"text-gray-light cursor-disabled": $ctrl.ngDisabled}">' + '<div class="no-padding-bottom no-padding-top row-mini layout-column layout-align-center-center">' + '<span ng-if="$ctrl.promotion" ng-switch="$ctrl.promotion.promotionType">' + '<span ng-switch-when="STANDARD" class="label label-xs bg-info">' + '<ch-truncate text="{{$ctrl.promotion.name[$ctrl.$$currentLang.iso]}}" max-length="20"  suffix="..."></ch-truncate>&nbsp;<span ng-if="$ctrl.promotion.discount.type=="PERCENTAGE"">-{{$ctrl.promotion.discount.finalAmount}}%</span><span ng-if="$ctrl.promotion.discount.type=="PRICE"">-{{$ctrl.promotion.discount.finalAmount|chCurrency}}</span>' + "</span>" + '<span ng-switch-when="MINIMUM_STAY" class="label label-xs bg-primary-light">' + '<span translate="promotions.promotion.label.minstay.nights" translate-value-count="{{$ctrl.promotion.days}}"></span>&nbsp;<span ng-if="$ctrl.promotion.discount.type=="PERCENTAGE"">-{{$ctrl.promotion.discount.finalAmount}}%</span><span ng-if="$ctrl.promotion.discount.type=="PRICE"">-{{$ctrl.promotion.discount.finalAmount|chCurrency}}</span>' + "</span>" + '<span ng-switch-when="BOOK_TODAY" class="label label-xs bg-danger">' + '<span translate-once="promotions.promotion.label.only.today"></span>!&nbsp;<span ng-if="$ctrl.promotion.discount.type=="PERCENTAGE"">-{{$ctrl.promotion.discount.finalAmount}}%</span><span ng-if="$ctrl.promotion.discount.type=="PRICE"">-{{$ctrl.promotion.discount.finalAmount|chCurrency}}</span>' + "</span>" + '<span ng-switch-when="EARLY_BOOKING" class="label label-xs bg-warn">' + '<span translate-once="promotions.early"></span>&nbsp;<span ng-if="$ctrl.promotion.discount.type=="PERCENTAGE"">-{{$ctrl.promotion.discount.finalAmount}}%</span><span ng-if="$ctrl.promotion.discount.type=="PRICE"">-{{$ctrl.promotion.discount.finalAmount|chCurrency}}</span>' + "</span>" + '<span ng-switch-when="LAST_MINUTE" class="label label-xs bg-primary">' + '<span translate-once="promotions.last.minute"></span>&nbsp;<span ng-if="$ctrl.promotion.discount.type=="PERCENTAGE"">-{{$ctrl.promotion.discount.finalAmount}}%</span><span ng-if="$ctrl.promotion.discount.type=="PRICE"">-{{$ctrl.promotion.discount.finalAmount|chCurrency}}</span>' + "</span>" + '<span ng-switch-when="LAST_SECOND" class="label label-xs bg-success">' + '<span translate-once="promotions.last.second"></span>&nbsp;<span ng-if="$ctrl.promotion.discount.type=="PERCENTAGE"">-{{$ctrl.promotion.discount.finalAmount}}%</span><span ng-if="$ctrl.promotion.discount.type=="PRICE"">-{{$ctrl.promotion.discount.finalAmount|chCurrency}}</span>' + "</span>" + "</span>" + '<small class="text-gray-light" ng-if="!$ctrl.hideInitialValue">' + '<span ng-if="$ctrl.ngModel.initialAmount > 0 && $ctrl.ngModel.initialAmount > $ctrl.ngModel.finalAmount">' + "<i><del>{{($ctrl.ngModel.initialAmount|chCurrency)}}</del></i>" + "</span>" + '<span ng-if="!($ctrl.ngModel.initialAmount > 0 && $ctrl.ngModel.initialAmount > $ctrl.ngModel.finalAmount)"></span>' + "</small>" + "</div>" + '<div class="no-padding-top">' + '<div ng-if="$ctrl.readOnlyView" class="text-center">{{$ctrl.ngModel.finalAmount|chCurrency}}</div>' + '<div ng-if="!$ctrl.readOnlyView">' + '<div class="text-right" ng-if="$ctrl.showOriginalValue">' + '<ch-original-value ng-model="$ctrl.ngModel.finalAmount" refer-to="$ctrl.ngModel.$originalValue.finalAmount" filter="chCurrency" label="{{$ctrl.originalValueLabel}}" css-class="{{$ctrl.originalValueClass}}"></ch-original-value>' + "</div>" + '<div class="layout-align-end-center layout-row row-mini">' + '<md-input-container class="{{$ctrl.cssClass}}" ng-class="{"md-icon-right": !$ctrl.hideRefreshIcon && $ctrl.ngModel.finalAmount != $ctrl.ngModel.$originalValue.finalAmount}">' + '<md-icon ng-if="!$ctrl.hideIcon && !$ctrl.ngDisabled" class="{{$ctrl.iconClass}}"></md-icon>' + '<input type="number" name="{{$ctrl.inputName}}" ng-model="$ctrl.ngModel.finalAmount" ng-min="$ctrl.ngMin" step="0.01" ng-max="$ctrl.max" ng-pattern="$ctrl.$$pattern" required ng-disabled="$ctrl.ngDisabled" aria-label="Edit amount" class="text-center">' + '<md-icon ng-if="!$ctrl.hideRefreshIcon && !$ctrl.ngDisabled && $ctrl.ngModel.finalAmount != $ctrl.ngModel.$originalValue.finalAmount" class="{{$ctrl.refreshIconClass}} clickable" ng-click="$ctrl.$refreshPrice()" aria-label="reset price">' + '<md-tooltip><span translate-once="common.restore"></span></md-tooltip>' + "</md-icon>" + '<div ng-messages="chAmountInputForm[$ctrl.inputName].$error">' + '<span ng-message="required"><span translate-once="error.required"></span></span>' + '<span ng-message="min"><span translate="error.amount.min" translate-values="{num: ($ctrl.ngMin | chCurrency)}"></span></span>' + '<span ng-message="max"><span translate="error.amount.max" translate-values="{num: ($ctrl.max | chCurrency)}"></span></span>' + '<span ng-message="$$pattern"><span translate-once="error.field.generic.invalid"></span></span>' + '<span ng-if="errorMessages" ng-repeat="error in $ctrl.errorMessages" ng-message="error.key"><span translate="error.label"></span></span>' + "</div>" + "</md-input-container>" + "</div>" + "</div>" + "</div>" + "</ng-form>"
    });
    function AmountInputCtrl($scope, REGEXP, $translate, NumberUtils, Locale) {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.ngModel.$originalValue = ctrl.ngModel.$originalValue || angular.copy(ctrl.ngModel);
            ctrl.hideInitialValue = _.isBoolean(ctrl.hideInitialValue) ? ctrl.hideInitialValue : false;
            ctrl.$$pattern = _.isBoolean(ctrl.allowNegative) && ctrl.allowNegative ? REGEXP.priceNoStrict : REGEXP.price;
            ctrl.$$currentLang = Locale.current();
            ctrl.cssClass = ctrl.cssClass || "font-18 no-margin minimal-input max-width-130px ";
            ctrl.iconClass = ctrl.iconClass || "mdi mdi-pencil md-18 text-primary material-icons";
            ctrl.originalValueClass = ctrl.originalValueClass || "md-caption text-gray-light";
            ctrl.refreshIconClass = ctrl.refreshIconClass || "mdi mdi-refresh md-18 material-icons";
            if (!ctrl.originalValueLabel) {
                $translate("common.amount.original").then(function(translate) {
                    ctrl.originalValueLabel = translate;
                }, _.stubFalse());
            }
            ctrl.hideIcon = _.isBoolean(ctrl.hideIcon) ? ctrl.hideIcon : false;
            ctrl.readOnlyView = _.isBoolean(ctrl.readOnlyView) ? ctrl.readOnlyView : false;
            ctrl.showOriginalValue = _.isBoolean(ctrl.showOriginalValue) ? ctrl.showOriginalValue : false;
            if (!ctrl.ngModel.initialAmount || ctrl.ngModel.initialAmount == ctrl.ngModel.finalAmount) {
                ctrl.ngModel.initialAmount = ctrl.ngModel.initialAmount !== 0 ? ctrl.ngModel.finalAmount : ctrl.ngModel.initialAmount;
            }
            if (ctrl.disabledLimit) {
                ctrl.max = false;
            } else {
                ctrl.max = ctrl.ngModel.initialAmount;
                if (ctrl.promotion && ctrl.promotion.discount && ctrl.promotion.discount.finalAmount) {
                    var discountPrice = 0;
                    if (ctrl.promotion.discount.type == "PERCENTAGE") {
                        discountPrice = NumberUtils.calculateDiscount(ctrl.ngModel.initialAmount, ctrl.promotion.discount.finalAmount, "PERCENTAGE");
                    } else {
                        discountPrice = ctrl.promotion.discount.finalAmount;
                    }
                    ctrl.max = ctrl.max - discountPrice;
                }
            }
            ctrl.$initWatchers();
        };
        this.$refreshPrice = function() {
            if (ctrl.ngModel && ctrl.ngModel.$originalValue) {
                ctrl.ngModel.finalAmount = angular.copy(ctrl.ngModel.$originalValue.finalAmount);
                ctrl.ngModel.initialAmount = angular.copy(ctrl.ngModel.$originalValue.initialAmount);
                angular.isFunction(ctrl.onUpdate) && ctrl.onUpdate({
                    value: ctrl.ngModel
                });
            }
        };
        this.$adeguateAmount = function() {
            if (ctrl.ngModel.$originalValue && ctrl.ngModel.finalAmount != ctrl.ngModel.$originalValue.finalAmount) {
                if (!_.isNil(ctrl.promotion) && ctrl.promotion.discount && ctrl.promotion.discount.finalAmount) {
                    var discountPrice = 0;
                    if (ctrl.promotion.discount.type == "PERCENTAGE") {
                        discountPrice = 100 * ctrl.ngModel.finalAmount / (100 - ctrl.promotion.discount.finalAmount);
                    } else {
                        discountPrice = ctrl.ngModel.finalAmount + ctrl.promotion.discount.finalAmount;
                    }
                    ctrl.ngModel.initialAmount = discountPrice;
                } else if (ctrl.ngModel.initialAmount < ctrl.ngModel.finalAmount) {
                    ctrl.ngModel.initialAmount = ctrl.ngModel.finalAmount;
                }
                angular.isFunction(ctrl.onUpdate) && ctrl.onUpdate({
                    value: ctrl.ngModel
                });
            }
        };
        this.$initWatchers = function() {
            $scope.$watch(function() {
                return ctrl.ngModel.finalAmount;
            }, function(newVal, oldVal) {
                ctrl.$adeguateAmount();
            });
        };
    }
})();

(function() {
    "use strict";
    ArrayInputCtrl.$inject = [ "$scope" ];
    angular.module("itaca.components").component("chArrayInput", {
        transclude: true,
        require: {
            ngModelCtrl: "ngModel"
        },
        bindings: {
            ngModel: "=",
            ngRequired: "<?",
            options: "<?",
            hideSelectedIcon: "<?"
        },
        controller: ArrayInputCtrl,
        template: '<div class="layout-row layout-wrap" ng-transclude></div>'
    });
    function ArrayInputCtrl($scope) {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.options = angular.isArray(ctrl.options) ? ctrl.options : [];
            if (ctrl.ngRequired) {
                $scope.$watchCollection(function() {
                    return ctrl.ngModel;
                }, function(newValue, oldValue) {
                    if (ctrl.ngRequired) {
                        ctrl.ngModelCtrl.$setValidity("required", !_.isEmpty(ctrl.ngModel));
                    }
                });
            }
        };
        this.addOption = function(option) {
            ctrl.options.push(option);
        };
        this.$isSelected = function(value) {
            if (!value) {
                return false;
            }
            return _.includes(ctrl.ngModel, value);
        };
        this.toggleOption = function(option) {
            ctrl.ngModel = angular.isArray(ctrl.ngModel) ? ctrl.ngModel : [];
            if (!option.selected) {
                ctrl.ngModel.push(option.value);
            } else {
                _.pull(ctrl.ngModel, option.value);
            }
            option.selected = !option.selected;
        };
    }
})();

(function() {
    "use strict";
    ArrayOptionCtrl.$inject = [ "$scope" ];
    angular.module("itaca.components").component("chArrayOption", {
        transclude: true,
        require: {
            chArrayInputCtrl: "^chArrayInput"
        },
        bindings: {
            ngValue: "<",
            ngSelected: "<",
            buttonClass: "@",
            iconClass: "@",
            selectedIconClass: "@",
            label: "@",
            labelClass: "@",
            selectedClass: "@"
        },
        controller: ArrayOptionCtrl,
        template: '<md-button class="{{$ctrl.buttonClass}}" ng-class="$ctrl.$$option.selected ? $ctrl.selectedClass : \'\'" ' + 'ng-click="$ctrl.$toggle()" aria-label="Toggle option">' + '<div layout layout-padding-sm layout-align="center center">' + '<div ng-if="!$ctrl.$$hideSelectedIcon" class="no-padding">' + '<md-icon ng-if="$ctrl.iconClass" ng-show="!$ctrl.$$option.selected || !$ctrl.selectedIconClass" ' + 'class="material-icons {{$ctrl.iconClass}}"></md-icon>' + '<md-icon ng-show="$ctrl.selectedIconClass && $ctrl.$$option.selected" ' + 'class="material-icons {{$ctrl.selectedIconClass}}"></md-icon>' + "</div>" + "<div>" + '<span ng-if="$ctrl.label" class="{{$ctrl.labelClass}}" ng-bind-html="$ctrl.label"></span>' + "<div ng-transclude></div>" + "</div>" + "</div>" + "</md-button>"
    });
    function ArrayOptionCtrl($scope) {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.buttonClass = ctrl.buttonClass || (ctrl.iconClass && !ctrl.label ? "md-icon-button" : "");
            ctrl.selectedIconClass = ctrl.selectedIconClass || !ctrl.iconClass ? "mdi mdi-check md-24" : "";
            ctrl.selectedClass = ctrl.selectedClass || "md-primary";
            ctrl.$$hideSelectedIcon = ctrl.chArrayInputCtrl.hideSelectedIcon;
            ctrl.$$option = {
                value: ctrl.ngValue
            };
            ctrl.$manageSelected();
        };
        this.$postLink = function() {
            ctrl.chArrayInputCtrl.addOption(ctrl.$$option);
        };
        this.$onChanges = function(changesObj) {
            if (!changesObj) {
                return;
            }
            if (changesObj.ngSelected && !changesObj.ngSelected.isFirstChange()) {
                ctrl.$manageSelected();
            }
        };
        this.$manageSelected = function() {
            ctrl.$$option.selected = !angular.isUndefined(ctrl.ngSelected) ? ctrl.ngSelected : ctrl.chArrayInputCtrl.$isSelected(ctrl.ngValue);
        };
        this.$toggle = function() {
            ctrl.chArrayInputCtrl.toggleOption(ctrl.$$option);
        };
    }
})();

(function() {
    "use strict";
    BookingFormCtrl.$inject = [ "$scope", "$mdMedia", "$timeout", "DateUtils", "ReservationUtils" ];
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
            var maxEnd = DateUtils.absoluteMoment(start).add(ctrl.maxRange, "days");
            ctrl.$$maxEndDate = maxEnd.toDate();
            if (!ctrl.reservation.checkout || DateUtils.absoluteMoment(ctrl.reservation.checkout).isBefore(minEnd, "day")) {
                ctrl.reservation.checkout = angular.copy(ctrl.$$minEndDate);
            } else if (ctrl.reservation.checkout && DateUtils.absoluteMoment(ctrl.reservation.checkout).isAfter(maxEnd, "day")) {
                ctrl.reservation.checkout = angular.copy(ctrl.$$maxEndDate);
            }
        };
        this.$calculateNights = function() {
            ctrl.reservation.nights = DateUtils.absoluteMoment(ctrl.reservation.checkout).diff(DateUtils.absoluteMoment(ctrl.reservation.checkin), "days");
        };
        this.$search = function() {
            ctrl.onSearch && ctrl.onSearch({
                checkin: ctrl.reservation.checkin,
                checkout: ctrl.reservation.checkout,
                nights: ctrl.reservation.nights,
                people: ctrl.reservation.people
            });
        };
        this.$countRemainingPeople = function() {
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
                ctrl.$$dateWatch = $scope.$watchGroup([ function() {
                    return ctrl.reservation.checkin;
                }, function() {
                    return ctrl.reservation.checkout;
                } ], function(newValues, oldValues) {
                    ctrl.$checkMinEndDate();
                    ctrl.$calculateNights();
                    if (!DateUtils.absoluteMoment(newValues[0]).isSame(DateUtils.absoluteMoment(oldValues[0]), "day") || !DateUtils.absoluteMoment(newValues[1]).isSame(DateUtils.absoluteMoment(oldValues[1]), "day")) {
                        ctrl.onDateChanged && ctrl.onDateChanged({
                            checkin: ctrl.reservation.checkin,
                            checkout: ctrl.reservation.checkout,
                            nights: ctrl.reservation.nights,
                            people: ctrl.reservation.people
                        });
                    }
                });
            }
        };
    }
})();

(function() {
    "use strict";
    CancellationBarCtrl.$inject = [ "$scope", "$element", "$log", "NumberUtils", "DateUtils" ];
    angular.module("itaca.components").component("chCancellationBar", {
        bindings: {
            creationDate: "<",
            checkinDate: "<",
            limitDate: "<?",
            feeAmount: "<?",
            offsetSeconds: "<?",
            startLabel: "@",
            endLabel: "@",
            penaltyCancelLabel: "@",
            freeCancelLabel: "@",
            limitCancelLabel: "@"
        },
        controller: CancellationBarCtrl,
        template: '<div class="ch-cancellation-bar-container">' + '<div class="summary-label">' + '<strong ng-if="!$ctrl.$$inPenalty" class="text-success">' + '<span ng-if="$ctrl.finalLimitDate">' + "<span>{{$ctrl.limitCancelLabel}}</span>&nbsp;" + '<span ng-if="$ctrl.daysToLimit">{{$ctrl.daysToLimit|amDurationFormat : "days"}}</span>&nbsp;' + '<span ng-if="!$ctrl.daysToLimit" class="text-lowercase" translate="date.today"></span>' + '<span class="text-gray-light text-normal">&nbsp;({{$ctrl.finalLimitDate|offsetDate:"shortDate":$ctrl.offsetSeconds}}&nbsp;<span class="text-lowercase" translate="date.time.to"></span>&nbsp;{{$ctrl.finalLimitDate|offsetDate:"shortTime":$ctrl.offsetSeconds}})</span>' + "</span>" + '<span ng-if="!$ctrl.finalLimitDate">' + "<span>{{$ctrl.freeCancelLabel}}</span>" + "</span>" + "</strong>" + '<strong ng-if="$ctrl.$$inPenalty" class="text-danger">{{$ctrl.penaltyCancelLabel}}</span></strong>' + "</div>" + "<div layout layout-padding-sm>" + '<div layout="column" layout-align="center center" class="no-padding-top no-padding-bottom cursor-help">' + '<md-icon class="mdi mdi-book-plus md-18"></md-icon>' + '<small class="text-gray-light">{{$ctrl.$$startDate|utcDate:"dd/MM"}}</small>' + '<md-tooltip><span ng-if="!$ctrl.startLabel" translate="reservation.insert.date"></span><span ng-if="$ctrl.startLabel">{{$ctrl.startLabel}}</span></md-tooltip>' + "</div>" + '<div flex class="progress-bar">' + '<span ng-if="$ctrl.finalLimitDate" class="limit-label cursor-help" style="left:{{$ctrl.$$limitRate}}%">' + '<span>{{$ctrl.finalLimitDate|offsetDate:"d MMMM":$ctrl.offsetSeconds}}</span>' + '<md-tooltip>{{$ctrl.limitCancelLabel}}&nbsp;{{$ctrl.finalLimitDate|offsetDate:"shortDate":$ctrl.offsetSeconds}}&nbsp;<span class="text-lowercase" translate="date.time.to"></span>&nbsp;{{$ctrl.finalLimitDate|offsetDate:"shortTime":$ctrl.offsetSeconds}}</md-tooltip>' + "</span>" + '<span ng-if="!$$hideToday" class="today-label cursor-help" style="left:{{$ctrl.$$todayPosition}}%">' + '<span translate="date.today"></span>' + '<md-tooltip><span translate="date.today"></span>&nbsp;{{$ctrl.$$now|date:"short"}}</md-tooltip>' + "</span>" + '<div class="bar bg-success" style="width:{{$ctrl.$$limitRate}}%;"></div>' + '<div class="bar bg-danger" style="left:{{$ctrl.$$limitRate}}%; width:{{100 - $ctrl.$$limitRate}}%;"></div>' + "</div>" + '<div layout="column" layout-align="center center" class="no-padding-top no-padding-bottom cursor-help">' + '<md-icon class="mdi mdi-debug-step-into md-18"></md-icon>' + '<small class="text-gray-light">{{$ctrl.$$endDate|utcDate:"dd/MM"}}</small>' + '<md-tooltip><span ng-if="!$ctrl.endLabel" translate="date.checkin"></span><span ng-if="$ctrl.endLabel">{{$ctrl.endLabel}}</span></md-tooltip>' + "</div>" + "</div>" + "</div>"
    });
    function CancellationBarCtrl($scope, $element, $log, NumberUtils, DateUtils) {
        var ctrl = this;
        this.$onInit = function() {
            if (!ctrl.creationDate) {
                throw new Error("chCancellationBar: creationDate cannot be null");
            }
            if (!ctrl.checkinDate) {
                throw new Error("chCancellationBar: checkinDate cannot be null");
            }
            ctrl.$$startDate = moment(ctrl.creationDate).toDate();
            ctrl.$$endDate = DateUtils.absoluteDate(ctrl.checkinDate);
            ctrl.$$freeCancelDate = moment(ctrl.limitDate || ctrl.$$endDate).toDate();
            var startMoment = moment(ctrl.$$startDate);
            var endMoment = moment(ctrl.$$endDate);
            var limitMoment = ctrl.$$freeCancelDate ? moment(ctrl.$$freeCancelDate) : null;
            ctrl.$$inPenalty = false;
            if (limitMoment && limitMoment.isAfter(endMoment, "days")) {
                ctrl.$$endDate = limitMoment.toDate();
                endMoment = moment(ctrl.$$endDate);
            }
            if (startMoment.isAfter(endMoment, "days")) {
                $log.warn("chCancellationBar: creationDate is after checkinDate. Will be adjusted to checkinDate.");
                ctrl.$$startDate = endMoment.toDate();
                startMoment = moment(ctrl.$$startDate);
                ctrl.$$inPenalty = true;
            }
            if (limitMoment && limitMoment.isSame(endMoment, "days")) {
                ctrl.$$endDate = limitMoment.toDate();
                endMoment = moment(ctrl.$$endDate);
            }
            var $$nowMoment = moment();
            if ($$nowMoment.isAfter(endMoment, "days")) {
                ctrl.$$hideToday = true;
            } else {
                ctrl.$$now = $$nowMoment.toDate();
            }
            endMoment.endOf("day");
            var totalDays = endMoment.diff(startMoment, "days") || 1;
            var daysToCheckin = moment.duration(endMoment.diff($$nowMoment)).asDays();
            ctrl.$$todayPosition = NumberUtils.fixedDecimals(100 - daysToCheckin / totalDays * 100);
            ctrl.$$todayPosition = ctrl.$$todayPosition > 100 ? 100 : ctrl.$$todayPosition < 0 ? 0 : ctrl.$$todayPosition;
            if (!ctrl.limitDate) {
                ctrl.$$inPenalty = !_.isNil(ctrl.feeAmount) && ctrl.feeAmount > 0;
                if (ctrl.$$inPenalty) {
                    ctrl.$$limitRate = 0;
                    ctrl.finalLimitDate = startMoment.utcOffset(ctrl.offsetSeconds ? ctrl.offsetSeconds / 60 : 0).toDate();
                } else {
                    ctrl.$$limitRate = 100;
                }
            } else {
                ctrl.finalLimitDate = limitMoment.utcOffset(ctrl.offsetSeconds ? ctrl.offsetSeconds / 60 : 0).toDate();
                ctrl.daysToLimit = moment.duration(moment(ctrl.finalLimitDate).diff($$nowMoment)).asDays();
                var penaltyDays = moment.duration(endMoment.diff(moment(ctrl.finalLimitDate))).asDays();
                ctrl.$$limitRate = penaltyDays >= 0 ? NumberUtils.fixedDecimals(100 - penaltyDays * 100 / totalDays) : 0;
                ctrl.$$limitRate = ctrl.$$limitRate > 100 ? 100 : ctrl.$$limitRate < 0 ? 0 : ctrl.$$limitRate;
                ctrl.$$inPenalty = ctrl.daysToLimit <= 0;
            }
            var limitLabelEl = angular.element($element[0].querySelector(".limit-label"));
            if (ctrl.$$limitRate == 100) {
                limitLabelEl.addClass("limit-label-full");
                limitLabelEl.removeClass("limit-label-empty");
            } else if (ctrl.$$limitRate == 0) {
                limitLabelEl.addClass("limit-label-empty");
                limitLabelEl.removeClass("limit-label-full");
            }
        };
    }
})();

(function() {
    "use strict";
    CancellationPolicyCtrl.$inject = [ "$scope" ];
    angular.module("itaca.components").component("chCancellationPolicyInfo", {
        bindings: {
            rateType: "<",
            cancellationPolicy: "<",
            city: "@",
            offset: "@",
            title: "@",
            titleClass: "@"
        },
        controller: CancellationPolicyCtrl,
        templateUrl: "/tpls/cancellation-policy-info/cancellation-policy-info.tpl"
    });
    function CancellationPolicyCtrl($scope) {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.titleClass = "md-body-1 no-margin-bottom";
        };
    }
})();

(function() {
    "use strict";
    CardCtrl.$inject = [ "$scope", "Navigator" ];
    angular.module("itaca.components").component("chCard", {
        transclude: true,
        bindings: {
            bgUrl: "@",
            bgClass: "@",
            imgUrl: "@",
            imgClass: "@",
            imgContClass: "@",
            showAvatar: "<?",
            iconClass: "@",
            iconFontSet: "@",
            iconLabel: "@",
            iconLabelClass: "@",
            iconLabelPosition: "@",
            iconSecondaryLabel: "@",
            iconSecondaryLabelClass: "@",
            iconSecondaryLabelPosition: "@",
            otherIconClass: "@",
            otherIconFontSet: "@",
            title: "@",
            titleClass: "@",
            subtitle: "@",
            colorClass: "@",
            ngDisabled: "<?",
            disabledLabel: "@",
            disabledClass: "@",
            disabledBarClass: "@",
            url: "@",
            state: "@",
            stateParams: "<?",
            onClick: "&?",
            menuItems: "<?",
            disabledMenuItems: "<?",
            menuClass: "@",
            noHover: "<?"
        },
        controller: CardCtrl,
        templateUrl: "/tpls/card/card.tpl"
    });
    function CardCtrl($scope, Navigator) {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.$$bgStyle = ctrl.bgUrl ? {
                background: "url('" + ctrl.bgUrl + "') center center no-repeat",
                "background-size": "cover"
            } : null;
            ctrl.colorClass = ctrl.colorClass || "layout-column layout-align-center-center bg-gray-lighter md-padding";
            ctrl.titleClass = ctrl.titleClass || "md-subhead text-bold";
            ctrl.iconLabelPosition = _.includes([ "left", "right", "top", "bottom" ], ctrl.iconLabelPosition) ? ctrl.iconLabelPosition : "left";
            ctrl.menuItems = ctrl.menuItems && angular.isArray(ctrl.menuItems) ? ctrl.menuItems : null;
            ctrl.menuClass = ctrl.menuClass || null;
            ctrl.showAvatar = _.isBoolean(ctrl.showAvatar) ? ctrl.showAvatar : false;
        };
        this.$goTo = function() {
            if (ctrl.ngDisabled) {
                return;
            }
            if (angular.isFunction(ctrl.onClick)) {
                ctrl.onClick();
                return;
            }
            if (!_.isNil(ctrl.state)) {
                Navigator.goToState(ctrl.state, ctrl.stateParams);
            } else {
                if (!_.isNil(ctrl.url)) {
                    Navigator.go(ctrl.url);
                }
            }
        };
        this.$menuClick = function(ev, menu) {
            if (!_.isNil(menu.fn) && angular.isFunction(menu.fn)) {
                menu.fn.apply(this, _.concat([ ev ], menu.fnParams));
            } else {
                if (!_.isNil(menu.state)) {
                    Navigator.goToState(menu.state, menu.stateParams);
                } else {
                    if (!_.isNil(menu.url)) {
                        location.href = menu.url;
                    }
                }
            }
        };
    }
})();

(function() {
    "use strict";
    ClockCtrl.$inject = [ "$scope", "$element", "$attrs", "DateUtils", "$interval" ];
    angular.module("itaca.components").component("chClock", {
        bindings: {
            offsetSeconds: "<",
            showDate: "<",
            showTime: "<",
            dateFormat: "@",
            timeFormat: "@"
        },
        controller: ClockCtrl,
        template: "<div>" + "<div ng-if='$ctrl.showDate'><small>{{$ctrl.$$date|date:$ctrl.dateFormat:$ctrl.$$timezone}}</small></div>" + "<div ng-if='$ctrl.showTime'><strong>{{$ctrl.$$date|date:$ctrl.timeFormat:$ctrl.$$timezone}}</strong></div>" + "</div>"
    });
    function ClockCtrl($scope, $element, $attrs, DateUtils, $interval) {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.$$timezone = DateUtils.secondsToOffsetString(ctrl.offsetSeconds);
            ctrl.showDate = _.isBoolean(ctrl.showDate) ? ctrl.showDate : true;
            ctrl.showTime = _.isBoolean(ctrl.showTime) ? ctrl.showTime : true;
            ctrl.dateFormat = ctrl.dateFormat || "mediumDate";
            ctrl.timeFormat = ctrl.timeFormat || "shortTime";
            ctrl.$$stop = $interval(function() {
                ctrl.$updateDate();
            }, 1e3);
        };
        this.$onDestroy = function() {
            $interval.cancel(ctrl.$$stop);
        };
        this.$updateDate = function() {
            ctrl.$$date = new Date();
        };
    }
})();

(function() {
    "use strict";
    ConnectionCheckCtrl.$inject = [ "$scope", "$mdDialog", "$window" ];
    angular.module("itaca.components").component("chConnectionCheck", {
        bindings: {},
        controller: ConnectionCheckCtrl,
        template: "<span></span>"
    });
    function ConnectionCheckCtrl($scope, $mdDialog, $window) {
        var ctrl = this;
        this.$onInit = function() {
            $window.addEventListener("offline", ctrl.$showDialog);
        };
        this.$showDialog = function() {
            ConnectionCheckDialogCtrl.$inject = [ "$mdDialog", "$window" ];
            $mdDialog.show({
                controller: ConnectionCheckDialogCtrl,
                escapeToClose: false,
                template: '<md-dialog flex="70" aria-label="offline dialog">' + '<md-dialog-content class="md-padding text-center">' + "<div>" + '<md-icon class="mdi mdi-close-network md-160"></md-icon>' + "</div>" + '<h1 class="md-display-1 no-margin"><span translate="alerts.offline.title"></span></h1>' + '<h4 class="md-subhead no-margin-top"><span translate="alerts.offline.text"></span></h4>' + "</md-dialog-content>" + "</md-dialog>"
            });
            function ConnectionCheckDialogCtrl($mdDialog, $window) {
                var hideFunc = function() {
                    $mdDialog.hide();
                };
                this.$onInit = function() {
                    $window.addEventListener("online", hideFunc);
                };
                this.$onDestroy = function() {
                    $window.removeEventListener("online", hideFunc);
                };
            }
        };
        this.$onDestroy = function() {
            $window.removeEventListener("offline", ctrl.$showDialog);
        };
    }
})();

(function() {
    "use strict";
    CounterCtrl.$inject = [ "$scope", "$element", "$attrs" ];
    angular.module("itaca.components").component("chCounter", {
        transclude: true,
        require: {
            ngModelCtrl: "ngModel"
        },
        bindings: {
            flexible: "<?",
            wrapperClass: "@",
            btnClass: "@",
            btnActiveClass: "@",
            iconClass: "@",
            iconActiveClass: "@",
            label: "@",
            labelClass: "@",
            labelDirection: "@",
            count: "=ngModel",
            countClass: "@",
            fieldName: "@",
            min: "<?",
            max: "<?",
            step: "<?",
            ngDisabled: "<?",
            minusDisabled: "<?",
            plusDisabled: "<?",
            onMinus: "&?",
            onPlus: "&?"
        },
        controller: CounterCtrl,
        templateUrl: "/tpls/counter/counter.tpl"
    });
    function CounterCtrl($scope, $element, $attrs) {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.btnClass = ctrl.btnClass || "md-fab md-mini";
            ctrl.btnActiveClass = ctrl.btnActiveClass || "md-primary";
            ctrl.labelClass = ctrl.labelClass || "text-gray-light text-small";
            ctrl.count = angular.isNumber(ctrl.count) ? ctrl.count : 0;
            ctrl.step = angular.isNumber(ctrl.step) ? ctrl.step : 1;
        };
        this.$onChanges = function(changesObj) {
            if (!changesObj) {
                return;
            }
            if (changesObj.flexible) {
                ctrl.$manageFlexible();
            }
            if (changesObj.labelDirection) {
                ctrl.$manageLabelDirection();
            }
            if (changesObj.min || changesObj.count) {
                ctrl.$manageMin();
            }
            if (changesObj.max || changesObj.count) {
                ctrl.$manageMax();
            }
        };
        this.$manageFlexible = function() {
            ctrl.flexible = _.isBoolean(ctrl.flexible) ? ctrl.flexible : $attrs.hasOwnProperty("flexible") && (ctrl.flexible === undefined || _.isEmpty(ctrl.flexible) || ctrl.flexible);
            if (ctrl.flexible) {
                $element.addClass("flex");
            }
        };
        this.$manageLabelDirection = function() {
            ctrl.labelDirection = _.includes([ "top", "right", "bottom", "left" ], ctrl.labelDirection) ? ctrl.labelDirection : "top";
            ctrl.labelContClass = _.includes([ "right", "left" ], ctrl.labelDirection) ? "layout-row" : "layout-column";
        };
        this.$manageMin = function() {
            ctrl.min = angular.isNumber(ctrl.min) && (angular.isNumber(ctrl.max) && ctrl.min > ctrl.max) ? ctrl.max - ctrl.step : ctrl.min;
            if (angular.isNumber(ctrl.min) && ctrl.count < ctrl.min) {
                ctrl.count = ctrl.min;
            }
        };
        this.$manageMax = function() {
            ctrl.max = angular.isNumber(ctrl.max) && (angular.isNumber(ctrl.min) && ctrl.max < ctrl.min) ? ctrl.min + ctrl.step : ctrl.max;
            if (angular.isNumber(ctrl.max) && ctrl.count > ctrl.max) {
                ctrl.count = ctrl.max;
            }
        };
        this.$decrease = function(ev) {
            if (angular.isNumber(ctrl.min) && ctrl.count <= ctrl.min) {
                return false;
            }
            ctrl.count = (ctrl.count || 0) - ctrl.step;
            ctrl.$updateModel();
            ctrl.onMinus && ctrl.onMinus({
                $event: ev,
                $count: ctrl.count
            });
        };
        this.$increase = function(ev) {
            if (angular.isNumber(ctrl.max) && ctrl.count >= ctrl.max) {
                return false;
            }
            ctrl.count = (ctrl.count || 0) + ctrl.step;
            ctrl.$updateModel();
            ctrl.onPlus && ctrl.onPlus({
                $event: ev,
                $count: ctrl.count
            });
        };
        this.$updateModel = function() {
            ctrl.ngModelCtrl.$setViewValue(ctrl.count);
        };
    }
})();

(function() {
    "use strict";
    DateCounterCtrl.$inject = [ "scope", "ReservationUtils", "$translate" ];
    angular.module("itaca.components").component("chDateLeft", {
        bindings: {
            start: "<?",
            end: "<?"
        },
        controller: DateCounterCtrl,
        template: "<span>{{$ctrl.$$dateLeft}}</span>"
    });
    function DateCounterCtrl(scope, ReservationUtils, $translate) {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.$initWatchers();
        };
        this.$calculateDiff = function() {
            var start = ctrl.start ? moment(ctrl.start) : moment();
            var end = ctrl.start ? moment(ctrl.end) : moment();
            ctrl.$$dateLeft = start.to(end);
        };
        this.$initWatchers = function() {
            $scope.$watchGroup([ function() {
                return ctrl.start;
            }, function() {
                return ctrl.end;
            } ], ctrl.$calculateDiff);
        };
    }
})();

(function() {
    "use strict";
    DatePickerTriggerCtrl.$inject = [ "$scope", "$element", "$mdPanel", "$mdMedia", "DateUtils" ];
    DatePickerCtrl.$inject = [ "$scope", "mdPanelRef", "DateUtils", "$timeout" ];
    angular.module("itaca.components").component("chDatePicker", {
        require: {
            ngModelCtrl: "ngModel"
        },
        bindings: {
            buttonClass: "@",
            wrapperClass: "@",
            label: "@",
            hideLabel: "<?",
            labelPosition: "@",
            ngModel: "=",
            minDate: "<?",
            maxDate: "<?",
            errorMessages: "<?",
            useUtc: "<?",
            showDiff: "<?",
            hasBackdrop: "<?",
            hasConfirm: "<?",
            disableParentScroll: "<?",
            disableBodyScroll: "<?",
            onClose: "&?",
            ngRequired: "<?",
            ngDisabled: "<?",
            ngReadonly: "<?",
            size: "@"
        },
        controller: DatePickerTriggerCtrl,
        templateUrl: "/tpls/date-picker/date-picker-trigger.tpl"
    });
    function DatePickerTriggerCtrl($scope, $element, $mdPanel, $mdMedia, DateUtils) {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.labelPosition = _.includes([ "top", "left" ], ctrl.labelPosition) ? ctrl.labelPosition : "top";
            ctrl.hideLabel = _.isBoolean(ctrl.hideLabel) ? ctrl.hideLabel : false;
            ctrl.size = _.includes([ "small", "medium", "big" ], ctrl.size) ? ctrl.size : "big";
            ctrl.buttonClass = ctrl.buttonClass || "no-margin";
            ctrl.hasBackdrop = _.isNil(ctrl.hasBackdrop) ? false : ctrl.hasBackdrop;
            ctrl.timezone = _.isBoolean(ctrl.useUtc) && ctrl.useUtc ? "UTC" : "";
            var targetEl = $element[0].querySelector(".ch-date-picker-button");
            var position = $mdPanel.newPanelPosition().relativeTo(angular.element(targetEl)).addPanelPosition($mdPanel.xPosition.CENTER, $mdPanel.yPosition.BELOW);
            ctrl.$$config = {
                attachTo: angular.element(document.body),
                controller: DatePickerCtrl,
                controllerAs: "$ctrl",
                templateUrl: "/tpls/date-picker/date-picker.tpl",
                position: position,
                clickOutsideToClose: true,
                disableParentScroll: ctrl.disableParentScroll,
                hasBackdrop: !$mdMedia("gt-xs") || ctrl.hasBackdrop,
                fullscreen: !$mdMedia("gt-xs"),
                panelClass: "bg-white md-whiteframe-15dp",
                trapFocus: true,
                onCloseSuccess: function(panelRef, closeReason) {
                    $scope.chDatePickerTriggerForm.date.$setTouched();
                    if (_.isBoolean(closeReason) && closeReason) {
                        ctrl.$updateOriginal();
                        ctrl.onClose && ctrl.onClose(ctrl.$$data);
                    }
                    (ctrl.hasBackdrop || ctrl.disableBodyScroll) && ctrl.$$toggleBodyScroll(false);
                },
                onOpenComplete: function() {
                    (ctrl.hasBackdrop || ctrl.disableBodyScroll) && ctrl.$$toggleBodyScroll(true);
                }
            };
        };
        this.$$toggleBodyScroll = function(block) {
            angular.element(document.body).css({
                overflow: block ? "hidden" : "auto"
            });
        };
        this.$openPanel = function(ev) {
            if (ctrl.ngReadonly) {
                return;
            }
            ctrl.$$data = {
                current: ctrl.ngModel,
                min: ctrl.minDate,
                max: ctrl.maxDate
            };
            var locals = {
                hasConfirm: _.isBoolean(ctrl.hasConfirm) ? ctrl.hasConfirm : true,
                showDiff: _.isBoolean(ctrl.showDiffInCalendar) ? ctrl.showDiffInCalendar : true,
                diffLabelSingular: ctrl.diffLabelSingular,
                diffLabelPlural: ctrl.diffLabelPlural,
                useUtc: _.isBoolean(ctrl.useUtc) ? ctrl.useUtc : false,
                data: ctrl.$$data
            };
            ctrl.$$config.openFrom = ev;
            ctrl.$$config.hasBackdrop = !$mdMedia("gt-xs") || ctrl.hasBackdrop;
            ctrl.$$config.fullscreen = !$mdMedia("gt-xs");
            ctrl.$$config.locals = locals;
            $mdPanel.open(ctrl.$$config);
        };
        this.$updateOriginal = function() {
            if (!ctrl.$$data) {
                return;
            }
            $scope.chDatePickerTriggerForm.date.$setDirty();
            ctrl.ngModel = ctrl.$getDate(ctrl.$$data.current);
            ctrl.minDate = ctrl.$getDate(ctrl.$$data.min);
            ctrl.maxDate = ctrl.$getDate(ctrl.$$data.max);
        };
        this.$getDate = function(date) {
            var m = ctrl.$getMoment(date);
            return m ? m.toDate() : null;
        };
        this.$getMoment = function(date) {
            if (!date) {
                return null;
            }
            if (_.isBoolean(ctrl.useUtc) ? ctrl.useUtc : false) {
                return DateUtils.absoluteMoment(date);
            } else {
                return moment(date);
            }
        };
    }
    function DatePickerCtrl($scope, mdPanelRef, DateUtils, $timeout) {
        var _self = this;
        this.init = function() {
            _self.timezone = _.isBoolean(_self.useUtc) && _self.useUtc ? "UTC" : "";
            _self.modelOptions = _.isBoolean(_self.useUtc) && _self.useUtc ? {
                timezone: "UTC"
            } : {};
        };
        $scope.$on("md-calendar-change", function(event, date) {
            if (!_self.hasConfirm) {
                _self.confirm();
            }
        });
        this.$$getMoment = function(date) {
            if (_self.useUtc) {
                return DateUtils.absoluteMoment(date);
            } else {
                return moment(date);
            }
        };
        $scope.$watch(function() {
            return _self.data.current;
        }, function(newValue, oldValue) {
            $scope.currentDate = _self.data.end ? _self.$$getMoment(_self.data.end).toDate() : null;
        });
        this.confirm = function() {
            mdPanelRef && mdPanelRef.close(true);
        };
        this.cancel = function() {
            mdPanelRef && mdPanelRef.close(false);
        };
        this.init();
    }
})();

(function() {
    "use strict";
    DateRangePickerTriggerCtrl.$inject = [ "$scope", "$element", "$mdPanel", "$mdMedia", "DateUtils" ];
    DateRangePickerCtrl.$inject = [ "$scope", "mdPanelRef", "DateUtils", "$timeout" ];
    angular.module("itaca.components").component("chDateRangePicker", {
        bindings: {
            buttonClass: "@",
            wrapperClass: "@",
            placeholder: "@",
            label: "@",
            labelClass: "@",
            startLabel: "@",
            startHintLabel: "@",
            startInputName: "@",
            start: "=",
            startMinDate: "<?",
            startMaxDate: "<?",
            startErrorMessages: "<?",
            endLabel: "@",
            endHintLabel: "@",
            endInputName: "@",
            end: "=",
            endMinDate: "<?",
            endMaxDate: "<?",
            endErrorMessages: "<?",
            maxRange: "<?",
            useUtc: "<?",
            showDiff: "<?",
            showDiffInCalendar: "<?",
            diffLabelSingular: "@",
            diffLabelPlural: "@",
            hasBackdrop: "<?",
            largeTemplate: "<?",
            disableParentScroll: "<?",
            disableBodyScroll: "<?",
            onClose: "&?",
            ngRequired: "<?",
            ngDisabled: "<?"
        },
        controller: DateRangePickerTriggerCtrl,
        templateUrl: "/tpls/date-range-picker/date-range-picker-trigger.tpl"
    });
    function DateRangePickerTriggerCtrl($scope, $element, $mdPanel, $mdMedia, DateUtils) {
        var ctrl = this;
        this.$mdMedia = $mdMedia;
        this.$onInit = function() {
            ctrl.startInputName = ctrl.startInputName || "start";
            ctrl.endInputName = ctrl.endInputName || "end";
            ctrl.wrapperClass = ctrl.wrapperClass || "md-padding";
            ctrl.buttonClass = ctrl.buttonClass || "no-padding no-margin layout-padding";
            ctrl.hasBackdrop = _.isNil(ctrl.hasBackdrop) ? false : ctrl.hasBackdrop;
            ctrl.$$timezone = _.isBoolean(ctrl.useUtc) && ctrl.useUtc ? "UTC" : "";
            ctrl.labelClass = ctrl.labelClass || "text-gray-light";
            ctrl.largeTemplate = ctrl.largeTemplate || false;
            var targetEl = $element[0].querySelector(".ch-date-range-picker-button");
            var position = $mdPanel.newPanelPosition().relativeTo(angular.element(targetEl)).addPanelPosition($mdPanel.xPosition.CENTER, $mdPanel.yPosition.BELOW);
            ctrl.$$config = {
                attachTo: angular.element(document.body),
                controller: DateRangePickerCtrl,
                controllerAs: "$ctrl",
                templateUrl: "/tpls/date-range-picker/date-range-picker.tpl",
                position: position,
                clickOutsideToClose: true,
                disableParentScroll: ctrl.disableParentScroll,
                hasBackdrop: !$mdMedia("gt-xs") || ctrl.hasBackdrop,
                fullscreen: !$mdMedia("gt-xs"),
                panelClass: "bg-white md-whiteframe-15dp",
                trapFocus: true,
                onCloseSuccess: function(panelRef, closeReason) {
                    $scope.chDateRangePickerTriggerForm[$ctrl.startInputName].$setTouched();
                    $scope.chDateRangePickerTriggerForm[$ctrl.endInputName].$setTouched();
                    if (_.isBoolean(closeReason) && closeReason) {
                        ctrl.$updateOriginal();
                        ctrl.onClose && ctrl.onClose(ctrl.$$data);
                    }
                    (ctrl.hasBackdrop || ctrl.disableBodyScroll) && ctrl.$$toggleBodyScroll(false);
                },
                onOpenComplete: function() {
                    (ctrl.hasBackdrop || ctrl.disableBodyScroll) && ctrl.$$toggleBodyScroll(true);
                }
            };
            ctrl.calculateDiff();
        };
        this.$$toggleBodyScroll = function(block) {
            angular.element(document.body).css({
                overflow: block ? "hidden" : "auto"
            });
        };
        this.$openPanel = function(ev) {
            ctrl.$$data = {
                start: ctrl.start,
                startMinDate: ctrl.startMinDate,
                startMaxDate: ctrl.startMaxDate,
                end: ctrl.end,
                endMinDate: ctrl.endMinDate,
                endMaxDate: ctrl.endMaxDate,
                maxRange: ctrl.maxRange
            };
            var locals = {
                showDiff: _.isBoolean(ctrl.showDiffInCalendar) ? ctrl.showDiffInCalendar : true,
                diffLabelSingular: ctrl.$$diffLabelSingular,
                diffLabelPlural: ctrl.$$diffLabelPlural,
                useUtc: _.isBoolean(ctrl.useUtc) ? ctrl.useUtc : false,
                startTitle: ctrl.startHintLabel,
                endTitle: ctrl.endHintLabel,
                data: ctrl.$$data
            };
            ctrl.$$config.openFrom = ev;
            ctrl.$$config.hasBackdrop = !$mdMedia("gt-xs") || ctrl.hasBackdrop;
            ctrl.$$config.fullscreen = !$mdMedia("gt-xs");
            ctrl.$$config.locals = locals;
            $mdPanel.open(ctrl.$$config);
        };
        this.$updateOriginal = function() {
            if (!ctrl.$$data) {
                return;
            }
            $scope.chDateRangePickerTriggerForm[$ctrl.startInputName].$setDirty();
            $scope.chDateRangePickerTriggerForm[$ctrl.endInputName].$setDirty();
            ctrl.start = ctrl.$getDate(ctrl.$$data.start);
            ctrl.startMinDate = ctrl.$getDate(ctrl.$$data.startMinDate);
            ctrl.startMaxDate = ctrl.$getDate(ctrl.$$data.startMaxDate);
            ctrl.end = ctrl.$getDate(ctrl.$$data.end);
            ctrl.endMinDate = ctrl.$getDate(ctrl.$$data.endMinDate);
            ctrl.endMaxDate = ctrl.$getDate(ctrl.$$data.endMaxDate);
            ctrl.calculateDiff();
        };
        this.$getDate = function(date) {
            var m = ctrl.$getMoment(date);
            return m ? m.toDate() : null;
        };
        this.$getMoment = function(date) {
            if (!date) {
                return null;
            }
            if (_.isBoolean(ctrl.useUtc) ? ctrl.useUtc : false) {
                return DateUtils.absoluteMoment(date);
            } else {
                return moment(date);
            }
        };
        this.calculateDiff = function() {
            if ((_.isBoolean(ctrl.showDiff) ? ctrl.showDiff : true) && ctrl.end && ctrl.start) {
                ctrl.$$diff = ctrl.$getMoment(ctrl.end).diff(ctrl.$getMoment(ctrl.start), "days");
            } else {
                ctrl.$$diff = null;
            }
        };
    }
    function DateRangePickerCtrl($scope, mdPanelRef, DateUtils, $timeout) {
        var _self = this;
        this.currentView = this.currentView || "start";
        this.init = function() {
            _self.timezone = _.isBoolean(_self.useUtc) && _self.useUtc ? "UTC" : "";
            _self.modelOptions = _.isBoolean(_self.useUtc) && _self.useUtc ? {
                timezone: "UTC"
            } : {};
            _self.showDiff = _.isBoolean(_self.showDiff) ? _self.showDiff : true;
            if (_self.showDiff) {
                $scope.$watchGroup([ function() {
                    return _self.data.start;
                }, function() {
                    return _self.data.end;
                } ], function(newValues, oldValues) {
                    _self.calculateDiff();
                });
            }
        };
        $scope.$on("md-calendar-change", function(event, date) {
            _self.dateChanged = true;
            if (_self.currentView == "end" && !_self.hasConfirm) {
                _self.confirm();
            }
        });
        this.toggleView = function() {
            _self.dateChanged = false;
            if (_self.currentView == "start") {
                _self.currentView = "end";
            } else {
                _self.currentView = "start";
            }
        };
        this.checkEndDate = function(fixEnd) {
            if (!_self.data.start) return;
            var start = _self.$$getMoment(_self.data.start);
            var end = _self.$$getMoment(_self.data.end);
            var minEnd = _self.$$getMoment(start).add(1, "days");
            var maxEnd = null;
            if (_self.data.maxRange) {
                maxEnd = _self.$$getMoment(start).add(_self.data.maxRange, "days");
            }
            if (!_self.data.end || _self.$$getMoment(_self.data.end).isBefore(minEnd, "day")) {
                fixEnd ? end = minEnd.toDate() : end = null;
            } else if (maxEnd && _self.data.end && _self.$$getMoment(_self.data.end).isAfter(maxEnd, "day")) {
                fixEnd ? end = maxEnd.toDate() : end == null;
            }
            _self.updateEnd(end, minEnd.toDate(), maxEnd && maxEnd.toDate());
        };
        this.updateEnd = function(date, minDate, maxDate) {
            _self.data.end = date ? _self.$$getMoment(date).toDate() : null;
            if (minDate) {
                _self.data.endMinDate = minDate;
            }
            if (maxDate) {
                _self.data.endMaxDate = maxDate;
            }
        };
        this.calculateDiff = function() {
            if (_self.showDiff && _self.data.end && _self.data.start) {
                _self.data.diff = _self.$$getMoment(_self.data.end).diff(_self.$$getMoment(_self.data.start), "days");
            } else {
                _self.data.diff = null;
            }
        };
        this.$$getMoment = function(date) {
            if (_self.useUtc) {
                return DateUtils.absoluteMoment(date);
            } else {
                return moment(date);
            }
        };
        $scope.$watch(function() {
            return _self.data.start;
        }, function(newValue, oldValue) {
            _self.checkEndDate();
            _self.dateChanged && _self.toggleView();
        });
        $scope.$watchGroup([ function() {
            return _self.data.start;
        }, function() {
            return _self.data.end;
        } ], function(newValues, oldValues) {
            _self.$$startDate = _self.data.start ? _self.$$getMoment(_self.data.start).toDate() : null;
            $scope.$$endDate = _self.data.end ? _self.$$getMoment(_self.data.end).toDate() : null;
        });
        this.confirm = function() {
            _self.checkEndDate(true);
            mdPanelRef && mdPanelRef.close(true);
        };
        this.cancel = function() {
            mdPanelRef && mdPanelRef.close(false);
        };
        this.init();
    }
})();

(function() {
    "use strict";
    DownloadButtonCtrl.$inject = [ "$scope", "$http", "$timeout", "$log", "Dialog" ];
    angular.module("itaca.components").component("chDownloadButton", {
        bindings: {
            url: "<",
            btnClass: "@",
            label: "@",
            labelClass: "@",
            iconClass: "@",
            downloadingLabel: "@",
            downloadingClass: "@",
            downloadReadyLabel: "@",
            downloadLabel: "@",
            maxRetry: "<?",
            retryDelay: "<?",
            onError: "&?"
        },
        controller: DownloadButtonCtrl,
        template: '<span class="no-padding no-margin">' + '<md-button class="{{$ctrl.btnClass}}" ng-click="$ctrl.$download($event)" aria-label="{{$ctrl.label}}" ng-disabled="$ctrl.$$downloading">' + '<span ng-if="!$ctrl.$$downloading" class="layout-row layout-align-center-center">' + '<md-icon ng-show="$ctrl.iconClass" class="material-icons {{$ctrl.iconClass}}"></md-icon>' + '<span style="margin-left: 5px" class="{{$ctrl.labelClass}}">{{$ctrl.label}}</span>' + "</span>" + '<span ng-if="$ctrl.$$downloading" class="layout-row layout-align-center-center">' + '<md-progress-circular class="{{$ctrl.downloadingClass}}" md-mode="indeterminate" md-diameter="20"></md-progress-circular>' + '<span style="margin-left: 5px" class="{{$ctrl.labelClass}}">{{$ctrl.downloadingLabel || $ctrl.label}}</span>' + "</span>" + "</md-button>" + '<a class="ch-download-button-link" download target="_blank"></a>' + "</span>"
    });
    function DownloadButtonCtrl($scope, $http, $timeout, $log, Dialog) {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.btnClass = ctrl.btnClass || "md-raised md-primary";
            ctrl.downloadingClass = ctrl.downloadingClass || "md-accent md-hue-2";
            ctrl.maxRetry = ctrl.maxRetry || 1;
            ctrl.retryDelay = ctrl.retryDelay || 5e3;
        };
        this.$download = function(ev) {
            ctrl.$$attempt = 1;
            ctrl.$doDownload(ev);
        };
        this.$doDownload = function(ev) {
            ctrl.$$downloading = true;
            var finallyFn = function() {
                ctrl.$$attempt++;
            };
            $http.get(ctrl.url).then(function(response) {
                if (!response.data.file) {
                    ctrl.$manageRetry(true);
                } else {
                    if (bowser.ios) {
                        var data = {
                            file: response.data.file,
                            filename: response.data.filename,
                            contentType: response.data.contentType,
                            title: ctrl.downloadReadyLabel,
                            downloadLabel: ctrl.downloadLabel
                        };
                        Dialog.downloadFile(ev, data);
                    } else {
                        var linkEl = ctrl.$getLinkEl();
                        linkEl.href = "data:" + (response.data.contentType || "application/octet-stream") + ";base64," + encodeURI(response.data.file);
                        linkEl.setAttribute("download", response.data.filename);
                        if (document.createEvent) {
                            var eventObj = new MouseEvent("click", {
                                view: window,
                                bubbles: true,
                                cancelable: true
                            });
                            linkEl.dispatchEvent(eventObj);
                        } else {
                            linkEl.fireEvent("click");
                        }
                    }
                    ctrl.$$downloading = false;
                }
            }, function(response) {
                if (response.status == 412 || !ctrl.$manageRetry(response.status == 507)) {
                    $log.error("Error downloading file: " + response.data && response.data.message ? response.data.message : "");
                    ctrl.onError && ctrl.onError({
                        response: response
                    });
                    ctrl.$$downloading = false;
                }
            }).finally(finallyFn, finallyFn);
        };
        this.$manageRetry = function(longWait) {
            if (ctrl.$$attempt < ctrl.maxRetry) {
                $timeout(ctrl.$doDownload, longWait ? ctrl.retryDelay : 1e3);
                return true;
            }
            return false;
        };
        this.$getLinkEl = function() {
            var linkEl = element[0].querySelector(".ch-download-button-link");
            if (linkEl == null) {
                linkEl = document.createElement("a");
                linkEl.setAttribute("target", "_blank");
                linkEl.className = "ch-download-button-link";
                element[0].appendChild(linkEl);
            }
            return linkEl;
        };
    }
})();

(function() {
    "use strict";
    EasingBgCtrl.$inject = [ "$scope", "$element", "$window", "$timeout" ];
    angular.module("itaca.components").component("chEasingBg", {
        transclude: true,
        bindings: {
            bgClass: "@?",
            easingClass: "@?",
            easingClassLimit: "<",
            opacityLimit: "<",
            chDisabled: "<"
        },
        controller: EasingBgCtrl,
        template: '<div class="ch-easing-bg" ng-style="$ctrl.$$contStyle">' + '<div class="{{$ctrl.bgClass}}" ng-attr-style="{{$ctrl.$$bgStyle}}"></div>' + '<div ng-transclude class="{{$ctrl.$$transClass}}" ng-style="$ctrl.$$transStyle"></div>' + "</div>"
    });
    function EasingBgCtrl($scope, $element, $window, $timeout) {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.chDisabled = _.isBoolean(ctrl.chDisabled) ? ctrl.chDisabled : false;
            ctrl.bgClass = ctrl.bgClass || "bg-primary";
            ctrl.easingClass = ctrl.easingClass || "text-white";
            ctrl.easingClassLimit = isFinite(parseInt(ctrl.easingClassLimit)) ? parseInt(ctrl.easingClassLimit) : .5;
            ctrl.easingClassLimit = ctrl.easingClassLimit <= 1 ? ctrl.easingClassLimit : 1;
            ctrl.opacityLimit = isFinite(parseInt(ctrl.opacityLimit)) ? parseInt(ctrl.opacityLimit) : 450;
            ctrl.$$contStyle = {
                position: "fixed",
                width: "100%",
                top: "0",
                left: "0",
                "z-index": "25"
            };
            ctrl.$$transStyle = {
                "z-index": "1"
            };
            ctrl.$$baseBgStyle = "position: absolute; z-index: -1; height: 100%; width: 100%; top: 0; left: 0;";
            ctrl.$initWatches();
        };
        this.$postLink = function() {
            ctrl.$manageDisabled();
        };
        this.$onChanges = function(changesObj) {
            if (!changesObj) {
                return;
            }
            if (changesObj.chDisabled) {
                ctrl.$manageDisabled();
            }
        };
        this.$manageDisabled = function() {
            ctrl.chDisabled = _.isBoolean(ctrl.chDisabled) ? ctrl.chDisabled : false;
            if (ctrl.chDisabled) {
                ctrl.$disableEasing();
            } else {
                ctrl.$enableEasing();
            }
        };
        this.$enableEasing = function() {
            ctrl.$$transClass = ctrl.easingClass;
            angular.element($window).on("scroll", ctrl.$ease);
        };
        this.$disableEasing = function() {
            angular.element($window).off("scroll", ctrl.$ease);
            ctrl.$$bgStyle = ctrl.$$baseBgStyle + "opacity: 1 !important;";
            ctrl.$$transClass = "";
            $scope.$broadcast("easing-bg", {
                opacity: 1
            });
        };
        this.$ease = function() {
            if (ctrl.chDisabled) {
                ctrl.$disableEasing();
                return;
            }
            $timeout(ctrl.$doEase);
        };
        this.$doEase = function() {
            var windowsOffset = $window.pageYOffset;
            if (document.body) {
                var style = window.getComputedStyle(document.body);
                var top = style.getPropertyValue("top");
                windowsOffset += top ? Math.abs(parseInt(top)) : 0;
            }
            var offset = 0 + windowsOffset / (ctrl.opacityLimit - $element[0].childNodes[0].offsetHeight);
            var alpha = offset >= 1 ? 1 : offset;
            ctrl.$$bgStyle = ctrl.$$baseBgStyle + "opacity: " + alpha + "!important;";
            if (alpha <= ctrl.easingClassLimit) {
                ctrl.$$transClass = ctrl.easingClass;
            } else {
                ctrl.$$transClass = "";
            }
            $scope.$broadcast("easing-bg", {
                opacity: alpha
            });
            $scope.$apply();
        };
        this.$initWatches = function() {
            $scope.$watch(function() {
                return document.body.scrollHeight;
            }, ctrl.$ease);
        };
        this.$onDestroy = function() {
            ctrl.$disableEasing();
        };
    }
})();

(function() {
    "use strict";
    GalleryCtrl.$inject = [ "$scope", "AboutStorage", "Dialog", "NumberUtils" ];
    angular.module("itaca.components").component("chGallery", {
        require: {},
        bindings: {
            gallery: "<?",
            storageUrl: "<?",
            galleryTitle: "@",
            cols: "@",
            rowspan: "@?",
            ratio: "@?",
            maxItems: "<?"
        },
        controller: GalleryCtrl,
        template: '<div ng-if="$ctrl.gallery.length">' + '<md-grid-list md-cols="{{$ctrl.maxCols}}" md-row-height="{{$ctrl.ratio}}" md-gutter="6px" md-gutter-gt-sm="4px">' + '<md-grid-tile class="bg-black-light clickable" ng-repeat="photo in $ctrl.previewGallery track by $index" ng-click="$ctrl.openGallery($event, $index)" aria-lable="open gallery" ' + 'md-colspan="{{$ctrl.tilesConfig[$index].colspan}}" md-rowspan="{{$ctrl.tilesConfig[$index].rowspan}}" style="overflow: hidden;">' + "<span ng-class=\"{'locked layout-row layout-align-start-center': $last && $ctrl.more}\">" + '<strong ng-if="$last && $ctrl.more" class="locked-string locked-string-initial bg-opaque-7 text-uppercase">' + '<span ng-if="($ctrl.gallery.length - $ctrl.previewGallery.length) == 1" translate="photo.photo.other.count"></span>' + '<span ng-if="($ctrl.gallery.length - $ctrl.previewGallery.length) != 1" translate="photo.photos.other.count" translate-value-count="{{$ctrl.gallery.length - $ctrl.previewGallery.length}}"></span>' + "</strong>" + '<img ng-src="{{$ctrl.storageUrl + photo.path}}" alt="{{photo.tags[0]}}" lazy-image default-img-url="\'/resources/public/img/no-gallery-image.png\'">' + "</span>" + "</md-grid-tile>" + "</md-grid-list>" + "</div>" + '<div ng-if="!$ctrl.gallery.length">' + '<img src="/resources/public/img/no-gallery-image.png" class="full-width">' + "</div>"
    });
    function GalleryCtrl($scope, AboutStorage, Dialog, NumberUtils) {
        var ctrl = this;
        this.$onInit = function() {
            if (!ctrl.storageUrl) {
                AboutStorage.get().then(function(data) {
                    ctrl.storageUrl = data.url;
                    ctrl.initGridList();
                });
            } else {
                ctrl.initGridList();
            }
        };
        this.openGallery = function(ev, idx) {
            Dialog.showGallery(ev, ctrl.galleryTitle, ctrl.gallery, {
                storageUrl: ctrl.storageUrl,
                initialSlide: idx || 0
            });
        };
        this.initGridList = function() {
            if (_.isEmpty(ctrl.gallery)) {
                return;
            }
            ctrl.ratio = ctrl.ratio || "4:3";
            ctrl.maxCols = ctrl.gallery.length;
            if (ctrl.cols) {
                ctrl.colsArray = [];
                ctrl.totalCols = 0;
                _.forEach(ctrl.cols.split(":"), function(col) {
                    var parsed = Math.abs(parseInt(col));
                    ctrl.totalCols += parsed;
                    ctrl.colsArray.push(parsed);
                });
                ctrl.maxCols = NumberUtils.lcmArray(ctrl.colsArray);
                ctrl.maxCols = ctrl.gallery.length < ctrl.colsArray[0] ? ctrl.gallery.length : ctrl.maxCols;
            }
            ctrl.previewGallery = [];
            ctrl.more = false;
            var size = _.size(ctrl.gallery);
            if (size <= 0) {
                return;
            }
            if (size >= ctrl.totalCols) {
                var dropItemsCount = ctrl.maxItems ? size - ctrl.maxItems : size - ctrl.totalCols;
                ctrl.previewGallery = _.dropRight(ctrl.gallery, dropItemsCount);
                ctrl.more = size > ctrl.totalCols;
            } else {
                ctrl.previewGallery = ctrl.gallery;
            }
            if (ctrl.rowspan) {
                ctrl.rowspanArray = [];
                _.forEach(ctrl.rowspan.split(":"), function(row) {
                    ctrl.rowspanArray.push(Math.abs(parseInt(row)));
                });
            }
            ctrl.tilesConfig = [];
            _.forEach(ctrl.previewGallery, function(photo, index) {
                if (_.isEmpty(ctrl.colsArray)) {
                    ctrl.tilesConfig.push({
                        colspan: 1
                    });
                } else {
                    _.forEach(ctrl.colsArray, function(col, row, collection) {
                        if (index < (row == 0 ? col : col + collection[row - 1]) || row + 1 == collection.length) {
                            ctrl.tilesConfig.push({
                                colspan: ctrl.maxCols / col
                            });
                            return false;
                        }
                    });
                }
            });
            if (_.size(ctrl.tilesConfig) > 1) {
                var colCount = 0;
                _.forEach(ctrl.tilesConfig, function(config, index) {
                    if (!_.isEmpty(ctrl.rowspanArray)) {
                        colCount += config.colspan;
                        config.rowspan = ctrl.rowspanArray[Math.ceil(colCount / ctrl.maxCols) - 1] || 1;
                    } else {
                        config.rowspan = 1;
                    }
                });
            } else {
                ctrl.tilesConfig[0].rowspan = 1;
            }
        };
    }
})();

(function() {
    "use strict";
    HotelMapInfoWindowCtrl.$inject = [ "$scope" ];
    angular.module("itaca.components").component("chHotelMapInfoWindow", {
        require: {
            chHotelMapCtrl: "^chHotelMap",
            ngMapCtrl: "^ngMap"
        },
        bindings: {
            hotel: "<",
            showGallery: "<?",
            storageUrl: "@",
            markerType: "@",
            onHotelClick: "&?"
        },
        controller: HotelMapInfoWindowCtrl,
        template: '<info-window id="hotel-iw">' + '<div ng-if="$ctrl.hotel" ng-non-bindable style="max-width: 300px;">' + '<div ng-if="$ctrl.showGallery" style="width: 100; max-height: 200px">' + '<div class="relative">' + '<div class="img-top-bar">' + '<div class="img-top-left-cont layout-row">' + '<div class="md-subhead row-mini" ng-if="$ctrl.hotel.recommended">' + '<small class="label gradient-yellow">' + '<md-icon class="mdi mdi-thumb-up md-14 text-white"></md-icon>&nbsp;' + '<span translate="common.recommended"></span>' + "</small>" + "</div>" + "<div flex></div>" + '<ch-hotel-favorite ng-if="$ctrl.hotel" hotel="$ctrl.hotel"></ch-hotel-favorite>' + "</div>" + "</div>" + '<img ng-if="!$ctrl.hotel.gallery.length" class="main-image" ng-attr-alt="{{$ctrl.hotel.name}}" src="/resources/public/img/header.jpg">' + '<ch-sliding-gallery ng-if="$ctrl.hotel.gallery.length"' + 'gallery="$ctrl.hotel.gallery"' + 'dialog-title="{{$ctrl.hotel.name}}"' + "tooltip=\"{{'hotel.gallery.view.click'|translate}}\"" + 'base-url="$ctrl.storageUrl"' + 'sort="true"' + 'autoplay="0"' + 'slide-cls="bg-header"' + 'open-on-click="true">' + "</ch-sliding-gallery>" + "</div>" + "</div>" + '<div layout="column" class="md-padding no-padding-left no-padding-right no-padding-bottom text-left">' + "<div flex>" + "<div md-truncate>" + '<span class="md-subhead">{{$ctrl.hotel.name}}</span>' + "</div>" + "<div layout>" + "<div flex>" + '<div><small class="label label-inline-block gradient-gray text-white text-wrap"><span translate="hotel.type.{{$ctrl.hotel.type}}"></span></small></div>' + '<div class="md-body-1 text-gray-light">' + "<span>{{$ctrl.hotel.addressInfo.district}}</span>,&nbsp;<strong>{{$ctrl.hotel.addressInfo.city}}</strong>" + "</div>" + '<div class="md-body-1 text-gray-light">' + '<md-icon class="mdi mdi-map-marker md-14"></md-icon>&nbsp;<small><em>{{$ctrl.hotel.addressInfo.address}},&nbsp;{{$ctrl.hotel.addressInfo.zipcode}}</em></small>' + "</div>" + "</div>" + "<div ng-if=\"$ctrl.markerType == 'price'\">" + '<md-button ng-if="$ctrl.hotel.price" class="only-border border-success text-success no-margin-top no-margin-right">' + '<div class="row-mini text-left">' + '<div layout="column">' + "<small>" + '<span class="text-initial" translate="common.from"></span>' + '<i ng-if="$ctrl.hotel.price.amount.initialAmount > 0 && $ctrl.hotel.price.amount.initialAmount > $ctrl.hotel.price.amount.finalAmount">&nbsp;<del>{{$ctrl.hotel.price.amount.initialAmount|chCurrency}}</del></i>' + "</small>" + '<span class="md-subhead row-mini"><strong>{{($ctrl.hotel.price.amount.finalAmount|chCurrency)}}</strong></span>' + '<small ng-if="$ctrl.hotel.nights > 0" class="text-lowercase">' + '<span translate="common.for"></span>&nbsp;{{$ctrl.hotel.nights}}&nbsp;' + '<span ng-show="$ctrl.hotel.nights == 1" translate="common.night"></span>' + '<span ng-show="$ctrl.hotel.nights > 1" translate="common.nights"></span>' + "</small>" + "</div>" + "</div>" + "</md-button>" + '<div ng-if="!$ctrl.hotel.price" layout="column" class="text-warn">' + '<md-icon class="mdi mdi-emoticon-sad md-32 text-warn"></md-icon>' + '<strong translate="reservation.availability.missed"></strong>' + "</div>" + "</div>" + "</div>" + "</div>" + "<div ng-if=\"$ctrl.markerType == 'price'\">" + '<div layout layout-padding layout-wrap class="no-padding-right no-padding-left no-padding-bottom" ng-if="$ctrl.hotel.price && $ctrl.hotel.roomsCounter.actual >= 1">' + '<div flex-xs="100" flex-gt-xs layout layout-align="start center" class="text-success no-padding-left">' + '<strong><em translate="reservation.availability.ok.simple"></em></strong>' + "</div>" + '<div flex-xs="100" flex layout="column" class="no-padding">' + '<md-button class="bg-success no-margin-left no-margin-right" ng-click="$ctrl.$hotelClick()" aria-label="Book now">' + '<span translate="common.book"></span>' + "</md-button>" + "</div>" + "</div>" + '<div layout layout-padding layout-wrap class="no-padding-right no-padding-left no-padding-bottom" ng-if="!$ctrl.hotel.price || $ctrl.hotel.roomsCounter.actual <= 0">' + '<div flex-xs="100" flex-gt-xs layout layout-align="start center" class="text-warn no-padding-left">' + '<strong><em translate="reservation.availability.missed.full"></em></strong>' + "</div>" + '<div flex-xs="100" flex layout="column" class="no-padding">' + '<md-button class="bg-warn no-margin-left no-margin-right" ng-click="$ctrl.$hotelClick()" aria-label="Search other dates">' + '<span translate="reservation.view.other.period"></span>' + "</md-button>" + "</div>" + "</div>" + "</div>" + "</div>" + "</div>" + "</info-window>"
    });
    function HotelMapInfoWindowCtrl($scope) {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.markerType = _.includes([ "pointer", "price", "name" ], _.toLower(ctrl.markerType)) ? _.toLower(ctrl.markerType) : "pointer";
        };
        this.$hotelClick = function(ev) {
            ctrl.onHotelClick && ctrl.onHotelClick({
                $event: ev,
                hotel: ctrl.hotel
            });
        };
    }
})();

(function() {
    "use strict";
    HotelMapMarkerCtrl.$inject = [ "$scope" ];
    angular.module("itaca.components").component("chHotelMapMarker", {
        require: {
            chHotelMapCtrl: "^chHotelMap"
        },
        bindings: {
            hotel: "<",
            markerType: "@"
        },
        controller: HotelMapMarkerCtrl,
        template: '<div ng-if="$ctrl.hotel" ng-switch="$ctrl.markerType">' + '<div ng-switch-when="pointer">' + '<marker class="clickable" id="mk_{{$ctrl.hotel.id}}" ng-if="$ctrl.$$position" position="[{{$ctrl.$$position.lat()}}, {{$ctrl.$$position.lng()}}]" icon="{{$ctrl.$$markerIcon}}" on-mouseover="$ctrl.$showDetails($ctrl.hotel);"></marker>' + "</div>" + "<div ng-switch-default>" + '<custom-marker id="cmk_{{$ctrl.hotel.id}}" ng-if="$ctrl.$$position" position="[{{$ctrl.$$position.lat()}}, {{$ctrl.$$position.lng()}}]"' + 'on-click="$ctrl.$showDetails($ctrl.hotel, true)" on-mouseover="$ctrl.$setSelected($ctrl.hotel, true)" on-mouseout="$ctrl.$setSelected($ctrl.hotel, false)">' + '<div class="clickable" ng-class="{\'animated bounce\': $ctrl.hotel.selected && $ctrl.hotel.selectEffect}">' + "<div class=\"ch-marker-inner md-caption\" ng-class=\"{'bg-primary': $ctrl.markerType == 'name' || $ctrl.hotel.selected," + "'bg-primary-light': $ctrl.markerType == 'price' && !$ctrl.hotel.selected && $ctrl.hotel.price ," + "'bg-gray-light': $ctrl.markerType == 'price' && !$ctrl.hotel.selected && !$ctrl.hotel.price}\" ng-switch=\"$ctrl.markerType\">" + '<span ng-switch-when="price">' + '<div ng-if="$ctrl.hotel.price">' + "<span>{{($ctrl.hotel.price.amount.finalAmount|chCurrency)}}</span>" + "</div>" + '<div ng-if="!$ctrl.hotel.price">' + '<md-icon class="mdi mdi-emoticon-sad md-18 text-white"></md-icon>' + "</div>" + "</span>" + "<strong ng-switch-default>{{$ctrl.hotel.name}}</strong>" + "</div>" + "<div class=\"arrow-down arrow-sm\" ng-class=\"{'border-primary': $ctrl.markerType == 'name' || $ctrl.hotel.selected," + "'border-primary-light': $ctrl.markerType == 'price' && !$ctrl.hotel.selected && $ctrl.hotel.price ," + "'border-gray-light': $ctrl.markerType == 'price' && !$ctrl.hotel.selected && !$ctrl.hotel.price}\"></div>" + "</div>" + "</custom-marker>" + "</div>" + "</div>"
    });
    function HotelMapMarkerCtrl($scope) {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.markerType = _.includes([ "pointer", "price", "name" ], _.toLower(ctrl.markerType)) ? _.toLower(ctrl.markerType) : "pointer";
            ctrl.$$markerIcon = "/resources/public/img/map-marker.01.png";
            ctrl.$getMarkerPosition();
        };
        this.$getMarkerPosition = function() {
            if (!ctrl.hotel) {
                return;
            }
            var fullAddress = ctrl.hotel.addressInfo.address + ", " + ctrl.hotel.addressInfo.city + ", " + ctrl.hotel.addressInfo.zipcode;
            ctrl.chHotelMapCtrl.$$geocoder.geocode({
                address: fullAddress
            }, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    ctrl.$$position = results[0].geometry.location;
                } else {
                    console.error("Error geocoding hotel '" + ctrl.hotel.name + "' (address: " + fullAddress + "): " + status);
                }
            });
        };
        this.$setSelected = function(ev, hotel, selected) {
            if (hotel) {
                hotel.selectEffect = false;
                hotel.selected = _.isBoolean(selected) ? selected : true;
            }
        };
        this.$showDetails = function(ev, hotel, isCustomMarker) {
            if (!ctrl.chHotelMapCtrl.$$currHotel || ctrl.chHotelMapCtrl.$$currHotel.id != hotel.id) {
                ctrl.$hideDetails(ev, ctrl.chHotelMapCtrl.$$currHotel);
                ctrl.$setSelected(ev, hotel, true);
                ctrl.chHotelMapCtrl.$$currHotel = hotel;
            }
            ctrl.chHotelMapCtrl.$$map.showInfoWindow("hotel-iw", isCustomMarker ? "cmk_" + hotel.id : "mk_" + hotel.id);
        };
        this.$hideDetails = function(ev, hotel) {
            ctrl.$setSelected(ev, hotel, false);
            ctrl.chHotelMapCtrl.$$map.hideInfoWindow("hotel-iw");
        };
    }
})();

(function() {
    "use strict";
    HotelMapCtrl.$inject = [ "$scope", "$element", "$timeout" ];
    angular.module("itaca.components").component("chHotelMap", {
        bindings: {
            hotels: "<?",
            hotel: "<?",
            address: "<?",
            showGallery: "<?",
            storageUrl: "@",
            markerType: "@",
            searchParams: "<?",
            disableUi: "<?",
            disableScrollwheel: "<?",
            mapClass: "@",
            onHotelClick: "&?"
        },
        controller: HotelMapCtrl,
        template: '<ng-map class="{{$ctrl.mapClass}}" ng-style="$ctrl.$$mapStyle" default-style="false" zoom-to-inlude-markers="true" disable-default-ui="{{$ctrl.disableUi}}" ' + 'center="[{{$ctrl.$$center.lat}}, {{$ctrl.$$center.lng}}]" map-initialized="$ctrl.$initMap(map)" zoom="14" clickable-icons="false" trigger-resize="true" scrollwheel="{{!$ctrl.disableScrollwheel}}">' + '<div ng-if="$ctrl.hotel">' + '<ch-hotel-map-marker hotel="$ctrl.hotel" marker-type="{{$ctrl.markerType}}"></ch-hotel-map-marker>' + "</div>" + '<div ng-if="$ctrl.hotels" ng-repeat="hotel in $ctrl.hotels">' + '<ch-hotel-map-marker hotel="hotel" marker-type="{{$ctrl.markerType}}"></ch-hotel-map-marker>' + "</div>" + '<ch-hotel-map-info-window hotel="$ctrl.$$currHotel" marker-type="{{$ctrl.markerType}}" ' + 'show-gallery="$ctrl.showGallery" storage-url="{{$ctrl.storageUrl}}" on-hotel-click="$ctrl.onHotelClick"></ch-hotel-map-info-window>' + "</ng-map>"
    });
    function HotelMapCtrl($scope, $element, $timeout) {
        var ctrl = this;
        this.$$geocoder = new google.maps.Geocoder();
        this.$onInit = function() {
            ctrl.showGallery = _.isBoolean(ctrl.showGallery) ? ctrl.showGallery : false;
            ctrl.disableUi = _.isBoolean(ctrl.disableUi) ? ctrl.disableUi : false;
            ctrl.markerType = _.includes([ "pointer", "price", "name" ], _.toLower(ctrl.markerType)) ? _.toLower(ctrl.markerType) : "pointer";
            ctrl.mapClass = ctrl.mapClass || "flex";
            ctrl.disableScrollwheel = _.isBoolean(ctrl.disableScrollwheel) ? ctrl.disableScrollwheel : false;
            ctrl.$initLocations();
        };
        this.$initLocations = function() {
            if (!ctrl.hotel && !ctrl.hotels && !ctrl.address) {
                throw new Error("You must pass an Hotel Object or Array of Hotel Objects or address at least");
            }
            if (ctrl.hotel && !angular.isObject(ctrl.hotel)) {
                throw new Error("You must pass an Hotel Object in 'hotel' parameter");
            }
            if (ctrl.hotels && !angular.isArray(ctrl.hotels)) {
                throw new Error("You must pass an Array of Hotel Objects in 'hotels' parameter");
            }
            ctrl.$$centerObj = new google.maps.LatLng(0, 0);
            ctrl.$$center = ctrl.$$centerObj.toJSON();
        };
        this.$initMap = function(map) {
            ctrl.$$map = map;
            ctrl.$getCenter(map);
            ctrl.$initWatchers();
            google.maps.event.trigger(map, "resize");
        };
        this.$getCenter = function(map) {
            if (!map) {
                return;
            }
            if (_.isEmpty(ctrl.hotels) && _.isNil(ctrl.hotel)) {
                if (_.isNil(ctrl.address)) {
                    ctrl.$$centerObj = new google.maps.LatLng(0, 0);
                    ctrl.$updateCenter(map);
                } else {
                    $$geocoder.geocode({
                        address: ctrl.address
                    }, function(results, status) {
                        if (status == google.maps.GeocoderStatus.OK) {
                            ctrl.$$centerObj = results[0].geometry.location;
                        } else {
                            console.error("Error geocoding address: " + ctrl.address + ": " + status);
                            ctrl.$$centerObj = new google.maps.LatLng(0, 0);
                        }
                        ctrl.$updateCenter(map);
                    });
                }
            } else {
                var totalLat = 0, totalLng = 0;
                _.forEach(map.markers, function(marker) {
                    totalLat += marker.position.lat();
                    totalLng += marker.position.lng();
                });
                _.forEach(map.customMarkers, function(marker) {
                    totalLat += marker.position.lat();
                    totalLng += marker.position.lng();
                });
                var divider = _.size(map.markers) + _.size(map.customMarkers);
                ctrl.$$centerObj = divider ? new google.maps.LatLng({
                    lat: totalLat / divider,
                    lng: totalLng / divider
                }) : new google.maps.LatLng(0, 0);
                ctrl.$updateCenter(map);
            }
        };
        this.$updateCenter = function(map) {
            $timeout(function() {
                if (_.isNil(ctrl.$$centerObj)) {
                    ctrl.$$centerObj = new google.maps.LatLng(0, 0);
                }
                _.assign(ctrl.$$center, ctrl.$$centerObj.toJSON());
                google.maps.event.trigger(map, "resize");
            }, 1e3);
        };
        this.$initWatchers = function() {
            $scope.$watchCollection(function() {
                return ctrl.$$map.markers;
            }, function(newVal, oldVal) {
                ctrl.$getCenter(ctrl.$$map);
            });
            $scope.$watchCollection(function() {
                return ctrl.$$map.customMarkers;
            }, function(newVal, oldVal) {
                ctrl.$getCenter(ctrl.$$map);
            });
        };
        $scope.$watch(function() {
            var parent = $element.parent()[0];
            var paddingTop = parent.style.paddingTop || 0;
            var paddingBottom = parent.style.paddingBottom || 0;
            return parent.offsetHeight - paddingTop - paddingBottom;
        }, function(newVal, oldVal) {
            ctrl.$$mapStyle = {
                height: newVal + "px",
                width: "100%"
            };
            if (ctrl.$$map) {
                google.maps.event.trigger(ctrl.$$map, "resize");
                ctrl.$getCenter(ctrl.$$map);
            }
        });
    }
})();

(function() {
    "use strict";
    IconSelectCtrl.$inject = [ "$scope" ];
    angular.module("itaca.components").component("chIconSelect", {
        transclude: true,
        require: {
            ngModelCtrl: "ngModel"
        },
        bindings: {
            ngModel: "=",
            options: "<",
            ngDisabled: "<?",
            contClass: "@?",
            optionClass: "@?"
        },
        controller: IconSelectCtrl,
        template: '<div class="ch-icon-select {{$ctrl.contClass}}">' + '<md-button ng-repeat="option in $ctrl.options" class="ch-icon-select-option no-margin no-padding minimal-button text-wrap text-initial {{$ctrl.optionClass}}" ' + "ng-class=\"{'md-hover-icon': !option.selected}\"" + 'ng-click="$ctrl.$updateModel(option)" aria-label="{{option.label || (option.labelKey|translate)}}" ng-disabled="$ctrl.ngDisabled">' + '<div ng-if="option.iconClass" class="no-padding" layout layout-align="center center">' + '<span><md-icon class="layout-padding material-icons {{option.iconClass}} {{option.colorClass}}"  ' + 'ng-mouseover="$ctrl.$preview(option)" ng-mouseout="$ctrl.$cancelPreview()"></md-icon></span>' + "</div>" + '<div ng-if="option.label || option.labelKey" class="text-small no-padding row-1 md-icon-text {{option.colorClass}}">' + '<span ng-if="option.label" ng-bind="option.label"></span>' + '<span ng-show="!option.label && option.labelKey"><span translate="{{option.labelkey}}"></span></span>' + "</div >" + "</md-button>" + "</div>"
    });
    function IconSelectCtrl($scope) {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.contClass = ctrl.contClass || "layout-row";
            ctrl.optionClass = ctrl.optionClass || "flex md-raised";
            ctrl.$select();
            ctrl.$initWatchers();
        };
        this.$select = function(val) {
            var refValue = Math.floor(!_.isNil(val) ? val : ctrl.ngModel);
            var currOpt = _.find(ctrl.options, {
                value: refValue
            });
            ctrl.$$colorClass = currOpt ? currOpt.colorClass : null;
            _.forEach(ctrl.options, function(opt) {
                opt.selected = opt.value == refValue;
            });
            return true;
        };
        this.$preview = function(option) {
            if (!_.isEqual(ctrl.$$previewOpt, option)) {
                ctrl.$$previewOpt = angular.copy(option);
            }
        };
        this.$cancelPreview = function() {
            ctrl.$$previewOpt = null;
        };
        this.$updateModel = function(option) {
            ctrl.ngModel = option.value;
            ctrl.$cancelPreview();
        };
        this.$initWatchers = function() {
            $scope.$watchCollection(function() {
                return ctrl.$$previewOpt;
            }, function(newVal, oldVal) {
                if (newVal) {
                    if (!oldVal || newVal.value != oldVal.value) {
                        ctrl.$select(newVal.value);
                    }
                } else {
                    ctrl.$select();
                }
            });
        };
    }
})();

(function() {
    "use strict";
    InvoiceCtrl.$inject = [ "$scope" ];
    angular.module("itaca.components").component("chInvoice", {
        bindings: {
            invoice: "<"
        },
        controller: InvoiceCtrl,
        templateUrl: "/tpls/invoice/invoice.tpl"
    });
    function InvoiceCtrl($scope) {
        var ctrl = this;
        this.$onInit = function() {};
    }
})();

(function() {
    "use strict";
    CancellationPolicyCtrl.$inject = [ "$scope" ];
    angular.module("itaca.components").component("chNoShowPolicyInfo", {
        bindings: {
            noShowPolicy: "<",
            title: "@",
            titleClass: "@"
        },
        controller: CancellationPolicyCtrl,
        templateUrl: "/tpls/no-show-policy-info/no-show-policy-info.tpl"
    });
    function CancellationPolicyCtrl($scope) {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.titleClass = "md-body-1 no-margin-bottom";
        };
    }
})();

(function() {
    "use strict";
    OriginalValueCtrl.$inject = [ "$scope", "$element", "$attrs" ];
    angular.module("itaca.components").component("chOriginalValue", {
        require: {
            ngModelCtrl: "ngModel"
        },
        bindings: {
            ngModel: "=",
            referTo: "=?",
            label: "@",
            filter: "@",
            cssClass: "@"
        },
        controller: OriginalValueCtrl,
        template: '<span class="{{$ctrl.cssClass}}" ng-if="$ctrl.$$originalValue != $ctrl.ngModel">' + "<span>{{$ctrl.label}}:&nbsp;</span>" + '<span ng-if="$ctrl.filter">{{::($ctrl.$$originalValue|useFilter:$ctrl.filter)}}</span>' + '<span ng-if="!$ctrl.filter">{{::$ctrl.$$originalValue}}</span>' + "</span>"
    });
    function OriginalValueCtrl($scope, $element, $attrs) {
        var ctrl = this;
        ctrl.$onInit = function() {
            ctrl.$$originalValue = ctrl.referTo || angular.copy(ctrl.ngModel);
            ctrl.cssClass = ctrl.cssClass || "label bg-blue-sea";
        };
    }
})();

(function() {
    "use strict";
    PadTopCtrl.$inject = [ "$scope", "$element" ];
    angular.module("itaca.components").component("chPadTop", {
        transclude: true,
        bindings: {
            targetEl: "@",
            chDisabled: "<?"
        },
        controller: PadTopCtrl,
        template: '<div flex class="ch-pad-top" ng-transclude></div>'
    });
    function PadTopCtrl($scope, $element) {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.$initWatches();
        };
        this.$postLink = function() {
            ctrl.$$innerEl = angular.element($element[0].querySelector(".ch-pad-top"));
            ctrl.$setTop();
        };
        this.$onChanges = function(changesObj) {
            if (!changesObj) {
                return;
            }
            if (changesObj.targetEl || changesObj.chDisabled) {
                ctrl.$setTop();
            }
        };
        this.$setTop = function(top) {
            if (!ctrl.$$innerEl) {
                return;
            }
            top = isFinite(top) ? top : ctrl.$getTargetElHeight();
            ctrl.$$innerEl.css({
                "padding-top": ctrl.chDisabled ? 0 : top + "px"
            });
        };
        this.$getTargetElHeight = function() {
            var el = ctrl.targetEl ? document.querySelector(ctrl.targetEl) : null;
            if (!el) {
                return;
            }
            var h = el.offsetHeight;
            if (!h) {
                h = el.childNodes[0] ? el.childNodes[0].offsetHeight : h;
            }
            return h;
        };
        this.$initWatches = function() {
            $scope.$watch(ctrl.$getTargetElHeight, function(newValue, oldValue) {
                ctrl.$setTop(newValue);
            });
        };
    }
})();

(function() {
    "use strict";
    ParallaxCtrl.$inject = [ "$scope" ];
    angular.module("itaca.components").component("chParallax", {
        bindings: {
            imageUrl: "@",
            containerClass: "@",
            bgClass: "@",
            hasBackdrop: "<?"
        },
        controller: ParallaxCtrl,
        transclude: true,
        template: '<div class="ch-parallax {{$ctrl.containerClass}}">' + '<div class="ch-parallax-bg {{$ctrl.bgClass}}" ng-style="$ctrl.$$bgStyle"></div>' + '<div ng-show="$ctrl.hasBackdrop"  class="ch-parallax-backdrop"></div>' + '<div class="ch-parallax-content" ng-transclude></div>' + "</div>"
    });
    function ParallaxCtrl($scope) {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.$$bgStyle = {
                "background-image": "url(" + ctrl.imageUrl + ")"
            };
            ctrl.hasBackdrop = _.isBoolean(ctrl.hasBackdrop) ? ctrl.hasBackdrop : false;
        };
    }
})();

(function() {
    "use strict";
    PasswordInputCtrl.$inject = [ "$scope" ];
    angular.module("itaca.components").component("chPasswordInput", {
        require: {
            ngModelCtrl: "ngModel"
        },
        bindings: {
            ngModel: "=",
            containerClass: "@?",
            inputLabel: "@?",
            inputName: "@?",
            iconClass: "@?",
            showIconClass: "@?",
            hideIconClass: "@?",
            errorMessages: "<?",
            ngRequired: "<?",
            ngDisabled: "<?",
            ngReadonly: "<?",
            mdNoAsterisk: "<?"
        },
        controller: PasswordInputCtrl,
        templateUrl: "/tpls/password-input/password-input.tpl"
    });
    function PasswordInputCtrl($scope) {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.containerClass = ctrl.containerClass || "md-block";
            ctrl.inputName = ctrl.inputName || "password";
            ctrl.iconClass = _.isNil(ctrl.iconClass) || _.isBoolean(ctrl.iconClass) && ctrl.iconClass ? "mdi mdi-key md-24" : ctrl.iconClass;
            ctrl.showIconClass = _.isNil(ctrl.showIconClass) || _.isBoolean(ctrl.showIconClass) && ctrl.showIconClass ? "mdi mdi-eye md-24" : ctrl.showIconClass;
            ctrl.hideIconClass = _.isNil(ctrl.hideIconClass) || _.isBoolean(ctrl.hideIconClass) && ctrl.hideIconClass ? "mdi mdi-eye-off md-24" : ctrl.hideIconClass;
            ctrl.mdNoAsterisk = _.isBoolean(ctrl.mdNoAsterisk) ? ctrl.mdNoAsterisk : false;
        };
    }
})();

(function() {
    "use strict";
    PaymentOptionCtrl.$inject = [ "$scope" ];
    angular.module("itaca.components").component("chPaymentOption", {
        bindings: {
            paymentOption: "<",
            frequencyLabel: "@",
            sizeLabel: "@"
        },
        controller: PaymentOptionCtrl,
        templateUrl: "/tpls/payment-option/payment-option.tpl"
    });
    function PaymentOptionCtrl($scope) {
        var ctrl = this;
        this.$onInit = function() {};
    }
})();

(function() {
    "use strict";
    PaymentPolicyCtrl.$inject = [ "$scope" ];
    angular.module("itaca.components").component("chPaymentPolicyInfo", {
        bindings: {
            rateType: "<",
            cancellationPolicy: "<",
            city: "@",
            offset: "@",
            title: "@",
            titleClass: "@"
        },
        controller: PaymentPolicyCtrl,
        templateUrl: "/tpls/payment-policy-info/payment-policy-info.tpl"
    });
    function PaymentPolicyCtrl($scope) {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.titleClass = "md-body-1 no-margin-bottom";
        };
    }
})();

(function() {
    "use strict";
    PeopleCountersCtrl.$inject = [ "$scope", "$translate", "ReservationUtils" ];
    angular.module("itaca.components").component("chPeopleCounters", {
        require: {
            ngModelCtrl: "ngModel"
        },
        bindings: {
            people: "<ngModel",
            maxPeople: "<",
            min: "<",
            max: "<",
            limits: "<",
            ageRanges: "<",
            onChange: "&?"
        },
        controller: PeopleCountersCtrl,
        templateUrl: "/tpls/people-counters/people-counters.tpl"
    });
    function PeopleCountersCtrl($scope, $translate, ReservationUtils) {
        var ctrl = this;
        $scope.$on("$localeChanged", ctrl.$generateAgeHints);
        this.$onInit = function() {
            ctrl.ngModelCtrl.$overrideModelOptions({
                allowInvalid: true
            });
            ctrl.ngModelCtrl.$formatters.push(ReservationUtils.peopleSummary);
            ctrl.ngModelCtrl.$validators.min = ctrl.$checkMin;
            ctrl.ngModelCtrl.$validators.max = ctrl.$checkMax;
            ctrl.$initWatchers();
        };
        this.$onChanges = function(changesObj) {
            if (_.isEmpty(changesObj)) {
                return;
            }
            if (changesObj.people || changesObj.maxPeople || changesObj.max || changesObj.limits) {
                ctrl.$manageLimits();
            }
            if (changesObj.ageRanges) {
                ctrl.$generateAgeHints();
            }
        };
        this.$checkMin = function(modelValue) {
            if (!ctrl.min) {
                return true;
            }
            ctrl.$$guestsCount = ReservationUtils.guestsCount(modelValue);
            return ctrl.$$guestsCount.standard >= _.toInteger(ctrl.min);
        };
        this.$checkMax = function(modelValue) {
            if (!ctrl.max) {
                return true;
            }
            ctrl.$$guestsCount = ReservationUtils.guestsCount(modelValue);
            return ctrl.$$guestsCount.standard <= _.toInteger(ctrl.max);
        };
        this.$manageLimits = function() {
            ctrl.limits = ctrl.limits || {};
            ctrl.limits.adults = ctrl.$normalizeRange(ctrl.limits.adults);
            ctrl.limits.boys = ctrl.$normalizeRange(ctrl.limits.boys);
            ctrl.limits.children = ctrl.$normalizeRange(ctrl.limits.children);
            ctrl.limits.kids = ctrl.$normalizeRange(ctrl.limits.kids);
            ctrl.$$peopleLimits = angular.copy(ctrl.limits);
            var maxPeople = ctrl.maxPeople || {
                adults: ctrl.limits.adults.max,
                boys: ctrl.limits.boys.max,
                children: ctrl.limits.children.max,
                kids: ctrl.limits.kids.max
            };
            var peopleAv = ReservationUtils.peopleAvailability(maxPeople, ctrl.people, ctrl.max);
            ctrl.$$peopleLimits.adults.max = peopleAv.adults;
            ctrl.$$peopleLimits.boys.max = peopleAv.boys;
            ctrl.$$peopleLimits.children.max = peopleAv.children;
            ctrl.$$peopleLimits.kids.max = peopleAv.kids;
        };
        this.$generateAgeHints = function() {
            $translate([ "people.adults", "people.boys", "people.children", "people.kids" ]).then(function(messages) {
                ctrl.$$adultsHint = "<span>" + messages["people.adults"] + "</span>" + (ctrl.ageRanges ? "&nbsp;<small>(" + ctrl.$generateAgeRangeHtmlLabel(ctrl.ageRanges.adults) + ")</small>" : "");
                ctrl.$$boysHint = "<span>" + messages["people.boys"] + "</span>" + (ctrl.ageRanges ? "&nbsp;<small>(" + ctrl.$generateAgeRangeHtmlLabel(ctrl.ageRanges.boys) + ")</small>" : "");
                ctrl.$$childrenHints = "<span>" + messages["people.children"] + "</span>" + (ctrl.ageRanges ? "&nbsp;<small>(" + ctrl.$generateAgeRangeHtmlLabel(ctrl.ageRanges.children) + ")</small>" : "");
                ctrl.$$kidsHints = "<span>" + messages["people.kids"] + "</span>" + (ctrl.ageRanges ? "&nbsp;<small>(" + ctrl.$generateAgeRangeHtmlLabel(ctrl.ageRanges.kids) + ")</small>" : "");
            });
        };
        this.$generateAgeRangeHtmlLabel = function(ageRange) {
            if (!ageRange || !ageRange.min && !ageRange.max) {
                return;
            }
            var label = "", key = "";
            if (!_.isNil(ageRange.min) && !_.isNil(ageRange.max)) {
                key = "date.years.range.abbr";
            } else if (!_.isNil(ageRange.min)) {
                key = "date.years.min.range.abbr";
            } else {
                key = "date.years.max.range.abbr";
            }
            label = $translate.instant(key, ageRange);
            return label;
        };
        this.$normalizeRange = function(range) {
            if (!range) {
                range = {};
            }
            range.min = range.min || 0;
            return range;
        };
        this.$initWatchers = function() {
            $scope.$watchCollection(function() {
                return ctrl.people;
            }, function(newVal, oldVal) {
                if (_.isEqual(newVal, oldVal)) {
                    return;
                }
                ctrl.$manageLimits();
                ctrl.ngModelCtrl.$setDirty();
                ctrl.ngModelCtrl.$validate();
                ctrl.ngModelCtrl.$valid && ctrl.onChange && ctrl.onChange({
                    $people: ctrl.people
                });
            });
        };
    }
})();

(function() {
    "use strict";
    PeopleIconsCtrl.$inject = [ "$scope", "Dialog" ];
    angular.module("itaca.components").component("chPeopleIcons", {
        bindings: {
            people: "<",
            max: "<?",
            extraPeople: "<?",
            extraMax: "<?",
            hideDetails: "<?",
            hideInfoIcon: "<?",
            hideTooltip: "<?",
            hidePeople: "<?",
            hideExtraPeople: "<?",
            size: "@",
            theme: "@",
            iconClass: "@"
        },
        controller: PeopleIconsCtrl,
        template: '<div flex layout="column">' + '<md-button class="minimal-button no-margin" ng-class="{"layout-padding-sm": $ctrl.size == "big"}" ng-click="$ctrl.$openDetails($event)" aria-label="Show pax details">' + '<span layout layout-wrap layout-align="center center">' + '<small ng-if="!$ctrl.hidePeople && $ctrl.people.adults">' + '<span ng-if="$ctrl.size == "small"">{{$ctrl.people.adults}}</span>' + '<md-icon class="material-icons mdi {{$ctrl.iconClass}}" ng-class="{"mdi-account-multiple" : $ctrl.people.adults > 1, "mdi-account": $ctrl.people.adults == 1, "md-18": $ctrl.size == "small", "md-48": $ctrl.size == "big"}"></md-icon>' + '<span ng-if="$ctrl.size == "big" && !$ctrl.hideDetails && !$ctrl.hideInfoIcon">&nbsp;<md-icon class="material-icons mdi mdi-information-outline md-14 {{$ctrl.iconClass}}"></md-icon></span>' + '<div ng-if="$ctrl.size == "big"" class="row-1 text-wrap">' + '<ch-people-summary class="text-lowercase" people="$ctrl.$$peopleDetails"></ch-people-summary>&nbsp;' + '<span class="text-lowercase" translate="bed.beds.principal.into"></span>' + "</div>" + "</small>" + '<small ng-if="!$ctrl.hideExtraPeople && ($ctrl.extraPeople.adults || $ctrl.extraPeople.boys || $ctrl.extraPeople.children || $ctrl.extraPeople.kids)">' + '<span ng-if="!$ctrl.hidePeople">&nbsp;+&nbsp;</span>' + '<span ng-if="$ctrl.size == "small"">' + '<span ng-if="$ctrl.extraPeople.adults">{{$ctrl.extraPeople.adults}}</span>' + '<span ng-if="!$ctrl.extraPeople.adults && $$extra$$maxUnderages">{{$ctrl.$$extra$$maxUnderages}}</span>' + "</span>" + '<md-icon ng-if="$ctrl.extraPeople.adults" class="material-icons mdi {{$ctrl.iconClass}}" ng-class="{"mdi-account-multiple" : $ctrl.extraPeople.adults > 1, "mdi-account": $ctrl.extraPeople.adults == 1, "md-18": $ctrl.size == "small", "md-48": $ctrl.size == "big"}"></md-icon>' + '<md-icon ng-if="!$ctrl.extraPeople.adults && $ctrl.$$extra$$maxUnderages" class="material-icons mdi mdi-human-child {{$ctrl.iconClass}}" ng-class="{"md-14": $ctrl.size == "small", "md-36": $ctrl.size == "big"}"></md-icon>' + '<span ng-if="$ctrl.size == "big" && !$ctrl.hideDetails && !$ctrl.hideInfoIcon">&nbsp;<md-icon class="material-icons mdi mdi-information-outline md-14 {{$ctrl.iconClass}}"></md-icon></span>' + '<div ng-if="$ctrl.size == "big"" class="row-1 text-wrap">' + '<ch-people-summary class="text-lowercase" people="$ctrl.$$extraPeopleDetails"></ch-people-summary>&nbsp;' + '<span class="text-lowercase" translate="bed.otherbeds.into"></span>' + "</div>" + "</small>" + '<span ng-if="$ctrl.size == "small" && !$ctrl.hideDetails && !$ctrl.hideInfoIcon">&nbsp;<md-icon class="material-icons mdi mdi-information-outline md-14 {{$ctrl.iconClass}}"></md-icon></span>' + '<md-tooltip ng-if="!$ctrl.hideTooltip" class="auto-height text-wrap row-mini">' + '<div class="text-wrap">' + '<span ng-if="!$ctrl.hidePeople && $ctrl.people.adults">' + '<ch-people-summary class="text-lowercase" people="$ctrl.$$peopleDetails"></ch-people-summary>&nbsp;' + '<span class="text-lowercase" translate="bed.beds.principal.into"></span>' + "</span>" + '<span ng-if="!$ctrl.hideExtraPeople && ($ctrl.extraPeople.adults || $ctrl.extraPeople.boys || $ctrl.extraPeople.children || $ctrl.extraPeople.kids)">' + '<span ng-if="!$ctrl.hidePeople">&nbsp;+&nbsp;</span>' + '<ch-people-summary class="text-lowercase" people="$ctrl.$$extraPeopleDetails"></ch-people-summary>&nbsp;' + '<span class="text-lowercase" translate="bed.otherbeds.into"></span>' + "</span>" + '<span ng-if="$ctrl.$$maxUnderages || $ctrl.$$extra$$maxUnderages" class="text-lowercase">&nbsp;+&nbsp;<span translate="common.options.more.available"></span></span>' + '<div ng-if="!$ctrl.hideDetails"><em translate="common.information.further.click"></em></div>' + "</div>" + "</md-tooltip>" + "</span>" + "</md-button>" + "</div>"
    });
    function PeopleIconsCtrl($scope, Dialog) {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.theme = _.includes([ "dark", "light" ], ctrl.theme) ? ctrl.theme : "light";
            ctrl.iconClass = ctrl.iconClass || ctrl.theme != "dark" ? "text-white" : "";
            ctrl.size = _.includes([ "big", "small" ], _.toLower(ctrl.size)) ? ctrl.size : "small";
            ctrl.people = ctrl.people || {};
            ctrl.max = ctrl.max || ctrl.people.adults;
            ctrl.$$maxUnderages = _.max([ ctrl.people.boys, ctrl.people.children, ctrl.people.kids ]);
            ctrl.$$maxUnderages = ctrl.$$maxUnderages > ctrl.max ? ctrl.max : ctrl.$$maxUnderages;
            ctrl.$$peopleDetails = {
                adults: ctrl.people.adults
            };
            ctrl.extraMax = ctrl.extraMax || (ctrl.extraPeople ? _.max([ ctrl.extraPeople.adults, ctrl.extraPeople.boys, ctrl.extraPeople.children, ctrl.extraPeople.kids ]) : 0);
            ctrl.$$extra$$maxUnderages = ctrl.extraPeople ? _.max([ ctrl.extraPeople.boys, ctrl.extraPeople.children, ctrl.extraPeople.kids ]) : 0;
            ctrl.$$extra$$maxUnderages = ctrl.$$extra$$maxUnderages > ctrl.extraMax ? ctrl.extraMax : ctrl.$$extra$$maxUnderages;
            ctrl.$$extraPeopleDetails = ctrl.extraPeople && ctrl.extraPeople.adults ? {
                adults: ctrl.extraPeople.adults
            } : ctrl.extraPeople;
        };
        this.$openDetails = function(ev) {
            if (_.isBoolean(ctrl.hideDetails) ? !ctrl.hideDetails : true) {
                Dialog.paxDetails(ev, {
                    people: ctrl.people,
                    extraPeople: ctrl.extraPeople,
                    max: ctrl.max,
                    extraMax: ctrl.extraMax
                });
            }
        };
    }
})();

(function() {
    "use strict";
    PeopleInputCtrl.$inject = [ "$scope", "ReservationUtils" ];
    angular.module("itaca.components").component("chPeopleInput", {
        bindings: {
            containerClass: "@",
            inputLabel: "@",
            inputName: "@",
            people: "=",
            ngRequired: "<?",
            mdNoAsterisk: "<?",
            hasClose: "<?"
        },
        controller: PeopleInputCtrl,
        template: '<ng-form name="chPeopleInputForm">' + '<md-input-container class="{{$ctrl.containerClass}}">' + '<label><span ng-if="!$ctrl.inputLabel" translate="people.people"></span><span ng-if="$ctrl.inputLabel" ng-bind="$ctrl.inputLabel"></span></label>' + '<input type="area" name="{{$ctrl.inputName}}" ng-model="$ctrl.$$peopleSummary" class="clickable" on-click-panel=""/tpls/pax-counters.part"" has-backdrop="false"' + 'disable-parent-scroll="true" data="$ctrl.$$data" readonly ng-required="$ctrl.ngRequired" md-no-asterisk="mdNoAsterisk" has-close="$ctrl.hasClose">' + '<div ng-messages="chPeopleInputForm[$ctrl.inputName].$error">' + '<span ng-message="required"><span translate="error.required"></span></span>' + "</div>" + "</md-input-container>" + "</ng-form>"
    });
    function PeopleInputCtrl($scope, ReservationUtils) {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.containerClass = ctrl.containerClass || "md-block";
            ctrl.people = ctrl.people || {};
            ctrl.inputName = ctrl.inputName || "people";
            ctrl.mdNoAsterisk = _.isNil(ctrl.mdNoAsterisk) ? false : ctrl.mdNoAsterisk;
            ctrl.$$data = {
                people: ctrl.people
            };
            ctrl.$initWhatches();
        };
        this.$observeOriginal = function() {
            ctrl.$$data = ctrl.$$data || {};
            ctrl.$$data.people = ctrl.people;
        };
        this.$observeWorking = function() {
            _.assign(ctrl.people, ctrl.$$data.people);
            ReservationUtils.peopleSummary(ctrl.$$data.people).then(function(summary) {
                ctrl.$$peopleSummary = summary;
            });
        };
        this.$initWhatches = function() {
            $scope.$watchCollection(function() {
                return ctrl.people;
            }, ctrl.$observeOriginal);
            $scope.$watchCollection(function() {
                return ctrl.$$data.people;
            }, ctrl.$observeWorking);
        };
    }
})();

(function() {
    "use strict";
    PeoplePickerCtrl.$inject = [ "$scope", "$element", "$mdPanel", "$mdMedia", "ReservationUtils" ];
    angular.module("itaca.components").component("chPeoplePicker", {
        bindings: {
            buttonClass: "@",
            wrapperClass: "@",
            label: "@",
            labelClass: "@",
            people: "=",
            fieldName: "@",
            ngRequired: "<?",
            ngDisabled: "<?",
            hasBackdrop: "<?",
            hasConfirm: "<?",
            hasClose: "<?",
            disableParentScroll: "<?",
            disableBodyScroll: "<?",
            clickOutsideToClose: "<?",
            onClose: "&?",
            zIndex: "@",
            fullscreen: "<?",
            maxCount: "<?",
            minCount: "<?",
            errorMessages: "<?",
            showErrorIcon: "<?"
        },
        controller: PeoplePickerCtrl,
        template: '<ng-form name="chPeoplePickerForm" class="flex no-padding layout-column">' + '<md-button class="ch-people-picker-button flex minimal-button text-lowercase text-center {{$ctrl.buttonClass}}" aria-label="Change people" ng-disabled="$ctrl.ngDisabled" ng-click="$ctrl.$openPanel($event)">' + '<div class="{{$ctrl.wrapperClass}}">' + "<div ng-if=\"$ctrl.label\" class=\"layout-row layout-align-center-center\" ng-class=\"{'no-padding-top': $ctrl.$mdMedia('gt-xs'), 'md-padding': !$ctrl.$mdMedia('gt-xs') || $ctrl.$$hasPeople}\">" + '<div class="{{$ctrl.labelClass}} text-initial text-wrap row-1" ng-class="{\'text-small\': $ctrl.$$hasPeople}"><span ng-bind-html="$ctrl.label"></span></div>' + "</div>" + '<div ng-show="$ctrl.$$hasPeople" class="md-subhead text-wrap row-mini">' + '<strong><ch-people-summary people="$ctrl.people"></ch-people-summary></strong>' + "</div>" + "</div>" + '<div ng-messages="chPeoplePickerForm[$ctrl.fieldName].$error" ng-show="chPeoplePickerForm[$ctrl.fieldName].$dirty" class="text-danger text-small text-center row-1 no-padding layout-column layout-padding-sm">' + '<div ng-message="required">' + '<md-icon ng-if="$ctrl.showErrorIcon" class="mdi mdi-alert-outline material-icons md-18 text-danger"></md-icon>' + '<span class="text-wrap" translate="error.required"></span>' + "</div>" + '<div ng-message="min">' + '<md-icon ng-if="$ctrl.showErrorIcon" class="mdi mdi-alert-outline material-icons md-18 text-danger"></md-icon>' + '<span class="text-wrap" ng-if="$ctrl.errorMessages.min" ng-bind="$ctrl.errorMessages.min">' + '</span><span class="text-wrap" ng-if="!$ctrl.errorMessages.min" translate="error.field.min" translate-value-num="{{$ctrl.minCount}}"></span>' + "</div>" + "</div>" + "</md-button>" + '<input type="hidden" name="{{$ctrl.fieldName}}" ng-model="$ctrl.people" ng-required="$ctrl.ngRequired">' + "</ng-form>"
    });
    function PeoplePickerCtrl($scope, $element, $mdPanel, $mdMedia, ReservationUtils) {
        var ctrl = this;
        this.$mdMedia = $mdMedia;
        this.$onInit = function() {
            ctrl.fieldName = ctrl.fieldName || "people";
            ctrl.clickOutsideToClose = ctrl.clickOutsideToClose || true;
            ctrl.hasBackdrop = _.isNil(ctrl.hasBackdrop) ? false : ctrl.hasBackdrop;
            ctrl.buttonClass = ctrl.buttonClass || "no-margin";
            ctrl.wrapperClass = ctrl.wrapperClass || "md-padding";
            ctrl.labelClass = ctrl.labelClass || "text-gray-light";
            ctrl.$$panelClass = "bg-white md-whiteframe-15dp";
            var position = $mdPanel.newPanelPosition().relativeTo($element).addPanelPosition($mdPanel.xPosition.CENTER, $mdPanel.yPosition.BELOW);
            ctrl.$$panelConfig = {
                attachTo: angular.element(document.body),
                controller: "basePeopleCountPanelCtrl",
                controllerAs: "ctrl",
                templateUrl: "/tpls/pax-counters.part",
                position: position,
                clickOutsideToClose: ctrl.clickOutsideToClose,
                disableParentScroll: ctrl.disableParentScroll,
                hasBackdrop: ctrl.hasBackdrop,
                fullscreen: _.isBoolean(ctrl.fullscreen) ? ctrl.fullscreen : false,
                panelClass: ctrl.$$panelClass,
                locals: {
                    data: ctrl.$$workingData,
                    maxCount: ctrl.maxCount,
                    hasConfirm: ctrl.hasConfirm,
                    hasClose: ctrl.hasClose
                },
                onCloseSuccess: function(panelRef, closeReason) {
                    var tbc = _.isBoolean(ctrl.hasConfirm) ? ctrl.hasConfirm : false;
                    if (!tbc || _.isBoolean(closeReason) && closeReason) {
                        _.assign(ctrl.people, ctrl.$$workingData.people);
                        ctrl.onClose && ctrl.onClose({
                            people: ctrl.people
                        });
                    }
                    (ctrl.hasBackdrop || ctrl.disableBodyScroll) && ctrl.$toggleBodyScroll(false);
                },
                onOpenComplete: function() {
                    (ctrl.hasBackdrop || ctrl.disableBodyScroll) && ctrl.$toggleBodyScroll(true);
                }
            };
            if (ctrl.zIndex) {
                ctrl.$$panelConfig.zIndex = ctrl.zIndex;
            }
            ctrl.$initWatchers();
        };
        this.$toggleBodyScroll = function(block) {
            angular.element(document.body).css({
                overflow: block ? "hidden" : "auto"
            });
        };
        this.$openPanel = function(ev) {
            ctrl.people = ctrl.people || {};
            ctrl.$$workingData = {
                people: angular.copy(ctrl.people)
            };
            ctrl.$$panelConfig.openFrom = ev;
            ctrl.$$panelConfig.locals = {
                hasConfirm: ctrl.hasConfirm,
                hasClose: ctrl.hasClose
            };
            ctrl.$$panelConfig.locals.data = ctrl.$$workingData;
            ctrl.$$panelConfig.locals.maxCount = ctrl.maxCount;
            $mdPanel.open(ctrl.$$panelConfig);
        };
        this.$checkPeople = function() {
            ctrl.$$hasPeople = ctrl.people && (ctrl.people.adults || ctrl.people.boys || ctrl.people.children || ctrl.people.kids);
            var mc = $scope.chPeoplePickerForm[ctrl.fieldName];
            if (mc) {
                ctrl.$$hasPeople && mc.$setDirty();
                if (ctrl.minCount) {
                    var count = ReservationUtils.guestsCount(ctrl.people);
                    if (count && count.standard < ctrl.minCount) {
                        mc.$setValidity("min", false);
                    } else {
                        mc.$setValidity("min", true);
                    }
                }
            }
        };
        this.$initWatchers = function() {
            $scope.$watchCollection(function() {
                return ctrl.people;
            }, function(newVal, oldVal) {
                ctrl.$checkPeople();
            });
            $scope.$watchCollection(function() {
                return ctrl.minCount;
            }, function(newVal, oldVal) {
                ctrl.$checkPeople();
            });
        };
    }
})();

(function() {
    "use strict";
    PeopleSummaryCtrl.$inject = [ "$scope", "ReservationUtils", "$translate" ];
    angular.module("itaca.components").component("chPeopleSummary", {
        bindings: {
            people: "<",
            extraPeople: "<?",
            noDetails: "<?"
        },
        controller: PeopleSummaryCtrl,
        template: "<span>{{$ctrl.$$peopleSummary}}</span>"
    });
    function PeopleSummaryCtrl($scope, ReservationUtils, $translate) {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.$initWatchers();
        };
        this.$updateSummary = function() {
            if (ctrl.noDetails) {
                var guestsCount = ReservationUtils.guestsCount(ctrl.people, ctrl.extraPeople);
                if (!guestsCount && guestsCount.total <= 0) {
                    $translate("people.none").then(function(message) {
                        ctrl.$$peopleSummary = message;
                    });
                } else {
                    $translate("people.pax").then(function(message) {
                        ctrl.$$peopleSummary = _.toLower(guestsCount.total + " " + message);
                    });
                }
            } else {
                ReservationUtils.peopleSummary(ctrl.people, ctrl.extraPeople).then(function(message) {
                    ctrl.$$peopleSummary = message;
                });
            }
        };
        this.$initWatchers = function() {
            $scope.$watchCollection(function() {
                return ctrl.people;
            }, ctrl.$updateSummary);
            $scope.$watchCollection(function() {
                return ctrl.extraPeople;
            }, ctrl.$updateSummary);
            $scope.$watchCollection(function() {
                return ctrl.noDetails;
            }, ctrl.$updateSummary);
        };
    }
})();

(function() {
    "use strict";
    PhoneInputCtrl.$inject = [ "$scope", "$log", "REGEXP", "PhoneList" ];
    angular.module("itaca.components").component("chPhoneInput", {
        require: {
            ngModelCtrl: "ngModel"
        },
        bindings: {
            ngModel: "=",
            inputName: "@",
            label: "@",
            placeholder: "@",
            prefixLabel: "@",
            prefixPlaceholder: "@",
            searchPlaceholder: "@",
            ngPattern: "<",
            ngRequired: "=?",
            ngDisabled: "=?",
            errorMessages: "<",
            prefixErrorMessages: "<",
            noAsterisk: "<"
        },
        controller: PhoneInputCtrl,
        template: '<ng-form name="chPhoneInputForm" ng-class="{\'text-gray-light cursor-disabled\': $ctrl.ngDisabled}" layout>' + "<div>" + '<md-input-container class="md-block">' + '<label ng-show="$ctrl.prefixLabel">{{$ctrl.prefixLabel}}</label>' + '<md-select name="prefix" placeholder="{{$ctrl.prefixPlaceholder}}" ng-model="phone.prefix" ng-required="$ctrl.ngRequired" ng-disabled="$ctrl.ngDisabled" ' + 'ng-attr-md-no-asterisk="$ctrl.noAsterisk" md-container-class="selectHeader" aria-label="prefix" md-on-close="$ctrl.$clearSearchTerm()">' + '<md-subheader class="no-padding">' + '<md-select-header class="select-header bg-white">' + '<input ng-model="$ctrl.$$searchTerm.value" type="search" ng-keydown="$event.stopPropagation()" placeholder="{{$ctrl.searchPlaceholder}}"' + 'class="header-searchbox md-text" autofocus>' + "</md-select-header>" + "</md-subheader>" + '<md-option ng-repeat="prefix in $ctrl.prefixes | filter:searchTerm.value" ng-value="prefix" ng-selected="prefix.dial_code == $ctrl.$$phone.prefix.dial_code">' + '<span class="flag-icon flag-icon-{{::prefix.code}}"></span>' + "<strong>&nbsp;{{::prefix.name}}</strong>" + "<span>&nbsp;({{::prefix.dial_code}})</span>" + "</md-option>" + "</md-select>" + '<div ng-if="$ctrl.prefixErrorMessages" ng-messages="chPhoneInputForm.prefix.$error">' + '<div ng-repeat="errMsg in $ctrl.prefixErrorMessages track by $index" ng-message="{{errMsg.error}}">{{errMsg.message}}</div>' + "</div>" + "</md-input-container>" + "</div>" + "<div flex>" + '<md-input-container class="md-block no-padding-important">' + '<label ng-if="$ctrl.label">{{$ctrl.label}}</label>' + '<input type="text" name="{{$ctrl.inputName}}" placeholder="{{$ctrl.placeholder}}" ng-model="$ctrl.$$phone.number" ng-pattern="$ctrl.ngPattern" ' + '\tng-required="$ctrl.ngRequired" ng-disabled="$ctrl.ngDisabled" aria-label="{{$ctrl.label || $ctrl.placeholder}}">' + '<div ng-if="$ctrl.errorMessages" ng-messages="chPhoneInputForm[$ctrl.inputName].$error">' + '<div ng-repeat="errMsg in $ctrl.errorMessages track by $index" ng-message="{{errMsg.error}}">{{errMsg.message}}</div>' + "</div>" + "</md-input-container>" + "</div>" + "</ng-form>"
    });
    function PhoneInputCtrl($scope, $log, REGEXP, PhoneList) {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.noAsterisk = _.isBoolean(ctrl.noAsterisk) ? ctrl.noAsterisk : false;
            ctrl.inputName = ctrl.inputName || "phone";
            ctrl.ngPattern = ctrl.ngPattern || REGEXP.phone;
            ctrl.$$phone = {};
            ctrl.$$searchTerm = {
                value: ""
            };
            ctrl.$decompilePhone();
            ctrl.$loadPrefixes();
            ctrl.$initWatchers();
        };
        this.$loadPrefixes = function() {
            PhoneList.all().then(function(data) {
                _.forEach(data.content, function(value) {
                    value.code = value.code.toLowerCase();
                });
                ctrl.prefixes = data.content;
            }, function(error) {
                $log.error(error);
            });
        };
        this.$decompilePhone = function() {
            ctrl.$$phone = ctrl.$$phone || {};
            if (!ctrl.ngModel) {
                return;
            }
            PhoneList.decompile(ctrl.ngModel).then(function(data) {
                _.assign(ctrl.$$phone, data);
                if (!_.isObject(data.prefix)) {
                    ctrl.$$phone.prefix = {
                        dial_code: data.prefix
                    };
                }
            }, function(error) {
                _.assign(ctrl.$$phone, PhoneList.decompileSimple(ctrl.ngModel));
                ctrl.$$phone.prefix = {
                    dial_code: ctrl.$$phone.prefix
                };
            });
        };
        this.$clearSearchTerm = function() {
            ctrl.$$searchTerm.value = "";
        };
        this.$updateModel = function() {
            ctrl.ngModel = ctrl.$$phone && ctrl.$$phone.prefix && ctrl.$$phone.prefix.dial_code ? PhoneList.compile(ctrl.$$phone.prefix.dial_code, ctrl.$$phone.number) : ctrl.ngModel;
        };
        this.$initWatchers = function() {
            $scope.$watchCollection(function() {
                return ctrl.$$phone;
            }, function(newVal, oldVal) {
                ctrl.$updateModel();
            });
        };
    }
})();

(function() {
    "use strict";
    PriceRangePickerCtrl.$inject = [ "$scope", "$element", "$mdPanel", "$mdMedia" ];
    angular.module("itaca.components").component("chPriceRangePicker", {
        bindings: {
            min: "=?",
            max: "=?",
            title: "@",
            subtitle: "@",
            wrapperClass: "@",
            buttonClass: "@",
            type: "@",
            disableParentScroll: "<?",
            disableBodyScroll: "<?",
            hasBackdrop: "<?",
            hasConfirm: "<?",
            hasClose: "<?",
            ngDisabled: "<?"
        },
        controller: PriceRangePickerCtrl,
        template: '<ng-form name="chPriceRangePickerForm" class="flex no-padding layout-column">' + '<md-button class="ch-price-range-picker-button flex minimal-button text-initial {{$ctrl.buttonClass}}" ng-click="$ctrl.$openPanel($event)" aria-label="Change price range" ng-disabled="$ctrl.ngDisabled">' + '<div class="{{$ctrl.wrapperClass}}">' + '<div ng-show="$ctrl.max" class="text-wrap row-mini">' + '<strong ng-show="$ctrl.min">{{$ctrl.min|chCurrency}}&nbsp;-&nbsp;</strong>' + '<span ng-show="!$ctrl.min"><span translate="common.up.to"></span>&nbsp;</span>' + '<strong>{{$ctrl.max|chCurrency}}</strong>&nbsp;<span ng-if="$ctrl.type == \'nightly\'" class="text-lowercase" translate="service.type.payment.NIGHTLY"></span>' + "</div>" + '<div ng-show="!$ctrl.max">' + '<span translate="filter.by"></span>&nbsp;<span class="text-lowercase" translate="common.price"></span>' + "</div>" + "</div>" + "</md-button>" + "</ng-form>"
    });
    function PriceRangePickerCtrl($scope, $element, $mdPanel, $mdMedia) {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.type = _.includes([ "nightly", "normal" ], _.toLower(ctrl.type)) ? _.toLower(ctrl.type) : "normal";
            ctrl.hasBackdrop = _.isNil(ctrl.hasBackdrop) ? false : ctrl.hasBackdrop;
            var targetEl = $element[0].querySelector(".ch-price-range-button");
            var position = $mdPanel.newPanelPosition().relativeTo(angular.element(targetEl)).addPanelPosition($mdPanel.xPosition.CENTER, $mdPanel.yPosition.BELOW);
            ctrl.$$config = {
                attachTo: angular.element(document.body),
                controller: "priceSliderCtrl",
                controllerAs: "ctrl",
                templateUrl: "/tpls/reservation-price-slider.part",
                position: position,
                clickOutsideToClose: true,
                disableParentScroll: ctrl.disableParentScroll,
                hasBackdrop: !$mdMedia("gt-sm") || ctrl.hasBackdrop,
                fullscreen: !$mdMedia("gt-sm"),
                panelClass: "panel-medium bg-white md-whiteframe-15dp",
                trapFocus: true,
                onCloseSuccess: function(panelRef, closeReason) {
                    var tbc = _.isBoolean(ctrl.hasConfirm) ? ctrl.hasConfirm : true;
                    if (!tbc || _.isBoolean(closeReason) && closeReason) {
                        ctrl.$updateOriginal();
                    }
                    (ctrl.hasBackdrop || ctrl.disableBodyScroll) && ctrl.$toggleBodyScroll(false);
                },
                onOpenComplete: function() {
                    (ctrl.hasBackdrop || ctrl.disableBodyScroll) && ctrl.$toggleBodyScroll(true);
                }
            };
        };
        this.$toggleBodyScroll = function(block) {
            angular.element(document.body).css({
                overflow: block ? "hidden" : "auto"
            });
        };
        this.$openPanel = function(ev) {
            ctrl.$$data = {
                min: ctrl.min,
                max: ctrl.max
            };
            var locals = {
                hasConfirm: _.isBoolean(ctrl.hasConfirm) ? ctrl.hasConfirm : true,
                title: ctrl.title,
                subtitle: ctrl.subtitle,
                data: ctrl.$$data
            };
            ctrl.$$config.openFrom = ev;
            ctrl.$$config.hasBackdrop = !$mdMedia("gt-sm") || ctrl.hasBackdrop;
            ctrl.$$config.fullscreen = !$mdMedia("gt-sm");
            ctrl.$$config.locals = locals;
            $mdPanel.open(ctrl.$$config);
        };
        this.$updateOriginal = function() {
            if (!ctrl.$$data) {
                return;
            }
            ctrl.min = ctrl.$$data.min;
            ctrl.max = ctrl.$$data.max;
        };
    }
})();

(function() {
    "use strict";
    RatesheetAvailabilityCtrl.$inject = [ "$scope", "$mdMedia" ];
    angular.module("itaca.components").component("chRatesheetAvailability", {
        bindings: {
            availability: "<",
            onClick: "&?"
        },
        controller: RatesheetAvailabilityCtrl,
        templateUrl: "/tpls/ratesheet/ratesheet-availability.tpl"
    });
    function RatesheetAvailabilityCtrl($scope, $mdMedia) {
        this.$mdMedia = $mdMedia;
        var ctrl = this;
        this.$onInit = function() {};
        this.$click = function(ev) {
            ctrl.onClick && ctrl.onClick({
                $event: ev,
                $date: ctrl.availability.date
            });
        };
    }
})();

(function() {
    "use strict";
    RatesheetHeaderCtrl.$inject = [ "$scope", "$mdMedia" ];
    angular.module("itaca.components").component("chRatesheetHeader", {
        bindings: {
            header: "<",
            onToggleClosing: "&?"
        },
        controller: RatesheetHeaderCtrl,
        templateUrl: "/tpls/ratesheet/ratesheet-header.tpl"
    });
    function RatesheetHeaderCtrl($scope, $mdMedia) {
        this.$mdMedia = $mdMedia;
        var ctrl = this;
        this.$onInit = function() {};
        this.$toggleRoomTypeClosing = function(ev) {
            ctrl.onToggleClosing && ctrl.onToggleClosing({
                $event: ev,
                $date: ctrl.header.date,
                $closed: _.isBoolean(ctrl.header.roomClosed) ? !ctrl.header.roomClosed : false
            });
        };
    }
})();

(function() {
    "use strict";
    RatesheetPromotionEditCtrl.$inject = [ "$scope", "$mdMedia", "REGEXP" ];
    angular.module("itaca.components").component("chRatesheetPromotionEdit", {
        bindings: {
            promotion: "<",
            type: "@",
            onSaveMinStay: "&?"
        },
        controller: RatesheetPromotionEditCtrl,
        templateUrl: "/tpls/ratesheet/ratesheet-promotion-edit.tpl"
    });
    function RatesheetPromotionEditCtrl($scope, $mdMedia, REGEXP) {
        this.$mdMedia = $mdMedia;
        this.REGEXP = REGEXP;
        var ctrl = this;
        this.$onInit = function() {
            ctrl.$initPromotion();
        };
        this.$initPromotion = function() {
            ctrl.type = ctrl.type || "STANDARD";
        };
        this.$onChanges = function(changesObj) {
            if (!changesObj) {
                return;
            }
            if (changesObj.promotion || changesObj.type) {
                ctrl.$initPromotion();
            }
        };
        this.$saveMinStay = function() {
            var form = $scope.chRatesheetPromotionForm;
            form.$setSubmitted();
            if (form.$invalid) {
                form.minStay.$setTouched();
                return;
            }
            ctrl.onSaveMinStay && ctrl.onSaveMinStay({
                $promotion: ctrl.promotion,
                $type: ctrl.type
            });
        };
    }
})();

(function() {
    "use strict";
    RatesheetPromotionCtrl.$inject = [ "$scope", "$mdMedia" ];
    angular.module("itaca.components").component("chRatesheetPromotion", {
        bindings: {
            promotion: "<",
            type: "@",
            onToggleClosing: "&?"
        },
        controller: RatesheetPromotionCtrl,
        templateUrl: "/tpls/ratesheet/ratesheet-promotion.tpl"
    });
    function RatesheetPromotionCtrl($scope, $mdMedia) {
        this.$mdMedia = $mdMedia;
        var ctrl = this;
        this.$onInit = function() {
            ctrl.$initPromotion();
        };
        this.$initPromotion = function() {
            ctrl.type = ctrl.type || "STANDARD";
        };
        this.$onChanges = function(changesObj) {
            if (!changesObj) {
                return;
            }
            if (changesObj.promotion || changesObj.type) {
                ctrl.$initPromotion();
            }
        };
        this.$toggleClosing = function(ev) {
            var close = _.isBoolean(ctrl.promotion.enabled) ? ctrl.promotion.enabled : false;
            ctrl.onToggleClosing && ctrl.onToggleClosing({
                $event: ev,
                $promotion: ctrl.promotion,
                $type: ctrl.type,
                $closed: close
            });
        };
    }
})();

(function() {
    "use strict";
    RatesheetRateEditAmountCtrl.$inject = [ "$scope", "$mdMedia", "REGEXP" ];
    angular.module("itaca.components").component("chRatesheetRateEditAmount", {
        bindings: {
            rate: "=",
            type: "@",
            label: "@",
            ngDisabled: "<?",
            ngRequired: "<?",
            errorMessages: "<?",
            errorIcon: "<?",
            errorBg: "<?",
            validateOnInit: "<?",
            updateOn: "@",
            onChange: "&?"
        },
        controller: RatesheetRateEditAmountCtrl,
        templateUrl: "/tpls/ratesheet/ratesheet-rate-edit-amount.tpl"
    });
    function RatesheetRateEditAmountCtrl($scope, $mdMedia, REGEXP) {
        var ctrl = this;
        this.$mdMedia = $mdMedia;
        this.REGEXP = REGEXP;
        this.$$hasIconLeftClass = false;
        this.$onInit = function() {
            ctrl.$initRate();
            ctrl.$initUpdateMode();
            ctrl.$initErrorIcon();
            ctrl.$initErrorBg();
        };
        this.$postLink = function() {
            if (ctrl.validateOnInit) {
                $scope.chRatesheetRateDataForm.$setSubmitted();
            }
        };
        this.$initRate = function() {
            ctrl.rate = _.isPlainObject(ctrl.rate) ? ctrl.rate : {};
            ctrl.type = ctrl.type || "STANDARD";
            ctrl.rate.type = ctrl.type;
        };
        this.$initUpdateMode = function() {
            ctrl.updateOn = _.includes([ "default", "blur" ], ctrl.updateOn) ? ctrl.updateOn : "default";
        };
        this.$initErrorIcon = function() {
            ctrl.errorIcon = _.isNil(ctrl.errorIcon) || _.isBoolean(ctrl.errorIcon) && ctrl.errorIcon ? "mdi mdi-alert" : ctrl.errorIcon;
        };
        this.$initErrorBg = function() {
            ctrl.errorBg = _.isNil(ctrl.errorBg) || _.isBoolean(ctrl.errorBg) && ctrl.errorBg ? "bg-warn opaque" : ctrl.errorBg;
        };
        this.$onChanges = function(changesObj) {
            if (!changesObj) {
                return;
            }
            if (changesObj.rate || changesObj.type) {
                ctrl.$initRate();
            }
            if (changesObj.updateOn) {
                ctrl.$initUpdateMode();
            }
            if (changesObj.errorIcon) {
                ctrl.$initErrorIcon();
            }
            if (changesObj.errorBg) {
                ctrl.$initErrorBg();
            }
        };
        this.$onChange = function() {
            var form = $scope.chRatesheetRateDataForm;
            form.$setSubmitted();
            if (form.$invalid) {
                form.amount.$setTouched();
                return;
            }
            ctrl.onChange && ctrl.onChange({
                $rate: ctrl.rate,
                $type: ctrl.type
            });
        };
    }
})();

(function() {
    "use strict";
    RatesheetRateEditCtrl.$inject = [ "$scope", "$mdMedia" ];
    angular.module("itaca.components").component("chRatesheetRateEdit", {
        bindings: {
            rate: "<",
            type: "@",
            hideRate: "<",
            hideRestrictions: "<",
            onSave: "&?",
            onSaveMinStay: "&?"
        },
        controller: RatesheetRateEditCtrl,
        templateUrl: "/tpls/ratesheet/ratesheet-rate-edit.tpl"
    });
    function RatesheetRateEditCtrl($scope, $mdMedia) {
        this.$mdMedia = $mdMedia;
        var ctrl = this;
        this.$onInit = function() {
            ctrl.$initRate();
        };
        this.$initRate = function() {
            ctrl.type = ctrl.type || "STANDARD";
            ctrl.$$isStandard = ctrl.type == "STANDARD";
            ctrl.$$rateDataKey = ctrl.$$isStandard ? "standard" : "notRefundable";
        };
        this.$onChanges = function(changesObj) {
            if (!changesObj) {
                return;
            }
            if (changesObj.rate || changesObj.type) {
                ctrl.$initRate();
            }
        };
        this.$saveMinStay = function() {
            var form = $scope.chRatesheetRateForm;
            form.$setSubmitted();
            if (form.$invalid) {
                form.minStay.$setTouched();
                return;
            }
            ctrl.onSaveMinStay && ctrl.onSaveMinStay({
                $rate: ctrl.rate,
                $type: ctrl.type
            });
        };
        this.$saveRate = function() {
            var form = $scope.chRatesheetRateForm;
            form.$setSubmitted();
            if (form.$invalid) {
                form.amount.$setTouched();
                return;
            }
            ctrl.onSave && ctrl.onSave({
                $rate: ctrl.rate,
                $type: ctrl.type
            });
        };
    }
})();

(function() {
    "use strict";
    RatesheetRateCtrl.$inject = [ "$scope", "$mdMedia" ];
    angular.module("itaca.components").component("chRatesheetRate", {
        bindings: {
            rate: "<",
            type: "@",
            onToggleClosing: "&?"
        },
        controller: RatesheetRateCtrl,
        templateUrl: "/tpls/ratesheet/ratesheet-rate.tpl"
    });
    function RatesheetRateCtrl($scope, $mdMedia) {
        this.$mdMedia = $mdMedia;
        var ctrl = this;
        this.$onInit = function() {
            ctrl.$initRate();
        };
        this.$initRate = function() {
            ctrl.type = ctrl.type || "STANDARD";
            ctrl.$$isStandard = ctrl.type == "STANDARD";
            ctrl.$$rateDataKey = ctrl.$$isStandard ? "standard" : "notRefundable";
        };
        this.$onChanges = function(changesObj) {
            if (!changesObj) {
                return;
            }
            if (changesObj.rate || changesObj.type) {
                ctrl.$initRate();
            }
        };
        this.$toggleRateClosing = function(ev) {
            var rateData = ctrl.rate[ctrl.$$rateDataKey];
            var close = rateData && rateData.enabled;
            close = _.isBoolean(close) ? close : false;
            ctrl.onToggleClosing && ctrl.onToggleClosing({
                $event: ev,
                $rate: ctrl.rate,
                $type: ctrl.type,
                $closed: close
            });
        };
    }
})();

(function() {
    "use strict";
    angular.module("itaca.components").component("chReviewActionsContent", {
        transclude: true,
        require: {
            chReviewActionsCtrl: "^chReviewActions"
        },
        controller: ReviewActionsContentCtrl,
        template: "<div ng-transclude></div>"
    });
    function ReviewActionsContentCtrl() {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.chReviewActionsCtrl.noDefault = true;
        };
        this.$onDestroy = function() {
            ctrl.chReviewActionsCtrl.noDefault = false;
        };
    }
})();

(function() {
    "use strict";
    ReviewActionsCtrl.$inject = [ "$scope", "Navigator" ];
    angular.module("itaca.components").component("chReviewActions", {
        transclude: true,
        require: {
            chReviewCtrl: "^chReview"
        },
        bindings: {
            actions: "<?"
        },
        controller: ReviewActionsCtrl,
        template: '<div flex ng-if="!$ctrl.noDefault && !$ctrl.hideAction">' + "<md-divider></<md-divider>" + '<div class="flex layout-row layout-wrap">' + '<div ng-repeat="action in $ctrl.actions" ng-if="!action.hide" ng-class="{\'flex-33\': $ctrl.actions.length <= 3, \'flex\': $ctrl.actions.length > 3}" layout>' + '<div class="flex layout-column">' + '<md-button class="no-margin {{btnClass}}" ng-disabled="action.disabled" ng-click="$ctrl.$actionClick($event, action)" aria-label="{{action.label}}">' + '<md-icon ng-if="action.icon" class="{{::action.icon}} material-icons"></md-icon>&nbsp;' + '<span ng-if="action.label" class="text-initial" ng-bind-html="action.label"></span>' + "</md-button>" + "</div>" + "<md-divider></<md-divider>" + "</div>" + "</div>" + "<md-divider></<md-divider>" + "</div>"
    });
    function ReviewActionsCtrl($scope, Navigator) {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.hideAction = _.isEmpty(ctrl.actions) ? true : false;
            ctrl.$initReview();
        };
        this.$initReview = function() {
            if (!ctrl.chReviewCtrl.review) {
                return;
            }
            ctrl.review = ctrl.chReviewCtrl.review;
        };
        this.$actionClick = function(ev, action) {
            action.onClick && action.onClick.apply(this, [ ev, ctrl.review ].concat(action.onClickParams));
        };
    }
})();

(function() {
    "use strict";
    ReviewContentCtrl.$inject = [ "$scope" ];
    angular.module("itaca.components").component("chReviewContent", {
        transclude: true,
        require: {
            chReviewCtrl: "^chReview"
        },
        bindings: {
            showDate: "<",
            dateFormat: "@"
        },
        controller: ReviewContentCtrl,
        template: "<div>" + '<div class="layout-row layout-wrap layout-align-center-center layout-padding">' + '<div class="layout-column flex-xs-100 flex-sm-100 flex-gt-sm">' + '<div ng-show="!$ctrl.review.showDetails">' + '<div class="md-margin ng-scope no-margin-top no-margin-x-sides">' + '<small><span translate="review.score.total"></span>:</small>' + '<md-progress-linear md-mode="determinate" value="{{($ctrl.review.score * 10)}}"></md-progress-linear>' + "</div>" + "</div>" + '<div ng-show="$ctrl.review.showDetails">' + '<div ng-repeat="feedback in $ctrl.review.feedbacks track by $index" class="md-margin ng-scope no-margin-top no-margin-x-sides"' + 'title="{{::feedback.value}}" ng-switch="feedback.type">' + '<small class="layout-row flex-100"><span class="flex" translate="{{::feedback.titleKey}}" translate-values="{{feedback.titleParams}}"></span><span ng-if="feedback.type == \'RANK\'">{{::feedback.value}}</span></small>' + '<md-progress-linear ng-switch-when="RANK" md-mode="determinate" value="{{(feedback.value * 10)}}"></md-progress-linear>' + "<div ng-switch-default>" + '<small ng-if="feedback.value">{{feedback.value}}</small>' + '<small ng-if="!feedback.value" class="text-gray-light text-lowercase"><em>({{::(\'review.comment.none\'|translate)}})</em></small>' + "</div>" + "</div>" + "</div>" + '<div class="text-right">' + '<md-button class="auto-height no-margin row-1 text-capitalize text-gray-light text-small" ng-click="$ctrl.review.showDetails = !$ctrl.review.showDetails" aria-label="show details">' + '<span ng-if="!$ctrl.review.showDetails" translate="common.show"></span>' + '<span ng-if="$ctrl.review.showDetails" translate="common.hide"></span>' + '&nbsp;<span class="text-lowercase" translate="common.details"></span>' + "<md-icon ng-class=\"$ctrl.review.showDetails ? 'mdi-chevron-up' : 'mdi-chevron-down'\" class=\"mdi md-18\"></md-icon>" + "</md-button>" + "</div>" + "</div>" + "<div class=\"flex-100 flex-gt-sm-25 layout-column\" ng-class=\"$ctrl.review.showDetails ? 'layout-align-center-center' : 'layout-align-start-center'\">" + '<small ng-if="$ctrl.review.showDetails" class="font-12 text-gray-light text-center" translate="review.score.total"></small>' + '<span class="md-headline">{{::$ctrl.review.score.toFixed(1)}}</span>' + '<span class="text-center" translate="{{$ctrl.review.label}}"></span>' + "</div>" + "</div>" + '<div class="overflow-hidden" ng-transclude></div>' + '<div ng-if="$ctrl.review.createdDate && $ctrl.showDate">' + "<md-divider></md-divider>" + '<div class="layout-padding text-gray-light">' + "<small>{{$ctrl.review.createdDate|utcDate:$ctrl.dateFormat}}</small>" + "</div>" + "</div>" + "</div>"
    });
    function ReviewContentCtrl($scope) {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.$initReview();
            ctrl.showDate = _.isBoolean(ctrl.showDate) ? ctrl.showDate : false;
            ctrl.dateFormat = !_.isNil(ctrl.dateFormat) ? ctrl.dateFormat : ctrl.chReviewCtrl.dateFormat;
        };
        this.$initReview = function() {
            if (!ctrl.chReviewCtrl.review) {
                return;
            }
            ctrl.review = ctrl.chReviewCtrl.review;
            ctrl.review.showDetails = true;
        };
    }
})();

(function() {
    "use strict";
    ReviewGalleryCtrl.$inject = [ "AppOptions", "$translate", "Dialog" ];
    angular.module("itaca.components").component("chReviewGallery", {
        transclude: true,
        require: {
            chReviewCtrl: "^chReview"
        },
        bindings: {
            imgBaseUrl: "@?",
            defaultImgUrl: "@?",
            title: "@"
        },
        controller: ReviewGalleryCtrl,
        template: '<div ng-if="$ctrl.review.gallery.length" flex layout-padding>' + '<div class="layout-row layout-wrap layout-padding-sm layout-align-center-center layout-align-gt-sm-start-center">' + '<span class="flex-100 font-12 ng-scope no-padding-bottom text-gray-light">' + '<span ng-if="!$ctrl.title"><span translate="common.gallery"></span>:</span>' + '<span ng-if="$ctrl.title" ng-bind="$ctrl.title"></span>' + "</span>" + '<div ng-repeat="photo in $ctrl.review.gallery" class="clickable" ng-click="$ctrl.$openGallery($event, $index)" aria-label="Open review gallery">' + '<img ng-src="{{$ctrl.imgBaseUrl + photo.path}}" alt="{{photo.tags[0]}}" lazy-image' + 'default-img-url="{{$ctrl.defaultImgUrl}}" class="width-100">' + "</div>" + "</div>" + "</div>"
    });
    function ReviewGalleryCtrl(AppOptions, $translate, Dialog) {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.imgBaseUrl = ctrl.imgBaseUrl || ctrl.chReviewCtrl.imgBaseUrl;
            if (_.isBoolean(ctrl.imgBaseUrl)) {
                ctrl.imgBaseUrl = ctrl.imgBaseUrl && AppOptions.config && AppOptions.config.amz ? AppOptions.config.amz.baseUrl + "/" + AppOptions.config.amz.bucketName + "/" : "";
            }
            ctrl.defaultImgUrl = ctrl.defaultImgUrl || "/resources/public/img/no-gallery-image.png";
            ctrl.$initReview();
        };
        this.$initReview = function() {
            if (!ctrl.chReviewCtrl.review) {
                return;
            }
            ctrl.review = ctrl.chReviewCtrl.review;
        };
        this.$openGallery = function(ev, idx) {
            $translate(ctrl.review.label).then(function(message) {
                var title = ctrl.review.score + ":&nbsp;";
                title += ctrl.review.title ? ctrl.review.title : message;
                Dialog.showGallery(ev, title, ctrl.review.gallery, {
                    storageUrl: ctrl.imgBaseUrl,
                    initialSlide: idx || 0
                });
            });
        };
    }
})();

(function() {
    "use strict";
    ReviewHotelInfoCtrl.$inject = [ "$scope", "AppOptions" ];
    angular.module("itaca.components").component("chReviewHotelInfo", {
        transclude: true,
        require: {
            chReviewCtrl: "^chReview"
        },
        bindings: {
            hideImage: "<?",
            imgBaseUrl: "@?"
        },
        controller: ReviewHotelInfoCtrl,
        template: '<div flex layout-padding class="md-subhead row-mini text-bold">' + '<a ng-href="{{\'/hotel/\'+ $ctrl.review.hotel.id}}" target="_blank" class="ch-review-hotel-info-link display-block clickable">' + '<span class="layout-row layout-align-start-center">' + '<img ng-if="!$ctrl.hideImage && $ctrl.$$hotelImage" class="md-margin menu-user-avatar-small no-margin-left no-margin-y-sides" ng-src="{{$ctrl.$$hotelImage}}">' + '<span class="no-padding layout-column">' + "<span>" + '<span class="text-primary">{{::$ctrl.review.hotel.name}}&nbsp;</span>' + '<span class="label label-xs" translate="hotel.type.{{::$ctrl.review.hotel.type}}"></span>' + "</span>" + '<small class="text-gray-light">' + "<span>{{::$ctrl.review.hotel.addressInfo.city}}</span>,&nbsp;" + "<span>{{::$ctrl.review.hotel.addressInfo.address}}</span>" + "</small>" + "</span>" + "</span>" + '<md-tooltip><span translate="hotel.go"></span></md-tooltip>' + "</a>" + "</div>"
    });
    function ReviewHotelInfoCtrl($scope, AppOptions) {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.hideImage = _.isBoolean(ctrl.hideImage) ? ctrl.hideImage : false;
            ctrl.imgBaseUrl = ctrl.imgBaseUrl || ctrl.chReviewCtrl.imgBaseUrl;
            if (_.isBoolean(ctrl.imgBaseUrl)) {
                ctrl.imgBaseUrl = ctrl.imgBaseUrl && AppOptions.config && AppOptions.config.amz ? AppOptions.config.amz.baseUrl + "/" + AppOptions.config.amz.bucketName + "/" : "";
            }
            ctrl.$initReview();
            ctrl.$getHotelImage();
        };
        this.$initReview = function() {
            if (!ctrl.chReviewCtrl.review) {
                return;
            }
            ctrl.review = ctrl.chReviewCtrl.review;
        };
        this.$getHotelImage = function() {
            var hotelImage = null;
            _.forEach(ctrl.review.hotel.gallery, function(photo, index, collection) {
                if (index == 0) {
                    hotelImage = ctrl.imgBaseUrl + photo.path;
                }
                if (photo.cover) {
                    hotelImage = ctrl.imgBaseUrl + photo.path;
                    return false;
                }
            });
            ctrl.$$hotelImage = hotelImage;
        };
    }
})();

(function() {
    "use strict";
    ReviewLikesCtrl.$inject = [ "$scope", "AppOptions" ];
    angular.module("itaca.components").component("chReviewLikes", {
        require: {
            chReviewCtrl: "^chReview"
        },
        bindings: {
            contentClass: "@"
        },
        controller: ReviewLikesCtrl,
        template: '<div ng-if="$ctrl.review.likes.length" class="{{$ctrl.contentClass}}" >' + "<small>" + '<md-icon class="mdi md-14 mdi-thumb-up text-primary"></md-icon>&nbsp;' + '<span ng-if="!$ctrl.review.helpful" class="text-lowercase">' + "<span>{{$ctrl.review.likes.length}}&nbsp;</span>" + '<span ng-if="$ctrl.review.likes.length == 1" translate="review.likes.count"></span>' + '<span ng-if="$ctrl.review.likes.length != 1" translate="review.likes.count.plur"></span>' + "</span>" + '<span ng-if="$ctrl.review.helpful">' + '<span ng-if="$ctrl.review.likes.length == 1" translate="review.likes.you"></span>' + '<span ng-if="$ctrl.review.likes.length > 1" ng-switch on="$ctrl.review.likes.length-1">' + '<span ng-switch-when="1" translate="review.likes.you.other"></span>' + '<span ng-switch-default translate="review.likes.you.others" translate-values="{num: $ctrl.review.likes.length-1}"></span>' + "</span>" + "</span>" + "</small>" + "</div>"
    });
    function ReviewLikesCtrl($scope, AppOptions) {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.contentClass = ctrl.contentClass || "layout-padding bg-gray-lighter text-primary";
            ctrl.$initReview();
            ctrl.$initLikes();
            ctrl.$initWatchers();
        };
        this.$initReview = function() {
            if (!ctrl.chReviewCtrl.review) {
                return;
            }
            ctrl.review = ctrl.chReviewCtrl.review;
        };
        this.$initLikes = function() {
            ctrl.review.helpful = AppOptions.guest && AppOptions.guest.id && _.some(ctrl.review.likes, function(userId) {
                return _.isEqual(userId, AppOptions.guest.id);
            });
        };
        this.$initWatchers = function() {
            $scope.$watchCollection(function() {
                return ctrl.review.likes;
            }, function(newVal, oldVal) {
                ctrl.$initLikes();
                ctrl.review.thanksNow = _.isEqual(newVal, oldVal) ? false : Boolean(ctrl.review.helpful);
            });
        };
    }
})();

(function() {
    "use strict";
    angular.module("itaca.components").component("chReviewProCon", {
        transclude: true,
        require: {
            chReviewCtrl: "^chReview"
        },
        bindings: {
            textLimit: "<?",
            showHint: "<?"
        },
        controller: ReviewProConCtrl,
        template: '<div ng-if="$ctrl.review.pro || $ctrl.review.con || ($ctrl.review.hint && $ctrl.showHint)" flex layout-padding>' + '<div ng-if="$ctrl.review.pro" class="md-padding no-padding-top">' + '<md-icon class="mdi mdi-thumb-up-outline text-success md-24"></md-icon>&nbsp;' + '<strong><span translate="review.pro"></span>:</strong>' + '<div class="layout-margin no-margin-x-sides text-ellipsis">' + '<span hm-read-more hm-text="{{$ctrl.review.pro}}" hm-limit="$ctrl.textLimit"' + "hm-more-text=\"{{'common.read.more'|translate}}\"" + "hm-less-text=\"{{'common.read.less'|translate}}\"" + 'hm-link-class="clickable text-primary"></span>' + "</div>" + "</div>" + '<div ng-if="$ctrl.review.con" class="md-padding no-padding-top">' + '<md-icon class="mdi mdi-thumb-down-outline text-warn md-24"></md-icon>&nbsp;' + '<strong><span translate="review.con"></span>:</strong>' + '<div class="layout-margin no-margin-x-sides text-ellipsis">' + '<span hm-read-more hm-text="{{$ctrl.review.con}}" hm-limit="$ctrl.textLimit"' + "hm-more-text=\"{{'common.read.more'|translate}}\"" + "hm-less-text=\"{{'common.read.less'|translate}}\"" + 'hm-link-class="clickable text-primary"></span>' + "</div>" + "</div>" + '<div ng-if="$ctrl.review.hint && $ctrl.showHint" class="md-padding no-padding-top">' + '<md-icon class="mdi mdi-message-text md-24"></md-icon>&nbsp;' + '<strong><span translate="common.hints"></span>:</strong>' + '<div class="layout-margin no-margin-x-sides text-ellipsis">' + '<span hm-read-more hm-text="{{$ctrl.review.hint}}" hm-limit="$ctrl.textLimit"' + "hm-more-text=\"{{'common.read.more'|translate}}\"" + "hm-less-text=\"{{'common.read.less'|translate}}\"" + 'hm-link-class="clickable text-primary"></span>' + "</div>" + "</div>" + "</div>"
    });
    function ReviewProConCtrl() {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.textLimit = isFinite(parseInt(ctrl.textLimit)) ? parseInt(ctrl.textLimit) : 200;
            ctrl.showHint = _.isBoolean(ctrl.showHint) ? ctrl.showHint : false;
            ctrl.$initReview();
        };
        this.$initReview = function() {
            if (!ctrl.chReviewCtrl.review) {
                return;
            }
            ctrl.review = ctrl.chReviewCtrl.review;
        };
    }
})();

(function() {
    "use strict";
    angular.module("itaca.components").component("chReviewReplyContent", {
        transclude: true,
        require: {
            chReviewReplyCtrl: "^chReviewReply"
        },
        controller: ReviewReplyContentCtrl,
        template: "<div ng-transclude></div>"
    });
    function ReviewReplyContentCtrl() {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.chReviewReplyCtrl.noDefault = true;
        };
        this.$onDestroy = function() {
            ctrl.chReviewReplyCtrl.noDefault = false;
        };
    }
})();

(function() {
    "use strict";
    ReviewReplyCtrl.$inject = [ "$scope", "$q", "$mdMedia" ];
    angular.module("itaca.components").component("chReviewReply", {
        transclude: true,
        require: {
            chReviewCtrl: "^chReview"
        },
        bindings: {
            ngReadonly: "<?",
            ngEdit: "<?",
            showReply: "<?",
            replyTitle: "@",
            onReply: "&?",
            onCancelReply: "&?",
            responseClass: "@?",
            arrowClass: "@?"
        },
        controller: ReviewReplyCtrl,
        template: '<div ng-if="$ctrl.showReply || $ctrl.review.reply.response || $ctrl.noDefault" class="ch-review-reply">' + '<div class="ch-review-reply-arrow {{$ctrl.arrowClass}}"></div>' + '<div class="layout-padding no-padding ch-review-reply-inner {{$ctrl.responseClass}}">' + '<div ng-if="!$ctrl.noDefault" class="layout-padding">' + '<div class="layout-row layout-padding-sm no-padding layout-align-start-center">' + "<div flex>" + '<strong ng-if="!$ctrl.replyTitle"><span translate="common.answer"></span>:</strong>' + '<strong ng-if="$ctrl.replyTitle" ng-bind="$ctrl.replyTitle"></strong>' + "</div>" + '<md-button ng-if="$ctrl.$$currentMode == \'edit\'" class="no-margin auto-height row-1 text-lowercase text-gray-light" ' + 'ng-click="$ctrl.$cancelEdit($event, true)" aria-label="Cancel reply">' + '<small translate="common.cancel"></small>' + "</md-button>" + "</div>" + '<div ng-if="$ctrl.$$currentMode == \'view\'" class="layout-row layout-align-start-center no-padding-top no-padding-bottom no-padding-right">' + '<div class="flex text-wrap">' + '<span hm-read-more hm-text="{{$ctrl.review.reply.response}}" hm-limit="200" hm-more-text="{{\'common.read.more\'|translate}}"' + 'hm-less-text="{{\'common.read.less\'|translate}}" hm-link-class="clickable text-primary"></span>' + "</div>" + '<div ng-if="$ctrl.review.reply.response">' + '<div class="no-padding-left no-padding-right no-padding-bottom">' + '<md-button ng-if="!$ctrl.ngReadonly || $ctrl.ngEdit" class="no-margin text-lowercase text-gray-light" ng-class="{\'md-icon-button\': !$ctrl.$mdMedia(\'gt-sm\')}"' + 'ng-click="$ctrl.$edit()" aria-label="Edit reply">' + "<md-icon class=\"mdi mdi-pencil\" ng-class=\"{'md-18': !$ctrl.$mdMedia('gt-sm'), 'md-14': $ctrl.$mdMedia('gt-sm')}\"></md-icon>" + '<small hide show-gt-sm translate="common.edit"></small>' + '<md-tooltip hide-gt-sm><span translate="common.edit"></span></md-tooltip>' + "</md-button>" + "</div>" + "</div>" + "</div>" + '<div ng-if="$ctrl.$$currentMode == \'edit\'" class="no-padding-top no-padding-bottom no-padding-right">' + '<div layout layout-padding-sm class="layout-align-start-center">' + "<div flex>" + '<md-input-container md-no-float class="md-block bg-white border-radius minimal-input no-margin">' + '<textarea placeholder="{{\'review.reply.label\'|translate}}..." ng-model="$ctrl.$$reply" ng-disabled="$ctrl.$$saving" ' + 'max-rows="5" md-no-resize autofocus></textarea>' + "</md-input-container>" + '<md-progress-linear md-mode="query" ng-show="$ctrl.$$saving"></md-progress-linear>' + "</div>" + '<div ng-if="$ctrl.$$error" class="am-fade-and-scale">' + '<md-icon class="mdi mdi-alert-circle-outline md-18 text-danger material-icons"></md-icon>' + '<md-tooltip><span translate="error.review.reply.saving"></span></md-tooltip>' + "</div>" + '<div layout layout-align="center end" class="no-padding am-fade-and-scale" ng-if="$ctrl.$$reply && $ctrl.$$reply != $ctrl.$$oriReply">' + '<md-button class="md-icon-button" ng-class="{\'md-raised\':$ctrl.$$reply}" ng-disabled="!$ctrl.$$reply || $ctrl.$$reply == $ctrl.$$oriReply || $ctrl.$$saving" ' + 'ng-click="$ctrl.$save($event)" aria-label="Send reply">' + '<md-icon class="mdi mdi-send md-24 material-icons" ng-class="{\'text-gray-light\': $ctrl.$$reply && $ctrl.$$reply != $ctrl.$$oriReply}"></md-icon>' + "</md-button>" + "</div>" + "</div>" + '<div ng-if="!$ctrl.$$saving && $ctrl.$$error" class="layout-padding-sm text-danger am-fade-and-scale">' + '<small ng-if="$ctrl.error != true" ng-bind="$ctrl.$$error"></small>' + '<small ng-if="$ctrl.error == true" translate="error.review.reply.saving"></small>' + "</div>" + "</div>" + "</div>" + '<div ng-transclude class="no-padding"></div>' + "</div>" + "</div>"
    });
    function ReviewReplyCtrl($scope, $q, $mdMedia) {
        var ctrl = this;
        this.$mdMedia = $mdMedia;
        this.$onInit = function() {
            ctrl.$initReview();
            ctrl.$$currentMode = "view";
            ctrl.ngReadonly = _.isBoolean(ctrl.ngReadonly) ? ctrl.ngReadonly : true;
            ctrl.ngEdit = _.isBoolean(ctrl.ngEdit) ? ctrl.ngEdit : false;
            ctrl.responseClass = ctrl.responseClass || "bg-info-light";
            ctrl.arrowClass = ctrl.arrowClass || "border-info-light";
            ctrl.$manageShowReply();
        };
        this.$onChanges = function(changesObj) {
            if (!changesObj) {
                return;
            }
            if (changesObj.ngEdit && !changesObj.ngEdit.isFirstChange() || changesObj.ngReadonly && !changesObj.ngReadonly.isFirstChange()) {
                ctrl.$edit();
            }
            if (changesObj.showReply) {
                ctrl.$manageShowReply();
                ctrl.showReply && (!ctrl.review.reply || !ctrl.review.reply.response) && ctrl.$edit();
            }
        };
        this.$initReview = function() {
            if (!ctrl.chReviewCtrl.review) {
                return;
            }
            ctrl.review = ctrl.chReviewCtrl.review;
            if (!ctrl.ngReadonly && (!ctrl.review.reply || !ctrl.review.reply.response)) {
                ctrl.$$currentMode = "edit";
            }
        };
        this.$manageShowReply = function() {
            if (!ctrl.review) {
                return;
            }
            ctrl.showReply = ctrl.review.reply && ctrl.review.reply.response ? true : _.isBoolean(ctrl.showReply) ? ctrl.showReply : false;
        };
        this.$edit = function() {
            if (ctrl.ngReadonly || !ctrl.ngEdit) {
                ctrl.$cancelEdit();
                return;
            }
            ctrl.$$oriReply = angular.copy(ctrl.review.reply ? ctrl.review.reply.response : null);
            ctrl.$$reply = angular.copy(ctrl.$$oriReply);
            ctrl.$$currentMode = "edit";
        };
        this.$cancelEdit = function(ev, notify) {
            ctrl.$$reply = null;
            ctrl.$$oriReply = null;
            ctrl.$$currentMode = "view";
            notify && ctrl.onCancelReply && ctrl.onCancelReply({
                $event: ev,
                $review: ctrl.review
            });
        };
        this.$save = function(ev) {
            if (!ctrl.$$reply) {
                return;
            }
            ctrl.$onSaving();
            var ret = ctrl.onReply ? ctrl.onReply({
                $event: ev,
                $review: ctrl.review,
                $reply: ctrl.$$reply
            }) : ctrl.$$reply;
            $q.when(ret).then(ctrl.$onSaveSuccess, ctrl.$onSaveFailure);
        };
        this.$onSaveSuccess = function() {
            ctrl.review.reply = ctrl.review.reply || {};
            ctrl.review.reply.response = angular.copy(ctrl.$$reply);
            ctrl.$$error = false;
            ctrl.$$saving = false;
            ctrl.$cancelEdit();
        };
        this.$onSaveFailure = function(error) {
            ctrl.$$error = _.isEmpty(error) ? true : error;
            ctrl.$$saving = false;
        };
        this.$onSaving = function() {
            ctrl.$$error = false;
            ctrl.$$saving = true;
        };
    }
})();

(function() {
    "use strict";
    angular.module("itaca.components").component("chReviewReportInfo", {
        transclude: true,
        require: {
            chReviewCtrl: "^chReview"
        },
        bindings: {
            contentClass: "@",
            showDetails: "<"
        },
        controller: ReviewReportInfoCtrl,
        template: '<div ng-if="$ctrl.review.reportType" class="{{$ctrl.contentClass}}">' + '<div class="layout-padding-sm no-padding">' + "<div>" + '<md-icon class="mdi md-18 mdi-flag-variant text-danger"></md-icon>' + '<small translate="review.reporting.label"></small>' + "</div>" + '<div ng-if="$ctrl.showDetails" ng-switch="$ctrl.review.reportType">' + "<small><i>" + '<span ng-switch-when="OTHER">"{{$ctrl.review.reportNote}}"</span>' + "<span ng-switch-default>\"<span translate=\"{{'review.report.type.' + $ctrl.review.reportType +'.label'}}\"></span>\"</span>" + "</i></small>" + "</div>" + "</div>" + "</div>"
    });
    function ReviewReportInfoCtrl() {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.contentClass = ctrl.contentClass || "layout-padding bg-gray-lighter text-danger";
            ctrl.showDetails = _.isBoolean(ctrl.showDetails) ? ctrl.showDetails : false;
            ctrl.$initReview();
        };
        this.$initReview = function() {
            if (!ctrl.chReviewCtrl.review) {
                return;
            }
            ctrl.review = ctrl.chReviewCtrl.review;
        };
    }
})();

(function() {
    "use strict";
    ReviewReservationInfoCtrl.$inject = [ "AppOptions", "IconUtils", "DateUtils" ];
    angular.module("itaca.components").component("chReviewReservationInfo", {
        transclude: true,
        require: {
            chReviewCtrl: "^chReview"
        },
        bindings: {
            title: "@"
        },
        controller: ReviewReservationInfoCtrl,
        template: "<div layout-padding>" + '<div class="no-padding-bottom no-padding-right">' + "<div>" + "<small>" + '<span ng-if="!$ctrl.title"><span translate="review.source"></span>&nbsp;</span>' + '<span ng-if="$ctrl.title"><span ng-bind="$ctrl.title"></span>&nbsp;</span>' + '<strong ng-switch="$ctrl.review.reservation.source">' + '<span ng-switch-when="PORTAL">{{$ctrl.appOptions.about.uiName}}</span>' + '<span ng-switch-default translate="channel.source.{{$ctrl.review.reservation.source.toLowerCase()}}"></span>' + "</strong>" + "</small>" + '<span><md-icon class="{{$ctrl.portalIcons[$ctrl.review.reservation.source]}} channel-icon-mini"></md-icon></span>' + "</div>" + '<div ng-if="$ctrl.$$period"><small ng-bind="$ctrl.$$period"></small></div>' + "</div>" + "</div>"
    });
    function ReviewReservationInfoCtrl(AppOptions, IconUtils, DateUtils) {
        var ctrl = this;
        this.appOptions = AppOptions;
        this.portalIcons = IconUtils.portalIcons();
        this.$onInit = function() {
            ctrl.textLimit = isFinite(parseInt(ctrl.textLimit)) ? parseInt(ctrl.textLimit) : 200;
            ctrl.$initReview();
        };
        this.$initReview = function() {
            if (!ctrl.chReviewCtrl.review) {
                return;
            }
            ctrl.review = ctrl.chReviewCtrl.review;
            ctrl.$getPeriod();
        };
        this.$getPeriod = function() {
            var checkin = DateUtils.absoluteMoment(ctrl.review.reservation.checkin);
            var checkout = DateUtils.absoluteMoment(ctrl.review.reservation.checkout);
            if (checkin.get("month") == checkout.get("month")) {
                ctrl.$$period = checkin.format("MMMM YYYY");
            } else {
                ctrl.$$period = checkin.format("MMMM YYYY") + "/" + checkout.format("MMMM YYYY");
            }
        };
    }
})();

(function() {
    "use strict";
    angular.module("itaca.components").component("chReviewTitleContent", {
        transclude: true,
        require: {
            chReviewTitleCtrl: "^chReviewTitle"
        },
        controller: ReviewTitleContentCtrl,
        template: "<div ng-transclude></div>"
    });
    function ReviewTitleContentCtrl() {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.chReviewTitleCtrl.noDefault = true;
        };
        this.$onDestroy = function() {
            ctrl.chReviewTitleCtrl.noDefault = false;
        };
    }
})();

(function() {
    "use strict";
    ReviewTitleCtrl.$inject = [ "$scope", "ReviewsUtils", "$mdMedia" ];
    angular.module("itaca.components").component("chReviewTitle", {
        transclude: true,
        require: {
            chReviewCtrl: "^chReview"
        },
        bindings: {
            titleQuote: "@?",
            hideNewIcon: "<?"
        },
        controller: ReviewTitleCtrl,
        template: "<div flex>" + '<div ng-if="!$ctrl.noDefault" class="flex layout-padding">' + '<div class="md-subhead flex ellipsis text-wrap">' + '<span ng-if="!$ctrl.hideNewIcon && $ctrl.review.isNew"><md-icon class="material-icons mdi mdi-new-box text-info"></md-icon>&nbsp;</span>' + "<strong>" + '<em ng-if="$ctrl.review.title">' + '<span ng-if="$ctrl.titleQuote">&ldquo;</span>' + '<span ng-bind="$ctrl.review.title"></span>' + '<span ng-if="$ctrl.titleQuote">&bdquo;</span>' + "</em>" + '<span ng-if="!$ctrl.review.title">' + '<span translate="{{$ctrl.review.label}}"></span>' + "</span>" + "</strong>" + "</div>" + "</div>" + "<div ng-transclude></div>" + "</div>"
    });
    function ReviewTitleCtrl($scope, ReviewsUtils, $mdMedia) {
        $scope.$mdMedia = $mdMedia;
        var ctrl = this;
        this.$onInit = function() {
            ctrl.titleQuote = _.isBoolean(ctrl.titleQuote) ? ctrl.titleQuote : true;
            ctrl.hideNewIcon = _.isBoolean(ctrl.hideNewIcon) ? ctrl.hideNewIcon : false;
            ctrl.$initReview();
        };
        this.$initReview = function() {
            if (!ctrl.chReviewCtrl.review) {
                return;
            }
            ctrl.review = ctrl.chReviewCtrl.review;
        };
    }
})();

(function() {
    "use strict";
    ReviewUserCtrl.$inject = [ "$scope", "Navigator" ];
    angular.module("itaca.components").component("chReviewUser", {
        transclude: true,
        require: {
            chReviewCtrl: "^chReview"
        },
        bindings: {
            dateFormat: "@",
            hideUser: "<?",
            hideDate: "<?",
            userState: "@?",
            userStateParams: "<?",
            userClick: "&?"
        },
        controller: ReviewUserCtrl,
        template: "<div flex>" + '<div ng-if="!$ctrl.noDefault && !$ctrl.hideUser" class="bg-gray-lighter flex layout-row layout-wrap layout-padding">' + '<div class="layout-row layout-padding-sm no-padding no-outline" ng-class="{\'clickable\': $ctrl.userState || $ctrl.userClick}" ng-click="$ctrl.$userClick($event)" aria-label="Toggle user action">' + "<div>" + '<span ng-if="$ctrl.userAvatar && $ctrl.review.reviewSettings.showAvatar && !$ctrl.review.reviewSettings.anonymous"' + 'class="relative menu-user-avatar-small display-block overflow-hidden">' + '<img alt="User profile image" class="full-width" ng-src="{{$ctrl.userAvatar}}" lazy-image />' + "</span>" + '<span ng-if="(!$ctrl.review.reviewSettings.showAvatar || !$ctrl.userAvatar) && !$ctrl.review.reviewSettings.anonymous"' + 'class="bg-blue-sea menu-user-avatar-small layout-row layout-align-center-center">' + '<span class="md-headline text-uppercase">{{!$ctrl.review.reviewSettings.showRealName && ($ctrl.review.createdBy || $ctrl.review.reservation.guest).nickname ? ($ctrl.review.createdBy || $ctrl.review.reservation.guest).nickname.charAt(0) : ($ctrl.review.createdBy || $ctrl.review.reservation.guest).name.charAt(0)}}</span>' + "</span>" + '<md-icon ng-if="$ctrl.review.reviewSettings.anonymous" class="mdi mdi-account-circle md-38"></md-icon>' + "</div>" + '<div class="layout-align-center-start layout-column no-padding-bottom no-padding-top row-1">' + '<span class="font-10 text-gray-light row-1"><span translate="common.written.by.female"></span></span>' + "<div>" + '<strong class="md-subhead">' + '<span ng-if="!$ctrl.review.reviewSettings.anonymous && ($ctrl.review.createdBy || $ctrl.review.reservation.guest)">' + '<span ng-if="!$ctrl.review.reviewSettings || $ctrl.review.reviewSettings.showRealName || !$ctrl.review.createdBy.nickname">' + '<span ng-if="$ctrl.review.createdBy">{{::$ctrl.review.createdBy.name}}&nbsp;{{::$ctrl.review.createdBy.surname}}</span>' + '<span ng-if="!$ctrl.review.createdBy && $ctrl.review.reservation.guest">{{::$ctrl.review.reservation.guest.name}}&nbsp;{{::$ctrl.review.reservation.guest.surname}}</span>' + "</span>" + '<span ng-if="$ctrl.review.reviewSettings && !$ctrl.review.reviewSettings.showRealName && $ctrl.review.createdBy.nickname">' + '<span ng-if="$ctrl.review.createdBy">{{::$ctrl.review.createdBy.nickname}}</span>' + '<span ng-if="!$ctrl.review.createdBy && $ctrl.review.reservation.guest">{{::$ctrl.review.reservation.guest.nickname}}</span>' + "</span>" + "</span>" + '<span ng-if="$ctrl.review.reviewSettings.anonymous || (!$ctrl.review.createdBy && !$ctrl.review.reservation.guest)" translate="common.anonymous"></span>' + "</strong>" + '<span ng-if="$ctrl.review.createdDate && !$ctrl.hideDate" class="font-10 text-gray-light">' + "<span>&nbsp;-&nbsp;{{$ctrl.review.createdDate|utcDate:$ctrl.dateFormat}}</span>" + "</span>" + "</div>" + '<small class="font-10 text-gray-light row-1 text-lowercase" ng-if="!$ctrl.review.reviewSettings.anonymous && $ctrl.review.guest.reviewsCount">' + "<span>{{::$ctrl.review.guest.reviewsCount}}&nbsp;</span>" + '<span ng-if="$ctrl.review.guest.reviewsCount == 1" translate="reviews.review"></span>' + '<span ng-if="$ctrl.review.guest.reviewsCount != 1" translate="reviews.reviews"></span>' + "</small>" + "</div>" + "</div>" + "</div>" + "<div flex ng-transclude></div>" + "</div>"
    });
    function ReviewUserCtrl($scope, Navigator) {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.hideUser = _.isBoolean(ctrl.hideUser) ? ctrl.hideUser : ctrl.chReviewCtrl.hideUser;
            ctrl.hideDate = _.isBoolean(ctrl.hideDate) ? ctrl.hideDate : ctrl.chReviewCtrl.hideDate;
            ctrl.dateFormat = !_.isNil(ctrl.dateFormat) ? ctrl.dateFormat : ctrl.chReviewCtrl.dateFormat;
            ctrl.$initReview();
        };
        this.$initReview = function() {
            if (!ctrl.chReviewCtrl.review) {
                return;
            }
            ctrl.review = ctrl.chReviewCtrl.review;
        };
        this.$userClick = function(ev) {
            if (ctrl.userState) {
                Navigator.goToState(ctrl.userState, ctrl.userStateParams);
            } else {
                ctrl.userClick && ctrl.userClick({
                    $event: ev,
                    $review: ctrl.review
                });
            }
        };
    }
})();

(function() {
    "use strict";
    ReviewCtrl.$inject = [ "$scope", "ReviewsUtils", "AppOptions" ];
    angular.module("itaca.components").component("chReview", {
        transclude: true,
        bindings: {
            review: "<",
            newLimit: "@?",
            dateFormat: "@?",
            hideUser: "<?",
            hideDate: "<?",
            imgBaseUrl: "@?"
        },
        controller: ReviewCtrl,
        template: "<div ng-transclude></div>"
    });
    function ReviewCtrl($scope, ReviewsUtils, AppOptions) {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.newLimit = _.isFinite(parseInt(ctrl.newLimit)) ? parseInt(ctrl.newLimit) : 7;
            ctrl.hideUser = _.isBoolean(ctrl.hideUser) ? ctrl.hideUser : false;
            ctrl.imgBaseUrl = ctrl.imgBaseUrl || true;
            if (_.isBoolean(ctrl.imgBaseUrl)) {
                ctrl.imgBaseUrl = ctrl.imgBaseUrl && AppOptions.config && AppOptions.config.amz ? AppOptions.config.amz.baseUrl + "/" + AppOptions.config.amz.bucketName + "/" : "";
            }
            ctrl.$initReview();
        };
        this.$initReview = function() {
            if (!ctrl.review) {
                return;
            }
            ctrl.review.isNew = moment().isBefore(moment(ctrl.review.createdDate).add(ctrl.newLimit, "days"));
            ctrl.review.label = ReviewsUtils.generateScoreLabel(Math.floor(ctrl.review.score));
            ctrl.$getUserAvatar();
        };
        this.$getUserAvatar = function() {
            if (ctrl.review.createdBy && ctrl.review.createdBy.avatarType) {
                switch (ctrl.review.createdBy.avatarType) {
                  case "PORTAL":
                    ctrl.userAvatar = ctrl.review.createdBy.avatar ? ctrl.imgBaseUrl + ctrl.review.createdBy.avatar : null;
                    break;

                  case "FACEBOOK":
                    ctrl.userAvatar = ctrl.review.createdBy.facebookImage;
                    break;

                  case "GOOGLE":
                    ctrl.userAvatar = ctrl.review.createdBy.googleImage;
                    break;

                  default:
                    ctrl.userAvatar = ctrl.review.createdBy.avatar ? ctrl.imgBaseUrl + ctrl.review.createdBy.avatar : null;
                    break;
                }
            }
            ctrl.review.reviewSettings = _.isObjectLike(ctrl.review.reviewSettings) ? ctrl.review.reviewSettings : {};
            ctrl.review.reviewSettings.showRealName = _.isBoolean(ctrl.review.reviewSettings.showRealName) ? ctrl.review.reviewSettings.showRealName : true;
        };
    }
})();

(function() {
    "use strict";
    angular.module("itaca.components").component("chReviewsSummaryDetails", {
        require: {
            chReviewsSummaryCtrl: "^chReviewsSummary"
        },
        bindings: {
            progressClass: "@?",
            size: "@?"
        },
        controller: ReviewsSummaryDetailsCtrl,
        template: '<div class="flex layout-column layout-padding-sm">' + '<ch-reviews-summary-progress ng-repeat="entry in $ctrl.summary.reviewsScoreMap track by $index" value="entry.key" count="entry.value" ' + 'size="{{$ctrl.size}}" progress-class="{{$ctrl.progressClass}}"></ch-review-summary-progress>' + "</div>"
    });
    function ReviewsSummaryDetailsCtrl() {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.progressClass = ctrl.progressClass || "md-primary";
            ctrl.size = _.includes([ "small", "big" ], _.toLower(ctrl.size)) ? _.toLower(ctrl.size) : "small";
            ctrl.$initSummary();
        };
        this.$initSummary = function() {
            if (!ctrl.chReviewsSummaryCtrl.summary) {
                return;
            }
            ctrl.summary = ctrl.chReviewsSummaryCtrl.summary;
        };
        this.$onDestroy = function() {};
    }
})();

(function() {
    "use strict";
    angular.module("itaca.components").component("chReviewsSummaryGar", {
        require: {
            chReviewsSummaryCtrl: "^chReviewsSummary"
        },
        bindings: {
            title: "@?",
            subtitle: "@?",
            bgClass: "@?",
            size: "@?"
        },
        controller: ReviewsSummaryGarCtrl,
        template: '<div ng-if="$ctrl.summary.gar" class="layout-column layout-padding layout-align-center-center no-padding">' + "<div class=\"border-radius layout-column layout-align-center-center {{$ctrl.bgClass}}\" ng-class=\"{'layout-padding': $ctrl.size == 'big'}\">" + '<strong class="md-subhead" translate="{{$ctrl.summary.garLabel}}"></strong>' + "<span class=\"no-padding-top\" ng-class=\"$ctrl.size == 'small' ? 'md-display-1' : 'md-display-3'\">{{$ctrl.summary.gar.toFixed(1)}}</span>" + '<small ng-if="!$ctrl.$$hideTitle" class="no-padding-bottom">' + '<span ng-if="$ctrl.title" ng-bind="$ctrl.title"></span>' + '<span ng-if="!$ctrl.subtitle" translate="review.score.total"><span>' + "</small>" + "</div>" + '<div ng-if="!$ctrl.$$hideSubtitle">' + "<small>" + '<span ng-if="$ctrl.subtitle" ng-bind="$ctrl.subtitle"></span>' + '<span ng-if="!$ctrl.subtitle" translate="review.reviews.real" translate-values="{num: $ctrl.summary.totalReviews}"></span>' + "</small>" + "</div>" + "</div>"
    });
    function ReviewsSummaryGarCtrl() {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.bgClass = ctrl.bgClass || "bg-primary";
            ctrl.$$hideTitle = _.isBoolean(ctrl.title) && !ctrl.title;
            ctrl.$$hideSubtitle = _.isBoolean(ctrl.subtitle) && !ctrl.subtitle;
            ctrl.size = _.includes([ "small", "big" ], _.toLower(ctrl.size)) ? _.toLower(ctrl.size) : "big";
            ctrl.$initSummary();
        };
        this.$initSummary = function() {
            if (!ctrl.chReviewsSummaryCtrl.summary) {
                return;
            }
            ctrl.summary = ctrl.chReviewsSummaryCtrl.summary;
        };
        this.$onDestroy = function() {};
    }
})();

(function() {
    "use strict";
    ReviewsSummaryProgressCtrl.$inject = [ "$scope", "$mdMedia" ];
    angular.module("itaca.components").component("chReviewsSummaryProgress", {
        require: {
            chReviewsSummaryCtrl: "^chReviewsSummary"
        },
        bindings: {
            value: "<",
            count: "<",
            progressClass: "@?",
            size: "@?"
        },
        controller: ReviewsSummaryProgressCtrl,
        template: "<div title=\"{{$ctrl.$$percentage + '%'}}\" ng-class=\"$ctrl.$mdMedia('gt-sm')? 'no-padding-bottom' : 'no-padding-left no-padding-right'\">" + "<small>" + '<span ng-switch="$ctrl.value">' + '<span ng-switch-when="4"><span translate="review.score.bad"></span>&nbsp;<em>(4)</em>:</span>' + '<span ng-switch-when="5"><span translate="review.score.poor"></span>&nbsp;<em>(5)</em>:</span>' + '<span ng-switch-when="6"><span translate="review.score.sufficient"></span>&nbsp;<em>(6)</em>:</span>' + '<span ng-switch-when="7"><span translate="review.score.good"></span>&nbsp;<em>(7)</em>:</span>' + '<span ng-switch-when="8"><span translate="review.score.very.good"></span>&nbsp;<em>(8)</em>:</span>' + '<span ng-switch-when="9"><span translate="review.score.excellent"></span>&nbsp;<em>(9)</em>:</span>' + '<span ng-switch-when="10"><span translate="review.score.fabulous"></span>&nbsp;<em>(10)</em>:</span>' + "</span>" + "</small>" + '<div class="layout-row layout-align-start-center">' + '<div flex><md-progress-linear md-mode="determinate" value="{{$ctrl.$$percentage}}" class="{{$ctrl.$$sizeClass}}" ng-class="$ctrl.count > 0 ? $ctrl.progressClass : \'md-accent\'"></md-progress-linear></div>' + '<div class="text-right" style="width: 55px"><small>&nbsp;{{$ctrl.$$percentage + \'%\'}}&nbsp;({{$ctrl.count}})</small></div>' + "</div>" + "</div>"
    });
    function ReviewsSummaryProgressCtrl($scope, $mdMedia) {
        var ctrl = this;
        this.$mdMedia = $mdMedia;
        this.$onInit = function() {
            ctrl.progressClass = ctrl.progressClass || "md-primary";
            ctrl.size = _.includes([ "small", "big" ], _.toLower(ctrl.size)) ? _.toLower(ctrl.size) : "small";
            if (ctrl.size == "big") {
                ctrl.$$sizeClass = "md-progress-linear-big";
            }
            ctrl.$initSummary();
            ctrl.$initWatchers();
        };
        this.$initSummary = function() {
            if (!ctrl.chReviewsSummaryCtrl.summary) {
                return;
            }
            ctrl.summary = ctrl.chReviewsSummaryCtrl.summary;
        };
        this.$initWatchers = function() {
            $scope.$watch(function() {
                return ctrl.count;
            }, ctrl.$calculatePercentage);
        };
        this.$calculatePercentage = function() {
            ctrl.$$percentage = Math.round((ctrl.count || 0) * 100 / (ctrl.summary.totalReviews || 1));
        };
        this.$onDestroy = function() {};
    }
})();

(function() {
    "use strict";
    ReviewsSummaryCtrl.$inject = [ "ReviewsUtils" ];
    angular.module("itaca.components").component("chReviewsSummary", {
        transclude: true,
        bindings: {
            summary: "<"
        },
        controller: ReviewsSummaryCtrl,
        template: "<div ng-transclude></div>"
    });
    function ReviewsSummaryCtrl(ReviewsUtils) {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.$initSummary();
        };
        this.$initSummary = function() {
            if (!ctrl.summary) {
                var scoreMap = [];
                _.forEach(_.rangeRight(4, 11), function(val) {
                    scoreMap.push({
                        key: val,
                        value: 0
                    });
                });
                ctrl.summary = {
                    totalReviews: 0,
                    gar: null,
                    reviewsScoreMap: scoreMap
                };
            }
            ctrl.summary.reviewsScoreMap = _.orderBy(ctrl.summary.reviewsScoreMap, [ "key" ], [ "desc" ]);
            ctrl.summary.garLabel = ReviewsUtils.generateScoreLabel(Math.floor(ctrl.summary.gar));
        };
        this.$onDestroy = function() {};
    }
})();

(function() {
    "use strict";
    RoomEditCtrl.$inject = [ "$scope", "NumberUtils", "Dialog", "ReservationUtils", "Navigator" ];
    angular.module("itaca.components").component("chRoomEdit", {
        bindings: {
            room: "<",
            nights: "<?",
            storageUrl: "<?",
            title: "@",
            localeIso: "<",
            onRemove: "&?",
            city: "@",
            offset: "@"
        },
        controller: RoomEditCtrl,
        templateUrl: "/tpls/room-edit/room-edit.tpl"
    });
    function RoomEditCtrl($scope, NumberUtils, Dialog, ReservationUtils, Navigator) {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.$$index = NumberUtils.uniqueNumber();
            ctrl.$calculateTotalAmount();
            ctrl.$getCover();
            ctrl.$getPromo();
        };
        this.$getCover = function() {
            var roomImage = "/resources/public/img/no-gallery-image.png";
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
            ctrl.onRemove && ctrl.onRemove({
                $event: ev,
                $room: ctrl.room
            });
        };
        this.$openGallery = function(ev) {
            if (!_.isEmpty(ctrl.room.type.gallery)) {
                $translate([ ctrl.room.type.roomType.nameKey, "room.category." + ctrl.room.type.category ]).then(function(translations) {
                    var title = translations[ctrl.room.type.roomType.nameKey] + "&nbsp;<small>(" + translations["room.category." + ctrl.room.type.category].toUpperCase() + ")</small>";
                    Dialog.showGallery(ev, title, _.sortBy(ctrl.room.type.gallery, [ function(o) {
                        return +Boolean(o.cover);
                    } ]), {
                        storageUrl: ctrl.storageUrl
                    });
                });
            }
        };
        this.$calculateTotalAmount = function() {
            ReservationUtils.calculateRoomTotalPrice(ctrl.room);
        };
        this.$toggleInfo = function(show) {
            ctrl.$$showInfo = !_.isNil(show) && _.isBoolean(show) ? show : !ctrl.$$showInfo;
            ctrl.$$showInfo && Navigator.scrollToAnchor("ch-room-" + ctrl.$$index + "-info");
        };
        this.$toggleRates = function(show) {
            ctrl.$$showRates = !_.isNil(show) && _.isBoolean(show) ? show : !ctrl.$$showRates;
            ctrl.$$showRates && Navigator.scrollToAnchor("ch-room-" + ctrl.$$index + "-rates");
        };
    }
})();

(function() {
    "use strict";
    RoomBestServicesCtrl.$inject = [ "$scope" ];
    angular.module("itaca.components").component("chRoomBestServices", {
        require: {
            chRoomCtrl: "^chRoom"
        },
        bindings: {
            services: "<?"
        },
        controller: RoomBestServicesCtrl,
        template: '<div layout layout-wrap layout-align="end start" ng-if="$ctrl.services.length">' + '<span ng-repeat="service in $ctrl.services track by $index">' + "<span>" + '<md-icon class="{{service.icon}} layout-padding no-padding-top" ng-class="{\'text-white\': $ctrl.chRoomCtrl.room.gallery.length}"></md-icon>' + '<md-tooltip ng-if="service.label || service.labelKey"><span ng-if="service.label" ng-bind="service.label"></span><span ng-if="!service.label" translate="{{service.labelKey}}"></span></md-tooltip>' + "</span>" + "</span>" + "</div>"
    });
    function RoomBestServicesCtrl($scope) {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.services = _.isArray(ctrl.services) ? ctrl.services : ctrl.chRoomCtrl.popularServices;
        };
    }
})();

(function() {
    "use strict";
    RoomContentCtrl.$inject = [ "$scope" ];
    angular.module("itaca.components").component("chRoomContent", {
        require: {
            chRoomCtrl: "^chRoom"
        },
        bindings: {},
        controller: RoomContentCtrl,
        template: "<ng-transclude></ng-transclude>",
        transclude: true
    });
    function RoomContentCtrl($scope) {
        var ctrl = this;
        this.$onInit = function() {};
    }
})();

(function() {
    "use strict";
    RoomGalleryCtrl.$inject = [ "$scope", "AboutStorage", "$translate", "Dialog", "NumberUtils" ];
    angular.module("itaca.components").component("chRoomGallery", {
        require: {
            chRoomCtrl: "^chRoom",
            chRoomHeaderCtrl: "^chRoomHeader"
        },
        bindings: {
            cols: "@",
            rowspan: "@?",
            ratio: "@?",
            maxItems: "<?"
        },
        controller: RoomGalleryCtrl,
        template: '<ch-gallery gallery="$ctrl.chRoomCtrl.room.gallery" gallery-title="{{$ctrl.title}}" storage-url="$ctrl.chRoomCtrl.storageUrl" cols="{{$ctrl.cols}}" rowspan="{{$ctrl.rowspan}}" ratio="{{$ctrl.ratio}}" max-items="$ctrl.maxItems"></ch-gallery>'
    });
    function RoomGalleryCtrl($scope, AboutStorage, $translate, Dialog, NumberUtils) {
        var ctrl = this;
        this.$onInit = function() {
            if (!ctrl.chRoomCtrl.storageUrl) {
                AboutStorage.get().then(function(data) {
                    ctrl.chRoomCtrl.storageUrl = data.url;
                });
            }
            $translate([ ctrl.chRoomCtrl.room.roomType.nameKey, "room.category." + ctrl.chRoomCtrl.room.category ]).then(function(translations) {
                ctrl.title = translations[ctrl.chRoomCtrl.room.roomType.nameKey] + " <small>(" + translations["room.category." + ctrl.chRoomCtrl.room.category].toUpperCase() + ")</small>";
            });
        };
        this.openGallery = function(ev) {
            $translate([ ctrl.chRoomCtrl.room.roomType.nameKey, "room.category." + ctrl.chRoomCtrl.room.category ]).then(function(translations) {
                var title = translations[ctrl.chRoomCtrl.room.roomType.nameKey] + " <small>(" + translations["room.category." + ctrl.chRoomCtrl.room.category].toUpperCase() + ")</small>";
                Dialog.showGallery(ev, title, _.sortBy(ctrl.chRoomCtrl.room.gallery, [ function(o) {
                    return +Boolean(o.cover);
                } ]), {
                    storageUrl: ctrl.chRoomCtrl.storageUrl
                });
            });
        };
    }
})();

(function() {
    "use strict";
    RoomHeaderCtrl.$inject = [ "$scope", "$mdMedia", "Navigator" ];
    angular.module("itaca.components").component("chRoomHeader", {
        require: {
            chRoomCtrl: "^chRoom"
        },
        bindings: {},
        controller: RoomHeaderCtrl,
        template: '<div class="ch-room-header-content layout-column">' + "<ng-transclude></ng-transclude>" + '<div ng-if="$ctrl.chRoomCtrl.showInfoBtn" class="img-bottom-left-bar layout-row layout-wrap layout-align-center-center">' + '<md-button ng-class="{\'md-icon-button\' : $ctrl.$mdMedia(\'xs\')}" ng-click="$ctrl.toggleInfo()" aria-label="Open room information">' + '<div class="row-mini">' + '<md-icon class="mdi mdi-information-outline md-18 text-white"></md-icon>' + '<small class="hide-xs hide-sm" translate="common.information"></small>' + "</div>" + "</md-button>" + "</div>" + "<div ng-if=\"$ctrl.chRoomCtrl.showRateBtn\" ng-class=\"::{'img-right-bar': $ctrl.$mdMedia('gt-xs'), 'img-bottom-right-bar': $ctrl.$mdMedia('xs')}\" class=\"layout-row layout-align-center-center\">" + '<md-button ng-click="$ctrl.toggleRates()" aria-label="Open room prices">' + '<div layout class="row-mini text-left layout-padding no-padding">' + '<div layout="column">' + "<small>" + '<span class="text-initial" translate="common.from"></span>' + '<i ng-if="$ctrl.chRoomCtrl.bestRate.amount.initialAmount > 0 && $ctrl.chRoomCtrl.bestRate.amount.initialAmount > $ctrl.chRoomCtrl.bestRate.amount.finalAmount">&nbsp;<del>{{$ctrl.chRoomCtrl.bestRate.amount.initialAmount|chCurrency}}</del></i>' + "</small>" + '<span class="md-title"><strong>{{$ctrl.chRoomCtrl.bestRate.amount.finalAmount|chCurrency}}</strong></span>' + '<small ng-if="$ctrl.chRoomCtrl.nights > 0" class="text-lowercase">' + '<span translate="common.for"></span>&nbsp;{{$ctrl.chRoomCtrl.nights}}' + '<span ng-show="$ctrl.chRoomCtrl.nights == 1" translate="common.night"></span>' + '<span ng-show="$ctrl.chRoomCtrl.nights > 1" translate="common.nights"></span>' + "</small>" + "</div>" + '<div layout="column">' + "<md-icon class=\"mdi md-48 text-white\" ng-class=\"$ctrl.chRoomCtrl.showRoomRates ? 'mdi-chevron-up' : 'mdi-chevron-down animated infinite bounce'\"></md-icon>" + "</div>" + "<md-tooltip hide-xs>" + '<span ng-if="!$ctrl.chRoomCtrl.showRoomRates" translate="ratesheet.rates.all.view"></span>' + '<span ng-if="$ctrl.chRoomCtrl.showRoomRates" translate="ratesheet.rates.hide"></span>' + "</md-tooltip>" + "</div>" + "</md-button>" + "</div>" + "</div>",
        transclude: true
    });
    function RoomHeaderCtrl($scope, $mdMedia, Navigator) {
        var ctrl = this;
        this.$mdMedia = $mdMedia;
        this.$onInit = function() {
            ctrl.chRoomCtrl.showRoomRates = false;
            ctrl.chRoomCtrl.showRoomInfo = false;
        };
        this.toggleInfo = function() {
            ctrl.chRoomCtrl.showRoomInfo = !ctrl.chRoomCtrl.showRoomInfo;
            ctrl.chRoomCtrl.showRoomRates = false;
            if (!ctrl.chRoomCtrl.showRoomInfo) {
                Navigator.scrollToAnchor("av-" + ctrl.chRoomCtrl.$$index);
            }
        };
        this.toggleRates = function() {
            ctrl.chRoomCtrl.showRoomRates = !ctrl.chRoomCtrl.showRoomRates;
            ctrl.chRoomCtrl.showRoomInfo = false;
            if (!ctrl.chRoomCtrl.showRoomRates) {
                Navigator.scrollToAnchor("av-" + ctrl.chRoomCtrl.$$index);
            } else {
                Navigator.scrollToAnchor("av-" + ctrl.chRoomCtrl.$$index + "-rates");
            }
        };
    }
})();

(function() {
    "use strict";
    RoomImageCtrl.$inject = [ "$scope", "AboutStorage", "$translate", "Dialog" ];
    angular.module("itaca.components").component("chRoomImage", {
        require: {
            chRoomCtrl: "^chRoom",
            chRoomHeaderCtrl: "^chRoomHeader"
        },
        bindings: {},
        controller: RoomImageCtrl,
        template: '<div class="flex layout-column layout-align-center-center">' + '<img ng-src="{{$ctrl.roomImage}}" class="full-width display-block img-size" ng-class="{\'clickable\': $ctrl.chRoomCtrl.room.gallery.length}" ng-click="$ctrl.openGallery($event)" alt="Room cover image" lazy-image default-img-url="\'/resources/public/img/no-gallery-image.png\'">' + '<md-tooltip ng-if="$ctrl.chRoomCtrl.room.gallery.length"><span translate="photo.photos.view.all"></span></md-tooltip>' + "</div>"
    });
    function RoomImageCtrl($scope, AboutStorage, $translate, Dialog) {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.chRoomCtrl.config = ctrl.chRoomCtrl.config || {};
            if (!ctrl.chRoomCtrl.storageUrl) {
                AboutStorage.get().then(function(data) {
                    ctrl.chRoomCtrl.storageUrl = data.url;
                    ctrl.getRoomCover();
                });
            } else {
                ctrl.getRoomCover();
            }
        };
        this.getRoomCover = function() {
            ctrl.$findRoomCover();
        };
        this.openGallery = function(ev) {
            $translate([ ctrl.chRoomCtrl.room.roomType.nameKey, "room.category." + ctrl.chRoomCtrl.room.category ]).then(function(translations) {
                var title = translations[ctrl.chRoomCtrl.room.roomType.nameKey] + " <small>(" + translations["room.category." + ctrl.chRoomCtrl.room.category].toUpperCase() + ")</small>";
                Dialog.showGallery(ev, title, _.sortBy(ctrl.chRoomCtrl.room.gallery, [ function(o) {
                    return +Boolean(o.cover);
                } ]), {
                    storageUrl: ctrl.chRoomCtrl.storageUrl
                });
            });
        };
        this.$findRoomCover = function() {
            var roomImage = "/resources/public/img/no-gallery-image.png";
            _.forEach(ctrl.chRoomCtrl.room.gallery, function(gallery, index, collection) {
                if (index == 0) {
                    roomImage = ctrl.chRoomCtrl.storageUrl + gallery.path;
                }
                if (gallery.cover) {
                    roomImage = ctrl.chRoomCtrl.storageUrl + gallery.path;
                    return;
                }
            });
            ctrl.roomImage = roomImage;
        };
    }
})();

(function() {
    "use strict";
    RoomInfoCtrl.$inject = [ "$scope", "Navigator" ];
    angular.module("itaca.components").component("chRoomInfo", {
        require: {
            chRoomCtrl: "^chRoom"
        },
        bindings: {
            availability: "<"
        },
        controller: RoomInfoCtrl,
        transclude: true,
        templateUrl: "/tpls/room/room-info.tpl"
    });
    function RoomInfoCtrl($scope, Navigator) {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.chRoomCtrl.showInfoBtn = true;
            ctrl.getIncludedServices();
            ctrl.getBookableServices();
            ctrl.getPopularServices();
        };
        this.getPopularServices = function() {
            var isSmokingRoom = false;
            ctrl.chRoomCtrl.popularServices = [];
            _.forEach(ctrl.includedServices, function(roomService) {
                var service = {};
                if (roomService.type.nameKey == "service.type.popular.wifi.room") {
                    service.type = "WIFI";
                    service.icon = "mdi mdi-wifi md-24";
                } else if (roomService.type.nameKey == "service.type.popular.pet.small" || roomService.type.nameKey == "service.type.popular.pet.medium" || roomService.type.nameKey == "service.type.popular.pet.large" || roomService.type.nameKey == "service.type.popular.pet.disabled") {
                    service.type = "PET";
                    service.icon = "mdi mdi-paw md-24";
                } else if (roomService.type.nameKey == "service.type.popular.breakfast" || roomService.type.nameKey == "service.type.popular.breakfast.room" || roomService.type.nameKey == "service.type.popular.breakfast.continental") {
                    service.type = "BREAKFAST";
                    service.icon = "mdi mdi-food-variant md-24";
                } else if (roomService.type.nameKey == "service.type.popular.smoking.room") {
                    service.type = "SMOKING";
                    service.icon = "mdi mdi-smoking md-24";
                    isSmokingRoom = true;
                }
                service.labelKey = "service.type.inroom." + service.type;
                ctrl.chRoomCtrl.popularServices.push(service);
            });
            if (!isSmokingRoom) {
                ctrl.chRoomCtrl.popularServices.push({
                    type: "NO-SMOKING",
                    icon: "mdi mdi-smoking-off md-24",
                    labelKey: "service.type.inroom.NO-SMOKING"
                });
            }
        };
        this.getIncludedServices = function() {
            ctrl.includedServices = _.filter(ctrl.chRoomCtrl.room.services, [ "bookability", "INCLUDED" ]);
        };
        this.getBookableServices = function() {
            ctrl.bookableServices = _.filter(ctrl.chRoomCtrl.room.services, [ "bookability", "BOOKABLE" ]);
        };
        this.toggleInfo = function() {
            ctrl.chRoomCtrl.showRoomInfo = !ctrl.chRoomCtrl.showRoomInfo;
            ctrl.chRoomCtrl.showRoomRates = false;
            if (!ctrl.chRoomCtrl.showRoomInfo) {
                Navigator.scrollToAnchor("av-" + ctrl.chRoomCtrl.$$index);
            }
        };
    }
})();

(function() {
    "use strict";
    RoomPromoCtrl.$inject = [ "$scope" ];
    angular.module("itaca.components").component("chRoomPromo", {
        require: {
            chRoomCtrl: "^chRoom"
        },
        bindings: {},
        controller: RoomPromoCtrl,
        template: '<div class="layout-column layout-margin-sm no-margin-left">' + '<div ng-if="$ctrl.chRoomCtrl.onArrival" class="no-margin-left">' + '<div class="layout-column layout-padding no-padding row-mini bg-success md-subhead">' + "<strong>" + '<md-icon class="mdi mdi-thumb-up md-18 text-white"></md-icon>' + '<span translate="reservation.pay.at.hotel"></span>' + "</strong>" + "</div>" + "</div>" + '<div ng-if="$ctrl.chRoomCtrl.bestPromo" class="no-margin-left">' + '<div class="layout-column layout-padding no-padding row-mini md-subhead" ' + "ng-class=\"{'bg-success': $ctrl.chRoomCtrl.bestPromo.onArrival || $ctrl.chRoomCtrl.bestPromo.promotionType == 'EARLY_BOOKING', " + "'bg-info' : !$ctrl.chRoomCtrl.bestPromo.onArrival && $ctrl.chRoomCtrl.bestPromo.promotionType == 'STANDARD',  " + "'bg-primary-light': !$ctrl.chRoomCtrl.bestPromo.onArrival && $ctrl.chRoomCtrl.bestPromo.promotionType == 'MINIMUM_STAY', " + "'bg-primary': !$ctrl.chRoomCtrl.bestPromo.onArrival && $ctrl.chRoomCtrl.bestPromo.promotionType == 'BOOK_TODAY', " + "'bg-blue-sea': !$ctrl.chRoomCtrl.bestPromo.onArrival && $ctrl.chRoomCtrl.bestPromo.promotionType == 'LAST_MINUTE', " + "'bg-warn': !$ctrl.chRoomCtrl.bestPromo.onArrival && $ctrl.chRoomCtrl.bestPromo.promotionType == 'LAST_SECOND'}\"> " + '<strong ng-if="!$ctrl.chRoomCtrl.bestPromo.onArrival" ng-switch="$ctrl.chRoomCtrl.bestPromo.promotionType"> ' + '<md-icon class="mdi mdi-sale md-10 text-white"></md-icon> ' + '<span ng-switch-when="STANDARD">' + '<span translate="common.offer.special"></span>&nbsp;<span ng-if="$ctrl.chRoomCtrl.bestPromo.discount.type==\'PERCENTAGE\'">-{{$ctrl.chRoomCtrl.bestPromo.discount.finalAmount}}%</span><span ng-if="$ctrl.chRoomCtrl.bestPromo.discount.type==\'PRICE\'">-{{$ctrl.chRoomCtrl.bestPromo.discount.finalAmount|chCurrency}}</span>' + "</span>" + '<span ng-switch-when="MINIMUM_STAY">' + '<span translate="promotions.promotion.label.minstay.nights" translate-value-count="{{$ctrl.chRoomCtrl.bestPromo.minStay}}"></span>&nbsp;<span ng-if="$ctrl.chRoomCtrl.bestPromo.discount.type==\'PERCENTAGE\'">-{{$ctrl.chRoomCtrl.bestPromo.discount.finalAmount}}%</span><span ng-if="$ctrl.chRoomCtrl.bestPromo.discount.type==\'PRICE\'">-{{$ctrl.chRoomCtrl.bestPromo.discount.finalAmount|chCurrency}}</span>' + "</span>" + '<span ng-switch-when="BOOK_TODAY">' + '<span translate="promotions.promotion.label.only.today"></span>!&nbsp;<span ng-if="$ctrl.chRoomCtrl.bestPromo.discount.type==\'PERCENTAGE\'">-{{$ctrl.chRoomCtrl.bestPromo.discount.finalAmount}}%</span><span ng-if="$ctrl.chRoomCtrl.bestPromo.discount.type==\'PRICE\'">-{{$ctrl.chRoomCtrl.bestPromo.discount.finalAmount|chCurrency}}</span>' + "</span>" + '<span ng-switch-when="EARLY_BOOKING">' + '<span translate="promotions.early"></span>&nbsp;<span ng-if="$ctrl.chRoomCtrl.bestPromo.discount.type==\'PERCENTAGE\'">-{{$ctrl.chRoomCtrl.bestPromo.discount.finalAmount}}%</span><span ng-if="$ctrl.chRoomCtrl.bestPromo.discount.type==\'PRICE\'">-{{$ctrl.chRoomCtrl.bestPromo.discount.finalAmount|chCurrency}}</span>' + "</span>" + '<span ng-switch-when="LAST_MINUTE">' + '<span translate="promotions.last.minute"></span>&nbsp;<span ng-if="$ctrl.chRoomCtrl.bestPromo.discount.type==\'PERCENTAGE\'">-{{$ctrl.chRoomCtrl.bestPromo.discount.finalAmount}}%</span><span ng-if="$ctrl.chRoomCtrl.bestPromo.discount.type==\'PRICE\'">-{{$ctrl.chRoomCtrl.bestPromo.discount.finalAmount|chCurrency}}</span>' + "</span>" + '<span ng-switch-when="LAST_SECOND">' + '<span translate="promotions.last.second"></span>&nbsp;<span ng-if="$ctrl.chRoomCtrl.bestPromo.discount.type==\'PERCENTAGE\'">-{{$ctrl.chRoomCtrl.bestPromo.discount.finalAmount}}%</span><span ng-if="$ctrl.chRoomCtrl.bestPromo.discount.type==\'PRICE\'">-{{$ctrl.chRoomCtrl.bestPromo.discount.finalAmount|chCurrency}}</span>' + "</span>" + "</strong>" + "</div>" + "</div>" + "</div>",
        transclude: true
    });
    function RoomPromoCtrl($scope) {
        var ctrl = this;
        this.$onInit = function() {};
    }
})();

(function() {
    "use strict";
    RoomRateCtrl.$inject = [ "$scope", "$mdMedia" ];
    angular.module("itaca.components").component("chRoomRate", {
        transclude: true,
        require: {
            chRoomCtrl: "^chRoom",
            chRoomRatesCtrl: "^chRoomRates"
        },
        bindings: {
            rate: "<"
        },
        controller: RoomRateCtrl,
        templateUrl: "/tpls/room/room-rate.tpl"
    });
    function RoomRateCtrl($scope, $mdMedia) {
        var ctrl = this;
        this.$mdMedia = $mdMedia;
        this.$onInit = function() {};
    }
})();

(function() {
    "use strict";
    RoomRatesCtrl.$inject = [ "$scope", "ReservationUtils", "DateUtils" ];
    angular.module("itaca.components").component("chRoomRates", {
        require: {
            chRoomCtrl: "^chRoom"
        },
        bindings: {
            availability: "="
        },
        controller: RoomRatesCtrl,
        template: '<div id="{{$ctrl.chRoomCtrl.$$index + \'-rates\'}}" ng-show="$ctrl.chRoomCtrl.showRoomRates"  ng-class="{\'animated fadeIn\': $ctrl.chRoomCtrl.showRoomRates}" ng-transclude></div>',
        transclude: true
    });
    function RoomRatesCtrl($scope, ReservationUtils, DateUtils) {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.chRoomCtrl.showRateBtn = true;
            ctrl.getLowestRate();
            ctrl.isOnArrival();
            ctrl.bestPromotion();
            ctrl.hasFreeBeds();
        };
        this.hasFreeBeds = function() {
            if (!_.isEmpty(ctrl.availability.roomType.otherBeds)) {
                ctrl.availability.hasFreeBeds = _.some(ctrl.availability.roomType.otherBeds, function(bed) {
                    if (bed.people.adults) {
                        return bed.adultsPrice <= 0;
                    } else if (bed.people.boys) {
                        return bed.boysPrice <= 0;
                    } else if (bed.people.children) {
                        return bed.childrenPrice <= 0;
                    } else if (bed.people.kids) {
                        return bed.kidsPrice <= 0;
                    } else {
                        return false;
                    }
                });
            }
        };
        this.bestPromotion = function() {
            var promotions = [];
            _.forEach(ctrl.availability.totalRates, function(rate) {
                if (!_.isEmpty(rate.promotions)) {
                    promotions = _.concat(promotions, rate.promotions);
                }
            });
            ctrl.chRoomCtrl.bestPromo = ReservationUtils.bestPromotion(promotions);
        };
        this.getLowestRate = function() {
            ctrl.chRoomCtrl.bestRate = _.minBy(ctrl.availability.totalRates, function(rate) {
                return rate.amount.finalAmount;
            });
        };
        this.isOnArrival = function() {
            ctrl.chRoomCtrl.onArrival = ctrl.availability.onArrival;
        };
    }
})();

(function() {
    "use strict";
    RoomTitleCtrl.$inject = [ "$scope", "Navigator" ];
    angular.module("itaca.components").component("chRoomTitle", {
        require: {
            chRoomCtrl: "^chRoom"
        },
        bindings: {},
        controller: RoomTitleCtrl,
        template: '<div class="img-title-bar layout-column layout-padding no-padding">' + '<div class="layout-row layout-align-start-center">' + '<div class="flex layout-column clickable" ng-click="$ctrl.toggleRates()" aria-label="show rate">' + '<div class="md-title">' + '<span translate="{{$ctrl.chRoomCtrl.room.roomType.nameKey}}"></span>' + "</div>" + "<div>" + '<small class="text-uppercase" translate="room.category.{{$ctrl.chRoomCtrl.room.category}}"></small>' + "</div>" + "</div>" + '<div class="layout-column no-padding">' + '<div class="layout-row layout-wrap layout-align-end-center">' + "<ch-people-icons " + 'people="$ctrl.chRoomCtrl.room.people" ' + 'max="$ctrl.chRoomCtrl.room.guestsCount.standard" ' + 'extra-people="$ctrl.chRoomCtrl.room.extraPeople" ' + 'extra-max="$ctrl.chRoomCtrl.room.guestsCount.extra">' + "</ch-people-icons>" + "</div>" + "</div>" + "</div>" + "</div>"
    });
    function RoomTitleCtrl($scope, Navigator) {
        var ctrl = this;
        this.toggleRates = function() {
            ctrl.chRoomCtrl.showRoomRates = !ctrl.chRoomCtrl.showRoomRates;
            ctrl.chRoomCtrl.showRoomInfo = false;
            if (!ctrl.chRoomCtrl.showRoomRates) {
                Navigator.scrollToAnchor("av-" + ctrl.chRoomCtrl.$$index);
            } else {
                Navigator.scrollToAnchor("av-" + ctrl.chRoomCtrl.$$index + "-rates");
            }
        };
        this.$onInit = function() {};
    }
})();

(function() {
    "use strict";
    RoomCtrl.$inject = [ "$scope", "NumberUtils" ];
    angular.module("itaca.components").component("chRoom", {
        transclude: true,
        bindings: {
            room: "<",
            storageUrl: "<?",
            nights: "<?"
        },
        controller: RoomCtrl,
        template: '<div id="{{\'av-\'+ $ctrl.$$index}}" class="bg-gray-lighter md-margin no-margin-left no-margin-right relative" ng-transclude></div>'
    });
    function RoomCtrl($scope, NumberUtils) {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.$$index = NumberUtils.uniqueNumber();
        };
    }
})();

(function() {
    "use strict";
    ShowOnScrollCtrl.$inject = [ "$scope", "$element", "$window", "$timeout" ];
    angular.module("itaca.components").component("chShowOnScroll", {
        transclude: true,
        bindings: {
            offset: "@?",
            element: "@?",
            ngDisabled: "<?",
            showClass: "@?",
            hideClass: "@?"
        },
        controller: ShowOnScrollCtrl,
        template: '<div class="ch-show-on-scroll" ng-transclude></div>'
    });
    function ShowOnScrollCtrl($scope, $element, $window, $timeout) {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.element = ctrl.element || null;
            ctrl.offset = isFinite(parseInt(ctrl.offset)) ? parseInt(ctrl.offset) : 500;
            ctrl.ngDisabled = _.isBoolean(ctrl.ngDisabled) ? ctrl.ngDisabled : false;
            ctrl.showClass = ctrl.showClass || "zoomIn";
            if (_.isBoolean(ctrl.showClass)) {
                ctrl.showClass = ctrl.showClass ? "zoomIn" : "";
            }
            ctrl.hideClass = ctrl.hideClass || "zoomOut";
            if (_.isBoolean(ctrl.hideClass)) {
                ctrl.hideClass = ctrl.hideClass ? "zoomOut" : "";
            }
            angular.element($element.children()).addClass("hide");
        };
        this.$postLink = function() {
            ctrl.$manageDisabled();
        };
        this.$manageDisabled = function() {
            ctrl.ngDisabled = _.isBoolean(ctrl.ngDisabled) ? ctrl.ngDisabled : false;
            if (ctrl.ngDisabled) {
                ctrl.$disableShow();
            } else {
                ctrl.$enableShow();
            }
        };
        this.$onChanges = function(changesObj) {
            if (!changesObj) {
                return;
            }
            if (changesObj.ngDisabled) {
                ctrl.$manageDisabled();
            }
        };
        this.$enableShow = function() {
            angular.element($window).on("scroll", ctrl.$toggle);
        };
        this.$disableShow = function() {
            angular.element($window).off("scroll", ctrl.$toggle);
        };
        this.$checkVisible = function() {
            var el = document.querySelector(ctrl.element);
            if (!el) {
                return false;
            }
            var rect = el.getBoundingClientRect();
            var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
            return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
        };
        this.$toggle = function() {
            if (ctrl.ngDisabled) {
                ctrl.$disableShow();
                return;
            }
            $timeout(ctrl.$doToggle);
        };
        this.$doToggle = function() {
            var contEl = $element.children();
            var transEl = angular.element(contEl.children());
            transEl && transEl.addClass("animated");
            var windowsOffset = $window.pageYOffset;
            if (document.body) {
                var style = window.getComputedStyle(document.body);
                var top = style.getPropertyValue("top");
                windowsOffset += top ? Math.abs(parseInt(top)) : 0;
            }
            if (windowsOffset >= ctrl.offset && !ctrl.$checkVisible()) {
                if (transEl) {
                    transEl.addClass("visible " + ctrl.showClass);
                    transEl.removeClass(ctrl.hideClass);
                    angular.element($element.children()).removeClass("hide");
                }
            } else {
                if (transEl) {
                    transEl.removeClass("visible " + ctrl.showClass);
                    transEl.addClass(ctrl.hideClass);
                }
            }
            $scope.$apply();
        };
        this.$onDestroy = function() {
            ctrl.$disableShow();
        };
    }
})();

(function() {
    "use strict";
    StepCtrl.$inject = [ "$element", "$compile", "$scope" ];
    angular.module("itaca.components").component("chSimpleStep", {
        transclude: true,
        require: {
            chStepperCtrl: "^^chSimpleStepper"
        },
        bindings: {
            label: "@?",
            completedLabel: "@?",
            subtitle: "@?",
            completedSubtitle: "@?",
            optional: "<",
            optionalLabel: "@",
            ngDisabled: "<",
            iconClass: "@",
            iconCompletedClass: "@"
        },
        controller: StepCtrl,
        templateUrl: "/tpls/simple-stepper/simple-step.tpl"
    });
    function StepCtrl($element, $compile, $scope) {
        var ctrl = this;
        this.$onInit = function() {
            this.$initWatchers();
        };
        this.$postLink = function() {
            this.$$stepNumber = this.chStepperCtrl.$addStep(this);
        };
        this.$addOverlay = function() {
            var hasOverlay = !!$element.find(".ch-simple-step-body-overlay")[0];
            if (!hasOverlay) {
                var overlay = angular.element('<div class="ch-simple-step-body-overlay"></div>\n<div class="ch-simple-step-body-loading">\n<md-progress-circular md-mode="indeterminate"></md-progress-circular>\n</div>');
                $compile(overlay)($scope);
                $element.find(".ch-simple-stepper-scope").append(overlay);
            }
        };
        this.$initWatchers = function() {
            $scope.$watch(function() {
                return ctrl.active;
            }, function(newVal, oldVal) {
                if (newVal) {
                    $element.addClass("ch-active");
                    ctrl.$addOverlay();
                } else {
                    $element.removeClass("ch-active");
                }
            });
        };
    }
})();

(function() {
    "use strict";
    StepperCtrl.$inject = [ "$scope", "$mdComponentRegistry", "$attrs", "$log" ];
    angular.module("itaca.components").component("chSimpleStepper", {
        transclude: true,
        bindings: {
            linear: "<?",
            previousStepClick: "<?",
            alternative: "<?",
            vertical: "<?",
            mobileMode: "<?",
            labelStep: "@?",
            labelOf: "@?"
        },
        controller: StepperCtrl,
        templateUrl: "/tpls/simple-stepper/simple-stepper.tpl"
    });
    function StepperCtrl($scope, $mdComponentRegistry, $attrs, $log) {
        var ctrl = this;
        this.$onInit = function() {
            this.mobileMode = _.isBoolean(this.mobileMode) ? this.mobileMode : false;
            this.previousStepClick = _.isBoolean(this.previousStepClick) ? this.previousStepClick : false;
            this.linear = _.isBoolean(this.linear) ? this.linear : true;
            this.alternative = _.isBoolean(this.alternative) ? this.alternative : true;
            this.labelStep = this.labelStep || "Step";
            this.labelOf = this.labelOf || "of";
            this.$$steps = [];
            this.$$currentStep = {
                index: 0
            };
        };
        this.$postLink = function() {
            if (!$attrs.id) {
                $log.warn("You must set an id attribute to the stepper");
            }
            this.registeredStepper = $mdComponentRegistry.register(this, $attrs.id);
        };
        this.$onDestroy = function() {
            this.registeredStepper && this.registeredStepper();
        };
        this.$addStep = function(step) {
            var idx = this.$$steps.push(step) - 1;
            this.$setCurrentStep(this.$$currentStep.index);
            return idx;
        };
        this.$setCurrentStep = function(step) {
            step = _.isFinite(step) ? this.$$steps[step] : _.includes(this.$$steps, step) ? step : null;
            if (!step) {
                return false;
            }
            var previousStepIdx = parseInt(this.$$currentStep.index);
            this.$$currentStep = _.isPlainObject(this.$$currentStep) ? this.$$currentStep : {};
            this.$$currentStep.index = step.$$stepNumber || _.indexOf(this.$$steps, step);
            this.$$currentStep.first = this.$$currentStep.index == 0;
            this.$$currentStep.last = this.$$currentStep.index == this.$$steps.length - 1;
            this.$$currentStep.lastButOne = this.$$currentStep.index == this.$$steps.length - 2;
            this.$$currentStep.label = step.label;
            this.$$currentStep.completedLabel = step.completedLabel;
            this.$$currentStep.subtitle = step.subtitle;
            this.$$currentStep.completedSubtitle = step.completedSubtitle;
            this.$$currentStep.optional = step.optional;
            this.$$currentStep.optionalLabel = step.optionalLabel;
            this.$onStepChange(this.$$currentStep.index);
            this.$onStepChange(previousStepIdx);
            return step;
        };
        this.$onStepChange = function(stepNumber) {
            var step = _.isFinite(stepNumber) ? this.$$steps[stepNumber] : null;
            if (!step) {
                return false;
            }
            step.$completed = this.isCompleted(stepNumber);
            step.$active = this.isActive(stepNumber);
        };
        this.next = function() {
            if (this.$$currentStep.index < this.$$steps.length) {
                this.clearError();
                this.$setCurrentStep(this.$$currentStep.index + 1);
                this.clearFeedback();
                return true;
            }
            return false;
        };
        this.back = function() {
            if (this.$$currentStep.index > 0) {
                this.clearError();
                this.$setCurrentStep(this.$$currentStep.index - 1);
                this.clearFeedback();
                return true;
            }
            return false;
        };
        this.skip = function() {
            var step = this.$$steps[this.$$currentStep.index];
            if (step.optional) {
                this.$setCurrentStep(this.$$currentStep.index + 1);
                this.clearFeedback();
                return true;
            }
            return false;
        };
        this.error = function(message) {
            var step = this.$$steps[this.$$currentStep.index];
            this.$$currentStep.hasError = step.hasError = true;
            this.$$currentStep.message = step.message = message;
            this.clearFeedback();
        };
        this.clearError = function() {
            var step = this.$$steps[this.$$currentStep.index];
            this.$$currentStep.hasError = step.hasError = false;
        };
        this.goto = function(stepNumber) {
            if (stepNumber < this.$$steps.length) {
                this.$setCurrentStep(stepNumber);
                this.clearFeedback();
                return true;
            }
            return false;
        };
        this.showFeedback = function(message) {
            this.hasFeedback = true;
            this.feedbackMessage = message;
        };
        this.clearFeedback = function() {
            this.hasFeedback = false;
        };
        this.isCompleted = function(stepNumber) {
            return this.linear && stepNumber < this.$$currentStep.index;
        };
        this.isActive = function(stepNumber) {
            return stepNumber === this.$$currentStep.index;
        };
    }
})();

(function() {
    "use strict";
    StepperFactory.$inject = [ "$mdComponentRegistry" ];
    angular.module("itaca.components").factory("$chSimpleStepper", StepperFactory);
    function StepperFactory($mdComponentRegistry) {
        return function(stepperId) {
            var stepper = $mdComponentRegistry.get(stepperId);
            if (!stepper) {
                $mdComponentRegistry.notFoundError(stepperId);
            }
            return stepper;
        };
    }
})();

(function() {
    "use strict";
    GalleryCtrl.$inject = [ "$scope", "Dialog" ];
    angular.module("itaca.components").component("chSlidingGallery", {
        bindings: {
            gallery: "<?",
            baseUrl: "<?",
            sort: "<?",
            sortFn: "&?",
            openOnClick: "<?",
            tooltip: "@",
            dialogTitle: "@",
            onReady: "&",
            slidesPerView: "<?",
            slidesPerColumn: "<?",
            spaceBetween: "<?",
            parallax: "<?",
            parallaxTransition: "@",
            paginationIsActive: "<?",
            paginationClickable: "<?",
            showNavButtons: "<?",
            showScrollBar: "<?",
            loop: "<?",
            autoplay: "<?",
            initialSlide: "<?",
            containerCls: "@",
            wrapperCls: "@",
            paginationCls: "@",
            slideCls: "@",
            direction: "@",
            swiper: "<?",
            overrideParameters: "<?",
            lazyLoading: "<?"
        },
        controller: GalleryCtrl,
        template: '<div flex ng-if="$ctrl.gallery.length">' + "<ks-swiper-container " + 'override-parameters="$ctrl.$$overrideParameters"' + 'container-cls="{{$ctrl.containerCls}}"' + 'wrapper-cls="{{$ctrl.wrapperCls}}"' + 'pagination-cls="{{$ctrl.paginationCls}}"' + 'slide-cls="{{$ctrl.slideCls}}"' + 'slides-per-view="$ctrl.slidesPerView"' + 'slides-per-column="$ctrl.slidesPerColumn"' + 'autoplay="$ctrl.autoplay"' + 'direction="{{$ctrl.direction}}"' + 'show-nav-buttons="$ctrl.showNavButtons"' + 'show-scroll-bar="$ctrl.showScrollBar"' + 'pagination-is-active="$ctrl.paginationIsActive"' + 'pagination-clickable="$ctrl.paginationClickable"' + 'initial-slide="$ctrl.initialSlide"' + 'space-between="$ctrl.spaceBetween"' + 'parallax="$ctrl.parallax"' + 'parallax-transition="{{$ctrl.parallaxTransition}}"' + 'loop="$ctrl.loop"' + 'swiper="$ctrl.swiper"' + 'on-ready="$ctrl.onReady">' + '<ks-swiper-slide slider-cls="no-bg" ng-class="{\'text-center\': $ctrl.$$overrideParameters.centeredSlides}" ng-repeat="image in $ctrl.gallery track by $index">' + "\x3c!-- Preloaded Image --\x3e" + "<div ng-if=\"!$ctrl.$$overrideParameters.lazyLoading\" class=\"{{$ctrl.slideCls}} bg-center-center clickable\" ng-style=\"{'background-image': 'url('+$ctrl.baseUrl + image.path+')'}\"" + 'ng-click="$ctrl.$openGallery($event, $index)"></div>' + "\x3c!-- Lazy Loading Image --\x3e" + '<div ng-if="$ctrl.$$overrideParameters.lazyLoading" ng-attr-data-background="{{$ctrl.baseUrl}}{{image.path}}" class="{{$ctrl.slideCls}} bg-center-center clickable swiper-lazy"' + 'ng-click="$ctrl.$openGallery($event, $index)">' + '<div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>' + "</div>" + "</ks-swiper-slide>" + "</ks-swiper-container>" + '<md-tooltip ng-if="$ctrl.openOnClick">' + '<span ng-if="!$ctrl.tooltip" translate="photo.gallery.click.to.open"></span>' + '<span ng-if="$ctrl.tooltip" ng-bind="$ctrl.tooltip"></span>' + "</md-tooltip>" + "</div>"
    });
    function GalleryCtrl($scope, Dialog) {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.direction = ctrl.direction || "horizontal";
            ctrl.containerCls = ctrl.containerCls || "index-0 bg-gray-base";
            ctrl.wrapperCls = ctrl.wrapperCls || "layout-row layout-align-start-center";
            ctrl.paginationCls = ctrl.paginationCls || "swiper-pagination-white";
            ctrl.slidesPerView = ctrl.slidesPerView || 1;
            ctrl.slidesPerColumn = ctrl.slidesPerColumn || 1;
            ctrl.loop = _.isBoolean(ctrl.loop) ? ctrl.loop : true;
            ctrl.showNavButtons = _.isBoolean(ctrl.showNavButtons) ? ctrl.showNavButtons : true;
            ctrl.paginationIsActive = _.isBoolean(ctrl.paginationIsActive) ? ctrl.paginationIsActive : true;
            ctrl.paginationClickable = _.isBoolean(ctrl.paginationClickable) ? ctrl.paginationClickable : true;
            ctrl.spaceBetween = ctrl.spaceBetween || 0;
            ctrl.lazyLoading = _.isBoolean(ctrl.lazyLoading) ? ctrl.lazyLoading : true;
            ctrl.$$overrideParameters = {
                keyboardControl: true,
                grabCursor: ctrl.showNavButtons,
                centeredSlides: true,
                lazyLoading: ctrl.lazyLoading,
                preloadImages: !ctrl.lazyLoading,
                lazyLoadingInPrevNext: ctrl.lazyLoading,
                autoplayDisableOnInteraction: false,
                pagination: false,
                watchSlidesVisibility: ctrl.lazyLoading && (ctrl.slidesPerView == "auto" || ctrl.slidesPerView > 1)
            };
            ctrl.$overrideConfig();
            ctrl.$sortGallery();
        };
        this.$sortGallery = function() {
            var sortBy = angular.isFunction(ctrl.sortFn) ? ctrl.sortFn : _.isBoolean(ctrl.sort) && ctrl.sort ? function(o) {
                return +Boolean(o.cover);
            } : ctrl.sort;
            if (sortBy) {
                ctrl.gallery = _.sortBy(ctrl.gallery, angular.isFunction(sortBy) ? [ sortBy ] : sortBy);
            }
        };
        this.$overrideConfig = function() {
            _.assign(ctrl.$$overrideParameters, ctrl.overrideParameters);
        };
        this.$openGallery = function(ev, idx) {
            if (ctrl.openOnClick && !_.isEmpty(ctrl.gallery)) {
                Dialog.showGallery(ev, ctrl.dialogTitle, ctrl.gallery, {
                    storageUrl: ctrl.baseUrl,
                    initialSlide: idx || 0
                });
            }
        };
    }
})();

(function() {
    "use strict";
    SocialShareCtrl.$inject = [ "$scope", "UrlUtils", "AppOptions" ];
    angular.module("itaca.components").component("chSocialShare", {
        bindings: {
            iconSize: "<?",
            title: "@",
            text: "@",
            url: "@",
            tags: "@",
            mediaUrl: "@",
            fbAppId: "@"
        },
        controller: SocialShareCtrl,
        template: '<div class="layout-padding no-padding-top" ng-cloak>' + '<div hide-gt-sm class="layout-align-center-center layout-row layout-wrap">' + '<a class="auto-height button-mini md-button" aria-label="whatsapp"' + "socialshare" + 'socialshare-provider="whatsapp"' + 'socialshare-url="{{$ctrl.$$url}}"' + 'socialshare-text="{{$ctrl.text}}">' + '<md-icon class="mdi mdi-whatsapp {{$ctrl.iconSize}} material-icons text-whatsapp"></md-icon>' + '<div class="font-12 row-mini text-initial text-wrap">Whatsapp</div>' + "</a>" + '<a class="auto-height button-mini md-button" aria-label="sms"' + "socialshare" + 'socialshare-provider="sms"' + 'socialshare-text="{{$ctrl.text}}"' + 'socialshare-url="{{$ctrl.$$url}}">' + '<md-icon class="mdi mdi-message-text {{$ctrl.iconSize}} material-icons text-primary"></md-icon>' + '<div class="font-12 row-mini text-initial text-wrap">SMS</div>' + "</a>" + '<a class="auto-height button-mini md-button" aria-label="facebook messenger"' + "socialshare" + 'socialshare-provider="facebook-messenger"' + 'socialshare-url="{{$ctrl.$$url}}">' + '<md-icon class="mdi mdi-facebook-messenger {{$ctrl.iconSize}} material-icons text-messenger"></md-icon>' + '<div class="font-12 row-mini text-initial text-wrap">Messenger</div>' + "</a>" + "</div>" + "<md-divider hide-gt-sm></md-divider>" + '<div class="layout-align-center-center layout-row layout-wrap">' + '<md-button class="auto-height button-mini" aria-label="email"' + "socialshare" + 'socialshare-provider="email"' + 'socialshare-media="{{$ctrl.$$mediaUrl}}"' + 'socialshare-subject="{{$ctrl.title}}"' + 'socialshare-body="{{$ctrl.text}} - {{$ctrl.$$url}}"' + 'socialshare-popup-height="300"' + 'socialshare-popup-width="400">' + '<md-icon class="mdi mdi-email {{$ctrl.iconSize}} material-icons text-primary"></md-icon>' + '<div class="font-12 row-mini text-initial text-wrap">E-mail</div>' + "</md-button>" + '<md-button class="auto-height button-mini" aria-label="facebook"' + "socialshare" + 'socialshare-provider="facebook"' + 'socialshare-via="{{$ctrl.fbAppId}}"' + 'socialshare-type="feed"' + 'socialshare-media="{{$ctrl.$$mediaUrl}}"' + 'socialshare-text="{{$ctrl.title}}"' + 'socialshare-url="{{$ctrl.$$url}}"' + 'socialshare-redirect-uri="{{$ctrl.$$url}}"' + 'socialshare-quote="{{$ctrl.title}}"' + 'socialshare-hashtags="{{$ctrl.tags}}"' + 'socialshare-popup-height="300"' + 'socialshare-popup-width="400"' + 'socialshare-trigger="click">' + '<md-icon class="mdi mdi-facebook {{$ctrl.iconSize}} material-icons text-fb"></md-icon>' + '<div class="font-12 row-mini text-initial text-wrap">Facebook</div>' + "</md-button>" + '<md-button class="auto-height button-mini" aria-label="twitter"' + "socialshare" + 'socialshare-provider="twitter"' + 'socialshare-hashtags="{{$ctrl.tags}}"' + 'socialshare-text="{{$ctrl.text}}"' + 'socialshare-url="{{$ctrl.$$url}}"' + 'socialshare-popup-height="300"' + 'socialshare-popup-width="400"' + 'socialshare-trigger="click">' + '<md-icon class="mdi mdi-twitter text-twitter {{$ctrl.iconSize}} material-icons"></md-icon>' + '<div class="font-12 row-mini text-initial text-wrap">Twitter</div>' + "</md-button>" + '<md-button class="auto-height button-mini" aria-label="google plus"' + "socialshare" + 'socialshare-provider="google"' + 'socialshare-url="{{$ctrl.$$url}}"' + 'socialshare-popup-height="300"' + 'socialshare-popup-width="400"' + 'socialshare-trigger="click">' + '<md-icon class="mdi mdi-google-plus text-gplus {{$ctrl.iconSize}} material-icons"></md-icon>' + '<div class="font-12 row-mini text-initial text-wrap">Google +</div>' + "</md-button>" + '<md-button class="auto-height button-mini" aria-label="telegram"' + "socialshare" + 'socialshare-provider="telegram"' + 'socialshare-url="{{$ctrl.$$url}}"' + 'socialshare-text="{{$ctrl.text}}"' + 'socialshare-trigger="click">' + '<md-icon class="mdi mdi-telegram text-telegram {{$ctrl.iconSize}} material-icons"></md-icon>' + '<div class="font-12 row-mini text-initial text-wrap">Telegram</div>' + "</md-button>" + '<md-button class="auto-height button-mini" aria-label="skype"' + "socialshare" + 'socialshare-provider="skype"' + 'socialshare-url="{{$ctrl.$$url}}"' + 'socialshare-text="{{$ctrl.text}}"' + 'socialshare-popup-height="800"' + 'socialshare-popup-width="400"' + 'socialshare-trigger="click">' + '<md-icon class="mdi mdi-skype text-skype {{$ctrl.iconSize}} material-icons"></md-icon>' + '<div class="font-12 row-mini text-initial text-wrap">Skype</div>' + "</md-button>" + '<md-button class="auto-height button-mini" aria-label="reddit"' + "socialshare" + 'socialshare-provider="reddit"' + 'socialshare-text="{{$ctrl.text}}"' + 'socialshare-url="{{$ctrl.$$url}}"' + 'socialshare-popup-height="300"' + 'socialshare-popup-width="400"' + 'socialshare-trigger="click">' + '<md-icon class="mdi mdi-reddit text-reddit {{$ctrl.iconSize}} material-icons"></md-icon>' + '<div class="font-12 row-mini text-initial text-wrap">Reddit</div>' + "</md-button>" + '<md-button class="auto-height button-mini" aria-label="linkedin"' + "socialshare" + 'socialshare-provider="linkedin"' + 'socialshare-text="{{$ctrl.text}}"' + 'socialshare-url="{{$ctrl.$$url}}"' + 'socialshare-description="{{$ctrl.text}}"' + 'socialshare-source="{{$ctrl.title}}"' + 'socialshare-popup-height="300"' + 'socialshare-popup-width="400"' + 'socialshare-trigger="click">' + '<md-icon class="mdi mdi-linkedin text-linkedin {{$ctrl.iconSize}} material-icons"></md-icon>' + '<div class="font-12 row-mini text-initial text-wrap">Linkedin</div>' + "</md-button>" + '<md-button class="auto-height button-mini" aria-label="pinterest"' + "socialshare" + 'socialshare-media="{{$ctrl.$$mediaUrl}}"' + 'socialshare-provider="pinterest"' + 'socialshare-text="{{$ctrl.text}}"' + 'socialshare-url="{{$ctrl.$$url}}"' + 'socialshare-popup-height="300"' + 'socialshare-popup-width="400"' + 'socialshare-trigger="click">' + '<md-icon class="mdi mdi-pinterest text-pinterest {{$ctrl.iconSize}} material-icons"></md-icon>' + '<div class="font-12 row-mini text-initial text-wrap">Pinterest</div>' + "</md-button>" + '<md-button class="auto-height button-mini" aria-label="tumblr"' + "socialshare" + 'socialshare-provider="tumblr"' + 'socialshare-type="link"' + 'socialshare-text="{{$ctrl.text}}"' + 'socialshare-url="{{$ctrl.$$url}}"' + 'socialshare-popup-height="300"' + 'socialshare-popup-width="540"' + 'socialshare-trigger="click">' + '<md-icon class="mdi mdi-tumblr text-tumblr {{$ctrl.iconSize}} material-icons"></md-icon>' + '<div class="font-12 row-mini text-initial text-wrap">Tumblr</div>' + "</md-button>" + '<md-button class="auto-height button-mini" aria-label="vk"' + "socialshare" + 'socialshare-provider="vk"' + 'socialshare-text="{{$ctrl.text}}"' + 'socialshare-url="{{$ctrl.$$url}}"' + 'socialshare-popup-height="300"' + 'socialshare-popup-width="400"' + 'socialshare-trigger="click">' + '<md-icon class="mdi mdi-vk text-vk {{$ctrl.iconSize}} material-icons"></md-icon>' + '<div class="font-12 row-mini text-initial text-wrap">Vk</div>' + "</md-button>" + "</div>" + "</div>"
    });
    function SocialShareCtrl($scope, UrlUtils, AppOptions) {
        var ctrl = this;
        this.$onInit = function() {
            if (!AppOptions.about) {
                return;
            }
            ctrl.iconSize = ctrl.iconSize || "md-38";
            ctrl.mediaUrl = ctrl.mediaUrl || "/resources/img/favicon-96x96.png";
            ctrl.$$mediaUrl = UrlUtils.parseUrl(ctrl.mediaUrl).href;
            ctrl.$$url = UrlUtils.parseUrl(ctrl.url).href;
        };
    }
})();

(function() {
    "use strict";
    StickyCtrl.$inject = [ "$scope", "$element", "$window" ];
    angular.module("itaca.components").component("chSticky", {
        transclude: true,
        bindings: {
            stickyParent: "@",
            stickyOffset: "@",
            stickyClass: "@",
            scrollContainer: "@",
            onSticky: "&?"
        },
        controller: StickyCtrl,
        template: '<div class="ch-sticky-wrapper"><div class="ch-sticky" ng-transclude></div></div>'
    });
    function StickyCtrl($scope, $element, $window) {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.$$parentNode = ctrl.stickyParent ? document.querySelector(ctrl.stickyParent) : null;
            if (!ctrl.$$parentNode) {
                ctrl.$$parentNode = $element.parent()[0];
            }
            ctrl.$$parentNode.style.position = "relative";
            ctrl.$$wrapperNode = $element[0].querySelector(".ch-sticky-wrapper");
            ctrl.$$targetEl = angular.element($element[0].querySelector(".ch-sticky"));
            ctrl.stickyOffset = ctrl.stickyOffset || 0;
            ctrl.scrollContainer = (ctrl.scrollContainer ? document.querySelector(ctrl.scrollContainer) : null) || $window;
            ctrl.scrollContainer.addEventListener("scroll", ctrl.$doSticky);
        };
        this.$onDestroy = function() {
            ctrl.scrollContainer.removeEventListener("scroll", ctrl.$doSticky);
        };
        this.$doSticky = function() {
            var parentHeight = ctrl.$$parentNode.offsetHeight;
            var offsetTop = ctrl.$$parentNode.offsetTop - ctrl.stickyOffset;
            var elementHeight = ctrl.$$targetEl[0].offsetHeight;
            var hasBackdrop = !_.isEmpty(angular.element(document.querySelectorAll(".md-select-backdrop, .md-menu-backdrop, .md-dialog-backdrop, .md-bottom-sheet-backdrop")));
            var scrollOffset = hasBackdrop ? Math.abs(parseInt(document.body.style.top)) : $window.pageYOffset;
            if (scrollOffset >= offsetTop && scrollOffset <= offsetTop + (parentHeight - elementHeight)) {
                ctrl.$$targetEl.css({
                    position: "fixed",
                    top: ctrl.stickyOffset + "px",
                    "z-index": "10",
                    bottom: "",
                    width: ctrl.$$wrapperNode.offsetWidth + "px"
                });
                if (ctrl.stickyClass) {
                    ctrl.$$targetEl.addClass(ctrl.stickyClass);
                }
                ctrl.onSticky && onSticky();
            } else {
                if (scrollOffset >= offsetTop && scrollOffset > offsetTop + (parentHeight - elementHeight)) {
                    ctrl.$$targetEl.css({
                        position: "absolute",
                        bottom: "0",
                        "z-index": "",
                        top: "",
                        width: ""
                    });
                } else {
                    ctrl.$$targetEl.css({
                        position: "absolute",
                        bottom: "",
                        "z-index": "",
                        top: "0",
                        width: ""
                    });
                }
                if (ctrl.stickyClass) {
                    ctrl.$$targetEl.removeClass(ctrl.stickyClass);
                }
            }
        };
    }
})();

(function() {
    "use strict";
    TimeLeftCtrl.$inject = [ "$scope" ];
    angular.module("itaca.components").component("chTimeLeft", {
        bindings: {
            start: "<?",
            end: "<?"
        },
        controller: TimeLeftCtrl,
        template: '<span ng-bind="$ctrl.$$timeLeft"></span>'
    });
    function TimeLeftCtrl($scope) {
        var ctrl = this;
        this.$onInit = function() {
            $scope.$watchGroup([ function() {
                return ctrl.start;
            }, function() {
                return ctrl.end;
            } ], ctrl.$calculateDiff);
        };
        this.$calculateDiff = function() {
            var start = ctrl.start ? moment(ctrl.start) : moment();
            var end = ctrl.start ? moment(ctrl.end) : moment();
            ctrl.$$timeLeft = start.to(end);
        };
    }
})();

(function() {
    "use strict";
    EventCtrl.$inject = [ "$scope", "$element", "$mdMedia" ];
    angular.module("itaca.components").component("chTimelineEvent", {
        require: {
            chTimelineCtrl: "^chTimeline"
        },
        transclude: true,
        bindings: {
            date: "<",
            eventTitle: "@",
            titleQuote: "<?",
            iconBg: "@",
            iconClass: "@",
            dateFormat: "@",
            isNew: "<?",
            ngDisabled: "<?"
        },
        controller: EventCtrl,
        template: '<div class="md-padding relative" ch-animated="{{$ctrl.event.animatedClass}}" ch-animated-delay="{{$ctrl.event.animatedDelay}}">' + '<div class="ch-timeline-event-icon {{$ctrl.event.iconBg}}">' + '<md-icon ng-if="$ctrl.event.iconClass" class="material-icons {{$ctrl.event.iconClass}}"></md-icon>' + '<div ng-if="!$ctrl.event.iconClass" class="md-subhead ng-scope row-mini">' + "<div class=\"text-bold\">{{$ctrl.event.date|utcDate:'d'}}</div>" + "<div class=\"text-small\">{{$ctrl.event.date|utcDate:'MMM'}}</div>" + "</div>" + "</div>" + '<div class="ch-timeline-event-content layout-padding no-padding bg-white text-left md-whiteframe-1dp"  ng-class="{\'locked\': $ctrl.ngDisabled}">' + '<div ng-if="$ctrl.event.title || $ctrl.event.dateFormat" class="layout-row layout-wrap layout-padding layout-align-start-center">' + "<div class=\"md-subhead text-left\" ng-class=\"!$mdMedia('gt-sm') ? 'flex-100': 'flex'\">" + '<span ng-if="$ctrl.isNew"><md-icon class="mdi mdi-new-box text-info material-icons"></md-icon></span>' + '<strong ng-if="$ctrl.event.title">' + "<em>" + '<span ng-if="$ctrl.titleQuote">&ldquo;</span>' + "<span>{{$ctrl.event.title}}</span>" + '<span ng-if="$ctrl.titleQuote">&bdquo;</span>' + "</em>" + "</strong>" + "</div>" + '<div class="text-gray-light text-small">{{$ctrl.event.date|utcDate:$ctrl.event.dateFormat}}</div>' + "</div>" + '<div class="no-padding" ng-transclude></div>' + "</div>" + "</div>"
    });
    function EventCtrl($scope, $element, $mdMedia) {
        $scope.$mdMedia = $mdMedia;
        var ctrl = this;
        this.$onInit = function() {
            ctrl.event = {
                date: ctrl.date,
                title: ctrl.eventTitle,
                iconBg: ctrl.iconBg,
                iconClass: ctrl.iconClass,
                dateFormat: ctrl.dateFormat,
                animatedClass: ctrl.chTimelineCtrl.animatedClass
            };
            ctrl.chTimelineCtrl.addEvent(ctrl.event);
            ctrl.titleQuote = _.isBoolean(ctrl.titleQuote) ? ctrl.titleQuote : true;
            $element.addClass("ch-timeline-event flex-xs-100 relative layout-column");
            $element.addClass(ctrl.event.align == "CENTER" ? "flex-50" : "flex-100");
        };
        this.$onChanges = function(changesObj) {
            if (!changesObj) {
                return;
            }
            if (changesObj.eventTitle) {
                ctrl.event && (ctrl.event.title = ctrl.eventTitle);
            }
            if (changesObj.date) {
                ctrl.event && (ctrl.event.date = ctrl.date);
            }
            if (changesObj.iconBg) {
                ctrl.event && (ctrl.event.iconBg = ctrl.iconBg);
            }
            if (changesObj.iconClass) {
                ctrl.event && (ctrl.event.iconClass = ctrl.iconClass);
            }
            if (changesObj.dateFormat) {
                ctrl.event && (ctrl.event.dateFormat = ctrl.dateFormat);
            }
        };
        this.$onDestroy = function() {
            ctrl.chTimelineCtrl.removeEvent(ctrl.event);
        };
    }
})();

(function() {
    "use strict";
    TimelineCtrl.$inject = [ "$scope", "$mdMedia", "NumberUtils" ];
    angular.module("itaca.components").component("chTimeline", {
        transclude: true,
        bindings: {
            align: "@",
            randomBg: "<?",
            hideIcon: "<?"
        },
        controller: TimelineCtrl,
        template: '<div class="ch-timeline {{$ctrl.alignClass}} {{$ctrl.barClass}} {{$ctrl.hideIcon ? \'no-icon\' : null}}"><div class="layout-row layout-wrap" ng-transclude></div><bar></bar></div>'
    });
    function TimelineCtrl($scope, $mdMedia, NumberUtils) {
        var ctrl = this;
        this.events = [];
        this.bgArray = [ "bg-success text-white", "bg-info text-white", "bg-warn text-white", "bg-danger text-white", "bg-primary text-white", "bg-primary-light text-white", "bg-blue-sea text-white", "bg-gray-light text-white", "bg-gray-lighter only-border text-gray-light" ];
        this.$onInit = function() {
            ctrl.hideIcon = _.isBoolean(ctrl.hideIcon) ? ctrl.hideIcon : false;
            ctrl.randomBg = _.isBoolean(ctrl.randomBg) ? ctrl.randomBg : true;
            ctrl.manageAlign();
        };
        this.$onChanges = function(changesObj) {
            if (!changesObj) {
                return;
            }
            if (changesObj.hideIcon) {
                ctrl.hideIcon = _.isBoolean(ctrl.hideIcon) ? ctrl.hideIcon : false;
            }
            if (changesObj.align) {
                ctrl.manageAlign();
            }
        };
        this.manageAlign = function() {
            ctrl.align = _.includes([ "LEFT", "CENTER", "RIGHT" ], ctrl.align) ? ctrl.align : "CENTER";
            ctrl.align = $mdMedia("gt-xs") ? ctrl.align : "RIGHT";
            ctrl.alignClass = "ch-timeline-" + ctrl.align.toLowerCase();
            ctrl.animatedClass = ctrl.align == "RIGHT" ? "slideInRight" : ctrl.align == "LEFT" ? "slideInLeft" : "slideInUp";
            _.forEach(ctrl.events, function(e) {
                e.align = newVal;
            });
        };
        this.manageIconBgColor = function(ev) {
            if (!_.isNil(ev.iconBg) || !ctrl.randomBg) {
                return;
            }
            ctrl.bgArrayLeft = _.isEmpty(ctrl.bgArrayLeft) ? angular.copy(ctrl.bgArray) : ctrl.bgArrayLeft;
            ev.iconBg = _.sample(ctrl.bgArrayLeft);
            _.pull(ctrl.bgArrayLeft, ev.iconBg);
            if (!ctrl.lastIconBg && ctrl.lastIconBg != ev.iconBg) {
                ctrl.lastIconBg = ev.iconBg;
            } else {
                ctrl.manageIconBgColor(ev);
            }
        };
        this.addEvent = function(timelineEvent) {
            timelineEvent.align = ctrl.align;
            ctrl.manageIconBgColor(timelineEvent);
            timelineEvent.index = ctrl.events.push(timelineEvent) - 1;
            timelineEvent.animatedDelay = timelineEvent.index >= 0 && timelineEvent.index <= 10 ? timelineEvent.index * 100 : 1e3;
            ctrl.barClass = NumberUtils.isOdd(ctrl.events.length) ? "ch-timeline-odd" : "ch-timeline-even";
        };
        this.removeEvent = function(timelineEvent) {
            _.pull(ctrl.events, timelineEvent);
            ctrl.barClass = NumberUtils.isOdd(ctrl.events.length) ? "ch-timeline-odd" : "ch-timeline-even";
        };
    }
})();

(function() {
    "use strict";
    TruncateCtrl.$inject = [ "$scope", "truncateFilter" ];
    angular.module("itaca.components").component("chTruncate", {
        bindings: {
            text: "@",
            maxLength: "<?",
            suffix: "@",
            hideTooltip: "<?"
        },
        controller: TruncateCtrl,
        template: "<span>" + '<span>{{$ctrl.$$truncated}}</span><md-tooltip ng-if="$ctrl.$$showTooltip">{{$ctrl.text}}</md-tooltip>' + "</span>"
    });
    function TruncateCtrl($scope, truncateFilter) {
        var ctrl = this;
        ctrl.$onInit = function() {
            $scope.$watchGroup([ function() {
                return ctrl.text;
            }, function() {
                return ctrl.maxLength;
            } ], ctrl.$truncate);
        };
        ctrl.$truncate = function() {
            ctrl.$$showTooltip = !ctrl.hideTooltip && ctrl.text.length > ctrl.maxLength;
            ctrl.$$truncated = truncateFilter(ctrl.text, ctrl.maxLength, ctrl.suffix);
        };
    }
})();

(function() {
    "use strict";
    VerticalTextCtrl.$inject = [ "$scope" ];
    angular.module("itaca.components").component("chVerticalText", {
        bindings: {
            text: "<"
        },
        controller: VerticalTextCtrl,
        template: "<div>" + '<p ng-repeat="char in $ctrl.$$textArr">{{char}}</p>' + "</div>"
    });
    function VerticalTextCtrl($scope) {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.$initWatchers();
        };
        this.$prepareText = function() {
            ctrl.$$textArr = _.split(ctrl.text, "");
        };
        this.$initWatchers = function() {
            $scope.$watch(function() {
                return ctrl.text;
            }, ctr.$prepareText);
        };
    }
})();

(function() {
    "use strict";
    angular.module("itaca.components").factory("WeatherUtils", WeatherUtilsFactory);
    function WeatherUtilsFactory() {
        var $$service = {};
        $$service.getInfo = function(iconId) {
            if (!iconId) {
                return null;
            }
            var icon = "mdi-minus";
            var label;
            var isNight = iconId.slice(-1) == "n";
            switch (iconId) {
              case "01d":
                label = "sunny";
                icon = "sunny";
                break;

              case "01n":
                label = "starry";
                icon = "starry";
                break;

              case "02d":
              case "02n":
                label = "partly.cloudy";
                icon = "cloudy";
                break;

              case "03d":
              case "03n":
              case "04d":
              case "04n":
                label = "cloudy";
                icon = "cloudy";
                break;

              case "09d":
              case "09n":
                label = "drizzle";
                icon = "rainy";
                break;

              case "010d":
              case "010n":
                label = "rain";
                icon = "rainy";
                break;

              case "011d":
              case "011n":
                label = "thunderstorm";
                icon = "stormy";
                break;

              case "013d":
              case "013n":
                label = "snowy";
                icon = "snowy";
                break;

              case "050d":
              case "050n":
                label = "variable";
                icon = "material-icons md-160 mdi mdi-weather-windy text-white";
                break;

              default:
                label = "variable";
                icon = "material-icons md-160 mdi mdi-weather-windy text-white";
                break;
            }
            return {
                icon: icon,
                label: label,
                isNight: isNight
            };
        };
        $$service.getLabel = function(iconId) {
            if (!iconId) {
                return null;
            }
            var label = "";
            switch (iconId) {
              case "01d":
                label = "sunny";
                break;

              case "01n":
                label = "starry";
                break;

              case "02d":
              case "02n":
                label = "partly.cloudy";
                break;

              case "03d":
              case "03n":
              case "04d":
              case "04n":
                label = "cloudy";
                break;

              case "09d":
              case "09n":
                label = "drizzle";
                break;

              case "010d":
              case "010n":
                label = "rain";
                break;

              case "011d":
              case "011n":
                label = "thunderstorm";
                break;

              case "013d":
              case "013n":
                label = "snowy";
                break;

              case "050d":
              case "050n":
                label = "variable";
                break;

              default:
                label = "variable";
                break;
            }
            return label;
        };
        $$service.getIconClass = function(iconId) {
            if (!iconId) {
                return null;
            }
            var icon = "mdi-minus";
            switch (iconId) {
              case "01d":
                icon = "sunny";
                break;

              case "01n":
                icon = "starry";
                break;

              case "02d":
              case "02n":
                icon = "cloudy";
                break;

              case "03d":
              case "03n":
              case "04d":
              case "04n":
                icon = "cloudy";
                break;

              case "09d":
              case "09n":
                icon = "rainy";
                break;

              case "010d":
              case "010n":
                icon = "rainy";
                break;

              case "011d":
              case "011n":
                icon = "stormy";
                break;

              case "013d":
              case "013n":
                icon = "snowy";
                break;

              case "050d":
              case "050n":
                icon = "material-icons md-160 mdi mdi-weather-windy text-white";
                break;

              default:
                icon = "material-icons md-160 mdi mdi-weather-windy text-white";
                break;
            }
            return icon;
        };
        $$service.isNight = function(iconId) {
            if (!iconId) {
                return null;
            }
            return iconId.slice(-1) == "n";
        };
        return $$service;
    }
})();

(function() {
    "use strict";
    WeatherCtrl.$inject = [ "$scope", "$log", "$http", "Weather", "WeatherUtils", "NumberUtils" ];
    angular.module("itaca.components").component("chWeather", {
        bindings: {
            city: "@",
            country: "@"
        },
        controller: WeatherCtrl,
        template: "<div>" + '<div class="relative overflow-hidden weather-container">' + "<i ng-if=\"$ctrl.$$weather.label == 'partly.cloudy'\" ng-class=\"$ctrl.$$weather.isNight ? 'starry' : 'sunny'\" class=\"cloud\"></i>" + '<md-icon class="{{$ctrl.$$weather.icon}}"></md-icon>' + "</div>" + '<div class="text-white"><span ng-if="$$weather.label" translate="weather.{{$ctrl.$$weather.label}}"></span></div>' + '<div class="md-headline text-bold text-white"><span>{{$ctrl.city}}</span></div>' + '<div class="md-body-2 text-white text-uppercase"><span>{{$ctrl.country}}</span></div>' + "<div>" + '<span class="md-headline text-bold text-white">{{$$weather.temp}}</span>' + '<mdi-icon class="mdi mdi-temperature-celsius material-icons text-white"></md-icon>' + "</div>" + "</div>"
    });
    function WeatherCtrl($scope, $log, $http, Weather, WeatherUtils, NumberUtils) {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.$reset();
        };
        this.$onChanges = function(changesObj) {
            if (changesObj.city) {
                ctrl.$getWeather();
            }
        };
        this.$reset = function() {
            ctrl.$$weather = {
                icon: "mdi mdi-minus material-icons md-164",
                temp: "-"
            };
        };
        this.$getWeather = function() {
            Weather.get(ctrl.city, ctrl.country).then(function(response) {
                if (!_.isNil(response)) {
                    ctrl.$$weather.temp = NumberUtils.fixedDecimals(response.main.temp, 1);
                    ctrl.$getInfo(response.weather[0].icon);
                } else {
                    $log.error("Error getting weather");
                }
            }, function(error) {
                $log.error(error);
                ctrl.$reset();
            });
        };
        this.$getInfo = function(iconId) {
            _.assign(ctrl.$$weather, WeatherUtils.getInfo(iconId));
        };
    }
})();

(function() {
    "use strict";
    angular.module("itaca.components").provider("Weather", WeatherProvider);
    function WeatherProvider() {
        var $$appId = "";
        this.setAppId = function(appId) {
            $$appId = appId;
        };
        this.$get = [ "$resource", "$q", function($resource, $q) {
            return new Weather($resource, $q, $$appId);
        } ];
    }
    function Weather($resource, $q, appId) {
        var $$service = this;
        this.$$appId = appId;
        this.API = $resource("https://api.openweathermap.org/data/2.5/weather");
        this.get = function(city, country) {
            var deferred = $q.defer();
            if (!city) {
                deferred.reject("City cannot be null");
                return deferred.promise;
            }
            var params = {
                appId: $$service.$$appId,
                q: city + "," + country,
                mode: "json",
                units: "metric"
            };
            $$service.API.get(params, function(response) {
                deferred.resolve(response);
            }, function(response) {
                deferred.reject(response.data && response.data.message ? response.data.message : "Error getting weather for " + city + ", " + country);
            });
            return deferred.promise;
        };
    }
})();

(function() {
    "use strict";
    WizardStepDoneCtrl.$inject = [ "$scope", "NumberUtils" ];
    angular.module("itaca.components").component("chWizardStepDone", {
        transclude: true,
        require: {
            chWizardStepsDoneContentCtrl: "^chWizardStepsDoneContent"
        },
        bindings: {
            label: "@",
            labelClass: "@",
            onEdit: "&"
        },
        controller: WizardStepDoneCtrl,
        templateUrl: "/tpls/wizard/wizard-step-done.tpl"
    });
    function WizardStepDoneCtrl($scope, NumberUtils) {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.labelClass = ctrl.labelClass || "text-primary";
            ctrl.$$step = {
                label: ctrl.label,
                $uid: NumberUtils.uniqueNumber(),
                $done: true,
                $active: false
            };
            ctrl.chWizardStepsDoneContentCtrl.addStep(ctrl.$$step);
        };
        this.$onDestroy = function() {
            ctrl.chWizardStepsDoneContentCtrl.removeStep(ctrl.$$step);
        };
        this.$edit = function() {
            ctrl.chWizardStepsDoneContentCtrl.editStep(ctrl.$$step);
        };
    }
})();

(function() {
    "use strict";
    WizardStepCtrl.$inject = [ "$scope", "NumberUtils" ];
    angular.module("itaca.components").component("chWizardStep", {
        transclude: true,
        require: {
            chWizardCtrl: "^chWizard"
        },
        bindings: {
            label: "@",
            labelClass: "@",
            activeLabelClass: "@"
        },
        controller: WizardStepCtrl,
        templateUrl: "/tpls/wizard/wizard-step.tpl"
    });
    function WizardStepCtrl($scope, NumberUtils) {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.activeLabelClass = ctrl.activeLabelClass || "text-primary";
            ctrl.$$step = {
                label: ctrl.label,
                $uid: NumberUtils.uniqueNumber()
            };
            ctrl.chWizardCtrl.addStep(ctrl.$$step);
        };
        this.$onDestroy = function() {
            ctrl.chWizardCtrl.removeStep(ctrl.$$step);
        };
    }
})();

(function() {
    "use strict";
    WizardStepsDoneContentCtrl.$inject = [ "$scope" ];
    angular.module("itaca.components").component("chWizardStepsDoneContent", {
        transclude: true,
        require: {
            chWizardCtrl: "^chWizard"
        },
        controller: WizardStepsDoneContentCtrl,
        templateUrl: "/tpls/wizard/wizard-steps-done-content.tpl"
    });
    function WizardStepsDoneContentCtrl($scope) {
        var ctrl = this;
        this.$onInit = function() {};
        this.addStep = function(step) {
            if (!_.isPlainObject(step)) {
                return false;
            }
            ctrl.$$doneSteps = _.isArray(ctrl.$$doneSteps) ? ctrl.$$doneSteps : [];
            step.$active = _.isEmpty(ctrl.$$doneSteps);
            step.$first = _.isEmpty(ctrl.$$doneSteps);
            step.$index = _.size(ctrl.$$doneSteps);
            step.$last = false;
            step.$done = true;
            return ctrl.$$doneSteps.push(step) - 1;
        };
        this.removeStep = function(step) {
            _.pull(ctrl.$$doneSteps, step);
        };
        this.editStep = function(step) {
            ctrl.removeStep(step);
            ctrl.chWizardCtrl.editStep(step);
        };
    }
})();

(function() {
    "use strict";
    WizardCtrl.$inject = [ "$scope", "$timeout", "FormUtils" ];
    angular.module("itaca.components").component("chWizard", {
        transclude: true,
        bindings: {
            direction: "@",
            onForward: "&",
            onBack: "&",
            onConfirm: "&"
        },
        controller: WizardCtrl,
        templateUrl: "/tpls/wizard/wizard.tpl"
    });
    function WizardCtrl($scope, $timeout, FormUtils) {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.direction = ctrl.direction || "vertical";
        };
        this.addStep = function(step) {
            if (!_.isPlainObject(step)) {
                return false;
            }
            ctrl.$$steps = _.isArray(ctrl.$$steps) ? ctrl.$$steps : [];
            step.$first = _.isEmpty(ctrl.$$steps);
            step.$index = _.size(ctrl.$$steps);
            step.$last = false;
            step.$done = false;
            if (step.$first) {
                ctrl.$$currentStep = step;
                step.$stopAnimation = true;
                step.$active = true;
            }
            return ctrl.$$steps.push(step) - 1;
        };
        this.removeStep = function(step) {
            _.pull(ctrl.$$steps, step);
        };
        this.editStep = function(step) {
            return ctrl.$goToStep(step.$index);
        };
        this.$forward = function() {
            var form = $scope.chFormWizardForm;
            form.$setSubmitted();
            if (form.$invalid) {
                FormUtils.focusFirstInvalid(form.$name);
                return false;
            }
            if (ctrl.$goToStep(ctrl.$$currentStep.$index + 1)) {
                ctrl.onForward && ctrl.onForward({
                    $form: form,
                    $step: ctrl.$$currentStep
                });
            }
        };
        this.$back = function() {
            return ctrl.$goToStep(ctrl.$$currentStep.$index - 1);
        };
        this.$confirm = function() {
            var form = $scope.chFormWizardForm;
            form.$setSubmitted();
            if (form.$invalid) {
                FormUtils.focusFirstInvalid(form.$name);
                return false;
            }
            if (ctrl.$$currentStep.$last) {
                ctrl.onConfirm && ctrl.onConfirm({
                    $form: form,
                    $step: ctrl.$$currentStep
                });
            } else {
                ctrl.$forward();
            }
        };
        this.$goToStep = function(index) {
            if (index < 0 || index >= _.size(ctrl.$$steps)) {
                return false;
            }
            _.forEach(ctrl.$$steps, function(step, idx, collection) {
                step.$active = false;
                step.$stopAnimation = false;
                step.$first = idx == 0;
                step.$last = idx == _.size(collection) - 1;
            });
            ctrl.$$currentStep = ctrl.$$steps[index];
            ctrl.$$currentStep.$active = true;
            $timeout(function() {
                ctrl.$$currentStep.$stopAnimation = true;
            }, 1e3);
            return index;
        };
    }
})();

angular.module("itaca.components").run([ "$templateCache", function($templateCache) {
    "use strict";
    $templateCache.put("/tpls/bed-sold-edit/bed-sold-edit.tpl", '<div><ng-form name="bedSoldEditForm"><div layout><div flex><strong><span translate="bed.bed"></span><span translate="bed.{{$ctrl.bedSold.bed.type}}"></span></strong><div class="text-gray-light text-small"><span translate="bed.{{$ctrl.bedSold.bed.type}}.description"></span></div><div class="text-small text-lowercase"><span ng-if="$ctrl.bedSold.bed.adultsPrice"><span>{{$ctrl.bedSold.bed.adultsPrice|chCurrency}}&nbsp;</span><span translate="people.adult"></span><span ng-if="$ctrl.bedSold.bed.boysPrice">,&nbsp;</span></span><span ng-if="$ctrl.bedSold.bed.boysPrice"><span>{{$ctrl.bedSold.bed.boysPrice|chCurrency}}&nbsp;</span><span translate="people.boy"></span><span ng-if="$ctrl.bedSold.bed.childrenPrice">,&nbsp;</span></span><span ng-if="$ctrl.bedSold.bed.childrenPrice"><span>{{$ctrl.bedSold.bed.childrenPrice|chCurrency}}&nbsp;</span><span translate="people.child"></span><span ng-if="$ctrl.bedSold.bed.kidsPrice">,&nbsp;</span></span><span ng-if="$ctrl.bedSold.bed.kidsPrice"><span>{{$ctrl.bedSold.bed.kidsPrice|chCurrency}}&nbsp;</span><span translate="people.kid"></span></span></div><div class="text-gray-light"><small><span><span translate="common.for"></span>&nbsp;{{$ctrl.bedSold.bed.maxPerson}}&nbsp;</span><span ng-if="$ctrl.bedSold.bed.maxPerson > 1" class="text-lowercase" translate="people.people"></span><span ng-if="$ctrl.bedSold.bed.maxPerson == 1" class="text-lowercase" translate="people.person"></span></small></div><div class="text-gray-light"><small><em ng-if="$ctrl.bedSold.bed.frequency == \'LUMP_SUM\'"><span translate="bed.price.question.info"></span><span class="text-lowercase" translate="common.entire.stay"></span></em><em ng-if="$ctrl.bedSold.bed.frequency == \'DAILY\'" translate="bed.price.question.info.and.night"></em></small></div></div><div class="layout-row layout-align-center-end"><div class="layout-column layout-align-center-center"><strong ng-if="$ctrl.$$guestsCount.total > 0 && $ctrl.bedSold.amount" class="md-title"><span ng-if="$ctrl.bedSold.amount.finalAmount > 0">{{$ctrl.bedSold.amount.finalAmount|chCurrency}}</span><span ng-if="$ctrl.bedSold.amount.finalAmount == 0" class="text-success" translate="common.free"></span></strong><span ng-if="$ctrl.$$guestsCount.total <= 0 || !$ctrl.bedSold.amount">-</span><small class="text-mini text-gray-light no-padding-bottom"><span ng-if="$ctrl.nights > 1" translate="reservation.price.for.nights" translate-values="{count: $ctrl.nights}"></span><span ng-if="$ctrl.nights == 1" translate="reservation.price.for.one.night"></span></small></div></div></div><h2 class="md-subhead no-margin-bottom" ng-class="{\'text-center\': !$ctrl.$mdMedia(\'gt-sm\')}"><i translate="bed.sleep.here"></i></h2><div><ch-people-counters name="people" ng-model="$ctrl.bedSold.people" max-people="$ctrl.bedSold.bed.people" min="1" max="$ctrl.bedSold.bed.maxPerson" limits="$ctrl.peopleLimits" age-ranges="$ctrl.peopleAgeRanges" on-change="$ctrl.$onPeopleChange($people)"></ch-people-counters></div><div ng-show="bedSoldEditForm.people.$dirty" ng-messages="bedSoldEditForm.people.$error" class="md-padding no-padding-top text-danger text-small"><div ng-message="min"><span translate="error.bed.no.people"></span></div></div><div ng-if="bedSoldEditForm.people.$valid && $ctrl.$$guestsCount.total == $ctrl.bedSold.bed.maxPerson" class="md-padding no-padding-top"><span class="label label-inline-block bg-info text-wrap text-center" translate="bed.max.person.selected"></span></div><div layout="column" layout-gt-sm="row" layout-padding-sm layout-align="center center"><md-button ng-click="$ctrl.$cancel()" aria-label="Cancel bed edit"><md-icon class="mdi mdi-close md-24"></md-icon><span translate="common.cancel"></span></md-button><md-button class="bg-success text-white" ng-click="$ctrl.$confirm()" ng-disabled="bedSoldEditForm.$invalid" aria-label="Confirm bed edit"><md-icon class="mdi mdi-check md-24 text-white"></md-icon><span translate="common.confirm"></span></md-button></div></ng-form></div>');
    $templateCache.put("/tpls/booking-form/booking-form.tpl", '<ng-form name="bookingForm" novalidate layout="column" layout-padding><div class="md-subhead no-padding-top no-padding-bottom text-gray-light text-center"><strong ng-if="$ctrl.reservation.nights && $ctrl.reservation.rooms.length"><span translate="reservation.summary.your"></span></strong><strong ng-if="$ctrl.reservation.nights && !$ctrl.reservation.rooms.length"><span translate="reservation.summary.search"></span></strong><strong ng-if="!$ctrl.reservation.nights"><span translate="reservation.search.your.room"></span></strong></div><div ng-if="!$ctrl.step || $ctrl.step <= 1" class="no-padding-top no-padding-bottom" layout="column" layout-padding-sm><div flex layout="column"><ch-date-range-picker label="{{\'reservation.when.question\'|translate}}" start-label="{{\'date.checkin\'|translate}}" start-hint-label="{{\'date.checkin.select.alt\'|translate}}" start="$ctrl.reservation.checkin" start-min-date="$ctrl.minDate" start-error-messages="{mindate: (\'error.date.before.today\'|translate)}" end-label="{{\'date.checkout\'|translate}}" end-hint-label="{{\'date.checkout.select.alt\'|translate}}" end="$ctrl.reservation.checkout" end-min-date="$ctrl.$$minEndDate" end-max-date="$ctrl.$$maxEndDate" end-error-messages="{mindate: (\'error.date.end.before.start\'|translate), maxdate: (\'error.reservation.search.maxdate\'|translate)}" max-range="$ctrl.maxRange" diff-label-singular="{{\'common.night\'|translate}}" diff-label-plural="{{\'common.nights\'|translate}}" use-utc="true" disable-body-scroll="false"></ch-date-range-picker></div><md-divider class="no-padding"></md-divider><div flex layout="column"><ch-people-picker label="{{\'reservation.people.question\'|translate}}" people="$ctrl.reservation.people" ng-required="true" has-confirm="true" disable-body-scroll="false" fullscreen="$ctrl.$mdMedia(\'xs\')"></ch-people-picker></div><md-divider></md-divider></div><div ng-if="$ctrl.step > 1" class="no-padding-top no-padding-bottom" layout="column" layout-padding-sm><div flex layout="column"><div layout="column" layout-padding class="text-center"><div class="text-gray-light text-small no-padding-bottom"><span>{{\'reservation.when.question\'|translate}}</span></div><div class="layout layout-wrap layout-align-center-center row-mini text-lowercase no-padding-bottom"><span><span translate="date.from.abbr"></span>&nbsp;<span class="md-subhead"><strong>{{$ctrl.reservation.checkin|utcDate:"shortDate"}}</strong></span>&nbsp;</span><span><span translate="date.to.abbr"></span>&nbsp;<span class="md-subhead"><strong>{{$ctrl.reservation.checkout|utcDate:"shortDate"}}</strong></span></span><span ng-if="$ctrl.reservation.nights" class="text-gray-light text-small no-padding no-margin text-lowercase">&nbsp;(<span>{{$ctrl.reservation.nights}}&nbsp;</span><span ng-show="$ctrl.reservation.nights == 1" translate="common.night"></span><span ng-show="$ctrl.reservation.nights > 1" translate="common.nights"></span>)</span></div></div></div><md-divider class="no-padding"></md-divider><div flex layout="column"><div layout="column" layout-padding class="text-center"><div class="text-gray-light text-small no-padding-bottom"><span translate="reservation.people.question"></span></div><div ng-if="$ctrl.reservation.people" class="md-subhead text-wrap row-mini no-padding-bottom"><strong><ch-people-summary people="$ctrl.reservation.people"></ch-people-summary></strong></div><div ng-if="$ctrl.step == 2 && ($ctrl.$$remainingPeople.adults > 0 || $ctrl.$$remainingPeople.boys > 0 || $ctrl.$$remainingPeople.children > 0 || $ctrl.$$remainingPeople.kids > 0)" class="text-lowercase text-small text-warn"><md-icon class="mdi mdi-alert md-14 text-warn"></md-icon><span translate="reservation.people.unsatisfied"></span>:&nbsp;<strong><ch-people-summary people="$ctrl.$$remainingPeople"></ch-people-summary>&nbsp;<span translate="reservation.people.unsatisfied.to.arrange"></span></strong>.&nbsp;<span class="text-initial" translate="reservation.people.unsatisfied.add.beds.or.rooms"></span>.</div></div></div><md-divider></md-divider></div><div id="booking-summary" class="no-padding-top no-padding-bottom layout-padding-sm" ng-show="$ctrl.reservation.totalAmount.finalAmount && $ctrl.reservation.totalAmount.finalAmount > 0"><div class="text-gray-light text-small text-center"><span translate="reservation.rooms.details"></span>:</div><div><ul class="no-margin-x-sides"><li ng-repeat="room in $ctrl.reservation.rooms"><div class="layout-row layout-padding-sm layout-align-start-center"><small class="flex no-padding-y-sides"><strong>1&nbsp;<span translate="{{room.type.roomType.nameKey}}"></span>&nbsp;<small class="text-uppercase" translate="room.category.{{room.type.category}}"></small></strong><span ng-if="$ctrl.reservation.nights > 1" class="text-lowercase"><span>&nbsp;(x&nbsp;{{$ctrl.reservation.nights}}&nbsp;<span translate="common.nights"></span>)</span></span></small><div class="text-right no-padding-y-sides"><div class="text-gray-light text-small text-striked" ng-if="room.totalRate.amount.initialAmount != room.totalRate.amount.finalAmount"><em>{{room.totalRate.amount.initialAmount|chCurrency}}</em></div><div><span>{{room.totalRate.amount.finalAmount|chCurrency}}</span></div></div></div><ul ng-if="room.services.length" class="no-padding no-margin-right no-margin-bottom no-margin-top"><li ng-if="!serviceSold.included" ng-repeat="serviceSold in room.services" class="layout-row layout-padding-sm layout-align-start-center" ng-class="{\'text-danger\': serviceSold.toRemove}"><small class="flex no-padding-y-sides"><span><span ng-if="serviceSold.count > 1">{{serviceSold.count}}</span><span ng-if="serviceSold.count <= 1">1</span><span>&nbsp;<span translate="{{serviceSold.service.type.nameKey}}"></span></span></span><span ng-if="serviceSold.service.paymentType == \'PER_PERSON\' && ! serviceSold.toRemove">&nbsp;x&nbsp;<ch-people-summary people="serviceSold.people" no-details="true"></ch-people-summary></span><span ng-if="$ctrl.reservation.nights > 1 && serviceSold.service.frequency == \'DAILY\'" class="text-lowercase"><span>&nbsp;(x&nbsp;{{$ctrl.reservation.nights}}<span translate="date.days.abbr"></span>)</span></span></small><span class="text-right no-padding-y-sides"><span ng-if="serviceSold.amount.finalAmount > 0">{{serviceSold.amount.finalAmount|chCurrency}}</span><i ng-if="serviceSold.amount.finalAmount <= 0" translate="common.free"></i></span></li></ul><ul ng-if="room.otherBeds.length" class="flex-100 no-padding no-margin-right no-margin-bottom no-margin-top"><li ng-repeat="bedSold in room.otherBeds" class="layout-row layout-padding-sm layout-align-start-center"><small class="flex no-padding-y-sides"><span>1&nbsp;<span class="text-lowercase" translate="bed.bed"></span>&nbsp;<span translate="{{\'bed.\' + bedSold.bed.type}}"></span></span><span>&nbsp;x&nbsp;<ch-people-summary people="bedSold.people" no-details="true"></ch-people-summary></span><span ng-if="$ctrl.reservation.nights > 1" class="text-lowercase"><span>&nbsp;(x&nbsp;{{$ctrl.reservation.nights}}&nbsp;<span translate="common.nights"></span>)</span></span></small><span class="text-right no-padding-y-sides"><span>{{bedSold.amount.finalAmount|chCurrency}}</span></span></li></ul></li></ul></div><md-divider></md-divider><div class="layout-row layout-wrap layout-padding no-pading-top no-padding-left no-padding-right" ng-if="$ctrl.reservation.totalAmount.finalAmount"><div class="flex no-padding" style="min-width: 125px"><div class="md-headline"><span translate="common.total"></span>&nbsp;</div><div ng-if="$ctrl.currentCurrency != $ctrl.hotelCurrency" class="text-lowercase" style="margin-top:-6px"><small>(<span translate="currency.your.currency"></span>)</small></div></div><div class="text-right no-padding md-headline"><span>{{$ctrl.reservation.totalAmount.finalAmount|chCurrency}}</span><span ng-if="$ctrl.currentCurrency != $ctrl.hotelCurrency">*</span></div></div><div class="layout-row layout-padding no-padding-left no-padding-right no-padding-top" ng-if="$ctrl.reservation.totalAmount.finalAmount && $ctrl.currentCurrency != $ctrl.hotelCurrency"><div class="flex no-padding"><div class="md-subhead"><span translate="common.total"></span>:</div><div class="text-lowercase" style="margin-top:-6px"><small>(<span translate="currency.hotel.currency"></span>)</small></div></div><div class="md-subhead text-right no-padding"><span>{{$ctrl.reservation.totalAmount.finalAmount | chCurrency:$ctrl.hotelCurrency }}</span></div></div><div class="text-gray-light layout-row no-padding" ng-if="$ctrl.reservation.totalAmount.finalAmount && $ctrl.currentCurrency != $ctrl.hotelCurrency"><small class="layout-column layout-margin no-margin"><span class="no-margin"><span translate="currency.info.payment" translate-values="{name: $ctrl.reservation.hotel.name}"></span><span>:&nbsp;{{ 1 | chCurrency:$ctrl.hotelCurrency}} = {{ 1 | chCurrency}}</span></span><span class="no-margin-left no-margin-bottom no-margin-right"><span translate="currency.info.payment2"></span></span></small></div></div><div layout="column" class="no-padding" ng-switch="$ctrl.step"><div ng-switch-default layout="column"><md-button class="md-raised md-primary row-1" ng-disabled="bookingForm.$invalid" ch-click="$ctrl.$search()" aria-label="Check availability"><div layout="column" layout-padding><span translate="reservation.availability.check"></span></div></md-button></div><div ng-switch-when="1" layout="column"><md-button class="md-raised md-primary row-1" ng-disabled="$ctrl.reservation.rooms.length <= 0" ng-click="$ctrl.$next()" aria-label="Book now"><div layout="column" layout-padding><span ng-if="$ctrl.reservation.rooms.length"><span translate="reservation.instant"></span><md-icon class="mdi mdi-chevron-right" ng-class="{\'animated infinite wobble\':$ctrl.reservation.rooms.length}"></md-icon></span><span ng-if="!$ctrl.reservation.rooms.length"><span translate="reservation.rooms.select"></span></span></div></md-button></div><div ng-switch-when="2|3|4" ng-switch-when-separator="|" layout="column"><md-button class="md-raised row-1" ng-class="{\'md-primary\': $ctrl.step == 2, \'bg-success\': $ctrl.step == 3}" ng-click="$ctrl.$next()" aria-label="Book now" ng-switch="$ctrl.step"><div ng-switch-when="2" layout="column" layout-padding><span><span translate="common.last.step"></span><md-icon class="mdi mdi-chevron-right animated infinite wobble"></md-icon></span></div><div ng-switch-when="3" layout="column" layout-padding><div class="text-initial no-padding"><small translate="reservation.text.alright"></small></div><div class="text-uppercase no-padding"><strong translate="reservation.book.now" style="margin-left: 24px"></strong><md-icon class="mdi mdi-chevron-right text-white animated infinite wobble"></md-icon></div><small ng-if="$ctrl.reservation.guest.email" class="ng-binding ng-scope no-padding text-initial text-wrap"><span><span translate="reservation.email.confirm.to"></span>:</span><span>{{$ctrl.reservation.guest.email}}</span></small></div></md-button></div></div><div class="layout-column layout-padding no-padding text-center" ng-if="$ctrl.step <= 1"><span class="no-padding-bottom"><md-icon class="mdi mdi-checkbox-marked-circle-outline text-success md-18"></md-icon>&nbsp;<span class="text-success" translate="common.only.two.min"></span></span></div><div layout="column" class="text-gray-light" ng-if="$ctrl.reservation.nights"><small><span ng-if="$ctrl.reservation.nights == 1" translate="reservation.rates.info.night"></span><span ng-if="$ctrl.reservation.nights > 1" translate="reservation.rates.info.nights" translate-value-count="{{$ctrl.reservation.nights}}"></span></small><small ng-if="$ctrl.roomVatRate"><strong><span translate="common.included"></span>:</strong>&nbsp;{{::$ctrl.roomVatRate}}%&nbsp;<span translate="billing.vat.tax"></span></small><small ng-if="$ctrl.hotelCityTax || $ctrl.reservation.checkinDetails"><strong><span translate="common.included.not"></span>:</strong>&nbsp;<span ng-if="$ctrl.hotelCityTax">{{::($ctrl.hotelCityTax|chCurrency:$ctrl.hotelCurrency)}}&nbsp;<span translate="reservation.cityTax.description"></span></span><span ng-if="$ctrl.reservation.checkinDetails && $ctrl.reservation.checkinDetails.amount.finalAmount"><span ng-if="$ctrl.hotelCityTax">,&nbsp;</span>"{{::($ctrl.reservation.checkinDetails.amount.finalAmount|chCurrency:$ctrl.hotelCurrency)}}&nbsp;<span translate="reservation.checkinDetails.description"></span></span></small></div></ng-form>');
    $templateCache.put("/tpls/cancellation-policy-info/cancellation-policy-info.tpl", '<div><h4 class="{{$ctrl.titleClass}}"><strong><span ng-if="!$ctrl.title" translate="reservation.cancellation.terms.conditions"></span><span ng-if="$ctrl.title" ng-bind="$ctrl.title"></span></strong></h4><div ng-if="!$ctrl.cancellationPolicy"><span translate="reservation.cancellation.room.no.condition"></span></div><div flex ng-if="$ctrl.cancellationPolicy"><div class="layout-column" ng-if="!$ctrl.cancellationPolicy.cancellation.deposit"><div ng-switch="$ctrl.rateType"><div ng-switch-when="STANDARD"><span ng-if="!$ctrl.cancellationPolicy.flexible"><span translate="reservation.cancellation.room.condition.free.label"></span><strong>{{::($ctrl.cancellationPolicy.limitDate|date:"shortDate")}}</strong><span translate="date.time.to" class="text-lowercase"></span><span><strong>{{::($ctrl.cancellationPolicy.limitDate|offsetDate:"HH:mm":$ctrl.offset)}}</strong></span><span>[{{::$ctrl.city}}].</span><span translate="reservation.cancellation.room.condition.free.label2"></span></span><span ng-if="$ctrl.cancellationPolicy.flexible"><span translate="reservation.cancellation.room.condition.flex.label" translate-values="{limit: ($ctrl.cancellationPolicy.limitDate|offsetDate:\'short\':$ctrl.offset) + \' [\' + $ctrl.city + \']\'}"></span></span><span ng-if="$ctrl.cancellationPolicy.cancellation.chargeNights != $ctrl.cancellationPolicy.cancellation.stayNights">{{::$ctrl.cancellationPolicy.cancellation.percentage}}<span ng-if="$ctrl.cancellationPolicy.cancellation.chargeNights == 1"><span translate="reservation.percentage.firstNight"></span>&nbsp;<span translate="common.night" class="text-lowercase"></span></span><span ng-if="$ctrl.cancellationPolicy.cancellation.chargeNights > 1"><span ng-if="$ctrl.cancellationPolicy.cancellation.chargeNights < reservation.nights"><span translate="reservation.percentage.nights"></span>{{::$ctrl.cancellationPolicy.cancellation.chargeNights}}&nbsp;<span translate="common.nights" class="text-lowercase"></span></span><span ng-if="$ctrl.cancellationPolicy.cancellation.chargeNights >= reservation.nights"><span translate="reservation.percentage.total.stay"></span></span></span><span ng-if="$ctrl.cancellationPolicy.cancellation.chargeNights < 0"><span translate="reservation.percentage.total.stay"></span></span></span><span ng-if="$ctrl.cancellationPolicy.cancellation.chargeNights == $ctrl.cancellationPolicy.cancellation.stayNights">{{::$ctrl.cancellationPolicy.cancellation.percentage}}<span translate="reservation.percentage.total.stay"></span></span><span translate="reservation.total.night"></span><strong>{{$ctrl.cancellationPolicy.amount.finalAmount|chCurrency}}</strong>.</div><div ng-switch-when="NOT_REFUNDABLE"><span translate="reservation.cancellation.room.condition.notRef.label"></span><span ng-if="$ctrl.cancellationPolicy.limitDate"><span translate="reservation.cancellation.room.condition.notRef.label2"></span><strong>{{::($ctrl.cancellationPolicy.limitDate|date:"shortDate")}}</strong><span translate="date.time.to" class="text-lowercase"></span><span><strong>{{::($ctrl.cancellationPolicy.limitDate|offsetDate:"HH:mm":$ctrl.offset)}}</strong></span><span>[{{::$ctrl.city}}],</span><span translate="reservation.cancellation.room.condition.notRef.label3"></span><span ng-if="$ctrl.cancellationPolicy.cancellation.chargeNights != $ctrl.cancellationPolicy.cancellation.stayNights">{{::$ctrl.cancellationPolicy.cancellation.percentage}}<span ng-if="$ctrl.cancellationPolicy.cancellation.chargeNights == 1"><span translate="reservation.percentage.firstNight"></span>&nbsp;<span translate="common.night" class="text-lowercase"></span></span><span ng-if="$ctrl.cancellationPolicy.cancellation.chargeNights > 1"><span ng-if="$ctrl.cancellationPolicy.cancellation.chargeNights < reservation.nights"><span translate="reservation.percentage.nights"></span>{{::$ctrl.cancellationPolicy.cancellation.chargeNights}}&nbsp;<span translate="common.nights" class="text-lowercase"></span></span><span ng-if="$ctrl.cancellationPolicy.cancellation.chargeNights >= reservation.nights"><span translate="reservation.percentage.total.stay"></span></span></span><span ng-if="$ctrl.cancellationPolicy.cancellation.chargeNights < 0"><span translate="reservation.percentage.total.stay"></span></span></span><span ng-if="$ctrl.cancellationPolicy.cancellation.chargeNights == $ctrl.cancellationPolicy.cancellation.stayNights">{{::$ctrl.cancellationPolicy.cancellation.percentage}}<span translate="reservation.percentage.total.stay"></span></span><span translate="reservation.total.night"></span><strong>{{$ctrl.cancellationPolicy.amount.finalAmount|chCurrency}}</strong>.</span><span ng-if="!$ctrl.cancellationPolicy.limitDate"><span translate-once="reservation.cancellation.room.condition.notRef.label4"></span><strong>{{room.total$ctrl.cancellationPolicy.amount.finalAmount|chCurrency}}</strong>.</span></div></div></div><div class="layout-column" ng-if="$ctrl.cancellationPolicy.cancellation.deposit"><div class="no-margin-top"><span translate="reservation.room.deposit.label1"></span><span ng-if="$ctrl.cancellationPolicy.cancellation.chargeNights != $ctrl.cancellationPolicy.cancellation.stayNights">{{::$ctrl.cancellationPolicy.cancellation.percentage}}<span ng-if="$ctrl.cancellationPolicy.cancellation.chargeNights == 1"><span translate="reservation.percentage.firstNight"></span>&nbsp;<span translate="common.night" class="text-lowercase"></span></span><span ng-if="$ctrl.cancellationPolicy.cancellation.chargeNights > 1"><span ng-if="$ctrl.cancellationPolicy.cancellation.chargeNights < reservation.nights"><span translate="reservation.percentage.nights"></span>{{::$ctrl.cancellationPolicy.cancellation.chargeNights}}&nbsp;<span translate="common.nights" class="text-lowercase"></span></span><span ng-if="$ctrl.cancellationPolicy.cancellation.chargeNights >= reservation.nights"><span translate="reservation.percentage.total.stay"></span></span></span><span ng-if="$ctrl.cancellationPolicy.cancellation.chargeNights < 0"><span translate="reservation.percentage.total.stay"></span></span></span><span ng-if="$ctrl.cancellationPolicy.cancellation.chargeNights == $ctrl.cancellationPolicy.cancellation.stayNights">{{::$ctrl.cancellationPolicy.cancellation.percentage}}<span translate="reservation.percentage.total.stay"></span></span><span translate="reservation.total.night"></span><strong>{{$ctrl.cancellationPolicy.amount.finalAmount|chCurrency}}</strong>.<span translate="reservation.room.deposit.label2"></span></div></div></div></div>');
    $templateCache.put("/tpls/card/card.tpl", '<div layout-fill class="md-whiteframe-1dp bg-white flex layout-column" ng-click="$ctrl.$goTo()" ng-class="{\'clickable\': !$ctrl.ngDisabled && ($ctrl.url || $ctrl.state || $ctrl.onClick), \'cursor-disabled\': $ctrl.ngDisabled}"><div class="relative"><div ng-if="$ctrl.ngDisabled" class="disabled-box {{$ctrl.disabledClass}}"><span ng-if="$ctrl.disabledLabel" class="disabled-box-bar {{$ctrl.disabledBarClass}}">{{$ctrl.disabledLabel}}</span></div><div class="layout-padding no-padding-right absolute position-right position-top" style="z-index:2"><md-menu class="md-secondary" ng-if="$ctrl.menuItems && !$ctrl.ngDisabled"><md-button aria-label="Open user interactions menu" class="md-icon-button {{$ctrl.menuClass}}" ng-click="$mdMenu.open($event)"><md-icon class="mdi mdi-dots-vertical text-white"></md-icon></md-button><md-menu-content width="4"><div ng-repeat="item in $ctrl.menuItems" ng-if="!item.hide" layout="column"><md-menu-divider ng-if="item.type == \'divider\'"></md-menu-divider><md-menu-item ng-if="item.type != \'divider\'"><md-button ng-click="$ctrl.$menuClick($event, item)" aria-label="{{item.label | translate}}" class="{{item.labelClass}}" ng-disabled="item.disabled"><md-icon class="{{item.icon}} material-icons"></md-icon>&nbsp;<span translate-once="{{item.label}}"></span></md-button></md-menu-item></div></md-menu-content></md-menu><md-menu class="md-secondary" ng-if="$ctrl.disabledMenuItems && $ctrl.ngDisabled"><md-button aria-label="Open user interactions menu" class="md-icon-button {{$ctrl.menuClass}}" ng-click="$mdMenu.open($event)"><md-icon class="mdi mdi-dots-vertical text-white"></md-icon></md-button><md-menu-content width="4"><div ng-repeat="item in $ctrl.disabledMenuItems" ng-if="!item.hide" layout="column"><md-menu-divider ng-if="item.type == \'divider\'"></md-menu-divider><md-menu-item ng-if="item.type != \'divider\'"><md-button ng-click="$ctrl.$menuClick($event, item)" aria-label="{{item.label | translate}}" class="{{item.labelClass}}" ng-disabled="item.disabled"><md-icon class="{{item.icon}} material-icons"></md-icon>&nbsp;<span translate-once="{{item.label}}"></span></md-button></md-menu-item></div></md-menu-content></md-menu></div><div class="flex layout-column layout-align-center-center text-center overflow-hidden card-image" ng-class="{\'md-hover-icon\': !$ctrl.noHover}" ng-style="$ctrl.$$bgStyle"><div ng-if="$ctrl.imgUrl" class="{{$ctrl.imgContClass}}"><img ng-if="$ctrl.imgUrl" ng-src="{{$ctrl.imgUrl}}" class="{{$ctrl.imgClass}}" lazy-image loaded-class="animated fadeIn"></div><div ng-if="!$ctrl.imgUrl && ($ctrl.iconClass || $ctrl.iconSecondaryClass)"><div class="layout-column layout-padding-sm layout-align-center-center"><div ng-if="$ctrl.iconLabel && $ctrl.iconLabelPosition == \'top\'" class="{{$ctrl.iconLabelClass}}">{{$ctrl.iconLabel}}</div><div ng-if="$ctrl.iconSecondaryLabel && $ctrl.iconSecondaryLabelPosition == \'top\'" class="{{$ctrl.iconSecondaryLabelClass}}">{{$ctrl.iconSecondaryLabel}}</div><div><span ng-if="$ctrl.iconLabel && $ctrl.iconLabelPosition == \'left\'" class="{{$ctrl.iconLabelClass}}">{{$ctrl.iconLabel}}</span><span ng-if="$ctrl.iconSecondaryLabel && $ctrl.iconSecondaryLabelPosition == \'left\'" class="{{$ctrl.iconSecondaryLabelClass}}">{{$ctrl.iconSecondaryLabel}}</span><md-icon md-font-set="{{$ctrl.iconFontSet}}" class="{{$ctrl.iconClass}}" ng-class="{\'material-icons\': !$ctrl.iconFontSet}"></md-icon><md-icon ng-if="$ctrl.otherIconClass" md-font-set="{{$ctrl.otherIconFontSet}}" class="{{$ctrl.otherIconClass}}" ng-class="{\'material-icons\': !$ctrl.otherIconFontSet}"></md-icon><span ng-if="$ctrl.iconLabel && $ctrl.iconLabelPosition == \'right\'" class="{{$ctrl.iconLabelClass}}">{{$ctrl.iconLabel}}</span><span ng-if="$ctrl.iconSecondaryLabel && $ctrl.iconSecondaryLabelPosition == \'right\'" class="{{$ctrl.iconSecondaryLabelClass}}">{{$ctrl.iconSecondaryLabel}}</span></div><div ng-if="$ctrl.iconLabel && $ctrl.iconLabelPosition == \'bottom\'" class="{{$ctrl.iconLabelClass}}">{{$ctrl.iconLabel}}</div><div ng-if="$ctrl.iconSecondaryLabel && $ctrl.iconSecondaryLabelPosition == \'bottom\'" class="{{$ctrl.iconSecondaryLabelClass}}">{{$ctrl.iconSecondaryLabel}}</div></div></div><div ng-if="$ctrl.showAvatar && !$ctrl.imgUrl && !$ctrl.iconClass && !i$ctrl.conSecondaryClass && ($ctrl.title || $ctrl.description)" class="layout-row layout-align-center-center {{$ctrl.imgContClass}}"><span class="md-display-3 text-uppercase"><span ng-if="$ctrl.title">{{$ctrl.title.charAt(0)}}</span><span ng-if="!$ctrl.title">{{$ctrl.description.charAt(0)}}</span></span></div></div></div><md-divider></md-divider><div class="md-padding layout-column layout-padding-sm flex {{$ctrl.colorClass}}"><div class="layout-column layout-padding-sm layout-align-center-center"><div class="{{$ctrl.titleClass}} row-mini text-center"><span>{{$ctrl.title}}</span></div><small class="text-center" ng-if="$ctrl.subtitle">{{$ctrl.subtitle}}</small></div><div ng-transclude class="flex layout-column layout-align-center-center card-footer"></div></div></div>');
    $templateCache.put("/tpls/counter/counter.tpl", '<div class="layout-column {{$ctrl.wrapperClass}}" ng-class="{\'flex\': $ctrl.flexible}" ng-style="{\'display\': $ctrl.flexible ? \'inherit\' : \'inline-block\'}" style="min-width: 150px"><div class="{{$ctrl.labelContClass}} layout-padding-sm no-padding"><div ng-if="$ctrl.label && ($ctrl.labelDirection == \'left\' || $ctrl.labelDirection == \'top\')" class="layout-row layout-align-center-center {{$ctrl.labelClass}}"><span ng-bind-html="$ctrl.label"></span></div><div class="layout-row layout-align-center-center flex"><md-button class="{{$ctrl.btnClass}} no-margin" ng-class="!$ctrl.$$decreaseDisabled ? $ctrl.btnActiveClass : \'\'" aria-label="Decrease" ng-disabled="$ctrl.ngDisabled || $ctrl.minusDisabled || ($ctrl.min && $ctrl.count <= $ctrl.min)" ng-click="$ctrl.$decrease($event)"><md-icon class="material-icons mdi mdi-minus md-18 {{$ctrl.iconClass}}" ng-class="!$ctrl.$$decreaseDisabled ? $ctrl.iconActiveClass : \'\'"></md-icon></md-button><div class="layout-column layout-padding layout-align-center-center" ng-class="{\'flex\': $ctrl.flexible, \'text-gray-light\': $ctrl.ngDisabled}"><span class="{{$ctrl.countClass}} border-gray-lighter border-radius">{{$ctrl.count || 0}}</span></div><md-button class="{{$ctrl.btnClass}} no-margin" ng-class="!$ctrl.$$increaseDisabled ? $ctrl.btnActiveClass : \'\'" aria-label="Increase" ng-disabled="$ctrl.ngDisabled || $ctrl.plusDisabled || ($ctrl.max && $ctrl.count >= $ctrl.max)" ng-click="$ctrl.$increase($event)"><md-icon class="material-icons mdi mdi-plus md-18 {{$ctrl.iconClass}}" ng-class="!$ctrl.$$increaseDisabled ? $ctrl.iconActiveClass : \'\'"></md-icon></md-button></div><div ng-if="$ctrl.label && ($ctrl.labelDirection == \'right\' || $ctrl.labelDirection == \'bottom\')" class="layout-row layout-align-center-center {{$ctrl.labelClass}}"><span ng-bind-html="$ctrl.label"></span></div></div><div class="no-padding"><md-input-container md-no-float class="md-block minimal-input no-margin no-padding"><input ng-if="$ctrl.fieldName" type="hidden" name="{{$ctrl.fieldName}}" step="{{$ctrl.step}}" ng-min="$ctrl.min" ng-max="$ctrl.max"><small ng-transclude class="no-padding text-center"></small></md-input-container></div></div>');
    $templateCache.put("/tpls/date-picker/date-picker-trigger.tpl", '<ng-form name="chDatePickerTriggerForm" class="flex no-padding layout-column"><md-button class="ch-date-picker-button flex minimal-button text-lowercase text-center {{$ctrl.buttonClass}}" ng-click="$ctrl.$openPanel($event)" aria-label="Change date" ng-disabled="$ctrl.ngDisabled" ng-readonly="$ctrl.ngReadonly"><div class="{{$ctrl.wrapperClass}} layout-align-center-center" ng-class="$ctrl.labelPosition == \'top\' ? \'layout-column\' : \'layout-row\'"><div ng-if="!$ctrl.hideLabel" class="no-padding row-mini"><small class="row-mini text-initial" ng-bind-html="$ctrl.label"></small></div><div class="layout-row layout-padding-sm layout-align-center-center"><span><md-icon class="mdi mdi-calendar" ng-class="{\'md-32\': $ctrl.size == \'big\', \'md-24\': $ctrl.size == \'medium\', \'md-18\': $ctrl.size == \'small\'}"></md-icon></span><span ng-class="{\'md-display-1\': $ctrl.size == \'big\', \'md-title\': $ctrl.size == \'medium\', \'md-subhead\': $ctrl.size == \'small\'}">{{$ctrl.ngModel|date:"dd"}}</span><span class="layout-column" ng-class="$ctrl.size == \'small\' ? \'text-small row-1\' : \'row-mini\'"><span class="text-lowercase">{{$ctrl.ngModel|date:"MMM"}}</span><span>{{$ctrl.ngModel|date:"yyyy"}}</span></span></div></div><md-input-container class="md-block no-margin"><input type="hidden" style="visibility: hidden" name="date" ng-model="$ctrl.ngModel" ng-required="$ctrl.ngRequired"><div ng-messages="chDatePickerTriggerForm.date.$error" ng-show="chDatePickerTriggerForm.$submitted || chDatePickerTriggerForm.date.$touched || chDatePickerTriggerForm.date.$dirty"><div ng-repeat="errorObj in $ctrl.errorMessages" ng-message="{{errorObj.error}}" class="no-padding"><span ng-if="errorObj.message" ng-bind="{{errorObj.message}}"></span><span ng-if="!errorObj.message && errorObj.messageKey" translate="{{errorObj.messageKey}}" translate-values="errorObj.messageKeyParams"></span></div></div></md-input-container></md-button></ng-form>');
    $templateCache.put("/tpls/date-picker/date-picker.tpl", '<div><div><md-calendar class="no-today-selection" ng-model="$ctrl.data.current" ng-model-options="$ctrl.modelOptions" md-min-date="$ctrl.data.min" md-max-date="$ctrl.data.max"></md-calendar></div><div ng-if="$ctrl.hasConfirm" layout class="no-padding"><div flex></div><md-button class="no-margin-top no-margin-bottom" ng-click="$ctrl.cancel()" aria-label="Cancel"><small translate="common.cancel"></small></md-button><md-button class="md-primary no-margin-top no-margin-bottom" ng-click="$ctrl.confirm()" aria-label="Confirm"><small translate="common.confirm"></small></md-button></div></div>');
    $templateCache.put("/tpls/date-range-picker/date-range-picker-trigger.tpl", '<ng-form name="chDateRangePickerTriggerForm" class="flex no-padding layout-column"><md-button class="ch-date-range-picker-button flex minimal-button text-lowercase text-center {{$ctrl.buttonClass}}" ng-click="$ctrl.$openPanel($event)" aria-label="Change period" ng-disabled="$ctrl.ngDisabled"><div class="{{$ctrl.wrapperClass}}"><div ng-if="$ctrl.label || $ctrl.placeholder" class="layout-row layout-align-center-center" ng-class="{\'no-padding-top\': $ctrl.$mdMedia(\'gt-xs\'), \'md-padding\': !$ctrl.$mdMedia(\'gt-xs\') || $ctrl.start || $ctrl.end}"><div class="{{$ctrl.labelClass}} text-initial text-wrap row-1" ng-class="{\'text-small\': $ctrl.start || $ctrl.end}"><span ng-if="$ctrl.placeholder && !$ctrl.start && !$ctrl.end" ng-bind-html="$ctrl.placeholder"></span><span ng-if="$ctrl.label && (($ctrl.start || $ctrl.end) || !$ctrl.placeholder)" ng-bind-html="$ctrl.label"></span></div></div><div ng-if="!$ctrl.largeTemplate"><div ng-show="$ctrl.start || $ctrl.end" class="layout layout-wrap layout-align-center-center row-mini"><span><span translate="date.from.abbr"></span>&nbsp;<span class="md-subhead"><strong>{{$ctrl.start|date:"shortDate":$ctrl.$$timezone}}</strong></span>&nbsp;</span><span><span translate="date.to.abbr"></span>&nbsp;<span class="md-subhead"><strong>{{$ctrl.end|date:"shortDate":$ctrl.$$timezone}}</strong></span></span><span ng-if="$ctrl.$$diff" class="{{$ctrl.labelClass}} text-small no-padding no-margin text-lowercase">&nbsp;(<span ng-bind="$ctrl.$$diff"></span>&nbsp;<span ng-show="$ctrl.$$diff == 1"><span ng-if="!$ctrl.$$diffLabelSingular" translate="date.day"></span><span ng-if="$ctrl.$$diffLabelSingular" ng-bind="$ctrl.$$diffLabelSingular"></span>)</span><span ng-show="$ctrl.$$diff > 1"><span ng-if="!$ctrl.$$diffLabelPlural" translate="date.days"></span><span ng-if="$ctrl.$$diffLabelPlural" ng-bind="$ctrl.$$diffLabelPlural"></span>)</span></span></div></div><div ng-if="$ctrl.largeTemplate" class="layout-row layout-wrap layout-align-center-center layout-padding-sm"><div class="layout-column layout-padding-sm flex-45 row-1"><span class="no-padding-bottom row-1 text-initial" ng-bind-html="$ctrl.startLabel"></span><div class="layout-align-center-center layout-row"><span><md-icon class="mdi mdi-calendar md-32"></md-icon></span><span ng-if="$ctrl.start" class="md-display-1 layout-padding">{{$ctrl.start|date:"dd":$ctrl.$$timezone}}</span><span ng-if="$ctrl.start" class="layout-column row-mini"><span>{{$ctrl.start|date:"MMM":$ctrl.$$timezone}}</span><span>{{$ctrl.start|date:"yyyy":$ctrl.$$timezone}}</span></span></div></div><div class="layout-column flex text-bold">-</div><div class="layout-column layout-padding-sm flex-45 row-1"><span class="no-padding-bottom row-1 text-initial" ng-bind-html="$ctrl.endLabel"></span><div class="layout-align-center-center layout-row"><span><md-icon class="mdi mdi-calendar md-32"></md-icon></span><span ng-if="$ctrl.end" class="md-display-1 layout-padding">{{$ctrl.end|date:"dd":$ctrl.$$timezone}}</span><span ng-if="$ctrl.end" class="layout-column row-mini"><span>{{$ctrl.end|date:"MMM":$ctrl.$$timezone}}</span><span>{{$ctrl.end|date:"yyyy":$ctrl.$$timezone}}</span></span></div></div><div ng-if="$ctrl.$$diff" class="layout-column flex-100 row-1"><span class="{{$ctrl.labelClass}} text-small no-padding no-margin text-lowercase">&nbsp;(<span ng-bind="$ctrl.$$diff">&nbsp;</span><span ng-show="$ctrl.$$diff == 1"><span ng-if="!$ctrl.$$diffLabelSingular" translate="date.day"></span><span ng-if="$ctrl.$$diffLabelSingular" ng-bind="$ctrl.$$diffLabelSingular"></span>)</span><span ng-show="$ctrl.$$diff > 1"><span ng-if="!$ctrl.$$diffLabelPlural" translate="date.days"></span><span ng-if="$ctrl.$$diffLabelPlural" ng-bind="$ctrl.$$diffLabelPlural"></span>)</span></span></div></div></div></md-button><md-input-container class="md-block no-margin"><input type="hidden" style="visibility: hidden" name="{{$ctrl.startInputName}}" ng-model="$ctrl.start" ng-required="$ctrl.ngRequired"><div ng-messages="chDateRangePickerTriggerForm[$ctrl.startInputName].$error" class="font-12 text-center text-danger" ng-show="chDateRangePickerTriggerForm[$ctrl.startInputName].$dirty || chDateRangePickerTriggerForm[$ctrl.startInputName].$touched"><div ng-repeat="errorObj in $ctrl.startErrorMessages" ng-message="{{errorObj.error}}" class="no-padding"><span ng-if="errorObj.message" ng-bind="{{errorObj.message}}"></span><span ng-if="!errorObj.message && errorObj.messageKey" translate="{{errorObj.messageKey}}" translate-values="errorObj.messageKeyParams"></span></div></div></md-input-container><md-input-container class="md-block no-margin"><input type="hidden" style="visibility: hidden" name="{{$ctrl.endInputName}}" ng-model="$ctrl.end" ng-required="$ctrl.ngRequired"><div ng-messages="chDateRangePickerTriggerForm[$ctrl.endInputName].$error" class="font-12 text-center text-danger" ng-show="!chDateRangePickerTriggerForm[$ctrl.startInputName].$invalid && (chDateRangePickerTriggerForm[$ctrl.endInputName].$dirty || chDateRangePickerTriggerForm[$ctrl.endInputName].$touched)"><div ng-repeat="errorObj in $ctrl.endErrorMessages" ng-message="{{errorObj.error}}" class="no-padding"><span ng-if="errorObj.message" ng-bind="{{errorObj.message}}"></span><span ng-if="!errorObj.message && errorObj.messageKey" translate="{{errorObj.messageKey}}" translate-values="errorObj.messageKeyParams"></span></div></div></md-input-container></ng-form>');
    $templateCache.put("/tpls/date-range-picker/date-range-picker.tpl", '<div ng-switch="$ctrl.currentView"><div class="md-subhead" layout layout-padding><strong><span ng-switch-when="end"><span ng-if="!$ctrl.endTitle"><span translate="date.end.select"></span></span><span ng-if="$ctrl.endTitle" ng-bind-html="$ctrl.endTitle"></span></span><span ng-switch-default><span ng-if="!$ctrl.startTitle"><span translate="date.start.select"></span></span><span ng-if="$ctrl.startTitle" ng-bind-html="$ctrl.startTitle"></span></span></strong><span flex></span><md-button class="md-icon-button" ng-click="$ctrl.cancel()" aria-label="Cancel"><md-icon class="mdi mdi-close md-24"></md-icon><md-tooltip><span translate="common.close"></span></md-tooltip></md-button></div><div class="layout-column layout-align-center-center"><div ng-switch-when="end"><md-calendar class="no-today-selection" ng-model="$ctrl.data.end" ng-model-options="$ctrl.modelOptions" md-min-date="$ctrl.data.endMinDate" md-max-date="$ctrl.data.endMaxDate"></md-calendar></div><div ng-switch-default><md-calendar class="no-today-selection" ng-model="$ctrl.data.start" ng-model-options="$ctrl.modelOptions" md-min-date="$ctrl.data.startMinDate" md-max-date="$ctrl.data.startMaxDate"></md-calendar></div></div><md-divider></md-divider><div layout layout-padding-sm layout-align="center center" class="bg-gray-lighter text-lowercase"><div layout layout-align="start center"><span translate="date.from.abbr"></span>&nbsp;<md-button class="no-margin" ng-class="{\'only-border border-primary\': $ctrl.currentView == \'start\'}" ng-click="$ctrl.currentView = \'start\'" aria-label="Choose start date"><span ng-show="!$ctrl.$$startDate" class="text-gray-light"><md-icon class="mdi mdi-dots-horizontal md-24"></md-icon></span><span ng-show="$ctrl.$$startDate" class="md-subhead"><strong>{{$ctrl.$$startDate|date:"shortDate":$ctrl.timezone}}</strong></span><md-tooltip><span ng-if="!$ctrl.startTitle"><span translate="date.start.select"></span></span><span ng-if="$ctrl.startTitle" ng-bind-html="$ctrl.startTitle"></span></md-tooltip></md-button></div><div layout layout-align="start center"><span translate="date.to.abbr"></span>&nbsp;<md-button class="no-margin" ng-class="{\'only-border border-primary\': $ctrl.currentView == \'end\'}" ng-click="$ctrl.currentView = \'end\'" aria-label="Choose end date"><span ng-show="!$ctrl.$$endDate" class="text-gray-light"><md-icon class="mdi mdi-dots-horizontal md-24"></md-icon></span><span ng-show="$ctrl.$$endDate" class="md-subhead"><strong>{{$ctrl.$$endDate|date:"shortDate":$ctrl.timezone}}</strong></span><md-tooltip><span ng-if="!$ctrl.endTitle"><span translate="date.end.select"></span></span><span ng-if="$ctrl.endTitle" ng-bind-html="$ctrl.endTitle"></span></md-tooltip></md-button><div ng-if="$ctrl.showDiff && $ctrl.data.diff > 0" class="text-gray-light text-small no-padding no-margin text-lowercase">&nbsp;(<span>{{$ctrl.data.diff}}&nbsp;</span><span ng-show="$ctrl.data.diff == 1"><span ng-if="!$ctrl.diffLabelSingular" translate="date.day"></span><span ng-if="$ctrl.diffLabelSingular">{{$ctrl.diffLabelSingular}}</span>)</span><span ng-show="$ctrl.data.diff > 1"><span ng-if="!$ctrl.diffLabelPlural" translate="date.days"></span><span ng-if="$ctrl.diffLabelPlural">{{$ctrl.diffLabelPlural}}</span>)</span></div></div></div></div>');
    $templateCache.put("/tpls/identity-document-edit/identity-document-edit.tpl", '<div><ng-form name="identityDocumentForm"><div ng-class="{\'text-center\': !$ctrl.$mdMedia(\'gt-sm\')}" class="text-gray-light" ng-switch="$ctrl.identityDocument.guestType"><div ng-switch-when="FAMILY_MEMBER" class="bg-success text-white md-button button-small"><md-icon class="mdi mdi-account md-18 text-white"></md-icon><small translate="common.FAMILY_MEMBER"></small></div><div ng-switch-when="GROUP_MEMBER" class="bg-success text-white md-button button-small"><md-icon class="mdi mdi-account md-18 text-white"></md-icon><small translate="common.GROUP_MEMBER"></small></div><div ng-switch-default><md-button ng-class="{\'bg-success\': $ctrl.identityDocument.guestType == \'GROUP_LEADER\'}" class="button-small" ng-click="$ctrl.$setGuestType(\'GROUP_LEADER\')" aria-label="Set as group leader"><md-icon class="mdi mdi-google-circles md-18" ng-class="$ctrl.identityDocument.guestType == \'GROUP_LEADER\' ? \'text-white\' : \'text-success\'"></md-icon><small translate="common.GROUP_LEADER" ng-class="$ctrl.identityDocument.guestType == \'GROUP_LEADER\' ? \'text-white\' : \'text-success\'"></small></md-button><md-button ng-class="{\'bg-success\': $ctrl.identityDocument.guestType == \'HOUSEHOLDER\'}" class="button-small" ng-click="$ctrl.$setGuestType(\'HOUSEHOLDER\')" aria-label="Set as householder"><md-icon class="mdi mdi-account-multiple md-18" ng-class="$ctrl.identityDocument.guestType == \'HOUSEHOLDER\' ? \'text-white\' : \'text-success\'"></md-icon><small translate="common.HOUSEHOLDER" ng-class="$ctrl.identityDocument.guestType == \'HOUSEHOLDER\' ? \'text-white\' : \'text-success\'"></small></md-button><md-button ng-class="{\'bg-success\': $ctrl.identityDocument.guestType == \'SINGLE_GUEST\'}" class="button-small" ng-click="$ctrl.$setGuestType(\'SINGLE_GUEST\')" aria-label="Set as single guest"><md-icon class="mdi mdi-account md-18" ng-class="$ctrl.identityDocument.guestType == \'SINGLE_GUEST\' ? \'text-white\' : \'text-success\'"></md-icon><small translate="common.SINGLE_GUEST" ng-class="$ctrl.identityDocument.guestType == \'SINGLE_GUEST\' ? \'text-white\' : \'text-success\'"></small></md-button></div></div><div><div class="layout-row layout-wrap layout-padding"><div class="flex-xs-100 flex-sm-50 flex-gt-sm-50 flex-gt-md-20"><md-input-container class="md-block no-margin-bottom"><label translate="common.name"></label><input type="text" ng-model="$ctrl.identityDocument.name" name="name" required><div ng-messages="identityDocumentForm.name.$error"><div ng-message="required"><span translate="error.required"></span></div></div></md-input-container></div><div class="flex-xs-100 flex-sm-50 flex-gt-sm-50 flex-gt-md-20"><md-input-container class="md-block no-margin-bottom"><label translate="common.surname"></label><input type="text" ng-model="$ctrl.identityDocument.surname" name="surname" required><div ng-messages="identityDocumentForm.surname.$error"><div ng-message="required"><span translate="error.required"></span></div></div></md-input-container></div><div class="flex-xs-100 flex-sm-50 flex-gt-sm-33 flex-gt-md-20"><md-input-container class="md-block no-margin-bottom"><label translate="common.birthdate"></label><md-datepicker name="birthdate" ng-model="$ctrl.identityDocument.birthDate" utc-date md-datepicker-on-click md-open-on-focus md-hide-icons="calendar" md-max-date="$ctrl.$$maxDate" required></md-datepicker><div ng-messages="identityDocumentForm.birthdate.$error"><div ng-message="maxdate"><span translate="reservation.text.identityDocuments.legalAge"></span></div><div ng-message="required"><span translate="error.required"></span></div></div></md-input-container></div><div class="flex-xs-100 flex-sm-50 flex-gt-sm-33 flex-gt-md-20"><md-input-container class="md-block no-margin-bottom"><label translate="common.birthplace"></label><input type="text" ng-model="$ctrl.identityDocument.birthPlace" name="birtplace"></md-input-container></div><div class="flex-xs-100 flex-sm-50 flex-gt-sm-33 flex-gt-md-20"><md-input-container class="md-block no-margin-bottom"><label translate="common.nationality"></label><input type="text" ng-model="$ctrl.identityDocument.nationality" name="nationality"></md-input-container></div></div><div class="layout-row layout-wrap layout-padding" ng-if="$ctrl.identityDocument.guestType != \'GROUP_MEMBER\' && $ctrl.identityDocument.guestType != \'FAMILY_MEMBER\'"><div class="flex-xs-100 flex-sm-50 flex-gt-sm-33 flex-gt-md-20"><md-input-container class="md-block no-margin-bottom"><label translate="common.document.type"></label><md-select ng-model="$ctrl.identityDocument.type" aria-label="type" name="type"><md-option value="PASSPORT"><span translate="common.PASSPORT"></span></md-option><md-option value="DRIVING_LICENSE"><span translate="common.DRIVING_LICENSE"></span></md-option><md-option value="IDENTITY_CARD"><span translate="common.IDENTITY_CARD"></span></md-option></md-select></md-input-container></div><div class="flex-xs-100 flex-sm-50 flex-gt-sm-33 flex-gt-md-20"><md-input-container class="md-block no-margin-bottom"><label translate="common.document.number"></label><input type="text" ng-model="$ctrl.identityDocument.number" name="number"></md-input-container></div><div class="flex-xs-100 flex-sm-50 flex-gt-sm-33 flex-gt-md-20"><md-input-container class="md-block no-margin-bottom"><label translate="common.document.expirationDate"></label><md-datepicker name="expirationDate" ng-model="$ctrl.identityDocument.expirationDate" utc-date md-datepicker-on-click md-open-on-focus md-hide-icons="calendar" md-min-date="$ctrl.$$today"></md-datepicker><div ng-messages="identityDocumentForm.expirationDate.$error"><div ng-message="mindate"><span translate="error.date.before.today"></span></div></div></md-input-container></div><div class="flex-xs-100 flex-sm-50 flex-gt-sm-50 flex-gt-md-20"><md-input-container class="md-block no-margin-bottom"><label translate="common.place.issuer"></label><input type="text" ng-model="$ctrl.identityDocument.issuer" name="issuer"></md-input-container></div><div class="flex-xs-100 flex-sm-50 flex-gt-sm-50 flex-gt-md-20"><md-input-container class="md-block no-margin-bottom"><label translate="common.citizenship"></label><input type="text" ng-model="$ctrl.identityDocument.citizenship" name="citizenship"></md-input-container></div></div></div><div layout="column" layout-gt-sm="row" layout-padding-sm layout-align="center center"><md-button ng-click="$ctrl.$cancel()" aria-label="Cancel identity document edit"><md-icon class="mdi mdi-close md-24"></md-icon><span translate="common.cancel"></span></md-button><md-button class="bg-success text-white" ng-click="$ctrl.$confirm()" ng-disabled="identityDocumentForm.$invalid" aria-label="Confirm identity document edit"><md-icon class="mdi mdi-check md-24 text-white"></md-icon><span translate="common.confirm"></span></md-button></div></ng-form></div>');
    $templateCache.put("/tpls/invoice/invoice.tpl", '<table border="1" class="ch-table ch-table-padding align-center"><thead><tr><th width="10%" class="bg-gray-lighter text-center"><strong translate="order.item.code.abbr">Cod. articolo</strong></th><th width="30%" class="bg-gray-lighter text-center"><strong translate="common.description">Descrizione</strong></th><th width="10%" class="bg-gray-lighter text-center"><strong translate="common.quantity.abbr">Quantità</strong></th><th width="20%" class="bg-gray-lighter text-center"><strong translate="common.price.unit">Prezzo unitario</strong></th><th width="20%" class="bg-gray-lighter text-center"><strong translate="common.amount">Importo</strong></th><th width="10%" class="bg-gray-lighter text-center"><strong><span translate="common.vat.alt">IVA</span>&nbsp;(%)</strong></th></tr></thead><tfoot><tr><td colspan="4" class="no-border-bottom text-right"><span translate="common.taxable">Imponibile</span></td><td class="text-right"><span ng-if="$ctrl.invoice.order.amount != null && $ctrl.invoice.order.amount.finalAmount != null"><span ng-if="$ctrl.invoice.order.amount.vatAmount != null">{{($ctrl.invoice.order.amount.finalAmount - $ctrl.invoice.order.amount.vatAmount)|chCurrency}}</span><span ng-if="$ctrl.invoice.order.amount.vatAmount == null">{{($ctrl.invoice.order.amount.finalAmount)|chCurrency}}</span></span><span ng-if="$ctrl.invoice.order.amount == null || $ctrl.invoice.order.amount.finalAmount == null">{{0|chCurrency}}</span></td><td class="no-border-bottom">&nbsp;</td></tr><tr><td colspan="4" class="no-border-bottom no-border-top text-right"><span translate="common.vat.alt">IVA</span></td><td class="text-right"><span ng-if="$ctrl.invoice.order.amount != null && $ctrl.invoice.order.amount.vatAmount != null">{{$ctrl.invoice.order.amount.vatAmount|chCurrency}}</span><span ng-if="$ctrl.invoice.order.amount == null || $ctrl.invoice.order.amount.vatAmount == null">{{0|chCurrency}}</span></td><td class="no-border-top no-border-bottom">&nbsp;</td></tr><tr><td colspan="4" class="no-border-top text-uppercase text-right"><strong translate="billing.invoice.price.total">TOTALE FATTURA</strong></td><td class="bg-gray-lighter text-right"><strong ng-if="$ctrl.invoice.order.amount != null && $ctrl.invoice.order.amount.finalAmount != null">{{$ctrl.invoice.order.amount.finalAmount|chCurrency}}</strong><strong ng-if="$ctrl.invoice.order.amount == null || $ctrl.invoice.order.amount.finalAmount == null">{{0|chCurrency}}</strong></td><td class="no-border-top">&nbsp;</td></tr></tfoot><tbody><tr ng-repeat="productSold in $ctrl.invoice.order.products track by $index"><td><span translate="productSold.product.serial"></span></td><td class="text-left"><span translate="productSold.product.name"></span><div ng-if="productSold.product.type == \'FREE_LOAN\'" class="text-gray-light"><small>(<span translate="common.freeloan"></span>)</small></div></td><td><span translate="productSold.counter.actual"></span></td><td><span ng-if="productSold.product.amount != null && productSold.product.amount.finalAmount != null">{{productSold.product.amount.finalAmount|chCurrency}}</span><span ng-if="productSold.product.amount == null || productSold.product.amount.finalAmount == null">{{0|chCurrency}}</span></td><td><span ng-if="productSold.amount != null && productSold.amount.finalAmount != null">{{productSold.amount.finalAmount|chCurrency}}</span><span ng-if="productSold.amount == null || productSold.amount.finalAmount == null">{{0|chCurrency}}</span></td><td><span ng-if="productSold.amount != null && productSold.amount.vatRate != null" translate="productSold.amount.vatRate"></span><span ng-if="productSold.amount == null || productSold.amount.vatRate == null">-</span></td></tr><tr ng-repeat="i in [] | range: (15 - $ctrl.invoice.order.products.length)"><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr></tbody></table>');
    $templateCache.put("/tpls/no-show-policy-info/no-show-policy-info.tpl", '<div><h4 class="{{$ctrl.titleClass}}"><strong><span ng-if="!$ctrl.title" translate="reservation.noshow.terms.conditions"></span><span ng-if="$ctrl.title" ng-bind="$ctrl.title"></span></strong></h4><div ng-if="!$ctrl.noShowPolicy"><span translate="reservation.cancellation.room.no.condition"></span></div><div flex ng-if="$ctrl.noShowPolicy"><div><span translate="reservation.noshow.room.conditions"></span><span ng-if="$ctrl.noShowPolicy.cancellation.chargeNights != $ctrl.noShowPolicy.cancellation.stayNights">{{::$ctrl.noShowPolicy.cancellation.percentage}}<span ng-if="$ctrl.noShowPolicy.cancellation.chargeNights == 1"><span translate="reservation.percentage.firstNight"></span><span translate="common.night" class="text-lowercase"></span></span><span ng-if="$ctrl.noShowPolicy.cancellation.chargeNights > 1"><span ng-if="$ctrl.noShowPolicy.cancellation.chargeNights < reservation.nights"><span translate="reservation.percentage.nights"></span>{{::$ctrl.noShowPolicy.cancellation.chargeNights}}&nbsp;<span translate="common.nights" class="text-lowercase"></span></span><span ng-if="$ctrl.noShowPolicy.cancellation.chargeNights >= reservation.nights"><span translate="reservation.percentage.total.stay"></span></span></span><span ng-if="$ctrl.noShowPolicy.cancellation.chargeNights < 0"><span translate="reservation.percentage.total.stay"></span></span></span><span ng-if="$ctrl.noShowPolicy.cancellation.chargeNights == $ctrl.noShowPolicy.cancellation.stayNights">{{::$ctrl.noShowPolicy.cancellation.percentage}}<span translate="reservation.percentage.total.stay"></span></span><span translate="reservation.total.night"></span><strong>{{$ctrl.noShowPolicy.amount.finalAmount|chCurrency}}</strong>.</div></div></div>');
    $templateCache.put("/tpls/password-input/password-input.tpl", '<ng-form name="chPasswordInputForm" flex><md-input-container class="{{$ctrl.containerClass}} no-padding-right" ng-class="{\'no-padding-left\': !$ctrl.iconClass, \'md-icon-left\': $ctrl.iconClass, \'md-icon-right\': $ctrl.showIconClass || $ctrl.hideIconClass}"><label><span ng-if="$ctrl.inputLabel" ng-bind="$ctrl.inputLabel"></span><span ng-if="!$ctrl.inputLabel" translate="login.password"></span></label><md-icon ng-if="$ctrl.iconClass" class="{{$ctrl.iconClass}}"></md-icon><input type="{{$ctrl.$$showPwd ? \'text\' : \'password\'}}" name="{{$ctrl.inputName}}" ng-model="$ctrl.ngModel" ng-required="$ctrl.ngRequired" ng-disabled="$ctrl.ngDisabled" ng-readonly="$ctrl.ngReadonly" style="padding-right: 30px"><md-icon class="clickable" ng-class="$ctrl.$$showPwd ? $ctrl.hideIconClass : $ctrl.showIconClass" ng-click="$ctrl.$$showPwd = !$ctrl.$$showPwd" aria-label="Show/Hide password" tabindex="-1"><md-tooltip><span ng-show="$ctrl.$$showPwd" translate="common.hide"></span><span ng-show="!$ctrl.$$showPwd" translate="common.show"></span></md-tooltip></md-icon><div ng-messages="chPasswordInputForm[$ctrl.inputName].$error"><div ng-repeat="errorObj in $ctrl.errorMessages" ng-message="{{errorObj.error}}"><span ng-if="errorObj.message" ng-bind="{{errorObj.message}}"></span><span ng-if="!errorObj.message && errorObj.messageKey" translate="{{errorObj.messageKey}}" translate-values="errorObj.messageKeyParams"></span></div></div></md-input-container></ng-form>');
    $templateCache.put("/tpls/payment-option/payment-option.tpl", '<span><span ng-if="!$ctrl.paymentOption.amount.finalAmount"><span translate="common.free"></span></span><span ng-if="$ctrl.paymentOption.amount.finalAmount"><span>{{$ctrl.paymentOption.amount|chAmount}}</span>&nbsp;<span ng-switch="$ctrl.paymentOption.frequency"><span ng-switch-when="DAILY">/<span ng-if="$ctrl.frequencyLabel" ng-bind-html="$ctrl.frequencyLabel"></span><span ng-if="!$ctrl.frequencyLabel" translate="date.day"></span></span><span ng-switch-when="NIGHTLY">/<span ng-if="$ctrl.frequencyLabel" ng-bind-html="$ctrl.frequencyLabel"></span><span ng-if="!$ctrl.frequencyLabel" translate="common.night"></span></span><span ng-switch-when="MONTHLY">/<span ng-if="$ctrl.frequencyLabel" ng-bind-html="$ctrl.frequencyLabel"></span><span ng-if="!$ctrl.frequencyLabel" translate="date.month"></span></span><span ng-switch-when="YEARLY">/<span ng-if="$ctrl.frequencyLabel" ng-bind-html="$ctrl.frequencyLabel"></span><span ng-if="!$ctrl.frequencyLabel" translate="date.year"></span></span><span ng-switch-default></span></span><span ng-switch="$ctrl.paymentOption.size"><span ng-switch-when="PER_ADULT">/<span ng-if="$ctrl.sizeLabel" ng-bind-html="$ctrl.sizeLabel"></span><span ng-if="!$ctrl.sizeLabel" translate="people.adult"></span></span><span ng-switch-when="PER_BOY">/<span ng-if="$ctrl.sizeLabel" ng-bind-html="$ctrl.sizeLabel"></span><span ng-if="!$ctrl.sizeLabel" translate="people.boy"></span></span><span ng-switch-when="PER_CHILD">/<span ng-if="$ctrl.sizeLabel" ng-bind-html="$ctrl.sizeLabel"></span><span ng-if="!$ctrl.sizeLabel" translate="people.child"></span></span><span ng-switch-when="PER_KID">/<span ng-if="$ctrl.sizeLabel" ng-bind-html="$ctrl.sizeLabel"></span><span ng-if="!$ctrl.sizeLabel" translate="people.kid"></span></span><span ng-switch-default></span></span></span></span>');
    $templateCache.put("/tpls/payment-policy-info/payment-policy-info.tpl", '<div><h4 class="{{$ctrl.titleClass}}"><strong><span ng-if="!$ctrl.title" translate="common.payment"></span><span ng-if="$ctrl.title" ng-bind="$ctrl.title"></span></strong></h4><div ng-if="!$ctrl.cancellationPolicy"><span translate="reservation.payment.room.policy.free.label"></span><span translate="reservation.payment.room.policy.free.label2"></span></div><div flex ng-if="$ctrl.cancellationPolicy"><div ng-if="!$ctrl.cancellationPolicy.cancellation.deposit"><div ng-if="$ctrl.rateType == \'STANDARD\' && !$ctrl.cancellationPolicy.flexible"><span translate="reservation.payment.room.policy.free.label"></span><span translate="reservation.payment.room.policy.free.label2"></span><span translate="reservation.payment.room.policy.free.label3"></span></div><div ng-if="$ctrl.rateType == \'NOT_REFUNDABLE\' || $ctrl.cancellationPolicy.flexible"><span translate="reservation.payment.room.policy.notRef.label"></span><span ng-if="$ctrl.cancellationPolicy.cancellation.chargeNights != $ctrl.cancellationPolicy.cancellation.stayNights">{{::$ctrl.cancellationPolicy.cancellation.percentage}}<span ng-if="$ctrl.cancellationPolicy.cancellation.chargeNights == 1"><span translate="reservation.percentage.firstNight"></span>&nbsp;<span translate="common.night" class="text-lowercase"></span></span><span ng-if="$ctrl.cancellationPolicy.cancellation.chargeNights > 1"><span ng-if="$ctrl.cancellationPolicy.cancellation.chargeNights < reservation.nights"><span translate="reservation.percentage.nights"></span>{{::$ctrl.cancellationPolicy.cancellation.chargeNights}}&nbsp;<span translate="common.nights" class="text-lowercase"></span></span><span ng-if="$ctrl.cancellationPolicy.cancellation.chargeNights >= reservation.nights"><span translate="reservation.percentage.total.stay"></span></span></span><span ng-if="$ctrl.cancellationPolicy.cancellation.chargeNights < 0"><span translate="reservation.percentage.total.stay"></span></span></span><span ng-if="$ctrl.cancellationPolicy.cancellation.chargeNights == $ctrl.cancellationPolicy.cancellation.stayNights">{{::$ctrl.cancellationPolicy.cancellation.percentage}}<span translate="reservation.percentage.total.stay"></span></span><span translate="reservation.total.night"></span><strong>{{$ctrl.cancellationPolicy.amount.finalAmount|chCurrency}}</strong><br><span ng-if="!$ctrl.cancellationPolicy.limitDate || $ctrl.cancellationPolicy.flexible" translate="reservation.payment.room.policy.notRef.label2"></span><span ng-if="$ctrl.cancellationPolicy.limitDate && !$ctrl.cancellationPolicy.flexible"><span translate="reservation.payment.room.policy.notRef.label2.bis"></span><strong>{{::($ctrl.cancellationPolicy.limitDate|date:"shortDate")}}</strong><span translate="date.time.to" class="text-lowercase"></span><span><strong>{{::($ctrl.cancellationPolicy.limitDate|offsetDate:"HH:mm":$ctrl.offset)}}</strong></span><span>[{{::$ctrl.city}}].</span></span></div></div><div class="layout-column" ng-if="$ctrl.cancellationPolicy.cancellation.deposit"><span class="no-margin-top"><span translate="reservation.payment.room.policy.deposit.label"></span><span ng-if="$ctrl.cancellationPolicy.cancellation.chargeNights != $ctrl.cancellationPolicy.cancellation.stayNights">{{::$ctrl.cancellationPolicy.cancellation.percentage}}<span ng-if="$ctrl.cancellationPolicy.cancellation.chargeNights == 1"><span translate="reservation.percentage.firstNight"></span>&nbsp;<span translate="common.night" class="text-lowercase"></span></span><span ng-if="$ctrl.cancellationPolicy.cancellation.chargeNights > 1"><span ng-if="$ctrl.cancellationPolicy.cancellation.chargeNights < reservation.nights"><span translate="reservation.percentage.nights"></span>{{::$ctrl.cancellationPolicy.cancellation.chargeNights}}&nbsp;<span translate="common.nights" class="text-lowercase"></span></span><span ng-if="$ctrl.cancellationPolicy.cancellation.chargeNights >= reservation.nights"><span translate="reservation.percentage.total.stay"></span></span></span><span ng-if="$ctrl.cancellationPolicy.cancellation.chargeNights < 0"><span translate="reservation.percentage.total.stay"></span></span></span><span ng-if="$ctrl.cancellationPolicy.cancellation.chargeNights == $ctrl.cancellationPolicy.cancellation.stayNights">{{::$ctrl.cancellationPolicy.cancellation.percentage}}<span translate="reservation.percentage.total.stay"></span></span><span translate="reservation.total.night"></span><strong>{{$ctrl.cancellationPolicy.amount.finalAmount|chCurrency}}</strong><span translate="reservation.payment.room.policy.notRef.label2"></span></span></div></div></div>');
    $templateCache.put("/tpls/people-counters/people-counters.tpl", '<div class="layout layout-wrap layout-align-center-center"><div class="flex layout-column layout-align-center-center"><ch-counter label="{{$ctrl.$$adultsHint}}" count-class="bg-white only-border" ng-model="$ctrl.people.adults" min="$ctrl.$$peopleLimits.adults.min" max="$ctrl.$$peopleLimits.adults.max"></ch-counter></div><div class="flex layout-column layout-align-center-center"><ch-counter label="{{$ctrl.$$boysHint}}" count-class="bg-white only-border" ng-model="$ctrl.people.boys" min="$ctrl.$$peopleLimits.boys.min" max="$ctrl.$$peopleLimits.boys.max"></ch-counter></div><div class="flex layout-column layout-align-center-center"><ch-counter label="{{$ctrl.$$childrenHints}}" count-class="bg-white only-border" ng-model="$ctrl.people.children" min="$ctrl.$$peopleLimits.children.min" max="$ctrl.$$peopleLimits.children.max"></ch-counter></div><div class="flex layout-column layout-align-center-center layout-padding"><ch-counter label="{{$ctrl.$$kidsHints}}" count-class="bg-white only-border" ng-model="$ctrl.people.kids" min="$ctrl.$$peopleLimits.kids.min" max="$ctrl.$$peopleLimits.kids.max"></ch-counter></div></div>');
    $templateCache.put("/tpls/ratesheet/ratesheet-availability.tpl", '<div flex layout="column"><div ng-if="$ctrl.availability.hotelClosed" layout layout-align="center center" flex><md-button class="md-icon-button no-margin no-padding auto-height cursor-help" tabindex="-1" aria-label="Availability"><md-icon class="mdi mdi-lock md-18"></md-icon><md-tooltip><span translate="hotel.closed"></span></md-tooltip></md-button></div><div ng-if="!$ctrl.availability.hotelClosed" flex layout="column"><md-button ng-disabled="$ctrl.availability.pastDate" tabindex="-1" aria-label="Availability" ng-click="$ctrl.$click($event)" class="no-margin row-1 forced" ng-class="{\'minimal-button\': !$ctrl.$mdMedia(\'gt-xs\'),\n' + "\t\t\t\t'bg-success': $ctrl.availability.counter.actual > 0 && !$ctrl.availability.hotelClosed && !$ctrl.availability.roomClosed, \n" + "\t\t\t\t'bg-danger': $ctrl.availability.roomClosed, \n" + "\t\t\t\t'bg-gray-base text-white': $ctrl.availability.counter.actual < 0 && !$ctrl.availability.hotelClosed && !$ctrl.availability.roomClosed, \n" + '\t\t\t\t\'bg-warn\': $ctrl.availability.counter.actual == 0 && !$ctrl.availability.hotelClosed && !$ctrl.availability.roomClosed}"><div layout layout-wrap layout-align="center center" class="md-margin" ng-class="{\'text-small\': $ctrl.$mdMedia(\'xs\')}"><div ng-if="$ctrl.availability.counter.actual > 0"><strong>{{$ctrl.availability.counter.actual}}</strong><small>/{{$ctrl.availability.counter.total}}</small></div><div ng-if="$ctrl.availability.counter.actual == 0"><md-icon class="mdi mdi-calendar-remove md-18 text-white"></md-icon></div><div ng-if="$ctrl.availability.counter.actual < 0"><md-icon class="mdi mdi-block-helper md-18 text-white"></md-icon></div></div><md-tooltip><div ng-if="$ctrl.availability.counter.actual > 0"><span ng-if="!$ctrl.availability.pastDate" translate="ratesheet.availability.edit">Edit availability</span><span ng-if="$ctrl.availability.pastDate && $ctrl.availability.counter.actual == 1" translate="ratesheet.availability.rooms.one"></span><span ng-if="$ctrl.availability.pastDate && $ctrl.availability.counter.actual > 1" translate="ratesheet.availability.rooms" translate-values="{count: $ctrl.availability.counter.actual}"></span></div><div ng-if="$ctrl.availability.counter.actual == 0"><span translate="hotel.availability.none"></span></div><div ng-if="$ctrl.availability.counter.actual < 0"><span ng-if="$ctrl.availability.counter.actual == -1" translate="ratesheet.overbooking.rooms.one"></span><span ng-if="$ctrl.availability.counter.actual < -1" translate="ratesheet.overbooking.rooms" translate-values="{count: ($ctrl.availability.counter.actual|abs)}"></span></div></md-tooltip></md-button></div></div>');
    $templateCache.put("/tpls/ratesheet/ratesheet-header.tpl", '<div flex layout="column"><div ng-if="$ctrl.header.hotelClosed" layout layout-align="center center" flex><md-button class="md-icon-button no-margin no-padding auto-height cursor-help" tabindex="-1" aria-label="Availability"><md-icon class="mdi mdi-lock md-18"></md-icon><md-tooltip><span translate="hotel.closed"></span></md-tooltip></md-button></div><div ng-if="!$ctrl.header.hotelClosed" flex layout="column"><md-button ng-disabled="$ctrl.header.pastDate || $ctrl.header.availability.actual <= 0" ng-click="$ctrl.$toggleRoomTypeClosing($event)" aria-label="Enable/Disable all room rates" tabindex="-1" class="no-margin row-1 forced" ng-class="{\'minimal-button\': !$ctrl.$mdMedia(\'gt-xs\'), \n' + "\t\t\t\t'bg-success': !$ctrl.header.roomClosed && $ctrl.header.availability.actual > 0, \n" + "\t\t\t\t'bg-danger': $ctrl.header.roomClosed, \n" + "\t\t\t\t'bg-warn': !$ctrl.header.roomClosed && $ctrl.header.availability.actual == 0, \n" + '\t\t\t\t\'bg-gray-base text-white\': !$ctrl.header.roomClosed && $ctrl.header.availability.actual < 0}"><div class="text-small" ng-if="$ctrl.header.roomClosed"><strong hide-xs translate="common.closed.female"></strong><span hide show-xs><md-icon class="mdi mdi-lock md-24 text-white"></md-icon></span><md-tooltip><span translate="ratesheet.rate.room.open"></span></md-tooltip></div><div class="text-small" ng-if="!$ctrl.header.roomClosed"><strong><span ng-if="$ctrl.header.availability.actual > 0"><span hide-xs translate="common.opened.female"></span><span hide show-xs><md-icon class="mdi mdi-lock-open md-24 text-white"></md-icon></span></span><span ng-if="$ctrl.header.availability.actual == 0"><span hide-xs translate="hotel.availability.none.abbr"></span><span hide show-xs><md-icon class="mdi mdi-close md-24 text-white"></md-icon></span></span><span ng-if="$ctrl.header.availability.actual < 0"><span hide-xs translate="ratesheet.overbooking"></span><span hide show-xs><md-icon class="mdi mdi-block-helper md-24 text-white"></md-icon></span></span></strong><md-tooltip><span ng-if="$ctrl.header.availability.actual > 0" translate="ratesheet.rate.room.close"></span><span ng-if="$ctrl.header.availability.actual == 0" translate="hotel.availability.none"></span><span ng-if="$ctrl.header.availability.actual < 0" translate="ratesheet.overbooking"></span></md-tooltip></div></md-button></div></div>');
    $templateCache.put("/tpls/ratesheet/ratesheet-promotion-edit.tpl", '<ng-form name="chRatesheetPromotionForm" flex layout="column"><div ng-if="$ctrl.promotion.hotelClosed" layout layout-align="center center" flex><md-button aria-label="Closed" class="md-icon-button no-margin no-padding auto-height cursor-help" tabindex="-1"><md-icon class="mdi mdi-lock md-18"></md-icon><md-tooltip><span translate="hotel.closed"></span></md-tooltip></md-button></div><div ng-if="!$ctrl.promotion.valid && !$ctrl.promotion.hotelClosed" layout layout-align="center center" flex><md-icon class="mdi mdi-block-helper md-18"></md-icon></div><div ng-if="$ctrl.promotion.valid && !$ctrl.promotion.hotelClosed"><div ng-switch="$ctrl.type" layout="column" layout-align="center center"><div ng-switch-when="MINIMUM_STAY"><md-input-container flex class="no-margin-bottom minimal-input"><label><span translate="common.nights"></span></label><input value="{{$ctrl.promotion.minStay}}" class="text-center" disabled="disabled" readonly="readonly"></md-input-container></div><div ng-switch-default><md-input-container flex class="no-margin-bottom minimal-input"><label><span translate="common.nights"></span></label><input type="number" class="text-center" name="minStay" ng-model="$ctrl.promotion.minStay" ng-disabled="$ctrl.promotion.pastDate || $ctrl.promotion.roomClosed || !$ctrl.promotion.enabled" min="0" step="1" ng-blur="$ctrl.$saveMinStay()" tabindex="2"><div ng-messages="chRatesheetPromotionForm.minStay.$error"><div ng-message="min"><span translate="error.field.min" translate-values="{num: 1}"></span></div></div></md-input-container></div></div></div></ng-form>');
    $templateCache.put("/tpls/ratesheet/ratesheet-promotion.tpl", '<div flex layout="column"><div ng-if="$ctrl.promotion.hotelClosed" layout layout-align="center center" flex><md-button aria-label="Closed" class="md-icon-button no-margin no-padding auto-height cursor-help" tabindex="-1"><md-icon class="mdi mdi-lock md-18"></md-icon><md-tooltip><span translate="hotel.closed"></span></md-tooltip></md-button></div><div ng-if="!$ctrl.promotion.valid && !$ctrl.promotion.hotelClosed" layout layout-align="center center" flex><md-icon class="mdi mdi-block-helper md-18"></md-icon></div><div ng-if="$ctrl.promotion.valid && !$ctrl.promotion.hotelClosed"><div layout="column" flex><md-button ng-disabled="$ctrl.promotion.pastDate || $ctrl.promotion.availability.actual <= 0 || $ctrl.promotion.roomClosed" ng-click="$ctrl.$toggleClosing()" aria-label="Enable/Disable promotion" class="no-margin forced" ng-class="{\'minimal-button\': !$ctrl.$mdMedia(\'gt-xs\'), \n' + "\t\t\t\t\t'bg-success': !$ctrl.promotion.roomClosed && $ctrl.promotion.enabled && $ctrl.promotion.availability.actual > 0,\n" + "\t\t\t\t\t'bg-warn': !$ctrl.promotion.roomClosed && $ctrl.promotion.enabled && $ctrl.promotion.availability.actual == 0,\n" + "\t\t\t\t\t'bg-gray-base text-white': !$ctrl.promotion.roomClosed && $ctrl.promotion.enabled && $ctrl.promotion.availability.actual < 0,\n" + '\t\t\t\t\t\'bg-danger\': $ctrl.promotion.roomClosed || !$ctrl.promotion.enabled}" tabindex="-1"><div ng-show="!$ctrl.promotion.roomClosed" flex layout layout-xs="column" layout-align="center center"><small ng-show="$ctrl.promotion.minStay > 1"><md-icon class="mdi mdi-calendar-today md-14 text-white"></md-icon></small></div><md-tooltip><span ng-if="$ctrl.promotion.roomClosed || !$ctrl.promotion.enabled"><span ng-if="$ctrl.promotion.availability.actual > 0" translate="ratesheet.promos.promo.enable"></span><span ng-if="$ctrl.promotion.availability.actual == 0" translate="hotel.availability.none.abbr"></span><span ng-if="promoDailyDetaile.availability.actual < 0" translate="ratesheet.overbooking"></span></span><span ng-if="!$ctrl.promotion.roomClosed && $ctrl.promotion.enabled" translate="ratesheet.promos.promo.disable"></span></md-tooltip></md-button></div></div></div>');
    $templateCache.put("/tpls/ratesheet/ratesheet-rate-edit-amount.tpl", '<ng-form name="chRatesheetRateDataForm" flex layout="column"><md-input-container class="no-margin minimal-input no-padding-left text-center"><label><span ng-if="$ctrl.label" ng-bind="$ctrl.label"></span><span ng-if="!$ctrl.label" translate="common.price"></span></label><md-icon ng-if="$ctrl.errorIcon" ng-show="!$ctrl.rate.amount.finalAmount" class="material-icons {{$ctrl.errorIcon}}" ng-class="$ctrl.$mdMedia(\'gt-xs\') ? \'md-24\' : \'md-18\'"></md-icon><input type="number" name="amount" ng-model="$ctrl.rate.amount.finalAmount" ng-model-options="{updateOn: $ctrl.updateOn}" ng-disabled="$ctrl.ngDisabled" min="0.01" step="0.01" aria-label="{{$ctrl.type}} Rate" ng-pattern="$ctrl.REGEXP.price" ng-required="$ctrl.ngRequired" ng-change="$ctrl.$onChange()" ng-class="$ctrl.errorBg && !$ctrl.rate.amount.finalAmount ? $ctrl.errorBg : \'\'"><div ng-messages="chRatesheetRateDataForm.amount.$error"><div ng-repeat="errorObj in $ctrl.errorMessages" ng-message="{{errorObj.error}}"><span ng-if="errorObj.message" ng-bind="{{errorObj.message}}"></span><span ng-if="!errorObj.message && errorObj.messageKey" translate="{{errorObj.messageKey}}" translate-values="errorObj.messageKeyParams"></span></div></div></md-input-container></ng-form>');
    $templateCache.put("/tpls/ratesheet/ratesheet-rate-edit.tpl", '<ng-form name="chRatesheetRateForm" flex layout="column"><div ng-if="$ctrl.rate.hotelClosed" layout layout-align="center center" flex><md-button aria-label="Closed" class="md-icon-button no-margin no-padding auto-height cursor-help" tabindex="-1"><md-icon class="mdi mdi-lock md-18"></md-icon><md-tooltip><span translate="hotel.closed"></span></md-tooltip></md-button></div><div ng-if="!$ctrl.rate.hotelClosed"><div layout="column" layout-align="center center"><div ng-if="!$ctrl.hideRate"><ch-ratesheet-rate-edit-amount rate="$ctrl.rate[$ctrl.$$rateDataKey]" type="{{$ctrl.type}}" ng-required="true" ng-disabled="$ctrl.rate.pastDate || $ctrl.rate.roomClosed || !$ctrl.rate[$ctrl.$$rateDataKey].enabled" validate-on-init="true" update-on="blur" on-change="$ctrl.$saveRate()"></ch-ratesheet-rate-edit-amount></div><div ng-if="!$ctrl.hideRestrictions"><md-input-container class="minimal-input"><label flex><span translate="common.nights"></span></label><input type="number" class="text-center" name="minStay" ng-model="$ctrl.rate[$ctrl.$$rateDataKey].minStay" ng-disabled="$ctrl.rate.pastDate || $ctrl.rate.roomClosed || !$ctrl.rate[$ctrl.$$rateDataKey].enabled" min="1" step="1" ng-blur="$ctrl.$saveMinStay()" tabindex="2"><div ng-messages="chRatesheetRateForm.minStay.$error"><div ng-message="min"><span translate="error.field.min" translate-values="{num: 1}"></span></div></div></md-input-container></div></div></div></ng-form>');
    $templateCache.put("/tpls/ratesheet/ratesheet-rate.tpl", '<div flex layout="column"><div ng-if="$ctrl.rate.hotelClosed" layout layout-align="center center" flex><md-button aria-label="Closed" class="md-icon-button no-margin no-padding auto-height cursor-help" tabindex="-1"><md-icon class="mdi mdi-lock md-18"></md-icon><md-tooltip><span translate="hotel.closed"></span></md-tooltip></md-button></div><div ng-if="!$ctrl.rate.hotelClosed"><div layout="column" flex><md-button ng-disabled="$ctrl.rate.pastDate || $ctrl.rate.availability.actual <= 0" ng-click="$ctrl.$toggleRateClosing($event)" aria-label="Enable/Disable rate" class="no-margin button-label forced" ng-class="{\'minimal-button\': !$ctrl.$mdMedia(\'gt-xs\'), \n' + "\t\t\t\t\t'bg-success': !$ctrl.rate.roomClosed && $ctrl.rate[$ctrl.$$rateDataKey].enabled && $ctrl.rate[$ctrl.$$rateDataKey].amount.finalAmount && $ctrl.rate.availability.actual > 0, \n" + "\t\t\t\t\t'bg-warn': !$ctrl.rate.roomClosed && $ctrl.rate[$ctrl.$$rateDataKey].enabled && (!$ctrl.rate[$ctrl.$$rateDataKey].amount.finalAmount || $ctrl.rate.availability.actual == 0),\n" + "\t\t\t\t\t'bg-gray-base text-white': !$ctrl.rate.roomClosed && $ctrl.rate[$ctrl.$$rateDataKey].enabled && (!$ctrl.rate[$ctrl.$$rateDataKey].amount.finalAmount || $ctrl.rate.availability.actual < 0),\n" + '\t\t\t\t\t\'bg-danger\': $ctrl.rate.roomClosed || !$ctrl.rate[$ctrl.$$rateDataKey].enabled}" tabindex="-1"><div ng-show="!$ctrl.rate.roomClosed && $ctrl.rate[$ctrl.$$rateDataKey].enabled" flex layout layout-xs="column" layout-align="center center"><div flex ng-show="$ctrl.rate[$ctrl.$$rateDataKey].amount.finalAmount"><span ng-class="{\'text-small\': $ctrl.$mdMedia(\'xs\')}">{{$ctrl.rate[$ctrl.$$rateDataKey].amount.finalAmount|currency:\'€\'}}</span></div><div ng-if="!$ctrl.rate[$ctrl.$$rateDataKey].amount.finalAmount"><md-icon class="mdi mdi-currency-usd-off text-white md-24"></md-icon></div><small ng-show="$ctrl.rate[$ctrl.$$rateDataKey].amount.finalAmount && $ctrl.rate[$ctrl.$$rateDataKey].minStay > 1"><md-icon class="mdi mdi-calendar-plus md-14 text-white"></md-icon><md-tooltip><span translate="ratesheet.rate.minstay" translate-value-count="{{$ctrl.rate[$ctrl.$$rateDataKey].minStay}}"></span></md-tooltip></small></div><md-tooltip><div ng-if="!$ctrl.rate[$ctrl.$$rateDataKey].amount.finalAmount"><span translate="ratesheet.rates.none"></span></div><div ng-if="!$ctrl.rate.pastDate"><div ng-if="$ctrl.rate.roomClosed || !$ctrl.rate[$ctrl.$$rateDataKey].enabled"><span translate="ratesheet.rate.enable"></span></div><div ng-if="!$ctrl.rate.roomClosed && $ctrl.rate[$ctrl.$$rateDataKey].enabled"><span ng-if="$ctrl.rate.availability.actual > 0" translate="ratesheet.rate.disable"></span><span ng-if="$ctrl.rate.availability.actual == 0" translate="hotel.availability.none"></span><span ng-if="$ctrl.rate.availability.actual < 0" translate="ratesheet.overbooking"></span></div></div></md-tooltip></md-button></div></div></div>');
    $templateCache.put("/tpls/room-edit/room-edit-beds.tpl", '<div><div ng-if="!$ctrl.$$showDetails"><div ng-if="!$ctrl.beds.length"><span class="text-italic" translate="bed.beds.no.selection"></span><md-button class="only-border border-blue-sea text-blue-sea" ng-click="$ctrl.$toggleDetails(true)" aria-label="Show available beds"><md-icon class="mdi mdi-plus md-18 text-blue-sea"></md-icon><small translate="common.add.now"></small></md-button></div><md-list ng-if="$ctrl.beds.length"><md-list-item class="layout-row layout-wrap layout-padding-sm layout-align-center-center no-padding-top no-padding-right" ng-class="{\'no-padding-left\': !$ctrl.$mdMedia(\'gt-sm\')}" ng-repeat="bedSold in $ctrl.beds"><div class="flex"><strong ng-click="$ctrl.$showBedInfo($event, bedSold)" aria-label="Bed info" class="clickable"><span translate="bed.bed"></span><span translate="bed.{{bedSold.bed.type}}"></span>&nbsp;<md-icon class="mdi mdi-information-outline md-14"></md-icon></strong><div class="text-gray-light text-small"><span translate="bed.{{bedSold.bed.type}}.description"></span></div><div class="text-gray-light text-small"><ch-people-summary people="bedSold.people"></ch-people-summary></div><div ng-if="bedSold.amount" class="md-subhead"><span ng-if="bedSold.amount.finalAmount > 0">{{bedSold.amount.finalAmount|chCurrency}}</span><span ng-if="bedSold.amount.finalAmount == 0" class="text-success"><span translate="common.free"></span></span></div></div><div class="no-padding-right" ng-if="!$ctrl.minCount || $ctrl.$$availableBeds.length > $ctrl.minCount"><md-button class="button-small no-margin text-small text-blue-sea" ng-click="$ctrl.$toggleDetails(true)" aria-label="Edit beds"><md-icon class="mdi mdi-pencil md-18 text-blue-sea"></md-icon><span translate="common.edit"></span></md-button></div><div ng-if="!$last" class="no-margin no-padding"><md-divider></md-divider></div></md-list-item><md-list-item class="layout-row layout-wrap layout-align-center-center am-fade-and-slide-right" ng-class="{\'no-padding-left\': !$ctrl.$mdMedia(\'gt-sm\')}" ng-if="$ctrl.$$errors.min" ng-switch on="$ctrl.minCount - $ctrl.beds.length"><div flex class="layout-row layout-align-start-center"><span ng-switch-when="1" translate="error.beds.left.one"></span><span ng-switch-default translate="error.beds.left" translate-values="{num: $ctrl.minCount - $ctrl.beds.length}"></span></div><div class="layout-row layout-align-end-center"><md-button class="button-small bg-danger" aria-label="Select beds" ng-click="$ctrl.$toggleDetails(true)"><small translate="common.select.now"></small></md-button></div></md-list-item></md-list></div><div class="md-margin no-margin-x-sides no-margin-top" ng-if="$ctrl.$$showDetails"><div ng-if="!$ctrl.$$availableBeds.length"><span class="text-italic" translate="bed.beds.none.alt"></span></div><div ng-if="$ctrl.$$availableBeds.length"><md-list><md-list-item class="am-fade-and-slide-right no-padding-top no-padding-right" ng-class="{\'no-padding-left\': !$ctrl.$mdMedia(\'gt-sm\'), \'no-padding\': bed.$$editing}" ng-repeat="bed in $ctrl.$$availableBeds track by $index"><div flex><div ng-if="!bed.$$editing" layout layout-wrap layout-padding-sm layout-align="center center"><div class="flex flex-order-xs-1 flex-order-sm-1" ng-if="bed.$$available"><strong ng-click="$ctrl.$showBedInfo($event, bed)" aria-label="Bed info" class="clickable"><span translate="bed.bed"></span>&nbsp;<span translate="bed.{{bed.type}}"></span>&nbsp;<md-icon class="mdi mdi-information-outline md-14"></md-icon></strong><div class="text-gray-light text-small"><span translate="bed.{{bed.type}}.description"></span></div><div class="text-small text-lowercase"><span ng-if="bed.adultsPrice"><span>{{bed.adultsPrice|chCurrency}}&nbsp;</span><span translate="people.adult"></span><span ng-if="bed.boysPrice">,&nbsp;</span></span><span ng-if="bed.boysPrice"><span>{{bed.boysPrice|chCurrency}}&nbsp;</span><span translate="people.boy"></span><span ng-if="bed.childrenPrice">,&nbsp;</span></span><span ng-if="bed.childrenPrice"><span>{{bed.childrenPrice|chCurrency}}&nbsp;</span><span translate="people.child"></span><span ng-if="bed.kidsPrice">,&nbsp;</span></span><span ng-if="bed.kidsPrice"><span>{{bed.kidsPrice|chCurrency}}&nbsp;</span><span translate="people.kid"></span></span></div><div class="text-gray-light text-small"><span><span translate="common.for"></span>&nbsp;{{bed.maxPerson}}&nbsp;</span><span ng-if="bed.maxPerson == 1" class="text-lowercase" translate="people.person"></span><span ng-if="bed.maxPerson > 1" class="text-lowercase" translate="people.people"></span></div><div class="text-gray-light text-small"><em ng-if="bed.frequency == \'LUMP_SUM\'"><span translate="bed.price.question.info"></span><span class="text-lowercase" translate="common.entire.stay"></span></em><em ng-if="bed.frequency == \'DAILY\'" translate="bed.price.question.info.and.night"></em></div><div class="text-info" ng-if="bed.$$available && bed.$$blocked"><small translate="bed.remove.to.add.other"></small></div></div><div class="flex flex-order-xs-1 flex-order-sm-1" ng-if="!bed.$$available"><strong ng-click="$ctrl.$showBedInfo($event, bed)" aria-label="Bed info" class="clickable"><span translate="bed.bed"></span><span translate="bed.{{bed.bed.type}}"></span>&nbsp;<md-icon class="mdi mdi-information-outline md-14"></md-icon></strong><div class="text-gray-light text-small"><span translate="bed.{{bed.bed.type}}.description"></span></div><div class="text-gray-light text-small"><ch-people-summary people="bed.people"></ch-people-summary></div><div ng-if="bed.amount" class="md-subhead"><span ng-if="bed.amount.finalAmount > 0">{{bed.amount.finalAmount|chCurrency}}</span><span ng-if="bed.amount.finalAmount == 0" class="text-success"><span translate="common.free"></span></span></div></div><div class="layout-column layout-align-end-center flex-order-xs-2 flex-order-sm-2" ng-class="{\'text-center\': !$ctrl.$mdMedia(\'gt-sm\')}" ng-if="!bed.$$available"><div class="text-center"><md-icon class="mdi mdi-checkbox-marked-circle-outline text-success md-18"></md-icon>&nbsp;<small class="text-success" translate="common.booked.male"></small></div><md-button ng-if="$ctrl.configBed" hide show-gt-sm class="button-small text-blue-sea text-small" ng-class="$ctrl.$mdMedia(\'gt-sm\') ? \'auto-height row-1\' : \'only-border border-blue-sea\'" ng-click="$ctrl.$editBed(bed)" ng-disabled="$ctrl.$$editingBed" aria-label="Edit bed"><md-icon class="mdi mdi-pencil md-18 text-blue-sea"></md-icon><span translate="common.edit"></span></md-button></div><div class="no-padding-right flex-order-xs-3 flex-order-sm-3" ng-class="{\'flex-100 layout-column text-center\': !$ctrl.$mdMedia(\'gt-sm\')}" ng-if="bed.$$available && !$ctrl.$$editingBed"><md-button class="button-small only-border" aria-label="Select bed" ng-click="$ctrl.$selectBed(bed)" ng-disabled="bed.$$blocked" ng-class="{\'border-success text-success\': !bed.$$blocked}"><md-icon class="mdi mdi-plus md-18 text-white" ng-class="{\'text-success\': !bed.$$blocked}"></md-icon><small translate="common.select"></small></md-button></div><div class="no-padding-right flex-order-xs-3 flex-order-sm-3" ng-class="$ctrl.$mdMedia(\'gt-sm\') ? \'layout-row layout-align-end-center\' : \'flex-100 layout-column\'" ng-if="!bed.$$available"><md-button ng-if="$ctrl.configBed" hide-gt-sm class="button-small text-blue-sea text-small" ng-class="$ctrl.$mdMedia(\'gt-sm\') ? \'auto-height row-1\' : \'only-border border-blue-sea\'" ng-click="$ctrl.$editBed(bed)" ng-disabled="$ctrl.$$editingBed" aria-label="Edit bed"><md-icon class="mdi mdi-pencil md-18 text-blue-sea"></md-icon><span translate="common.edit"></span></md-button><md-button class="text-small" ng-class="{\'no-margin md-icon-button\': $ctrl.$mdMedia(\'gt-sm\')}" ng-click="$ctrl.$removeBed(bed)" ng-disabled="$ctrl.beds.length <= $ctrl.minCount || $ctrl.$$editingBed" aria-label="Remove bed"><md-icon class="mdi mdi-close md-18"></md-icon><span hide-gt-sm translate="common.remove"></span><md-tooltip hide show-gt-sm><span translate="common.remove"></span></md-tooltip></md-button></div></div><div ng-if="bed.$$editing && $ctrl.$$editingBed"><ch-bed-sold-edit class="md-whiteframe-z2 md-margin layout-column layout-padding-sm" bed-sold="$ctrl.$$editingBed" nights="$ctrl.nights" people-limits="$ctrl.$$peopleLimits" people-age-ranges="$ctrl.peopleAgeRanges" on-confirm="$ctrl.$confirmBedEdit($bedSold)" on-cancel="$ctrl.$cancelBedEdit($bedSold)"></ch-bed-sold-edit></div></div><div ng-if="!$last" class="no-margin no-padding"><md-divider></md-divider></div></md-list-item></md-list></div><div ng-if="!$ctrl.$$editingBed" ng-class="{\'layout-column layout-align-center-center\': !$ctrl.$mdMedia(\'gt-sm\'), \'layout-row\': $ctrl.$mdMedia(\'gt-sm\')}"><div flex class="text-danger layout-row layout-align-start-center" ng-if="$ctrl.$$availableBeds.length && $ctrl.$$errors.min" ng-switch on="$ctrl.minCount - $ctrl.beds.length"><span ng-switch-when="1" translate="error.beds.left.one"></span><span ng-switch-default translate="error.beds.left" translate-values="{num: $ctrl.minCount - $ctrl.beds.length}"></span></div><div flex class="layout-row layout-align-end-center"><md-button ng-class="{\'md-raised\': $ctrl.beds.length, \'bg-success\': !$ctrl.$$errors.min && !$ctrl.$$errors.max && $ctrl.beds.length, \'text-blue-sea\': !$ctrl.beds.length}" ng-disabled="$ctrl.$$errors.min || $ctrl.$$errors.max" ng-click="$ctrl.$confirm()" aria-label="Confirm beds"><md-icon ng-show="$ctrl.beds.length" class="mdi mdi-check md-24" ng-class="{\'text-white\': !$ctrl.$$errors.min && !$ctrl.$$errors.max}"></md-icon><md-icon ng-show="!$ctrl.beds.length" class="mdi mdi-chevron-up md-24 text-blue-sea"></md-icon><span ng-show="$ctrl.beds.length" translate="common.confirm"></span><span ng-show="!$ctrl.beds.length" translate="common.hide"></span></md-button></div></div></div></div>');
    $templateCache.put("/tpls/room-edit/room-edit-identity-documents.tpl", '<div><md-list><md-list-item ng-repeat="document in $ctrl.identityDocuments track by $index" class="am-fade-and-slide-right"><div flex layout="column"><div layout layout-wrap layout-align="start center"><div ng-switch="document.guestType"><md-icon ng-switch-when="GROUP_LEADER" class="mdi mdi-google-circles md-18 circle-icon bg-success text-white"></md-icon><md-icon ng-switch-when="HOUSEHOLDER" class="mdi mdi-account-multiple md-18 circle-icon bg-success text-white"></md-icon><md-icon ng-switch-default class="mdi md-18 circle-icon bg-gray-lighter text-gray-light" ng-class="document.name && document.surname ? \'mdi-account\': \'mdi-account-alert\'"></md-icon></div><div><strong><span translate="guest.guest"></span>&nbsp;{{$index+1}}:&nbsp;</strong></div><div flex ng-if="!document.$$editing" class="md-padding" ng-class="{\'flex\': $ctrl.$mdMedia(\'gt-sm\'), \'text-center\': !$ctrl.$mdMedia(\'gt-sm\')}"><span ng-if="document.name && document.surname"><span class="text-capitalize">{{document.name}}&nbsp;{{document.surname}}</span>&nbsp;<span ng-if="document.birthDate">-&nbsp;{{document.birthDate|utcDate:"shortDate"}}&nbsp;</span><span ng-class="document.guestType == \'GROUP_LEADER\' || document.guestType == \'HOUSEHOLDER\'? \'label label-xs bg-success\' : \'label label-xs bg-gray-light\'"><span ng-if="document.guestType == \'GROUP_LEADER\'" translate="common.GROUP_LEADER"></span><span ng-if="document.guestType == \'HOUSEHOLDER\'" translate="common.HOUSEHOLDER"></span><span ng-if="document.guestType == \'SINGLE_GUEST\'" translate="common.SINGLE_GUEST"></span><span ng-if="document.guestType == \'GROUP_MEMBER\'" translate="common.GROUP_MEMBER"></span><span ng-if="document.guestType == \'FAMILY_MEMBER\'" translate="common.FAMILY_MEMBER"></span></span></span><span ng-if="!document.name || !document.surname" class="text-gray-light"><span translate="reservation.text.identityDocuments.no.guest"></span>.&nbsp;<span translate="reservation.text.identityDocuments.add.question"></span></span></div><div ng-if="!document.$$editing" ng-class="{\'flex-100 layout-column\': !$ctrl.$mdMedia(\'gt-sm\')}"><md-button ng-class="document.name && document.surname ? \'text-blue-sea\' : \'only-border border-success text-success\'" class="button-small" ng-disabled="$ctrl.$$editingDocument" ng-click="$ctrl.$editDocument(document)" aria-label="{{document.name && document.surname ? \'Edit\' : \'Add\'}} document"><span ng-if="document.name && document.surname"><span class="mdi mdi-pencil md-24" ng-class="{\'text-blue-sea\': !$ctrl.$$editingDocument}"></span><small translate="common.edit"></small></span><span ng-if="!document.name || !document.surname"><span class="mdi mdi-plus md-24"></span><small translate="common.add"></small></span></md-button><md-button ng-if="document.name && document.surname" class="md-icon-button no-margin" ng-disabled="$ctrl.$$editingDocument" ng-click="$ctrl.$removeDocument(document)" aria-label="Remove document"><md-icon class="mdi mdi-close md-18"></md-icon><md-tooltip><span translate="common.remove"></span></md-tooltip></md-button></div></div><div flex ng-if="document.$$editing && $ctrl.$$editingDocument"><div><ch-identity-document-edit class="md-whiteframe-z2 md-margin layout-column layout-padding-sm" identity-document="$ctrl.$$editingDocument" on-confirm="$ctrl.$confirmDocumentEdit($document)" on-cancel="$ctrl.$cancelDocumentEdit($document)"></ch-identity-document-edit></div></div></div><md-divider class="no-padding" ng-if="!document.$$editing && !$last"></md-divider></md-list-item></md-list></div>');
    $templateCache.put("/tpls/room-edit/room-edit-people.tpl", '<div><md-list ng-show="!$ctrl.$$showDetails"><md-list-item ng-if="$ctrl.maxCount > 1" class="layout-row layout-wrap layout-padding layout-align-center-center no-padding-top no-padding-bottom no-padding-right"><div flex><ch-people-summary people="$ctrl.people"></ch-people-summary></div><div class="no-padding-right"><md-button class="button-small no-margin text-blue-sea" ng-click="$ctrl.$toggleDetails(true)" aria-label="Edit guests"><small><md-icon class="mdi mdi-pencil md-18 text-blue-sea"></md-icon><span translate="common.edit"></span></small></md-button></div></md-list-item><md-list-item ng-if="$ctrl.maxCount == 1" class="layout-row layout-wrap layout-padding layout-align-center-center no-padding-top no-padding-bottom no-padding-right"><div class="flex"><span><span translate="people.people.only.inroom"></span>&nbsp;</span><ch-people-summary people="$ctrl.people"></ch-people-summary></div></md-list-item></md-list><div class="layout-column" ng-class="{\'layout-align-center-center\': !$mdMedia(\'gt-sm\')}" ng-show="$ctrl.$$showDetails"><div><ch-people-counters ng-model="$ctrl.people" max-people="$ctrl.maxPeople" min="1" max="$ctrl.maxCount" limits="$ctrl.limits" age-ranges="$ctrl.ageRanges" on-change="$ctrl.$onPeopleChange($people)"></ch-people-counters></div><div ng-if="$ctrl.$$guestsCount.standard >= $ctrl.maxCount" class="md-padding no-padding-bottom no-padding-top"><span class="bg-info label label-inline-block text-wrap text-center" translate="people.max.room"></span></div><div class="text-right" ng-class="{\'layout-column\': !$mdMedia(\'gt-sm\')}"><md-button class="bg-success text-white md-raised" ng-click="$ctrl.$toggleDetails()" aria-label="Confirm guests"><md-icon class="mdi mdi-check md-24 text-white"></md-icon><span translate="common.confirm"></span></md-button></div></div></div>');
    $templateCache.put("/tpls/room-edit/room-edit-services.tpl", '<div><div ng-if="!$ctrl.totalServices.length"><span class="text-italic" translate="service.none"></span></div><div ng-if="$ctrl.totalServices.length"><md-list class="layout-row layout-wrap"><md-list-item ng-repeat="service in $ctrl.totalServices track by $index" ng-show="$ctrl.$$showAllServices || $index < $ctrl.previewSize" class="am-fade-and-slide-right no-padding-top no-padding-right flex-100" ng-class="{\'flex-gt-sm-50\': $ctrl.totalServices.length > 1, \'no-padding-left\': !$ctrl.$mdMedia(\'gt-sm\'), \'no-padding\': service.$$editing}"><div ng-if="!service.$$editing" flex layout layout-wrap layout-align="start center" layout-padding-sm class="no-secondary-container"><div ng-if="$ctrl.$$servicesIcons[service.type.nameKey]"><md-icon class="{{$ctrl.$$servicesIcons[service.type.nameKey]}} md-30 circle-icon material-icons" ng-class="service.$$serviceSold ? \'bg-success text-white\' : \'bg-gray-lighter text-gray-light\'"></md-icon></div><div ng-if="!$ctrl.$$servicesIcons[service.type.nameKey]"><md-icon class="mdi mdi-check md-30 circle-icon" ng-class="service.$$serviceSold ? \'bg-success text-white\' : \'bg-gray-lighter text-gray-light\'"></md-icon></div><div class="flex layout-column flex-order-xs-1 flex-order-sm-1" ng-if="!service.$$serviceSold"><strong ng-click="$ctrl.$showServiceInfo($event, service)" aria-label="Show service info" class="clickable"><span ng-if="service.maxCount > 1">{{service.maxCount}}&nbsp;x&nbsp;</span><span translate="{{service.type.nameKey}}"></span>&nbsp;<md-icon class="mdi mdi-information-outline md-14"></md-icon></strong><span ng-switch="service.paymentType" class="text-lowercase text-gray-light text-small"><span ng-switch-when="FREE"><span translate="common.free"></span></span><span ng-switch-when="SINGLE"><span>{{service.paymentOptions[0].amount.finalAmount|chCurrency}}</span>&nbsp;<span ng-if="service.frequency == \'DAILY\'" class="text-lowercase"><span translate="date.frequency.daily"></span></span><span ng-if="service.frequency == \'MONTHLY\'" class="text-lowercase"><span translate="date.frequency.monthly"></span></span><span ng-if="service.frequency == \'YEARLY\'" class="text-lowercase"><span translate="date.frequency.yearly"></span></span><span ng-if="service.frequency == \'LUMP_SUM\'" class="text-lowercase"><span translate="common.entire.stay"></span></span></span><span ng-switch-when="PER_PERSON"><span translate="reservation.starting.from"></span>&nbsp;<span>{{service.$$bestPrice|chCurrency}}</span>&nbsp;<span ng-if="service.frequency == \'DAILY\'" class="text-lowercase"><span translate="date.frequency.daily"></span></span><span ng-if="service.frequency == \'MONTHLY\'" class="text-lowercase"><span translate="date.frequency.monthly"></span></span><span ng-if="service.frequency == \'YEARLY\'" class="text-lowercase"><span translate="date.frequency.yearly"></span></span><span ng-if="service.frequency == \'LUMP_SUM\'" class="text-lowercase"><span translate="common.entire.stay"></span></span></span></span></div><div class="flex layout-column flex-order-xs-1 flex-order-sm-1" ng-if="service.$$serviceSold"><strong ng-click="$ctrl.$showServiceInfo($event, service)" aria-label="Show service info" class="clickable"><span ng-if="service.$$serviceSold.count > 1">{{service.$$serviceSold.count}}&nbsp;x&nbsp;</span><span translate="{{service.type.nameKey}}"></span><md-icon class="mdi mdi-information-outline md-14"></md-icon></strong><div ng-if="service.paymentType == \'PER_PERSON\'" class="text-gray-light text-small"><ch-people-summary people="service.$$serviceSold.people"></ch-people-summary></div><div ng-if="!service.$$serviceSold.$$removed && service.$$serviceSold.amount" class="md-subhead"><span ng-if="service.$$serviceSold.amount.finalAmount > 0">{{service.$$serviceSold.amount.finalAmount|chCurrency}}</span><span ng-if="service.$$serviceSold.amount.finalAmount == 0" class="text-success"><span translate="common.free"></span></span></div></div><div class="layout-column layout-align-center-center flex-order-xs-2 flex-order-sm-2" ng-class="{\'text-center\': !$ctrl.$mdMedia(\'gt-sm\')}" ng-if="service.$$serviceSold"><div class="text-center"><md-icon class="mdi mdi-checkbox-marked-circle-outline text-success md-18"></md-icon>&nbsp;<small class="text-success" translate="common.booked.male"></small></div><md-button ng-if="service.$$editable" hide show-gt-sm class="button-small text-blue-sea text-small" ng-class="$ctrl.$mdMedia(\'gt-sm\') ? \'auto-height row-1\' : \'only-border border-blue-sea\'" ng-disabled="$ctrl.$$editingService" ng-click="$ctrl.$editService(service)" aria-label="Edit service"><md-icon class="mdi mdi-pencil md-18 text-blue-sea"></md-icon><span translate="common.edit"></span></md-button></div><div class="no-padding-right flex-order-xs-3 flex-order-sm-3" ng-class="{\'flex-100 layout-column text-center\': !$ctrl.$mdMedia(\'gt-sm\')}" ng-if="!service.$$serviceSold"><md-button class="button-small only-border" ng-class="{\'border-success text-success\': !$ctrl.$$editingService}" ng-disabled="$ctrl.$$editingService" ng-click="$ctrl.$addService(service)" aria-label="Add service"><md-icon class="mdi mdi-plus md-18" ng-class="{\'text-success\': !$ctrl.$$editingService}"></md-icon><small translate="common.add"></small></md-button></div><div class="no-padding-right flex-order-xs-3 flex-order-sm-3" ng-class="$ctrl.$mdMedia(\'gt-sm\') ? \'layout-row layout-align-end-center\' : \'flex-100 layout-column\'" ng-if="service.$$serviceSold"><md-button ng-if="service.$$editable" hide-gt-sm class="button-small text-blue-sea text-small" ng-class="$ctrl.$mdMedia(\'gt-sm\') ? \'auto-height row-1\' : \'only-border border-blue-sea\'" ng-disabled="$ctrl.$$editingService" ng-click="$ctrl.$editService(service)" aria-label="Edit service"><md-icon class="mdi mdi-pencil md-18 text-blue-sea"></md-icon><span translate="common.edit"></span></md-button><md-button class="text-small" ng-class="{\'no-margin md-icon-button\': $ctrl.$mdMedia(\'gt-sm\')}" ng-disabled="$ctrl.$$editingService" ng-click="$ctrl.$removeService(service.$$serviceSold)" aria-label="Remove service"><md-icon class="mdi mdi-close md-18"></md-icon><span hide-gt-sm translate="common.remove"></span><md-tooltip hide show-gt-sm><span translate="common.remove"></span></md-tooltip></md-button></div></div><div flex ng-if="service.$$editing && $ctrl.$$editingService"><ch-service-sold-edit class="md-whiteframe-z2 md-margin layout-column layout-padding-sm" service-sold="$ctrl.$$editingService" nights="$ctrl.nights" people-limits="$ctrl.$$peopleLimits" people-age-ranges="$ctrl.peopleAgeRanges" on-confirm="$ctrl.$confirmServiceEdit($serviceSold)" on-cancel="$ctrl.$cancelServiceEdit($serviceSold)"></ch-service-sold-edit></div><md-divider ng-if="!$last" class="md-margin hide-gt-sm"></md-divider></md-list-item></md-list><div ng-if="($ctrl.totalServices.length - $ctrl.previewSize) > 0" class="flex-100 layout-column"><md-button class="button-mini text-small" ng-click="$ctrl.$toggleAllServices()" aria-label="Show other services"><span ng-if="!$ctrl.$$showAllServices"><span ng-if="($ctrl.totalServices.length - $ctrl.previewSize) <= 1"><span translate="common.show.other"></span><span>{{($ctrl.totalServices.length - $ctrl.previewSize)}}</span><span translate="service.services"></span></span><span ng-if="($ctrl.totalServices.length - $ctrl.previewSize) > 1"><span translate="common.show.others"></span><span>{{($ctrl.totalServices.length - $ctrl.previewSize)}}</span><span translate="service.services"></span></span></span><span ng-if="$ctrl.$$showAllServices"><span translate="reservation.services.hide"></span></span><md-icon class="mdi md-18" ng-class="$ctrl.$$showAllServices ? \'mdi-chevron-up\' : \'mdi-chevron-down\'"></md-icon></md-button></div></div></div>');
    $templateCache.put("/tpls/room-edit/room-edit.tpl", '<div class="relative" id="ch-room-edit_{{$ctrl.$$index}}"><div ng-if="$ctrl.title || $ctrl.onRemove" class="layout-row layout-padding-sm"><div ng-if="$ctrl.title" class="text-primary md-subhead"><span ng-bind="$ctrl.title"></span></div><div flex></div><div ng-if="$ctrl.onRemove"><md-button class="md-icon-button" ng-click="$ctrl.$removeRoom($event)" aria-label="Remove room"><md-icon class="mdi mdi-close md-24"></md-icon><md-tooltip><span translate="common.remove"></span></md-tooltip></md-button></div></div><div class="layout-gt-sm-row layout-padding no-padding layout-wrap"><div class="square-room-image no-padding-left"><img class="no-padding-left clickable" ng-src="{{$ctrl.$$roomImage}}" lazy-image alt="Room cover image" ng-click="$ctrl.$openGallery($event)"><md-tooltip><span translate="photo.photos.view.all"></span></md-tooltip></div><div flex><div layout layout-wrap><div flex><h3 class="no-margin md-title" translate="{{$ctrl.room.type.roomType.nameKey}}"></h3><div class="row-mini text-gray-light"><small flex><span ng-if="$ctrl.room.type.description[$ctrl.localeIso]">{{$ctrl.room.type.description[$ctrl.localeIso]}}</span><span ng-if="!$ctrl.room.type.description[$ctrl.localeIso]"><span translate="{{$ctrl.room.type.roomType.descriptionKey}}"></span></span></small></div><div><span class="md-caption"><span><span translate="room.category"></span>:&nbsp;</span><span class="text-normal text-uppercase" translate="room.category.{{$ctrl.room.type.category}}"></span></span></div><div><span class="md-caption text-lowercase"><span>{{$ctrl.$$guestsCount.total}}</span><span ng-if="$ctrl.$$guestsCount.total != 1" translate="people.people"></span><span ng-if="$ctrl.$$guestsCount.total == 1" translate="people.person"></span></span></div></div><div><div class="layout-row layout-wrap layout-align-gt-sm-end-center flex-xs-100 flex-sm-100" ng-class="{\'layout-align-center-start\': $ctrl.$$promotion, \'layout-align-center-center\': !$ctrl.$$promotion}"><div class="layout-column" ng-class="{\'text-center\': !$ctrl.$mdMedia(\'gt-sm\'), \'text-right\': $ctrl.$mdMedia(\'gt-sm\')}"><div ng-if="$ctrl.$$promotion" ng-switch="$ctrl.$$promotion.promotionType"><span ng-switch-when="STANDARD" class="label label-xs bg-info"><ch-truncate text="{{$ctrl.$$promotion.name[$ctrl.localeIso]}}" max-length="20" suffix="..."></ch-truncate>&nbsp;<span ng-if="$ctrl.$$promotion.discount.type==\'PERCENTAGE\'">-{{$ctrl.$$promotion.discount.finalAmount}}%</span><span ng-if="$ctrl.$$promotion.discount.type==\'PRICE\'">-{{$ctrl.$$promotion.discount.finalAmount|chCurrency}}</span></span><span ng-switch-when="MINIMUM_STAY" class="label label-xs bg-primary-light"><span translate="promotions.promotion.label.minstay.nights" translate-value-count="{{$ctrl.$$promotion.minStay}}"></span>&nbsp;<span ng-if="$ctrl.$$promotion.discount.type==\'PERCENTAGE\'">-{{$ctrl.$$promotion.discount.finalAmount}}%</span><span ng-if="$ctrl.$$promotion.discount.type==\'PRICE\'">-{{$ctrl.$$promotion.discount.finalAmount|chCurrency}}</span></span><span ng-switch-when="BOOK_TODAY" class="label label-xs bg-primary"><span translate="promotions.promotion.label.only.today"></span>!&nbsp;<span ng-if="$ctrl.$$promotion.discount.type==\'PERCENTAGE\'">-{{$ctrl.$$promotion.discount.finalAmount}}%</span><span ng-if="$ctrl.$$promotion.discount.type==\'PRICE\'">-{{$ctrl.$$promotion.discount.finalAmount|chCurrency}}</span></span><span ng-switch-when="EARLY_BOOKING" class="label label-xs bg-success"><span translate="promotions.early"></span>&nbsp;<span ng-if="$ctrl.$$promotion.discount.type==\'PERCENTAGE\'">-{{$ctrl.$$promotion.discount.finalAmount}}%</span><span ng-if="$ctrl.$$promotion.discount.type==\'PRICE\'">-{{$ctrl.$$promotion.discount.finalAmount|chCurrency}}</span></span><span ng-switch-when="LAST_MINUTE" class="label label-xs bg-blue-sea"><span translate="promotions.last.minute"></span>&nbsp;<span ng-if="$ctrl.$$promotion.discount.type==\'PERCENTAGE\'">-{{$ctrl.$$promotion.discount.finalAmount}}%</span><span ng-if="$ctrl.$$promotion.discount.type==\'PRICE\'">-{{$ctrl.$$promotion.discount.finalAmount|chCurrency}}</span></span><span ng-switch-when="LAST_SECOND" class="label label-xs bg-warn"><span translate="promotions.last.second"></span>&nbsp;<span ng-if="$ctrl.$$promotion.discount.type==\'PERCENTAGE\'">-{{$ctrl.$$promotion.discount.finalAmount}}%</span><span ng-if="$ctrl.$$promotion.discount.type==\'PRICE\'">-{{$ctrl.$$promotion.discount.finalAmount|chCurrency}}</span></span></div><div layout="column" layout-align="center end" ng-class="{\'md-padding\': !$ctrl.$mdMedia(\'gt-sm\')}"><small ng-if="$ctrl.room.totalPrice.initialAmount > 0 && $ctrl.room.totalPrice.initialAmount > $ctrl.room.totalPrice.finalAmount"><i><del>{{$ctrl.room.totalPrice.initialAmount|chCurrency}}</del></i>&nbsp;&nbsp;</small><h3 class="no-margin md-headline">{{$ctrl.room.totalPrice.finalAmount|chCurrency}}</h3></div><div class="text-center layout-column flex-50"><div ng-switch="$ctrl.room.totalRate.type"><span ng-switch-when="STANDARD"><span ng-if="$ctrl.room.totalRate.cancellationPolicy.flexible" class="label bg-warn" translate="reservation.rate.flexible"></span><span ng-if="!$ctrl.room.totalRate.cancellationPolicy.flexible" class="label bg-success" translate="reservation.cancellation.free"></span></span><span ng-switch-when="NOT_REFUNDABLE" class="label" translate="ratesheet.rate.type.notRefundable.abbr"></span></div></div></div></div></div></div><div ng-if="$ctrl.room.totalRate.$$bestHotelRate" class="layout-row layout-wrap layout-align-start-center layout-padding border-radius border-success text-success only-border md-body-2 margin-auto-20"><span class="no-padding"><md-icon class="mdi mdi-thumb-up-outline md-24 text-success"></md-icon>&nbsp;<span translate="room.best.hotel.rate"></span></span></div><div ng-if="!$ctrl.room.totalRate.$$bestHotelRate" class="layout-row layout-wrap layout-align-start-center layout-padding border-radius border-blue-sea text-blue-sea only-border md-body-2 margin-auto-20"><span class="no-padding"><md-icon class="mdi mdi-thumb-up-outline md-24 text-blue-sea"></md-icon>&nbsp;<span translate="room.best.lovely.choise"></span></span></div></div></div><div ng-if="!$ctrl.showConfig"><div layout="column" ng-class="{\'md-padding\': $ctrl.$mdMedia(\'gt-sm\')}"><div class="font-14 text-blue-sea text-center"><span translate="room.config.now.question"></span></div><md-button class="bg-blue-sea text-wrap button-small" ng-click="$ctrl.$toggleRoomConfig(true)" aria-label="Config room"><span><span translate="room.config.now"></span>!</span><md-icon class="mdi mdi-chevron-down md-24 text-white animated infinite bounce"></md-icon></md-button></div></div><div ng-if="$ctrl.showConfig"><div class="layout-column flex-100 layout-align-center-center margin-20-no-x-sides"><div class="md-title text-center"><span translate="reservation.rooms.config.title"></span></div></div><div layout="column" class="margin-20-no-x-sides no-margin-top"><div><div class="md-subhead md-margin text-blue-sea"><md-icon class="mdi mdi-account-multiple md-32 text-blue-sea no-margin"></md-icon>&nbsp;<span translate="bed.sleep.here.room"></span></div><md-divider></md-divider><div ng-if="$ctrl.room.type.guestsCount.standard > 1" class="md-padding no-padding-top no-padding-bottom text-gray-light text-italic"><md-icon class="mdi mdi-information-outline md-14"></md-icon>&nbsp;<small><span ng-if="$ctrl.maxCount != $ctrl.$$guestsCount.standard"><span translate="people.people.add.more"></span>.&nbsp;</span><span ng-if="$ctrl.maxCount == $ctrl.$$guestsCount.standard"><span translate="people.people.edit"></span>.&nbsp;</span><span translate="common.edit.no.extra.cost"></span></small></div></div><ch-room-edit-people people="$ctrl.room.people" max-people="$ctrl.room.type.people" max-count="$ctrl.room.type.guestsCount.standard" limits="$ctrl.peopleLimits" age-ranges="$ctrl.peopleAgeRanges" on-change="$ctrl.$onPeopleChange($people)"></ch-room-edit-people></div><div layout="column" class="margin-20-no-x-sides no-margin-top"><div ng-if="!$ctrl.$bedsConfig"><div class="md-subhead md-margin text-blue-sea"><md-icon class="mdi mdi-hotel md-32 text-blue-sea no-margin"></md-icon>&nbsp;<span flex><ch-people-summary people="$ctrl.room.people"></ch-people-summary><span class="text-lowercase">&nbsp;<span ng-if="$ctrl.$$guestsCount.standard == 1" translate="people.person.will.sleep"></span><span ng-if="$ctrl.$$guestsCount.standard > 1" translate="people.people.will.sleep"></span>&nbsp;<span ng-if="$ctrl.room.beds.length == 1" translate="bed.bed.follow"></span><span ng-if="$ctrl.room.beds.length > 1" translate="bed.beds.follow"></span></span></span></div><md-divider></md-divider><div class="md-padding no-padding-top no-padding-bottom text-gray-light text-italic"><md-icon class="mdi mdi-information-outline md-14"></md-icon>&nbsp;<small ng-if="$ctrl.room.type.beds.length > $ctrl.room.beds.length"><span translate="bed.choise.type"></span><span translate="common.edit.no.extra.cost"></span></small><small ng-if="$ctrl.room.type.beds.length <= $ctrl.room.beds.length"><span translate="bed.beds.principal.description"></span></small></div></div><div ng-if="$ctrl.$bedsConfig"><div class="md-subhead md-margin text-blue-sea"><md-icon class="mdi mdi-hotel md-32 text-blue-sea no-margin"></md-icon>&nbsp;<span flex translate="bed.beds.principal.list"></span></div><md-divider></md-divider><div class="md-padding no-padding-top no-padding-bottom text-gray-light text-italic"><md-icon class="mdi mdi-information-outline md-14"></md-icon>&nbsp;<small><span translate="bed.beds.principal.max.selectable.label1"></span>&nbsp;<span>{{$ctrl.room.type.bedCount}}</span><span class="text-lowercase" ng-if="$ctrl.room.type.bedCount > 1" translate="bed.beds.principal"></span><span class="text-lowercase" ng-if="$ctrl.room.type.bedCount == 1" translate="bed.bed.principal"></span>&nbsp;<span class="text-lowercase" translate="bed.beds.principal.max.selectable.label2"></span><span>.&nbsp;<span translate="common.choice.no.extra.cost"></span>.</span></small></div></div><div><ch-room-edit-beds room="$ctrl.room" nights="$ctrl.nights" beds="$ctrl.room.beds" total-beds="$ctrl.room.type.beds" min-count="1" max-count="$ctrl.room.type.bedCount" on-toggle-config="$ctrl.$onToggleBedsConfig($open)" on-add="$ctrl.$onBedAdd($bed)" on-remove="$ctrl.$onBedRemove($bed)" on-change="$ctrl.$onBedChange($bed)"></ch-room-edit-beds></div></div><div ng-if="$ctrl.room.type.otherBeds.length" layout="column" class="margin-20-no-x-sides no-margin-top"><div><div class="md-subhead md-margin text-blue-sea"><md-icon class="mdi mdi-plus md-18 text-blue-sea no-margin"></md-icon><md-icon class="mdi mdi-hotel md-32 text-blue-sea no-margin"></md-icon>&nbsp;<span ng-show="$ctrl.room.otherBeds.length" translate="bed.beds.list.title"></span><span ng-show="!$ctrl.room.otherBeds.length" translate="bed.beds.list.title.other"></span><md-button ng-if="!$ctrl.room.otherBeds.length" ng-show="!$ctrl.$$extraBedsConfig" class="button-small no-margin-top no-margin-bottom text-blue-sea" ng-disabled="$ctrl.$$extraBedsConfig" aria-label="Show/Hide extra beds" ng-click="$ctrl.$toggleExtraBeds()"><small ng-if="!$ctrl.$$showExtraBeds"><md-icon class="mdi mdi-plus md-18 text-blue-sea"></md-icon><span translate="common.add"></span></small><small ng-if="$ctrl.$$showExtraBeds"><md-icon class="mdi mdi-chevron-up md-18 text-blue-sea"></md-icon><span translate="common.hide"></span></small></md-button></div><md-divider></md-divider><div class="md-padding no-padding-top no-padding-bottom text-gray-light text-italic"><md-icon class="mdi mdi-information-outline md-14"></md-icon>&nbsp;<small ng-if="$ctrl.room.otherBeds.length"><span translate="bed.this.operation"></span>&nbsp;<span>{{$ctrl.$$guestsCount.extra}}</span>&nbsp;<span class="text-lowercase"><span ng-if="$ctrl.$$guestsCount.extra == 1" translate="people.person"></span><span ng-if="$ctrl.$$guestsCount.extra != 1" translate="people.people"></span>&nbsp;<span translate="room.room.in.yours"></span></span></small><small ng-if="!$ctrl.room.otherBeds.length"><span translate="bed.beds.add.more"></span>&nbsp;<span>{{$ctrl.room.type.maxOtherBeds - $ctrl.room.otherBeds.length}}</span>&nbsp;<span class="text-lowercase"><span ng-if="($ctrl.room.type.maxOtherBeds - $ctrl.room.otherBeds.length) == 1" translate="bed.bed"></span><span ng-if="($ctrl.room.type.maxOtherBeds - $ctrl.room.otherBeds.length) != 1" translate="bed.beds"></span>&nbsp;<span translate="reservation.total.night"></span>&nbsp;<span>{{$ctrl.room.type.guestsCount.extra - $ctrl.$$guestsCount.extra}}</span>&nbsp;<span ng-if="($ctrl.room.type.guestsCount.extra - $ctrl.$$guestsCount.extra) == 1" translate="people.person"></span><span ng-if="($ctrl.room.type.guestsCount.extra - $ctrl.$$guestsCount.extra) != 1" translate="people.people"></span></span></small></div></div><div ng-if="$ctrl.$$showExtraBeds" id="ch-room-edit-{{$ctrl.$$index}}-config-extra-beds"><ch-room-edit-beds room="$ctrl.room" nights="$ctrl.nights" beds="$ctrl.room.otherBeds" total-beds="$ctrl.room.type.otherBeds" max-count="$ctrl.room.type.maxOtherBeds" config-bed="true" people-age-ranges="$ctrl.peopleAgeRanges" on-toggle-config="$ctrl.$onToggleExtraBedsConfig($open)" on-add="$ctrl.$onExtraBedAdd($bed)" on-remove="$ctrl.$onExtraBedRemove($bed)" on-change="$ctrl.$onExtraBedChange($bed)"></ch-room-edit-beds><div ng-if="$ctrl.room.otherBeds.length == $ctrl.room.type.maxOtherBeds" class="text-center"><md-icon class="mdi mdi-thumb-up-outline text-success"></md-icon>&nbsp;<span translate="bed.all.added.success.message" class="text-success"></span></div></div></div><div ng-if="$ctrl.$$includedServices.length" layout="column" class="margin-20-no-x-sides no-margin-top"><div><div class="md-subhead md-margin text-blue-sea"><md-icon class="mdi mdi-checkbox-multiple-marked-circle-outline md-32 text-blue-sea no-margin"></md-icon>&nbsp;<span translate="room.facilities"></span></div><md-divider></md-divider><div class="md-padding text-gray-light"><span translate="room.facilities.text"></span>&nbsp;<md-button class="no-margin button-small text-blue-sea" ng-click="$ctrl.$toggleIncludedServices()" aria-label="Show/Hide room facilities"><small><span ng-if="!$ctrl.$$showIncluedServices" translate="common.show"></span><span ng-if="$ctrl.$$showIncluedServices" translate="common.hide"></span>&nbsp;<md-icon class="mdi text-blue-sea" ng-class="$ctrl.$$showIncluedServices ? \'mdi-chevron-up\' : \'mdi-chevron-down\'"></md-icon></small></md-button></div></div><div ng-if="$ctrl.$$showIncluedServices" class="layout-column flex-100 md-padding no-padding-top"><div layout layout-wrap layout-padding-sm><div ng-repeat="service in $ctrl.$$includedServices track by $index" class="flex-100 flex-gt-sm-50"><md-icon ng-if="$ctrl.$$servicesIcons[service.type.nameKey]" class="{{$ctrl.$$servicesIcons[service.type.nameKey]}} text-success material-icons"></md-icon><md-icon ng-if="!$ctrl.$$servicesIcons[service.type.nameKey]" class="mdi mdi-check text-success material-icons"></md-icon>&nbsp;<span translate="{{service.type.nameKey}}"></span></div></div></div></div><div ng-if="$ctrl.$$freeServices.length" layout="column" class="margin-20-no-x-sides no-margin-top"><div><div class="md-subhead md-margin text-blue-sea"><md-icon class="mdi mdi-gift md-32 text-blue-sea no-margin"></md-icon>&nbsp;<span translate="service.services.free.text"></span></div><md-divider></md-divider><div class="md-padding no-padding-top no-padding-bottom text-gray-light text-italic"><md-icon class="mdi mdi-information-outline md-14"></md-icon>&nbsp;<small translate="service.services.free.info"></small></div></div><div><ch-room-edit-services room="$ctrl.room" nights="$ctrl.nights" services="$ctrl.room.services" total-services="$ctrl.$$freeServices" preview-size="4" people-age-ranges="$ctrl.peopleAgeRanges" on-add="$ctrl.$onServiceAdd($service)" on-remove="$ctrl.$onServiceRemove($service)" on-change="$ctrl.$onServiceChange($service)"></ch-room-edit-services></div></div><div ng-if="$ctrl.$$paymentServices.length" layout="column" class="margin-20-no-x-sides no-margin-top"><div><div class="md-subhead md-margin text-blue-sea"><md-icon class="mdi mdi-currency-usd md-32 text-blue-sea no-margin"></md-icon>&nbsp;<span translate="service.services.popular.text"></span></div><md-divider></md-divider><div class="md-padding no-padding-top no-padding-bottom text-gray-light text-italic"><md-icon class="mdi mdi-information-outline md-14"></md-icon>&nbsp;<small translate="service.services.popular.info"></small></div></div><div><ch-room-edit-services room="$ctrl.room" nights="$ctrl.nights" services="$ctrl.room.services" total-services="$ctrl.$$paymentServices" preview-size="4" people-age-ranges="$ctrl.peopleAgeRanges" on-add="$ctrl.$onServiceAdd($service)" on-remove="$ctrl.$onServiceRemove($service)" on-change="$ctrl.$onServiceChange($service)"></ch-room-edit-services></div></div><div layout="column" class="margin-20-no-x-sides no-margin-top"><div><div class="md-subhead md-margin text-blue-sea"><md-icon class="mdi mdi-account-card-details md-32 text-blue-sea no-margin"></md-icon>&nbsp;<span translate="reservation.text.identityDocuments.list"></span></div><md-divider></md-divider><div class="md-padding no-padding-top no-padding-bottom"><span translate="reservation.text.identityDocuments.label"></span>&nbsp;<md-button class="no-margin button-small text-blue-sea text-small" ng-click="$ctrl.$toggleIdentityDocuments()" aria-label="Hide/show room facilities"><span ng-if="!$ctrl.$$showIdentityDocuments"><span ng-if="!$ctrl.room.identityDocuments.length" translate="reservation.text.identityDocuments.enter"></span><span ng-if="$ctrl.room.identityDocuments.length" translate="reservation.text.identityDocuments.show"></span></span><span ng-if="$ctrl.$$showIdentityDocuments" translate="reservation.text.identityDocuments.hide"></span><md-icon class="mdi text-blue-sea" ng-class="$ctrl.$$showIdentityDocuments ? \'mdi-chevron-up\' : \'mdi-chevron-down\'"></md-icon></md-button></div></div><div ng-if="$ctrl.$$showIdentityDocuments" id="ch-room-edit-{{$ctrl.$$index}}-config-documents"><ch-room-edit-identity-documents identity-documents="$ctrl.room.identityDocuments" total-count="$ctrl.$$guestsCount.total" guest-type="$ctrl.identityDocumentGuestType" on-add="$ctrl.$onIdentityDocumentAdd($document)" on-remove="$ctrl.$onIdentityDocumentRemove($document)" on-change="$ctrl.$onIdentityDocumentChange($document)"></ch-room-edit-identity-documents></div></div><div layout="column"><md-button class="text-blue-sea text-small text-wrap row-1" ng-click="$ctrl.$toggleRoomConfig(false)" aria-label="Close room config"><span translate="room.config.close"></span><md-icon class="mdi mdi-chevron-up md-18 text-blue-sea"></md-icon></md-button></div></div></div>');
    $templateCache.put("/tpls/room/room-info.tpl", '<div id="{{\'ch-room-\' + $ctrl.chRoomCtrl.$$index + \'-info\'}}" ng-show="$ctrl.chRoomCtrl.$$showInfo" ng-class="{\'animated fadeIn\': $ctrl.chRoomCtrl.$$showInfo}"><div class="md-padding no-padding-bottom text-gray-light"><div ng-show="$ctrl.chRoomCtrl.room.maxOtherBeds > 0" class="md-padding no-padding-bottom text-blue-sea text-center"><md-icon class="mdi mdi-hotel animated tada infinite text-blue-sea md-24"></md-icon>&nbsp;<span translate="reservation.room.extra.beds.bookable"></span><span ng-if="$ctrl.chRoomCtrl.$$hasFreeBeds" class="text-uppercase" translate="common.for.free"></span><span ng-if="!$ctrl.chRoomCtrl.$$hasFreeBeds" class="text-lowercase" translate="common.for.fee"></span></div><div class="layout layout-wrap"><div class="layout-column flex"><div layout layout-wrap class="bg-white layout-padding layout-row layout-wrap layout-align-space-around md-whiteframe-1dp"><div class="flex-gt-xs flex-xs-100 no-padding no-margin text-center"><ch-people-icons people="$ctrl.chRoomCtrl.room.people" max="$ctrl.chRoomCtrl.room.guestsCount.standard" extra-people="$ctrl.chRoomCtrl.room.extraPeople" extra-max="$ctrl.chRoomCtrl.room.guestsCount.extra" hidetooltip="!$ctrl.$mdMedia(\'gt-sm\')" size="big" theme="dark" hide-extra-people="true"></ch-people-icons></div><md-divider hide-xs></md-divider><div class="flex-gt-xs flex-xs-100 no-padding no-margin text-center"><div><md-icon class="mdi mdi-hotel md-48"></md-icon></div><div class="text-small"><span>{{::$ctrl.chRoomCtrl.room.beds.length}}</span><span ng-if="$ctrl.chRoomCtrl.room.beds.length == 1"><span translate="bed.{{::$ctrl.chRoomCtrl.room.beds[0].type}}"></span></span><span ng-if="$ctrl.chRoomCtrl.room.beds.length != 1" translate="bed.beds.principal"></span></div></div><md-divider hide-xs></md-divider><div class="flex-gt-xs flex-xs-100 no-padding no-margin text-center"><div style="height: 48px; line-height: 58px"><span class="md-title">{{::$ctrl.chRoomCtrl.room.metres}} m²</span></div><div class="text-small"><span translate="room.size"></span></div></div></div><div ng-if="$ctrl.chRoomCtrl.room.guestsCount.extra > 0" layout layout-wrap class="bg-white layout-padding layout-row layout-wrap layout-align-space-around md-whiteframe-1dp" style="margin-top: 10px"><div class="flex-gt-xs flex-xs-100 no-padding no-margin text-center"><ch-people-icons people="$ctrl.chRoomCtrl.room.people" max="$ctrl.chRoomCtrl.room.guestsCount.standard" extra-people="$ctrl.chRoomCtrl.room.extraPeople" extra-max="$ctrl.chRoomCtrl.room.guestsCount.extra" hidetooltip="!$ctrl.$mdMedia(\'gt-sm\')" size="big" theme="dark" hide-people="true"></ch-people-icons></div><md-divider hide-xs></md-divider><div class="flex-gt-xs flex-xs-100 no-padding no-margin text-center"><div><md-icon class="mdi mdi-hotel md-48"></md-icon></div><div class="text-small"><span>{{::$ctrl.chRoomCtrl.room.maxOtherBeds}}</span><span ng-if="$ctrl.chRoomCtrl.room.maxOtherBeds == 1" translate="bed.otherbed"></span><span ng-if="$ctrl.chRoomCtrl.room.maxOtherBeds != 1" translate="bed.otherbeds"></span></div></div><md-divider hide-xs></md-divider><div class="flex-gt-xs flex-xs-100 no-padding no-margin text-center"><div style="height: 48px;line-height: 58px"><span class="md-title">{{::$ctrl.chRoomCtrl.room.bathMetres}} m²</span></div><div class="text-small"><span translate="room.bath.size"></span></div></div></div></div></div><h4 class="md-subhead no-margin-bottom"><strong translate="room.description"></strong></h4><div class="layout layout-wrap"><div flex><span ng-if="$ctrl.chRoomCtrl.room.description[$ctrl.chRoomCtrl.currentLang]"><span hm-read-more hm-text="{{$ctrl.chRoomCtrl.room.description[$ctrl.chRoomCtrl.currentLang]}}" hm-limit="50" hm-more-text="{{\'common.read.more\'|translate}}" hm-less-text="{{\'common.read.less\'|translate}}" hm-link-class="clickable text-primary"></span></span><span ng-if="!$ctrl.chRoomCtrl.room.description[$ctrl.chRoomCtrl.currentLang]"><span translate="{{::$ctrl.chRoomCtrl.room.roomType.descriptionKey}}"></span></span></div></div><div layout="column" ng-if="$ctrl.chRoomCtrl.room.metres"><h4 class="md-subhead no-margin-bottom"><strong translate="room.size"></strong></h4><div layout><strong translate="room.room"></strong>:&nbsp;<span>{{::$ctrl.chRoomCtrl.room.metres}} mq</span>&nbsp;<span>({{::($ctrl.chRoomCtrl.room.metres * 10.764 | number:2)}} sq ft.)</span></div><div layout><strong translate="service.type.BATHROOM"></strong>:&nbsp;<span>{{::$ctrl.chRoomCtrl.room.bathMetres}} mq</span>&nbsp;<span>({{::($ctrl.chRoomCtrl.room.bathMetres * 10.764 | number:2)}} sq ft.)</span></div></div><div layout="column"><strong ng-if="$ctrl.chRoomCtrl.room.bathIncluded" class="md-subhead no-margin-bottom"><span translate="room.bath.included"></span></strong><strong ng-if="!$ctrl.chRoomCtrl.room.bathIncluded" class="md-subhead no-margin-bottom"><span translate="room.bath.not.included"></span></strong></div><div layout="column" ng-if="$ctrl.chRoomCtrl.room.beds && $ctrl.chRoomCtrl.room.beds.length > 0"><h4 class="md-subhead no-margin-bottom"><strong ng-if="$ctrl.chRoomCtrl.room.beds.length == 1" translate="bed.bed.principal"></strong><strong ng-if="$ctrl.chRoomCtrl.room.beds.length != 1" translate="bed.beds.principal"></strong></h4><span ng-repeat="bed in $ctrl.chRoomCtrl.room.beds track by $index"><span>{{::bed.count}}&nbsp;x&nbsp;</span><span ng-if="bed.type" translate="bed.{{::bed.type}}"></span><span ng-if="!$last">,&nbsp;</span></span></div><div layout="column" ng-if="$ctrl.chRoomCtrl.room.otherBeds && $ctrl.chRoomCtrl.room.otherBeds.length > 0"><h4 class="md-subhead no-margin-bottom"><strong translate="bed.otherbeds"></strong></h4><div class="text-small"><span ng-if="$ctrl.chRoomCtrl.room.maxOtherBeds > 1"><span class="layout-padding no-padding-left" translate="reservation.info.max.otherBeds" translate-value-count="{{::$ctrl.chRoomCtrl.room.maxOtherBeds}}"></span></span><span ng-if="$ctrl.chRoomCtrl.room.maxOtherBeds == 1"><span class="layout-padding no-padding-left" translate="reservation.info.max.otherBed"></span></span><span class="text-lowercase" translate="common.choice.between"></span>:</div><md-list class="no-padding-bottom"><md-list-item ng-repeat="otherBed in $ctrl.chRoomCtrl.room.otherBeds track by $index"><div class="layout flex layout-padding no-padding"><div class="layout-column flex layout-padding-sm no-padding layout-align-center-start"><div class="no-padding-left"><span>{{otherBed.count}}&nbsp;x&nbsp;</span><strong translate="bed.{{otherBed.type}}"></strong>&nbsp;<span class="text-lowercase"><span translate="bed.max.person"></span>&nbsp;<span>{{otherBed.maxPerson}}</span>&nbsp;<span ng-if="otherBed.maxPerson > 1" translate="people.people"></span><span ng-if="otherBed.maxPerson <= 1" translate="people.person"></span><span translate="bed.per.bed"></span></span></div><div class="no-padding text-gray-light text-lowercase"><small ng-if="otherBed.people.adults"><span><span translate="people.adults"></span>&nbsp;(<span class="text-lowercase" translate="common.max"></span>&nbsp;{{otherBed.people.adults}}):</span><span ng-if="otherBed.adultsPrice">{{otherBed.adultsPrice|currency:\'€\'}}</span><span ng-if="!otherBed.adultsPrice" translate="common.free"></span></small><small ng-if="otherBed.people.boys"><span ng-if="otherBed.people.adults">&nbsp;-</span><span><span translate="people.boys"></span>&nbsp;(<span class="text-lowercase" translate="common.max"></span>&nbsp;{{otherBed.people.boys}}):</span><span ng-if="otherBed.boysPrice">{{otherBed.boysPrice|currency:\'€\'}}</span><span ng-if="!otherBed.boysPrice" translate="common.free"></span></small><small ng-if="otherBed.people.children"><span ng-if="otherBed.people.adults || otherBed.people.boys">&nbsp;-</span><span><span translate="people.children"></span>&nbsp;(<span class="text-lowercase" translate="common.max"></span>&nbsp;{{otherBed.people.children}}):</span><span ng-if="otherBed.childrenPrice">{{otherBed.childrenPrice|currency:\'€\'}}</span><span ng-if="!otherBed.childrenPrice" translate="common.free"></span></small><small ng-if="otherBed.people.kids"><span ng-if="otherBed.people.adults || otherBed.people.boys || otherBed.people.children">&nbsp;-</span><span><span translate="people.kids"></span>&nbsp;(<span class="text-lowercase" translate="common.max"></span>&nbsp;{{otherBed.people.kids}}):</span><span ng-if="otherBed.kidsPrice">{{otherBed.kidsPrice|currency:\'€\'}}</span><span ng-if="!otherBed.kidsPrice" translate="common.free"></span></small></div><div class="no-padding-top no-padding-left text-gray-light text-italic" ng-switch="otherBed.frequency"><small translate="common.price.is.intend"></small><small class="text-lowercase" ng-switch-when="DAILY|NIGHTLY" ng-switch-when-separator="|">&nbsp;<span translate="service.type.payment.NIGHTLY"></span></small><small class="text-lowercase" ng-switch-when="LUMP_SUM">&nbsp;<span translate="service.type.payment.LUMP_SUM"></span></small></div></div></div></md-list-item></md-list></div><div layout="column"><h4 class="md-subhead no-margin-bottom"><strong translate="reservation.guest.info"></strong></h4><div class="md-padding no-padding-left"><div class="md-padding no-padding-left no-padding-top"><span translate="room.people.host"></span></div><ul><li><strong>{{$ctrl.chRoomCtrl.room.guestsCount.standard}}&nbsp;</strong><strong class="text-lowercase" ng-if="$ctrl.chRoomCtrl.room.guestsCount.standard == 1" translate="people.person.beds"></strong><strong class="text-lowercase" ng-if="$ctrl.chRoomCtrl.room.guestsCount.standard != 1" translate="people.people.beds"></strong><span class="text-lowercase">&nbsp;(<span ng-if="$ctrl.chRoomCtrl.room.people.boys || $ctrl.chRoomCtrl.room.people.children || $ctrl.chRoomCtrl.room.people.kids"><span translate="common.choice.between"></span>&nbsp;</span><ch-people-summary class="text-lowercase" people="$ctrl.chRoomCtrl.room.people"></ch-people-summary>)</span></li></ul><ul ng-if="$ctrl.chRoomCtrl.room.guestsCount.extra"><li><strong>{{$ctrl.chRoomCtrl.room.guestsCount.extra}}&nbsp;</strong><strong class="text-lowercase" ng-if="$ctrl.chRoomCtrl.room.guestsCount.extra == 1" translate="people.person.extra.beds"></strong><strong class="text-lowercase" ng-if="$ctrl.chRoomCtrl.room.guestsCount.extra != 1" translate="people.people.extra.beds"></strong><span class="text-lowercase">&nbsp;(<span ng-if="$ctrl.chRoomCtrl.room.extraPeople.boys || $ctrl.chRoomCtrl.room.extraPeople.children || $ctrl.chRoomCtrl.room.extraPeople.kids"><span translate="common.choice.between"></span>&nbsp;</span><ch-people-summary class="text-lowercase" people="$ctrl.chRoomCtrl.room.extraPeople"></ch-people-summary>)</span></li></ul><div ng-if="$ctrl.chRoomCtrl.room.people.boys || $ctrl.chRoomCtrl.room.people.children || $ctrl.chRoomCtrl.room.people.kids || $ctrl.chRoomCtrl.room.extraPeople.boys || $ctrl.chRoomCtrl.room.extraPeople.children || $ctrl.chRoomCtrl.room.extraPeople.kids" class="md-padding no-padding-left no-padding-bottom"><em translate="error.room.guest.not.selected"></em></div></div><div><h5 class="md-body-2 md-margin no-margin-bottom no-margin-left no-margin-top text-gray-light"><strong translate="people.adults"></strong></h5><div><i translate="people.adults.policy" translate-value-age="{{::(18)}}"></i></div><div><span translate="common.capacity.max"></span>:&nbsp;<span>{{::$ctrl.chRoomCtrl.room.people.adults}}</span></div></div><div ng-switch="$ctrl.chRoomCtrl.room.people.boys"><h5 class="md-body-2 md-margin no-margin-bottom no-margin-left text-gray-light"><strong translate="people.boys"></strong></h5><div><i translate="people.boys.policy" translate-values="{min: 13, max: 17}"></i></div><div><span translate="common.capacity.max"></span>:&nbsp;<i ng-switch-when="0" translate="common.none.male"></i><span ng-switch-default>{{::$ctrl.chRoomCtrl.room.people.boys}}</span></div></div><div ng-switch="$ctrl.chRoomCtrl.room.people.children"><h5 class="md-body-2 md-margin no-margin-bottom no-margin-left text-gray-light"><strong translate="people.children"></strong></h5><div><i translate="people.children.policy" translate-values="{min: 3, max: 12}"></i></div><div><span translate="common.capacity.max"></span>:&nbsp;<i ng-switch-when="0" translate="common.none.male"></i><span ng-switch-default>{{::$ctrl.chRoomCtrl.room.people.children}}</span></div></div><div ng-switch="$ctrl.chRoomCtrl.room.people.kids"><h5 class="md-body-2 md-margin no-margin-bottom no-margin-left text-gray-light"><strong translate="people.kids"></strong></h5><div><i translate="people.kids.policy" translate-values="{min: 0, max: 2}"></i></div><div><span translate="common.capacity.max"></span>:&nbsp;<i ng-switch-when="0" translate="common.none.male"></i><span ng-switch-default>{{::$ctrl.chRoomCtrl.room.people.kids}}</span></div></div></div><div layout="column" ng-if="::($ctrl.chRoomCtrl.$$includedServices && $ctrl.chRoomCtrl.$$includedServices.length > 0)"><h4 class="md-subhead no-margin-bottom"><strong translate="room.facilities"></strong></h4><div layout layout-wrap><div class="flex-gt-sm-50 flex-100" ng-repeat="service in ::$ctrl.chRoomCtrl.$$includedServices track by service.id" ng-switch="service.type.nameKey"><md-icon class="mdi mdi-check md-18 text-success"></md-icon><span translate="{{::service.type.nameKey}}"></span></div></div></div><div layout="column" ng-if="::($ctrl.chRoomCtrl.$$bookableServices && $ctrl.chRoomCtrl.$$bookableServices.length > 0)"><h4 class="md-subhead no-margin-bottom"><strong translate="common.service.on.demand"></strong></h4><div layout layout-wrap><div class="flex-gt-sm-50 flex-100" ng-repeat="service in ::$ctrl.chRoomCtrl.$$bookableServices track by service.id" ng-switch="service.paymentType"><md-icon class="mdi mdi-check md-18 text-success"></md-icon><span translate="{{::service.type.nameKey}}"></span><span ng-switch-when="FREE">(<span translate="payment.free"></span>)</span><span ng-switch-default class="text-lowercase"><small ng-repeat="paymentOpt in ::service.paymentOptions track by $index"><span ng-if="paymentOpt.size == \'PER_ADULT\' || paymentOpt.size == \'SINGLE\'">(<span>{{paymentOpt.amount.finalAmount|chCurrency}}</span><span ng-if="service.frequency == \'DAILY\'">/<span translate="date.day"></span></span><span ng-if="service.frequency == \'MONTHLY\'">/<span translate="date.month"></span></span><span ng-if="service.frequency == \'YEARLY\'">/<span translate="date.year"></span></span><span ng-if="paymentOpt.size == \'PER_ADULT\'">/<span translate="people.person"></span></span>)</span></small></span></div></div></div><div layout layout-xs="column" layout-padding layout-align="center center" class="no-padding-bottom"><md-button class="row-mini button-mini auto-height text-initial" ng-click="$ctrl.$toggleRates(true)" aria-label="Open room rates"><strong class="text-center text-success" ng-clas="{\'no-padding\': !$ctrl.$mdMedia(\'gt-sm\')}"><span><span translate="reservation.dont.miss.room"></span>.&nbsp;</span><span translate="reservation.book.now.holiday"></span></strong></md-button></div></div><div class="text-center"><md-button class="row-mini button-mini auto-height text-gray-light text-initial" ng-click="$ctrl.$toggleInfo(false)" aria-label="Close room info"><md-icon class="mdi mdi-chevron-up text-gray-light md-18 material-icon"></md-icon><span translate="common.hide"></span></md-button></div></div>');
    $templateCache.put("/tpls/room/room-rate.tpl", '<div ng-switch="$ctrl.rate.type"><md-list-item class="no-padding secondary-button-padding"><div class="md-list-item-text no-padding" layout-xs="column" layout-sm="column" layout-gt-sm="row" layout-padding flex><div flex layout layout-wrap layout-align="center center" ng-class="{\'no-padding-bottom\': !$ctrl.$mdMedia(\'gt-sm\')}"><md-button class="md-fab md-micro hide show-gt-sm" ng-click="$ctrl.$toggleInfo()" aria-label="Show rate info"><md-icon class="mdi md-18 text-white" ng-class="{\'mdi-chevron-down\': !$ctrl.$$showInfo, \'mdi-chevron-up\': $ctrl.$$showInfo}"></md-icon></md-button><div class="clickable flex layout" layout-xs="column" ng-class="::{\'layout-padding\': $ctrl.$mdMedia(\'gt-xs\')}" ng-click="$ctrl.$toggleInfo()" aria-label="Rate info"><div layout="column" layout-align="center center"><div ng-class="{\'text-warn\': $ctrl.rate.type == \'STANDARD\' && $ctrl.rate.cancellationPolicy.flexible, \'text-success\': $ctrl.rate.type == \'STANDARD\' && !$ctrl.rate.cancellationPolicy.flexible, \n' + '\t\t\t\t\t\t\t\'text-blue-sea\': $ctrl.rate.type == \'NOT_REFUNDABLE\'}" class="layout-align-start-center layout-column row-mini layout-padding"><small class="no-padding" ng-if="$ctrl.$$nights != 1"><span translate="reservation.price.for.nights" translate-values="::{count: $ctrl.$$nights}"></span></small><small class="no-padding" ng-if="$ctrl.$$nights == 1"><span translate="reservation.price.for.one.night"></span></small><small class="no-padding" ng-if="$ctrl.rate.amount.initialAmount > 0 && $ctrl.rate.amount.initialAmount > $ctrl.rate.amount.finalAmount"><span class="text-initial" translate="common.from"></span><i><del>{{$ctrl.rate.amount.initialAmount|chCurrency}}</del></i></small><span class="no-padding md-title" ng-switch-when="STANDARD"><strong>{{$ctrl.rate.amount.finalAmount|chCurrency}}</strong></span><span class="no-padding md-title" ng-switch-when="NOT_REFUNDABLE"><strong>{{$ctrl.rate.amount.finalAmount|chCurrency}}</strong></span></div></div><div layout="column" layout-align="center" class="row-mini g"><div layout layout-align="center center" layout-align-gt-sm="start end"><span ng-switch-when="STANDARD" layout><span ng-if="$ctrl.rate.cancellationPolicy.flexible" class="row-mini text-warn" translate="reservation.rate.flexible"></span><span ng-if="!$ctrl.rate.cancellationPolicy.flexible" class="row-mini text-success" translate="reservation.cancellation.free"></span></span><span ng-switch-when="NOT_REFUNDABLE" class="row-mini text-blue-sea" translate="ratesheet.rate.type.notRefundable.abbr"></span><span><md-icon class="mdi mdi-information-outline md-14 material-icons" ng-class="{\'text-warn\': $ctrl.rate.type == \'STANDARD\' && $ctrl.rate.cancellationPolicy.flexible, \n' + '\t\t\t\t\t\t\t\t\'text-success\': $ctrl.rate.type == \'STANDARD\' && !$ctrl.rate.cancellationPolicy.flexible, \'text-blue-sea\': $ctrl.rate.type == \'NOT_REFUNDABLE\'}" aria-hidden="true"></md-icon></span></div><div layout layout-align="center center" layout-align-gt-sm="start end" class="text-gray-light"><small ng-switch-when="STANDARD" layout><span ng-if="$ctrl.rate.cancellationPolicy.flexible"><span translate="reservation.rate.flexible.info.label"></span></span><span ng-if="!$ctrl.rate.cancellationPolicy.flexible"><span translate="reservation.rate.free.info.label"></span></span></small><small ng-switch-when="NOT_REFUNDABLE"><span translate="reservation.rate.not.refundable.info.label"></span></small></div><div ng-if="$ctrl.$$promotion" ng-switch="$ctrl.$$promotion.promotionType" class="layout-gt-sm-row layout-wrap" ng-class="{\'text-center\': !$ctrl.$mdMedia(\'gt-sm\')}"><span ng-switch-when="STANDARD" class="label flex-xs flex-sm label-inline-block text-wrap bg-info"><ch-truncate text="{{$ctrl.$$promotion.name[$ctrl.chRoomCtrl.localeIso]}}" max-length="20" suffix="..."></ch-truncate>&nbsp;<span ng-if="$ctrl.$$promotion.discount.type==\'PERCENTAGE\'">-{{$ctrl.$$promotion.discount.finalAmount}}%</span><span ng-if="$ctrl.$$promotion.discount.type==\'PRICE\'">-{{$ctrl.$$promotion.discount.finalAmount|chCurrency}}</span></span><span ng-switch-when="MINIMUM_STAY" class="label flex-xs flex-sm label-inline-block text-wrap bg-primary-light"><span translate="promotions.promotion.label.minstay.nights" translate-value-count="{{$ctrl.$$promotion.minStay}}"></span>&nbsp;<span ng-if="$ctrl.$$promotion.discount.type==\'PERCENTAGE\'">-{{$ctrl.$$promotion.discount.finalAmount}}%</span><span ng-if="$ctrl.$$promotion.discount.type==\'PRICE\'">-{{$ctrl.$$promotion.discount.finalAmount|chCurrency}}</span></span><span ng-switch-when="BOOK_TODAY" class="label flex-xs flex-sm label-inline-block text-wrap bg-primary"><span translate="promotions.promotion.label.only.today"></span>!&nbsp;<span ng-if="$ctrl.$$promotion.discount.type==\'PERCENTAGE\'">-{{$ctrl.$$promotion.discount.finalAmount}}%</span><span ng-if="$ctrl.$$promotion.discount.type==\'PRICE\'">-{{$ctrl.$$promotion.discount.finalAmount|chCurrency}}</span></span><span ng-switch-when="EARLY_BOOKING" class="label flex-xs flex-sm label-inline-block text-wrap bg-success"><span translate="promotions.early"></span>&nbsp;<span ng-if="$ctrl.$$promotion.discount.type==\'PERCENTAGE\'">-{{$ctrl.$$promotion.discount.finalAmount}}%</span><span ng-if="$ctrl.$$promotion.discount.type==\'PRICE\'">-{{$ctrl.$$promotion.discount.finalAmount|chCurrency}}</span></span><span ng-switch-when="LAST_MINUTE" class="label flex-xs flex-sm label-inline-block text-wrap bg-blue-sea"><span translate="promotions.last.minute"></span>&nbsp;<span ng-if="$ctrl.$$promotion.discount.type==\'PERCENTAGE\'">-{{$ctrl.$$promotion.discount.finalAmount}}%</span><span ng-if="$ctrl.$$promotion.discount.type==\'PRICE\'">-{{$ctrl.$$promotion.discount.finalAmount|chCurrency}}</span></span><span ng-switch-when="LAST_SECOND" class="label flex-xs flex-sm label-inline-block text-wrap bg-warn"><span translate="promotions.last.second"></span>&nbsp;<span ng-if="$ctrl.$$promotion.discount.type==\'PERCENTAGE\'">-{{$ctrl.$$promotion.discount.finalAmount}}%</span><span ng-if="$ctrl.$$promotion.discount.type==\'PRICE\'">-{{$ctrl.$$promotion.discount.finalAmount|chCurrency}}</span></span></div><div ng-if="$ctrl.rate.type == \'STANDARD\' && ($ctrl.$$promotion.onArrival || !$ctrl.rate.cancellationPolicy.flexible)" class="md-margin no-margin-left no-margin-top" ng-class="{\'text-center\': !$ctrl.$mdMedia(\'gt-sm\')}"><span class="label label-sm bg-success"><span translate="reservation.no.advance.payment"></span></span></div></div></div></div><div layout layout-align="end center" ng-class="{\'no-padding-top\': !$ctrl.$mdMedia(\'gt-sm\')}"><div ng-if="!$ctrl.rate.count || $ctrl.rate.count <= 0" class="layout-column flex"><md-button class="border-radius only-border" ng-class="{\'border-warn text-warn\': $ctrl.$$totalCounter.actual > 0 && $ctrl.$$counter.actual > 0 && $ctrl.rate.type == \'STANDARD\' && $ctrl.rate.cancellationPolicy.flexible, \'border-success text-success\': $ctrl.$$totalCounter.actual > 0 && $ctrl.$$counter.actual > 0 && $ctrl.rate.type == \'STANDARD\' && !$ctrl.rate.cancellationPolicy.flexible, \n' + '\t\t\t\t\t\t\t\'border-blue-sea text-blue-sea\': $ctrl.$$totalCounter.actual > 0 && $ctrl.$$counter.actual > 0 && $ctrl.rate.type == \'NOT_REFUNDABLE\', \'text-gray-medium\': $ctrl.$$totalCounter.actual <= 0 || $ctrl.$$counter.actual <= 0}" aria-label="Add room" ng-disabled="$ctrl.$$totalCounter.actual <= 0 || $ctrl.$$counter.actual <= 0" ng-click="$ctrl.$selectRate()"><span translate="common.select"></span></md-button></div><div ng-if="$ctrl.rate.count && $ctrl.rate.count > 0" flex><div class="layout-align-center-center layout-align-gt-sm-end-center layout-row"><small class="text-bold text-gray-light" ng-if="$ctrl.$$totalCounter.actual > 0 && $ctrl.$$counter.actual > 0" translate="room.add.other.one"></small><small class="text-bold text-success text-center" ng-class="{\'text-warn\': $ctrl.rate.type == \'STANDARD\' && $ctrl.rate.cancellationPolicy.flexible, \'text-success\': $ctrl.rate.type == \'STANDARD\' && !$ctrl.rate.cancellationPolicy.flexible, \n' + '\t\t\t  \t\t\t\t\'text-blue-sea\': $ctrl.rate.type == \'NOT_REFUNDABLE\'}" ng-if="$ctrl.$$totalCounter.actual <= 0 || $ctrl.$$counter.actual <= 0" translate="room.last.rate.selected"></small></div><div class="layout-align-center-center layout-align-gt-sm-end-center layout-row"><ch-counter ng-model="$ctrl.rate.count" min="0" btn-class="md-icon-button only-border" btn-active-class="{{$ctrl.rate.type == \'STANDARD\' ? $ctrl.rate.cancellationPolicy.flexible ? \'border-warn\' : \'border-success\' : \'border-blue-sea\'}}" icon-active-class="{{$ctrl.rate.type == \'STANDARD\' ? $ctrl.rate.cancellationPolicy.flexible ? \'text-warn\' : \'text-success\' : \'text-blue-sea\'}}" plus-disabled="$ctrl.$$totalCounter.actual <= 0 || $ctrl.$$counter.actual <= 0" on-plus="$ctrl.$addRate()" on-minus="$ctrl.$removeRate()"></ch-counter></div></div></div></div></md-list-item><div class="layout-row layout-wrap layout-padding-sm text-center"><span ng-if="$ctrl.isBestRate" class="text-success md-subhead"><md-icon class="mdi mdi-check-all text-success animated infinite tada"></md-icon><strong>&nbsp;<span translate="reservation.bestHotelRate.description"></span></strong></span><span ng-if="!$ctrl.isBestRate && $ctrl.$$promotion" ng-switch="$ctrl.$$promotion.promotionType" class="layout-row layout-wrap"><span ng-switch-when="STANDARD|EARLY_BOOKING|MINIMUM_STAY" ng-switch-when-separator="|" class="text-wrap" ng-class="{\'text-info\': $ctrl.$$promotion.promotionType == \'STANDARD\', \'text-primary-light\': $ctrl.$$promotion.promotionType == \'EARLY_BOOKING\',  \'text-success\': $ctrl.$$promotion.promotionType == \'MINIMUM_STAY\'}"><md-icon class="mdi mdi-alarm-check animated infinite tada" ng-class="{\'text-info\': $ctrl.$$promotion.promotionType == \'STANDARD\', \'text-primary-light\': $ctrl.$$promotion.promotionType == \'EARLY_BOOKING\',  \'text-success\': $ctrl.$$promotion.promotionType == \'MINIMUM_STAY\'}"></md-icon><span>&nbsp;<span translate="reservation.promotion.STANDARD.description"></span></span></span><span ng-switch-when="BOOK_TODAY" class="text-wrap text-primary"><md-icon class="mdi mdi-alarm-check text-primary animated infinite tada"></md-icon><span>&nbsp;<span translate="reservation.promotion.BOOK_TODAY.description"></span></span></span><span ng-switch-when="LAST_MINUTE" class="text-wrap text-blue-sea"><md-icon class="mdi mdi-alarm-check text-blue-sea animated infinite tada"></md-icon><span>&nbsp;<span translate="reservation.promotion.LAST_MINUTE.description"></span></span></span><span ng-switch-when="LAST_SECOND" class="text-wrap text-warn"><md-icon class="mdi mdi-alarm-check text-warn animated infinite tada"></md-icon><span>&nbsp;<span translate="reservation.promotion.LAST_SECOND.description"></span></span></span></span><span ng-if="!$ctrl.isBestRate && !$ctrl.$$promotion && $ctrl.rate.type == \'STANDARD\' && !$ctrl.rate.cancellationPolicy.flexible" class="text-success"><md-icon class="mdi mdi-heart-pulse text-success animated infinite tada"></md-icon><span>&nbsp;<span translate="reservation.rate.free.text.description"></span></span></span><span ng-if="!$ctrl.isBestRate && !$ctrl.$$promotion && $ctrl.rate.type == \'NOT_REFUNDABLE\' && $ctrl.rate.savingAmount.finalAmount" class="text-blue-sea"><md-icon class="mdi mdi-auto-fix text-blue-sea animated infinite tada"></md-icon><span>&nbsp;<span translate="reservation.rate.not.refundable.text.description" translate-value-price="{{$ctrl.rate.savingAmount.finalAmount|chCurrency}}"></span></span></span></div><div id="{{\'ch-room-\' + $ctrl.chRoomCtrl.$$index + \'-rates-\' + $ctrl.$$index}}" ng-show="$ctrl.$$showInfo" layout="column" layout-padding ng-class="{\'animated fadeIn\': $ctrl.$$showInfo}" class="text-gray-light text-small"><div><div class="md-margin no-margin-top no-margin-left no-margin-right"><ch-payment-policy-info rate-type="$ctrl.rate.type" cancellation-policy="$ctrl.rate.cancellationPolicy" city="$ctrl.chRoomCtrl.city" offset="$ctrl.chRoomCtrl.offset"></ch-payment-policy-info></div><div layout="column"><span><span ng-if="$ctrl.$$nights == 1" translate="reservation.rates.info.night"></span><span ng-if="$ctrl.$$nights > 1" translate="reservation.rates.info.nights" translate-value-count="{{$ctrl.$$nights}}"></span></span><span ng-if="$ctrl.$$vatTax"><strong><span translate="common.included"></span>:</strong>&nbsp;{{$ctrl.$$vatTax}}%&nbsp;<span translate="billing.vat.tax"></span></span><span ng-if="$ctrl.$$cityTax"><strong><span translate="common.included.not"></span>:</strong>&nbsp;{{$ctrl.$$cityTax|chCurrency}}&nbsp;<span translate="reservation.cityTax.description"></span></span></div><div ng-if="$ctrl.rate.type == \'STANDARD\' && $ctrl.$$promotion.onArrival" class="bg-success text-white layout-margin"><md-icon md-font-set="fas" class="fas fa-h-square md-18 text-white"></md-icon><span translate="reservation.policy.payment.onArrival"></span></div><div ng-if="$ctrl.paymentSettings" layout="column" class="md-padding no-padding-left"><strong><span translate="payment.methods.accepted"></span>:</strong><span ng-if="$ctrl.$$promotion.paymentMethod.length" ng-repeat="paymentMethod in $ctrl.$$promotion.paymentMethod track by $index" ng-switch="paymentMethod.type" class="layout-margin ng-scope layout-wrap layout-row layout-align-start-center"><span ng-switch-when="PAYPAL" ng-if="$ctrl.paymentSettings.paypal" class="no-margin-left"><md-icon class="pf pf-paypal md-18"></md-icon><md-tooltip><span translate="payment.type.PAYPAL"></span></md-tooltip></span><span ng-switch-when="CREDIT_CARD" ng-if="$ctrl.paymentSettings.creditCards.length"><span ng-repeat="type in $ctrl.paymentSettings.creditCards track by $index" ng-switch="type.circuit"><span ng-switch-when="VISA" class="layout-margin no-margin-left"><md-icon class="pf pf-visa md-18"></md-icon><md-tooltip><span translate="payment.type.carrier.VISA"></span></md-tooltip></span><span ng-switch-when="MASTERCARD" class="layout-margin no-margin-left"><md-icon class="pf pf-mastercard md-18"></md-icon><md-tooltip><span translate="payment.type.carrier.MASTERCARD"></span></md-tooltip></span><span ng-switch-when="AMEX" class="layout-margin no-margin-left"><md-icon class="pf pf-american-express md-18"></md-icon><md-tooltip><span translate="payment.type.carrier.AMEX"></span></md-tooltip></span><span ng-switch-when="BIT_COIN" class="layout-margin no-margin-left"><md-icon class="pf pf-bitcoin md-18"></md-icon><md-tooltip><span translate="payment.type.carrier.BIT_COIN"></span></md-tooltip></span><span ng-switch-when="CARTA_SI" class="layout-margin no-margin-left"><md-icon class="pf pf-carta-si md-18"></md-icon><md-tooltip><span translate="payment.type.carrier.CARTA_SI"></span></md-tooltip></span><span ng-switch-when="DINERS_CLUB" class="layout-margin no-margin-left"><md-icon class="pf pf-diners md-18"></md-icon><md-tooltip><span translate="payment.type.carrier.DINERS_CLUB"></span></md-tooltip></span><span ng-switch-when="DISCOVER" class="layout-margin no-margin-left"><md-icon class="pf pf-discover md-18"></md-icon><md-tooltip><span translate="payment.type.carrier.DISCOVER"></span></md-tooltip></span><span ng-switch-when="JCB" class="layout-margin no-margin-left"><md-icon class="pf pf-jcb md-18"></md-icon><md-tooltip><span translate="payment.type.carrier.JCB"></span></md-tooltip></span><span ng-switch-when="UNION_PAY" class="layout-margin no-margin-left"><md-icon class="pf pf-unionpay md-18"></md-icon><md-tooltip><span translate="payment.type.carrier.UNION_PAY"></span></md-tooltip></span></span></span><span ng-switch-when="OTHER_CARD" ng-if="$ctrl.paymentSettings.otherCards.length"><span ng-repeat="type in $ctrl.paymentSettings.otherCards track by $index" ng-switch="type.circuit"><span ng-switch-when="VISA_ELECTRON" class="layout-margin no-margin-left"><md-icon class="pf pf-visa-electron md-18"></md-icon><md-tooltip><span translate="payment.type.carrier.VISA_ELECTRON"></span></md-tooltip></span><span ng-switch-when="V_PAY" class="layout-margin no-margin-left"><md-icon class="pf pf-visa md-18"></md-icon><md-tooltip><span translate="payment.type.carrier.V_PAY"></span></md-tooltip></span><span ng-switch-when="MAESTRO" class="layout-margin no-margin-left"><md-icon class="pf pf-maestro md-18"></md-icon><md-tooltip><span translate="payment.type.carrier.MAESTRO"></span></md-tooltip></span><span ng-switch-when="CIRRUS" class="layout-margin no-margin-left"><md-icon class="pf pf-cirrus md-18"></md-icon><md-tooltip><span translate="payment.type.carrier.CIRRUS"></span></md-tooltip></span><span ng-switch-when="POSTEPAY" class="layout-margin no-margin-left"><md-icon class="pf pf-postepay md-18"></md-icon><md-tooltip><span translate="payment.type.carrier.POSTEPAY"></span></md-tooltip></span><span ng-switch-when="APPLE_PAY" class="layout-margin no-margin-left"><md-icon class="pf pf-apple-pay md-18"></md-icon><md-tooltip><span translate="payment.type.carrier.APPLE_PAY"></span></md-tooltip></span><span ng-switch-when="PAGSEGURO" class="layout-margin no-margin-left"><md-icon class="pf pf-pagseguro md-18"></md-icon><md-tooltip><span translate="payment.type.carrier.PAGSEGURO"></span></md-tooltip></span><span ng-switch-when="BANCONTACT" class="layout-margin no-margin-left"><md-icon class="pf pf-bancontact-mister-cash md-18"></md-icon><md-tooltip><span translate="payment.type.carrier.BANCONTACT"></span></md-tooltip></span><span ng-switch-when="BANCOMAT" class="layout-margin no-margin-left"><md-icon class="pf pf-card md-18"></md-icon><md-tooltip><span translate="payment.type.carrier.BANCOMAT"></span></md-tooltip></span></span></span></span><span ng-if="!$ctrl.$$promotion.paymentMethod" class="layout-margin ng-scope layout-wrap layout-row layout-align-start-center"><span ng-if="$ctrl.paymentSettings.paypal" class="layout-margin no-margin-left"><md-icon class="pf pf-paypal md-18"></md-icon><md-tooltip><span translate="payment.type.PAYPAL"></span></md-tooltip></span><span ng-if="$ctrl.paymentSettings.creditCards.length" class="no-margin"><span ng-repeat="type in $ctrl.paymentSettings.creditCards track by $index" ng-switch="type.circuit"><span ng-switch-when="VISA" class="layout-margin no-margin-left"><md-icon class="pf pf-visa md-18"></md-icon><md-tooltip><span translate="payment.type.carrier.VISA"></span></md-tooltip></span><span ng-switch-when="MASTERCARD" class="layout-margin no-margin-left"><md-icon class="pf pf-mastercard md-18"></md-icon><md-tooltip><span translate="payment.type.carrier.MASTERCARD"></span></md-tooltip></span><span ng-switch-when="AMEX" class="layout-margin no-margin-left"><md-icon class="pf pf-american-express md-18"></md-icon><md-tooltip><span translate="payment.type.carrier.AMEX"></span></md-tooltip></span><span ng-switch-when="BIT_COIN" class="layout-margin no-margin-left"><md-icon class="pf pf-bitcoin md-18"></md-icon><md-tooltip><span translate="payment.type.carrier.BIT_COIN"></span></md-tooltip></span><span ng-switch-when="CARTA_SI" class="layout-margin no-margin-left"><md-icon class="pf pf-carta-si md-18"></md-icon><md-tooltip><span translate="payment.type.carrier.CARTA_SI"></span></md-tooltip></span><span ng-switch-when="DINERS_CLUB" class="layout-margin no-margin-left"><md-icon class="pf pf-diners md-18"></md-icon><md-tooltip><span translate="payment.type.carrier.DINERS_CLUB"></span></md-tooltip></span><span ng-switch-when="DISCOVER" class="layout-margin no-margin-left"><md-icon class="pf pf-discover md-18"></md-icon><md-tooltip><span translate="payment.type.carrier.DISCOVER"></span></md-tooltip></span><span ng-switch-when="JCB" class="layout-margin no-margin-left"><md-icon class="pf pf-jcb md-18"></md-icon><md-tooltip><span translate="payment.type.carrier.JCB"></span></md-tooltip></span><span ng-switch-when="UNION_PAY" class="layout-margin no-margin-left"><md-icon class="pf pf-unionpay md-18"></md-icon><md-tooltip><span translate="payment.type.carrier.UNION_PAY"></span></md-tooltip></span></span></span><span ng-if="$ctrl.paymentSettings.otherCards.length" class="no-margin"><span ng-repeat="type in $ctrl.paymentSettings.otherCards track by $index" ng-switch="type.circuit"><span ng-switch-when="VISA_ELECTRON" class="layout-margin no-margin-left"><md-icon class="pf pf-visa-electron md-18"></md-icon><md-tooltip><span translate="payment.type.carrier.VISA_ELECTRON"></span></md-tooltip></span><span ng-switch-when="V_PAY" class="layout-margin no-margin-left"><md-icon class="pf pf-visa md-18"></md-icon><md-tooltip><span translate="payment.type.carrier.V_PAY"></span></md-tooltip></span><span ng-switch-when="MAESTRO" class="layout-margin no-margin-left"><md-icon class="pf pf-maestro md-18"></md-icon><md-tooltip><span translate="payment.type.carrier.MAESTRO"></span></md-tooltip></span><span ng-switch-when="CIRRUS" class="layout-margin no-margin-left"><md-icon class="pf pf-cirrus md-18"></md-icon><md-tooltip><span translate="payment.type.carrier.CIRRUS"></span></md-tooltip></span><span ng-switch-when="POSTEPAY" class="layout-margin no-margin-left"><md-icon class="pf pf-postepay md-18"></md-icon><md-tooltip><span translate="payment.type.carrier.POSTEPAY"></span></md-tooltip></span><span ng-switch-when="APPLE_PAY" class="layout-margin no-margin-left"><md-icon class="pf pf-apple-pay md-18"></md-icon><md-tooltip><span translate="payment.type.carrier.APPLE_PAY"></span></md-tooltip></span><span ng-switch-when="PAGSEGURO" class="layout-margin no-margin-left"><md-icon class="pf pf-pagseguro md-18"></md-icon><md-tooltip><span translate="payment.type.carrier.PAGSEGURO"></span></md-tooltip></span><span ng-switch-when="BANCONTACT" class="layout-margin no-margin-left"><md-icon class="pf pf-bancontact-mister-cash md-18"></md-icon><md-tooltip><span translate="payment.type.carrier.BANCONTACT"></span></md-tooltip></span><span ng-switch-when="BANCOMAT" class="layout-margin no-margin-left"><md-icon class="pf pf-card md-18"></md-icon><md-tooltip><span translate="payment.type.carrier.BANCOMAT"></span></md-tooltip></span></span></span></span></div></div><div><h4 class="md-body-1 no-margin-bottom no-margin-top"><strong translate="reservation.rates.daily.details"></strong></h4><div layout layout-wrap layout-padding-sm><div ng-repeat="dailyRate in $ctrl.rate.dailyRates track by $index" layout="column" layout-padding-sm layout-align="start center"><strong class="no-padding-bottom">{{dailyRate.date|date:"shortDate"}}</strong><div class="no-padding-bottom row-mini" layout="column" layout-align="center center"><div ng-if="dailyRate.promotion" ng-switch="dailyRate.promotion.promotionType"><span ng-switch-when="STANDARD" class="label label-xs bg-info"><ch-truncate text="{{dailyRate.promotion.name[$ctrl.chRoomCtrl.localeIso]}}" max-length="20" suffix="..."></ch-truncate>&nbsp;<span ng-if="dailyRate.promotion.discount.type==\'PERCENTAGE\'">-{{dailyRate.promotion.discount.finalAmount}}%</span><span ng-if="dailyRate.promotion.discount.type==\'PRICE\'">-{{dailyRate.promotion.discount.finalAmount|chCurrency}}</span></span><span ng-switch-when="MINIMUM_STAY" class="label label-xs bg-primary-light"><span translate="promotions.promotion.label.minstay.nights" translate-value-count="{{promotion.minStay}}"></span>&nbsp;<span ng-if="dailyRate.promotion.discount.type==\'PERCENTAGE\'">-{{dailyRate.promotion.discount.finalAmount}}%</span><span ng-if="dailyRate.promotion.discount.type==\'PRICE\'">-{{dailyRate.promotion.discount.finalAmount|chCurrency}}</span></span><span ng-switch-when="BOOK_TODAY" class="label label-xs bg-primary"><span translate="promotions.promotion.label.only.today"></span>!&nbsp;<span ng-if="dailyRate.promotion.discount.type==\'PERCENTAGE\'">-{{dailyRate.promotion.discount.finalAmount}}%</span><span ng-if="dailyRate.promotion.discount.type==\'PRICE\'">-{{dailyRate.promotion.discount.finalAmount|chCurrency}}</span></span><span ng-switch-when="EARLY_BOOKING" class="label label-xs bg-success"><span translate="promotions.early"></span>&nbsp;<span ng-if="dailyRate.promotion.discount.type==\'PERCENTAGE\'">-{{dailyRate.promotion.discount.finalAmount}}%</span><span ng-if="dailyRate.promotion.discount.type==\'PRICE\'">-{{dailyRate.promotion.discount.finalAmount|chCurrency}}</span></span><span ng-switch-when="LAST_MINUTE" class="label label-xs bg-blue-sea"><span translate="promotions.last.minute"></span>&nbsp;<span ng-if="dailyRate.promotion.discount.type==\'PERCENTAGE\'">-{{dailyRate.promotion.discount.finalAmount}}%</span><span ng-if="dailyRate.promotion.discount.type==\'PRICE\'">-{{dailyRate.promotion.discount.finalAmount|chCurrency}}</span></span><span ng-switch-when="LAST_SECOND" class="label label-xs bg-warn"><span translate="promotions.last.second"></span>&nbsp;<span ng-if="dailyRate.promotion.discount.type==\'PERCENTAGE\'">-{{dailyRate.promotion.discount.finalAmount}}%</span><span ng-if="dailyRate.promotion.discount.type==\'PRICE\'">-{{dailyRate.promotion.discount.finalAmount|chCurrency}}</span></span></div><small class="text-gray-light" ng-if="dailyRate.amount.initialAmount > 0 && dailyRate.amount.initialAmount > dailyRate.amount.finalAmount"><i><del>{{dailyRate.amount.initialAmount|chCurrency}}</del></i></small></div><div class="no-padding-top">{{dailyRate.amount.finalAmount|chCurrency}}</div></div></div></div><div class="no-padding"><div class="md-margin no-margin-top no-margin-left no-margin-right"><ch-cancellation-policy-info rate-type="$ctrl.rate.type" cancellation-policy="$ctrl.rate.cancellationPolicy" city="$ctrl.chRoomCtrl.city" offset="$ctrl.chRoomCtrl.offset" title="{{$ctrl.rate.cancellationPolicy.cancellation.deposit ? (\'reservation.deposit.conditions\'|translate) : null}}"></ch-cancellation-policy-info><ch-no-show-policy-info ng-if="$ctrl.rate.cancellationPolicy && !$ctrl.rate.cancellationPolicy.cancellation.deposit" no-show-policy="$ctrl.rate.noShowPolicy"></ch-no-show-policy-info></div></div><md-button class="text-gray-light auto-height row-mini" ng-click="$ctrl.$toggleInfo(false)" aria-label="Hide info"><md-icon class="mdi mdi-chevron-up text-gray-light md-18"></md-icon><small translate="common.hide"></small></md-button></div><md-divider ng-if="!$last"></md-divider></div>');
    $templateCache.put("/tpls/service-sold-edit/service-sold-edit.tpl", '<div><ng-form name="serviceSoldEditForm"><div layout="column" layout-padding-sm><div flex layout layout-padding-sm layout-align="start center" class="no-padding"><div class="no-padding" ng-if="$ctrl.$$servicesIcons[$ctrl.serviceSold.service.type.nameKey]"><md-icon class="material-icons {{$ctrl.$$servicesIcons[$ctrl.serviceSold.service.type.nameKey]}} md-30 circle-icon bg-gray-lighter text-gray-light"></md-icon></div><div ng-if="!$ctrl.$$servicesIcons[$ctrl.serviceSold.service.type.nameKey]"><md-icon class="mdi mdi-check md-30 circle-icon bg-gray-lighter text-gray-light"></md-icon></div><div flex layout layout-wrap layout-align="start center" layout-padding-sm><div flex><strong><span translate="{{$ctrl.serviceSold.service.type.nameKey}}"></span></strong></div><div layout="column" layout-align="center center" class="text-center"><strong ng-if="$ctrl.serviceSold.amount" class="md-headline" ng-class="{\'text-striked\': $ctrl.serviceSold.$$removed}"><span ng-if="$ctrl.serviceSold.amount.finalAmount > 0">{{$ctrl.serviceSold.amount.finalAmount|chCurrency}}</span><span ng-if="$ctrl.serviceSold.amount.finalAmount == 0 && $ctrl.serviceSold.service.paymentType != \'PER_PERSON\'" translate="common.free"></span></strong><small class="text-gray-light no-padding-bottom"><span ng-if="$ctrl.nights > 1" translate="reservation.price.for.nights" translate-values="{count: $ctrl.nights}"></span><span ng-if="$ctrl.nights == 1" translate="reservation.price.for.one.night"></span></small></div></div></div><div ng-if="$ctrl.serviceSold.service.description[$ctrl.Lang.current.iso]"><p class="text-gray-light no-margin-bottom"><span>{{$ctrl.serviceSold.service.description[$ctrl.Lang.current.iso]}}</span></p></div><div class="md-padding no-padding-bottom no-padding-left no-padding-right text-small"><div><span><span translate="common.price.details"></span>:</span></div><div ng-switch="$ctrl.serviceSold.service.paymentType"><div ng-switch-when="FREE"><span class="text-success" translate="common.free"></span></div><div ng-switch-when="SINGLE" class="text-gray-light"><span ng-if="$ctrl.$$priceDetails.amount.finalAmount > 0"><span>{{$ctrl.$$priceDetails.amount.finalAmount|chCurrency}}</span></span><span ng-if="$ctrl.$$priceDetails.amount.finalAmount <= 0" translate="service.type.payment.free"></span><div class="text-italic text-gray-light text-lowercase" ng-switch="$ctrl.serviceSold.service.frequency"><span class="text-initial" translate="common.price.is.intend"></span><span ng-switch-when="DAILY">&nbsp;<span translate="date.frequency.daily"></span></span><span ng-switch-when="MONTHLY">&nbsp;<span translate="date.frequency.monthly"></span></span><span ng-switch-when="YEARLY">&nbsp;<span translate="date.frequency.yearly"></span></span><span ng-switch-when="LUMP_SUM">&nbsp;<span translate="common.entire.stay"></span></span></div></div><div ng-switch-when="PER_PERSON" class="text-gray-light text-lowercase"><div><span ng-if="$ctrl.$$priceDetails.adults.amount.finalAmount > 0"><span>{{$ctrl.$$priceDetails.adults.amount.finalAmount|chCurrency}}&nbsp;</span><span translate="people.adult.per"></span>,&nbsp;</span><span ng-if="!$ctrl.$$priceDetails.adults.amount.finalAmount"><span class="text-lowercase"><span translate="people.adults"></span>&nbsp;</span><span translate="service.type.payment.free"></span>,&nbsp;</span><span ng-if="$ctrl.$$priceDetails.boys.amount.finalAmount > 0"><span>{{$ctrl.$$priceDetails.boys.amount.finalAmount|chCurrency}}&nbsp;</span><span translate="people.boy.per"></span>,&nbsp;</span><span ng-if="!$ctrl.$$priceDetails.boys.amount.finalAmount"><span class="text-lowercase"><span translate="people.boys"></span>&nbsp;</span><span translate="service.type.payment.free"></span>,&nbsp;</span><span ng-if="$ctrl.$$priceDetails.children.amount.finalAmount > 0"><span>{{$ctrl.$$priceDetails.children.amount.finalAmount|chCurrency}}&nbsp;</span><span translate="people.child.per"></span>,&nbsp;</span><span ng-if="!$ctrl.$$priceDetails.children.amount.finalAmount"><span class="text-lowercase"><span translate="people.children"></span>&nbsp;</span><span translate="service.type.payment.free"></span>,&nbsp;</span><span ng-if="$ctrl.$$priceDetails.kids.amount.finalAmount > 0"><span>{{$ctrl.$$priceDetails.kids.amount.finalAmount|chCurrency}}&nbsp;</span><span translate="people.kid.per"></span></span><span ng-if="!$ctrl.$$priceDetails.kids.amount.finalAmount"><span class="text-lowercase"><span translate="people.kids"></span>&nbsp;</span><span translate="service.type.payment.free"></span></span></div><div class="text-italic text-gray-light text-lowercase" ng-switch="$ctrl.serviceSold.service.frequency"><span class="text-initial" translate="common.price.is.intend"></span>&nbsp;<span translate="service.type.payment.person"></span><span ng-switch-when="DAILY">&nbsp;<span translate="date.frequency.daily"></span></span><span ng-switch-when="MONTHLY">&nbsp;<span translate="date.frequency.monthly"></span></span><span ng-switch-when="YEARLY">&nbsp;<span translate="date.frequency.yearly"></span></span><span ng-switch-when="LUMP_SUM">&nbsp;<span translate="common.entire.stay"></span></span></div></div></div></div></div><div><div ng-if="$ctrl.serviceSold.service.paymentType == \'PER_PERSON\'"><div class="layout-margin no-margin-left"><em class="md-body-2 text-bold no-margin-left" translate="service.people.question"></em><div class="no-margin text-gray-light text-italic"><md-icon class="mdi mdi-information-outline md-14"></md-icon><small translate="service.price.varies.to.people"></small></div></div><div><ch-people-counters name="people" ng-model="$ctrl.serviceSold.people" min="1" limits="$ctrl.peopleLimits" age-ranges="$ctrl.peopleAgeRanges" on-change="$ctrl.$onPeopleChange($people)"></ch-people-counters></div><div ng-show="serviceSoldEditForm.people.$dirty" ng-messages="serviceSoldEditForm.people.$error" class="md-padding no-padding-top text-danger text-small"><div ng-message="min"><span translate="error.service.no.people"></span></div></div></div><div ng-if="$ctrl.serviceSold.service.maxCount > 1 || $ctrl.serviceSold.service.maxCount == -1"><ch-counter flexible="true" count-class="bg-white only-border" field-name="count" label="{{\'common.book\'|translate}}" label-direction="left" ng-model="$ctrl.serviceSold.count" max="$ctrl.serviceSold.service.maxCount" min="1"></ch-counter><div ng-show="serviceSoldEditForm.count.$dirty" ng-messages="serviceSoldEditForm.count.$error" class="md-padding no-padding-top text-danger text-small"><div ng-message="min"><span translate="error.service.min" translate-value-count="1"></span></div><div ng-message="max"><span translate="error.service.max" translate-value-count="{{$ctrl.serviceSold.service.maxCount}}"></span></div></div></div></div><div layout="column" layout-gt-sm="row" layout-padding-sm layout-align="center center"><md-button ng-click="$ctrl.$cancel()" aria-label="Cancel service edit"><md-icon class="mdi mdi-close md-24"></md-icon><span translate="common.cancel"></span></md-button><md-button class="bg-success text-white" ng-click="$ctrl.$confirm()" ng-disabled="serviceSoldEditForm.$invalid" aria-label="Confirm service edit"><md-icon class="mdi mdi-check md-24 text-white"></md-icon><span translate="common.confirm"></span></md-button></div></ng-form></div>');
    $templateCache.put("/tpls/simple-stepper/simple-step.tpl", '<div class="ch-simple-step" ng-class="{\'ch-active\': $ctrl.$active }"><ch-simple-stepper-header class="ch-simple-stepper-header ch-simple-stepper-vertical"><md-button class="ch-simple-stepper-indicator" ng-class="{\n' + "\t        'ch-active': $ctrl.$$stepNumber === $ctrl.chStepperCtrl.$$currentStep.index,\n" + "\t        'ch-completed': $ctrl.$completed,\n" + "\t        'ch-error': $ctrl.hasError,\n" + "\t        'ch-simple-stepper-optional': $ctrl.optional || $ctrl.hasError\n" + '        \t}" ng-click="$ctrl.chStepperCtrl.goto($ctrl.$$stepNumber)" ng-disabled="($ctrl.chStepperCtrl.linear && ($ctrl.$$stepNumber > $ctrl.chStepperCtrl.$$currentStep.index || !$ctrl.chStepperCtrl.previousStepClick)) || $ctrl.ngDisabled" aria-label="Go to step"><div class="ch-simple-stepper-indicator-wrapper"><div class="ch-simple-stepper-number" ng-hide="$ctrl.hasError"><span ng-if="!$ctrl.$completed"><span ng-if="!$ctrl.iconClass" ng-bind="$ctrl.$$stepNumber+1"></span><span ng-if="$ctrl.iconClass"><md-icon class="{{$ctrl.iconClass}}"></md-icon></span></span><span ng-if="$ctrl.$completed"><md-icon class="ch-simple-stepper-icon material-icons mdi" ng-class="$ctrl.iconCompletedClass ? $ctrl.iconCompletedClass : \'mdi-check md-18\'"></md-icon></span></div><div class="ch-simple-stepper-error-indicator" ng-show="$ctrl.hasError"><md-icon class="steppers-warning mdi mdi-alert md-24"></md-icon></div><div class="ch-simple-stepper-title"><div><span ng-show="!$ctrl.$completed || !$ctrl.completedLabel" ng-bind-html="$ctrl.label"></span><span ng-if="$ctrl.completedLabel" ng-show="$ctrl.$completed" ng-bind-html="$ctrl.completedLabel"></span><small ng-if="$ctrl.optional" ng-show="!$ctrl.hasError">&nbsp;(<span ng-bind-html="$ctrl.optionalLabel"></span>)</small></div><div class="ch-simple-stepper-subtitle"><span ng-if="$ctrl.subtitle" ng-show="!$ctrl.$completed || !$ctrl.completedSubtitle" ng-bind-html="$ctrl.subtitle"></span><span ng-if="$ctrl.completedSubtitle" ng-show="$ctrl.$completed" ng-bind-html="$ctrl.completedSubtitle"></span></div><small class="ch-simple-stepper-error-message" ng-show="$ctrl.hasError" ng-bind-html="$ctrl.message"></small></div></div></md-button><div class="ch-simple-stepper-feedback-message" ng-show="$ctrl.chStepperCtrl.hasFeedback"><span ng-bind-html="$ctrl.chStepperCtrl.feedbackMessage"></span></div></ch-simple-stepper-header><ch-simple-stepper-scope layout="column" class="ch-simple-stepper-scope" ng-if="$ctrl.$active" ng-transclude></ch-simple-stepper-scope></div>');
    $templateCache.put("/tpls/simple-stepper/simple-stepper.tpl", '<div flex class="ch-simple-stepper" ng-class="{ \n' + "    'ch-simple-stepper-linear': $ctrl.linear, \n" + "    'ch-simple-stepper-alternative': $ctrl.alternative,\n" + "    'ch-simple-stepper-vertical': $ctrl.vertical,\n" + "    'ch-simple-stepper-mobile-step-text': $ctrl.mobileMode,\n" + "    'ch-simple-stepper-has-feedback': $ctrl.hasFeedback\n" + '    }"><div class="ch-simple-stepper-header-region"><ch-simple-stepper-header class="ch-simple-stepper-header ch-simple-stepper-horizontal ch-whiteframe-1dp"><md-button class="ch-simple-stepper-indicator" ng-repeat="($stepNumber, $step) in $ctrl.$$steps track by $index" ng-class="{\n' + "                'ch-active': $stepNumber === $ctrl.$$currentStep.index,\n" + "                'ch-completed': $step.$completed,\n" + "                'ch-error': $step.hasError,\n" + "                'ch-simple-stepper-optional': $step.optional || $step.hasError\n" + '            \t}" ng-click="$ctrl.goto($stepNumber)" ng-disabled="($ctrl.linear && ($stepNumber > $ctrl.$$currentStep.index || !$ctrl.previousStepClick)) || $step.ngDisabled" aria-label="Go to step"><div class="ch-simple-stepper-indicator-wrapper"><div class="ch-simple-stepper-number" ng-hide="$step.hasError"><span ng-if="!$step.$completed"><span ng-if="!$step.iconClass" ng-bind="$stepNumber+1"></span><span ng-if="$step.iconClass"><md-icon class="{{$step.iconClass}}"></md-icon></span></span><span ng-if="$step.$completed"><md-icon class="ch-simple-stepper-icon material-icons mdi" ng-class="$step.iconCompletedClass ? $step.iconCompletedClass : \'mdi-check md-18\'"></md-icon></span></div><div class="ch-simple-stepper-error-indicator" ng-show="$step.hasError"><md-icon class="steppers-warning mdi mdi-alert md-24"></md-icon></div><div class="ch-simple-stepper-title"><div><span ng-show="!$step.$completed || !$step.completedLabel" ng-bind-html="$step.label"></span><span ng-if="$step.completedLabel" ng-show="$step.$completed" ng-bind-html="$step.completedLabel"></span><small ng-if="$step.optional" ng-show="!$step.hasError">&nbsp;(<span ng-bind-html="$step.optionalLabel"></span>)</small></div><div class="ch-simple-stepper-subtitle"><span ng-if="$step.subtitle" ng-show="!$step.$completed || !$step.completedSubtitle" ng-bind-html="$step.subtitle"></span><span ng-if="$step.completedSubtitle" ng-show="$step.$completed" ng-bind-html="$step.completedSubtitle"></span></div><small class="ch-simple-stepper-error-message" ng-show="$step.hasError" ng-bind-html="$step.message"></small></div></div></md-button></ch-simple-stepper-header><ch-simple-stepper-mobile-header class="ch-simple-stepper-mobile-header"><md-toolbar flex="none" class="ch-whiteframe-1dp" style="background: #f6f6f6 !important; color: #202020 !important"><div class="md-toolbar-tools ch-simple-stepper-indicator" ng-class="{\n' + "                \t'ch-error': $ctrl.$$currentStep.hasError,\n" + '                \t\'ch-simple-stepper-optional\': $ctrl.$$currentStep.optional || $ctrl.$$currentStep.hasError}"><div class="ch-simple-stepper-indicator-wrapper"><div class="ch-simple-stepper-error-indicator" ng-show="$ctrl.$$currentStep.hasError"><md-icon class="steppers-warning mdi mdi-alert md-18"></md-icon></div><div class="ch-simple-stepper-title"><div><span class="ch-simple-stepper-step-counter-label"><span ng-bind-html="$ctrl.labelStep"></span>&nbsp;<span ng-bind-html="$ctrl.$$currentStep.index+1"></span>&nbsp;<span ng-bind-html="$ctrl.labelOf"></span>&nbsp;<span ng-bind-html="$ctrl.$$steps.length"></span>:&nbsp;</span><span><span ng-bind-html="$ctrl.$$currentStep.label"></span><small ng-if="$ctrl.$$currentStep.optional" ng-show="!$ctrl.$$currentStep.hasError">&nbsp;(<span ng-bind-html="$ctrl.$$currentStep.optionalLabel"></span>)</small></span></div><div class="ch-simple-stepper-subtitle"><span ng-if="$ctrl.$$currentStep.subtitle" ng-bind-html="$ctrl.$$currentStep.subtitle"></span></div><small class="ch-simple-stepper-error-message" ng-show="$ctrl.$$currentStep.hasError" ng-bind-html="$ctrl.$$currentStep.message"></small></div></div></div></md-toolbar></ch-simple-stepper-mobile-header><div class="ch-simple-stepper-feedback-message" ng-show="$ctrl.hasFeedback"><span ng-bind-html="$ctrl.feedbackMessage"></span></div></div><ch-simple-stepper-content class="ch-simple-stepper-content" ng-transclude></ch-simple-stepper-content><div class="ch-simple-stepper-overlay"></div></div>');
    $templateCache.put("/tpls/wizard/wizard-step-done.tpl", '<div ng-if="!$ctrl.$$step.$active" flex class="md-padding" ng-class="{\'animated fadeInUp\': $ctrl.chWizardStepsDoneContentCtrl.chWizardCtrl.direction == \'vertical\' && !$ctrl.$$step.$stopAnimation, \n' + '\t\t\'animated fadeInRight\': $ctrl.chWizardStepsDoneContentCtrl.chWizardCtrl.direction == \'horizontal\' && !$ctrl.$$step.$stopAnimation}"><div ng-transclude></div><div flex layout layout-padding-sm layout-align="start center"><div flex layout layout-align="start center"><md-button class="md-primary" ng-click="$ctrl.$edit()" aria-label="Edit step"><md-icon class="mdi mdi-pencil md-24"></md-icon>&nbsp;<span translate="common.edit"></span></md-button></div></div></div>');
    $templateCache.put("/tpls/wizard/wizard-step.tpl", '<div ng-if="$ctrl.$$step.$active" flex class="md-padding" ng-class="{\'animated fadeInUp\': $ctrl.chWizardCtrl.direction == \'vertical\' && !$ctrl.$$step.$stopAnimation, \n' + "\t\t'animated fadeInRight': $ctrl.chWizardCtrl.direction == 'horizontal' && !$ctrl.$$step.$stopAnimation}\" ng-transclude></div>");
    $templateCache.put("/tpls/wizard/wizard-steps-done-content.tpl", '<div ng-if="$ctrl.$$doneSteps"><ch-wizard-steps-done-container ng-transclude></ch-wizard-steps-done-container></div>');
    $templateCache.put("/tpls/wizard/wizard.tpl", '<div><div><ng-form name="chFormWizardForm"><ch-wizard-steps-container ng-transclude></ch-wizard-steps-container><div flex layout layout-padding-sm layout-align="start center"><div flex layout layout-align="start center"><md-button ng-if="!$ctrl.$$currentStep.$first" ng-click="$ctrl.$back()" aria-label="Go back"><span translate="common.back"></span></md-button></div><div flex layout layout-align="end center" ng-if="!$ctrl.$$currentStep.$last"><md-button class="md-raised md-primary" ng-click="$ctrl.$forward()" aria-label="Go forward"><span translate="common.forward"></span></md-button></div><div flex layout layout-align="end center" ng-if="$ctrl.$$currentStep.$last"><md-button class="md-raised md-primary" ng-click="$ctrl.$confirm()" aria-label="Confirm"><span translate="common.confirm"></span></md-button></div></div></ng-form></div></div>');
} ]);