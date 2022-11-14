const UserController = require('./users.controller');
const { Router } = require('express');

var typeorm = require("typeorm"); 
var EntitySchema = typeorm.EntitySchema; 
var Path = require("path");
var fs = require('fs');

function getConfigValue(config) {
   var value = "";
   var name = config.name;
   var defaultValue = config.defaultValue || '';
   var required = config.required || false;

   if (process.env.CONFIG_FILES_PATH) {
       var filePath = Path.join(process.env.CONFIG_FILES_PATH, name);
       if (fs.existsSync(filePath)) { value = fs.readFileSync(filePath, 'utf8').trim(); }
       console.log("Config '%s' has %svalue set from file '%s'.", name, value ? '' : 'no ', filePath)
   }
   if (!value) {
       value = process.env[name];
       value = (value) ? value.trim() : '';
       console.log("Config '%s' has %svalue set from ENV '%s'.", name, value ? '' : 'no ', name)
   }
   if (!value) {
       value = defaultValue.trim();
       console.log("Config '%s' has %svalue set from default value.", name, value ? '' : 'no ')
   }
   if (!value && required) {
       throw new Error("Config '%s' is required and has no value.", name);
   }
   
   return value;
}

var databaseHost = getConfigValue({ name: 'DATABASE_HOST', defaultValue: 'postgres', required: true });
var databasePort = getConfigValue({ name: 'DATABASE_PORT', defaultValue: '5432', required: true });
var databaseName = getConfigValue({ name: 'DATABASE_NAME', defaultValue: 'postgres', required: true });
var databaseUsername = getConfigValue({ name: 'DATABASE_USERNAME', defaultValue: 'postgres', required: true });
var databasePassword = getConfigValue({ name: 'DATABASE_PASSWORD', defaultValue: 'foo', required: true });

connection = typeorm.createConnection({ 
   "type": "postgres", 
   "host": databaseHost, 
   "port": databasePort, 
   "username": databaseUsername, 
   "password": databasePassword, 
   "database": databaseName,
   "synchronize": true, 
   "logging": false, 
   entities: [ new EntitySchema(require("../entity/user.json")) 
   ] 
});

const userController = UserController();

const router = Router();

router.post('/users', userController.createUser);
router.get('/users/:id', userController.getUserById);
router.get('/users', userController.getAllUsers);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

module.exports = router;


// connection = typeorm.createConnection({
//     type: "sqlite",
//     database: ":memory:",
//     dropSchema: true,
//     entities: [ new EntitySchema(require("../entity/user.json")) ],
//     synchronize: true,
//     logging: false
// }); 

