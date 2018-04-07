
module.exports = function (sails){
    return {
        projectsWithoutStagings: async function (token) {
            let apiClient = await req._sails.getGitlabApiClient(token);

            let projects = await apiClient.projects.all();
        }
    }

};