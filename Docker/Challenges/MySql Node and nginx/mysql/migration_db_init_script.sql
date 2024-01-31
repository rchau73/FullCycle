use nodedb;

-- Create a new table named people
CREATE TABLE IF NOT EXISTS people (
    id      INT             NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name    VARCHAR(255)    NOT NULL
);