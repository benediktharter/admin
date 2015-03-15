var elixir  = require('laravel-elixir'),
    gulp    = require('gulp');

gulp.task('watch', function() {
  var watcher = gulp.watch('resources/assets/**/*.less', ['compile']);

  watcher.on('change', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
});

gulp.task('compile', function() {
  elixir(function(mix) {
    mix.less('app.less');
  });
});