CREATE PROCEDURE createProject(
    @project_name VARCHAR(50),
    @project_desc VARCHAR(250)
    )AS

BEGIN
    INSERT INTO Projects(
        project_name,
        project_desc
    )
    VALUES(
        @project_name,
        @project_desc
    );
END;

EXECUTE createProject "Advanced React", "Understand React Class Components";
SELECT * FROM Projects;