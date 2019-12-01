## Slync Programming Test - Twitter Client

Implement a simple *Twitter client* as a single page application which initially shows general public tweets. Allow the user to specify a Twitter handle to view the tweets from. When a user requests a specific Twitter handle and the UI shows the latest tweets from that handle, there should also be a way to filter / search tweets by text. Also, once the user has selected a handle to view the Tweets from, the UI should periodically update with newer Tweets.

### Grading Criteria

* UI Design
* Architecture
* Maintainability
* Testing

### Technology

You can pick any frontend and/or backend technologies you are familiar with. You can and should use the Twitter API.

### Submission

You will submit to the private git repo we have added you to. When done, make sure you provide instructions on how to run your code (preferably as a docker image) in the README.

Note: *Do not* create a Twitter clone and *do not* share any Twitter API secrets in your code.

Best of luck!
Slync Engineering Team

### Twitter Client Description

I have created a simple client that gets the top 50 most recent tweets from my home timeline. There is the search bar for both finding twitter handler and finding tweets with keywords. Finding username can only be done on the main timeline. Only when the user finds the handle, then only the search bar (minimum 4 characters) can be used for finding texts. Also UI updates with recent tweets (50 most recent) every 5 seconds on the twitter handle page. I have added two buttons, one is for going to the main timeline (top left) and a utility button (bottom right) that scrolls to the top of the page.

### Tech stack

1. Express for backend.
2. React for frontend.

### Deployment

For backend

1. Run `cd twitter-backend`
2. Run `npm install`
3. Run `npm start`

For frontend

1. Run `cd twitter-frontend`
2. Run `npm install`
3. Run `npm start`

### Screenshots

Main feed

![alt text](samples/Capture1.PNG)

User feed

![alt text](samples/Capture2.PNG)
