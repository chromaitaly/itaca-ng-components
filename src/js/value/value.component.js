(function() {
	'use strict';
	
	angular.module("itaca.components").component('chValue', {
		bindings: {
			value: "<"
		},
		controller: ValueCtrl,
		templateUrl: "/tpls/value/value.tpl"
	});
	
	function ValueCtrl($scope) {
		var ctrl = this;

		this.$onInit = function() {
		};
	}
})();