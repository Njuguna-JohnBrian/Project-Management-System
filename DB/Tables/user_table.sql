-- Create table users:
CREATE TABLE Users(
    id INT PRIMARY KEY IDENTITY,
    email VARCHAR(100) NOT NULL UNIQUE,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(250) NOT NULL,
    phonenumber VARCHAR(20) NOT NULL,
    role VARCHAR(20) NOT NULL,
    is_deleted BIT DEFAULT 0 NOT NULL,
)