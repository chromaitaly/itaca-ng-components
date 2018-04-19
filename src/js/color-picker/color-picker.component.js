(function() {
	'use strict';
	
	angular.module("itaca.components").component('chColorPicker', {
		require: {
			ngModelCtrl: 'ngModel',
		},
		bindings: {
			ngModel: "<",
			label: "@",
			palette: "@", // material, material-full, material-accent
			defaultTint: "@",
			colorsPerRow: "@",
			colorSize: "@",
			colorMargin: "@",
			hideSubPalette: "<?",
			flexible: "<?",
			disableParentScroll: "<?",
			hasBackdrop: "<?",
			hasConfirm: "<?",
			ngReadonly: "<?",
			ngDisabled: "<?",
			inline: "<?", // false = apre in panel, true = inline
			showCode: "<?"
		},
		controller: ColorPickerCtrl,
		templateUrl: "/tpls/color-picker/color-picker.tpl"
	});

	/* @ngInject */
	function ColorPickerCtrl($scope, $element) {
		var ctrl = this;
		
	}
})();