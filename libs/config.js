module.exports = function(app) {

  var config = {
    db: {
      url : 'mongodb://localhost/campushouse',
      debug : true,
      poolSize : 10
    },
    jwtSecret: '4PpR4NCH0',
    jwtSession: {session: false}
    // populateDb: true
  };

  return config;
};
