//yarn add gulp gulp-watch gulp-uglify gulp-stylus gulp-sourcemaps gulp-rigger gulp-plumber gulp-clean-css gulp-concat rimraf gulp-autoprefixer browser-sync

'use strict';

var gulp = require('gulp'),
	watch = require('gulp-watch'),
	uglify = require('gulp-uglify'),
	stylus = require('gulp-stylus'),
	sourcemaps = require('gulp-sourcemaps'),
	rigger = require('gulp-rigger'),
	plumber = require('gulp-plumber'),
	cssMin = require('gulp-clean-css'),
	concat = require('gulp-concat'),
	rimraf = require('rimraf'),
	autoprefixer = require('gulp-autoprefixer'),
	browserSync = require('browser-sync'),
	svgSprite = require('gulp-svg-sprites'),
	svgmin = require('gulp-svgmin'),
	cheerio = require('gulp-cheerio'),
	reload = browserSync.reload;

var path = {
	build: {
		html: 'dist/',
		js: 'dist/js/',
		css: 'dist/css/',
		img: 'dist/i/',
		fonts: 'dist/fonts/'
	},
	src: {
		html: 'src/*.html',
		js: 'src/js/*.js',
		css: 'src/style/*.styl',
		img: 'src/i/**',
		fonts: 'src/fonts/**',
		cssLibs: 'src/style/libs/*.css',
		jsLibs: 'src/js/libs/*.js',
		svg: 'src/i/svg/*.svg'
	},
	watch: {
		html: 'src/**/*.html',
		js: 'src/js/**/*.js',
		css: 'src/style/**/*.styl',
		img: 'src/i/**',
		fonts: 'src/fonts/**',
		cssLibs: 'src/style/libs/**/*.css',
		jsLibs: 'src/js/libs/**/*.js',
		svg: 'src/i/svg/**/*.svg'
	},
	clean: './dist'
};
gulp.task('webserver', function() {
	browserSync({
		server: {
			baseDir: './dist'
		},
		host: 'localhost',
		port: 3000,
		tunnel: true
	});
});

gulp.task('html:build', function() {
	gulp.src(path.src.html)
		.pipe(rigger())
		.pipe(gulp.dest(path.build.html))
		.pipe(reload({stream: true}));
});
gulp.task('js:build', function() {
	gulp.src(path.src.js)
		.pipe(gulp.dest(path.build.js))
		.pipe(reload({stream: true}));
});
gulp.task('style:build', function() {
	gulp.src(path.src.css)
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(stylus())
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(cssMin({compatibility: 'ie8'}))
		.pipe(concat('main.css'))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(path.build.css))
		.pipe(reload({stream: true}));
});
gulp.task('cssLibs:build', function() {
	gulp.src(path.src.cssLibs)
		.pipe(sourcemaps.init())
		.pipe(concat('plugins.css'))
		.pipe(cssMin({compatibility: 'ie8'}))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(path.build.css));
});
gulp.task('jsLibs:build', function() {
	gulp.src(path.src.jsLibs)
		.pipe(sourcemaps.init())
		.pipe(uglify())
		.pipe(concat('plugins.js'))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(path.build.js));
});
gulp.task('style-no-map:build', function() {
	gulp.src(path.src.css)
		.pipe(plumber())
		.pipe(stylus())
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(cssMin({compatibility: 'ie8'}))
		.pipe(concat('main.css'))
		.pipe(gulp.dest(path.build.css))
		.pipe(reload({stream: true}));
});
gulp.task('cssLibs-no-map:build', function() {
	gulp.src(path.src.cssLibs)
		.pipe(concat('plugins.css'))
		.pipe(cssMin({compatibility: 'ie8'}))
		.pipe(gulp.dest(path.build.css));
});
gulp.task('jsLibs-no-map:build', function() {
	gulp.src(path.src.jsLibs)
		.pipe(uglify())
		.pipe(concat('plugins.js'))
		.pipe(gulp.dest(path.build.js));
});
gulp.task('fonts:build', function() {
	gulp.src(path.src.fonts)
		.pipe(gulp.dest(path.build.fonts));
});
gulp.task('img:build', function() {
	gulp.src(path.src.img)
		.pipe(gulp.dest(path.build.img));
});
gulp.task('svg:build', function() {
	return gulp.src(path.src.svg)
		.pipe(svgmin({
			js2svg: {
				pretty: true
			}
		}))
		.pipe(cheerio({
			run: function ($) {
				$('[fill]').removeAttr('fill');
				$('[style]').removeAttr('style');
			},
			parserOptions: { xmlMode: true }
		}))
		.pipe(svgSprite({
			mode: "symbols",
			preview: false,
			selector: "icon-%f",
			svg: {
				symbols: 'inline-svg.html'
			}
		}))
		.pipe(gulp.dest('src/template'));
});
gulp.task('build', [
	'html:build',
	'js:build',
	'style:build',
	'cssLibs:build',
	'jsLibs:build',
	'img:build',
	'fonts:build',
	'svg:build'
]);
gulp.task('build-final', [
	'html:build',
	'js:build',
	'style-no-map:build',
	'cssLibs-no-map:build',
	'jsLibs-no-map:build',
	'img:build',
	'fonts:build',
	'svg:build'
]);
gulp.task('watch', function() {
	watch([path.watch.js], function(ev, callback) {
		gulp.start('js:build');
	});
	watch([path.watch.html], function(ev, callback) {
		gulp.start('html:build');
	});
	watch([path.watch.css], function(ev, callback) {
		gulp.start('style:build');
	});
	watch([path.watch.img], function(ev, callback) {
		gulp.start('img:build');
	});
	watch([path.watch.fonts], function(ev, callback) {
		gulp.start('fonts:build');
	});
	watch([path.watch.cssLibs], function(ev, callback) {
		gulp.start('cssLibs:build');
	});
	watch([path.watch.jsLibs], function(ev, callback) {
		gulp.start('jsLibs:build');
	});
	watch([path.watch.svg], function(ev, callback) {
		gulp.start('svg:build');
	});
});
gulp.task('clean', function(callback) {
	rimraf(path.clean, callback);
});
gulp.task('default', ['build', 'webserver', 'watch']);