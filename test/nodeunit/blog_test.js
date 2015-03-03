
var mongoose = require('mongoose');
var Blog = require('../../models/Blog');

var db;

var myNewBlogId = undefined;

module.exports = {
    setUp: function(callback) {
        try {
            mongoose.connection.once('open', function() {
                console.log('Opened connection');
                callback();
            });


            db = mongoose.connect('mongodb://localhost/blogApp');
            console.log('Started connection, waiting for it to open');
        }

        catch (err) {
            console.log('Setting up failed:', err.message);
        }
    },

    tearDown: function(callback) {
        console.log('In tearDown');
        try {
            console.log('Closing connection');
            db.disconnect();
            callback();
        }

        catch (err) {
            console.log('Tearing down failed:', err.message);
        }
    },

    "Test  Create Blog": function(test) {
        console.log('testing creating  blog');
        var _blog = {"title": "MyNewBlog", "contents": "This is a test blog", "author": "me"};
        Blog.create(_blog, function (err, result) {
            if (!err) {
                myNewBlogId = result._id;
                test.ok(result);
            } else {
                console.log('error' + err);
            }
            test.ifError(err);
            test.done();

        });

    },
    "Test  Update Blog": function(test) {
        console.log('testing updating  blog');
        var _blog = {"title": "MyNewBlog_Updated", "contents": "This is a test blog updated", "author": "me"};

        Blog.findByIdAndUpdate(myNewBlogId, _blog, function (err, result) {
            if (!err) {
                test.ok(result);
            } else {
                console.log('error' + err);
            }

            test.ifError(err);
            test.done();

        });
    },

    "Test Get Blogs": function(test) {
        console.log('testing getting blog');

        Blog.find({}, function (err, result) {
            if (!err) {
                console.log('results' + result);
                test.ok(result);
            } else {
                console.log('error' + err);
            }

            test.ifError(err);
            test.done();
        });
    },

    "Test Remove Blogs": function(test) {
        console.log('testing removing blog');

        Blog.find({}, function (err, results) {
            if (!err) {
                for (var i = 0; i < results.length; i++) {
                    Blog.findByIdAndRemove(results[i]._id, results[i], function (err, result) {
                        if (!err) {
                            test.ok(result);

                        } else {

                        }
                    });
                }

                test.ok(results);
            } else {
                console.log('error' + err);
            }

            test.ifError(err);
            test.done();
        });
    }

};