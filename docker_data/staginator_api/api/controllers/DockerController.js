module.exports = {
    images: async function (req, res) {
        let images = await req._sails.docker.listImages();
        return res.json({"result": true, "images": images});
    }
};