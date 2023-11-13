## React-Express app showing results from backend project playwright-scraper

The app show a list of repositories about **climatechange** topic and it is up on-line at https://react-node-scraper.fly.dev/.   
   
The data is scraped with the Nodejs application https://github.com/pcolt/playwright-scraper.
   
The project is based on the materials from Helsinki University's Full Stack Open course [part 1](https://fullstackopen.com/en/part1/), [part 2](https://fullstackopen.com/en/part2/), [part 3](https://fullstackopen.com/en/part3/).

### Usage

Start frontend in dev:   
`npm run vite:dev`

Build frontend:   
`npm run build`

Start backend in development mode (auto-starts on change):   
`npm run backend:dev`

Run eslint over backend and frontend JS files:
`npm run lint`

Run tests over backend files:
`npm run backend:test`

Build frontend React via Vite:   
`npm run build`

Build frontend and deploy whole app on Fly.io and watch at https://react-node-scraper.fly.dev/:   
`npm run build:full`

Only deploy (does not re-build frontend) on Fly.io:   
`npm run deploy`

Scale down Fly.io deployment to one machine:
`fly scale count 1`

Watch logs of production machine on Fly.io:
`fly apps list`
`fly logs NAME_OF_THE_APP`

## Install

- Clone the repository in your local folder and run `npm install`
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

## React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
