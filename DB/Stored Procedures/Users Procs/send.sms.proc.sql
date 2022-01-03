CREATE OR ALTER PROCEDURE sendSMS

AS 

BEGIN

    SELECT * FROM Users WHERE sms_sent = 0 and is_deleted = 0
    UPDATE Users
    SET sms_sent = 1 WHERE is_deleted = 0

END
GO

EXECUTE sendSMS


UPDATE Users
SET sms_sent = 0 WHERE is_deleted = 0

UPDATE Users
SET phonenumber = +254707683279  WHERE is_deleted = 0
