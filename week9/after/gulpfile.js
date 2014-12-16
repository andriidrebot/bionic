var
    gulp = require('gulp'),

    del = require('del'),
    durandal = require('gulp-durandal')
;

gulp.task('clean', function () {
    del(['build']);
});

gulp.task('durandal', ['clean'], function () {

    gulp
        .src('./index.html')
        .pipe(gulp.dest('build'))

    gulp
        .src('./css/**/*.*')
        .pipe(gulp.dest('build/css'))

    gulp
        .src('./js/require.js')
        .pipe(gulp.dest('build/js'))

    return durandal({
        baseDir: 'app',   //same as default, so not really required.
        main: 'main.js',  //same as default, so not really required.
        output: 'main.js', //same as default, so not really required.
        minify: true
    }).pipe(gulp.dest('build/app'));

});