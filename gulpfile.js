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
const bssi         = require('browsersync-ssi');
const ssi          = require('ssi');

// BrowserSync
function browsersync() {
    browserSync.init({
        server : {
            baseDir: 'app/',
            middleware: bssi({
				baseDir: 'app/',
				ext: '.html'
			})
        },
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
            /* format : 'beautify' */
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
        'app/css/main.min.css',
        'app/js/app.min.js',
        'app/images/dist/**/*',
        'app/fonts/**/*'
    ], {base: 'app'})
    .pipe(dest('dist/'))
}
function cleanDist() {
    return del('dist/**/*', {force : true})
}

async function buildhtml() {
	let includes = new ssi('app/', 'dist/', '/**/*.html')
	includes.compile()
	del('dist/parts', {
		force: true
	})
}

// Вотчинг файлов
function startwatch() {
    watch(['app/**/*.js', '!app/**/*.min.js'], {
        usePolling : true
    }, scripts)
    watch(['app/styles/scss/**/*.scss'], {
        usePolling : true
    }, styles)
    watch('app/**/*.html', {
        usePolling : true
    }).on('change', browserSync.reload)
    watch('app/images/src/**/*', {
        usePolling : true
    }, image)
}

exports.scripts = scripts;
exports.styles = styles;
exports.browsersync = browsersync;
exports.image = image;
exports.cleanDist = cleanDist;
exports.buildhtml = buildhtml;

exports.bield = series(cleanDist, scripts, styles, image, bield, buildhtml);
exports.default = parallel(scripts, styles, image, browsersync, startwatch);