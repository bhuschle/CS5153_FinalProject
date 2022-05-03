CREATE TABLE products (
    id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    price DECIMAL(8, 2) NOT NULL,
    image1_path VARCHAR(1000),
    image2_path VARCHAR(1000),
    image3_path VARCHAR(1000),
    alt1_text VARCHAR(200),
    alt2_text VARCHAR(200),
    alt3_text VARCHAR(200),
    category VARCHAR(50),
    subcategory VARCHAR(50),
    brand VARCHAR(100),
    color VARCHAR(20),
    model_number varchar(100),
    product_description TEXT,
    PRIMARY KEY(id)
);

CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email varchar(200) NOT NULL,
    user_password varchar(100) NOT NULL,
    user_address varchar(100),
    user_city varchar(50),
    user_state varchar(50),
    user_country varchar(50),
    user_zip_code varchar(5),
    PRIMARY KEY(id)
);

CREATE TABLE orders (
    id INT NOT NULL AUTO_INCREMENT,
    user_id_ INT NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE order_items (
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    PRIMARY KEY(order_id, product_id)
);


INSERT INTO products (product_name, brand, category, subcategory, price, image1_path, image2_path, image3_path, alt1_text, alt2_text, alt3_text, color, model_number, product_description) VALUES
(
    'Kindle Paperwhite',
    'Amazon',
    'computers',
    'tablets',
    59.99,
    '/prodImg/kindle.jpg',
    '/prodImg/kindle.jpg',
    '/prodImg/kindle.jpg',
    'Picture of Kindle Paperwhite',
    'Picture of Kindle Paperwhite',
    'Picture of Kindle Paperwhite',
    'black',
    '12345',
    'Kindle Paperwhite (8 GB) - Now with a 6.8" display and adjustable warm light - Ad-Supported'
);

INSERT INTO users (first_name, last_name, email, user_password) VALUES
(
    'Test',
    'User',
    'testuser@example.com',
    'testpassword'
);