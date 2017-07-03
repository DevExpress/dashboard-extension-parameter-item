var gulp = require("gulp"),
    concat = require("gulp-concat"),
    uglify = require("gulp-uglify"),
    rename = require("gulp-rename"),
    pump = require("pump");

// define tasks here
gulp.task("default", ["build"]);

gulp.task("build", function () {
	gulp
		.src([
			"./src/meta.js",
			"./src/icon.js",
			"./src/viewer.js",
			"./src/extension.js"
			])
		.pipe(concat("parameter-item.js"))
		.pipe(gulp.dest("./dist"))
		.pipe(uglify())
		.pipe(rename("parameter-item.min.js"))
		.pipe(gulp.dest("./dist"));
});

gulp.task("watch_sources", function () {
	gulp.watch(["./src/*.js"], ["build"]);
})

gulp.task('Ωdebug-uglify', function (cb) {
    pump([
          gulp.src('src/*.js'),
          uglify(),
          gulp.dest('dist')
    ],
      cb
    );
});
