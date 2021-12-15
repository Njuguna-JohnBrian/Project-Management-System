CREATE OR ALTER PROCEDURE deleteProject(
    @id INT
)
AS 
BEGIN
DELETE FROM Projects WHERE id = @id;
END