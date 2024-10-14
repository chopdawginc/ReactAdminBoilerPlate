# Tools/Technologies used

React + Vite + Typescript
Material UI
Firebase
Tailwind CSS
React Hook Form + Yup
React Router DOM (latest version)
Dayjs

# Setup Guide

1.⁠ ⁠Clone the Repository  
 Clone the repository to your local machine.

2.⁠ ⁠Install pnpm  
 If you don't have pnpm installed, you can install it by running:
⁠ npm install -g pnpm ⁠

3.⁠ ⁠Install Dependencies  
 Navigate to the root directory of the project:  
 ⁠ cd your-project-directory ⁠  
 Then, install all dependencies by running:  
 ⁠ pnpm install ⁠

4.⁠ ⁠Add Environment Variables  
 Create a ⁠ .env ⁠ file in the root directory. Add all the necessary Firebase environment variables used in ⁠ src/libs/firebase ⁠. Ensure all required keys are present.

5.⁠ ⁠Run the Project  
 To start the project, run:  
 ⁠ pnpm dev ⁠

Your project should now be up and running!

<======================================================================================================>

1. Which specific flavor of react is being used, like, is it pure reactjs or vitejs or nextjs.

   In this particular boilerplate, VITE has been used. (React + TypeScript + Vite)

2. How the folder structure is done, which folder is responsible for what.

   1. assets: Contains static assets like images, audio files, fonts, or other media files used in the project.

   2. components: Holds reusable UI components that can be used across different parts of the application. These could be elements like buttons, form fields, or any other small, self-contained parts of the UI.

   3. constants: Stores constants values or configurations that remain the same throughout the application, such as API URLs, configuration settings,colors, and other static data.

   4. contexts: Contains React Context files, used to manage and provide global state across the app (e.g., user authentication state, theme settings).

   5. core: Contains core modules/files that are essential for the application’s functioning. (e.g., App, Routes)

   6. hocs (Higher-Order Components): Stores higher-order components, which are functions that take a component and return a new version of it.

   7. hooks: Contains custom React hooks, which are reusable functions that encapsulate logic for specific functionalities (e.g., fetching data, modals etc).

   8. layouts: Manages layout components that control the structure of pages, such as headers, footers, sidebars, or wrappers for different sections of the app.

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

   Step-2: Add your environment variables in the .env file, and prefix each variable name with VITE\_.

   Example .env file:
   VITE_API_URL=https://your-api-url.com
   VITE_API_KEY=your-api-key

   Step-3: Access Environment Variables in Your Code

   Example:
   const apiUrl = import.meta.env.VITE_API_URL;
   const apiKey = import.meta.env.VITE_API_KEY;
   console.log("API URL:", apiUrl);
   console.log("API Key:", apiKey);
