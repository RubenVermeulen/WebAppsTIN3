var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var pump = require('pump');
var concat = require('gulp-concat');

gulp.task('scripts', function() {
    return gulp.src([
            './public/javascripts/external/*.js',
            './public/javascripts/angular.model.js',
            './public/javascripts/angularApp.js',
            './public/javascripts/services/*.js',
            './public/javascripts/controllers/*.js',
            './public/javascripts/directives/*.js'
        ])
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./public/dist/js'));
});

gulp.task('compress', function (cb) {
    pump([
            gulp.src('./public/dist/js/all.js'),
            uglify({mangle: false}),
            gulp.dest('public/dist/js/min')
        ],
        cb
    );
});

gulp.task('minify-css', function() {
    return gulp.src('public/stylesheets/*.css')
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('public/dist/css'));
});

