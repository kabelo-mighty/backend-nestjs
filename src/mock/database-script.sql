-- Database Schema Definition
CREATE TABLE payment (
    payment_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    payment_method VARCHAR(100),
    payment_date DATETIME,
    payment_amount DECIMAL(10, 2),
    payment_status VARCHAR(50),
    FOREIGN KEY (order_id) REFERENCES order_information(order_id) ON DELETE CASCADE
);

CREATE TABLE order_items (
    order_item_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    product_code VARCHAR(100),
    product_name VARCHAR(255),
    quantity INT,
    price_per_unit DECIMAL(10, 2),
    total_price DECIMAL(10, 2),
    FOREIGN KEY (order_id) REFERENCES order_information(order_id) ON DELETE CASCADE
);

CREATE TABLE order_information (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    order_date DATETIME,
    order_total DECIMAL(10, 2),
    payment_status VARCHAR(50),
    shipping_status VARCHAR(50),
    additional_notes TEXT,
    FOREIGN KEY (user_id) REFERENCES user_information(user_id) ON DELETE CASCADE
);

CREATE TABLE product_information (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    product_code VARCHAR(100) UNIQUE,
    product_name VARCHAR(255),
    description TEXT,
    image_url VARCHAR(255),
    category VARCHAR(100),
    price DECIMAL(10, 2),
    currency VARCHAR(10),
    stock_quantity INT,
    FOREIGN KEY (user_id) REFERENCES user_information(user_id) ON DELETE CASCADE
);

CREATE TABLE user_information (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    date_of_birth DATE,
    gender VARCHAR(50),
    address_line_1 VARCHAR(255),
    address_line_2 VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(100),
    postal_code VARCHAR(20),
    country VARCHAR(100),
    email VARCHAR(255) UNIQUE,
    phone_number VARCHAR(20),
    username VARCHAR(100) UNIQUE,
    password VARCHAR(255),
    roles JSON
);

-- Comprehensive Data Retrieval Query

SELECT 
    -- User Information
    ui.user_id,
    ui.first_name,
    ui.last_name,
    ui.date_of_birth,
    ui.gender,
    ui.address_line_1,
    ui.address_line_2,
    ui.city,
    ui.state,
    ui.postal_code,
    ui.country,
    ui.email,
    ui.phone_number,
    ui.username,
    ui.roles,
    pi.product_id,
    pi.product_code,
    pi.product_name,
    pi.description AS product_description,
    pi.image_url,
    pi.category,
    pi.price,
    pi.currency,
    pi.stock_quantity,
    oi.order_id,
    oi.order_date,
    oi.order_total,
    oi.payment_status AS order_payment_status,
    oi.shipping_status,
    oi.additional_notes,
    oi_items.order_item_id,
    oi_items.product_code AS order_item_product_code,
    oi_items.product_name AS order_item_product_name,
    oi_items.quantity AS order_item_quantity,
    oi_items.price_per_unit AS order_item_price_per_unit,
    oi_items.total_price AS order_item_total_price,
    p.payment_id,
    p.payment_method,
    p.payment_date,
    p.payment_amount,
    p.payment_status AS payment_status
FROM 
    user_information ui
LEFT JOIN 
    product_information pi ON ui.user_id = pi.user_id
LEFT JOIN 
    order_information oi ON ui.user_id = oi.user_id
LEFT JOIN 
    order_items oi_items ON oi.order_id = oi_items.order_id
LEFT JOIN 
    payment p ON oi.order_id = p.order_id;