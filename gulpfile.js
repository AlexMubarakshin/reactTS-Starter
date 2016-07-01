'use strict';

var gulp = require('gulp'),
    typescript = require('gulp-typescript'),
    //sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    browserify = require('browserify'),
    buffer = require('vinyl-buffer'),
    source = require('vinyl-source-stream'),
    del = require('del'),
    uglify = require('gulp-uglify');

var VERSION = "0.0.1";

gulp.task('clean', function(done) {
    return del(['tmp'], done);
});

// gulp.task('style', function() {
//     return gulp.src("style/tlogin.scss")
//         .pipe(sass().on('error', sass.logError))
//         //.pipe(autoprefixer('last 2 versions'))
//         .pipe(rename(`tlogin-${VERSION}.css`))
//         .pipe(gulp.dest("dist/css"))
// });

gulp.task('compileTS', function() {
    return gulp.src(['src/**/*.{ts,tsx}', "typings/**/*.ts"])
        .pipe(typescript({ removeComments: true, outDir: 'tmp', module: 'commonjs', jsx: "react" }))
        .pipe(gulp.dest('tmp'))
        .on('error', function(err) { console.error(err.message); process.exit(1) });
});

gulp.task('compile', ["clean", "compileTS"], function() {
    var b = browserify('tmp/main.js');
    return b.bundle()
        .pipe(source('index.js'))
        // .pipe(buffer())
        // .pipe(uglify())
        .pipe(rename(`tlogin-${VERSION}.js`))
        .pipe(gulp.dest('../react-build/js/react'))
});

gulp.task('default', ["compile"], function() {
    return gulp.src("dist");
});