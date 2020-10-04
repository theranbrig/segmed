# Segmed Project

## Installation and Running Application

In the project directory, you can run:

### `yarn install` or `npm install`

Install the node_modules necessary for application.

### `yarn start` or `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## About

Application was build using React, TailwindCSS and a few other node packages to improve usability and decrease development time.

Primarily the app utilizes React and is split up for cleaner architecture. I mimicked the data fetching by using the putting the "reports" into a json file and fetched them in the same way that I would from a REST API.

The search function is basically turns the entire text of the report into a giant string. We can then check if the search term is present in said string. This one does not account for punctuation, but a regex could be added to remove any punctuation. It also need exact spelling, it does not do near search at this time. Letter case does not matter. It live searches as you type and gives results on the fly.

Styling was kept to a minimum as I am not a designer, but I did use TailwindCSS which was recommended in the directions. I tried to keep it simple and readable. It is a simple list, but a table could have been used as well.

The full screen reports can use the keyboard or mouse to navigate through. You can use the arrows to move from one report to the other, and can click on the tags, or use the corresponding number on the keyboard to toggle them.

Added packages:

- [Keen Slider](https://github.com/rcbyr/keen-slider) - The slider to display the multiple reports. Though I did have to modify it to get the keyboard to work.
- [React Highlight Words](https://www.npmjs.com/package/react-highlight-words) - Allows you to highlight the search term in the text.
- [React Keydown](https://github.com/ayrton/react-key-handler) - Made it easy to work with keyboard events.

### Known Issues

#### Search

This is a really basic search function. Ideally this would not take place on the client side, but rather we would make an API call to fetch data that fits our query, but in this case with no server, it fits the assigned project.

Also as it searches in the on change it would need to be debounced for a live app that is making API calls instead of client side filtering. One could also add in a button to make the API calls. It would then be easy to make a list of recent searches. I decided to keep it simple and keep the live `onChange` search here.

#### Tags

The tagging function is not ideal as we are not updating a db. In this case it is simply updating the client state. This is an issue as it is slow. Sometimes there is a lag as the filter and map functions work through the data. Ideally the tag should update the db with an API call. That way you only have to worry about the one report being updated. Since it was all done on the client side, this way works, but it could be improved with a full stack application.

The directions were a bit unclear as to how to tag. I was not sure if they could be tagged with more than one tag, or if multiples were needed. I decided to allow for multiple tags. This is of course something that I would clear up with my team and the product designers before making a decision like that, but I made the executive decision in this case.

#### Design

It isn't going to win any design awards, but it is clean and functional.  It could use more dynamic design to make it more exciting for the user. I am great at implementing UI from the design team.

Responsiveness.  I somewhat ignored responsiveness in this case as it seems like it would be a web based application that is used on PC.  I would normally make sure that it takes advantage of mobile and tablet views, but in this case with limited time it is optimized for PC.
