##Development and Testing Build

#Development
Navigate to the root of the directory and run “npm run dev”. Hit cmd c to end the backend and frontend processes

#Build Testing
Navigate to the root of the directory and run “npm run build && node server.js”. navigate to localhost:XXXX and you should see the application. Hit cmd c to end server.js.

##Version Control and Deployment 
(see Github Flow https://guides.github.com/introduction/flow/)
- Create a feature branch off the master branch ‘named feature/name’
- Work on that branch committing semi-regularly/whenever a distinct part of the feature is complete to make code review easier
- Once a feature is complete, create a pull request to merge the code with the master branch, this will trigger a build in the Heroku pipeline and create a staging build. 
- Wait for code review, staging build on heroku.
- Tag the new node on master with the name of the staging build
- Once a production release is ready, review most recent staging build on Heroku. If it is stable, promote to production and then add a tag to the node with this format: “Production Version XX (Date YY/MM/DD)”