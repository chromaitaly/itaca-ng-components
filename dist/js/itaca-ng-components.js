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
    angular.module("itaca.components", [ "ngMaterial", "itaca.services", "itaca.utils", "pascalprecht.translate", "tmh.dynamicLocale" ]);
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
        template: '<ng-form name="chAmountInputForm" ng-class="{"text-gray-light cursor-disabled": $ctrl.ngDisabled}">' + '<div class="no-padding-bottom no-padding-top row-mini layout-column layout-align-center-center">' + '<span ng-if="$ctrl.promotion" ng-switch="$ctrl.promotion.promotionType">' + '<span ng-switch-when="STANDARD" class="label label-xs bg-info">' + '<ch-truncate text="{{$ctrl.promotion.name[$ctrl.$$currentLang.iso]}}" max-length="20"  suffix="..."></ch-truncate>&nbsp;<span ng-if="$ctrl.promotion.discount.type=="PERCENTAGE"">-{{$ctrl.promotion.discount.finalAmount}}%</span><span ng-if="$ctrl.promotion.discount.type=="PRICE"">-{{$ctrl.promotion.discount.finalAmount|chCurrency}}</span>' + "</span>" + '<span ng-switch-when="MINIMUM_STAY" class="label label-xs bg-primary-light">' + '<span translate="promotions.promotion.label.minstay.nigths" translate-value-count="{{$ctrl.promotion.days}}"></span>&nbsp;<span ng-if="$ctrl.promotion.discount.type=="PERCENTAGE"">-{{$ctrl.promotion.discount.finalAmount}}%</span><span ng-if="$ctrl.promotion.discount.type=="PRICE"">-{{$ctrl.promotion.discount.finalAmount|chCurrency}}</span>' + "</span>" + '<span ng-switch-when="BOOK_TODAY" class="label label-xs bg-danger">' + '<span translate-once="promotions.promotion.label.only.today"></span>!&nbsp;<span ng-if="$ctrl.promotion.discount.type=="PERCENTAGE"">-{{$ctrl.promotion.discount.finalAmount}}%</span><span ng-if="$ctrl.promotion.discount.type=="PRICE"">-{{$ctrl.promotion.discount.finalAmount|chCurrency}}</span>' + "</span>" + '<span ng-switch-when="EARLY_BOOKING" class="label label-xs bg-warn">' + '<span translate-once="promotions.early"></span>&nbsp;<span ng-if="$ctrl.promotion.discount.type=="PERCENTAGE"">-{{$ctrl.promotion.discount.finalAmount}}%</span><span ng-if="$ctrl.promotion.discount.type=="PRICE"">-{{$ctrl.promotion.discount.finalAmount|chCurrency}}</span>' + "</span>" + '<span ng-switch-when="LAST_MINUTE" class="label label-xs bg-primary">' + '<span translate-once="promotions.last.minute"></span>&nbsp;<span ng-if="$ctrl.promotion.discount.type=="PERCENTAGE"">-{{$ctrl.promotion.discount.finalAmount}}%</span><span ng-if="$ctrl.promotion.discount.type=="PRICE"">-{{$ctrl.promotion.discount.finalAmount|chCurrency}}</span>' + "</span>" + '<span ng-switch-when="LAST_SECOND" class="label label-xs bg-success">' + '<span translate-once="promotions.last.second"></span>&nbsp;<span ng-if="$ctrl.promotion.discount.type=="PERCENTAGE"">-{{$ctrl.promotion.discount.finalAmount}}%</span><span ng-if="$ctrl.promotion.discount.type=="PRICE"">-{{$ctrl.promotion.discount.finalAmount|chCurrency}}</span>' + "</span>" + "</span>" + '<small class="text-gray-light" ng-if="!$ctrl.hideInitialValue">' + '<span ng-if="$ctrl.ngModel.initialAmount > 0 && $ctrl.ngModel.initialAmount > $ctrl.ngModel.finalAmount">' + "<i><del>{{($ctrl.ngModel.initialAmount|chCurrency)}}</del></i>" + "</span>" + '<span ng-if="!($ctrl.ngModel.initialAmount > 0 && $ctrl.ngModel.initialAmount > $ctrl.ngModel.finalAmount)"></span>' + "</small>" + "</div>" + '<div class="no-padding-top">' + '<div ng-if="$ctrl.readOnlyView" class="text-center">{{$ctrl.ngModel.finalAmount|chCurrency}}</div>' + '<div ng-if="!$ctrl.readOnlyView">' + '<div class="text-right" ng-if="$ctrl.showOriginalValue">' + '<ch-original-value ng-model="$ctrl.ngModel.finalAmount" refer-to="$ctrl.ngModel.$originalValue.finalAmount" filter="chCurrency" label="{{$ctrl.originalValueLabel}}" css-class="{{$ctrl.originalValueClass}}"></ch-original-value>' + "</div>" + '<div class="layout-align-end-center layout-row row-mini">' + '<md-input-container class="{{$ctrl.cssClass}}" ng-class="{"md-icon-right": !$ctrl.hideRefreshIcon && $ctrl.ngModel.finalAmount != $ctrl.ngModel.$originalValue.finalAmount}">' + '<md-icon ng-if="!$ctrl.hideIcon && !$ctrl.ngDisabled" class="{{$ctrl.iconClass}}"></md-icon>' + '<input type="number" name="{{$ctrl.inputName}}" ng-model="$ctrl.ngModel.finalAmount" ng-min="$ctrl.ngMin" step="0.01" ng-max="$ctrl.max" ng-pattern="$ctrl.$$pattern" required ng-disabled="$ctrl.ngDisabled" aria-label="Edit amount" class="text-center">' + '<md-icon ng-if="!$ctrl.hideRefreshIcon && !$ctrl.ngDisabled && $ctrl.ngModel.finalAmount != $ctrl.ngModel.$originalValue.finalAmount" class="{{$ctrl.refreshIconClass}} clickable" ng-click="$ctrl.$refreshPrice()" aria-label="reset price">' + '<md-tooltip><span translate-once="common.restore"></span></md-tooltip>' + "</md-icon>" + '<div ng-messages="chAmountInputForm[$ctrl.inputName].$error">' + '<span ng-message="required"><span translate-once="error.required"></span></span>' + '<span ng-message="min"><span translate="error.amount.min" translate-values="{num: ($ctrl.ngMin | chCurrency)}"></span></span>' + '<span ng-message="max"><span translate="error.amount.max" translate-values="{num: ($ctrl.max | chCurrency)}"></span></span>' + '<span ng-message="$$pattern"><span translate-once="error.field.generic.invalid"></span></span>' + '<span ng-if="errorMessages" ng-repeat="error in $ctrl.errorMessages" ng-message="error.key"><span translate="error.label"></span></span>' + "</div>" + "</md-input-container>" + "</div>" + "</div>" + "</div>" + "</ng-form>"
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
            ctrl.$initWatches();
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
        this.$initWatches = function() {
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
    ArrayInputOptionCtrl.$inject = [ "$scope" ];
    angular.module("itaca.components").component("chArrayInputOption", {
        require: {
            chArrayInputCtrl: "^chArrayInput"
        },
        bindings: {
            ngValue: "<",
            buttonClass: "@",
            iconClass: "@",
            label: "@",
            labelClass: "@",
            selectedClass: "@"
        },
        controller: ArrayInputOptionCtrl,
        template: '<md-button class="{{$ctrl.buttonClass}}" ng-class="$ctrl.option.selected ? $ctrl.selectedClass : \'\'" ng-click="$ctrl.$toggle()" aria-label="Toggle option">' + '<md-icon ng-if="$ctrl.iconClass" class="material-icons {{$ctrl.iconClass}}"></md-icon>' + '<div ng-if="$ctrl.labelClass" class="{{$ctrl.labelClass}}" ng-bind-html="$ctrl.label"></div>' + "</md-button>"
    });
    function ArrayInputOptionCtrl($scope) {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.buttonClass = ctrl.buttonClass || (ctrl.iconClass && !ctrl.label ? "md-icon-button" : "");
            ctrl.selectedClass = ctrl.selectedClass || "md-primary";
            ctrl.option = {
                value: ctrl.ngValue,
                selected: false
            };
            ctrl.chArrayInputCtrl.$addOption(ctrl.option);
        };
        this.$toggle = function() {
            ctrl.chArrayInputCtrl.$toggleOption(ctrl.option);
        };
    }
})();

