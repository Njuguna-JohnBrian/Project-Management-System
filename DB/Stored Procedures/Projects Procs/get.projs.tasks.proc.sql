CREATE OR ALTER PROCEDURE getProjectsTasks
AS
BEGIN
    SELECT
        user_id,
        project_id,
        project_name,
        project_desc,
        task_name,
        task_desc
    FROM
        Projects p
        FULL JOIN TaskS t
        ON t.project_id = p.id
    ORDER BY
        project_id DESC;
END;

EXECUTE getProjectsTasks

-- DROP PROCEDURE getProjectsTasks
