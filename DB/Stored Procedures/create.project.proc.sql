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

EXECUTE createProject "React", "A Javascript Framework";
