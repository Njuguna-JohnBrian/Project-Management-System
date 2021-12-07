CREATE OR ALTER PROCEDURE updateUser(
    @id INT, 
    @email VARCHAR(100),
    @username VARCHAR(50)
)

AS

BEGIN 

    UPDATE users SET username=@username, email=@email WHERE id=@id AND is_deleted=0

END

GO