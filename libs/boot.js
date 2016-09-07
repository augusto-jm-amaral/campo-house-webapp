module.exports = function(app) {
    app.listen(app.get('port'), () => {
        app.libs.populatedb.run();
        console.log('CampusHouse Online - porta ' + app.get('port'));
    });
};
