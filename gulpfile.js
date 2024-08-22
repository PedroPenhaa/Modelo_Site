const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create();

// Tarefa para processar e minificar os arquivos SCSS
function styles() {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
}

// Tarefa para concatenar e minificar os arquivos JavaScript
function scripts() {
    return gulp.src('src/js/**/*.js')
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.stream());
}

// Tarefa para mover os arquivos HTML para a pasta dist
function html() {
    return gulp.src('src/html/**/*.html')
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
}

// Tarefa para servir o projeto usando BrowserSync e observar mudanças nos arquivos
function serve() {
    browserSync.init({
        server: './dist'
    });

    gulp.watch('src/scss/**/*.scss', styles);
    gulp.watch('src/js/**/*.js', scripts);
    gulp.watch('src/html/**/*.html', html);
    gulp.watch('src/html/**/*.html').on('change', browserSync.reload);
}

// Tarefa build que compila estilos, scripts e html
const build = gulp.series(styles, scripts, html);

// Tarefa default que inicia a build e o servidor
gulp.task('default', gulp.series(build, serve));

// Exportações para permitir a execução das tarefas individualmente
exports.styles = styles;
exports.scripts = scripts;
exports.html = html;
exports.serve = serve;
exports.build = build;  // Torna a tarefa de build disponível como uma tarefa pública
