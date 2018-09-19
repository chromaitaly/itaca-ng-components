(function() {
	'use strict';
	
	angular.module("itaca.components").component("chReviewActions", {
		transclude: true,
		require: {
			chReviewCtrl: '^chReview'
		},
		bindings: {
			/**
    		 *  actions: array = [{label: 'string', icon: 'string', onClick: function, btnClass: 'string', hide: true|false, disabled: true|false}...];
    		 */
    		actions: "<?",
		},
		controller: ReviewActionsCtrl,
		template: 
			"<div flex ng-if=\"!$ctrl.noDefault && !$ctrl.hideAction\">" +
				"<md-divider></<md-divider>" +
				"<div class=\"flex layout-row layout-wrap\">" +
					"<div ng-repeat=\"action in $ctrl.actions\" ng-if=\"!action.hide\" ng-class=\"{'flex-33': $ctrl.actions.length <= 3, 'flex': $ctrl.actions.length > 3}\" layout>" +
						"<div class=\"flex layout-column\">" +
							"<md-button class=\"no-margin {{::action.btnClass}}\" ng-disabled=\"action.disabled\" ng-click=\"$ctrl.$actionClick($event, action)\" aria-label=\"{{action.label}}\">" +
								"<md-icon ng-if=\"action.icon\" class=\"{{::action.icon}} material-icons\"></md-icon>&nbsp;" +
								"<span ng-if=\"action.label\" class=\"text-initial\" ng-bind-html=\"action.label\"></span>" +
							"</md-button>" +
						"</div>" +
						"<md-divider></<md-divider>" +
					"</div>" +
		    	"</div>" +
				"<md-divider></<md-divider>" +
			"</div>"
	});
	
	 /* @ngInject */
	function ReviewActionsCtrl($scope, Navigator) {
		var ctrl = this;
		
		this.$onInit = function() {
			ctrl.hideAction = _.isEmpty(ctrl.actions) ? true: false;
			
			ctrl.$initReview();
		};

		this.$initReview = function(){
    		if (!ctrl.chReviewCtrl.review) {
    			return;
    		}
    		
    		ctrl.review = ctrl.chReviewCtrl.review;
		};
		
		this.$actionClick = function(ev, action) {
			action.onClick && action.onClick.apply(this, [ev, ctrl.review].concat(action.onClickParams));
    	};
	}
})();
