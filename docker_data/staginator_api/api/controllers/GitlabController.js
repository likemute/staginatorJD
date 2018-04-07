module.exports = {
    projects: async function (req, res) {
        let gitLabProjects = await req._sails.gitlab.projects(req.user.accessToken);

        let projects = await gitLabProjects.Projects.all();

        return res.json({"result": true, "projects": projects});
    }
};