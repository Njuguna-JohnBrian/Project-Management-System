CREATE OR ALTER PROCEDURE updateProject(
    @id INT,
    @project_name VARCHAR(50),
    @project_desc VARCHAR(250)
)
AS
BEGIN
UPDATE Projects SET project_name = @project_name, project_desc= @project_desc
WHERE id = @id;
END

EXECUTE updateProject 1, "ReactJs", "A Javascript Framework By Facebook"
