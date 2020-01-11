# Development and Testing Build

## Development
- Navigate to the root of the directory and run “npm run devStart”. Hit cmd c to end the backend and frontend processes

- If you are testing new back-end routes, you must add the routes to the devServer/proxy section in the webpack.dev.js file. This allows the routes to be accessed in development mode.

- A favicon can be added by specifiying the image in the webpack.common.js file in the plugins/HTMLWebPackPlugin section.

## Installing Dependencies
This boilerplate treats the React front-end, and Express back-end as seperate applications. Because of this, if you would like to install dependencies specific to the front-end or back-end you must first navigate to their respective folders.

# Version Control and Deployment 
(see Github Flow https://guides.github.com/introduction/flow/)
- Create a feature branch off the master branch ‘named feature/name’
- Work on that branch committing semi-regularly/whenever a distinct part of the feature is complete to make code review easier
- Once a feature is complete, create a pull request to merge the code with the master branch, this will trigger a build in the Heroku pipeline and create a staging build. 
- Wait for code review, staging build on heroku.
- Tag the new node on master with the name of the staging build
- Once a production release is ready, review most recent staging build on Heroku. If it is stable, promote to production and then add a tag to the node with this format: “Production Version XX (Date YY/MM/DD)”