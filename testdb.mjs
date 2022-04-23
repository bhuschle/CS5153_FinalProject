import * as database from './js/database.js';


await database.addProduct("test1", 1.99, "A product.");
await database.addProduct("test2", 2.99, "Another product.");
await database.addProduct("test3", 3.99, "Another product.");
console.log("Products added to database.");

await database.removeProduct(2)
console.log("Removed product from database.");


database.addUser("Ethan", "Chappel", "ethan.chappel@example.edu", "password", "1 UTSA Blvd.", "San Antonio", "Texas", "United States of America", "78249")
database.addUser("John", "Doe", "john.doe@example.edu", "password", "1 UTSA Blvd.", "San Antonio", "Texas", "United States of America", "78249")
console.log("Users added to database.");

database.removeUser(2)
console.log("Removed user from database.");