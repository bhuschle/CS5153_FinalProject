CREATE TABLE products (
    id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    price DECIMAL(2) NOT NULL,
    image1_path VARCHAR(4096),
    image2_path VARCHAR(4096),
    image3_path VARCHAR(4096),
    product_description TEXT,
    PRIMARY KEY(id)
);
