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
		templateUrl: "/tpls/card/card.tpl"
	});

	/* @ngInject */
	function CardCtrl($scope, Navigator) {
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
				Navigator.goToState(ctrl.state, ctrl.stateParams);
				
			} else {
				if(!_.isNil(ctrl.url)){
					Navigator.go(ctrl.url);
				}
			}
		};
		
		this.$menuClick = function(menu){
			if(!_.isNil(menu.fn) && angular.isFunction(menu.fn)){
				menu.fn.apply(this, menu.fnParams);
				
			} else {
				if(!_.isNil(menu.state)){
					Navigator.goToState(menu.state, menu.stateParams);
					
				} else {
					if(!_.isNil(menu.url)){
						location.href = menu.url;
					}
				}
			}
		};
	}
})();