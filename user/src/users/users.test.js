const UsersController = require('./users.controller')
const expressMock = require('@jest-mock/express')
var typeorm = require("typeorm"); 
const { use } = require('express/lib/application');
var EntitySchema = typeorm.EntitySchema; 

beforeEach(async () => {
    return await typeorm.createConnection({
        type: "sqlite",
        database: ":memory:",
        dropSchema: true,
        entities: [ new EntitySchema(require("../entity/user.json")) ],
        synchronize: true,
        logging: false
    });    
});

afterEach(async() => {
    let conn = typeorm.getConnection();
    return conn.close();
});

test('We are testing the test...', async () => {    
    let usersController = UsersController();
    const req = expressMock.getMockReq();
    const { res, next, mockClear } = expressMock.getMockRes()
    await usersController.test4Test(req, res);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({ "test": "test" });
});

test('Should create a new user ', async () => {

    let usersController = UsersController();

    const user = {
        id: 1,
        firstName: 'Rich',
        lastName: 'Marko',
        eMail: 'hello@prisma.io',
        password: 'blablabla',
        age: 34
    }

    const req = expressMock.getMockReq({ body: user });
    const { res, next, mockClear } = expressMock.getMockRes()

    await usersController.createUser(req, res);
    
    const conn = typeorm.getConnection();
    const outUsers = await conn.getRepository("User").find();
    expect(res.status).toBeCalledWith(200);
    console.log(outUsers);
    expect(outUsers.length).toBe(1);
    expect(res.json).toBeCalledWith({
        id: 1,
        firstName: 'Rich',
        lastName: 'Marko',
        eMail: 'hello@prisma.io',
        password: 'blablabla',
        age: 34
    });    
});

test('Should list all users', async () => {

    let usersController = UsersController();

    const users = [
        {
            id: 1,
            firstName: 'Rich',
            lastName: 'Marko',
            eMail: 'hello@prisma.io',
            password: 'blablabla',
            age: 34
        },
        {
            id: 2,
            firstName: 'Gillian',
            lastName: 'Smith',
            eMail: 'hello@prisma.io',
            password: 'blablabla',
            age: 22
        }
    ];

    // prepare the reality in the database
    const conn = typeorm.getConnection();
    userRepo = await conn.getRepository("User")
    result = await userRepo.create(users);
    await userRepo.save(result);
    
    const req = expressMock.getMockReq({ });
    const { res, next, mockClear } = expressMock.getMockRes()

    await usersController.getAllUsers(req, res);
    
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith(users);    
});

test('Should return a specific user', async () => {
    let usersController = UsersController();

    const users = [
        {
            id: 1,
            firstName: 'Rich',
            lastName: 'Marko',
            eMail: 'hello@prisma.io',
            password: 'blablabla',
            age: 34
        },
        {
            id: 2,
            firstName: 'Gillian',
            lastName: 'Smith',
            eMail: 'hello@prisma.io',
            password: 'blablabla',
            age: 22
        }
    ];

    // prepare the reality in the database
    const conn = typeorm.getConnection();
    userRepo = await conn.getRepository("User")
    result = await userRepo.create(users);
    await userRepo.save(result);
    
    const req = expressMock.getMockReq({ params: { id: 2 } });
    const { res, next, mockClear } = expressMock.getMockRes()

    await usersController.getUserById(req, res);
    
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith([users[1]]);    
});

test('Should update a specific user', async () => {
    
    let usersController = UsersController();

    const users = [
        {
            id: 1,
            firstName: 'Rich',
            lastName: 'Marko',
            eMail: 'hello@prisma.io',
            password: 'blablabla',
            age: 34
        },
        {
            id: 2,
            firstName: 'Gillian',
            lastName: 'Smith',
            eMail: 'hello@prisma.io',
            password: 'blablabla',
            age: 22
        }
    ];

    // prepare the reality in the database
    const conn = typeorm.getConnection();
    userRepo = await conn.getRepository("User")
    result = await userRepo.create(users);
    await userRepo.save(result);

    const userToUpdate = {
        id: 2,
        firstName: 'R',
        lastName: 'M',
        eMail: 'h@p.io',
        password: 'b',
        age: 19
    }

    // prepare the mock request and response
    const req = expressMock.getMockReq({ params: { id: 2 }, body: userToUpdate });
    const { res, next, mockClear } = expressMock.getMockRes()

    await usersController.updateUser(req, res);

    expect(res.status).toBeCalledWith(200);
    
    outUsers = await conn.getRepository("User").find({ id: 1 });
    expect(outUsers.length).toBe(1);
    expect(outUsers[0]).toStrictEqual(users[0]);

    outUsers = await conn.getRepository("User").find({ id: 2 });
    expect(outUsers.length).toBe(1);
    expect(outUsers[0]).toStrictEqual(userToUpdate);


});

test('Should delete a specific user', async () => {
    
    let usersController = UsersController();

    const users = [
        {
            id: 1,
            firstName: 'Rich',
            lastName: 'Marko',
            eMail: 'hello@prisma.io',
            password: 'blablabla',
            age: 34
        },
        {
            id: 2,
            firstName: 'Gillian',
            lastName: 'Smith',
            eMail: 'hello@prisma.io',
            password: 'blablabla',
            age: 22
        }
    ];

    // prepare the reality in the database
    const conn = typeorm.getConnection();
    userRepo = await conn.getRepository("User")
    result = await userRepo.create(users);
    await userRepo.save(result);

    // prepare the mock request and response
    const req = expressMock.getMockReq({ params: { id: 2 } });
    const { res, next, mockClear } = expressMock.getMockRes()

    await usersController.deleteUser(req, res);
    
    expect(res.status).toBeCalledWith(200);

    outUsers = await conn.getRepository("User").find({ id: 2 });
    expect(outUsers.length).toBe(0);

    outUsers = await conn.getRepository("User").find({ id: 1 });
    expect(outUsers.length).toBe(1);
    expect(outUsers[0]).toStrictEqual(users[0]);
});