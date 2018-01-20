module.exports = function(grunt) {
	require('time-grunt')(grunt);
	require('jit-grunt')(grunt);

	grunt
			.initConfig({
				pkg : grunt.file.readJSON('package.json'),
				COPYRIGHTS_BANNER : grunt.file.read('copyrights.txt'),
				vars : {
					src : 'src',
					dist : 'dist',
					components : 'bower_components',
					tmp : '.tmp'
				},
				clean : {
					tmp : [ '<%= vars.tmp %>' ],
					dist : [ '<%= vars.dist %>/*' ],
				},
				jshint : {
					options : {
						reporter : require('jshint-stylish'),
						// curly : true,
						browser : true,
						devel : true,
						shadow : false,
						expr : true,
						validthis : true,
						globals : {
							angular : true,
							_ : true
						}
					},
					gruntfile : [ 'Gruntfile.js' ],
					src : [ '<%= vars.src %>/js/**/*.js' ]
				},
				ngAnnotate : {
					options : {
						singleQuotes : true
					},
					dist : {
						files : [
								{
									expand : true,
									cwd : '<%= vars.src %>/js',
									src : [ '**/*.js' ],
									dest : '<%= vars.tmp %>/js',
									filter : 'isFile'
								},
								{
									'<%= vars.tmp %>/templates/templates.module.js' : '<%= vars.tmp %>/templates/templates.module.js'
								} ]
					}
				},
				uglify : {
					dev : {
						options : {
							banner : '<%= COPYRIGHTS_BANNER %>',
							mangle : false,
							beautify : true,
							compress : false,
							preserveComments : false,
							maxLineLen : 50000
						},
						files : {
							'<%= vars.dist %>/js/<%= pkg.name %>.js' : [
									'<%= vars.tmp %>/js/<%= pkg.name %>.module.js',
									'<%= vars.tmp %>/js/**/*.js',
									'<%= vars.tmp %>/templates/**/*.js' ]
						}
					},
					dist : {
						options : {
							banner : '<%= COPYRIGHTS_BANNER %>',
							mangle : true,
							compress : true,
							preserveComments : false,
							maxLineLen : 50000
						},
						files : {
							'<%= vars.dist %>/js/<%= pkg.name %>.min.js' : [
									'<%= vars.tmp %>/js/<%= pkg.name %>.module.js',
									'<%= vars.tmp %>/js/**/*.js',
									'<%= vars.tmp %>/templates/**/*.js' ]
						}
					}
				},
				less_imports : {
					options : {
						inlineCSS : false,
						banner : ""
					},
					files : {
						src : [ '<%= vars.src %>/less/**/*.less' ],
						dest : '<%= vars.tmp %>/less/theme.less'
					}
				},
				less : {
					dev : {
						options : {
							banner : '<%= COPYRIGHTS_BANNER %>'
						},
						files : {
							'<%= vars.dist %>/css/<%= pkg.name %>.css' : [ '<%= vars.tmp %>/less/**/*.less' ]
						}
					},
					dist : {
						options : {
							banner : '<%= COPYRIGHTS_BANNER %>',
							compress : true
						},
						files : {
							'<%= vars.dist %>/css/<%= pkg.name %>.min.css' : [ '<%= vars.tmp %>/less/**/*.less' ]
						}
					}
				},
				html2js : {
					options : {
						base : '<%= vars.src %>/html',
						module : 'itaca.components',
						useStrict : true,
						singleModule : true,
						existingModule : true,
						htmlmin : {
							collapseWhitespace : true,
							collapseInlineTagWhitespace: true,
							removeComments : true
						},
						rename : function(moduleName) {
							return '/tpls/' + moduleName.replace('.html', '');
						}
					},
					main : {
						src : [ '<%= vars.src %>/html/**/*.html' ],
						dest : '<%= vars.tmp %>/templates/templates.module.js'
					}
				},
			});

	grunt.registerTask('build', [ 'clean', 'html2js', 'ngAnnotate', 'uglify',
			'less_imports', 'less', 'clean:tmp' ]);

	grunt.registerTask('default', [ 'build' ]);
};