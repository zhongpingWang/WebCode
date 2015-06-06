var express = require('express')
var path = require('path')
var mongoose = require('mongoose')
var mongoStore = require('connect-mongo')(express)
var bodyParser = require('body-parser')
// var busboy = require('connect-busboy');

var port = process.env.PORT || 80
var app = express()

var dbUrl = 'mongodb://localhost/imooc'
mongoose.connect(dbUrl)

app.set('views', './app/views/pages')
app.set('view engine', 'jade')
app.use(bodyParser())
app.use(express.cookieParser())
// app.use(express.methodOverride())
app.use(express.multipart())
// app.use(busboy())
app.use(express.session({
    secret: 'imooc',
    store: new mongoStore({
        url: dbUrl,
        collection: 'sessions'
    })
}))

if ('development' == app.get('env')) {
    app.set('showStackError', true)
    app.use(express.logger(':method :url :status'))
    //之前的源码html源码是压缩过的，这么设置后，是无压缩过的，可读性好
    app.locals.pretty = true
    mongoose.set('debug', 'true')
}

require('./config/routes')(app)

app.listen(port)
app.use(express.static(path.join(__dirname, 'public')))
app.locals.moment = require('moment')