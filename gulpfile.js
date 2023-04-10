"use strict";

const gulp = require("gulp");
const webpack = require("webpack-stream");
const browsersync = require("browser-sync");
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require("autoprefixer");
const cleanCSS = require("gulp-clean-css");
const postcss = require("gulp-postcss");

// const dist = "./dist/";
// const dist = 'C:/openserver/domains/weather-proj';
const dist = 'C:/OSPanel/domains/uslu-carr';

gulp.task("copy-html", () => {
    return gulp.src("./src/*.html")
                .pipe(gulp.dest(dist))
                .pipe(browsersync.stream());
});

gulp.task("build-sass", () => {
  return gulp.src("./src/sass/style.scss")
              .pipe(sass().on('error', sass.logError))
              .pipe(gulp.dest(dist + '/css'))
              .pipe(browsersync.stream());
});

gulp.task('copy-img', function () {
    return gulp.src('src/img/**/*')
        .pipe(gulp.dest('dist/img'))
        .pipe(browserSync.stream());
});

gulp.task("build-js", () => {
    return gulp.src("./src/js/main.js")
                .pipe(webpack({
                    mode: 'development',
                    output: {
                        filename: 'script.js'
                    },
                    watch: false,
                    devtool: "source-map",
                    module: {
                        rules: [
                          {
                            test: /\.m?js$/,
                            exclude: /(node_modules|bower_components)/,
                            use: {
                              loader: 'babel-loader',
                              options: {
                                presets: [['@babel/preset-env', {
                                    debug: true,
                                    corejs: 3,
                                    useBuiltIns: "usage"
                                }]]
                              }
                            }
                          }
                        ]
                      }
                }))
                .pipe(gulp.dest(dist))
                .on("end", browsersync.reload);
});

gulp.task("copy-assets", () => {
    return gulp.src("./src/img/**/*.*")
                .pipe(gulp.dest(dist + "/img"))
                .on("end", browsersync.reload);
});

gulp.task("watch", () => {
  browsersync.init({
  server: "./dist/",
  port: 4000,
  notify: true
  });
  
  gulp.watch("./src/index.html", gulp.parallel("copy-html"));
  gulp.watch("./src/js/**/*.js", gulp.parallel("build-js"));
  gulp.watch('src/sass/**/*.+(scss|sass|css)', gulp.parallel("build-sass"));
  gulp.watch('src/img/**/*').on('all', gulp.parallel('img'));
});

gulp.task("build", gulp.parallel("copy-html", "copy-assets", "build-js", "build-sass"));

gulp.task("build-prod-js", () => {

    gulp.src("./src/sass/style.scss")
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(cleanCSS())
    .pipe(gulp.dest(dist));

    return gulp.src("./src/js/main.js")
                .pipe(webpack({
                    mode: 'production',
                    output: {
                        filename: 'script.js'
                    },
                    module: {
                        rules: [
                          {
                            test: /\.m?js$/,
                            exclude: /(node_modules|bower_components)/,
                            use: {
                              loader: 'babel-loader',
                              options: {
                                presets: [['@babel/preset-env', {
                                    corejs: 3,
                                    useBuiltIns: "usage"
                                }]]
                              }
                            }
                          }
                        ]
                      }
                }))
                .pipe(gulp.dest(dist));
});

gulp.task("default", gulp.parallel("watch", "build"));