(function() {
	'use strict';
	
	angular.module("itaca.components").component("chStaticMap", {
		bindings: {
	    	position: "<",
	    	params: "<?",
	    	marker: "@",
	    	showMarker: "<?",
	    	mapClass: "@",
	    	onClick: "&?"
    	},
		controller: StaticMapCtrl,
		template: "<div ng-if=\"$ctrl.$$url\" class=\"{{$ctrl.mapClass}}\"><div ng-style=\"{'background-image': 'url(' + $ctrl.$$url +')'}\" class=\"map-image clickable\" ng-click=\"$ctrl.$onClick()\"></div>"
	});
	
	 /* @ngInject */
	function StaticMapCtrl($scope, $mdMedia, $httpParamSerializer, AppOptions, Navigator) {
		var ctrl = this;
		
		this.$mdMedia = $mdMedia;
		
		this.$$googleUrl = "https://maps.googleapis.com/maps/api/staticmap?center=";
		
		this.$$apiKey = (AppOptions && AppOptions.about && AppOptions.about.google && AppOptions.about.google.mapsClientApiKey) ? AppOptions.about.google.mapsClientApiKey : "";
		
		this.$onInit = function(){
			
			ctrl.mapClass = ctrl.mapClass || "map-static map-big";
			
			ctrl.showMarker = _.isBoolean(ctrl.showMarker) ? ctrl.showMarker : true;
			
			if(!ctrl.marker && AppOptions.about){
				ctrl.marker = AppOptions.about.uiUrl + "/resources/public/img/common/map-marker.01.png"; // v aumentata la risoluzione @2x
			}
			
			ctrl.$$position = _.isArray(ctrl.position) ? ctrl.position.toString() : _.isPlainObject(ctrl.position) ? _.values(ctrl.position).toString() : ctrl.position;
			
			ctrl.params = _.merge({
				zoom: "14",
				size: "640x640",
				scale: "2",
				sensor: true,
				format: "png",
				visual_refresh: true,
				markers: "icon:" + ctrl.marker + "|" + ctrl.$$position,
				key: ctrl.$$apiKey,
			}, ctrl.params);
			
			if(!ctrl.showMarker){
				ctrl.params.markers = null;
			}
			
			if(ctrl.position){
				ctrl.$$url = (ctrl.$$googleUrl + ctrl.$$position + "&" + $httpParamSerializer(ctrl.params));
			}
			
		};
		
		this.$onClick = function(){
			var urlObj = {url: "http://maps.google.com/?q=" + ctrl.$$position};
			
			if(ctrl.onClick){
				ctrl.onClick && ctrl.onClick(urlObj);
			} else {
				Navigator.go(urlObj.url, null, true)
			}
			
		};
	}
})();