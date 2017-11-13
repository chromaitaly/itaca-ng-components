/**
 * Direttiva per le card nei pannelli amministrativi
 */
(function() {
	'use strict';
	
	angular.module("itaca.components").component('chCard', {
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
		template: 
			"<div class=\"md-whiteframe-1dp bg-white flex layout-column\" ng-click=\"$ctrl.$goTo()\"" + 
				"ng-class=\"{\"clickable\": !$ctrl.ngDisabled && ($ctrl.url || $ctrl.state || $ctrl.onClick), \"cursor-disabled\": $ctrl.ngDisabled}\">" +
				"<div class=\"relative\">" +
					"<div ng-if=\"$ctrl.ngDisabled\" class=\"disabled-box {{$ctrl.disabledClass}}\">" +
						"<span ng-if=\"$ctrl.disabledLabel\" class=\"disabled-box-bar {{$ctrl.disabledBarClass}}\">{{$ctrl.disabledLabel}}</span>" +
					"</div>"+
					"<div class=\"layout-padding no-padding-right absolute position-right position-top\" style=\"z-index:2\">" +
						"<md-menu class=\"md-secondary\" ng-if=\"$ctrl.menuItems && !$ctrl.ngDisabled\">"+
		      				"<md-button aria-label=\"Open user interactions menu\" class=\"md-icon-button {{$ctrl.menuClass}}\" ng-click=\"$mdMenu.open($event)\">"+
		      					"<md-icon class=\"mdi mdi-dots-vertical text-white\"></md-icon>"+
			        		"</md-button>"+
					      	"<md-menu-content width=\"4\">"+
					      		"<md-menu-item ng-repeat=\"item in $ctrl.menuItems\" ng-if=\"!item.hide\">"+
									"<md-button ng-click=\"$ctrl.$menuClick(item)\" aria-label=\"{{item.label | translate}}\" class=\"{{item.labelClass}}\" ng-disabled=\"item.disabled\">"+
							      		"<md-icon class=\"{{item.icon}} material-icons\"></md-icon>&nbsp;<span translate-once=\"{{item.label}}\"></span>"+		      		
						          	"</md-button>"+
						   		"</md-menu-item>"+
							"</md-menu-content>"+
						"</md-menu>"+
						"<md-menu class=\"md-secondary\" ng-if=\"$ctrl.disabledMenuItems && $ctrl.ngDisabled\">"+
		      				"<md-button aria-label=\"Open user interactions menu\" class=\"md-icon-button {{$ctrl.menuClass}}\" ng-click=\"$mdMenu.open($event)\">"+
		      					"<md-icon class=\"mdi mdi-dots-vertical text-white\"></md-icon>"+
			        		"</md-button>"+
					      	"<md-menu-content width=\"4\">"+
					      		"<md-menu-item ng-repeat=\"item in $ctrl.disabledMenuItems\" ng-if=\"!item.hide\">"+
									"<md-button ng-click=\"$ctrl.$menuClick(item)\" aria-label=\"{{item.label | translate}}\" class=\"{{item.labelClass}}\" ng-disabled=\"item.disabled\">"+
							      		"<md-icon class=\"{{item.icon}} material-icons\"></md-icon>&nbsp;<span translate-once=\"{{item.label}}\"></span>"+		      		
						          	"</md-button>"+
						   		"</md-menu-item>"+
							"</md-menu-content>"+
						"</md-menu>"+
					"</div>" +
					"<div class=\"flex layout-column layout-align-center-center text-center overflow-hidden card-image\" ng-class=\"{\"md-hover-icon\": !$ctrl.noHover}\" ng-style=\"$ctrl.$$bgStyle\">" +
						"<div ng-if=\"$ctrl.imgUrl\" class=\"{{$ctrl.imgContClass}}\">"+
							"<img ng-if=\"$ctrl.imgUrl\" ng-src=\"{{$ctrl.imgUrl}}\" class=\"{{$ctrl.imgClass}}\" lazy-image loaded-class=\"animated fadeIn\">"+
						"</div>" +	
						"<div ng-if=\"!$ctrl.imgUrl && ($ctrl.iconClass || $ctrl.iconSecondaryClass)\">"+
							"<div class=\"layout-column layout-padding-sm layout-align-center-center\">" +
								"<div ng-if=\"$ctrl.iconLabel && $ctrl.iconLabelPosition == \"top\"\" class=\"{{$ctrl.iconLabelClass}}\">{{$ctrl.iconLabel}}</div>"+
								"<div ng-if=\"$ctrl.iconSecondaryLabel && $ctrl.iconSecondaryLabelPosition == \"top\"\" class=\"{{$ctrl.iconSecondaryLabelClass}}\">{{$ctrl.iconSecondaryLabel}}</div>"+
								"<div>" +
									"<span ng-if=\"$ctrl.iconLabel && $ctrl.iconLabelPosition == \"left\"\" class=\"{{$ctrl.iconLabelClass}}\">{{$ctrl.iconLabel}}</span>"+
									"<span ng-if=\"$ctrl.iconSecondaryLabel && $ctrl.iconSecondaryLabelPosition == \"left\"\" class=\"{{$ctrl.iconSecondaryLabelClass}}\">{{$ctrl.iconSecondaryLabel}}</span>"+
									"<md-icon class=\"{{$ctrl.iconClass}} material-icons\"></md-icon>"+
									"<md-icon ng-if=\"$ctrl.otherIconClass\" class=\"{{$ctrl.otherIconClass}} material-icons\"></md-icon>"+
									"<span ng-if=\"$ctrl.iconLabel && $ctrl.iconLabelPosition == \"right\"\" class=\"{{$ctrl.iconLabelClass}}\">{{$ctrl.iconLabel}}</span>"+
									"<span ng-if=\"$ctrl.iconSecondaryLabel && $ctrl.iconSecondaryLabelPosition == \"right\"\" class=\"{{$ctrl.iconSecondaryLabelClass}}\">{{$ctrl.iconSecondaryLabel}}</span>"+
								"</div>" +
								"<div ng-if=\"$ctrl.iconLabel && $ctrl.iconLabelPosition == \"bottom\"\" class=\"{{$ctrl.iconLabelClass}}\">{{$ctrl.iconLabel}}</div>"+
								"<div ng-if=\"$ctrl.iconSecondaryLabel && $ctrl.iconSecondaryLabelPosition == \"bottom\"\" class=\"{{$ctrl.iconSecondaryLabelClass}}\">{{$ctrl.iconSecondaryLabel}}</div>"+
							"</div>" +							
						"</div>"+
						"<div ng-if=\"$ctrl.showAvatar && !$ctrl.imgUrl && !$ctrl.iconClass && !i$ctrl.conSecondaryClass && ($ctrl.title || $ctrl.description)\" class=\"layout-row layout-align-center-center {{$ctrl.imgContClass}}\">" +
							"<span class=\"md-display-3 text-uppercase\">" +
								"<span ng-if=\"$ctrl.title\">{{$ctrl.title.charAt(0)}}</span>" +
								"<span ng-if=\"!$ctrl.title\">{{$ctrl.description.charAt(0)}}</span>" +
							"</span>" +
						"</div>" +
					"</div>"+
				"</div>"+
				"<md-divider></md-divider>"+
				"<div class=\"md-padding layout-column layout-padding-sm flex {{$ctrl.colorClass}}\">"+
					"<div class=\"layout-column layout-align-center-center\">" +
						"<div class=\"{{$ctrl.titleClass}} row-mini text-center\"><span>{{$ctrl.title}}</span></div>"+
						"<small class=\"text-center\" ng-if=\"subtitle\">{{$ctrl.subtitle}}</small>"+
					"</div>" +
					"<div ng-transclude class=\"flex layout-column layout-align-center-center card-footer\"></div>"+
				"</div>"+
			"</div>"
	});

	/* @ngInject */
	function CardCtrl($scope, Navigation) {
		var ctrl = this;
		
		this.$onInit = function() {
			ctrl.$$bgStyle = ctrl.bgUrl ? {"background": "url('" + ctrl.bgUrl + "') center center no-repeat", "background-size" : "cover"} : null;
			ctrl.colorClass = ctrl.colorClass || "layout-column layout-align-center-center bg-gray-lighter md-padding";
			ctrl.titleClass = ctrl.titleClass || "md-subhead text-bold";
			ctrl.iconLabelPosition = _.includes(['left', 'right', 'top', 'bottom'], ctrl.iconLabelPosition) ? ctrl.iconLabelPosition : 'left';
			ctrl.menuItems = ctrl.menuItems && angular.isArray(ctrl.menuItems) ? ctrl.menuItems : null;
			ctrl.menuClass = ctrl.menuClass || null;
			ctrl.showAvatar = _.isBoolean(ctrl.showAvatar) ? ctrl.showAvatar : false;
			//	ctrl.imgContClass = ctrl.imgContClass || "menu-user-avatar menu-user-avatar-big";
			
			ctrl.$initWatches();
		};
		
		this.$goTo = function(){
			if (ctrl.ngDisabled) {
				return;
			}
			
			if(angular.isFunction(ctrl.onClick)){
				ctrl.onClick();
				return;
			}
			
			//comanda lo state che è più specifico
			if(!_.isNil(ctrl.state)){
				Navigation.goToState(ctrl.state, ctrl.stateParams);
				
			} else {
				if(!_.isNil(ctrl.url)){
					Navigation.go(ctrl.url);
				}
			}
		};
		
		this.$menuClick = function(menu){
			if(!_.isNil(menu.fn) && angular.isFunction(menu.fn)){
				menu.fn.apply(this, menu.fnParams);
				
			} else {
				if(!_.isNil(menu.state)){
					Navigation.goToState(menu.state, menu.stateParams);
					
				} else {
					if(!_.isNil(menu.url)){
						location.href = menu.url;
					}
				}
			}
		};
		
		this.$initWatches = function() {
			$scope.$watch(function() {
				return ctrl.imgUrl;
			
			}, function(newVal, oldVal){
				ctrl.imgUrl = newVal;
			});
		};
	}
})();