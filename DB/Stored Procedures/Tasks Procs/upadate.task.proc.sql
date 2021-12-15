CREATE OR ALTER PROCEDURE updateTask(
    @id INT,
    @task_name VARCHAR(50),
    @task_desc VARCHAR(250)
)
AS 
BEGIN
    UPDATE Tasks
SET task_name = @task_name, task_desc= @task_desc
WHERE id=@id;

END

EXECUTE updateTask 2, "UseEffect In React", "Understanding UseEffect";