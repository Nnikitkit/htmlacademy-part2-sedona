const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
//const sass = require("gulp-sass");
const sass = require('gulp-sass')(require('sass'));
const postcss = require("postcss");
const autoprefixer = require("autoprefixer");
const sync = require("browser-sync").create();

//styles

const styles = () => {
  return gulp.src("sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("css"))
    .pipe(sync.stream());
}

exports.styles = styles;

//server

const server = (done) => {
  sync.init({
    server: {
      baseDir: 'HTML Academy p.2 Sedona'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;

//watcher

const watcher = () => {
  gulp.watch("sass/**/*.scss", gulp.series("styles"));
  gulp.watch("*.html").on("change", sync.reload);
}

exports.default = gulp.series(
  styles, server, watcher
);
