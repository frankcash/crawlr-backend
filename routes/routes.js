'use strict';

let Bar = require('../models/bar');
let Crawl = require('../models/crawl');
let User = require('../models/user');

module.exports = function(app, passport) {
    app.route('/crawls')
        .get((req, res) => {
            Crawl.find({})
                .populate('firstBar')
                .populate('creator', 'username')
                .exec((err, crawls) => {
                    if (err) res.sendStatus(400);
                    else res.status(200).json(crawls);
                });
        })
        .post((req, res) => {
            console.log(req.body);
            var crawl = new Crawl(req.body);
            crawl.created = new Date();
            crawl.save((err, crawl) => {
                if (err) res.sendStatus(400);
                else res.status(200).json(crawl);
            });
        });

    app.route('/crawls/:crawlID')
        .get((req, res) => {
            const crawlID = req.params.crawlID;
            Crawl.findOne({_id: crawlID})
                .populate('bars')
                .populate('creator', 'username')
                .populate('firstBar')
                .exec((err, crawl) => {
                    if (err) res.sendStatus(400);
                    else res.status(200).json(crawl);
                });
        })
        .put();

    app.route('/bars')
        .post((req, res) => {
            Bar.collection.insert(req.body, function(err, docs){
              if (err) {
                  return(res.sendStatus(400));
              } else {
                  // console.info('data were successfully stored.', docs.length);
                  return res.status(200).json(docs.insertedIds);
              }
            })
        });

    app.route('/bars/:barID')
        .get((req, res) => {
            const barID = req.params.barID;
            Bar.find({
                _id: barID
            }, (err, bar) => {
                if (err) res.sendStatus(400);
                else res.status(200).json(bar);
            });
        })
        .put();


    app.route('/signup')
        .post((req, res) => {
            var user = new User(req.body);
            user.provider = "local";
            user.save((err, user) => {
                if (err) res.sendStatus(400);
                else {
                    // Remove sensitive data before login
                    user.password = undefined;
                    user.salt = undefined;

                    req.login(user, (err) => {
                        if (err)
                            res.status(400).send(err);
                        else
                            res.json(user);
                    });
                }
            });
        });
    app.route('/signin')
        .post((req, res, next) => {
            passport.authenticate('local', (err, user, info) => {
                if (err || !user) {
                    res.status(400).send(info);
                } else {
                    // Remove sensitive data before login
                    user.password = undefined;
                    user.salt = undefined;

                    req.login(user, (err) => {
                        if (err)
                            res.status(400).send(err);
                        else
                            res.json(user);
                    });
                }
            })(req, res, next);
        });
};
