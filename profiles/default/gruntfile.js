module.exports = function (grunt) {
	'use strict';

	/**
	 * Paths
	 */
	var SRC = {
			base: 'src/',
			js: 'src/js/',
			css: 'src/css/',
			assets: 'src/assets/',
			vendor: 'src/js/vendor/'
		},
		DIST = {
			base: 'dist/',
			js: 'dist/js/',
			css: 'dist/css/',
			assets: 'dist/assets/',
			vendor: 'dist/js/vendor/'
		},
		TESTS = {
			base: 'test/',
			coverage: 90
		};

	/**
	 * Grunt Config
	 */
	grunt.initConfig({

		/**
		 * Get package.json data
		 */
		pkg: grunt.file.readJSON('package.json'),

		/**
		 * Ensure that dependencies are up-to-date
		 */
		bower: {
			install: {
				options: {
					install: true,
					copy: false
				}
			}
		},

		/**
		 * JSBeautifier
		 */
		jsbeautifier: {
			dev: {
				src: [SRC.js + '**/*.js', '!' + SRC.vendor + '**/*.js'],
				options: {
					config: '.jsbeautifyrc'
				}
			}
		},

		/**
		 * JSHint
		 */
		jshint: {
			dev: {
				options: {
					jshintrc: '.jshintrc',
					jshintignore: '.jshintignore'
				},
				files: {
					src: [SRC.js + '**/*.js']
				}
			}
		},

		/**
		 * Mocha Unit Tests
		 */
		mocha: {
			all: [TESTS.base + '**/*.html'],
			options: {
				run: false
			}
		},

		/**
		 * Mocha Unit Tests & Blanket Coverage
		 */
		/*jshint camelcase:false*/
		blanket_mocha: {
			all: [TESTS.base + '**/*.html'],
			options: {
				threshold: TESTS.coverage,
				run: false
			}
		},
		/*jshint camelcase:true*/

		/**
		 * RequireJS
		 */
		requirejs: {
			main: {
				options: {
					name: 'main',
					baseUrl: SRC.js,
					mainConfigFile: SRC.js + 'main.js',
					out: DIST.js + 'main.js',
					optimize: 'uglify',
					logLevel: 0
				}
			}
		},

		/**
		 * Copy files into dist from src
		 */
		copy: {
			main: {
				files: [
					// CSS
					{
						expand: true,
						cwd: SRC.css,
						src: ['*.css'],
						dest: DIST.css
					},
					// Assets
					{
						expand: true,
						cwd: SRC.assets,
						src: ['**'],
						dest: DIST.assets
					},
					// Individual files
					{
						expand: true,
						cwd: SRC.base,
						src: ['index.html'],
						dest: DIST.base
					}
				]
			}
		},

		/**
		 * Watch - runs designated tasks when files are modified
		 */
		watch: {
			scripts: {
				files: [SRC.js + '**/*.js', SRC.css + '**/*.scss'],
				tasks: ['jshint', 'compass'],
				options: {
					spawn: false
				}
			},
			bower: {
				files: 'bower.json',
				tasks: ['bower', 'requirejs', 'copy']
			}
		},

		/*
		 * SASS compiler
		 * MUST use full paths
		 */
		sass: {
			options: {
				includePaths: ['./' + SRC.css]
			},
			dev: {
				files: {
					'./src/css/main.css': './' + SRC.css + 'main.scss'
				}
			}
		},

		/*
		 * Torch the dist directory
		 */
		clean: ['./' + DIST.base]

	});

	// Load NPM Tasks
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-jsbeautifier');
	grunt.loadNpmTasks('grunt-mocha');
	grunt.loadNpmTasks('grunt-blanket-mocha');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-bower-task');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-clean');

	// Register Tasks
	grunt.registerTask('tests', ['jshint', 'jsbeautifier', 'bower', 'blanket_mocha']);

	grunt.registerTask('default', ['jshint', 'jsbeautifier', 'bower', 'blanket_mocha', 'clean', 'requirejs', 'copy']);

};
