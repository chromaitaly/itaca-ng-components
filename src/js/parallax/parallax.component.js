(function() {
	'use strict';
	
	angular.module("itaca.components").component("chParallax", {
		bindings: {
			imageUrl: "@",
			containerClass: "@",
			bgClass: "@",
			hasBackdrop: "<?",
			height: "@",
		},
		controller: ParallaxCtrl,
		transclude: true,
		template: 
			"<div class=\"ch-parallax {{$ctrl.containerClass}}\">" +
				"<div class=\"ch-parallax-bg {{$ctrl.bgClass}}\" ng-style=\"$ctrl.$$bgStyle\"></div>" +
				"<div ng-show=\"$ctrl.hasBackdrop\"  class=\"ch-parallax-backdrop\"></div>" +
				"<div class=\"ch-parallax-content\" ng-transclude></div>" +
			"</div>",
	});
	
	/* @ngInject */
	function ParallaxCtrl($scope, $mdMedia, $element) {
		var ctrl = this;
		
		this.$onInit = function(){
			ctrl.$$bgStyle = {'background-image': 'url('+ ctrl.imageUrl + ')'};
			ctrl.hasBackdrop = _.isBoolean(ctrl.hasBackdrop) ? ctrl.hasBackdrop : false;
			
			if(ctrl.height){
				var el = $element[0].querySelector('.ch-parallax');
				var height = (ctrl.height == 'SCREEN') ? document.body.clientHeight  + "px" : ctrl.height + "px";
				if(!el){
					return;
				}
				
				if($mdMedia('gt-sm')){
					el.style.height = height;
					el.style.minHeight = "";
					
				} else {
					el.style.minHeight = height;
					el.style.height = "";
				}
			}
		};
	}
})();