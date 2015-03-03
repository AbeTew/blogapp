'use strict';

/**
 * This factory service is an example of how to use $resource to
 * perform REST operations to create, update, delete, or view a blog item.
 */
angular.module('blogapp').factory('Blogs', ['$resource', function ($resource) {

    return $resource('/blogs/:id', null, {
        'update': {method: 'PUT'}
    });

}]);