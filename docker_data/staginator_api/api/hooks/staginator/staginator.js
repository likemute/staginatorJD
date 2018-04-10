const lodash = require("lodash");
const exec = require("child_process").exec;

module.exports = function (sails){
    return {
        removeStaging: async function(stage) {
            let images = await req._sails.docker.listImages();
            let containers = await req._sails.docker.listContainers();
            let project = await sails.models.stage.find(stage.project);
            if (project.useDockerCompose) {
                let name = project.name+"_"+sails.stringHelper.prepare(stage.ref);
                const { stdout, stderr } = await exec("docker-compose -p '"+name+"' down --rmi 'all'", {cwd: stage.path, timeout: 5});
            } else {
                await sails.staginator.removeContainers(stage.project, stage.ref);
                await sails.staginator.removeImages(stage.project, stage.ref);
            }
            await sails.models.stage.destroy(stage.id);
            return true;
        },
        createStaging: async function(project, ref) {
            await sails.staginator.removeContainers(project, ref);
            await sails.staginator.removeImages(project, ref);
            let path = sails.config.stagings.path + "/" + project.name + "_" + sails.stringHelper.prepare(ref);
            //TODO
            if (project.useDockerCompose) {
                let name = project.name+"_"+sails.stringHelper.prepare(ref);
                const { stdout, stderr } = await exec("docker-compose -p '"+name+"' up -d", {cwd: stage.path, timeout: 5});
            } else {
                await sails.staginator.removeContainers(stage.project, stage.ref);
                await sails.staginator.removeImages(stage.project, stage.ref);
            }

            let instanceId;

            let stage = await sails.models.stage.create({project:project, ref: ref, instanceId: instanceId}).fetch();
            return stage;
        },

        removeContainers: async function(project, ref) {
            let containers = await sails.docker.listContainers();
            lodash.each(containers, async function (container) {
                if (container.Labels["staginatorJD_Project"] === project.id && container.Labels["staginatorJD_Branch"] === ref) {
                    let containerObject = req._sails.docker.getContainer(container.Id);
                    await containerObject.remove();
                }
            });
        },

        removeImages: async function(project, ref) {
            let images = await sails.docker.listImages();
            lodash.each(images, async function (image) {
                lodash.each(images, async function (image) {
                    if (image.Labels["staginatorJD_Project"] === project.id && image.Labels["staginatorJD_Branch"] === ref) {
                        let imageObject = req._sails.docker.getImage(image.Id);
                        await imageObject.remove();
                    }
                });

                if (!image.RepoTags || image.RepoTags.count === 0) {
                    return;
                }

                let repoName = image.RepoTags[0];

            });
        },

        projectsWithoutStagings: async function (token) {
            let apiClient = await req._sails.getGitlabApiClient(token);

            let projects = await apiClient.projects.all();
        }
    }

};