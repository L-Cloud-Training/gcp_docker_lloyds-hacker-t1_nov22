var typeorm = require("typeorm"); 
var EntitySchema = typeorm.EntitySchema; 

function UserController () {

    const test4Test = async (req, res, next) => {
        // console.log(connection);
        return res.status(200).json({ "test": "test" });
    }

    const createUser = async (req, res) => {
        
        // user = await userRepo.save(req.body);
        // return res.status(200).json(user);

        try {
            conn = typeorm.getConnection();
            userRepo = await conn.getRepository("User");
            result = await userRepo.create(req.body);
            user = await userRepo.save(result);
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({ "error": error.message });
        }

    }

    const getAllUsers = async (req, res) => {
        
        try {
            conn = typeorm.getConnection();
            userRepo = await conn.getRepository("User");
            users = await userRepo.find();            
            return res.status(200).json(users);
        } catch (error) {
            return res.status(500).json({ "error": error.message });
        }

    }

    const getUserById = async (req, res) => {

        const { id } = req.params;

        try {
            conn = typeorm.getConnection();
            userRepo = await conn.getRepository("User");
            user = await userRepo.find({ id: parseInt(id) });
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({ "error": error.message });
        }
    }

    const updateUser = async (req, res) => {
        
        const { id } = req.params;

        try {
            conn = typeorm.getConnection();
            userRepo = await conn.getRepository("User");
            user = await userRepo.update(parseInt(id), req.body);
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({ "error": error.message });
        }
    }

    const deleteUser = async (req, res) => {
        const { id } = req.params;

        try {
            conn = typeorm.getConnection();
            userRepo = await conn.getRepository("User");
            user = await userRepo.delete(parseInt(id));
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({ "error": error.message });
        }
    }

    return {
        test4Test,
        createUser,
        getAllUsers,
        getUserById,
        updateUser,
        deleteUser
    };
}

module.exports = UserController;
// module.exports = {
//     createUser,
//     getAllUsers,
//     getUserById,
//     updateUser,
//     deleteUser
// }
