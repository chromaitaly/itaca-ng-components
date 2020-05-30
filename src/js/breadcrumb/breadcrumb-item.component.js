(function() {
	'use strict';
	
	angular.module("itaca.components").component("chBreadcrumbItem", {
		require: {
			breadcrumbCtrl: '^chBreadcrumb'
		},
		bindings: {
			name: "@",
			iconClass: "@",
			iconFontSet: "@",
			showIcon: "<?",
			showDivider: "<?",
			url: "@",
			state: "@",
			stateParams: "<?",
			onClick: "&?",
			readOnly: "<?",
			ngDisabled: "<?"
		},
		controller: BreadcrumbItemCtrl,
		templateUrl: "/tpls/breadcrumb/breadcrumb-item.tpl"
	});
	
	 /* @ngInject */
	function BreadcrumbItemCtrl($scope, $mdMedia, Navigator) {
		var ctrl = this;
		
		this.$mdMedia = $mdMedia;
		
		this.$onInit = function() {
			ctrl.showIcon = _.isBoolean(ctrl.showIcon) ? ctrl.showIcon : false;
			ctrl.showDivider = _.isBoolean(ctrl.showDivider) ? ctrl.showDivider : false;
			ctrl.readOnly = _.isBoolean(ctrl.readOnly) ? ctrl.readOnly : false;
			ctrl.ngDisabled = _.isBoolean(ctrl.ngDisabled) ? ctrl.ngDisabled : false;
			
			ctrl.$$item = {
				name: ctrl.name,
				iconClass: ctrl.iconClass,
				iconFontSet: ctrl.iconFontSet,
				showIcon: ctrl.showIcon,
				showDivider: ctrl.showDivider,
				url: ctrl.url,
				state: ctrl.state,
				stateParams: ctrl.stateParams,
				onClick: ctrl.onClick,
				ngDisabled: ctrl.ngDisabled
			};
			ctrl.breadcrumbCtrl.$addItem(ctrl.$$item);
		};
		
		this.$goTo = function(){
			if (ctrl.ngDisabled) {
				return;
			}
			
			if(angular.isFunction(ctrl.$$item.onClick)){
				ctrl.$$item.onClick();
				return;
			}
			
			//comanda lo state che è più specifico
			if(!_.isNil(ctrl.$$item.state)){
				Navigator.goToState(ctrl.$$item.state, ctrl.$$item.stateParams);
				
			} else {
				if(!_.isNil(ctrl.$$item.url)){
					Navigator.go(ctrl.$$item.url);
				}
			}
		};
		
		this.$onDestroy = function() {
			ctrl.breadcrumbCtrl.$removeItem(ctrl.$$item);
		};
	}
})();