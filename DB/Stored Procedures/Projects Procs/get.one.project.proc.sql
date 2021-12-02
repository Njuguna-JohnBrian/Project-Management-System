CREATE OR ALTER PROCEDURE getOneProject(
    @project_id INT
)
AS
BEGIN
    SELECT *  FROM Projects
    WHERE id = @project_id;

END;

EXECUTE getOneProject 1;