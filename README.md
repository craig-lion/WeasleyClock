# Weasley Clock Read Me


--
#### Introduction
--
> Any sufficiently advanced technology is indistinguishable from magic.  
> \- Arthur C. Clarke 

From a young age I have always loved stories about fantasy and magic. The Lord of the Rings, The Hobbit, The Chronicles of Narnia, and The Redwall Series were all early favorites and, while I did not start reading Harry Potter until after the first movie, it took me about two weeks to finish the frist four books and I have read the series in its entirety more times than I can count now.  One of my favorite concepts from the series is a clock that lives in main character Ronald Weasley's family home "The Burrow".  Instead of this clock telling time, however, the clock shared the family member's locations (or perhaps more accurately their "state of being").  Avid readers may remember that during the height of the fight against "He-Who-Shall-Not-Be-Named", all family member's hands pointed at "Mortal Peril". 

Photo. 

 When I started my coding journey I knew it would be a challenge and wanted to create some milestones to shoot for and feel good about it.  To this end I made a list of apps I'd like to make once I learned how to code and this idea was the very first on that list.  I tried to keep the idea simple - have an app where friends can share their location/status with other friends.  To accomplish this, I focused on the following user stories:

    - I want to be able to tell my friends what I am doing
    - I want to be able to see what my friends are up to 

A more detailed plan for the app can be found in "AppPlan.txt"

--
#### Environment
--
* Front-End: React w/ Hooks
* Server: Node + Express + Bcrypt Auth
* Database: MongoDB

--
#### Installation
--
External Dependencies: [MongoDB](https://docs.mongodb.com/manual/installation/)

Install Dependencies:

`npm install`

Build Webpack:

`npm run build`

Start Server:

`npm run start`


--
#### Test Suite
--

One of the most important lessons learned from working on this project was the importance of writing tests.  Originally, I felt this project was simple enough to not require extensive testing.  I quickly realized that I wanted to add or change a feature, I would need to manually test all of the functionality anyway to make sure all the features functioned properly.

For this project I used Jest + React-Testing-Library (I had originally intended to use Enzyme but discovered it does not like hook, react-testing-library has specific functionality for testing hooks).  One of the interesting challenges in writing tests was the granularity of the test vs DRY.  I found myself unhappy with having multiple "Expect" statements in a test and not knowing which one failed.  Jest does not allow custom error messages out of the box but "jest-expect-message" adds that functionality.

Run Tests:

`npm run test`