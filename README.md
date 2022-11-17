# Powder Group III
## Team
#### Hunter Hayward

## DataBase Tables
#####
CREATE TABLE volunteers(
id INT AUTO_INCREMENT,
first_name TEXT NOT NULL,
last_name TEXT NOT NULL,
email_address TEXT NOT NULL,
phone_number TEXT NOT NULL,
u2f_challenge TEXT NOT NULL,
PRIMARY KEY (id));
