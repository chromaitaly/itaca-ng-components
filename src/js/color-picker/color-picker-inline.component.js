(function() {
	'use strict';
	
	angular.module("itaca.components").component('chColorPickerInline', {
		require: {
			ngModelCtrl: 'ngModel',
		},
		bindings: {
			ngModel: "<",
			palette: "@", // material, material-full, material-accent
			defaultTint: "@",
			colorsPerRow: "@",
			colorSize: "@",
			colorMargin: "@",
			hideSubPalette: "<?",
			flexible: "<?",
			showCode: "<?"
		},
		controller: ColorPickerCtrl,
		templateUrl: "/tpls/color-picker/color-picker-inline.tpl"
	});

	/* @ngInject */
	function ColorPickerCtrl($scope, $element) {
		var ctrl = this;
		
		this.$postLink = function() {
			ctrl.$$picker = $element[0].querySelector(".ch-color-picker-inline");
			ctrl.$$picker.addEventListener("change", ctrl.$colorChanged);
			ctrl.$$picker.value = ctrl.ngModel;
		};
		
		this.$onChanges = function(changesObj) {
			if (changesObj.hideSubPalette) {
				ctrl.hideSubPalette = _.isBoolean(ctrl.hideSubPalette) ? ctrl.hideSubPalette : false;
			}
			
			if (changesObj.flexible) {
				ctrl.flexible = _.isBoolean(ctrl.flexible) ? ctrl.flexible : false;
			}
			
			if (changesObj.palette) {
				ctrl.palette = _.includes(["material", "material-full", "material-accent"], ctrl.palette) ? ctrl.palette : "material-full";
			}
			
			if (changesObj.ngModel) {
				ctrl.$$picker && (ctrl.$$picker.value = ctrl.ngModel);
			}
		};
		
		this.$onDestroy = function() {
			ctrl.$$picker.removeEventListener("change", ctrl.$colorChanged);
		};
		
		this.$colorChanged = function(event) {
		    var color = event.detail[0];
		    ctrl.$$picker.value = color;
		    ctrl.$update(color);
		}
	
		this.$update = function(color) {
			ctrl.ngModelCtrl.$setViewValue(color);
		};
	}
})();