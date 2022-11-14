const MediaController = require('./media.controller')
const expressMock = require('@jest-mock/express')
var typeorm = require("typeorm"); 
var EntitySchema = typeorm.EntitySchema; 

beforeEach(async () => {
    return await typeorm.createConnection({
        type: "sqlite",
        database: ":memory:",
        dropSchema: true,
        entities: [ new EntitySchema(require("../entity/media.json")) ],
        synchronize: true,
        logging: false
    });    
});

afterEach(async() => {
    let conn = typeorm.getConnection();
    return conn.close();
});

test('We are testing the test...', async () => {    
    let mediaController = MediaController();
    const req = expressMock.getMockReq();
    const { res, next, mockClear } = expressMock.getMockRes()
    await mediaController.test4Test(req, res);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({ "test": "test" });
});

test('Should create a new media ', async () => {

    let mediaController = MediaController();

    const media = {
        id: 1,
        url: "www.somemedia.com"
    }

    const req = expressMock.getMockReq({ body: media });
    const { res, next, mockClear } = expressMock.getMockRes()

    await mediaController.createMedia(req, res);
    
    const conn = typeorm.getConnection();
    const outMedia = await conn.getRepository("Media").find();
    expect(res.status).toBeCalledWith(200);
    console.log(outMedia);
    expect(outMedia.length).toBe(1);
    expect(res.json).toBeCalledWith(media);    
});

test('Should return a specific media', async () => {
    let mediaController = MediaController();

    const media = [
        {
            id: 1,
            url: "www.somemedia.com"
        },
        {
            id: 2,
            url: "www.othermedia.com"
        }
    ];

    // prepare the reality in the database
    const conn = typeorm.getConnection();
    mediaRepo = await conn.getRepository("Media")
    result = await mediaRepo.create(media);
    await mediaRepo.save(result);
    
    const req = expressMock.getMockReq({ params: { id: 2 } });
    const { res, next, mockClear } = expressMock.getMockRes()

    await mediaController.getMediaById(req, res);
    
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith([media[1]]);    
});

test('Should update a specific media', async () => {
    let mediaController = MediaController();

    const media = [
        {
            id: 1,
            url: "www.somemedia.com"
        },
        {
            id: 2,
            url: "www.othermedia.com"
        }
    ];

    // prepare the reality in the database
    const conn = typeorm.getConnection();
    mediaRepo = await conn.getRepository("Media")
    result = await mediaRepo.create(media);
    await mediaRepo.save(result);

    const mediaToUpdate = {
        id: 2,
        url: "www.thirdmedia.com"
    }

    // prepare the mock request and response
    const req = expressMock.getMockReq({ params: { id: 2 }, body: mediaToUpdate });
    const { res, next, mockClear } = expressMock.getMockRes()

    await mediaController.updateMedia(req, res);

    expect(res.status).toBeCalledWith(200);
    
    outMedia = await conn.getRepository("Media").find({ id: 1 });
    expect(outMedia.length).toBe(1);
    expect(outMedia[0]).toStrictEqual(media[0]);

    outMedia = await conn.getRepository("Media").find({ id: 2 });
    expect(outMedia.length).toBe(1);
    expect(outMedia[0]).toStrictEqual(mediaToUpdate);
});

test('Should delete a specific media', async () => {
    let mediaController = MediaController();

    const media = [
        {
            id: 1,
            url: "www.somemedia.com"
        },
        {
            id: 2,
            url: "www.othermedia.com"
        }
    ];

    // prepare the reality in the database
    const conn = typeorm.getConnection();
    mediaRepo = await conn.getRepository("Media")
    result = await mediaRepo.create(media);
    await mediaRepo.save(result);

    // prepare the mock request and response
    const req = expressMock.getMockReq({ params: { id: 2 } });
    const { res, next, mockClear } = expressMock.getMockRes()

    await mediaController.deleteMedia(req, res);
    
    expect(res.status).toBeCalledWith(200);

    outMedia = await conn.getRepository("Media").find({ id: 2 });
    expect(outMedia.length).toBe(0);

    outMedia = await conn.getRepository("Media").find({ id: 1 });
    expect(outMedia.length).toBe(1);
    expect(outMedia[0]).toStrictEqual(media[0]);
});