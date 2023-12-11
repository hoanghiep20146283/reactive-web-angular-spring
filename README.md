# reactive-web-angular-spring
Building a Reactive App with Angular and Spring Boot 2

# Building a Reactive App with Angular and Spring Boot 2

# WebSocket Communications with Node and Angular
## Generate a component 
npx nx generate component

## Create shared data library
npx nx g @nx/js:lib types

### Creating the Websocket Server
```bash
npx nx generate @nrwl/node:app server
```

## Creating the Angular Web Application
```bash
npx nx generate @nrwl/angular:app webapp --backendProject server --strict false --style scss --routing false
```

## Adding Angular Material
```bash
npx nx generate @angular/material:ng-add --project=webapp --typography false --theme indigo-pink --animations true
```

## Running Angular Websocket Application
npx nx serve --project=webapp

# Running Angular essential examples
ng serve
