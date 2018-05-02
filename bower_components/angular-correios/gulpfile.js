var gulp 			= require('gulp');
var uglify			= require('gulp-uglify');
var wrapper 	= require('gulp-wrapper');

gulp.task('build', function () {
	gulp.src('src/*.js')
	.pipe(wrapper({
		header: '(function (window, angular, undefined) {',
		footer: '}(window, angular, undefined));'
	}))
	.pipe(uglify())
	.pipe(gulp.dest('dist'));
});