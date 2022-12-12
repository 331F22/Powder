# Group 19

## Members
 - Michael Buffington (http://csci331.cs.montana.edu:5006/)
 - Matt Pritting (Client - http://csci331.cs.montana.edu:3034)
 - Charlie Weitzenberg ()
 
## Features Implimented
 - Emailing functionality via Sendgrid and Nodemailer
 - multiple event management (with all CRUD operations implimented)
 - voucher assignment
 - UI
 
## Github
All contributions by group members happened on <a href="https://github.com/331F22/Powder/tree/Group-19"> this branch </a> or on our local machines. Please see the commit history to see individual's contributions over time

## Slide Deck for Presentation 
https://docs.google.com/presentation/d/1g-uX5tTwQDklAT1JTX-9XMHy9p1AfkMvkdfkoWoLAoY/edit?usp=sharing

## Creative Summary
Our project had 2 main objectives that we wanted to solve. The first was to add email functionality so that Keri could automate the release of voucher codes to volunteers. The second goal that we wanted to accomplish was to segment lists of volunteers by which events they had volunteered at. 

## Tech  Summary
Front end operations used React UI components & React-DOM-Router in order to show different pages. Backend opperations relied on an Express server and a MySQL database. Most database calls were relatively simple (CRUD Operations), but assigning vouchers required multiple reads and a write which required asyncronous functions in order to run. Emailing was handled via an SMPT server using a private API. 

## Individual Member's Notes

<b>Michael Buffington:</b> In mid November, I made the initial emailing functionality using Nodemailer and Sendgrid. By Thanksgiving I had everything working, minus sending a real voucher code as that was dependent on Matt's contributions to multi-event functionality. After thanksgiving, I added some new buttons to assign vouchers and send them based on Matt's work, as well as connecting all three database tables (volunteers, events, and vouchers) to get the backend functionality working.

<b>Matt Pritting:</b> Before leaving for Thanksgiving break, I coordinated with another group in Powder to see if we needed to have similar DDL for our projects so they could sync easier but we decided that we would stay seperate for the time. Most of my work was done over thanksgiving break when I had free time. I took time to understand how react was connecting the front end to the back end and added the modifications to allow users to interact with the events table and limit which volunteers were displayed by the selected event. After break, I added the update and delete functionalities. 

## Conclusion



## References
<a href="https://nodemailer.com/about/"> Nodemailer </>
<a href="https://sendgrid.com/"> Sendgrid </>
<a href="https://beta.reactjs.org/learn/managing-state"> React State Management </>
