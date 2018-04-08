const url = require("url");
const uuid = require("uuid");
const lodash = require("lodash");

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
        let kind = req.param('object_kind', null);
        let projectToken = req.headers["X-Gitlab-Token"];
        if (!projectToken) {
            return res.WrongPayload();
        }
        let project = await req._sails.models.project.findOne({'hookSecret' : projectToken});
        if (!project) {
            return res.EntityNotFound();
        }

        switch (kind) {
            case "push":
                let ref = req.param('ref', '');
                if (req.param('after', '') === '0000000000000000000000000000000000000000') {
                    let images = await req._sails.docker.listImages();
                    let containers = await req._sails.docker.listContainers();

                    await req._sails.staginator.removeContainers(project, ref);
                    await req._sails.staginator.removeImages(project, ref);
                    // remove stagings
                } else {
                    await req._sails.staginator.removeContainers(project, ref);
                    await req._sails.staginator.removeImages(project, ref);
                    // remove stagings
                    // create staging
                }
                break;
            case "build":
                break;
        }
    }
};