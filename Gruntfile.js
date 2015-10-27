/*eslint no-var: 0, strict: 0*/
'use strict';
var path = require('path');
var wpcfg = require('./configs/webpack.config');

var devcfg = Object.create(wpcfg);

module.exports = function (grunt) {
	var pkgConfig = grunt.file.readJSON('package.json');

	// Let *load-grunt-tasks* require everything
	require('load-grunt-tasks')(grunt);
	grunt.initConfig({
		pkg: pkgConfig,

		karma: {
			unit: {
				configFile: 'configs/karma.conf.js'
			}
		},


		eslint: {
			target: [
				'src/**/*.js',
				'src/**/*.jsx'
			]
		},

		clean: {
			dist: {
				files: [{
					dot: true,
					src: [
						'dist/'
					]
				}]
			}
		},

		copy: {
			'dist': {
				files: [
					{
						flatten: true,
						expand: true,
						src: ['src/main/*'],
						dest: 'dist/',
						filter: 'isFile'
					// },
					// {
					// 	cwd: '<%= pkg.src %>/resources/images/',
					// 	expand: true,
					// 	filter: 'isFile',
					// 	src: ['**', '!**/icons/**'],
					// 	dest: '<%= pkg.stage %>/client/resources/images/'
					}
				]
			}
		},

		webpack: {
			dist: wpcfg
		},

		'webpack-dev-server': {
			options: {
				webpack: devcfg,
				publicPath: '/'
			},
			start: {
				watch: true,
				keepAlive: true,
				port: 8000,
				contentBase: path.resolve(__dirname, 'src/main/'),
				webpack: {
					debug: true,
					publicPath: '/',
					entry: path.join(__dirname, 'src/main/js/index.js'),
					output: {
						path: '/dist/',
						filename: 'js/index.js'
					}
				}
			}
		}
	});

	grunt.registerTask('lint', ['eslint']);
	grunt.registerTask('test', ['karma']);
	grunt.registerTask('build', ['clean:dist', 'eslint', 'webpack', 'copy:dist']);
	grunt.registerTask('default', ['eslint', 'webpack-dev-server:start']);
};
