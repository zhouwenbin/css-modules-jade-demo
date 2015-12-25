'use strict';
var gulp = require('gulp');
var postcss = require('gulp-postcss');
var modules = require('postcss-modules');
var fs = require('fs');
var jade = require('gulp-jade');

gulp.task('default', function () {
    gulp.src('css/**.css')
      .pipe(postcss([
        require('postcss-modules')({
          getJSON: function(cssFileName, json) {
            var path          = require('path');
            var cssName       = path.basename(cssFileName, '.css');
            var jsonFileName  = path.resolve('css/' + cssName + '.json');
            fs.writeFileSync(jsonFileName, JSON.stringify(json));
          }
        })
      ]))
      .pipe(gulp.dest('out'));

    var YOUR_LOCALS = {};

    gulp.src('css/*.jade')
      .pipe(jade({
        locals: YOUR_LOCALS
      }))
      .pipe(gulp.dest('out/'))
});
