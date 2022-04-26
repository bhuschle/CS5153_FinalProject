CREATE TABLE products (
    id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    price DECIMAL(8, 2) NOT NULL,
    category VARCHAR(100),
    image_path VARCHAR(4096),
    image_alt VARCHAR(100),
    product_desc TEXT,
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
