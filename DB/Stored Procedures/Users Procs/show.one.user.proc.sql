CREATE PROCEDURE showOneUser (
    @id INT
)

AS

BEGIN
    SELECT * FROM Users WHERE is_deleted = 0 AND id=@id

END;

EXECUTE showOneUser 4;