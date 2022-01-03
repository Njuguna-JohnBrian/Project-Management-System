CREATE OR ALTER PROCEDURE createUser (
    @email AS VARCHAR(100),
    @username AS VARCHAR(50),
    @password VARCHAR(500),
    @phonenumber VARCHAR(20)
   
) AS 

BEGIN 
    INSERT INTO Users(
        email,
        username,
        password,
        phonenumber
    )
    VALUES(
        @email,
        @username,
        @password,
        @phonenumber
        
    );
END;



SELECT * FROM Users

-- Update rows in table '[Users]' in schema '[dbo]'
UPDATE [dbo].[Users]
SET
    is_admin=1
    -- Add more columns and values here
WHERE is_deleted=0;
