'use strict';

angular.module('blogapp').factory('Blogs', ['$resource', function($resource){
    return $resource('/blogs/:id', null, {
        'update': { method:'PUT' }
    });

}]);