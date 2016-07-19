var gulp    = require('gulp');
var sass    = require('gulp-sass');
var concat  = require('gulp-concat');

/*
 *
 *       GULP TASKS
 * ## SASS & DEPENDENCIES ##
 *
 */

gulp.task('styles:main', function() {
  return gulp.src("app/styles/main.scss")
          .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
          .pipe(concat('app.css'))
          .pipe(gulp.dest('app/'));
});

gulp.task('styles:deps', function() {
  return gulp.src("app/bower_components/**/*.css")
          .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
          .pipe(concat('vendor.css'))
          .pipe(gulp.dest('app/'));
})

  // MAIN TASK

gulp.task('styles', ['styles:deps', 'styles:main']);
