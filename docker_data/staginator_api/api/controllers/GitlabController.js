import Gitlab from 'node-gitlab-api';

module.exports = {
    projects: function (req, res) {
        const apiClient = new Gitlab({
            url:   sails.config.gitlab.host,
            oauthToken: req.session.user.accessToken
        });

        //let apiClient = await req._sails.getGitlabApiClient(req.session.user.accessToken);
        apiClient.projects.all().then(function (projects) {
            return res.json({"result": true, "projects": projects});
        });
    }
};