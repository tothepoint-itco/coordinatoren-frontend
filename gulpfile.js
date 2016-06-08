var gulp = require('gulp');
var gulpNgConfig = require('gulp-ng-config');

var environments = require('gulp-environments');
var env_docker = environments.make("docker");
var env_cronos = environments.make("prd-cronos");

var ts = require('gulp-typescript');
ts.reporter.nullReporter()
var tsProject = ts.createProject('tsconfig.json');

var uglify = require('gulp-uglify');

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

gulp.task('config:prd-cronos', function() {
    gulp.src('configFile.json')
    .pipe(gulpNgConfig('coordinatorentoolConfigs', {
        environment: 'prd-cronos'
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
    } else if (env_cronos()) {
        gulp.start('config:prd-cronos');
    } else if (env_docker()) {
        gulp.start('config:docker');
    } else {
        gulp.start('config:dev');
    }
});

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
          .pipe(gulp.dest('./app'));
    }
});
