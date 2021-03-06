var shell = require('shelljs')

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt)

  grunt.initConfig({
    standard: {
      options: { format: false },
      all: {
        src: ['gruntfile.js', 'src/**/*.js']
      }
    },
    browserify: {
      dist: { src: 'index.js', dest: 'plugin.js' }
    },
    uglify: {
      dist: {
        files: {
          'plugin.min.js': ['plugin.js']
        }
      }
    },
    bump: {
      options: {
        files: ['package.json', 'bower.json'],
        updateConfigs: [],
        commit: true,
        commitMessage: 'Release v%VERSION%',
        commitFiles: ['package.json', 'bower.json'],
        createTag: true,
        tagName: 'v%VERSION%',
        tagMessage: 'Version %VERSION%',
        push: true,
        pushTo: 'upstream',
        gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
        globalReplace: false,
        prereleaseName: false,
        regExp: false
      }
    }
  })

  grunt.registerTask('jsdoc', function () {
    shell.exec('rm -rf jsdoc && npm run jsdoc')
  })

  grunt.registerTask('build', ['standard', 'browserify', 'uglify'])
  grunt.registerTask('default', ['build'])
}
