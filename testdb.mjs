import * as database from './js/database.js';

database.addProduct("test1", 1.99, "A product.");
database.addProduct("test2", 2.99, "Another product.");
database.addProduct("test3", 3.99, "Another product.");

database.removeProduct(2)