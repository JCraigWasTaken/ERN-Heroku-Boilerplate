# Starting a new project

1. Create a color and font theme
2. Create a 512x512 favicon png and call it "favicon.png"
3. Create a maskable 512x512 favicon by uploading your favicon to https://maskable.app/editor and redownloading it. Call this icon "favicon_maskable.png"
4. Update ./dev-frontend/src/css/colors.css with your color information
5. Update ./dev-frontend/src/pwa/manifest.json
   - Add color information to theme_color and background_color
   - Add a png of your favicon to ./dev-frontend/src/media
   - Add a png of your maskable favicon to ./dev-frontend/src/media
6. Download font files and put them into ./dev-frontend/src/fonts/{font-name}
7. Update ./dev-frontend/src/css/fonts.css with your font information
8. Update index.html project specific meta tags
   - viewport
   - description
   - author
   - title

# Development

## Installing dependencies

This boilerplate treats the React front-end, and Express back-end as seperate applications. Because of this, if you would like to install dependencies specific to the front-end or back-end you must first navigate to their respective folders.

## Local development

- Navigate to the root directory of the project in a command line terminal and run “npm run devStart”.

- To end the running website, hit cmd c in the command line terminal where you were running the application

## Adding new front-end pages

1. Ensure the route for the page is not already used in the front-end or the back-end
2. Add a new folder to dev-frontend/src/pages with the name of the page in lower case
3. In the new folder, add a file called {page-name}Page.js and add a components folder
4. Create a basic component to be exported in {page-name}Page.js
5. Navigate to dev-frontend/src/routeManager.js and import the component from {page-name}Page.js
6. Add a key value pair to the routes object defined in dev-frontend/src/routeManager.js. The key should be equal to the route with a leading "/"

## Adding new back-end routes

1. Ensure the route for the page is not already used in the front-end or the back-end
2. Add a new route to the "Routes" section of backend/server.js
3. Navigate to dev-frontend/buildEnvConfigs/webpack.dev.js and add a new key value pair to the devServer.proxy object. The key should be the endpoint with a leading "/, and the value should be "http://localhost:5000"

## Production build testing

- Navigate to the root directory of the project in a command line terminal and run "npm run build". Wait for the build to finish running. In the same command line terminal line run "npm run start". Navigate to "localhost:5000" in your web browser and you should see the production build of the application.

- To end the running website, hit cmd c in the command line terminal where you were running the application

# Version control and deployment

(see Github Flow https://guides.github.com/introduction/flow/)

- Create a feature branch off the master branch ‘named feature/name’
- Work on that branch committing semi-regularly/whenever a distinct part of the feature is complete to make code review easier
- Once a feature is complete, create a pull request to merge the code with the master branch, this will trigger a build in the Heroku pipeline and create a staging build.
- Wait for code review, staging build on heroku.
- Tag the new node on master with the name of the staging build
- Once a production release is ready, review most recent staging build on Heroku. If it is stable, promote to production and then add a tag to the node with this format: “Production Version XX (Date YY/MM/DD)”
