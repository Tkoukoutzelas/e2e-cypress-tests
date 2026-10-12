# E2E Cypress Tests

This repository contains Cypress end-to-end tests for the Thinking Tester Contact List public application.

## Features
- **Page Object Model** with clean separation of concerns
- Tests split into API and UI layers
- Faker-powered data generation
- Reusable request bodies, constants and API helper functions

## Project structure
```
├── cypress/
│   ├── api/
│   │   ├── body/      
│   │   ├── constants/     
│   │   └── helpers/       
│   ├── e2e/
│   │   ├── api/           
│   │   └── ui/            
│   ├── pageObjects/
│   │   ├── Login/         
│   │   └── Contacts/      
│   └── support/           
├── cypress.config.js
└── README.md
```


---

## Setup & Installation

```bash
# 1. Clone the repo
git clone 

# 2. Install dependencies
npm install

# 3. Install Cypress
npm install cypress --save-dev
```
---


## How to run the tests

```bash
# 1. Open Cypress
npx cypress open

# 2. Select E2E Tests

# 3. Select a browser of your choice

#4 Run the tests inside the api and ui folders
```
