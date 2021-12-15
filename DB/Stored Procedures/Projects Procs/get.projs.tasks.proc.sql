CREATE OR ALTER PROCEDURE getProjectsTasks
AS
BEGIN
    SELECT
        project_name,
        project_desc,
        task_name,
        task_desc
    FROM
        Projects p 
    FULL JOIN TaskS t 
        ON t.project_id = p.id
    ORDER BY
        project_name DESC;
END;

EXECUTE getProjectsTasks
