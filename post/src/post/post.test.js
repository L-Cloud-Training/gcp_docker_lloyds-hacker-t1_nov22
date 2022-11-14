/* global jest */
const PostController = require('./post.controller')
const expressMock = require('@jest-mock/express')
var typeorm = require("typeorm"); 
var EntitySchema = typeorm.EntitySchema; 

beforeEach(async () => {
    return await typeorm.createConnection({
        type: "sqlite",
        database: ":memory:",
        dropSchema: true,
        entities: [ new EntitySchema(require("../entity/post.json")) ],
        synchronize: true,
        logging: false
    });  
});

afterEach(async() => {
    let conn = typeorm.getConnection();
    return conn.close();
});

test('We are testing the test...', async () => {    
    let postController = PostController();
    const req = expressMock.getMockReq();
    const { res, next, mockClear } = expressMock.getMockRes()
    await postController.test4Test(req, res);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({ "test": "test" });
});

test('Should create a new post ', async () => {

    let postController = PostController();

    const post = {
        id: 1,
        charityId: 1,
        charityName: 'Neki charity',
        mediaId: 1,
        userId: 1,
        userName: 'Marko Maric',
        description: 'blablabla',
        funds: 34.2
    }

    const req = expressMock.getMockReq({ body: post });
    const { res, next, mockClear } = expressMock.getMockRes()

    await postController.createPost(req, res);
    
    const conn = typeorm.getConnection();
    const outPost = await conn.getRepository("Post").find();
    expect(res.status).toBeCalledWith(200);
    expect(outPost.length).toBe(1);
    expect(res.json).toBeCalledWith({
        id: 1,
        charityId: 1,
        charityName: 'Neki charity',
        mediaId: 1,
        userId: 1,
        userName: 'Marko Maric',
        description: 'blablabla',
        funds: 34.2
    });    
});

test('Should update a specific post', async () => {
    let postController = PostController();

    const posts = [
        {
            id: 1,
            charityId: 1,
            charityName: 'One charity',
            mediaId: 1,
            userId: 1,
            userName: 'Marko Maric',
            description: 'blablabla',
            funds: 5764.2
        },
        {
            id: 2,
            charityId: 2,
            charityName: 'Some Charity',
            mediaId: 2,
            userId: 2,
            userName: 'Pero Peric',
            description: 'Some description',
            funds: 34.2
        }
    ];

    // prepare the reality in the database
    const conn = typeorm.getConnection();
    postRepo = await conn.getRepository("Post")
    result = await postRepo.create(posts);
    await postRepo.save(result);

    outPosts = await conn.getRepository("Post").find();
    console.log(outPosts);

    const postToUpdate = {
        charityName: 'S C',
        userName: 'P P',
        description: 'S d',
        funds: 345.5
    }

    const postToCheck = {
        id: 2,
        charityId: 2,
        charityName: 'S C',
        mediaId: 2,
        userId: 2,
        userName: 'P P',
        description: 'S d',
        funds: 345.5
    }
    // prepare the mock request and response
    const req = expressMock.getMockReq({ params: { id: 2 }, body: postToUpdate });
    const { res, next, mockClear } = expressMock.getMockRes()

    await postController.updatePost(req, res);
    
    expect(res.status).toBeCalledWith(200);
    
    outPosts = await conn.getRepository("Post").find();
    expect(outPosts.length).toBe(2);
    expect(outPosts[0]).toStrictEqual(posts[0]);
    expect(outPosts[1]).toStrictEqual(postToCheck);
});

test('Should delete a specific post', async () => {
    let postController = PostController();

    const posts = [
        {
            id: 1,
            charityId: 1,
            charityName: 'One charity',
            mediaId: 1,
            userId: 1,
            userName: 'Marko Maric',
            description: 'blablabla',
            funds: 5764.2,
            mediaUrl: "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
        },
        {
            id: 2,
            charityId: 2,
            charityName: 'Some Charity',
            mediaId: 2,
            userId: 2,
            userName: 'Pero Peric',
            description: 'Some description',
            funds: 34.2,
            mediaUrl: "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
        }
    ];

    // prepare the reality in the database
    const conn = typeorm.getConnection();
    postRepo = await conn.getRepository("Post")
    result = await postRepo.create(posts);
    await postRepo.save(result);

    // prepare the mock request and response
    const req = expressMock.getMockReq({ params: { id: 2 } });
    const { res, next, mockClear } = expressMock.getMockRes()

    await postController.deletePost(req, res);
    
    expect(res.status).toBeCalledWith(200);

    outPost = await conn.getRepository("Post").find({ id: 2 });
    expect(outPost.length).toBe(0);

    outPost = await conn.getRepository("Post").find({ id: 1 });
    expect(outPost.length).toBe(1);
    
    outPost[0].mediaUrl = "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg";
    expect(outPost[0]).toStrictEqual(posts[0]);
});