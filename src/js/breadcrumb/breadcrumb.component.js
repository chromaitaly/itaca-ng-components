(function() {
	'use strict';
	
	angular.module("itaca.components").component("chBreadcrumb", {
		transclude: true,
		bindings: {
			hideIcon: "<?",
			hideDivider: "<?"
		},
		controller: BreadcrumbCtrl,
		template: "<div layout layout-wrap ng-transclude></div>"
	});
	
	 /* @ngInject */
	function BreadcrumbCtrl($scope, Navigator) {
		var ctrl = this;
		
		this.items = [];
		
		this.$onInit = function() {
			ctrl.hideIcon = _.isBoolean(ctrl.hideIcon) ? ctrl.hideIcon : false;
			ctrl.hideDivider = _.isBoolean(ctrl.hideDivider) ? ctrl.hideDivider : false;
		};
		
		this.$addItem = function(item) {
			if(ctrl.hideIcon){
				item.showIcon = false;
			}
			
			if(ctrl.hideDivider){
				item.showDivider = false;
			}
			
        	item.index = ctrl.items.push(item) - 1;
        };
        
        this.$removeItem = function(item) {
        	_.pull(ctrl.items, item);
        };
	}
})();