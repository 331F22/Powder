# Group 19

## Members
 - Michael Buffington (http://csci331.cs.montana.edu:5006/)
 - Matt Pritting ()
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

## Tech  Summary
Front end operations used React UI components & React-DOM-Router in order to show different pages. Backend opperations relied on an Express server and a MySQL database. Most database calls were relatively simple (CRUD Operations), but assigning vouchers required multiple reads and a write which required asyncronous functions in order to run. Emailing was handled via an SMPT server using a private API. 

## Individual Member's Notes

<b>Michael Buffington:</b> In mid November, I made the initial emailing functionality using Nodemailer and Sendgrid. By Thanksgiving I had everything working, minus sending a real voucher code as that was dependent on Matt's contributions to multi-event functionality. After thanksgiving, I added some new buttons to assign vouchers and send them based on Matt's work, as well as connecting all three database tables (volunteers, events, and vouchers) to get the backend functionality working.

<b>Charlie Weitzenberg:</b> Before thanksgiving, I spent most of my time familiarizing myself with the way that react apps function, as I was very new to this style of programming. I also spent this time brainstorming possible contributions I could make to the project. After Thankgiving I began implementing the css stying to the site. I had to scrap a lot of my work because I spent it trying to load react components on different html pages, however, once I started using react DOM routing things were a lot easier. After I managed to get the navigation bar up and running, I implemented a footer with some links and a map, and then began working on implementing the components made by Matt to the new multi-page system. This seemed easy at first, however I had to rework the way that volunteers sign up for specific events as the multi page functionality interfered with the sign up for specific events.

## Conclusion



## References
<a href="https://nodemailer.com/about/"> Nodemailer </>
<a href="https://sendgrid.com/"> Sendgrid </>
<a href="https://beta.reactjs.org/learn/managing-state"> React State Management </>
