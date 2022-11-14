const CharityController = require('./charity.controller')
const expressMock = require('@jest-mock/express')
var typeorm = require("typeorm"); 
var EntitySchema = typeorm.EntitySchema; 

beforeEach(async () => {
    return await typeorm.createConnection({
        type: "sqlite",
        database: ":memory:",
        dropSchema: true,
        entities: [ new EntitySchema(require("../entity/charity.json")) ],
        synchronize: true,
        logging: false
    });    
});

afterEach(async() => {
    let conn = typeorm.getConnection();
    return conn.close();
});

test('We are testing the test...', async () => {    
    let charityController = CharityController();
    const req = expressMock.getMockReq();
    const { res, next, mockClear } = expressMock.getMockRes()
    await charityController.test4Test(req, res);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({ "test": "test" });
});

test('Should create a new charity ', async () => {

    let charityController = CharityController();

    const charity = {
        id: 1,
        name: 'Rich Charity',
        description: 'Rich rich charity helps everybody',
        createdByUser: 'Mark Rich',
        funds: 340000
    }

    const req = expressMock.getMockReq({ body: charity });
    const { res, next, mockClear } = expressMock.getMockRes()

    await charityController.createCharity(req, res);
    
    const conn = typeorm.getConnection();
    const outCharity = await conn.getRepository("Charity").find();
    expect(res.status).toBeCalledWith(200);
    console.log(outCharity);
    expect(outCharity.length).toBe(1);
    expect(res.json).toBeCalledWith(charity);    
});

test('Should list all charities', async () => {
    let charityController = CharityController();

    const charities = [
        {
            id: 1,
            name: 'Rich Charity',
            description: 'Rich rich charity helps everybody',
            createdByUser: 'Mark Rich',
            funds: 340000
        },
        {
            id: 2,
            name: 'Medium Rich Charity',
            description: 'Medium rich charity helps everybody',
            createdByUser: 'Mark Medium Rich',
            funds: 140000
        }
    ];

    // prepare the reality in the database
    const conn = typeorm.getConnection();
    charityRepo = await conn.getRepository("Charity")
    result = await charityRepo.create(charities);
    await charityRepo.save(result);
    
    const req = expressMock.getMockReq({ });
    const { res, next, mockClear } = expressMock.getMockRes()

    await charityController.getAllCharities(req, res);
    
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith(charities);    
});

test('Should return a specific charity', async () => {
    let charityController = CharityController();

    const charities = [
        {
            id: 1,
            name: 'Rich Charity',
            description: 'Rich rich charity helps everybody',
            createdByUser: 'Mark Rich',
            funds: 340000
        },
        {
            id: 2,
            name: 'Medium Rich Charity',
            description: 'Medium rich charity helps everybody',
            createdByUser: 'Mark Medium Rich',
            funds: 140000
        }
    ];

    // prepare the reality in the database
    const conn = typeorm.getConnection();
    charityRepo = await conn.getRepository("Charity")
    result = await charityRepo.create(charities);
    await charityRepo.save(result);
    
    const req = expressMock.getMockReq({ params: { id: 2 } });
    const { res, next, mockClear } = expressMock.getMockRes()

    await charityController.getCharityById(req, res);
    
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith([charities[1]]);    
});

test('Should update a specific charity', async () => {
    let charityController = CharityController();

    const charities = [
        {
            id: 1,
            name: 'Rich Charity',
            description: 'Rich rich charity helps everybody',
            createdByUser: 'Mark Rich',
            funds: 340000
        },
        {
            id: 2,
            name: 'Medium Rich Charity',
            description: 'Medium rich charity helps everybody',
            createdByUser: 'Mark Medium Rich',
            funds: 140000
        }
    ];

    // prepare the reality in the database
    const conn = typeorm.getConnection();
    charityRepo = await conn.getRepository("Charity")
    result = await charityRepo.create(charities);
    await charityRepo.save(result);

    const charityToUpdate = {
        id: 2,
        name: 'MRC',
        description: 'MRC helps everybody',
        createdByUser: 'MMR',
        funds: 140002
    }

    // prepare the mock request and response
    const req = expressMock.getMockReq({ params: { id: 2 }, body: charityToUpdate });
    const { res, next, mockClear } = expressMock.getMockRes()

    await charityController.updateCharity(req, res);

    expect(res.status).toBeCalledWith(200);
    
    outCharities = await conn.getRepository("Charity").find({ id: 1 });
    expect(outCharities.length).toBe(1);
    expect(outCharities[0]).toStrictEqual(charities[0]);

    outCharities = await conn.getRepository("Charity").find({ id: 2 });
    expect(outCharities.length).toBe(1);
    expect(outCharities[0]).toStrictEqual(charityToUpdate);
});

test('Should delete a specific charity', async () => {
    let charityController = CharityController();

    const charities = [
        {
            id: 1,
            name: 'Rich Charity',
            description: 'Rich rich charity helps everybody',
            createdByUser: 'Mark Rich',
            funds: 340000
        },
        {
            id: 2,
            name: 'Medium Rich Charity',
            description: 'Medium rich charity helps everybody',
            createdByUser: 'Mark Medium Rich',
            funds: 140000
        }
    ];

    // prepare the reality in the database
    const conn = typeorm.getConnection();
    charityRepo = await conn.getRepository("Charity")
    result = await charityRepo.create(charities);
    await charityRepo.save(result);

    // prepare the mock request and response
    const req = expressMock.getMockReq({ params: { id: 2 } });
    const { res, next, mockClear } = expressMock.getMockRes()

    await charityController.deleteCharity(req, res);
    
    expect(res.status).toBeCalledWith(200);

    outCharities = await conn.getRepository("Charity").find({ id: 2 });
    expect(outCharities.length).toBe(0);

    outCharities = await conn.getRepository("Charity").find({ id: 1 });
    expect(outCharities.length).toBe(1);
    expect(outCharities[0]).toStrictEqual(charities[0]);
});