(function() {
	'use strict';
	
	angular.module("itaca.components").component('chColorPickerButton', {
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
			showCode: "<?"
		},
		controller: ColorPickerButtonCtrl,
		templateUrl: "/tpls/color-picker/color-picker-button.tpl"
	});

	/* @ngInject */
	function ColorPickerButtonCtrl($scope, $element, $mdMedia, $mdPanel) {
		var ctrl = this;
		
		this.$postLink = function() {
			var targetEl = $element[0].querySelector(".ch-color-picker-button");
			
			var position = $mdPanel.newPanelPosition()
		        .relativeTo(angular.element(targetEl))
		        .addPanelPosition($mdPanel.xPosition.ALIGN_START, $mdPanel.yPosition.BELOW);
					    	
			ctrl.$$config = {
				attachTo: angular.element(document.body),
			    controller: ColorPickerPanelCtrl,
			    controllerAs: "$ctrl",
			    templateUrl: "/tpls/color-picker/color-picker-panel.tpl",
			    position: position,
			    clickOutsideToClose: true,
			    disableParentScroll: !$mdMedia('gt-xs') || ctrl.disableParentScroll,
			    hasBackdrop: !$mdMedia('gt-xs') || ctrl.hasBackdrop,
			    panelClass: "md-whiteframe-15dp bg-gray-lighter",
			    trapFocus: true,
			    onCloseSuccess: function(panelRef, closeReason) {
			    	// focus sul trigger
			    	targetEl.focus();
			    	
			    	var hasConfirm = _.isBoolean(ctrl.hasConfirm) ? ctrl.hasConfirm : false;
			    	
			    	// aggiorno model
			    	(!hasConfirm || (_.isBoolean(closeReason) && closeReason)) && ctrl.$update();
			    	
			    	// sblocco scroll body
			    	(ctrl.hasBackdrop || ctrl.disableBodyScroll) && ctrl.$$toggleBodyScroll(false);
			    },
			    onOpenComplete: function() {
			    	// blocco scroll body
			    	(ctrl.hasBackdrop || ctrl.disableBodyScroll) && ctrl.$$toggleBodyScroll(true);
			    }
			};
		};
		
		this.$onChanges = function(changesObj) {
			if (changesObj.ngModel) {
				ctrl.$$btnStyle = {"background-color": ctrl.ngModel};
			}
		};
		
		this.$$toggleBodyScroll = function(block) {
			angular.element(document.body).css({overflow: block ? "hidden" : "auto"});
		};
		
		this.$openPicker = function(ev) {
			if (ctrl.ngReadonly) {
				return;
			}
			
			ctrl.$$data =  {
				color: angular.copy(ctrl.ngModel)
			};
			
			var locals = {
				$$data: ctrl.$$data,
				hasConfirm : _.isBoolean(ctrl.hasConfirm) ? ctrl.hasConfirm : false,
				palette: ctrl.palette, 
				defaultTint: ctrl.defaultTint,
				colorsPerRow: ctrl.colorsPerRow,
				colorSize: ctrl.colorSize,
				colorMargin: ctrl.colorMargin,
				hideSubPalette: ctrl.hideSubPalette,
				flexible: ctrl.flexible,
				showCode: ctrl.showCode
			};

			ctrl.$$config.openFrom = ev;
			ctrl.$$config.disableParentScroll = !$mdMedia('gt-xs') || ctrl.disableParentScroll;
			ctrl.$$config.hasBackdrop = !$mdMedia('gt-xs') || ctrl.hasBackdrop;
			ctrl.$$config.locals = locals;

			// apro il pannello
			$mdPanel.open(ctrl.$$config);
		};
	
		this.$update = function() {
			ctrl.$$btnStyle = {"background-color": ctrl.$$data.color};
			ctrl.ngModelCtrl.$setViewValue(ctrl.$$data.color);
		};
	}
	
	/* @ngInject */
	function ColorPickerPanelCtrl($scope, mdPanelRef) {
		var ctrl = this;
		
		this.init = function() {
			ctrl.hasConfirm = _.isBoolean(ctrl.hasConfirm) ? ctrl.hasConfirm : false;
		};
		
		this.onChange = function(ev) {
//			!ctrl.hasConfirm && ctrl.confirm();
		};
		
		this.confirm = function() {
			mdPanelRef && mdPanelRef.close(true);
	    };
	    
	    this.cancel = function() {
			mdPanelRef && mdPanelRef.close(false);
	    };
	    
	    // init
	    this.init();
	}
})();