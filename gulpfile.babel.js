import gulp from 'gulp';
import browserify from 'browserify';
import babelify from 'babelify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import sass from 'gulp-sass';
import clean from 'gulp-clean';

gulp.task('clean-js', () => gulp
  .src('./dist/js/')
  .pipe(clean())
);

gulp.task('clean-css', () => gulp
  .src('./dist/css/')
  .pipe(clean())
);

gulp.task('js',['clean-js'], () => {
  return  browserify('src/js/app.js')
          .transform(babelify.configure({
            presets: ['env']
          }))
          .bundle()
          .pipe(source('app.js'))
          .pipe(buffer())
          .pipe(gulp.dest('dist/js/'));
});

gulp.task('css',['clean-css'], () => gulp
  .src('src/css/*.scss')
  .pipe(sass())
  .pipe(gulp.dest('dist/css/'))
);

gulp.task('watch',['build'], () => {
  gulp.watch('src/js/**/*.js', ['clean-js','js']);
  gulp.watch('src/css/**/*.scss', ['clean-css','css']);  
});

gulp.task('build',['js','css']); 