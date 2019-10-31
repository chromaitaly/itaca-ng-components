(function() {
    'use strict';
    
    angular.module("itaca.components").factory('ChSteppers', ChSteppersFactory);
    
    /* @ngInject */
    function ChSteppersFactory($mdComponentRegistry) {			
    	return function(stepperId) {
            var stepper = $mdComponentRegistry.get(stepperId);
            
            if (!stepper) {
                $mdComponentRegistry.notFoundError(stepperId);
            }
            
            return stepper;
        };
    }
})();