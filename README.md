# Powder Group III
## Team
#### Hunter Hayward

## DataBase Tables
##### volunteers
CREATE TABLE volunteers (
id INT AUTO_INCREMENT,
first_name TEXT NOT NULL,
last_name TEXT NOT NULL,
email_address TEXT NOT NULL,
phone_number TEXT NOT NULL,
PRIMARY KEY (id));
##### developers
CREATE TABLE developers (
id INT AUTO_INCREMENT,
username TEXT NOT NULL,
password TEXT NOT NULL,
email TEXT NOT NULL,
phone TEXT NOT NULL,
PRIMARY KEY (id));
##### u2f-Keys
CREATE TABLE devkeys (
id INT AUTO_INCREMENT,
username TEXT NOT NULL,
challenge TEXT NOT NULL,
appID TEXT NOT NULL,
version TEXT NOT NULL,
keyHandle TEXT NOT NULL,
PRIMARY KEY (id));