-- Create table Projects:
CREATE TABLE Projects(
    id INT PRIMARY KEY IDENTITY,
    project_name VARCHAR(50) NOT NULL UNIQUE,
    project_desc VARCHAR(250) NOT NULL,
    is_deleted BIT DEFAULT 0 NOT NULL,
    user_id INT,
    CONSTRAINT FK_USER_PROJECTS FOREIGN KEY (user_id)
    REFERENCES Users (id)
    ON UPDATE CASCADE
    ON DELETE SET NULL 
)