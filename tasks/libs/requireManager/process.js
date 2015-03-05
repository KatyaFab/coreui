'use strict';

// Include our asset finder utility
var assets = require('./assets');

var process = function() {

    function iterateComponents(components) {

        Object.keys(components).forEach(function(component) {

            // Quick reference to the assets directly
            var componentAssets = components[component].assets;

            Object.keys(componentAssets).forEach(function(type) {

                // Check to see if tha asset process method is avaliable
                if (assets[componentAssets[type].process]) {

                    // We have a know process method in the assets module, so execute it.
                    // The results should be the specific files related to the requested asset type.
                    assets[componentAssets[type].process].call(this, components[component], type, componentAssets[type]);

                } else {

                    // Error out.
                    console.log("Component: " + component.name + " listed an unknow process method of: " + componentAssets.process + " for the asset type of " + type);

                }

            });

        });

    }

    // Function to handle
    var components = function(rm, next) {

        // Get all of the component object we need to iterate.
        var lazy = rm.lazyComponents;
        var include = rm.includeComponents;

        // Start by iterating lazy load components
        iterateComponents(lazy);

        // Now process included base components
        iterateComponents(include);

        // Move to the next
        next(rm);
    }


    return {
        components: components
    }
}

module.exports = exports = new process();
