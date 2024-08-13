const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCss = require('gulp-clean-css');
const bulkCSS = require('gulp-sass-bulk-importer');
const concatCss = require('gulp-concat');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const tsify = require('tsify');
const buffer = require('vinyl-buffer');
const fs = require('fs');
const imagemin = require('gulp-imagemin');
function clean(done) {
	if (fs.existsSync('./build')) {
		fs.rmdirSync('./build', { recursive: true });
		fs.mkdirSync('./build');
	} else {
		fs.mkdirSync('./build');
	}
	done();
}
function html() {
	return gulp.src('src/**/*.html').pipe(gulp.dest('build'));
}

function styles() {
	return gulp
		.src('src/**/*.scss')
		.pipe(bulkCSS())
		.pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
		.pipe(cleanCss())
		.pipe(concatCss('styles.min.css'))
		.pipe(gulp.dest('build/styles/'));
}

function fonts() {
	return gulp.src('src/styles/fonts/*{woff,woff2}', { encoding: false }).pipe(gulp.dest('build/styles/fonts'));
}

function images() {
	return gulp.src('src/public/**/*', { encoding: false }).pipe(imagemin()).pipe(gulp.dest('build/images'));
}

function scripts() {
	return browserify({ basedir: '.', debug: false, entries: ['src/index.ts'], cache: {}, packageCache: {} })
		.plugin(tsify)
		.transform('babelify', { presets: ['es2015'], extensions: ['.ts', '.js'] })
		.bundle()
		.pipe(source('index.js'))
		.pipe(buffer())
		.pipe(gulp.dest('build'));
}

exports.default = gulp.parallel(html, images, styles, fonts, scripts);
exports.clean = clean;
exports.watch = function () {
	gulp.series(html, images, fonts, styles, scripts)();
	gulp.watch('src/public/**/*', images);
	gulp.watch('src/styles/fonts/*', fonts);
	gulp.watch('src/**/*.html', html);
	gulp.watch('src/**/*.scss', styles);
	gulp.watch('src/**/*.ts', scripts);
};
