CREATE OR ALTER PROCEDURE getAssignedProjTasks(
    @user_id INT
)
AS 
BEGIN

    SELECT
        user_id,
        project_name,
        project_desc,
        task_name,
        task_desc
    FROM
        Projects p
        FULL JOIN TaskS t
        ON t.project_id = p.id

    WHERE 
        @user_id = user_id
    ORDER BY
        project_name ASC;
END;

EXECUTE getAssignedProjTasks "8";