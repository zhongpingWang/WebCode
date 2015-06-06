var Movie = require('../models/movie')
var Category = require('../models/category')
// index page
exports.index = function(req, res) {
    console.log('user in session:')
    console.log(req.session.user)

    Category.find({}).populate({
        path: 'movies',
        options: {
            limit: 5
        }
    }).exec(function(err, categories) {
        if (err) {
            console.log(err)
        }

        res.render('index', {
            title: 'imooc 首页',
            categories: categories
        })

    })

}

// search page
exports.search = function(req, res) {
    var catId = req.query.cat
    var q = req.query.q
    var page = parseInt(req.query.p, 10) || 0
    var count = 2
    var index = page * 2

    if (catId) {
        Category.find({
            _id: catId
        }).populate({
            path: 'movies',
            select: 'title poster',
            //分页方法１ 可行!
            // options: {
            //     limit: 2,
            //     skip: index
            // }
        }).exec(function(err, categories) {
            if (err) {
                console.log(err)
            }
            var category = categories[0] || {}
            var movies = category.movies || []
            var results = movies.slice(index, index + count)

            res.render('results', {
                title: 'imooc 结果列表',
                keyword: category.name,
                currentPage: page + 1,
                query: 'cat=' + catId,
                totalPage: Math.ceil(movies.length / count),
                movies: results
            })

        })

    } else {
        Movie.find({
            title: new RegExp(q + '.*', 'i')
        }).exec(function(err, movies) {
            if (err) {
                console.log(err)
            }

            var results = movies.slice(index, index + count)

            res.render('results', {
                title: 'imooc 结果列表',
                keyword: q,
                currentPage: page + 1,
                query: 'q=' + q,
                totalPage: Math.ceil(movies.length / count),
                movies: results
            })
        })
    }

}