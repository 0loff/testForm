'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const notify = require('gulp-notify');
const csso = require('gulp-csso');
const production = process.env.NODE_ENV === 'production';

gulp.task('sass', () => {
    let sassOpts = production ? 'compressed' : 'expanded';

    return gulp.src('scss/main.scss')
        .pipe(sass({outputStyle: sassOpts}).on('error', notify.onError({
            message: "<%= error.message %>",
            title: "Sass Error!"
        })))
        .pipe(autoprefixer('last 2 version', '> 5%'))
        .pipe(csso())
        .pipe(gulp.dest('css/'))
});

gulp.task('sass-with-map', () => {
    let sassOpts = production ? 'compressed' : 'expanded';

    return gulp.src('scss/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: sassOpts}).on('error', notify.onError({
            message: "<%= error.message %>",
            title: "Sass Error!"
        })))
        .pipe(autoprefixer('last 2 version', '> 5%'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('css/'))
});

gulp.task('image-min', () => {
    return gulp.src('img/**/*.*')
        .pipe(imagemin([
            imagemin.gifsicle({
                interlaced: true
            }),
            imagemin.jpegtran({
                progressive: true
            }),
            imagemin.optipng({
                optimizationLevel: 4
            }),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: false},
                    {cleanupIDs: false}
                ]
            })
        ]))
        .pipe(gulp.dest('img/'))
})

gulp.task('watch', () => {
    return gulp.watch("scss/**/*.{scss,sass}", gulp.series('sass-with-map'))
});

gulp.task('dev', gulp.series('sass-with-map', 'watch'));
gulp.task('img', gulp.series('image-min'));
gulp.task('default', gulp.series('sass'));
