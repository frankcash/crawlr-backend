var Bar = require('../models/bar');
var Crawl = require('../models/crawl');

module.exports = function(app, passport) {
    app.route('/crawls')
        .get((req, res)=>{
           const getAll = req.query.all;
        })
        .put((req, res)=>{

        })
        .post((req, res)=>{

        });

    app.route('/crawls/:crawlID')
        .get((req, res)=>{
          const crawlID = req.params.crawlID;
        });

    app.route('/bars/:barID')
        .get((req, res)=>{

        });

    app.route('/signup')
        .post((req, res)=>{

        });

    app.route('/signin')
        .post((req, res)=>{

        });
};
