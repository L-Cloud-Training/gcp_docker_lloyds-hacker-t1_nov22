var typeorm = require("typeorm"); 
var EntitySchema = typeorm.EntitySchema; 

// typeorm.createConnection({ 
//    "type": "postgres", 
//    "host": "localhost", 
//    "port": 54320, 
//    "username": "postgres", 
//    "password": "cibona2!", 
//    "database": "typeorm_test_db",
//    "synchronize": true, 
//    "logging": false, 
//    entities: [ new EntitySchema(require("./entity/user.json")) 
//    ] 
// }) 
// .then(function(connection) { 
//     return connection.getRepository("User").find();
// //    return connection.getRepository("User"); }) .then(function(userRepository) { 
// //       var user = { 
// //          firstName: "Marko", 
// //          lastName: "Marković",
// //          eMail: "marko@markovic.com",
// //          password: "123",
// //          age: 18 
// //       }; 
// //       return userRepository.save(user) .then(function(savedUser) { console.log("User has been successfully saved: ", savedUser); 
// //    return userRepository.find(); }) 
// //    .then(function(users) { console.log("All users: ", users); 
// //    return; 
// //    }) 
// //    .catch(function(error) { console.log("Error: ", error); return; 
// //    }) 
// }) 
// .catch(function(error) { console.log("Error: ", error) 
//    return; });

connection = typeorm.createConnection({ 
    "type": "postgres", 
    "host": "localhost", 
    "port": 5432, 
    "username": "postgres", 
    "password": "cibona2!", 
    "database": "typeorm_test_db",
    "synchronize": true, 
    "logging": false, 
    entities: [ new EntitySchema(require("./entity/user.json")) 
    ] 
}).then(function(connection) {
    return connection.getRepository("User");
}).then(function(userRepo) {
    return userRepo.find();    
}).then(function(users) {
    console.log(users);
    return;
});
