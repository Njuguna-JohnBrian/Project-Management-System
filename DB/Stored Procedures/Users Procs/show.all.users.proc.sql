CREATE OR ALTER PROCEDURE showUser 

AS

BEGIN
    SELECT * FROM Users WHERE is_deleted = 0 AND is_admin=0

END;

EXECUTE showUser;



DROP PROCEDURE showUser