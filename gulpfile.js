const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const terser = require('gulp-terser');
const browsersync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');

// Sass Task
function scssTask(){
  return src('app/scss/style.scss')
  .pipe(sass({
    outputStyle: 'expanded'
 }))
 .pipe(dest('dist/css'));
  
}

function nanoTask(){
  return src('dist/css/style.css')
    .pipe(postcss([cssnano()]))
    .pipe(dest('dist/css'))
}



// JavaScript Task
function jsTask(){
  return src('app/js/main.js', { sourcemaps: true })
    .pipe(terser())
    .pipe(dest('dist/js', { sourcemaps: '.' }));
}

// Browsersync Tasks
function browsersyncServe(cb){
  browsersync.init({
    server: {
      baseDir: '.'
    }
  });
  cb();
}

function browsersyncReload(cb){
  browsersync.reload();
  cb();
}

// Task imagenmin
function imagenes() {
  return src ('app/img/**/*')
  .pipe(imagemin())
  //el des tino ve a public y coloca las imagnes minificadas en app luego img
  .pipe(dest('./dist/img'))
}


// Watch Task
function watchTask(){
  watch('*.html', browsersyncReload);
  watch(['app/scss/**/*.scss', 'app/js/**/*.js'], series(scssTask, jsTask, browsersyncReload));
}



// Default Gulp task
exports.default = series(
  scssTask,
  jsTask,
  browsersyncServe,
  watchTask
);
// Imagenes y nano es la unica que esta aparte debido a que reduce imagenes y demorara mucho si esta automatico y son muchas 
exports.imagenes = imagenes;
exports.nanoTask = nanoTask;