const CharityController = require('./charity.controller');
const { Router } = require('express');

var typeorm = require("typeorm"); 
var EntitySchema = typeorm.EntitySchema; 


connection = typeorm.createConnection({ 
   "type": "postgres", 
   "host": process.env.DATABASE_HOST, 
   "port": process.env.DATABASE_PORT, 
   "username": process.env.DATABASE_USERNAME, 
   "password": process.env.DATABASE_PASSWORD, 
   "database": process.env.DATABASE_NAME,
   "synchronize": true, 
   "logging": false, 
   entities: [ new EntitySchema(require("../entity/charity.json")) 
   ] 
});

const charityController = CharityController();

const router = Router();

router.post('/charities', charityController.createCharity);
router.get('/charities/:id', charityController.getCharityById);
router.get('/charities/funds/:id', charityController.getCharityFundsById);
router.get('/charities', charityController.getAllCharities);
router.put('/charities/:id', charityController.updateCharity);
router.put('/charities/funds/:id', charityController.updateCharityFunds);
router.delete('/charities/:id', charityController.deleteCharity);

module.exports = router;
