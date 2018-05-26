/**
 * People icons
 */
(function() {
	'use strict';
	
	angular.module("itaca.components").component('chPeopleIcons', {
        bindings: {
        	people: "<",
        	max: "<?",
        	extraPeople: "<?",
        	extraMax: "<?",
        	hideDetails: "<?",
        	hideInfoIcon: "<?",
        	hideTooltip: "<?",
        	hidePeople: "<?",
        	hideExtraPeople: "<?",
        	size: "@",
        	theme: "@",
    		iconClass: "@"
        },
        controller: PeopleIconsCtrl,
        template: 
        	"<div flex layout=\"column\">" +
	        	"<md-button class=\"minimal-button no-margin\" ng-class=\"{'layout-padding-sm': $ctrl.size == 'big'}\" ng-click=\"$ctrl.$openDetails($event)\" aria-label=\"Show pax details\">" +
		        	"<span layout layout-wrap layout-align=\"center center\">" + 
						"<small ng-if=\"!$ctrl.hidePeople && $ctrl.people.adults\">" + 
							"<span ng-if=\"$ctrl.size == 'small'\">{{$ctrl.people.adults}}</span>" +
							"<md-icon class=\"material-icons mdi {{$ctrl.iconClass}}\" ng-class=\"{'mdi-account-multiple' : $ctrl.people.adults > 1, 'mdi-account': $ctrl.people.adults == 1, 'md-18': $ctrl.size == 'small', 'md-48': $ctrl.size == 'big'}\"></md-icon>" +
							"<span ng-if=\"$ctrl.size == 'big' && !$ctrl.hideDetails && !$ctrl.hideInfoIcon\">&nbsp;<md-icon class=\"material-icons mdi mdi-information-outline md-14 {{$ctrl.iconClass}}\"></md-icon></span>" +
							"<div ng-if=\"$ctrl.size == 'big'\" class=\"row-1 text-wrap\">" +
								"<ch-people-summary class=\"text-lowercase\" people=\"$ctrl.$$peopleDetails\"></ch-people-summary>&nbsp;" +
								"<span class=\"text-lowercase\" translate=\"bed.beds.principal.into\"></span>" +
							"</div>" +
						"</small>" +
						"<small ng-if=\"!$ctrl.hideExtraPeople && ($ctrl.extraPeople.adults || $ctrl.extraPeople.boys || $ctrl.extraPeople.children || $ctrl.extraPeople.kids)\">" +
							"<span ng-if=\"!$ctrl.hidePeople\">&nbsp;+&nbsp;</span>" +
							"<span ng-if=\"$ctrl.size == 'small'\">" +
								"<span ng-if=\"$ctrl.extraPeople.adults\">{{$ctrl.extraPeople.adults}}</span>" +
								"<span ng-if=\"!$ctrl.extraPeople.adults && $$extra$$maxUnderages\">{{$ctrl.$$extra$$maxUnderages}}</span>" +
							"</span>" +
							"<md-icon ng-if=\"$ctrl.extraPeople.adults\" class=\"material-icons mdi {{$ctrl.iconClass}}\" ng-class=\"{'mdi-account-multiple' : $ctrl.extraPeople.adults > 1, 'mdi-account': $ctrl.extraPeople.adults == 1, 'md-18': $ctrl.size == 'small', 'md-48': $ctrl.size == 'big'}\"></md-icon>" +
							"<md-icon ng-if=\"!$ctrl.extraPeople.adults && $ctrl.$$extra$$maxUnderages\" class=\"material-icons mdi mdi-human-child {{$ctrl.iconClass}}\" ng-class=\"{'md-14': $ctrl.size == 'small', 'md-36': $ctrl.size == 'big'}\"></md-icon>" +
							"<span ng-if=\"$ctrl.size == 'big' && !$ctrl.hideDetails && !$ctrl.hideInfoIcon\">&nbsp;<md-icon class=\"material-icons mdi mdi-information-outline md-14 {{$ctrl.iconClass}}\"></md-icon></span>" +
							"<div ng-if=\"$ctrl.size == 'big'\" class=\"row-1 text-wrap\">" +
								"<ch-people-summary class=\"text-lowercase\" people=\"$ctrl.$$extraPeopleDetails\"></ch-people-summary>&nbsp;" + 
								"<span class=\"text-lowercase\" translate=\"bed.otherbeds.into\"></span>" +
							"</div>" +
						"</small>" +
						"<span ng-if=\"$ctrl.size == 'small' && !$ctrl.hideDetails && !$ctrl.hideInfoIcon\">&nbsp;<md-icon class=\"material-icons mdi mdi-information-outline md-14 {{$ctrl.iconClass}}\"></md-icon></span>" +
						"<md-tooltip ng-if=\"!$ctrl.hideTooltip\" class=\"auto-height text-wrap row-mini\">" + 
							"<div class=\"text-wrap\">" +  
								"<span ng-if=\"!$ctrl.hidePeople && $ctrl.people.adults\">" +
									"<ch-people-summary class=\"text-lowercase\" people=\"$ctrl.$$peopleDetails\"></ch-people-summary>&nbsp;" +
									"<span class=\"text-lowercase\" translate=\"bed.beds.principal.into\"></span>" +
								"</span>" +
								"<span ng-if=\"!$ctrl.hideExtraPeople && ($ctrl.extraPeople.adults || $ctrl.extraPeople.boys || $ctrl.extraPeople.children || $ctrl.extraPeople.kids)\">" +
									"<span ng-if=\"!$ctrl.hidePeople\">&nbsp;+&nbsp;</span>" +
									"<ch-people-summary class=\"text-lowercase\" people=\"$ctrl.$$extraPeopleDetails\"></ch-people-summary>&nbsp;" +
									"<span class=\"text-lowercase\" translate=\"bed.otherbeds.into\"></span>" +
								"</span>" +	
								"<span ng-if=\"$ctrl.$$maxUnderages || $ctrl.$$extra$$maxUnderages\" class=\"text-lowercase\">&nbsp;+&nbsp;<span translate=\"common.options.more.available\"></span></span>" +
								"<div ng-if=\"!$ctrl.hideDetails\"><em translate=\"common.information.further.click\"></em></div>" +
							"</div>" +
						"</md-tooltip>" + 
					"</span>" +
				"</md-button>" +
			"</div>"
	 });

	/* @ngInject */
	function PeopleIconsCtrl($scope, Dialog) {
		var ctrl = this;
		
		this.$onInit = function() {
			ctrl.theme = _.includes(["dark", "light"], ctrl.theme) ? ctrl.theme : "light";  
			ctrl.iconClass = ctrl.iconClass || ctrl.theme != "dark" ? "text-white" : "";
			ctrl.size = _.includes(["big", "small"], _.toLower(ctrl.size)) ? ctrl.size : "small";
			
			ctrl.people = ctrl.people || {};
			ctrl.max = ctrl.max || ctrl.people.adults;
			ctrl.$$maxUnderages = _.max([ctrl.people.boys, ctrl.people.children, ctrl.people.kids]);
			ctrl.$$maxUnderages = ctrl.$$maxUnderages > ctrl.max ? ctrl.max : ctrl.$$maxUnderages;
			ctrl.$$peopleDetails = {adults: ctrl.people.adults};
				
			ctrl.extraMax = ctrl.extraMax || (ctrl.extraPeople ? _.max([ctrl.extraPeople.adults, ctrl.extraPeople.boys, ctrl.extraPeople.children, ctrl.extraPeople.kids]) : 0);
			ctrl.$$extra$$maxUnderages = ctrl.extraPeople ? _.max([ctrl.extraPeople.boys, ctrl.extraPeople.children, ctrl.extraPeople.kids]) : 0;
			ctrl.$$extra$$maxUnderages = ctrl.$$extra$$maxUnderages > ctrl.extraMax ? ctrl.extraMax : ctrl.$$extra$$maxUnderages;
			ctrl.$$extraPeopleDetails = ctrl.extraPeople && ctrl.extraPeople.adults ? {adults: ctrl.extraPeople.adults} : ctrl.extraPeople;
		};
		
		this.$openDetails = function(ev) {
			if (_.isBoolean(ctrl.hideDetails) ? !ctrl.hideDetails : true) {
	    		Dialog.paxDetails(ev, {
					people: ctrl.people, 
					extraPeople: ctrl.extraPeople,
					max: ctrl.max,
					extraMax: ctrl.extraMax});
			}
		};
	}
})();