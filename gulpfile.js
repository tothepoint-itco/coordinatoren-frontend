var gulp = require('gulp');
var gulpNgConfig = require('gulp-ng-config');

var environments = require('gulp-environments');
var env_docker = environments.make("docker");

gulp.task('default', function() {
  // place code for your default task here
});

gulp.task('config:dev', function() {
    gulp.src('configFile.json')
    .pipe(gulpNgConfig('coordinatorentoolConfigs', {
        environment: 'local'
    }))
    .pipe(gulp.dest('./app'));
});

gulp.task('config:prd', function() {
    gulp.src('configFile.json')
    .pipe(gulpNgConfig('coordinatorentoolConfigs', {
        environment: 'production'
    }))
    .pipe(gulp.dest('./app'));
});

gulp.task('config:docker', function() {
    gulp.src('configFile.json')
    .pipe(gulpNgConfig('coordinatorentoolConfigs', {
        environment: 'docker'
    }))
    .pipe(gulp.dest('./app'));
});

gulp.task('config', function() {
    if (environments.production()) {
        gulp.start('config:prd');
    } else if (env_docker()) {
        gulp.start('config:docker');
    } else {
        gulp.start('config:dev');
    }
});
