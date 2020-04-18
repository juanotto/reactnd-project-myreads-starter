# MyReads Project

Application developed as part of udacity's react nanodegree program (https://www.udacity.com/course/react-nanodegree--nd019). It is forked from the template project in https://github.com/udacity/reactnd-project-myreads-starter.

## How to run the project

* install the project dependencies with `npm install`
* start the development server with `npm start`

Starting the project should open it on your default web browser. If that does not happen, check the output given by `npm`. If it was successful it will look like:
```
You can now view myreads-app in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.1.131:3000
```
you can access it using the `local` URL shown.

## Backend Server

The backend for this project was provided by the instructors. The code that access the API used is in [`BooksAPI.js`](src/BooksAPI.js).

# Selected extracts from the original documentation

## Important
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).
