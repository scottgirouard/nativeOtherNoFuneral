const gulp = require('gulp');
const sass = require('gulp-sass');
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var cssnano = require("cssnano");
var sourcemaps = require("gulp-sourcemaps");
const browserSync = require('browser-sync').create();


var paths = {
    styles: {
        src: "src/**/*.sass",
        dest: "src/css"
    }
};

// gulp.task('sass', function(){
//     return gulp.src(['src/scss/*.scss'])
//         .pipe(sass())
//         .pipe(gulp.dest('src/css'))
//         .pipe(browserSync.stream());
// });

// gulp.task('serve', ['sass'], function(){
//     browserSync.init({
//         server: './src'
//     });

//     gulp.watch(['src/scss/*.scss'], ['sass']);
//     gulp.watch(['src/*.html']).on('change', browserSync.reload);
// });

// gulp.task('default', ['serve']);

function style() {
    return (
        gulp
            .src('src/scss/*.scss')
            .pipe(sourcemaps.init())
            .pipe(sass())
            .on('error', sass.logError)
            .pipe(postcss([autoprefixer(), cssnano()]))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(paths.styles.dest))
            .pipe(browserSync.stream())
    );
}

function reload() {
    browserSync.reload();
}

function watch() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    })
    style();

    gulp.watch('paths.src.css.style', style)
    gulp.watch('path/to/html/*.html', reload);
}

exports.style = style;
exports.watch = watch;