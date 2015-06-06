# gulp-seajs-wrap

> add CMD wrap `define(function(require, exports, module) {` ... `});`

## Usage

First, install `gulp-seajs-wrap` as a development dependency:

    npm install --save-dev gulp-seajs-wrap

Then, add it to your gulpfile.js:

    var seajsWrap = require('gulp-seajs-wrap');

    gulp.task('test', function(){
      gulp.src(['js/main.js'])
        .pipe(seajsWrap())
        .pipe(gulp.dest('dist/js/main.js'));
    });
