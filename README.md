# Recipes App 🧑‍🍳

## Overview 💡

The Recipe App allows you to search for food and drinks. In addition to discovering interesting details about dishes from around the world, you can also make them by following a detailed step-by-step guide. You can favorite recipes or view recipes you have already made.

This app uses the browser's [local storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) and [Redux Toolkit](https://redux-toolkit.js.org/) for handling data storage. Therefore, do not provide any sensitive data as it will be stored in your browser.

### APIs used 🌐

Both APIs work quite similarly; the difference is that one provides food recipes and the other drinks.

- [The Meal DB](https://www.themealdb.com/)
- [The Cocktail DB](https://www.thecocktaildb.com/)

## Main technologies used 🧰

<img
    alt="Static Badge"
    src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" 
    style="margin-bottom: 4px;" 
    height="30px" 
/>
<img
    alt="Static Badge"
    src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" 
    style="margin-bottom: 4px;" 
    height="30px"
/>
<br>
<img 
    alt="Static Badge" 
    src="https://img.shields.io/badge/Redux%20Toolkit-%23764ABC?style=for-the-badge&logo=redux&logoColor=white"
    style="margin-bottom: 4px;"
    height="30px"
/>
<img 
    alt="Static Badge" 
    src="https://img.shields.io/badge/React%20Router%20v6-%23CA4245?style=for-the-badge&logo=React%20Router&logoColor=white"
    style="margin-bottom: 4px;"
    height="30px"
/>
<br>
<img 
    alt="Static Badge" 
    src="https://img.shields.io/badge/React%20Bootstrap-%2341E0FD?style=for-the-badge&logo=React%20Bootstrap&logoColor=black"
    style="margin-bottom: 4px;"
    height="30px"
/>
<img 
    alt="Static Badge" 
    src="https://img.shields.io/badge/Sass-%23CC6699?style=for-the-badge&logo=Sass&logoColor=white"
    style="margin-bottom: 4px;"
    height="30px"
/>
<br>
<img
    alt="Static Badge"
    src="https://img.shields.io/badge/Testing%20Library-%23E33332?style=for-the-badge&logo=testinglibrary&logoColor=white" 
    style="margin-bottom: 4px;" 
    height="30px"
/>
<img
    alt="Static Badge"
    src="https://img.shields.io/badge/vitest-%236E9F18?style=for-the-badge&logo=vitest&logoColor=white"
    style="margin-bottom: 4px;" 
    height="30px"
/>

## Running the application ⚙️

1. Clone and enter the repository:

   ```sh
   git clone git@github.com:ImVictorM/Recipes-App.git && cd Recipes-App
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Start the application:

- To start in development mode:

  ```sh
  npm run dev
  ```

- To start in production mode:
  ```sh
  npm run build && npm run preview
  ```

## Testing 🛠️

- Running all tests:
  ```sh
  npm test
  ```
- Running a specific test:
  ```sh
  npm test -t {test_file_name}
  ```
- Running tests from a directory:
  ```sh
  npm test --dir {path/to/directory}
  ```
- Running page tests:
  ```sh
  npm run test:pages
  ```
- Running component tests:
  ```sh
  npm run test:components
  ```
- Running test coverage:
  ```sh
  npm run test:coverage
  ```
- Running tests in the browser:
  ```sh
  npm run test:ui
  ```
