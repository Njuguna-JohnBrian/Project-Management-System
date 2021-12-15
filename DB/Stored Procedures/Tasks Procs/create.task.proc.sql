CREATE OR ALTER PROCEDURE createTask (
    @task_name VARCHAR(50),
    @task_desc VARCHAR(250),
    @project_id INT
)AS 

BEGIN
    INSERT INTO Tasks(
        task_name,
        task_desc,
        project_id
    )
    VALUES(
        @task_name,
        @task_desc,
        @project_id
    );
END;

EXECUTE createTask "ComponentDidMount", "Define the difference between useEffect and ComponentDidMount", 23;

SELECT * FROM Tasks;