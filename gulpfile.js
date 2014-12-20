var gulp = require('gulp');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var traceur = require('gulp-traceur');
var jshint = require('gulp-jshint');
var jshint_stylish = require('jshint-stylish');
var wrap = require('gulp-wrap');
var browsersync = require('browser-sync');

gulp.task('browser-sync', function() {
	browsersync({
		proxy: 'localhostd',
		port: 3000
	});
});


gulp.task('browsersync-reload', function () {
    browsersync.reload();
});

gulp.task('js', function () {
  gulp.src(['src/public/**/app.module.js', 'src/public/**/*.module.js', 'src/public/**/*.js'])
	.pipe(jshint())
    .pipe(jshint.reporter(jshint_stylish))  	
    .pipe(sourcemaps.init())    
    .pipe(traceur())
    .pipe(concat('app.js'))
    .pipe(ngAnnotate())    
    .pipe(sourcemaps.write())
    .pipe(wrap('(function(){\n"use strict";\n<%= contents %>\n})();'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/public/js'))    
});

gulp.task('watch', ['js'], function () {
  gulp.watch('src/public/**/*.js', ['js']);
});