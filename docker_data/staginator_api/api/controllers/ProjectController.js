const lodash = require("lodash");
const url = require("url");
const uuid = require("uuid");

module.exports = {
    create: async function (req, res) {
        let name = req.param('name', null);
        if (name == null) {
            return res.WrongPayload();
        }

        let repositoryPath = req.param('repository', '');
        let useDockerCompose = req.param('dockerCompose', false);
        let preRunScript = req.param('preRunScript', '');
        let postRunScript = req.param('postRunScript', '');

        let existingModel = await req._sails.models.project.findOne({"name" : name});

        if (existingModel) {
            return res.EntityAlreadyExist();
        }

        let apiClient = await req._sails.gitlab.projects(req.user.accessToken);
        let gitlabProjects = await apiClient.Projects.all();
        let gitlabProject = lodash.find(gitlabProjects, {'name' : name});
        if (!gitlabProject) {
            return res.WrongPayload();
        }

        let hookSecret = uuid.v4();

        let createdProject = await req._sails.models.project.create({
            name: gitlabProject.name,
            gitlabId: gitlabProject.id,
            repositoryPath: repositoryPath,
            preRunScript: preRunScript,
            useDockerCompose: useDockerCompose,
            postRunScript: postRunScript,
            hookSecret: hookSecret
        }).fetch();

        let returnData = await apiClient.ProjectHooks.add(gitlabProject.id, url.resolve(req._sails.config.http.url, "project/hook"), {
            push_events: true,
            pipeline_events: true,
            token: hookSecret,
            enable_ssl_verification: false
        });

        if (returnData.id) {
            await req._sails.models.project.update(createdProject.id, {hookId: returnData.id});
        }

        return res.json({"result": true, "project": createdProject});
    },
    
    list: async function (req, res) {
        return res.json({"result": true, "projects": await req._sails.models.project.find()});
    },
    
    delete: function (req, res) {
        return res.json({"result": true});
    },

    update: async function (req, res) {
        let id = req.param('id', null);
        let name = req.param('name', null);
        let repositoryPath = req.param('repository', null);
        let useDockerCompose = req.param('dockerCompose', null);
        let preRunScript = req.param('preRunScript', null);
        let postRunScript = req.param('postRunScript', null);
        let updateData = {};
        if (name !== null) {
            updateData.name = name;
        }
        if (repositoryPath !== null) {
            updateData.repositoryPath = repositoryPath;
        }
        if (useDockerCompose !== null) {
            updateData.useDockerCompose = useDockerCompose;
        }
        if (preRunScript !== null) {
            updateData.preRunScript = preRunScript;
        }
        if (postRunScript !== null) {
            updateData.postRunScript = postRunScript;
        }
        let updatedProject = await req._sails.models.project.update(id, updateData);
        return res.json({"result": true, "project": updatedProject});
    },

    get: async function (req, res) {
        let project = await req._sails.models.project.findOne(req.param("id"));
        if (project) {
            return res.json({"result": true, "project": project});
        } else {
            return res.EntityNotFound();
        }
    }
};