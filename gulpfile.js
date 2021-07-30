const gulp = require('gulp');
const ts = require('gulp-typescript');
const gulpClean = require('gulp-clean');
const copy = require('gulp-copy');
const sourcemaps = require('gulp-sourcemaps');
const tsProject = ts.createProject('tsconfig.json', { module: "commonjs", typescript: require("typescript") });
const gulpEslint = require('gulp-eslint');

function clean() {
  return gulp.src('dist', { 'allowEmpty': true }).pipe(gulpClean({ force: true }));
}

function transpile() {
  return tsProject.src()
    .pipe(sourcemaps.init())
    .pipe(tsProject())
    .on("error", function (err) {
      console.error(err);
      process.exit(1);
    })
    .js.pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'));
}

function copySrc() {
  return gulp.src([
    'package.json',
    './src/components/**/**/**/*.json',
    '.env',
    './resources/**/**/*'
  ], {'allowEmpty' : true}).pipe(copy('dist'));
}

function esLint() {
  return tsProject.src()
    .pipe(gulpEslint({}))
    .pipe(gulpEslint.format())
    .pipe(gulpEslint.results(results => {
      console.log(`Total : ${results.length}`);
      console.log(`Total Warnings: ${results.warningCount}`);
      console.log(`Total Errors: ${results.errorCount}`);
    }))
    .pipe(gulpEslint.failAfterError());
}

exports.build = gulp.series(esLint, clean, transpile, copySrc);
