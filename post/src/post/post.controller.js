var typeorm = require("typeorm");
var EntitySchema = typeorm.EntitySchema;
const request = require('request-promise');

function PostController () {
    
    const test4Test = async (req, res, next) => {
        // console.log(connection);
        return res.status(200).json({ "test": "test" });
    }

    const createPost = async (req, res) => {
        try {
            conn = typeorm.getConnection();
            postRepo = await conn.getRepository("Post");
            result = await postRepo.create(req.body);
            //TBD: create orchestrator service to: get userId (create user service?) from User logged in, get mediaId from Media service, get CharityId
            post = await postRepo.save(result);
            return res.status(200).json(post);
        } catch (error) {
            return res.status(500).json({ "error": error.message });
        }
    }

    const getAllPosts = async (req, res) => {
        
        try {
            conn = typeorm.getConnection();
            postRepo = await conn.getRepository("Post");
            posts = await postRepo.find();
            
            requesturl = process.env.MEDIA_SERVICE_URL + '/media/';

            for(var i = 0; i<posts.length; i++)
            {
                var options = {
                    uri: requesturl + posts[i].mediaId,
                    method: "GET",
                    json: true
                };
                
                var result = await request(options);

                if (result.length > 0) {
                    console.log(result[0].url);
                    posts[i].mediaUrl = result[0].url;
                }
            }

            return await res.status(200).json(posts);
        } catch (error) {
            return res.status(500).json({ "error": error.message });
        }
    }

    // const getPostById = async (req, res) => {

    //     const { id } = req.params;

    //     try {
    //         conn = typeorm.getConnection();
    //         postRepo = await conn.getRepository("Post");
    //         post = await postRepo.find({ id: parseInt(id) });
    //         return res.status(200).json(post);
    //     } catch (error) {
    //         return res.status(500).json({ "error": error.message });
    //     }
    // }

    // const getCharityFundsById = async (req, res) => {

    //     const { id } = req.params;

    //     try {
    //         conn = typeorm.getConnection();
    //         charityRepo = await conn.getRepository("Charity");
    //         //charityfunds = await charityRepo.find({ where : { id: parseInt(id)}, select : ['funds'] });
    //         charityfunds = await charityRepo.createQueryBuilder("charity").select(['charity.funds']).getOne();
    //         //return res.status(200).result(charityfunds)
    //         return res.status(200).json(charityfunds);
    //     } catch (error) {
    //         return res.status(500).json({ "error": error.message });
    //     }
    // }

    const updatePost = async (req, res) => {
        
        const { id } = req.params;

        try {
            conn = typeorm.getConnection();
            postRepo = await conn.getRepository("Post");
            post = await postRepo.update(parseInt(id), req.body);
            return res.status(200).json(post);
        } catch (error) {
            return res.status(500).json({ "error": error.message });
        }
    }

    const updatePostFunds = async (req, res) => {
        
        const { id } = req.params;
        console.log(req.body.funds, id);

        try {
            conn = typeorm.getConnection();
            postRepo = await conn.getRepository("Post");
            updateFunds = postRepo.createQueryBuilder().update("Post").set({funds : parseFloat(req.body.funds)}).where("id = :id", {id: parseInt(id)}).execute();
            updatedPost = await postRepo.find({ id: parseInt(id) });
            return res.status(200).json(updatedPost);
            //TBD: update charity funds as well
        } catch (error) {
            return res.status(500).json({ "error": error.message });
        }
    }

    const deletePost = async (req, res) => {
        const { id } = req.params;

        try {
            conn = typeorm.getConnection();
            postRepo = await conn.getRepository("Post");
            post = await postRepo.delete(parseInt(id));
            return res.status(200).json(post);
        } catch (error) {
            return res.status(500).json({ "error": error.message });
        }
    }

    return {
        test4Test,
        createPost,
        getAllPosts,
        updatePost,
        updatePostFunds,
        deletePost,
        //getPostById
    };
}

module.exports = PostController;