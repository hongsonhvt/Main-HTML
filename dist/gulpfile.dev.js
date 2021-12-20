"use strict";

var gulp = require('gulp');

var fileinclude = require('gulp-file-include');

var server = require('browser-sync').create();

var _require = require('gulp'),
    watch = _require.watch,
    series = _require.series;

var sass = require('gulp-sass')(require('sass'));

sass.compiler = require('node-sass');
var paths = {
  scripts: {
    src: './',
    dest: './build/'
  }
}; // Reload Server

function reload() {
  return regeneratorRuntime.async(function reload$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          server.reload();

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
} // Sass compiler


function compileSass() {
  return regeneratorRuntime.async(function compileSass$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          gulp.src('./sass/**/*.scss').pipe(sass().on('error', sass.logError)).pipe(gulp.dest('./assets/css'));

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
} // Copy assets after build


function copyAssets() {
  return regeneratorRuntime.async(function copyAssets$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          gulp.src(['assets/**/*']).pipe(gulp.dest(paths.scripts.dest));

        case 1:
        case "end":
          return _context3.stop();
      }
    }
  });
} // Build files html and reload server


function buildAndReload() {
  return regeneratorRuntime.async(function buildAndReload$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(includeHTML());

        case 2:
          _context4.next = 4;
          return regeneratorRuntime.awrap(copyAssets());

        case 4:
          reload();

        case 5:
        case "end":
          return _context4.stop();
      }
    }
  });
}

function includeHTML() {
  return regeneratorRuntime.async(function includeHTML$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          return _context5.abrupt("return", gulp.src(['*.html', '!header.html', // ignore
          '!footer.html' // ignore
          ]).pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
          })).pipe(gulp.dest(paths.scripts.dest)));

        case 1:
        case "end":
          return _context5.stop();
      }
    }
  });
}

exports.includeHTML = includeHTML;

exports["default"] = function _callee() {
  return regeneratorRuntime.async(function _callee$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          // Init serve files from the build folder
          server.init({
            server: {
              baseDir: paths.scripts.dest
            }
          }); // Build and reload at the first time

          buildAndReload(); // Watch Sass task

          watch('./sass/**/*.scss', series(compileSass)); // Watch task

          watch(["*.html", "assets/**/*"], series(buildAndReload));

        case 4:
        case "end":
          return _context6.stop();
      }
    }
  });
};