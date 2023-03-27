const {src, dest, parallel, series, watch} = require('gulp');
const browserSync  = require('browser-sync').create();
const bssi         = require('browsersync-ssi');
const ssi          = require('ssi');
const webpackS     = require('webpack-stream');
const webpack      = require('webpack');
const concat       = require('gulp-concat');
const uglify       = require('gulp-uglify-es').default;
const sass         = require('gulp-sass')(require('sass'));
const sassglob     = require('gulp-sass-glob')
const autoprefixer = require('gulp-autoprefixer');
const cleanCss     = require('gulp-clean-css');
const imagemin     = require('gulp-imagemin')
const newer        = require('gulp-newer');
const del          = require('del');
const rename       = require('gulp-rename');

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
        ghostMode : false,
        notify    : false,
        online    : true,
        tunnel    : true
    })
}

// Scripts
function scripts () {
    return src('app/js/app.js')
    .pipe(webpackS({
        mode   : 'development',
        performance: { hints: false },
        module : {
            rules : [
                {
                    test    : /\.js$/,
                    exclude : /(node_modules)/,
                    loader: 'babel-loader',
					query: {
						presets: ['@babel/env'],
						plugins: ['babel-plugin-root-import']
					}
                    // query: {
					// 	presets: ['@babel/env'],
					// 	plugins: ['babel-plugin-root-import']
					// }
                }
            ]
        },
        // optimization: {
        //     minimize: true,
        //     splitChunks : {
        //         chunks : 'all'
        //     }
        // },
    }))
    .pipe(rename('app.min.js'))
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
function build() {
    return src([
        'app/css/main.min.css',
        'app/js/app.min.js',
        'app/images/dist/**/*',
        'app/fonts/**/*',
        '!app/typography.html'
    ], {base: 'app'})
    .pipe(dest('dist/'))
}
function cleanDist() {
    return del('dist/**/*', {force : true})
}

async function buildhtml() {
	let includes = new ssi('app/', 'dist/', '/**/*.html', '!/**/*typography.html')
	includes.compile()
	del('dist/parts', {
		force: true
	})
}

// Вотчинг файлов
function startwatch() {
    watch(['app/js/**/*.js', '!app/js/**/*.min.js'], {
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


exports.scripts     = scripts;
exports.styles      = styles;
exports.browsersync = browsersync;
exports.image       = image;
exports.cleanDist   = cleanDist;
exports.buildhtml   = buildhtml;
exports.bield       = bield;



exports.dist   = series(cleanDist, scripts, styles, image, buildhtml, build);
exports.default = series(scripts, styles, image, parallel(browsersync, startwatch));