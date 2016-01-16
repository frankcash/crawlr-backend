module.exports = function(app, passport) {
    app.route('/crawls')
        .get()
        .put()
        .post();

    app.route('/crawls/:crawlID')
        .get();

    app.route('/bars/:barID')
        .get();

    app.route('/signup')
        .post();
    
    app.route('/signin')
        .post();
};
