var gulp = require('gulp');
var connect = require('gulp-connect'); // static server and reload and fresh
var htmlmin = require('gulp-htmlmin');
var uglifyJS = require('gulp-uglify'); // js compress
var minifyCSS = require('gulp-minify-css');
gulp.task('connect', function() {
  connect.server({
    livereload: true,
    open: true
  });
});

// // 压缩html
// gulp.task('html', function() {
//    var options = {
//         removeComments: true,//清除HTML注释
//         collapseWhitespace: true,//压缩HTML
//         collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
//         removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
//         removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
//         removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
//         minifyJS: true,//压缩页面JS
//         minifyCSS: true//压缩页面CSS
//   };
//   gulp.src('app/**/*.html')
//     .pipe(htmlmin(options))
//     .pipe(gulp.dest('dist'))
//     .pipe(connect.reload());
//
// });
//
//
// gulp.task('js', function() {
//   return gulp.src('app/scripts/**/*.js')
//     .pipe(uglifyJS({ preserveComments:'some' }))
//     .pipe(gulp.dest('dist/scripts'))
//     .pipe(connect.reload());
// });
//
// gulp.task('css', function() {
//   return gulp.src('app/styles/*.css')
//     .pipe(minifyCSS())
//     .pipe(gulp.dest('dist/styles'))
//     .pipe(connect.reload());
// });

// gulp.task('watch', function () {
//   gulp.watch('app/**/*.html', ['html']);
//   gulp.watch('app/scripts/**/*.js', ['js']);
//   gulp.watch('app/styles/*.css', ['css']);
// });

gulp.task('default', ['connect']);