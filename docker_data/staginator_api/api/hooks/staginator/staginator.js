const lodash = require("lodash");

module.exports = function (sails){
    return {
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