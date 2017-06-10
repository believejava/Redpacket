'use strict';

module.exports = function(grunt){
	var appConfig = {
		app: require('./bower.json').appPath || 'app',
		dist: '../src/main/webapp/admin',
		bowerPath: './app/bower_components'
	};

	require('time-grunt')(grunt);
	require('jit-grunt')(grunt);

	grunt.initConfig({

		appConfig: appConfig,

		watch: {
      js: {
        files: ['<%= appConfig.app %>/scripts/{,*/}*.js'],
        tasks: ['newer:jshint:all', 'newer:jscs:all'],
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      },
      jsTest: {
        files: ['test/spec/{,*/}*.js'],
        tasks: ['newer:jshint:test', 'newer:jscs:test', 'karma']
      },
      styles: {
        files: ['<%= appConfig.app %>/styles/{,*/}*.css'],
        tasks: ['newer:copy:styles', 'postcss']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= appConfig.app %>/{,*/}*.html',
          '.tmp/styles/{,*/}*.css',
          '<%= appConfig.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 8000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        livereload: 35728
      },
      livereload: {
        options: {
          open: true,
          middleware: function (connect) {
            return [
              connect.static('.tmp'),
              connect().use(
                '/app/bower_components',
                connect.static('./app/bower_components')
              ),
              connect().use(
                '/app/styles',
                connect.static('./app/styles')
              ),
              connect.static(appConfig.app)
            ];
          }
        }
      },
      test: {
        options: {
          port: 9001,
          middleware: function (connect) {
            return [
              connect.static('.tmp'),
              connect.static('test'),
              connect().use(
                '/app/bower_components',
                connect.static('./app/bower_components')
              ),
              connect.static(appConfig.app)
            ];
          }
        }
      },
      dist: {
        options: {
          open: true,
          base: '<%= appConfig.dist %>'
        }
      }
    },
		clean:{
			dist: {
				files: [{
					dot: true,
					src: [
						'.tmp',
						'<%= appConfig.dist %>/{,*/}*',
						'!<%= appConfig.dist %>/.git{,*/}*'
					]
				}
				]
			},
			server: '.tmp'
		},
		copy: {
			dist: {
				files: [{
					expand: true,
					dot: true,
					cwd: '<%= appConfig.app %>',
					dest: '<%= appConfig.dist %>',
					src: [
						'**/*'
					]
				}, {
					expand: true,
					cwd: '<%= appConfig.bowerPath %>',
					//cwd: './app/bower_components',
					//cwd: '<%= appConfig.app %>',
					dest: '<%= appConfig.dist %>/app/bower_components',
					src: [
						'**/*'
					]
				}]
			}
		}

	});

	grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'connect:livereload',
      'watch'
    ]);
  });

	grunt.registerTask('build', [
		'clean:dist',
		'copy:dist'
	]);

	grunt.registerTask('default', [
		'build'
	]);
};