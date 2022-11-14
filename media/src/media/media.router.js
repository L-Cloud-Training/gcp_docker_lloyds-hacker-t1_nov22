const MediaController = require('./media.controller');
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
   entities: [ new EntitySchema(require("../entity/media.json")) 
   ] 
});
console.log(connection);

const mediaController = MediaController();

const router = Router();

router.post('/media', mediaController.createMedia);
router.get('/media/:id', mediaController.getMediaById);
router.put('/media/:id', mediaController.updateMedia);
router.delete('/media/:id', mediaController.deleteMedia);

module.exports = router;
