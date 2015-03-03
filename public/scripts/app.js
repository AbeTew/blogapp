'use strict';

angular.module('blogapp', ['ngRoute', 'ngResource'])
    .config(function ($routeProvider) {

         $routeProvider.when('/', {
            templateUrl: 'views/blogList.html',
            controller: 'BlogCtrl'
         }).when('/new', {
             templateUrl: 'views/newBlog.html',
             controller: 'BlogDetailCtrl'
         }).when('/edit/:id', {
             templateUrl: 'views/editBlog.html',
             controller: 'BlogDetailCtrl'
         }).when('/:id', {
             templateUrl: 'views/blogDetails.html',
             controller: 'BlogDetailCtrl'
          }).otherwise({
            redirectTo: '/'
         });

    });