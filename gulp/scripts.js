var gulp = require('gulp');
var uglify = require('gulp-uglify');

var environments = require('gulp-environments');

var ts = require('gulp-typescript');
ts.reporter.nullReporter()
var tsProject = ts.createProject('tsconfig.json');

/*
 *
 *          GULP TASKS
 * ## TYPESCRIPT & COMPRESSION ##
 *
 */

gulp.task('tscompile', function() {
    tsProject.src()
    .pipe(ts(tsProject, undefined, ts.reporter.nullReporter()))
    .js
    .pipe(gulp.dest('.'));
});

gulp.task('uglify', function() {
    if (environments.production()) {
        gulp.src('app/*.js')
          .pipe(uglify())
          .pipe(gulp.dest('app'));
    }
});
