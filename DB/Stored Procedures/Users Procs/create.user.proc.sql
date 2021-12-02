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

EXECUTE createUser "njugunajohnbrian@gmail.com", "Njuguna", "12345","07123456", "User";

SELECT * FROM Users