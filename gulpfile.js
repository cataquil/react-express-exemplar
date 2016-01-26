'use strict';

var gulp = require('gulp');
var LiveServer = require('gulp-live-server');
var browserSync = require('browser-sync');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var reactify = require('reactify');

gulp.task('live-server', function () {
    var server = new LiveServer('server/main.js');
    server.start();    
});

gulp.task('bundle', ['copy'], function () {
    return browserify({
        entries: 'app/main.jsx',
        debug: true
    })
    .transform(reactify)
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./.tmp'));
});

gulp.task('skeleton',function () {
    gulp.src(['bower_components/skeleton/**/*'], {
        base: 'bower_components'
    }).pipe(gulp.dest('./.tmp/bower_components/'));    
})

gulp.task('copy',function(){
    gulp.src(['app/*.css'])
    .pipe(gulp.dest('./.tmp'));
})

gulp.task('serve',['bundle','live-server'],function(){
    browserSync.init(null,{
        proxy:"http://localhost:7777",
        port: 9001
    })
})
