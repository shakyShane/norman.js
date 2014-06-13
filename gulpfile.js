var gulp        = require("gulp");
var jshint      = require("gulp-jshint");
var rename      = require("gulp-rename");
var uglify      = require("gulp-uglify");
var browserify  = require("gulp-browserify");

gulp.task("build", function () {
    return gulp.src("lib/index.js")
        .pipe(browserify())
        .pipe(rename("norman.js"))
        .pipe(gulp.dest("dist"))
        .pipe(uglify())
        .pipe(rename("norman.min.js"))
        .pipe(gulp.dest("dist"));
});

gulp.task('lint', function () {
    gulp.src(["test/specs/*.js", "lib/*.js"])
        .pipe(jshint(".jshintrc"))
        .pipe(jshint.reporter("default"))
        .pipe(jshint.reporter("fail"))
});