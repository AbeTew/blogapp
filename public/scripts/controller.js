'use strict';

angular.module('blogapp')
    .controller('BlogCtrl', ['$scope', '$location', 'Blogs', function ($scope, $location, Blogs) {

    $scope.blogs = Blogs.query();

    $scope.editing = [];

    $scope.createNewBlog = function() {
        $location.url('/new');
    }

    $scope.editBlog = function(index, id) {
        $scope.editing[index] = angular.copy($scope.blogs[index]);
        $location.url('/edit/' + id);
    }

    $scope.update = function(index){
        var blog = $scope.blogs[index];
        Blogs.update({id: blog._id}, blog);
        $scope.editing[index] = false;
    }

    $scope.edit = function(index){
        $scope.editing[index] = angular.copy($scope.blogs[index]);
    }

    $scope.cancel = function(index){
        $scope.blogs[index] = angular.copy($scope.editing[index]);
        $scope.editing[index] = false;
        $scope.isNewBlok = false;
    }

    $scope.remove = function(index){
        var blog = $scope.blogs[index];
        Blogs.remove({id: blog._id}, function(){
            $scope.blogs.splice(index, 1);
        });
    }

}]).controller('BlogDetailCtrl', ['$scope', '$routeParams', '$location', 'Blogs', function ($scope, $routeParams, $location, Blogs) {
        if ($routeParams.id) {
            $scope.blog = Blogs.get({id: $routeParams.id });
        }

        $scope.update = function(){
            $scope.blog.lastUpdated = new Date().getTime();
            Blogs.update({id: $scope.blog._id}, $scope.blog, function(){
                $location.url('/');
            });
        }

        $scope.remove = function(){
            Blogs.remove({id: $scope.blog._id}, function(){
                $location.url('/');
            });
        }

        $scope.save = function(){
            if(!$scope.newBlogTitle || $scope.newBlogTitle.length < 1) return;
            var blog = new Blogs({ title: $scope.newBlogTitle, contents: $scope.newBlogContents, author: 'system' });

            blog.$save(function(){
                $scope.newBlogTitle = ''; // clear textbox
                $scope.newBlogContents = ''; // clear textarea
                $location.url('/');

            });
        }

    }])
