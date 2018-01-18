
# Heroku Compliance App
Deployment Guide

### Description

## Prerequisites
1. Node 8.9
  1. NPM 5.5


## Configuration
Located under `config/default.json` override production settings in `config/production.json`

- **API_URL** the base API url for backend API. If not set then `http://localhost:3100` will be used. Example value for heroku `https://compliance-api-777.herokuapp.com`.

## Local Deployment
```bash
npm i
npm run dev # dev mode with HMR
npm run build # buld app for production mode
npm start # production mode
```

## Heroku Deployment
```bash
git init
git add .
git commit -m init
heroku create
heroku config:set API_URL=xyz
git push heroku master
heroku open # get the url
```
if you change `API_URL` after pushing, create a dummy commit so the app will rebuild with new URL.  


## Running Lint
```bash
npm run lint
```

## Verification

Live url https://compliance-app-777.herokuapp.com   

#### Error result and standard flow

Truncate job results. Open a console under `compliance-api`:
```
heroku pg:psql;
truncate "JobInfos";
\q
```


http://take.ms/KFN3M  

#### No access
No permission http://take.ms/sF5bY  


#### Non admin
- create new heroku open
- in your old heroku account open team details and click Access https://dashboard.heroku.com/teams/<TEAM_NAME>/access  
- Add a new collaborator with role 'member'
- Accept the invitation from the email

http://take.ms/O2SJn  
"Refresh data " button is not visible

#### Error handling in frontend
- Deploy on localhost
- Open http://localhost:3000/#/reports
- stop the API
- click Refresh data
http://take.ms/NqPQ1
