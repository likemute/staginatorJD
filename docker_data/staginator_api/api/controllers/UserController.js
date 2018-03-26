module.exports = {

    login: function (req, res) {
        let options = {
            state: new Buffer(JSON.stringify({
                'successRedirect': req.param('successRedirect', null),
                'failRedirect': req.param('successRedirect', null)
            })).toString('base64')
        };
        req._sails.passport.authenticate('gitlab', options)(req, res, req.next);
    },

    logout: function (req, res) {
        req.logout();
        return res.json({"result": true})
    },

    account: function (req, res) {
        return res.json({"result": true, "user": req.user});
    },

    gitlabCallback: function (req, res) {
        req._sails.passport.authenticate('gitlab', {
            scope: ['api']
        }, function (err, user) {
            let state;
            try {
                state = JSON.parse(new Buffer(req.query.state, 'base64').toString('utf8'));
            } catch (e) {
                state = {
                    failRedirect: null,
                    successRedirect: null
                };
            }
            if (user) {
                req.login(user, function (err) {
                    if (err) {
                        if (state.failRedirect) {
                            return res.redirect(state.failRedirect);
                        } else {
                            return res.json({"result": false, "error": "Failed to login"});
                        }
                    }

                    if (state.successRedirect) {
                        return res.redirect(state.successRedirect);
                    } else {
                        return res.json({"result": true})
                    }
                });
            } else {
                if (state.failRedirect) {
                    return res.redirect(state.failRedirect);
                } else {
                    return res.json({"result": false, "error": "Failed to login"});
                }
            }
        })(req, res);
    }
};