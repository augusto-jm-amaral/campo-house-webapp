module.exports = function (app) {
  app.listen(app.get('port'), () => {
    console.log('CampusHouse Online - porta ' + app.get('port'));
  });
};
