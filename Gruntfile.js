module.exports = function(grunt) {
  // Do grunt-related things in here
    
 grunt.initConfig({
  sass: {                              // Task
    dist: { 
      files: {
        'css/style/style.css' :'css/sass/style.scss'
      }
    }
  }
});

grunt.loadNpmTasks('grunt-contrib-sass');

grunt.registerTask('default', ['sass']);
    
};