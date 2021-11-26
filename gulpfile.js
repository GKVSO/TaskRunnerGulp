const {src, dest, parallel, series, watch} = require('gulp');
const browserSync  = require('browser-sync').create();
const concat       = require('gulp-concat');
const uglify       = require('gulp-uglify-es').default;
const sass         = require('gulp-sass')(require('sass'));
const sassglob     = require('gulp-sass-glob')
const autoprefixer = require('gulp-autoprefixer');
const cleanCss     = require('gulp-clean-css');
const imagemin     = require('gulp-imagemin')
const newer        = require('gulp-newer');
const del          = require('del');

// BrowserSync
function browsersync() {
    browserSync.init({
        server : {baseDir: 'app/'},
        notify : false,
        online : true,
    })
}

// Scripts
function scripts () {
    return src([
        'node_modules/jquery/dist/jquery.min.js',
        'app/js/app.js',
    ])
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(dest('app/js'))
    .pipe(browserSync.stream())
}

// Стили
function styles() {
    return src('app/styles/scss/main.scss')
        .pipe(sassglob())
        .pipe(sass())
        .pipe(concat('main.min.css'))
        .pipe(autoprefixer({
            overrideBrowserlist: ['last 10 versions'],
            grid: true
        }))
        .pipe(cleanCss({
            level: {
                1 : {
                    specialComments : 0
                }
            },
            format : 'beautify'
        }))
        .pipe(dest('app/css'))
        .pipe(browserSync.stream())
}

// Оптимизация картинок
function image() {
    return src('app/images/src/**/*')
    .pipe(newer('app/images/dist/'))
    .pipe(imagemin())
    .pipe(dest('app/images/dist/'))
}

// Bield
function bield() {
    return src([
        'app/*.html',
        'app/css/main.min.css',
        'app/js/app.min.js',
        'app/images/dist/**/*'
    ], {base: 'app'})
    .pipe(dest('dist/'))
}
function cleanDist() {
    return del('dist/**/*', {force : true})
}

// Вотчинг файлов
function startwatch() {
    watch(['app/**/*.js', '!app/**/*.min.js'], scripts)
    watch(['app/styles/scss/**/*.scss'], styles)
    watch('app/**/*.html').on('change', browserSync.reload)
    watch('app/images/src/**/*', image)
}

exports.scripts = scripts;
exports.styles = styles;
exports.browsersync = browsersync;
exports.image = image;
exports.cleanDist = cleanDist;

exports.bield = series(cleanDist, scripts, styles, image, bield);
exports.default = parallel(scripts, styles, image, browsersync, startwatch);