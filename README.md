1. Which specific flavor of react is being used, like, is it pure reactjs or vitejs or nextjs.

In this particular boilerplate, Create React App (CRA) has been used. This setup provides a pure React.js environment for building the application.

2. How the folder structure is done, which folder is responsible for what.

   1. assets: Contains static assets like images, audio files, fonts, or other media files used in the project.

   2. components: Holds reusable UI components that can be used across different parts of the application. These could be elements like buttons, form fields, or any other small, self-contained parts of the UI.

   3. constant: Stores constant values or configurations that remain the same throughout the application, such as API URLs, configuration settings,colors, and other static data.

   4. context: Contains React Context files, used to manage and provide global state across the app (e.g., user authentication state, theme settings).

   5. core: Contains core modules/files that are essential for the application’s functioning. (e.g., App, Routes)

   6. hocs (Higher-Order Components): Stores higher-order components, which are functions that take a component and return a new version of it.

   7. hooks: Contains custom React hooks, which are reusable functions that encapsulate logic for specific functionalities (e.g., fetching data, modals etc).

   8. layout: Manages layout components that control the structure of pages, such as headers, footers, sidebars, or wrappers for different sections of the app.

   9. libs/firebase: Contains Firebase-specific configuration and service files, such as Firebase initialization and authentication

   10. models: Holds TypeScript or JavaScript model definitions, which define the structure of data objects used across the application, such as database schemas.

   11. modules: Contain feature-specific modules or parts of the application organized by feature (e.g., user module, admin module), each with its own components.

   12. screens: Contains the main screens or pages of the application, such as Home, Profile, or Settings.

   13. services: Holds service files, which usually include functions for handling API requests or interacting with backend services like Firebase, authentication, or data processing.

   14. styles: Contains stylesheets or styling files, often for global styles, theme settings, or CSS files specific to certain parts of the application.

   15. types: Stores TypeScript type definitions or interfaces, which help ensure type safety across the application.

   16. utils: Contains utility functions that are used across different parts of the app. These could be helper functions for formatting data, performing calculations, or handling specific tasks.

   17. validations: Holds validation logic, such as form validations or input validations, ensuring user inputs meet specified requirements.

3. How we can set environment variables ?

   Step-1: Create a file named .env in the root directory of the project (the same level as package.json).

   Step-2: Add your environment variables in the .env file, and prefix each variable name with REACT*APP*.

   Example .env file:
   REACT_APP_API_URL=https://your-api-url.com
   REACT_APP_API_KEY=your-api-key
   REACT_APP_ENV=production

   Step-3: Access Environment Variables in Your Code

   Example:
   const apiUrl = process.env.REACT_APP_API_URL;
   const apiKey = process.env.REACT_APP_API_KEY;
   console.log("API URL:", apiUrl);
   console.log("API Key:", apiKey);

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!
