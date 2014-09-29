Facebook top photos
=============

A simple Backbone.js application which allows a user to connect to Facebook via the Graph API. Once connected, it will pull data for the 25 most recently uploaded files, then rank them by Like or Comment count, and present them leaderboard-style.

To make sure it works, you'll need to either convert your standard Facebook account to a developer account, or create another account which has developer rights.

Once that's done, create an app in the facebook developer section (https://developers.facebook.com), and be sure not to set any domains in the App's settings. Instead, if website is not already visible, select create new platform (website), then enter localhost:9000 as the Site URL. This will allow your Node.js server running this to easily communicate with the Graph API.

On line 69 of facebook.js you'll also need to enter your own API key for the appId.

That's pretty much it.


###To make it work: 

1. Clone this repo

2. CD into the cloned directory

3. sudo npm install

4. node app

5. open browser to localhost:9000
