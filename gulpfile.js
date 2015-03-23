var gulp   = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    header = require('gulp-header'),
    jshint = require('gulp-jshint'),
    meta   = require('./package.json');

var srcDir = './src/',
    distDir = './dist/',
    vendors = [
        './bower_components/tom32i-event-emitter.js/dist/event-emitter.min.js',
        './bower_components/tom32i-gamepad.js/dist/gamepad.min.js'
    ],
    sources = [
        './src/InputListener.js',
        './src/Mapper.js',
        './src/KeyboardMapper.js',
        './src/GamepadMapper.js',
        './src/TouchMapper.js'
    ],
    banner = [
      '/*!',
      ' * <%= name %> <%= version %>',
      ' * <%= homepage %>',
      ' * Copyright 2014 <%= author.name %>',
      ' */\n\n'
    ].join('\n');

gulp.task('jshint', function() {
    gulp.src(srcDir + '**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter());
});

gulp.task('source', function() {
    gulp.src(sources)
        .pipe(concat(meta.name.replace('.js', '.src.js')))
        .pipe(header(banner, meta))
        .pipe(gulp.dest(distDir));
});

gulp.task('full', function() {
    gulp.src(vendors.concat(sources))
        .pipe(concat(meta.name))
        .pipe(header(banner, meta))
        .pipe(gulp.dest(distDir));
});

gulp.task('min', function(){
    gulp.src(vendors.concat(sources))
        .pipe(concat(meta.name.replace('.js', '.min.js')))
        .pipe(uglify())
        .pipe(header(banner, meta))
        .pipe(gulp.dest(distDir));
});

gulp.task('watch', ['default'], function () {
    gulp.watch(srcDir + '**/*.js', ['default']);
});

gulp.task('default', ['jshint', 'source', 'full', 'min']);
