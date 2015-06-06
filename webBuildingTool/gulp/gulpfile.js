'use strict';


var gulp=require('gulp');
//var gulpCopy=require('gulp-copy');
//var clean = require('gulp-clean');

var $=require('gulp-load-plugins')(
{

	//pattern: ['gulp-*', 'gulp.*'], // the glob(s) to search for
	//config: 'package.json', // where to find the plugins, by default searched up from process.cwd()
    //scope: ['dependencies', 'devDependencies', 'peerDependencies'], // which keys in the config to look within
  //  replaceString: /^gulp(-|\.)/, // what to remove from the name of the module when adding it to the context
   // camelize: true, // if true, transforms hyphenated plugins names to camel case
   // lazy: true, // whether the plugins should be lazy loaded on demand
    rename: {
       'gulp-clean': 'clean',
       'gulp-cmd-transport':'transport',
       'gulp-cmd-concat':'Cmdconcat',
       'gulp-seajs-transport':'seajsTransport',
       'gulp-seajs-combo':'seajsCombo',
       'gulp-seajs-wrap':'seajsWrap',
       'gulp-file-concat':'fileconcat'
       
      
    }

  });



gulp.task('copyTask',function(){

 
return gulp.src('app/*')
  .pipe($.copy('dist/'));

});


/*gulp.task('copy2', function () {
  gulp.src('app/*')
    .pipe(gulp.dest('dist/'));
});
*/



// 合并、压缩js文件
gulp.task('js', function() {
  return gulp.src('app/*.js')
    .pipe($.concat('all.js'))
    .pipe(gulp.dest('dest/js'))
    .pipe($.rename({ suffix: '.min' }))
    .pipe($.uglify({
        mangle: { except: ['require', 'seajs', 'jQuery', '$', '_'] }
         }))
    .pipe(gulp.dest('dest/js2'))
    .pipe($.notify({ message: 'js task ok' }));
});



gulp.task('default',function () { 

return gulp.src(['dist/','build','dest'])
  .pipe($.clean());  

});



gulp.task('compress', function() {
  return gulp.src('app/*.js')
    .pipe($.uglify())
    .pipe(gulp.dest('dist/'));
});

var pkg = require('./package.json');


gulp.task( 'trans', function(){
    return gulp.src( ['app/*.js','deps/*'] ,{base:"./"})
        .pipe( $.transport(pkg) )
        .pipe(gulp.dest('dist/'));
}); 

/*gulp.task( 'trans', function(){
    return gulp.src( ['app/*.js','deps/*'] ,{base:"./"})
        .pipe( $.transport({alias:{  "jquery": "dist/modules/common/util"  } }) )
        .pipe(gulp.dest('dist/'));
}); 
*/




gulp.task( 'seajsTrans', function(){
    return gulp.src( ['app/*.js','deps/*'] ,{base:"./"})
        .pipe( $.seajsTransport() )
        .pipe(gulp.dest('dist/'));
});


gulp.task( 'combo', function(){
    return gulp.src( 'dist/app/a.js')
        .pipe($.seajsCombo() )
        .pipe( gulp.dest('build/') );
}); 



 



gulp.task( 'cmd', function(){
    return gulp.src( ['src/a.js'],{base:"./"})
        .pipe( $.cmd() )
        .pipe(gulp.dest('dist/'));
}); 



gulp.task( 'cmd2', function(){
    return gulp.src( 'src/js/main.js' )
        .pipe( $.cmd() )
        .pipe( gulp.task('build/js') );
}); 





gulp.task('test', function(){
  gulp.src(['app/a.js'])
    .pipe($.seajsWrap())
    .pipe(gulp.dest('dist/js/main.js'));
});


gulp.task('concat2', function(){
  return gulp.src('dist/a.js')
    .pipe($.Cmdconcat({  paths: ['.'],
                include: 'relative'}))
    .pipe(gulp.dest('.'));
});


var tasks = {
  all: {
    options: {
      include: 'relative',
      paths: ['.']
    },
    files: {  
      'dist/a.js': ['dist/app/a.js','dist/deps/b.js']
    }
  }


};

var taskNames = [];
Object.keys(tasks).forEach(function(name){
  var task = tasks[name],
      files = task.files,
      options = task.options;

  for(var f in files) {
    var taskName = name + ':' + f;
    gulp.task(taskName, function(){
      return gulp.src(files[f])
        .pipe($.concat(f, options))
        .pipe(gulp.dest('.'));
    });
    taskNames.push(taskName);
  }
});

var  runSeq = require('run-sequence');
gulp.task('concat', function(cb){
  runSeq(taskNames, cb);
});



/*gulp.task('default', function () {
    return gulp.src('app/*')
        .pipe($.clean({force: true}))   //force 为ture 设为安全文件夹 不删除
        .pipe(gulp.dest('dist/'));
});
*/


/*
 gulp.task('clean-scripts', function () {
  return gulp.src('app/tmp/*.js', {read: false})
    .pipe(clean());
});

gulp.task('scripts', ['clean-scripts'], function () {
  gulp.src('app/scripts/*.js')
    .pipe(gulp.dest('app/tmp'));
});

gulp.task('default', ['scripts']);*/





//在你的项目根目录下创建gulpfile.js，代码如下：

/*// 引入 gulp
var gulp = require('gulp');

// 引入组件
var htmlmin = require('gulp-htmlmin'), //html压缩
    imagemin = require('gulp-imagemin'),//图片压缩
    pngcrush = require('imagemin-pngcrush'),
    minifycss = require('gulp-minify-css'),//css压缩
    jshint = require('gulp-jshint'),//js检测
    uglify = require('gulp-uglify'),//js压缩
    concat = require('gulp-concat'),//文件合并
    rename = require('gulp-rename'),//文件更名
    notify = require('gulp-notify');//提示信息

// 压缩html
gulp.task('html', function() {
  return gulp.src('src/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./dest'))
    .pipe(notify({ message: 'html task ok' }));

});

// 压缩图片
gulp.task('img', function() {
  return gulp.src('src/images/*')
    .pipe(imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngcrush()]
    }))
    .pipe(gulp.dest('./dest/images/'))
    .pipe(notify({ message: 'img task ok' }));
});

// 合并、压缩、重命名css
gulp.task('css', function() {
  return gulp.src('src/css/*.css')
    .pipe(concat('main.css'))
    .pipe(gulp.dest('dest/css'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest('dest/css'))
    .pipe(notify({ message: 'css task ok' }));
});

// 检查js
gulp.task('lint', function() {
  return gulp.src('src/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(notify({ message: 'lint task ok' }));
});

// 合并、压缩js文件
gulp.task('js', function() {
  return gulp.src('src/js/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('dest/js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('dest/js'))
    .pipe(notify({ message: 'js task ok' }));
});

// 默认任务
gulp.task('default', function(){
  gulp.run('img', 'css', 'lint', 'js', 'html');

  // 监听html文件变化
  gulp.watch('src/*.html', function(){
    gulp.run('html');
  });

  // Watch .css files
  gulp.watch('src/css/*.css', ['css']);

  // Watch .js files
  gulp.watch('src/js/*.js', ['lint', 'js']);

  // Watch image files
  gulp.watch('src/images/*', ['img']);
});*/