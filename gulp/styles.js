var gulp    = require('gulp');
var sass    = require('gulp-sass');
var concat  = require('gulp-concat');

var dependencies = [
  "app/bower_components/html5-boilerplate/dist/css/normalize.css",
  "app/bower_components/html5-boilerplate/dist/css/main.css",
  "app/bower_components/vis/dist/vis.min.css",
  "app/styles/dependencies/main.scss"
];

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
  return gulp.src(dependencies)
          .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
          .pipe(concat('vendor.css'))
          .pipe(gulp.dest('app/'));
});

  // MAIN TASK

gulp.task('styles', ['styles:deps', 'styles:main']);

gulp.task('styles:watch', function() {
  return gulp.watch('app/styles/**/*.scss', ['styles:main']);
});
