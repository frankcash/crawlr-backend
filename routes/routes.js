'use strict';
let Bar = require('../models/bar');
let Crawl = require('../models/crawl');

module.exports = function(app, passport) {
    app.route('/crawls')
        .get((req, res) => {
            const getAll = req.query.all;
        })
        .put((req, res) => {

        })
        .post((req, res) => {
            let crawl = new Crawl(req.body);
            crawl.save((err, crawl) => {
                if (err) res.sendStatus(500);
                else res.status(200).json(crawl);
            });
        });

    app.route('/crawls/:crawlID')
        .get((req, res) => {
            const crawlID = req.params.crawlID;
        });

    app.route('/bars/:barID')
        .get((req, res) => {

        });

    app.route('/signup')
        .post((req, res) => {

        });

    app.route('/signin')
        .post((req, res) => {

        });
};
