module.exports = function (grunt) {

    grunt.initConfig({

        // *************************************************************************************
        //      CONFIG OPTIONS
        // *************************************************************************************

        pkg: grunt.file.readJSON('package.json'),

        banner :  '/*   <%= pkg.name  %> v<%= pkg.version %>   */\n' +
            '/*   <%= pkg.copyright %>   */\n' +
            '/*   https://github.com/evoluteur/evolutility   */\n',

        bannerDependencies: '/*\n <%= pkg.name %> v<%= pkg.version %> dependencies: \n' +
           ' bootstrap 3.3.4, jquery 2.1.4, backbone 1.1.2, backbone.localStorage v1.1.7, underscore 1.8.3, d3 3.5.5, bootstrap-datepicker" 1.4.0, select2 3.5.2.   */\n',

        // *************************************************************************************
        //      CONCAT
        // *************************************************************************************
        concat: {
            dependencies:{
                options: {
                    banner: '<%= bannerDependencies %>',
                    separator: ';\n'
                },
                src: [

                    // D3.js
                    'bower_components/d3/d3.js',
                    // jQuery & jQuery UI
                    'bower_components/jquery/dist/jquery.js',
                    //'bower_components/jquery-ui/ui/jquery.ui.widget.js',
                    //'bower_components/jquery.csv.js',

                    // Backbone & Underscore
                    'bower_components/underscore/underscore.js',
                    //'bower_components/underscore.string/lib/underscore.string.js',
                    'bower_components/backbone/backbone.js',
                    'bower_components/backbone.localStorage/backbone.localStorage.js',

                    // Twitter Bootstrap
                    'bower_components/bootstrap/js/modal.js',
                    'bower_components/bootstrap/js/button.js',
                    'bower_components/bootstrap/js/dropdown.js',
                    'bower_components/bootstrap/js/tooltip.js',
                    'bower_components/bootstrap/js/popover.js',
                    //'bower_components/bootstrap/js/carousel.js',

                    // Widgets
                    'bower_components/bootstrap-datepicker/js/bootstrap-datepicker.js',
                    'bower_components/select2/select2.js'
                ],
                dest: '<%= pkg.target %>/dependencies.js'
            },
            js:{
                options: {
                    banner: '<%= banner %>',
                    separator: ';\n'
                },
                src: [
                    'js/dico/ui.js',
                    'js/dico/ui-*.js',
                    'js/i18n/EN.js',
                    'js/dico/dico.js',
                    'js/dico/d3-*.js',

                    'js/view-many/many.js',
                    'js/view-many/many-*.js',
                    'js/view-one/one.js',
                    'js/view-one/one-*.js',
                    '!js/view-one/one-wizard.js', // NOT ! here

                    //'js/view-action/action.js',
                    'js/view-action/action-*.js',

                    //'js/navbar.js',
                    'js/dico/toolbar.js',
                    'js/dico/app.js'
                    //'js/ui-models/dico/field.js',
                    //'js/ui-models/dico/field-popup.js',
                    //'js/ui-models/dico/panel.js'
                ],
                dest: '<%= pkg.target %>/evolutility.js'
            },
            demo:{
                options: {
                    banner: '<%= banner %>',
                    separator: ';\n'
                    },
                src: [
                    //"demo/demo.js",
                    //"js/ui-models/apps/todo.js",
                    "js/ui-models/apps/todo.data.js",
                    //"js/ui-models/apps/contacts.js",
                    "js/ui-models/apps/contacts.data.js",
                    //"js/ui-models/apps/winecellar.js",
                    "js/ui-models/apps/winecellar.data.js",
                    //"js/ui-models/apps/comics.js",
                    "js/ui-models/apps/comics.data.js"
                ],
                dest: 'demo/demo-data.js'
            }
        },

        // *************************************************************************************
        //      COPY
        // *************************************************************************************
        copy: {
          main: {
            files: [
              {expand: true, flatten: true, src: ['bower_components/bootstrap/dist/fonts/*'], dest: '<%= pkg.target %>/fonts/'}
            ]
          }
        },

        // *************************************************************************************
        //      JSHINT
        // *************************************************************************************
        jshint: {
            dev: [

                // --- tools ---
                'Gruntfile.js',
                'package.json',

                // --- dist ---
                'js/ui*.js',
                'js/i18n/EN.js',

                'js/many*.js',
                'js/one*.js',
                'js/action-*.js',

                //'js/navbar.js',
                'js/toolbar.js',

                'js/ui-models/dico/*.js',

                // --- ui models ---
                'js/ui-models/apps/*.js',
                'js/ui-models/test/*.js',

                // --- testing stuff ---
                '!*-nogit.js'

            ]
        },

        // *************************************************************************************
        //      UGLIFY
        // *************************************************************************************
        uglify: {
            prod: {
                options: {
                    banner: '<%= banner %>',
                    mangle: true
                },
                files: [
                    {
                        src: '<%= pkg.target %>/evolutility.js',
                        dest: '<%= pkg.target %>/evolutility.min.js'
                    }
                ]
            },
            demo: {
                options: {
                    banner: '/* <%= pkg.name %> v<%= pkg.version %> sample UI-models and data: todo, addressbook, wine cellar. */\n ',
                    mangle: true
                },
                files: [
                    {
                        src: 'demo/demo-data.js',
                        dest: 'demo/demo-data.min.js'
                    }
                ]
            },
            dependencies: {
                options: {
                    banner: '<%= bannerDependencies %>',
                    mangle: true
                },
                files: [
                    {
                        src: '<%= pkg.target %>/dependencies.js',
                        dest: '<%= pkg.target %>/dependencies.min.js'
                    }
                ]
            }
        },

        // *************************************************************************************
        //      LESS
        // *************************************************************************************
        less: {
            dev: {
                files: {
                    "dist/css/evolutility.css": "less/evol.less"
                }
            },
            demo: {
                files: {
                    "dist/css/demo.css": "less/demo.less"
                }
            },
            prod: {
                options: {
                    compress: true
                },
                files: {
                    "dist/css/dependencies.min.css": "less/dependencies.less",
                    "dist/css/evolutility.min.css": "less/evol.less"
                }
            }
        }

    });


    // *************************************************************************************
    //      GRUNT PLUGIN : tasks
    // *************************************************************************************
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');


    // *************************************************************************************
    //      BUILD TASKS : dev prod
    // *************************************************************************************
    // Default task(s).
    grunt.registerTask('default', ['dev']);

    // Dev task(s).
    grunt.registerTask('dev', ['concat:js', 'less:dev', 'less:demo']);

    // Prod task(s).
    grunt.registerTask('prod', ['jshint', 'copy', 'dev', 'concat:demo', 'concat:dependencies', 'less:prod', 'uglify']);

};

