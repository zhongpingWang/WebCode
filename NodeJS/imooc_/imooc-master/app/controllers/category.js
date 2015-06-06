var Category = require('../models/category')
var _ = require('underscore')

//detail page
exports.detail = function(req, res) {
    var id = req.params.id

    Movie.findById(id, function(err, movie) {
        Comment
            .find({
                movie: id
            })
            .populate('from', 'name')
            .populate('reply.from reply.to', 'name')
            .exec(function(err, comments) {
                console.log(comments)
                res.render('detail', {
                    title: 'imooc 详情页',
                    movie: movie,
                    comments: comments
                })
            })
    })
}

exports.new = function(req, res) {
    res.render('category_admin', {
        title: 'imooc 后台分类录入页面',
        category: {}
    })
}


// admin post movie
exports.save = function(req, res) {
    var _category = req.body.category

    var category = new Category(_category)

    category.save(function(err, category) {
        if (err) {
            console.log(err)
        }

        res.redirect('/admin/category/list')
    })
}

// catelist page
exports.list = function(req, res) {
    Category.fetch(function(err, categories) {
        if (err) {
            console.log(err)
        }
        res.render('categorylist', {
            title: 'imooc 分类列表页',
            categories: categories
        })
    })
}