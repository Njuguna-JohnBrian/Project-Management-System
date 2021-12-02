CREATE PROCEDURE createUser (
    @email AS VARCHAR(100),
    @username AS VARCHAR(50),
    @password VARCHAR(250),
    @phonenumber VARCHAR(20),
    @role VARCHAR(20)
) AS 

BEGIN 
    INSERT INTO Users(
        email,
        username,
        password,
        phonenumber,
        role
    )
    VALUES(
        @email,
        @username,
        @password,
        @phonenumber,
        @role
    );
END;

EXECUTE createUser "njugunajb96@gmail.com", "John Brian", "12345","0707683279", "Admin";
SELECT * FROM Users;