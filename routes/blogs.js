var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

var Blog = require('../models/Blog.js');

/* GET /blogs listing. */
router.get('/', function(req, res, next) {
  Blog.find(function (err, blogs) {
    if (err) return next(err);
    res.json(blogs);
  });
});

/* POST /blogs */
router.post('/', function(req, res, next) {
  Blog.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* GET /blogs/id */
router.get('/:id', function(req, res, next) {
  Blog.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* PUT /blogs/:id */
router.put('/:id', function(req, res, next) {
  Blog.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE /blogs/:id */
router.delete('/:id', function(req, res, next) {
  Blog.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
