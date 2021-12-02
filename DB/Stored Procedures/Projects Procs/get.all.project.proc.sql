CREATE PROCEDURE getAllProjects
AS
BEGIN
    SELECT *  FROM Projects;

END;

EXECUTE getAllProjects;