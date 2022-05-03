CREATE TABLE products (
    id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    price DECIMAL(8, 2) NOT NULL,
    image1_path VARCHAR(1000),
    alt1_text VARCHAR(200),
    category VARCHAR(50),
    subcategory VARCHAR(50),
    brand VARCHAR(100),
    color VARCHAR(20),
    model_number VARCHAR(100),
    sold_count INT,
    product_description TEXT,
    PRIMARY KEY(id)
);

CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(200) NOT NULL,
    user_password VARCHAR(100) NOT NULL,
    user_address VARCHAR(100),
    user_city VARCHAR(50),
    user_state VARCHAR(50),
    user_country VARCHAR(50),
    user_zip_code VARCHAR(5),
    card_name VARCHAR(200),
    card_number VARCHAR(19),
    card_expiration_date VARCHAR(7),
    card_cvv_code VARCHAR(3),
    card_zip_code VARCHAR(5),
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


INSERT INTO products (product_name, brand, category, subcategory, price, image1_path, alt1_text, color, model_number, product_description, sold_count) VALUES
(
    'Kindle Paperwhite',
    'Amazon',
    'computers',
    'tablets',
    59.99,
    '/prodImg/computers/tablets/kindle.jpg',
    'Picture of Kindle Paperwhite',
    'black',
    '12345',
    'Kindle Paperwhite (8 GB) - Now with a 6.8" display and adjustable warm light - Ad-Supported',
    10
),
(
    'Kindle Paperwhite 2',
    'Amazon',
    'computers',
    'tablets',
    69.99,
    '/prodImg/computers/tablets/kindle.jpg',
    'Picture of Kindle Paperwhite',
    'black',
    '12346',
    'Kindle Paperwhite (8 GB) - Now with a 6.8" display and adjustable warm light - Ad-Supported',
    20
);

INSERT INTO users (first_name, last_name, email, user_password, user_address, user_city, user_state, user_country, user_zip_code, card_name, card_number, card_expiration_date, card_cvv_code, card_zip_code) VALUES
(
    'Test',
    'User',
    'testuser@example.com',
    'testpassword',
    '99 Test Drive',
    'San Antonio',
    'TX',
    'USA',
    '99999',
    'Test User',
    '8888 8888 8888 8888',
    '08/2022',
    '999',
    '99999'
);
