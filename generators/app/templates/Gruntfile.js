/* jshint indent:false */

module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        displayName: '<%= pkg.name %>',
        namespace: '<%= pkg.name.toLowerCase() %>',
        root: '../../../',

        // Paths
        app: {
            less: 'resources/less/*.less',
            js: [
                  'resources/js/namespaces.js',
                  'resources/js/kissMetrics.js',
                  'temp/<%= namespace %>-templates.js',
                  'resources/js/routers/*.js',
                  'resources/js/models/*.js',
                  'resources/js/collections/*.js',
                  'resources/js/views/*.js',
                  'resources/js/app.js'
            ],
            hbs:  'resources/js/templates/*.hbs',
            cache_version_file: 'resources/cache_version',
            test: '<%= root %>tests/application/modules/<%= namespace %>/*.spec.js'
        },
        temp: {
            // These are generated files. Make sure they exist before using these paths as sources
            app: {
                less:      'temp/<%= namespace %>.less',
                js:        'temp/<%= namespace %>.js',
                templates: 'temp/<%= namespace %>-templates.js'
            }
        },
        assets: {
            // These are generated files. Make sure they exist before using these paths as sources
            app: {
                css: '<%= root %>portal/assets/<%= namespace %>/css/<%= namespace %>.css',
                js:  '<%= root %>portal/assets/<%= namespace %>/js/<%= namespace %>.js'
            }
        },

        // Compile LESS files to CSS
        less: {
            dev: {
                files: {
                    '<%= assets.app.css %>':    '<%= temp.app.less %>'
                }
            },
            prod: {
                options: {
                    'compress': true
                },
                files: {
                    '<%= assets.app.css %>':    '<%= temp.app.less %>'
                }
            }
        },
        // Compile Handlebars templates to JS
        handlebars: {
            app: {
                options: {
                    namespace: "Ibp.<%= displayName %>.Templates",
                    processName: function(filename) {
                        var path = filename.split("/");
                        var file = path[path.length-1];
                        return file.split(".")[0];
                    }
                },
                files: {
                    '<%= temp.app.templates %>':    '<%= app.hbs %>'
                }
            }
        },
        // Concatinate files
        concat: {
            options: {
                separator: ';'
            },
            dev: {
                files: {
                    '<%= assets.app.js %>':    '<%= app.js %>'
                }
            },
            prod: {
                files: {
                    '<%= temp.app.js %>':      '<%= app.js %>'
                }
            },
            less: {
                files: {
                    '<%= temp.app.less %>':    [ '<%= app.less %>' ]
                }
            }
        },
        // Minify and optimize JS
        closurecompiler: {
            prod: {
                options: {
                    'compilation_level': 'SIMPLE_OPTIMIZATIONS'
                },
                files: {
                    '<%= assets.app.js %>':    '<%= temp.app.js %>'
                }
            }
        },
        // Watch files for change and run grunt tasks
        watch: {
            styles: {
                files: [
                    '<%= app.less %>'
                ],
                tasks: ['concat:less', 'less', 'clean', 'notify:build']
            },
            javascript: {
                // and Handlebars templates, since they get compiled to JS
                files: [
                    '<%= app.js %>',
                    '<%= app.hbs %>',
                    '<%= app.test %>'
                ],
                tasks: ['handlebars', 'concat:dev', 'clean', 'notify:build']
            }
        },
        // Remove temp files
        clean: {
            build: {
                src: [
                    'temp/'
                ]
            }
        },
        // Reset assets in git
        shell: {
            reset: {
                command: [
                    'git checkout -- <%= root %>portal/assets/<%= namespace %>/css/<%= namespace %>.css',
                    'git checkout -- <%= root %>portal/assets/<%= namespace %>/js/<%= namespace %>.js',
                    'git checkout -- <%= root %>bin/composer.phar'
                ].join('&&')
            }
        },
        // Automate cache busting for prod
        'string-replace': {
            prod: {
                options: {
                    replacements: [{
                        pattern: /\d+/g,
                        replacement: '<%= new Date().getTime() %>'
                    }]
                },
                files: {
                    '<%= app.cache_version_file %>': '<%= app.cache_version_file %>'
                }
            }
        },
        // Notify on grunt task success or fail
        notify: {
            build: {
                options: {
                    title: '<%= displayName %>',
                    message: 'Build finished with no errors.'
                }
            }
        },
        notify_hooks: {
            options: {
                enabled: true,
                title: '<%= displayName %>'
            }
        }
    });


    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    // init notifications
    grunt.task.run('notify_hooks');


    // Default task
    grunt.registerTask('default', ['concat:less', 'less:dev', 'handlebars', 'concat:dev', 'clean', 'notify:build']);

    // Development build
    // grunt.registerTask('dev', ['karma:unit:start', 'default', 'watch']);
    grunt.registerTask('dev', ['default', 'watch']);

    // Production build
    grunt.registerTask('prod', ['string-replace:prod', 'concat:less', 'less:prod', 'handlebars', 'concat:prod', 'closurecompiler', 'clean', 'notify:build']);

    // Clean up assets in git
    grunt.registerTask('reset', ['shell:reset']);
};