(function() {
    "use strict";
    ArrayInputCtrl.$inject = [ "$scope" ];
    angular.module("itaca.components").component("chArrayInput", {
        require: {
            ngModelCtrl: "ngModel"
        },
        transclude: true,
        bindings: {
            ngModel: "=",
            ngRequired: "<?",
            options: "<?"
        },
        controller: ArrayInputCtrl,
        template: '<div class="layout-padding"><div class="layout-row layout-wrap" ng-transclude></div></div>'
    });
    function ArrayInputCtrl($scope) {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.ngModelCtrl.$modelValue = angular.isArray(ctrl.ngModelCtrl.$modelValue) ? ctrl.ngModelCtrl.$modelValue : [];
            ctrl.options = angular.isArray(ctrl.options) ? ctrl.options : [];
            if (ctrl.ngRequired) {
                ctrl.$watchCollection(function() {
                    return ctrl.ngModelCtrl.$modelValue;
                }, function(newValue, oldValue) {
                    if (ctrl.ngRequired) {
                        ctrl.ngModelCtrl.$setValidity("required", !_.isEmpty(ctrl.ngModelCtrl.$modelValue));
                    }
                });
            }
        };
        this.$addOption = function(option) {
            ctrl.options.push(option);
        };
        this.$toggleOption = function(option) {
            if (!option.selected) {
                ctrl.ngModelCtrl.$modelValue.push(option.value);
            } else {
                _.pull(ctrl.ngModelCtrl.$modelValue, option.value);
            }
            option.selected = !option.selected;
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
    CardCtrl.$inject = [ "$scope", "Navigation" ];
    angular.module("itaca.components").component("chCard", {
        transclude: true,
        bindings: {
            bgUrl: "@",
            bgClass: "@",
            imgUrl: "@",
            imgClass: "@",
            imgContClass: "@",
            showAvatar: "=?",
            iconClass: "@",
            iconLabel: "<?",
            iconLabelClass: "@",
            iconLabelPosition: "@",
            iconSecondaryLabel: "<?",
            iconSecondaryLabelClass: "@",
            iconSecondaryLabelPosition: "@",
            otherIconClass: "@",
            title: "@",
            titleClass: "@",
            subtitle: "@",
            colorClass: "@",
            ngDisabled: "=?",
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
        template: '<div class="md-whiteframe-1dp bg-white flex layout-column" ng-click="$ctrl.$goTo()"' + 'ng-class="{"clickable": !$ctrl.ngDisabled && ($ctrl.url || $ctrl.state || $ctrl.onClick), "cursor-disabled": $ctrl.ngDisabled}">' + '<div class="relative">' + '<div ng-if="$ctrl.ngDisabled" class="disabled-box {{$ctrl.disabledClass}}">' + '<span ng-if="$ctrl.disabledLabel" class="disabled-box-bar {{$ctrl.disabledBarClass}}">{{$ctrl.disabledLabel}}</span>' + "</div>" + '<div class="layout-padding no-padding-right absolute position-right position-top" style="z-index:2">' + '<md-menu class="md-secondary" ng-if="$ctrl.menuItems && !$ctrl.ngDisabled">' + '<md-button aria-label="Open user interactions menu" class="md-icon-button {{$ctrl.menuClass}}" ng-click="$mdMenu.open($event)">' + '<md-icon class="mdi mdi-dots-vertical text-white"></md-icon>' + "</md-button>" + '<md-menu-content width="4">' + '<md-menu-item ng-repeat="item in $ctrl.menuItems" ng-if="!item.hide">' + '<md-button ng-click="$ctrl.$menuClick(item)" aria-label="{{item.label | translate}}" class="{{item.labelClass}}" ng-disabled="item.disabled">' + '<md-icon class="{{item.icon}} material-icons"></md-icon>&nbsp;<span translate-once="{{item.label}}"></span>' + "</md-button>" + "</md-menu-item>" + "</md-menu-content>" + "</md-menu>" + '<md-menu class="md-secondary" ng-if="$ctrl.disabledMenuItems && $ctrl.ngDisabled">' + '<md-button aria-label="Open user interactions menu" class="md-icon-button {{$ctrl.menuClass}}" ng-click="$mdMenu.open($event)">' + '<md-icon class="mdi mdi-dots-vertical text-white"></md-icon>' + "</md-button>" + '<md-menu-content width="4">' + '<md-menu-item ng-repeat="item in $ctrl.disabledMenuItems" ng-if="!item.hide">' + '<md-button ng-click="$ctrl.$menuClick(item)" aria-label="{{item.label | translate}}" class="{{item.labelClass}}" ng-disabled="item.disabled">' + '<md-icon class="{{item.icon}} material-icons"></md-icon>&nbsp;<span translate-once="{{item.label}}"></span>' + "</md-button>" + "</md-menu-item>" + "</md-menu-content>" + "</md-menu>" + "</div>" + '<div class="flex layout-column layout-align-center-center text-center overflow-hidden card-image" ng-class="{"md-hover-icon": !$ctrl.noHover}" ng-style="$ctrl.$$bgStyle">' + '<div ng-if="$ctrl.imgUrl" class="{{$ctrl.imgContClass}}">' + '<img ng-if="$ctrl.imgUrl" ng-src="{{$ctrl.imgUrl}}" class="{{$ctrl.imgClass}}" lazy-image loaded-class="animated fadeIn">' + "</div>" + '<div ng-if="!$ctrl.imgUrl && ($ctrl.iconClass || $ctrl.iconSecondaryClass)">' + '<div class="layout-column layout-padding-sm layout-align-center-center">' + '<div ng-if="$ctrl.iconLabel && $ctrl.iconLabelPosition == "top"" class="{{$ctrl.iconLabelClass}}">{{$ctrl.iconLabel}}</div>' + '<div ng-if="$ctrl.iconSecondaryLabel && $ctrl.iconSecondaryLabelPosition == "top"" class="{{$ctrl.iconSecondaryLabelClass}}">{{$ctrl.iconSecondaryLabel}}</div>' + "<div>" + '<span ng-if="$ctrl.iconLabel && $ctrl.iconLabelPosition == "left"" class="{{$ctrl.iconLabelClass}}">{{$ctrl.iconLabel}}</span>' + '<span ng-if="$ctrl.iconSecondaryLabel && $ctrl.iconSecondaryLabelPosition == "left"" class="{{$ctrl.iconSecondaryLabelClass}}">{{$ctrl.iconSecondaryLabel}}</span>' + '<md-icon class="{{$ctrl.iconClass}} material-icons"></md-icon>' + '<md-icon ng-if="$ctrl.otherIconClass" class="{{$ctrl.otherIconClass}} material-icons"></md-icon>' + '<span ng-if="$ctrl.iconLabel && $ctrl.iconLabelPosition == "right"" class="{{$ctrl.iconLabelClass}}">{{$ctrl.iconLabel}}</span>' + '<span ng-if="$ctrl.iconSecondaryLabel && $ctrl.iconSecondaryLabelPosition == "right"" class="{{$ctrl.iconSecondaryLabelClass}}">{{$ctrl.iconSecondaryLabel}}</span>' + "</div>" + '<div ng-if="$ctrl.iconLabel && $ctrl.iconLabelPosition == "bottom"" class="{{$ctrl.iconLabelClass}}">{{$ctrl.iconLabel}}</div>' + '<div ng-if="$ctrl.iconSecondaryLabel && $ctrl.iconSecondaryLabelPosition == "bottom"" class="{{$ctrl.iconSecondaryLabelClass}}">{{$ctrl.iconSecondaryLabel}}</div>' + "</div>" + "</div>" + '<div ng-if="$ctrl.showAvatar && !$ctrl.imgUrl && !$ctrl.iconClass && !i$ctrl.conSecondaryClass && ($ctrl.title || $ctrl.description)" class="layout-row layout-align-center-center {{$ctrl.imgContClass}}">' + '<span class="md-display-3 text-uppercase">' + '<span ng-if="$ctrl.title">{{$ctrl.title.charAt(0)}}</span>' + '<span ng-if="!$ctrl.title">{{$ctrl.description.charAt(0)}}</span>' + "</span>" + "</div>" + "</div>" + "</div>" + "<md-divider></md-divider>" + '<div class="md-padding layout-column layout-padding-sm flex {{$ctrl.colorClass}}">' + '<div class="layout-column layout-align-center-center">' + '<div class="{{$ctrl.titleClass}} row-mini text-center"><span>{{$ctrl.title}}</span></div>' + '<small class="text-center" ng-if="subtitle">{{$ctrl.subtitle}}</small>' + "</div>" + '<div ng-transclude class="flex layout-column layout-align-center-center card-footer"></div>' + "</div>" + "</div>"
    });
    function CardCtrl($scope, Navigation) {
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
            ctrl.$initWatches();
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
                Navigation.goToState(ctrl.state, ctrl.stateParams);
            } else {
                if (!_.isNil(ctrl.url)) {
                    Navigation.go(ctrl.url);
                }
            }
        };
        this.$menuClick = function(menu) {
            if (!_.isNil(menu.fn) && angular.isFunction(menu.fn)) {
                menu.fn.apply(this, menu.fnParams);
            } else {
                if (!_.isNil(menu.state)) {
                    Navigation.goToState(menu.state, menu.stateParams);
                } else {
                    if (!_.isNil(menu.url)) {
                        location.href = menu.url;
                    }
                }
            }
        };
        this.$initWatches = function() {
            $scope.$watch(function() {
                return ctrl.imgUrl;
            }, function(newVal, oldVal) {
                ctrl.imgUrl = newVal;
            });
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
    CounterCtrl.$inject = [ "$ctrl", "$element", "$attrs" ];
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
        template: '<div class="layout-column {{$ctrl.wrapperClass}}" ng-class="{"flex": $ctrl.flexible}" ng-style="{"display": $ctrl.flexible ? "inherit" : "inline-block"}" style="min-width: 150px;">' + '<div class="{{$ctrl.labelContClass}} layout-padding no-padding">' + '<div ng-if="$ctrl.label && ($ctrl.labelDirection == "left" || $ctrl.labelDirection == "top")" class="layout-row layout-align-center-center {{$ctrl.labelClass}}">' + '<span ng-bind-html="$ctrl.label"></span>' + "</div>" + '<div class="layout-row layout-align-center-center flex">' + '<md-button class="{{$ctrl.btnClass}} no-margin" ng-class="!$ctrl.$isDecreaseDisabled() ? $ctrl.btnActiveClass : """ aria-label="Minus" ng-disabled="$ctrl.$isDecreaseDisabled()" ng-click="$ctrl.$decrease()">' + '<md-icon class="material-icons mdi mdi-minus md-18 {{$ctrl.iconClass}}" ng-class="!$ctrl.$isDecreaseDisabled() ? $ctrl.iconActiveClass : """></md-icon>' + "</md-button>" + '<div class="layout-column layout-padding layout-align-center-center" ng-class="{"flex": $ctrl.flexible}">' + '<span class="{{$ctrl.countClass}} border-gray-lighter border-radius">{{$ctrl.count || 0}}</span>' + "</div>" + '<md-button class="{{$ctrl.btnClass}} no-margin" ng-class="!$ctrl.$isIncreaseDisabled() ? $ctrl.btnActiveClass : """ aria-label="Plus" ng-disabled="$ctrl.$isIncreaseDisabled()" ng-click="$ctrl.$increase()">' + '<md-icon class="material-icons mdi mdi-plus md-18 {{$ctrl.iconClass}}" ng-class="!$ctrl.$isIncreaseDisabled() ? $ctrl.iconActiveClass : """></md-icon>' + "</md-button>" + "</div>" + '<div ng-if="$ctrl.label && ($ctrl.labelDirection == "right" || $ctrl.labelDirection == "bottom")" class="layout-row layout-align-center-center {{$ctrl.labelClass}}">' + '<span ng-bind-html="$ctrl.label"></span>' + "</div>" + "</div>" + '<div class="no-padding">' + '<md-input-container md-no-float class="md-block minimal-input no-margin no-padding">' + '<input ng-if="$ctrl.fieldName" type="hidden" name="{{$ctrl.fieldName}}">' + '<small ng-transclude class="no-padding text-center"></small>' + "</md-input-container>" + "</div>" + "</div>"
    });
    function CounterCtrl($ctrl, $element, $attrs) {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.btnClass = ctrl.btnClass || "md-fab md-mini";
            ctrl.btnActiveClass = ctrl.btnActiveClass || "md-primary";
            ctrl.labelClass = ctrl.labelClass || "text-gray-light text-small";
            ctrl.count = angular.isNumber(ctrl.count) ? ctrl.count : 0;
            ctrl.step = angular.isNumber(ctrl.step) ? ctrl.step : 1;
            ctrl.$initWatches();
        };
        this.$observeFlexible = function() {
            ctrl.flexible = _.isBoolean(ctrl.flexible) ? ctrl.flexible : $attrs.hasOwnProperty("flexible") && (ctrl.flexible === undefined || _.isEmpty(ctrl.flexible) || ctrl.flexible);
            if (ctrl.flexible) {
                $element.addClass("flex");
            }
        };
        this.$observeLabelDirection = function() {
            ctrl.labelDirection = _.includes([ "top", "right", "bottom", "left" ], ctrl.labelDirection) ? ctrl.labelDirection : "top";
            ctrl.labelContClass = _.includes([ "right", "left" ], ctrl.labelDirection) ? "layout-row" : "layout-column";
        };
        this.$observeMin = function() {
            ctrl.min = angular.isNumber(ctrl.min) && (angular.isNumber(ctrl.max) && ctrl.min > ctrl.max) ? ctrl.max - ctrl.step : ctrl.min;
            if (angular.isNumber(ctrl.min) && ctrl.count < ctrl.min) {
                ctrl.count = ctrl.min;
            }
        };
        this.$observeMax = function() {
            ctrl.max = angular.isNumber(ctrl.max) && (angular.isNumber(ctrl.min) && ctrl.max < ctrl.min) ? ctrl.min + ctrl.step : ctrl.max;
            if (angular.isNumber(ctrl.max) && ctrl.count > ctrl.max) {
                ctrl.count = ctrl.max;
            }
        };
        this.$decrease = function() {
            if (!ctrl.$isDecreaseDisabled()) {
                ctrl.count = (ctrl.count || 0) - ctrl.step;
                ctrl.$updateModel();
                ctrl.onMinus && ctrl.onMinus();
            }
        };
        this.$increase = function() {
            if (!ctrl.$isIncreaseDisabled()) {
                ctrl.count = (ctrl.count || 0) + ctrl.step;
                ctrl.$updateModel();
                ctrl.onPlus && ctrl.onPlus();
            }
        };
        this.$isDecreaseDisabled = function() {
            return ctrl.ngDisabled ? ctrl.ngDisabled : ctrl.minusDisabled ? ctrl.minusDisabled : angular.isNumber(ctrl.min) && ctrl.count <= ctrl.min;
        };
        this.$isIncreaseDisabled = function() {
            return ctrl.ngDisabled ? ctrl.ngDisabled : ctrl.plusDisabled ? ctrl.plusDisabled : angular.isNumber(ctrl.max) && ctrl.count >= ctrl.max;
        };
        this.$updateModel = function() {
            ctrl.ngModelCtrl.$setViewValue(ctrl.count);
        };
        this.$initWatches = function() {
            $scope.$watch("flexible", ctrl.$observeFlexible);
            $scope.$watch("labelDirection", ctrl.$observeLabelDirection);
            $scope.$watch("min", ctrl.$observeMin);
            $scope.$watch("max", ctrl.$observeMax);
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
            ctrl.$initWatches();
        };
        this.$calculateDiff = function() {
            var start = ctrl.start ? moment(ctrl.start) : moment();
            var end = ctrl.start ? moment(ctrl.end) : moment();
            ctrl.$$dateLeft = start.to(end);
        };
        this.$initWatches = function() {
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
    DatePickerCtrl.$inject = [ "$scope", "$element", "$mdPanel", "$mdMedia", "DateUtils" ];
    angular.module("itaca.components").component("chDatePicker", {
        require: {
            ngModelCtrl: "ngModel"
        },
        bindings: {
            buttonClass: "@",
            wrapperClass: "@",
            label: "@",
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
            ngDisabled: "<?"
        },
        controller: DatePickerCtrl,
        template: '<ng-form name="chDateRangeForm" class="flex no-padding layout-column">' + '<md-button class="ch-date-picker-button flex minimal-button text-lowercase text-center {{$ctrl.buttonClass}}" ng-click="$ctrl.$openPanel($event)" aria-label="Change date" ng-disabled="$ctrl.ngDisabled">' + '<div class="{{$ctrl.wrapperClass}}">' + '<div class="no-padding row-mini"><small class="row-mini text-initial" ng-bind-html="$ctrl.label"></small></div>' + '<div class="layout-align-center-center layout-row no-padding">' + '<span><md-icon class="mdi mdi-calendar md-32"></md-icon></span>' + '<span class="md-display-1 layout-padding">{{$ctrl.ngModel|date:"dd"}}</span>' + '<span class="layout-column row-mini">' + '<span class="text-lowercase">{{$ctrl.ngModel|date:"MMM"}}</span>' + '<span>{{$ctrl.ngModel|date:"yyyy"}}</span>' + "</span>" + "</div>" + "</div>" + "</md-button>" + "</ng-form>"
    });
    function DatePickerCtrl($scope, $element, $mdPanel, $mdMedia, DateUtils) {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.wrapperClass = ctrl.wrapperClass || "md-padding";
            ctrl.buttonClass = ctrl.buttonClass || "no-padding no-margin layout-padding";
            ctrl.hasBackdrop = _.isNil(ctrl.hasBackdrop) ? false : ctrl.hasBackdrop;
            ctrl.timezone = _.isBoolean(ctrl.useUtc) && ctrl.useUtc ? "UTC" : "";
            var targetEl = $element[0].querySelector(".ch-date-picker-button");
            var position = $mdPanel.newPanelPosition().relativeTo(angular.element(targetEl)).addPanelPosition($mdPanel.xPosition.CENTER, $mdPanel.yPosition.BELOW);
            ctrl.$$config = {
                attachTo: angular.element(document.body),
                controller: "dateRangeCtrl",
                controllerAs: "ctrl",
                templateUrl: "/tpls/date.part",
                position: position,
                clickOutsideToClose: true,
                disableParentScroll: ctrl.disableParentScroll,
                hasBackdrop: !$mdMedia("gt-xs") || ctrl.hasBackdrop,
                fullscreen: !$mdMedia("gt-xs"),
                panelClass: "bg-white md-whiteframe-15dp",
                trapFocus: true,
                onCloseSuccess: function(panelRef, closeReason) {
                    if (_.isBoolean(closeReason) && closeReason) {
                        ctrl.updateOriginal();
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
                currentView: "end",
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
})();

(function() {
    "use strict";
    DateRangePickerCtrl.$inject = [ "$scope", "$element", "$mdPanel", "$mdMedia", "DateUtils" ];
    angular.module("itaca.components").component("chDateRangePicker", {
        bindings: {
            buttonClass: "@",
            wrapperClass: "@",
            placeholder: "@",
            label: "@",
            labelClass: "@",
            startLabel: "@",
            startInputName: "@",
            start: "=",
            startMinDate: "<?",
            startMaxDate: "<?",
            startErrorMessages: "<?",
            endLabel: "@",
            endInputName: "@",
            end: "=",
            endMinDate: "<?",
            endMaxDate: "<?",
            endErrorMessages: "<?",
            maxRange: "<",
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
            ngDisabled: "<?"
        },
        controller: DateRangePickerCtrl,
        template: '<ng-form name="chDateRangeForm" class="flex no-padding layout-column">' + '<md-button class="ch-date-range-button flex minimal-button text-lowercase text-center {{$ctrl.buttonClass}}" ng-click="$ctrl.$openPanel($event)" aria-label="Change period" ng-disabled="$ctrl.ngDisabled">' + '<div class="{{$ctrl.wrapperClass}}">' + '<div ng-if="$ctrl.label || $ctrl.placeholder" class="md-padding">' + '<div class="{{$ctrl.labelClass}} text-initial text-wrap row-1" ng-class="{"text-small": $ctrl.start || $ctrl.end}">' + '<span ng-if="$ctrl.placeholder && !$ctrl.start && !$ctrl.end" ng-bind-html="$ctrl.placeholder"></span>' + '<span ng-if="$ctrl.label && (($ctrl.start || $ctrl.end) || !$ctrl.placeholder)" ng-bind-html="$ctrl.label"></span>' + "</div>" + "</div>" + '<div ng-if="!$ctrl.largeTemplate">' + '<div ng-show="$ctrl.start || $ctrl.end" class="layout layout-wrap layout-align-center-center row-mini">' + '<span><span translate="date.from.abbr"></span>&nbsp;<span class="md-subhead"><strong>{{$ctrl.start|date:"shortDate":$ctrl.$$timezone}}</strong></span>&nbsp;</span>' + '<span><span translate="date.to.abbr"></span>&nbsp;<span class="md-subhead"><strong>{{$ctrl.end|date:"shortDate":$ctrl.$$timezone}}</strong></span></span>' + '<span ng-if="$ctrl.$$diff" class="{{$ctrl.labelClass}} text-small no-padding no-margin text-lowercase">' + '&nbsp;(<span ng-bind="$ctrl.$$diff">&nbsp;</span>' + '<span ng-show="$ctrl.$$diff == 1"><span ng-if="!$ctrl.$$diffLabelSingular" translate="date.day"></span><span ng-if="$ctrl.$$diffLabelSingular" ng-bind="$ctrl.$$diffLabelSingular"></span>)</span>' + '<span ng-show="$ctrl.$$diff > 1"><span ng-if="!$ctrl.$$diffLabelPlural" translate="date.days"></span><span ng-if="$ctrl.$$diffLabelPlural" ng-bind="$ctrl.$$diffLabelPlural"></span>)</span>' + "</span>" + "</div>" + "</div>" + '<div ng-if="$ctrl.largeTemplate" class="layout-row layout-wrap layout-align-center-center ">' + '<div class="layout-column flex-45 row-1">' + '<small class="row-1 text-initial" translate="date.checkin"></small>' + '<div class="layout-align-center-center layout-row">' + '<span><md-icon class="mdi mdi-calendar md-32"></md-icon></span>' + '<span class="md-display-1 layout-padding">{{$ctrl.start|date:"dd":$ctrl.$$timezone}}</span>' + '<span class="layout-column row-mini">' + '<span>{{$ctrl.start|date:"MMM":$ctrl.$$timezone}}</span>' + '<span>{{$ctrl.start|date:"yyyy":$ctrl.$$timezone}}</span>' + "</span>" + "</div>" + "</div>" + '<div class="layout-column flex text-bold">-</div>' + '<div class="layout-column flex-45 row-1">' + '<small class="row-mini text-initial" translate="date.checkout"></small>' + '<div class="layout-align-center-center layout-row">' + '<span><md-icon class="mdi mdi-calendar md-32"></md-icon></span>' + '<span class="md-display-1 layout-padding">{{$ctrl.end|date:"dd":$ctrl.$$timezone}}</span>' + '<span class="layout-column row-mini">' + '<span>{{$ctrl.end|date:"MMM":$ctrl.$$timezone}}</span>' + '<span>{{$ctrl.end|date:"yyyy":$ctrl.$$timezone}}</span>' + "</span>" + "</div>" + "</div>" + '<div class="layout-column flex-100 row-1">' + '<span ng-if="$ctrl.$$diff" class="{{$ctrl.labelClass}} text-small no-padding no-margin text-lowercase">' + '&nbsp;(<span ng-bind="$ctrl.$$diff">&nbsp;</span>' + '<span ng-show="$ctrl.$$diff == 1"><span ng-if="!$ctrl.$$diffLabelSingular" translate="date.day"></span><span ng-if="$ctrl.$$diffLabelSingular" ng-bind="$ctrl.$$diffLabelSingular"></span>)</span>' + '<span ng-show="$ctrl.$$diff > 1"><span ng-if="!$ctrl.$$diffLabelPlural" translate="date.days"></span><span ng-if="$ctrl.$$diffLabelPlural" ng-bind="$ctrl.$$diffLabelPlural"></span>)</span>' + "</span>" + "</div>" + "</div>" + "</div>" + "</md-button>" + '<input type="hidden" name="{{$ctrl.startInputName}}" ng-model="start" required>' + '<input type="hidden" name="{{$ctrl.endInputName}}" ng-model="end" required>' + '<div ng-messages="chDateRangeForm[$ctrl.startInputName].$error" class="font-12 text-center text-danger" ng-show="chDateRangeForm[$ctrl.startInputName].$dirty || chDateRangeForm.$submitted">' + '<span ng-message="required"><span translate-once="error.required"></span></span>' + '<span ng-if="$ctrl.startErrorMessages" ng-repeat="error in $ctrl.startErrorMessages" ng-message="error.key"><span translate="error.label"></span></span>' + "</div>" + '<div ng-messages="chDateRangeForm[$ctrl.endInputName].$error" class="font-12 text-center text-danger" ng-show="!chDateRangeForm[$ctrl.startInputName].$invalid && (chDateRangeForm[$ctrl.endInputName].$dirty || chDateRangeForm.$submitted)">' + '<span ng-message="required"><span translate-once="error.required"></span></span>' + '<span ng-if="$ctrl.endErrorMessages" ng-repeat="error in $ctrl.endErrorMessages" ng-message="error.key"><span translate="error.label"></span></span>' + "</div>" + "</ng-form>"
    });
    function DateRangePickerCtrl($scope, $element, $mdPanel, $mdMedia, DateUtils) {
        var ctr = this;
        this.$onInit = function() {
            ctrl.startInputName = ctrl.startInputName || "start";
            ctrl.endInputName = ctrl.endInputName || "end";
            ctrl.wrapperClass = ctrl.wrapperClass || "md-padding";
            ctrl.buttonClass = ctrl.buttonClass || "no-padding no-margin layout-padding";
            ctrl.hasBackdrop = _.isNil(ctrl.hasBackdrop) ? false : ctrl.hasBackdrop;
            ctrl.$$timezone = _.isBoolean(ctrl.useUtc) && ctrl.useUtc ? "UTC" : "";
            ctrl.labelClass = ctrl.labelClass || "text-gray-light";
            ctrl.largeTemplate = ctrl.largeTemplate || false;
            var targetEl = $element[0].querySelector(".ch-date-range-button");
            var position = $mdPanel.newPanelPosition().relativeTo(angular.element(targetEl)).addPanelPosition($mdPanel.xPosition.CENTER, $mdPanel.yPosition.BELOW);
            ctrl.$$config = {
                attachTo: angular.element(document.body),
                controller: "dateRangeCtrl",
                controllerAs: "ctrl",
                templateUrl: "/tpls/date-range.part",
                position: position,
                clickOutsideToClose: true,
                disableParentScroll: ctrl.disableParentScroll,
                hasBackdrop: !$mdMedia("gt-xs") || ctrl.hasBackdrop,
                fullscreen: !$mdMedia("gt-xs"),
                panelClass: "bg-white md-whiteframe-15dp",
                trapFocus: true,
                onCloseSuccess: function(panelRef, closeReason) {
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
                startTitle: ctrl.startLabel,
                endTitle: ctrl.endLabel,
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
    EasingBgCtrl.$inject = [ "$scope", "$element", "$window" ];
    angular.module("itaca.components").component("chEasingBg", {
        transclude: true,
        bindings: {
            bgClass: "@?",
            easingClass: "@?",
            easingClassLimit: "<",
            opacityLimit: "<",
            ngDisabled: "<"
        },
        controller: EasingBgCtrl,
        template: '<div class="ch-easing-bg" ng-style="$ctrl.$$contStyle">' + '<div class="{{$ctrl.bgClass}}" ng-attr-style="{{$ctrl.$$bgStyle}}"></div>' + '<div ng-transclude class="{{$ctrl.$$transClass}}" ng-style="$ctrl.$$transStyle"></div>' + "</div>"
    });
    function EasingBgCtrl($scope, $element, $window) {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.ngDisabled = _.isBoolean(ctrl.ngDisabled) ? ctrl.ngDisabled : false;
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
            if (ctrl.ngDisabled) {
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
            if (ctrl.ngDisabled) {
                ctrl.$disableEasing();
                return;
            }
            var backdrop = angular.element(document.querySelectorAll(".md-select-backdrop, .md-menu-backdrop"));
            var offset = 0 + $window.pageYOffset / (ctrl.opacityLimit - $element[0].childNodes[0].offsetHeight);
            var alpha = offset >= 1 ? 1 : offset;
            if (backdrop.length > 0) {
                alpha = 1;
            }
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
                return ctrl.ngDisabled;
            }, function(newVal) {
                newVal = _.isBoolean(newVal) ? newVal : false;
                if (newVal) {
                    ctrl.$disableEasing();
                } else {
                    ctrl.$enableEasing();
                }
            });
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
            ngMapCtrl: "ngMap"
        },
        bindings: {
            hotel: "<",
            showGallery: "<?",
            markerType: "@",
            onHotelClick: "&?"
        },
        controller: HotelMapInfoWindowCtrl,
        template: '<info-window id="hotel-iw">' + '<div ng-non-bindable style="max-width: 300px;">' + '<div ng-if="$ctrl.showGallery" style="width: 100; max-height: 200px" ng-init="config.noTop = true">' + '<div flex ng-controller="slideGalleryCtrl" ng-init="bindGallery($ctrl.hotel.gallery); overrideConfig({autoplay: 0});">' + '<div class="relative">' + '<div class="img-top-bar">' + '<div class="img-top-left-cont layout-row">' + '<div class="md-subhead row-mini" ng-if="$ctrl.hotel.recommended">' + '<small class="label gradient-yellow">' + '<md-icon class="mdi mdi-thumb-up md-14 text-white"></md-icon>&nbsp;' + '<span translate="common.recommended"></span>' + "</small>" + "</div>" + "<div flex></div>" + '<span ng-if="$ctrl.hotel" ng-controller="favoriteCtrl" ng-init="init($ctrl.hotel)">' + '<md-button class="md-icon-button bg-opaque-5" ng-click="setFavorite()" aria-label="Like hotel">' + '<md-icon ng-show="!$ctrl.hotel.favorite" class="mdi mdi-heart-outline text-white md-24"></md-icon>' + '<md-icon ng-show="$ctrl.hotel.favorite" class="mdi mdi-heart text-danger md-24" ng-class="{\'animated rubberBand\': $ctrl.hotel.favorite}"></md-icon>' + '<md-tooltip><span translate="common.favorite.set"></span></md-tooltip>' + "</md-button>" + "</span>" + "</div>" + "</div>" + '<div ng-show="loading" flex layout layout-align="center center">' + '<md-progress-circular class="md-primary ch-progress" md-mode="indeterminate" md-diameter="40"></md-progress-circular>' + "</div>" + '<img ng-if="!gallery.length && !loading" class="main-image" ng-attr-alt="{{$ctrl.hotel.name}}" src="/resources/public/img/header.jpg">' + '<ks-swiper-container class="button-mini" ng-if="gallery.length && galleryConfig.storageUrl && !loading"' + 'override-parameters="{' + "grabCursor: galleryConfig.navButtons," + "keyboardControl: galleryConfig.keyboardControl," + "onSlideChangeStart: loadImageTags," + "centeredSlides: galleryConfig.centered," + "autoplayDisableOnInteraction: galleryConfig.autoplayDisableOnInteraction," + "preloadImages: !galleryConfig.lazyLoading," + "lazyLoading: galleryConfig.lazyLoading," + "lazyLoadingInPrevNext: galleryConfig.lazyLoading," + "pagination: false," + "watchSlidesVisibility: galleryConfig.lazyLoading && (galleryConfig.slidesPerView == 'auto' || galleryConfig.slidesPerView > 1)}\"" + 'container-cls="index-0 bg-gray-base"' + 'wrapper-cls="layout-row layout-align-start-center"' + 'pagination-cls="swiper-pagination-white"' + 'slides-per-view="galleryConfig.slidesPerView"' + 'slides-per-column="galleryConfig.slidesPerColumn"' + 'centered="galleryConfig.centered"' + 'autoplay="galleryConfig.autoplay"' + 'direction="{{galleryConfig.direction}}"' + 'show-nav-buttons="galleryConfig.navButtons"' + 'pagination-is-active="galleryConfig.pagination"' + 'pagination-clickable="galleryConfig.paginationClickable"' + 'initial-slide="galleryConfig.initialSlide"' + 'space-between="galleryConfig.spaceBetween"' + 'loop="galleryConfig.loop">' + '<ks-swiper-slide slider-cls="no-bg" ng-class="{\'text-center\': galleryConfig.centered}" ng-repeat="image in gallery track by $index">' + "<div ng-if=\"!galleryConfig.lazyLoading\" class=\"main-image\" ng-style=\"{'background-image': 'url('+galleryConfig.storageUrl + image.path+')'}\"></div>" + '<div ng-if="galleryConfig.lazyLoading" ng-attr-data-background="{{galleryConfig.storageUrl}}{{image.path}}" class="main-image swiper-lazy">' + '<div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>' + "</div>" + "</ks-swiper-slide>" + "</ks-swiper-container>" + "</div>" + "</div>" + "</div>" + '<div layout="column" class="md-padding no-padding-left no-padding-right no-padding-bottom text-left">' + "<div layout>" + "<div flex>" + "<div md-truncate>" + '<span class="md-subhead">{{$ctrl.hotel.name}}</span>' + "</div>" + "<div layout>" + "<div flex>" + '<div><small class="label label-inline-block gradient-gray text-white text-wrap"><span translate="hotel.type.{{$ctrl.hotel.type}}"></span></small></div>' + '<div class="md-body-1 text-gray-light">' + "<span>{{$ctrl.hotel.addressInfo.district}}</span>,&nbsp;<strong>{{$ctrl.hotel.addressInfo.city}}</strong>" + "</div>" + '<div class="md-body-1 text-gray-light">' + '<md-icon class="mdi mdi-map-marker md-14"></md-icon>&nbsp;<small><em>{{$ctrl.hotel.addressInfo.address}},&nbsp;{{$ctrl.hotel.addressInfo.zipcode}}</em></small>' + "</div>" + "</div>" + "<div ng-if=\"$ctrl.markerType == 'price'\">" + '<md-button ng-if="$ctrl.hotel.price" class="only-border border-success text-success no-margin-top no-margin-right">' + '<div class="row-mini text-left">' + '<div layout="column">' + "<small>" + '<span class="text-initial" translate="common.from"></span>' + '<i ng-if="$ctrl.hotel.price.amount.initialAmount > 0 && $ctrl.hotel.price.amount.initialAmount > $ctrl.hotel.price.amount.finalAmount">&nbsp;<del>{{$ctrl.hotel.price.amount.initialAmount|chCurrency}}</del></i>' + "</small>" + '<span class="md-subhead row-mini"><strong>{{($ctrl.hotel.price.amount.finalAmount|chCurrency)}}</strong></span>' + '<small ng-if="$ctrl.hotel.nights > 0" class="text-lowercase">' + '<span translate="common.for"></span>&nbsp;{{$ctrl.hotel.nights}}&nbsp;' + '<span ng-show="$ctrl.hotel.nights == 1" translate="common.night"></span>' + '<span ng-show="$ctrl.hotel.nights > 1" translate="common.nights"></span>' + "</small>" + "</div>" + "</div>" + "</md-button>" + '<div ng-if="!$ctrl.hotel.price" layout="column" class="text-warn">' + '<md-icon class="mdi mdi-emoticon-sad md-32 text-warn"></md-icon>' + '<strong translate="reservation.availability.missed"></strong>' + "</div>" + "</div>" + "</div>" + "</div>" + "</div>" + "<div ng-if=\"$ctrl.markerType == 'price'\">" + '<div layout layout-padding layout-wrap class="no-padding-right no-padding-left no-padding-bottom" ng-if="$ctrl.hotel.price && $ctrl.hotel.roomsCounter.actual >= 1">' + '<div flex-xs="100" flex-gt-xs layout layout-align="start center" class="text-success no-padding-left">' + '<strong><em translate="reservation.availability.ok.simple"></em></strong>' + "</div>" + '<div flex-xs="100" flex layout="column" class="no-padding">' + '<md-button class="bg-success no-margin-left no-margin-right" ng-click="$ctrl.$hotelClick()" aria-label="Book now">' + '<span translate="common.book"></span>' + "</md-button>" + "</div>" + "</div>" + '<div layout layout-padding layout-wrap class="no-padding-right no-padding-left no-padding-bottom" ng-if="!$ctrl.hotel.price || $ctrl.hotel.roomsCounter.actual <= 0">' + '<div flex-xs="100" flex-gt-xs layout layout-align="start center" class="text-warn no-padding-left">' + '<strong><em translate="reservation.availability.missed.full"></em></strong>' + "</div>" + '<div flex-xs="100" flex layout="column" class="no-padding">' + '<md-button class="bg-warn no-margin-left no-margin-right" ng-click="$ctrl.$hotelClick()" aria-label="Search other dates">' + '<span translate="reservation.view.other.period"></span>' + "</md-button>" + "</div>" + "</div>" + "</div>" + "</div>" + "</div>" + "</info-window>"
    });
    function HotelMapInfoWindowCtrl($scope) {
        var ctrl = this;
        this.$onInit = function() {};
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
        this.$setSelected = function(hotel, selected) {
            if (hotel) {
                hotel.selectEffect = false;
                hotel.selected = _.isBoolean(selected) ? selected : true;
            }
        };
        this.$showDetails = function(hotel, isCustomMarker) {
            if (!ctrl.chHotelMapCtrl.$$currHotel || ctrl.chHotelMapCtrl.$$currHotel.id != hotel.id) {
                ctrl.$hideDetails(ev, ctrl.chHotelMapCtrl.$$currHotel);
                ctrl.setSelected(hotel, true);
                ctrl.chHotelMapCtrl.$$currHotel = hotel;
            }
            ctrl.chHotelMapCtrl.map.showInfoWindow("hotel-iw", isCustomMarker ? "cmk_" + hotel.id : "mk_" + hotel.id);
        };
        this.$hideDetails = function(hotel) {
            ctrl.$setSelected(hotel, false);
            ctrl.chHotelMapCtrl.map.hideInfoWindow("hotel-iw");
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
            markerType: "@",
            searchParams: "<?",
            disableUi: "<?",
            disableScrollwheel: "<?",
            mapClass: "@",
            onHotelClick: "&?"
        },
        controller: HotelMapCtrl,
        template: '<ng-map class="{{$ctrl.mapClass}}" ng-style="$ctrl.$$mapStyle" default-style="false" zoom-to-inlude-markers="true" disable-default-ui="{{$ctrl.disableUi}}" ' + 'center="[{{$ctrl.$$center.lat}}, {{$ctrl.$$center.lng}}]" map-initialized="$ctrl.$initMap(map)" zoom="14" clickable-icons="false" trigger-resize="true" scrollwheel="{{!$ctrl.disableScrollwheel}}">' + '<div ng-if="$ctrl.hotel">' + '<ch-hotel-map-marker hotel="$ctrl.hotel" marker-type="$ctrl.markerType"></ch-hotel-map-marker>' + "</div>" + '<div ng-if="$ctrl.hotels" ng-repeat="hotel in $ctrl.hotels">' + '<ch-hotel-map-marker hotel="hotel" marker-type="$ctrl.markerType"></ch-hotel-map-marker>' + "</div>" + '<ch-hotel-map-info-window hotel="$ctrl.$$currHotel" marker-type="$ctrl.markerType" show-gallery="$ctrl.showGallery" on-hotel-click="$ctrl.onHotelClick"></ch-hotel-map-info-window>' + "</ng-map>"
    });
    function HotelMapCtrl($scope, $element, $timeout) {
        var ctrl = this;
        this.$$geocoder = new google.maps.Geocoder();
        this.$onInit = function() {
            ctrl.showGallery = _.isBoolean(scope.showGallery) ? scope.showGallery : false;
            ctrl.disableUi = _.isBoolean(scope.disableUi) ? scope.disableUi : false;
            ctrl.markerType = _.includes([ "pointer", "price", "name" ], _.toLower(scope.markerType)) ? _.toLower(scope.markerType) : "pointer";
            ctrl.mapClass = scope.mapClass || "flex";
            ctrl.disableScrollwheel = _.isBoolean(scope.disableScrollwheel) ? scope.disableScrollwheel : false;
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
            ctrl.$initWatches();
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
                crl.$updateCenter(map);
            }
        };
        this.$updateCenter = function(map) {
            $timeout(function() {
                if (_.isNil(ctrl.$$centerObj)) {
                    ctrl.$$centerObj = new google.maps.LatLng(0, 0);
                }
                _.assign(ctrl.$$center, scope.$$centerObj.toJSON());
                google.maps.event.trigger(map, "resize");
            }, 1e3);
        };
        this.$initWatches = function() {
            scope.$watchCollection(function() {
                return ctrl.$$map.markers;
            }, function(newVal, oldVal) {
                ctrl.$getCenter(ctrl.$$map);
            });
            scope.$watchCollection(function() {
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
});

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
            ctrl.$initWatches();
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
        this.$initWatches = function() {
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
    LoadingModalCtrl.$inject = [ "$scope" ];
    angular.module("itaca.components").component("chLoadingModal", {
        bindings: {
            message: "<",
            messageKey: "<",
            progressDiameter: "@",
            contClass: "@"
        },
        controller: LoadingModalCtrl,
        template: '<div flex layout="column" layout-padding layout-align="center center" class="ch-loading-modal {{$ctrl.contClass}}">' + "<div>" + '<md-progress-circular class="md-primary ch-progress" md-mode="indeterminate" md-diameter="{{$ctrl.progressDiameter}}"></md-progress-circular>' + "</div>" + '<div ng-if="$ctrl.message || $ctrl.messageKey" class="text-center">' + '<span ng-if="$ctrl.message" ng-bind="$ctrl.message"></span>' + '<span ng-if="!$ctrl.message && $ctrl.messageKey" translate="{{$ctrl.messageKey}}"></span>' + "</div>" + "</div>"
    });
    function LoadingModalCtrl($scope) {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.progressDiameter = ctrl.progressDiameter || 80;
        };
    }
})();

(function() {
    "use strict";
    LoadingProgressCtrl.$inject = [ "$scope", "$element" ];
    angular.module("itaca.components").component("chLoadingProgress", {
        bindings: {
            message: "<",
            messageKey: "<",
            errorMessage: "<",
            errorMessageKey: "<",
            progressDiameter: "@",
            contClass: "@",
            hideSiblings: "<"
        },
        controller: LoadingProgressCtrl,
        template: '<div flex="100" layout="column" layout-align="center center" class="{{$ctrl.contClass}}">' + '<div ng-if="!$ctrl.errorMessage && !$ctrl.errorMessageKey" flex layout="column" layout-padding layout-align="center center">' + "<div>" + '<md-progress-circular class="ch-progress-white" md-mode="indeterminate" md-diameter="{{$ctrl.progressDiameter}}"></md-progress-circular>' + "</div>" + '<div ng-if="$ctrl.message || $ctrl.messageKey" class="text-center">' + '<span ng-if="$ctrl.message" ng-bind="$ctrl.message"></span>' + '<span ng-if="!$ctrl.message && $ctrl.messageKey" translate="{{$ctrl.messageKey}}"></span>' + "</div>" + "</div>" + '<div ng-if="$ctrl.errorMessage || $ctrl.errorMessageKey" flex layout="column" layout-padding layout-align="center center">' + "<div>" + '<md-icon class="mdi mdi-alert-circle-outline md-70 text-white"></md-icon>' + "</div>" + '<div class="md-display-2">Oops...</div>' + "<div>" + '<span ng-if="$ctrl.errorMessage" ng-bind="$ctrl.errorMessage"></span>' + '<span ng-if="!$ctrl.errorMessage && $ctrl.errorMessageKey" translate="{{$ctrl.errorMessageKey}}"></span>' + "</div>" + "</div>" + "</div>"
    });
    function LoadingProgressCtrl($scope, $element) {
        var ctrl = this;
        this.$postLink = function() {
            ctrl.$hideSiblings(ctrl.hideSiblings);
        };
        this.$onInit = function() {
            ctrl.contClass = ctrl.contClass || "bg-primary text-white md-title";
            ctrl.progressDiameter = ctrl.progressDiameter || 150;
            ctrl.$initWatches();
        };
        this.$onDestroy = function() {
            ctrl.$hideSiblings(false);
        };
        this.$hideSiblings = function(hide) {
            var children = $element.parent().children();
            hide ? children.addClass("ng-hide") : children.removeClass("ng-hide");
            $element.removeClass("ng-hide");
        };
        this.$initWatches = function() {
            $scope.$watch(function() {
                return ctrl.hideElement;
            }, function(newVal, oldVal) {
                ctrl.$toggleEl(oldVal, true);
                ctrl.$toggleEl(newVal);
            });
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
    PeopleIconsCtrl.$inject = [ "$scope", "Dialog" ];
    angular.module("itaca.components").component.directive("chPeopleIcons", {
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
    PeoplePickerCtrl.$inject = [ "$scope", "$element", "$mdPanel", "ReservationUtils" ];
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
        template: '<ng-form name="chPeoplePickerForm" class="flex no-padding layout-column">' + '<md-button class="ch-people-counter-button flex layout-padding no-padding minimal-button text-lowercase text-center {{$ctrl.buttonClass}}" aria-label="Change people" ng-disabled="$ctrl.ngDisabled" ng-click="$ctrl.$openPanel($event)">' + '<div class="{{$ctrl.wrapperClass}}">' + '<div ng-if="$ctrl.label" class="md-padding">' + '<div class="{{$ctrl.labelClass}} text-initial text-wrap row-1" ng-class="{"text-small": $ctrl.$$hasPeople}"><span ng-bind-html="$ctrl.label"></span></div>' + "</div>" + '<div ng-show="$ctrl.$$hasPeople" class="md-subhead text-wrap row-mini">' + '<strong><ch-people-summary people="$ctrl.people"></ch-people-summary></strong>' + "</div>" + "</div>" + '<input type="hidden" name="{{$ctrl.fieldName}}" ng-model="$ctrl.people" ng-required="$ctrl.ngRequired">' + '<div ng-messages="chPeoplePickerForm[$ctrl.fieldName].$error" ng-show="chPeoplePickerForm[$ctrl.fieldName].$dirty" class="text-danger text-small text-center row-1 no-padding layout-column layout-padding-sm">' + '<div ng-message="required">' + '<md-icon ng-if="$ctrl.showErrorIcon" class="mdi mdi-alert-outline material-icons md-18 text-danger"></md-icon>' + '<span class="text-wrap" translate="error.required"></span>' + "</div>" + '<div ng-message="min">' + '<md-icon ng-if="$ctrl.showErrorIcon" class="mdi mdi-alert-outline material-icons md-18 text-danger"></md-icon>' + '<span class="text-wrap" ng-if="$ctrl.errorMessages.min" ng-bind="$ctrl.errorMessages.min">' + '</span><span class="text-wrap" ng-if="!$ctrl.errorMessages.min" translate="error.field.min" translate-value-num="{{$ctrl.minCount}}"></span>' + "</div>" + "</div>" + "</md-button>" + "</ng-form>"
    });
    function PeoplePickerCtrl($scope, $element, $mdPanel, ReservationUtils) {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.fieldName = ctrl.fieldName || "people";
            ctrl.clickOutsideToClose = ctrl.clickOutsideToClose || true;
            ctrl.hasBackdrop = _.isNil(ctrl.hasBackdrop) ? false : ctrl.hasBackdrop;
            ctrl.buttonClass = ctrl.buttonClass || "no-margin";
            ctrl.labelClass = ctrl.labelClass || "text-gray-light";
            ctrl.$$xPosition = "CENTER";
            ctrl.$$yPosition = "BELOW";
            ctrl.$$panelClass = "bg-white md-whiteframe-15dp";
            var position = $mdPanel.newPanelPosition().relativeTo($element).addPanelPosition($mdPanel.xPosition[ctrl.$$xPosition], $mdPanel.yPosition[ctrl.$$yPosition]);
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
            ctrl.$initWatches();
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
            var mc = ctrl.chPeoplePickerForm[ctrl.fieldName];
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
        this.$initWatches = function() {
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
            ctrl.$initWatches();
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
                        ctrl.$$peopleSummary = guestsCount.total + " " + message;
                    });
                }
            } else {
                ReservationUtils.peopleSummary(ctrl.people, ctrl.extraPeople).then(function(message) {
                    ctrl.$$peopleSummary = message;
                });
            }
        };
        this.$initWatches = function() {
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
            ctrl.$initWatches();
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
        this.$initWatches = function() {
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
        template: '<ng-form name="chPriceRangeForm" class="flex no-padding layout-column">' + '<md-button class="ch-price-range-button flex minimal-button text-initial {{$ctrl.buttonClass}}" ng-click="$ctrl.$openPanel($event)" aria-label="Change price range" ng-disabled="$ctrl.ngDisabled">' + '<div class="{{$ctrl.wrapperClass}}">' + '<div ng-show="$ctrl.max" class="text-wrap row-mini">' + '<strong ng-show="$ctrl.min">{{$ctrl.min|chCurrency}}&nbsp;-&nbsp;</strong>' + '<span ng-show="!$ctrl.min"><span translate="common.up.to"></span>&nbsp;</span>' + '<strong>{{$ctrl.max|chCurrency}}</strong>&nbsp;<span ng-if="$ctrl.type == "nightly"" class="text-lowercase" translate="service.type.payment.NIGHTLY"></span>' + "</div>" + '<div ng-show="!$ctrl.max">' + '<span translate="filter.by"></span>&nbsp;<span class="text-lowercase" translate="common.price"></span>' + "</div>" + "</div>" + "</md-button>" + "</ng-form>"
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
                templateUrl: "/reservation-price-slider.part",
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
            hideUser: "<?",
            userState: "@?",
            userStateParams: "<?",
            userClick: "&?",
            hideLikes: "<?",
            likeLabel: "@?",
            unlikeLabel: "@?",
            likeClick: "&?"
        },
        controller: ReviewActionsCtrl,
        template: "<div flex>" + '<div ng-if="!$ctrl.noDefault && (!$ctrl.hideUser || !$ctrl.hideLikes)" class="bg-gray-lighter flex layout-row layout-wrap layout-padding">' + '<div class="layout-row layout-padding-sm no-padding no-outline" ng-class="{\'clickable\': $ctrl.userState || $ctrl.userClick}" ng-click="$ctrl.$userClick($event)" aria-label="Toggle user action">' + "<div>" + '<span ng-if="$ctrl.userAvatar && $ctrl.review.reviewSettings.showAvatar && !$ctrl.review.reviewSettings.anonymous"' + 'class="relative menu-user-avatar-small display-block overflow-hidden">' + '<img alt="User profile image" class="full-width" ng-src="{{$ctrl.userAvatar}}" lazy-image />' + "</span>" + '<span ng-if="(!$ctrl.review.reviewSettings.showAvatar || !$ctrl.userAvatar) && !$ctrl.review.reviewSettings.anonymous"' + 'class="bg-blue-sea menu-user-avatar-small layout-row layout-align-center-center">' + '<span class="md-headline text-uppercase">{{!$ctrl.review.reviewSettings.showRealName && ($ctrl.review.createdBy || $ctrl.review.reservation.guest).nickname ? ($ctrl.review.createdBy || $ctrl.review.reservation.guest).nickname.charAt(0) : ($ctrl.review.createdBy || $ctrl.review.reservation.guest).name.charAt(0)}}</span>' + "</span>" + '<md-icon ng-if="$ctrl.review.reviewSettings.anonymous" class="mdi mdi-account-circle md-38"></md-icon>' + "</div>" + '<div class="layout-align-center-start layout-column no-padding-bottom no-padding-top row-1">' + '<small class="font-10 text-gray-light row-1"><span translate="common.written.by.female"></span>:</small>' + '<strong class="md-subhead">' + '<span ng-if="!$ctrl.review.reviewSettings.anonymous && ($ctrl.review.createdBy || $ctrl.review.reservation.guest)">' + '<span ng-if="!$ctrl.review.reviewSettings || $ctrl.review.reviewSettings.showRealName || !$ctrl.review.createdBy.nickname">' + '<span ng-if="$ctrl.review.createdBy">{{::$ctrl.review.createdBy.name}}&nbsp;{{::$ctrl.review.createdBy.surname}}</span>' + '<span ng-if="!$ctrl.review.createdBy && $ctrl.review.reservation.guest">{{::$ctrl.review.reservation.guest.name}}&nbsp;{{::$ctrl.review.reservation.guest.surname}}</span>' + "</span>" + '<span ng-if="$ctrl.review.reviewSettings && !$ctrl.review.reviewSettings.showRealName && $ctrl.review.createdBy.nickname">' + '<span ng-if="$ctrl.review.createdBy">{{::$ctrl.review.createdBy.nickname}}</span>' + '<span ng-if="!$ctrl.review.createdBy && $ctrl.review.reservation.guest">{{::$ctrl.review.reservation.guest.nickname}}</span>' + "</span>" + "</span>" + '<span ng-if="$ctrl.review.reviewSettings.anonymous || (!$ctrl.review.createdBy && !$ctrl.review.reservation.guest)" translate="common.anonymous"></span>' + "</strong>" + '<small class="font-10 text-gray-light row-1 text-lowercase" ng-if="!$ctrl.review.reviewSettings.anonymous && $ctrl.review.guest.reviewsCount">' + "<span>{{::$ctrl.review.guest.reviewsCount}}&nbsp;</span>" + '<span ng-if="$ctrl.review.guest.reviewsCount == 1" translate="reviews.review"></span>' + '<span ng-if="$ctrl.review.guest.reviewsCount != 1" translate="reviews.reviews"></span>' + "</small>" + "</div>" + "</div>" + '<div ng-if="!$ctrl.hideLikes" class="no-padding flex-gt-sm flex-xs-100 flex-sm-100 layout-row layout-align-center-center layout-align-gt-sm-end-center">' + '<md-button class="auto-height md-primary md-raised no-margin" ng-click="$ctrl.$likeClick($event)" aria-label="Toggle like">' + '<md-icon ng-show="!$ctrl.review.helpful" class="mdi md-18 mdi-thumb-up"></md-icon>&nbsp;' + '<small ng-if="!$ctrl.review.helpful"><span ng-if="!$ctrl.likeLabel" translate="review.likes.button"></span><span ng-if="$ctrl.likeLabel" ng-bind="$ctrl.likeLabel"></span></small>' + '<small ng-if="$ctrl.review.helpful"><span ng-if="!$ctrl.unlikeLabel" translate="review.likes.button.undo"></span><span ng-if="$ctrl.unlikeLabel" ng-bind="$ctrl.unlikeLabel"></span></small>' + "</md-button>" + "</div>" + "</div>" + "<div flex ng-transclude></div>" + "<md-divider></<md-divider>" + "</div>"
    });
    function ReviewActionsCtrl($scope, Navigator) {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.hideUser = _.isBoolean(ctrl.hideUser) ? ctrl.hideUser : ctrl.chReviewCtrl.hideUser;
            ctrl.hideLikes = _.isBoolean(ctrl.hideLikes) ? ctrl.hideLikes : ctrl.chReviewCtrl.hideLikes;
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
                    review: ctrl.review
                });
            }
        };
        this.$likeClick = function(ev) {
            ctrl.likeClick && ctrl.likeClick({
                $event: ev,
                review: ctrl.review
            });
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
            dateFormat: "@?",
            hideLikes: "<?"
        },
        controller: ReviewContentCtrl,
        template: "<div>" + '<div class="layout-row layout-wrap layout-align-center-center layout-padding">' + '<div class="layout-column flex-xs-100 flex-sm-100 flex-gt-sm">' + '<div ng-show="!$ctrl.review.showDetails">' + '<div class="md-margin ng-scope no-margin-top no-margin-x-sides">' + '<small><span translate="review.score.total"></span>:</small>' + '<md-progress-linear md-mode="determinate" value="{{($ctrl.review.score * 10)}}"></md-progress-linear>' + "</div>" + "</div>" + '<div ng-show="$ctrl.review.showDetails">' + '<div ng-repeat="feedback in $ctrl.review.feedbacks track by $index" class="md-margin ng-scope no-margin-top no-margin-x-sides"' + 'title="{{::feedback.value}}" ng-switch="feedback.type">' + '<small class="layout-row flex-100"><span class="flex" translate="{{::feedback.titleKey}}" translate-values="{{feedback.titleParams}}"></span><span ng-if="feedback.type == \'RANK\'">{{::feedback.value}}</span></small>' + '<md-progress-linear ng-switch-when="RANK" md-mode="determinate" value="{{(feedback.value * 10)}}"></md-progress-linear>' + "<div ng-switch-default>" + '<small ng-if="feedback.value">{{feedback.value}}</small>' + '<small ng-if="!feedback.value" class="text-gray-light text-lowercase"><em>({{::(\'review.comment.none\'|translate)}})</em></small>' + "</div>" + "</div>" + "</div>" + '<div class="text-right">' + '<md-button class="auto-height no-margin row-1 text-capitalize text-gray-light text-small" ng-click="$ctrl.review.showDetails = !$ctrl.review.showDetails" aria-label="show details">' + '<span ng-if="!$ctrl.review.showDetails" translate="common.show"></span>' + '<span ng-if="$ctrl.review.showDetails" translate="common.hide"></span>' + '&nbsp;<span class="text-lowercase" translate="common.details"></span>' + "<md-icon ng-class=\"$ctrl.review.showDetails ? 'mdi-chevron-up' : 'mdi-chevron-down'\" class=\"mdi md-18\"></md-icon>" + "</md-button>" + "</div>" + "</div>" + "<div class=\"flex-100 flex-gt-sm-20 layout-column\" ng-class=\"$ctrl.review.showDetails ? 'layout-align-center-center' : 'layout-align-start-center'\">" + '<small ng-if="$ctrl.review.showDetails" class="font-12 text-gray-light text-center" translate="review.score.total"></small>' + '<span class="md-headline">{{::$ctrl.review.score.toFixed(1)}}</span>' + '<span class="text-center" translate="{{$ctrl.review.label}}"></span>' + "</div>" + "</div>" + "<div ng-transclude></div>" + '<div ng-if="$ctrl.review.createdDate" class="layout-padding">' + '<small class="text-gray-light">{{$ctrl.review.createdDate|utcDate:$ctrl.dateFormat}}</small>' + "</div>" + "<md-divider></<md-divider>" + '<div ng-if="!$ctrl.hideLikes && $ctrl.review.likes.length" class="bg-gray-lighter">' + '<div class="layout-padding">' + '<small class="text-primary">' + '<md-icon class="mdi md-14 mdi-thumb-up text-primary"></md-icon>&nbsp;' + '<span ng-if="!$ctrl.review.helpful" class="text-lowercase">' + "<span>{{$ctrl.review.likes.length}}&nbsp;</span>" + '<span ng-if="$ctrl.review.likes.length == 1" translate="review.likes.count"></span>' + '<span ng-if="$ctrl.review.likes.length != 1" translate="review.likes.count.plur"></span>' + "</span>" + '<span ng-if="$ctrl.review.helpful">' + '<span ng-if="$ctrl.review.likes.length == 1" translate="review.likes.you"></span>' + '<span ng-if="$ctrl.review.likes.length != 1" translate="review.likes.you.other" translate-values="{num: $ctrl.review.likes.length}"></span>' + "</span>" + "</small>" + "</div>" + "<md-divider></<md-divider>" + "</div>" + "</div>"
    });
    function ReviewContentCtrl($scope) {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.dateFormat = ctrl.dateFormat || ctrl.chReviewCtrl.dateFormat;
            ctrl.hideLikes = _.isBoolean(ctrl.hideLikes) ? ctrl.hideLikes : ctrl.chReviewCtrl.hideLikes;
            ctrl.$initReview();
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
        template: '<div flex layout-padding class="md-subhead row-mini text-bold">' + '<a ng-href="{{\'/hotel/\'+ $ctrl.review.hotel.id}}" target="_blank" class="display-block clickable">' + '<span class="layout-row layout-align-start-center">' + '<img ng-if="!$ctrl.hideImage && $ctrl.$$hotelImage" class="md-margin menu-user-avatar-small no-margin-left no-margin-y-sides" ng-src="{{$ctrl.$$hotelImage}}">' + '<span class="no-padding layout-column">' + "<span>" + '<span class="text-primary">{{::$ctrl.review.hotel.name}}&nbsp;</span>' + '<span class="label label-xs" translate="hotel.type.{{::$ctrl.review.hotel.type}}"></span>' + "</span>" + '<small class="text-gray-light">' + "<span>{{::$ctrl.review.hotel.addressInfo.city}}</span>,&nbsp;" + "<span>{{::$ctrl.review.hotel.addressInfo.address}}</span>" + "</small>" + "</span>" + "</span>" + "</a>" + "</div>"
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
    angular.module("itaca.components").component("chReviewProCon", {
        transclude: true,
        require: {
            chReviewCtrl: "^chReview"
        },
        bindings: {
            textLimit: "<?"
        },
        controller: ReviewProConCtrl,
        template: '<div ng-if="$ctrl.review.pro || $ctrl.review.con" flex layout-padding>' + '<div ng-if="$ctrl.review.pro" class="md-padding no-padding-top">' + '<md-icon class="mdi mdi-thumb-up-outline text-success md-24"></md-icon>&nbsp;' + '<strong><span translate="review.pro"></span>:</strong>' + '<div class="layout-margin no-margin-x-sides text-ellipsis">' + '<span hm-read-more hm-text="{{$ctrl.review.pro}}" hm-limit="$ctrl.textLimit"' + "hm-more-text=\"{{'common.read.more'|translate}}\"" + "hm-less-text=\"{{'common.read.less'|translate}}\"" + 'hm-link-class="clickable text-primary"></span>' + "</div>" + "</div>" + '<div ng-if="$ctrl.review.con" class="md-padding no-padding-top">' + '<md-icon class="mdi mdi-thumb-down-outline text-warn md-24"></md-icon>&nbsp;' + '<strong><span translate="review.con"></span>:</strong>' + '<div class="layout-margin no-margin-x-sides text-ellipsis">' + '<span hm-read-more hm-text="{{$ctrl.review.con}}" hm-limit="$ctrl.textLimit"' + "hm-more-text=\"{{'common.read.more'|translate}}\"" + "hm-less-text=\"{{'common.read.less'|translate}}\"" + 'hm-link-class="clickable text-primary"></span>' + "</div>" + "</div>" + "</div>"
    });
    function ReviewProConCtrl() {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.textLimit = isFinite(parseInt(ctrl.textLimit)) ? parseInt(ctrl.textLimit) : 200;
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
    ReviewReplyCtrl.$inject = [ "$scope" ];
    angular.module("itaca.components").component("chReviewReply", {
        transclude: true,
        require: {
            chReviewCtrl: "^chReview"
        },
        bindings: {
            ngReadonly: "<?",
            ngEdit: "<?",
            title: "@",
            onReply: "&?",
            responseClass: "@?",
            arrowClass: "@?"
        },
        controller: ReviewReplyCtrl,
        template: '<div ng-show="!$ctrl.ngReadonly || $ctrl.review.reply.response || $ctrl.noDefault" class="ch-review-reply">' + '<div class="ch-review-reply-arrow {{$ctrl.arrowClass}}"></div>' + '<div class="layout-padding no-padding ch-review-reply-inner {{$ctrl.responseClass}}">' + '<div ng-if="!$ctrl.noDefault" class="layout-padding-sm">' + '<div><strong><span ng-if="!$ctrl.title"><span translate="common.answer"></span>:</span><span ng-if="$ctrl.title" ng-bind="$ctrl.title"></strong></div>' + "<div ng-if=\"$ctrl.$$currentMode == 'view'\">" + '<div class="text-ellipsis text-wrap">' + '<span hm-read-more hm-text="{{$ctrl.review.reply.response}}" hm-limit="200" hm-more-text="{{\'common.read.more\'|translate}}"' + 'hm-less-text="{{\'common.read.less\'|translate}}" hm-link-class="clickable text-primary"></span>' + "</div>" + '<div ng-if="!$ctrl.ngReadonly">' + '<md-button ng-if="$ctrl.ngEdit" class="minimal-button no-margin-x-sides auto-height row-1 text-initial" ng-click="$ctrl.$editReply($event)" aria-label="Edit reply">' + '<small translate="common.edit"></small>' + "</md-button>" + "</div>" + "</div>" + "<div ng-if=\"$ctrl.$$currentMode == 'edit'\" layout layout-padding-sm>" + "<div flex>" + '<md-input-container md-no-float class="md-block bg-white minimal-input no-margin">' + '<textarea placeholder="{{\'review.reply.label\'|translate}}..." ng-model="$ctrl.$$reply" max-rows="5" md-no-resize></textarea>' + "</md-input-container>" + "</div>" + '<div layout layout-align="center end" class="no-padding">' + '<md-button class="md-icon-button md-raised" ng-disabled="!$ctrl.$$reply" ng-click="$ctrl.$sendReply($event)" aria-label="Send reply">' + '<md-icon class="mdi mdi-send md-24"></md-icon>' + "</md-button>" + "</div>" + "</div>" + "</div>" + '<div ng-transclude class="no-padding"></div>' + "</div>" + "</div>"
    });
    function ReviewReplyCtrl($scope) {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.ngReadonly = _.isBoolean(ctrl.ngReadonly) ? ctrl.ngReadonly : true;
            if (ctrl.ngReadonly) {
                ctrl.$$currentMode = "view";
            }
            ctrl.ngEdit = _.isBoolean(ctrl.ngEdit) ? ctrl.ngEdit : false;
            ctrl.responseClass = ctrl.responseClass || "bg-info-light";
            ctrl.arrowClass = ctrl.arrowClass || "border-info-light";
            ctrl.$initReview();
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
        this.$editReply = function(ev) {
            if (ctrl.ngReadonly) {
                ctrl.$cancelReplyEdit(ev);
                return;
            }
            ctrl.$$reply = angular.copy(ctrl.review.reply.response);
            ctrl.$$currentMode = "edit";
        };
        this.$cancelReplyEdit = function(ev) {
            ctrl.$$reply = null;
            ctrl.$$currentMode = "view";
        };
        this.$sendReply = function(ev) {
            ctrl.review.reply.response = angular.copy(ctrl.$$reply);
            ctrl.onReply && ctrl.onReply({
                $event: ev,
                reply: ctrl.review.reply.response
            });
            ctrl.$cancelReplyEdit(ev);
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
        controller: ReviewReportInfoCtrl,
        template: '<div class="no-padding flex" ng-if="$ctrl.review.reportType">' + "<div>" + '<md-icon class="mdi md-18 mdi-flag-variant text-danger"></md-icon>' + '<small translate="review.reporting.label"></small>' + "</div>" + "</div>"
    });
    function ReviewReportInfoCtrl() {
        var ctrl = this;
        this.$onInit = function() {
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
    ReviewCtrl.$inject = [ "$scope", "ReviewsUtils", "AppOptions" ];
    angular.module("itaca.components").component("chReview", {
        transclude: true,
        bindings: {
            review: "<",
            newLimit: "@?",
            dateFormat: "@?",
            hideUser: "<?",
            hideLikes: "<?",
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
            ctrl.hideLikes = _.isBoolean(ctrl.hideLikes) ? ctrl.hideLikes : false;
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
            ctrl.$initLikes();
            ctrl.$initWatches();
        };
        this.$initLikes = function() {
            ctrl.review.helpful = AppOptions.guest && AppOptions.guest.id && _.some(ctrl.review.likes, function(userId) {
                return _.isEqual(userId, AppOptions.guest.id);
            });
        };
        this.$getUserAvatar = function() {
            var baseUrl = AppOptions.config.amz.baseUrl + "/" + AppOptions.config.amz.bucketName + "/";
            if (ctrl.review.createdBy && ctrl.review.createdBy.avatarType) {
                switch (ctrl.review.createdBy.avatarType) {
                  case "PORTAL":
                    ctrl.userAvatar = ctrl.review.createdBy.avatar ? baseUrl + ctrl.review.createdBy.avatar : null;
                    break;

                  case "FACEBOOK":
                    ctrl.userAvatar = ctrl.review.createdBy.facebookImage;
                    break;

                  case "GOOGLE":
                    ctrl.userAvatar = ctrl.review.createdBy.googleImage;
                    break;

                  default:
                    ctrl.userAvatar = ctrl.review.createdBy.avatar ? baseUrl + ctrl.review.createdBy.avatar : null;
                    break;
                }
            }
            ctrl.review.reviewSettings = _.isObjectLike(ctrl.review.reviewSettings) ? ctrl.review.reviewSettings : {};
            ctrl.review.reviewSettings.showRealName = _.isBoolean(ctrl.review.reviewSettings.showRealName) ? ctrl.review.reviewSettings.showRealName : true;
        };
        this.$initWatches = function() {
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
            bgClass: "@?"
        },
        controller: ReviewsSummaryGarCtrl,
        template: '<div ng-if="$ctrl.summary.gar" class="layout-column layout-padding layout-align-center-center no-padding">' + '<div class="border-radius layout-column layout-align-center-center layout-padding {{$ctrl.bgClass}}">' + '<strong class="md-subhead" translate="{{$ctrl.summary.garLabel}}"></strong>' + '<span class="md-display-3 no-padding-top">{{$ctrl.summary.gar.toFixed(1)}}</span>' + '<small ng-if="!$ctrl.$$hideTitle" class="no-padding-bottom">' + '<span ng-if="$ctrl.title" ng-bind="$ctrl.title"></span>' + '<span ng-if="!$ctrl.subtitle" translate="review.score.total"><span>' + "</small>" + "</div>" + '<div ng-if="!$ctrl.$$hideSubtitle">' + "<small>" + '<span ng-if="$ctrl.subtitle" ng-bind="$ctrl.subtitle"></span>' + '<span ng-if="!$ctrl.subtitle" translate="review.reviews.real" translate-values="{num: $ctrl.summary.totalReviews}"></span>' + "</small>" + "</div>" + "</div>"
    });
    function ReviewsSummaryGarCtrl() {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.bgClass = ctrl.bgClass || "bg-primary";
            ctrl.$$hideTitle = _.isBoolean(ctrl.title) && !ctrl.title;
            ctrl.$$hideSubtitle = _.isBoolean(ctrl.subtitle) && !ctrl.subtitle;
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
            ctrl.$initWatches();
        };
        this.$initSummary = function() {
            if (!ctrl.chReviewsSummaryCtrl.summary) {
                return;
            }
            ctrl.summary = ctrl.chReviewsSummaryCtrl.summary;
        };
        this.$initWatches = function() {
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
            ctrl.summary.garLabel = ReviewsUtils.generateScoreLabel(Math.floor(ctrl.summary.gar));
        };
        this.$onDestroy = function() {};
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
                    return Boolean(o.cover);
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
                    return Boolean(o.cover);
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
        template: '<div ng-show="$ctrl.chRoomCtrl.showRoomInfo" ng-class="{\'animated fadeIn\': $ctrl.chRoomCtrl.showRoomInfo}">' + "<ng-transclude></ng-transclude>" + '<div class="text-center">' + '<md-button class="row-mini button-mini auto-height text-gray-light text-initial" ng-click="$ctrl.toggleInfo()" aria-label="close">' + '<md-icon class="mdi mdi-chevron-up text-gray-light md-18 material-icon"></md-icon>' + '<span translate="common.hide"></span>' + "</md-button>" + "</div>" + "</div>"
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
        template: '<div class="layout-column layout-margin-sm no-margin-left">' + '<div ng-if="$ctrl.chRoomCtrl.onArrival" class="no-margin-left">' + '<div class="layout-column layout-padding no-padding row-mini bg-success md-subhead">' + "<strong>" + '<md-icon class="mdi mdi-thumb-up md-18 text-white"></md-icon>' + '<span translate="reservation.pay.at.hotel"></span>' + "</strong>" + "</div>" + "</div>" + '<div ng-if="$ctrl.chRoomCtrl.bestPromo" class="no-margin-left">' + '<div class="layout-column layout-padding no-padding row-mini md-subhead" ' + "ng-class=\"{'bg-success': $ctrl.chRoomCtrl.bestPromo.onArrival || $ctrl.chRoomCtrl.bestPromo.promotionType == 'EARLY_BOOKING', " + "'bg-info' : !$ctrl.chRoomCtrl.bestPromo.onArrival && $ctrl.chRoomCtrl.bestPromo.promotionType == 'STANDARD',  " + "'bg-primary-light': !$ctrl.chRoomCtrl.bestPromo.onArrival && $ctrl.chRoomCtrl.bestPromo.promotionType == 'MINIMUM_STAY', " + "'bg-primary': !$ctrl.chRoomCtrl.bestPromo.onArrival && $ctrl.chRoomCtrl.bestPromo.promotionType == 'BOOK_TODAY', " + "'bg-blue-sea': !$ctrl.chRoomCtrl.bestPromo.onArrival && $ctrl.chRoomCtrl.bestPromo.promotionType == 'LAST_MINUTE', " + "'bg-warn': !$ctrl.chRoomCtrl.bestPromo.onArrival && $ctrl.chRoomCtrl.bestPromo.promotionType == 'LAST_SECOND'}\"> " + '<strong ng-if="!$ctrl.chRoomCtrl.bestPromo.onArrival" ng-switch="$ctrl.chRoomCtrl.bestPromo.promotionType"> ' + '<md-icon class="mdi mdi-sale md-10 text-white"></md-icon> ' + '<span ng-switch-when="STANDARD">' + '<span translate="common.offer.special"></span>&nbsp;<span ng-if="$ctrl.chRoomCtrl.bestPromo.discount.type==\'PERCENTAGE\'">-{{$ctrl.chRoomCtrl.bestPromo.discount.finalAmount}}%</span><span ng-if="$ctrl.chRoomCtrl.bestPromo.discount.type==\'PRICE\'">-{{$ctrl.chRoomCtrl.bestPromo.discount.finalAmount|chCurrency}}</span>' + "</span>" + '<span ng-switch-when="MINIMUM_STAY">' + '<span translate="promotions.promotion.label.minstay.nigths" translate-value-count="{{$ctrl.chRoomCtrl.bestPromo.minStay}}"></span>&nbsp;<span ng-if="$ctrl.chRoomCtrl.bestPromo.discount.type==\'PERCENTAGE\'">-{{$ctrl.chRoomCtrl.bestPromo.discount.finalAmount}}%</span><span ng-if="$ctrl.chRoomCtrl.bestPromo.discount.type==\'PRICE\'">-{{$ctrl.chRoomCtrl.bestPromo.discount.finalAmount|chCurrency}}</span>' + "</span>" + '<span ng-switch-when="BOOK_TODAY">' + '<span translate="promotions.promotion.label.only.today"></span>!&nbsp;<span ng-if="$ctrl.chRoomCtrl.bestPromo.discount.type==\'PERCENTAGE\'">-{{$ctrl.chRoomCtrl.bestPromo.discount.finalAmount}}%</span><span ng-if="$ctrl.chRoomCtrl.bestPromo.discount.type==\'PRICE\'">-{{$ctrl.chRoomCtrl.bestPromo.discount.finalAmount|chCurrency}}</span>' + "</span>" + '<span ng-switch-when="EARLY_BOOKING">' + '<span translate="promotions.early"></span>&nbsp;<span ng-if="$ctrl.chRoomCtrl.bestPromo.discount.type==\'PERCENTAGE\'">-{{$ctrl.chRoomCtrl.bestPromo.discount.finalAmount}}%</span><span ng-if="$ctrl.chRoomCtrl.bestPromo.discount.type==\'PRICE\'">-{{$ctrl.chRoomCtrl.bestPromo.discount.finalAmount|chCurrency}}</span>' + "</span>" + '<span ng-switch-when="LAST_MINUTE">' + '<span translate="promotions.last.minute"></span>&nbsp;<span ng-if="$ctrl.chRoomCtrl.bestPromo.discount.type==\'PERCENTAGE\'">-{{$ctrl.chRoomCtrl.bestPromo.discount.finalAmount}}%</span><span ng-if="$ctrl.chRoomCtrl.bestPromo.discount.type==\'PRICE\'">-{{$ctrl.chRoomCtrl.bestPromo.discount.finalAmount|chCurrency}}</span>' + "</span>" + '<span ng-switch-when="LAST_SECOND">' + '<span translate="promotions.last.second"></span>&nbsp;<span ng-if="$ctrl.chRoomCtrl.bestPromo.discount.type==\'PERCENTAGE\'">-{{$ctrl.chRoomCtrl.bestPromo.discount.finalAmount}}%</span><span ng-if="$ctrl.chRoomCtrl.bestPromo.discount.type==\'PRICE\'">-{{$ctrl.chRoomCtrl.bestPromo.discount.finalAmount|chCurrency}}</span>' + "</span>" + "</strong>" + "</div>" + "</div>" + "</div>",
        transclude: true
    });
    function RoomPromoCtrl($scope) {
        var ctrl = this;
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
            availability: "<?",
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
    ShowOnScrollCtrl.$inject = [ "$scope", "$element", "$window" ];
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
    function ShowOnScrollCtrl($scope, $element, $window) {
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
            ctrl.$initWatches();
        };
        this.$postLink = function() {
            if (ctrl.ngDisabled) {
                ctrl.$disableShow();
            } else {
                ctrl.$enableShow();
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
            var contEl = $element.children();
            var transEl = angular.element(contEl.children());
            transEl && transEl.addClass("animated");
            if ($window.pageYOffset >= ctrl.offset && !ctrl.$checkVisible()) {
                if (transEl) {
                    transEl.addClass("visible " + ctrl.showClass);
                    transEl.removeClass(ctrl.hideClass);
                }
            } else {
                if (transEl) {
                    transEl.removeClass("visible " + ctrl.showClass);
                    transEl.addClass(ctrl.hideClass);
                }
            }
            $scope.$apply();
        };
        this.$initWatches = function() {
            $scope.$watch(function() {
                return ctrl.ngDisabled;
            }, function(newVal) {
                newVal = _.isBoolean(newVal) ? newVal : false;
                if (newVal) {
                    ctrl.$disableShow();
                } else {
                    ctrl.$enableShow();
                }
            });
        };
        this.$onDestroy = function() {
            ctrl.$disableShow();
        };
    }
})();

(function() {
    "use strict";
    SocialShareCtrl.$inject = [ "$scope", "UrlUtils" ];
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
    function SocialShareCtrl($scope, UrlUtils) {
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
            isNew: "=?",
            ngDisabled: "=?"
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
            ctrl.registerWatches();
        };
        this.registerWatches = function() {
            $scope.$watch(function() {
                return ctrl.eventTitle;
            }, function(newVal, oldVal) {
                ctrl.event.title = newVal;
            });
            $scope.$watch(function() {
                return ctrl.date;
            }, function(newVal, oldVal) {
                ctrl.event.date = newVal;
            });
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
            ctrl.registerWatches();
        };
        this.manageAlign = function() {
            ctrl.align = _.includes([ "LEFT", "CENTER", "RIGHT" ], ctrl.align) ? ctrl.align : "CENTER";
            ctrl.align = $mdMedia("gt-xs") ? ctrl.align : "RIGHT";
            ctrl.alignClass = "ch-timeline-" + ctrl.align.toLowerCase();
            ctrl.animatedClass = ctrl.align == "RIGHT" ? "slideInRight" : ctrl.align == "LEFT" ? "slideInLeft" : "slideInUp";
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
        this.registerWatches = function() {
            $scope.$watch(function() {
                return ctrl.hideIcon;
            }, function(newVal, oldVal) {
                ctrl.hideIcon = _.isBoolean(newVal) ? newVal : false;
            });
            $scope.$watch(function() {
                return ctrl.align;
            }, function(newVal, oldVal) {
                ctrl.manageAlign();
                _.forEach(ctrl.events, function(e) {
                    e.align = newVal;
                });
            });
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
            ctrl.$initWatches();
        };
        this.$prepareText = function() {
            ctrl.$$textArr = _.split(ctrl.text, "");
        };
        this.$initWatches = function() {
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
                icon = "material-icons md-160 mdi mdi-$$weather-windy text-white";
                break;

              default:
                label = "variable";
                icon = "material-icons md-160 mdi mdi-$$weather-windy text-white";
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
                icon = "material-icons md-160 mdi mdi-$$weather-windy text-white";
                break;

              default:
                icon = "material-icons md-160 mdi mdi-$$weather-windy text-white";
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
        template: "<div>" + '<div class="relative overflow-hidden weather-container">' + '<i ng-if="$ctrl.$$weather.label == "partly.cloudy"" ng-class="$ctrl.$$weather.isNight ? "starry" : "sunny"" class="cloud"></i>' + '<i class="{{$ctrl.$$weather.icon}}"></i>' + "</div>" + '<div class="text-white"><span ng-if="$$weather.label" translate="weather.{{$ctrl.$$weather.label}}"></span></div>' + '<div class="md-headline text-bold text-white"><span>{{::$ctrl.city}}</span></div>' + '<div class="md-body-2 text-white text-uppercase"><span>{{::$ctrl.country}}</span></div>' + "<div>" + '<span class="md-headline text-bold text-white">{{$$weather.temp}}</span>' + '<mdi-icon class="mdi mdi-temperature-celsius material-icons text-white"></md-icon>' + "</div>" + "</div>"
    });
    function WeatherCtrl($scope, $log, $http, Weather, WeatherUtils, NumberUtils) {
        var ctrl = this;
        this.$onInit = function() {
            ctrl.$reset();
            ctrl.$getWeather();
        };
        this.$reset = function() {
            ctrl.$$weather = {
                icon: "mdi mdi-minus material-icons md-164",
                temp: "-"
            };
        };
        this.$getWeather = function() {
            var appId = "d783765019148133e5c3c9beefa5d546";
            var url = "https://api.openweathermap.org/data/2.5/$$weather";
            Weather.get(ctrl.city, ctrl.country).then(function(response) {
                if (!_.isNil(response.data)) {
                    ctrl.$$weather.temp = NumberUtils.fixedDecimals(response.data.main.temp, 1);
                    ctrl.$getIcon(response.data.weather[0].icon);
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
            return new Weather($resource, $q, appId);
        } ];
    }
    function Weather($resource, $q, appId) {
        var $$service = this;
        this.$$appId = appId;
        this.API = $resource("https://api.openweathermap.org/data/2.5/$$weather");
        this.get = function(city, country) {
            var deferred = $q.defer();
            if (!city) {
                deferred.reject("City cannot be null");
                return deferred.promise;
            }
            var params = {
                appId: $$service.appId,
                q: city + "," + country,
                mode: "json",
                units: "metric"
            };
            $$service.API.get(params, function(response) {
                deferred.resolve(response.data);
            }, function(response) {
                deferred.reject(response.data && response.data.message ? response.data.message : "Error getting weather for " + city + ", " + country);
            });
            return deferred.promise;
        };
    }
})();