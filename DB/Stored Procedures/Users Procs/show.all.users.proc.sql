CREATE PROCEDURE showUser 

AS

BEGIN
    SELECT * FROM Users WHERE is_deleted = 0;

END;

EXECUTE showUser;