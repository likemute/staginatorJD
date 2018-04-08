module.exports = {
    images: async function (req, res) {
        let images = await req._sails.docker.listImages();
        return res.json({"result": true, "images": images});
    },

    containers: async function (req, res) {
        let containers = await req._sails.docker.listContainers();
        return res.json({"result": true, "containers": containers});
    }
};