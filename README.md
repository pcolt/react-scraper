![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
![cypress](https://img.shields.io/badge/-cypress-%23E5E5E5?style=for-the-badge&logo=cypress&logoColor=058a5e)
![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)

## Full Stack Project - Single-page app scraping data from repositories on GitHub 

A single-page app that shows an updated list of the most followed repositories about **climatechange** and other topics on GitHub. This is my final project for the Helsinki University's [Full Stack Open course](https://fullstackopen.com/en/).  
   
The data is scraped with a separate [microservice application](https://github.com/pcolt/playwright-scraper) and stored in a Atlas MongoDB on the cloud. The scraping service can by fired for updates from the main app after login authentication using Redis pub/sub communication.   

### On-line version
Both the applications are deployed to the internet and an on-line version is visible [here](https://react-node-scraper.fly.dev/).   

### Work hours
A list of approximate work hours used to develop the project are listed in [workhours.md](/workhours.md)

<!-- ![App screenshot](/public/react-express-1.png "App screenshot") -->
<div >
  <img src="/public/react-express-1.png" alt="App screenshot 1" title="App screenshot 1" width="900" />
  <div>Main view with scraped repositories</div>
  <img src="/public/react-express-2.png" alt="App screenshot 2" title="App screenshot 1" width="900" />
  <div>Authentication view</div>
  <img src="/public/react-express-3.png" alt="App screenshot 2" title="App screenshot 1" width="900" />
  <div>Fire scraper microservice view</div>
</div>
<!-- ![App screenshot](/public/react-express-2.png "App screenshot") -->

## Usage

Start frontend in dev:   
`npm run front:dev`

Start backend in development mode (auto-starts on change):   
`npm run back:dev`

### Lint + Tests

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
launch frontend with `npm run vite`, and backend in testing mode `npm run back:test`, finally launch cypress `npm run cypress:open`   
or run cypress from command line `npm test:e2e`

### Build + Deploy

Build frontend React via Vite and tsc:   
`npm run build:front`

Compile backend Typescript code:  
`npm run build:back`  

Build the entire app:  
`npm run build`  

Build frontend and deploy whole app on Fly.io and watch at https://react-node-scraper.fly.dev/:   
`npm run deploy:full`

Only deploy (does not re-build frontend) on Fly.io:   
`npm run deploy`

Scale down Fly.io deployment to one machine:
`fly scale count 1`

Watch logs of production machine on Fly.io:
`fly logs`

### Docker 

Docker image is used by Fly.io to deploy the app to the internet.  
It can be also used to run and debug the Docker image locally.  

Build Docker image
`docker build . -t react-scraper`

Run Docker image
`docker run --env MONGO_URL='MONGO_URL_in_.ENV_FILE' --env REDIS_URL='REDIS_URL_in_.ENV_FILE' --env SECRET='SECRET_in_.ENV_FILE' --env PORT=3000 -p 3000:3000 react-scraper`

Docker list of all containers `docker ps -a`  
Restart a container `docker restart [container-id]`  
Follow container logs `docker logs --follow [container-id]`

### VSCode REST Client

HTTP requests to the express endpoints are in `requests` folder (Installation of VSCode plugin REST Client is required).
To change environment variables ([.vscode/settings.json](.vscode/settings.json)) from 'local' to 'production' press:
`ctrl+alt+e`

### Git

Print list of all commits to a .txt file ([Docs](https://git-scm.com/docs/git-log#Documentation/git-log.txt-emHem))  
```bash
git log --reverse --pretty=format:'| %as | 1 | %s |' > log.txt
```

## Install

### Install dependencies
Clone the repository in your local folder and run `npm install`

### Configure secret/environment variables
- In the root folder create `.env` file with following keys:   
```
MONGO_URL = 'mongodb+srv://fullstack:MONGODB_FULLSTACK_USER_PASSWORD@cluster0.ck2n2.mongodb.net/repos?retryWrites=true&w=majority'
TEST_MONGO_URL = 'mongodb+srv://fullstack:MONGODB_FULLSTACK_USER_PASSWORD@cluster0.ck2n2.mongodb.net/test-repos?retryWrites=true&w=majority'
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

The project follows the best practices and examples used in the Helsinki University's Full Stack Open course, especially [part 1](https://fullstackopen.com/en/part1/), [part 2](https://fullstackopen.com/en/part2/), [part 3](https://fullstackopen.com/en/part3/), [part 4](https://fullstackopen.com/en/part4/), [part 5](https://fullstackopen.com/en/part5/), [part 6](https://fullstackopen.com/en/part6/), [part 7](https://fullstackopen.com/en/part7/), [part 9 ](https://fullstackopen.com/en/part9/). It also takes inspiration from examples and guides freely available on the web.
