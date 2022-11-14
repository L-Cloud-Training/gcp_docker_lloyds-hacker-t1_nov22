var typeorm = require("typeorm");
var EntitySchema = typeorm.EntitySchema;

function MediaController () {
    
    const test4Test = async (req, res, next) => {
        // console.log(connection);
        return res.status(200).json({ "test": "test" });
    }

    const createMedia = async (req, res) => {
        try {
            conn = typeorm.getConnection();
            mediaRepo = await conn.getRepository("Media");
            result = await mediaRepo.create(req.body);
            media = await mediaRepo.save(result);
            return res.status(200).json(media);
        } catch (error) {
            return res.status(500).json({ "error": error.message });
        }
    }

    const getMediaById = async (req, res) => {

        const { id } = req.params;

        try {
            conn = typeorm.getConnection();
            mediaRepo = await conn.getRepository("Media");
            media = await mediaRepo.find({ id: parseInt(id) });
            return res.status(200).json(media);
        } catch (error) {
            return res.status(500).json({ "error": error.message });
        }
    }


    const updateMedia = async (req, res) => {
        
        const { id } = req.params;

        try {
            conn = typeorm.getConnection();
            mediaRepo = await conn.getRepository("Media");
            media = await mediaRepo.update(parseInt(id), req.body);
            return res.status(200).json(media);
        } catch (error) {
            return res.status(500).json({ "error": error.message });
        }
    }

    const deleteMedia = async (req, res) => {
        const { id } = req.params;

        try {
            conn = typeorm.getConnection();
            mediaRepo = await conn.getRepository("Media");
            media = await mediaRepo.delete(parseInt(id));
            return res.status(200).json(media);
        } catch (error) {
            return res.status(500).json({ "error": error.message });
        }
    }

    return {
        createMedia,
        getMediaById,
        updateMedia,
        deleteMedia,
        test4Test
    };
}

module.exports = MediaController;