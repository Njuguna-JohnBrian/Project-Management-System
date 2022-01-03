-- Create table users:
CREATE TABLE Users
(
    id INT PRIMARY KEY IDENTITY,
    email VARCHAR(100) NOT NULL UNIQUE,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(500) NOT NULL,
    phonenumber VARCHAR(20) NOT NULL,
    is_admin BIT DEFAULT 0 NOT NULL,
    is_deleted BIT DEFAULT 0 NOT NULL,
    sms_sent BIT DEFAULT 0 NOT NULL
)

-- Add a new column '[sms_sent]' to table '[Users]' in schema '[dbo]'
ALTER TABLE [dbo].[Users]
    ADD [sms_sent] BIT DEFAULT 0 NOT NULL
GO

