'use strict';

/**
 * The BlogCtrl contains the client-side blog list (model) and also provides controller functionality
 * to create, update, or delete blogs.
 */
angular.module('blogapp')
    .controller('BlogCtrl', ['$scope', '$location', 'Blogs', function ($scope, $location, Blogs) {

        $scope.blogs = Blogs.query();

        $scope.blogToEdit = [];

        $scope.createNewBlog = function () {
            $location.url('/new');
        }

        $scope.editBlog = function (index, id) {
            $scope.blogToEdit[index] = angular.copy($scope.blogs[index]);
            $location.url('/edit/' + id);
        }

        $scope.update = function (index) {
            var blog = $scope.blogs[index];
            Blogs.update({id: blog._id}, blog);
            $scope.blogToEdit[index] = false;
        }

        $scope.cancel = function (index) {
            $scope.blogs[index] = angular.copy($scope.blogToEdit[index]);
            $scope.blogToEdit[index] = false;
            $scope.isNewBlok = false;
        }

        $scope.remove = function (index) {
            var blog = $scope.blogs[index];
            Blogs.remove({id: blog._id}, function () {
                $scope.blogs.splice(index, 1);
            });
        }

    }])

/**
 * The BlogDetailCtrl provides functionality to create or update blogs.
 */
    .controller('BlogDetailCtrl', ['$scope', '$routeParams', '$location', 'Blogs',
        function ($scope, $routeParams, $location, Blogs) {

            if ($routeParams.id) {
                $scope.blog = Blogs.get({id: $routeParams.id});
            }

            $scope.update = function () {
                $scope.blog.lastUpdated = new Date().getTime();
                Blogs.update({id: $scope.blog._id}, $scope.blog, function () {
                    $location.url('/');
                });
            }


            $scope.save = function () {
                if (!$scope.newBlogTitle || $scope.newBlogTitle.length < 1) return;
                var blog = new Blogs({title: $scope.newBlogTitle, contents: $scope.newBlogContents, author: 'system'});

                blog.$save(function () {
                    $scope.newBlogTitle = '';
                    $scope.newBlogContents = '';
                    $location.url('/');

                });
            }

        }])
