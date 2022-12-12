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

<b>Charlie Weitzenberg:</b> Before thanksgiving, I spent most of my time familiarizing myself with the way that react apps function, as I was very new to this style of programming. I also spent this time brainstorming possible contributions I could make to the project. After Thankgiving I began implementing the css stying to the site. I had to scrap a lot of my work because I spent it trying to load react components on different html pages, however, once I started using react DOM routing things were a lot easier. After I managed to get the navigation bar up and running, I implemented a footer with some links and a map, and then began working on implementing the components made by Matt to the new multi-page system. This seemed easy at first, however I had to rework the way that volunteers sign up for specific events as the multi page functionality interfered with the sign up for specific events.


## Conclusion
This project, despite it's difficulty, was an excellent way to gain a good understanding of the way that React apps are structured and how they function. One thing that I feel we could have been done better was having a clearer idea on what our final goal of the site was before we began working. I also feel that due to how loose the guidelines to this project were, having a little more communication on what we were each doing would have been very helpful. Despite all this, having almost complete freedom on this project forced me to really understand how react works instead of only learning within the bounds of stricter project guidelines. Overall, I am happy with the work that me and my partners did and glad that it taught me as much as it did!


## References
<a href="https://nodemailer.com/about/"> Nodemailer </>
<a href="https://sendgrid.com/"> Sendgrid </>
<a href="https://beta.reactjs.org/learn/managing-state"> React State Management </>
