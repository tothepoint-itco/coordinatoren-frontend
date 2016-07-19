var gulp = require('gulp');

var requireDir = require('require-dir');
var tasks = requireDir('./gulp');

gulp.task('default', function() {
  // nop
});

gulp.task('build', ['config', 'uglify', 'styles']);
