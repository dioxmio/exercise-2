var gulp = require('gulp'),
	browserify = require('browserify'),
    reactify = require('reactify'),
    source = require('vinyl-source-stream'),
    concat = require('gulp-concat-css'),
    babel = require('gulp-babel'),
    babelify = require('babelify'),
    uglify = require('gulp-uglify')
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    karma = require('karma').server,
    path = require('path');


function runKarma(configFile, cb) {
   karma.start({
      configFile: path.resolve(configFile),
      singleRun: false
   }, cb);
}

gulp.task('cssConcat', function () {
  return gulp.src([
        'styles.css',
        './node_modules/bootstrap/dist/css/bootstrap.min.css',
        './node_modules/react-bootstrap-multiselect/css/bootstrap-multiselect.css',
        './vendor/pnotify/pnotify.custom.min.css'
    ])
    .pipe(concat("styles.css"))
    .pipe(gulp.dest('./dest'));
});

gulp.task('test', function(cb) {
    runKarma('spec/karma.conf.js', cb);
});

gulp.task('browserify', function() {
    return browserify({
            debug: true,
            entries: ['./src/init.js']
        })
        //perform the react transformation
        .transform(babelify)
        .transform(reactify)
        .bundle()
        //Pass desired output filename to vinyl-source-stream
        .pipe(source('bundle.js'))
        // Start piping stream to tasks!
        .pipe(gulp.dest('./dest/'));
});

gulp.task('browserify-prod', function() {
    return browserify({
            entries: ['./src/init.js']
        })

        //perform the react transformation
        .transform(babelify)
        .transform({ sourcemap: false }, 'uglifyify')
        .transform(reactify)
        .bundle()
        .pipe(source('bundle.js'))
        //Pass desired output filename to vinyl-source-stream
        .pipe(buffer())
        .pipe(uglify())
        // Start piping stream to tasks!
        .pipe(gulp.dest('./dest/'));
});

gulp.task('build',
	['cssConcat','browserify']
);

gulp.task('default',
	['cssConcat','browserify']
);

gulp.task('prod',
	['cssConcat','browserify-prod']
);

gulp.task('watch',function(){
	gulp.watch('./src/**/*.js',['build']);
});
