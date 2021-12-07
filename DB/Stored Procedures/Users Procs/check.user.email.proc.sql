CREATE OR ALTER PROCEDURE checkEmail(
    @email VARCHAR(100)
)
AS
BEGIN
    SELECT *
    FROM Users
    WHERE email = @email AND is_deleted = 0

END

GO



