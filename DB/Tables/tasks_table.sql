-- Create table Tasks:
CREATE TABLE Tasks(
    id INT PRIMARY KEY IDENTITY,
    task_name VARCHAR(50) NOT NULL,
    task_desc VARCHAR(250) NOT NULL,
    is_deleted BIT DEFAULT 0 NOT NULL,
    project_id INT,
    CONSTRAINT FK_PROJECTS_TASKS FOREIGN KEY(project_id)
    REFERENCES Projects(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
)
