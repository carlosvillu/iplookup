var pkg = require('./package.json');

module.exports = function (grunt) {

  /**
   * Initialize config.
   */

  grunt.initConfig({
    shipit: {
      options: {
        // Project will be build in this directory.
        workspace: '/tmp/' + pkg.name,

        // Project will be deployed in this directory.
        deployTo: '/home/carlosvillu/proyectos/' + pkg.name,

        // Repository url.
        repositoryUrl: pkg.repository.url,

        // This files will not be transfered.
        ignores: ['.git', 'node_modules'],

        // Number of release to keep (for rollback).
        keepReleases: 3
      },

    // Staging environment.
      staging: {
        servers: ['carlosvillu@92.222.40.10']

      }
    }
  });

  /**
   * Load shipit task.
   */

  grunt.loadNpmTasks('grunt-shipit');

  grunt.registerTask('start', function () {
    var done = this.async();
    var current = grunt.config('shipit.options.deployTo') + '/current';
    grunt.shipit.remote('source /home/carlosvillu/.nvm/nvm.sh && cd ' + current + ' && npm install && pm2 start . --name ' + pkg.name, done);
  });

  grunt.registerTask('restart', function () {
    var done = this.async();
    var current = grunt.config('shipit.options.deployTo') + '/current';
    grunt.shipit.remote('source /home/carlosvillu/.nvm/nvm.sh && cd ' + current + ' && npm install && pm2 restart ' + pkg.name, done);
  });

  grunt.registerTask('stop', function () {
    var done = this.async();
    var current = grunt.config('shipit.options.deployTo') + '/current';
    grunt.shipit.remote('source /home/carlosvillu/.nvm/nvm.sh && cd ' + current + ' && npm install && pm2 delete ' + pkg.name, done);
  });

  grunt.shipit.on('published', function () {
    grunt.task.run(['restart']);
  });

};
