module.exports = {
    build: async function (req, res) {
        let stagingId = req.param('id', null);
        if (!stagingId) {
            return res.WrongPayload();
        }
        let stage = await req._sails.models.stage.findOne(stagingId).populate('project');
        if (!stage) {
            return res.EntityNotFound();
        }
        let project = stage.project;
        if (!project) {
            return res.GeneralError();
        }
        switch (project.deployType) {
            case "aws":
                await req._sails.aws.removeStaging(project, stage.ref);
                await req._sails.aws.createStaging(project, stage.ref);
                break;
            case "local":
                await req._sails.staginator.removeStaging(project, stage.ref);
                await req._sails.staginator.createStaging(project, stage.ref);
                break;
        }
    },

    stop: async function (req, res) {
        let stagingId = req.param('id', null);
        if (!stagingId) {
            return res.WrongPayload();
        }
        let stage = await req._sails.models.stage.findOne(stagingId).populate('project');
        if (!stage) {
            return res.EntityNotFound();
        }
        let project = stage.project;
        if (!project) {
            return res.GeneralError();
        }
        switch (project.deployType) {
            case "aws":
                await req._sails.aws.removeStaging(project, stage.ref);
                break;
            case "local":
                await req._sails.staginator.removeStaging(project, stage.ref);
                break;
        }
    },

    info: async function (req, res) {
        let stagingId = req.param('id', null);
        if (!stagingId) {
            return res.WrongPayload();
        }
        let stage = await req._sails.models.stage.findOne(stagingId).populate('project');
        if (!stage) {
            return res.EntityNotFound();
        }
        let project = stage.project;
        if (!project) {
            return res.GeneralError();
        }

        return res.json({"result": true, "stage": stage});
    }
};