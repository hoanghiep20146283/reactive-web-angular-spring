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

### Adding Angular Material
```bash
npx nx generate @angular/material:ng-add --project=webapp --typography false --theme indigo-pink --animations true
```

After install, add the Angular material theming CSS file of your choice to the styles array
of [project.json](./packages/webapp/project.json). For example:
> "node_modules/@angular/material/prebuilt-themes/indigo-pink.css"

Options are `indigo-pink.css`, `deeppurple-amber.css`, `pink-bluegrey.css` and `purple-green.css`

## Running Angular Websocket UI
npx nx serve --project=webapp

## Running NodeJS Websocket Service
npx nx serve server

# Running Angular essential examples
ng serve
