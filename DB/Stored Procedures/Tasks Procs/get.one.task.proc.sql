CREATE OR ALTER PROCEDURE getOneTask(
    @task_id INT
)
AS

BEGIN 
    SELECT * FROM Tasks
    WHERE id = @task_id;

END;

EXECUTE getOneTask 1;