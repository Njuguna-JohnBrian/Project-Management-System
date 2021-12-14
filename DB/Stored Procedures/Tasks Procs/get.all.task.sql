CREATE OR ALTER PROCEDURE getAllTasks(
    @project_id INT
)
AS

BEGIN 
    SELECT * FROM Tasks
    WHERE project_id = @project_id;

END;

EXECUTE getAllTasks 1;

