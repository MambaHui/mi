const gulp=require('gulp');

const cssmin=require('gulp-cssmin');

const autoprefixer=require('gulp-autoprefixer');

const babel=require('gulp-babel');
const uglify=require('gulp-uglify')

const htmlmin=require('gulp-htmlmin');

const del=require('del');

const webserver=require('gulp-webserver');

// //打包css
const cssHandler = () =>{
    return gulp.src('./src/css/*.css')
    .pipe(autoprefixer())
    .pipe(cssmin())
    .pipe(gulp.dest('./dist/css'))
}

// //移动img
const imgHandler = () =>{
    return gulp.src('./src/images/**')
    .pipe(gulp.dest('./dist/images'))
}

// //压缩js
const jsHandler = () =>{
    return gulp.src('./src/js/*.js')
    .pipe(babel({
        presets:['@babel/env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'))

}
// //移动lib
const libHandler = () =>{
    return gulp.src('./src/lib/**')
    .pipe(gulp.dest('./dist/lib'))
}
// //移动json
const jsonHandler = () =>{
    return gulp.src('./src/json/**')
    .pipe(gulp.dest('./dist/json'))
}
// //移动font
const fontHandler = () =>{
    return gulp.src('./src/font/**')
    .pipe(gulp.dest('./dist/font'))
}
// //移动php
const phpHandler = () =>{
    return gulp.src('./src/php/**')
    .pipe(gulp.dest('./dist/php'))
}

// //压缩html
const htmlHandler = () =>{
    return gulp.src('./src/pages/*.html')
    .pipe(htmlmin({
        collapseWhitespace:true,
        collapseWhitespace: true,
        removeAttributeQuotes:true, 
        collapseBooleanAttributes:true,
        removeComments:true,
        minifyCSS:true,
        minifyJS:true,
    }))
    .pipe(gulp.dest('./dist/pages'))
}

//自动删除dist目录
const delHandler = () =>{
    return del(['./dist'])
}

// 监听文件
const watchHanlder = () =>{
    gulp.watch('./src/css/*.css',cssHandler);
    gulp.watch('./src/images/**',imgHandler);
    gulp.watch('./src/js/*.js',jsHandler);
    gulp.watch('./src/lib/**',libHandler);
    gulp.watch('./src/pages/**',htmlHandler);
    gulp.watch('./src/json/**',jsonHandler)
    gulp.watch('./src/font/**',fontHandler)
    gulp.watch('./src/php/**',phpHandler)

}

const serverHandler = () =>{
    return gulp.src('./dist')
    .pipe(webserver({
        port:8080,
        open:'./pages/index.html',
        livereload:true,
        proxies:[
            {
               source:'/weather',
               target:'https://way.jd.com/jisuapi/weather' 
            }
        ]
    }))
}

module.exports.default = gulp.series(
    delHandler,
    gulp.parallel(
        cssHandler,
        imgHandler,
        jsHandler,
        libHandler,
        htmlHandler,
        jsonHandler,
        fontHandler,
        phpHandler
    ),
    // serverHandler,
    watchHanlder
)
// module.exports.del = delHandler;