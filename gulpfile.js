const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create();

function styles() {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
}

function scripts() {
    return gulp.src('src/js/**/*.js')
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.stream());
}

function html() {
    return gulp.src('src/html/**/*.html')
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
}

function serve() {
    browserSync.init({
        server: './dist'
    });

    gulp.watch('src/scss/**/*.scss', styles);
    gulp.watch('src/js/**/*.js', scripts);
    gulp.watch('src/html/**/*.html', html);
    gulp.watch('src/html/**/*.html').on('change', browserSync.reload);
}

exports.styles = styles;
exports.scripts = scripts;
exports.html = html;
exports.serve = gulp.series(styles, scripts, html, serve);
