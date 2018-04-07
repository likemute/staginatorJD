const url = require("url");
const uuid = require("uuid");

module.exports = {
    create: async function (req, res) {
        let projectId = req.param('id', null);
        if (!projectId) {
            return res.WrongPayload();
        }
        let project = await req._sails.models.project.findOne(projectId);
        if (!project) {
            return res.EntityNotFound();
        }

        let hookSecret = uuid.v4();

        let apiClient = await req._sails.gitlab.projects(req.user.accessToken);
        let returnData = await apiClient.ProjectHooks.add(project.gitlabId, url.resolve(req._sails.config.http.url, "project/hook"), {
            push_events: true,
            pipeline_events: true,
            token: hookSecret,
            enable_ssl_verification: false
        });

        if (returnData.id) {
            await req._sails.models.project.update(project.id, {hookId: returnData.id, hookSecret: hookSecret});
        }

        return res.Success();
    },

    remove: async function (req, res) {
        let projectId = req.param('id', null);
        if (!projectId) {
            return res.WrongPayload();
        }
        let project = await req._sails.models.project.findOne(projectId);
        if (!project) {
            return res.EntityNotFound();
        }
        if (project.hookId !== 0) {
            let apiClient = await req._sails.gitlab.projects(req.user.accessToken);
            await apiClient.ProjectHooks.remove(project.gitlabId, project.hookId);
        }

        await req._sails.models.project.update(project.id, {hookId: 0, hookSecret: ''});

        return res.Success();
    },

    check: async function (req, res) {
        let projectId = req.param('id', null);
        if (!projectId) {
            return res.WrongPayload();
        }
        let project = await req._sails.models.project.findOne(projectId);
        if (!project) {
            return res.EntityNotFound();
        }

        if (project.hookId !== 0) {
            let apiClient = await req._sails.gitlab.projects(req.user.accessToken);
            try {
                let data = await apiClient.ProjectHooks.show(project.gitlabId, project.hookId);
                return res.Success(data);
            } catch (e) {
                return res.NotFound();
            }
        } else {
            return res.NotFound();
        }

    },

    run: async function (req, res) {

    }
};