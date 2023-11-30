## React-Express app showing results from backend project playwright-scraper

The app show a list of repositories about **climatechange** topic and it is up on-line at https://react-node-scraper.fly.dev/.   
   
The data is scraped with the Nodejs application https://github.com/pcolt/playwright-scraper.

<!-- ![App screenshot](/public/react-express-1.png "App screenshot") -->
<div >
<img src="/public/react-express-1.png" alt="App screenshot 1" title="App screenshot 1" height="400"/>
<img src="/public/react-express-2.png" alt="App screenshot 2" title="App screenshot 1" height="400"/>
</div>
<!-- ![App screenshot](/public/react-express-2.png "App screenshot") -->

## Usage

Start frontend in dev:   
`npm run vite:dev`

Start backend in development mode (auto-starts on change):   
`npm run backend:dev`

##### Lint + Tests

Run eslint over backend and frontend JS files:
`npm run lint`

Run tests over backend files:
`npm run test:back`

Run tests over frontend files:
`npm run test:front`

Run tests over frontend files with coverage report (open in browser [coverage/lcov-report/index.html](coverage/lcov-report/index.html)):
`npm run test:front -- --coverage --collectCoverageFrom='src/**/*.{jsx,js}'`

Run tests over both front and backend including coverage (open in browser [coverage/lcov-report/index.html](coverage/lcov-report/index.html)):
`npm run tests`

Run e2e tests with cypress
launch frontend with `npm run vite`, and backend in testing mode `npm run backend:test`, finally launch cypress `npm run cypress:open`   
or run cypress from command line `npm test:e2e`

##### Build + Deploy

Build frontend React via Vite:   
`npm run build`

Build frontend and deploy whole app on Fly.io and watch at https://react-node-scraper.fly.dev/:   
`npm run build:full`

Only deploy (does not re-build frontend) on Fly.io:   
`npm run deploy`

Scale down Fly.io deployment to one machine:
`fly scale count 1`

Watch logs of production machine on Fly.io:
`fly logs`

##### VSCode REST Client

HTTP requests to the express endpoints are in `requests` folder (Installation of VSCode plugin REST Client is required).
To change environment variables ([.vscode/settings.json](.vscode/settings.json)) from 'local' to 'production' press:
`ctrl+alt+e`

## Install

##### Install dependencies
Clone the repository in your local folder and run `npm install`

##### Configure secret/environment variables
- In the root folder create `.env` file with following keys:   
```
MONGO_URL = 'mongodb+srv://fullstack:MONGODB_FULLSTACK_USER_PASSWORD@cluster0.ck2n2.mongodb.net/repos?retryWrites=true&w=majority'
PORT = 3001
SECRET = 'JSONWEBTOKEN_SIGNATURE'
REDIS_URL = 'redis://default:MONGODB_DEFAULTUSER_PASSWORD@redis-12236.c300.eu-central-1-1.ec2.cloud.redislabs.com:12236'
```
- Set sensitive data as Fly.io secrets with commands:   
`fly secrets set MONGO_URL='mongodb+srv://fullstack:MONGODB_FULLSTACK_USER_PASSWORD@cluster0.ck2n2.mongodb.net/repos?retryWrites=true&w=majority'`
`fly secrets set SECRET='JSONWEBTOKEN_SIGNATURE'`
`fly secrets set REDIS_URL='redis://default:MONGODB_DEFAULTUSER_PASSWORD@redis-12236.c300.eu-central-1-1.ec2.cloud.redislabs.com:12236'`
- In order to use REST CLIENT http requests, create a folder `.vscode` in the root of the project and create a file inside named `settings.json`

## Dependencies 

### Mongodb atlas

##### Connect via web app
https://account.mongodb.com/

### Redis cloud

##### Connect via the official web app

https://app.redislabs.com/ 

##### Connect via terminal
Use the Connect button from the web app which will provide something like this:
`redis-cli -u redis://default:REDIS_DEFAULTUSER_PASSWORD@redis-12236.c300.eu-central-1-1.ec2.cloud.redislabs.com:12236`

Once you are connected, check open and running pub.sub channels with:
`PUBSUB CHANNELS`

### React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## References

The project is based on the materials from Helsinki University's Full Stack Open course [part 1](https://fullstackopen.com/en/part1/), [part 2](https://fullstackopen.com/en/part2/), [part 3](https://fullstackopen.com/en/part3/), [part 4](https://fullstackopen.com/en/part4/), [part 5](https://fullstackopen.com/en/part5/), [part 6](https://fullstackopen.com/en/part6/).
