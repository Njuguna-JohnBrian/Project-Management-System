CREATE PROCEDURE deleteUser(
    @id INT
) AS 

BEGIN
    UPDATE Users SET is_deleted=1
    WHERE id = @id;
END;

EXECUTE deleteUser 3;