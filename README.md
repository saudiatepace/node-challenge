# Getting to Philosophy Challenge

This project is about an api that will return a list of page title until you have reach the Philosophy page in Wikipedia using [NodeJS](https://nodejs.org/en/).

## Getting Started

To get you started you can simply clone the node-challenge repository and install the dependencies:

### Prerequisites

You need git to clone the node-challenge repository. You can get git from
[https://github.com/saudiatepace/node-challenge/](https://github.com/saudiatepace/node-challenge).

You must have node.js and its package manager (npm) installed.  You can get them from [http://nodejs.org/](http://nodejs.org/).

Also, you need to install postman to test the api. Check this link [https://www.getpostman.com/apps](https://www.getpostman.com/apps).

### Clone node-challenge

Clone the node-challenge repository using [git](http://gitref.org/creating/#clone):

```
git clone https://github.com/saudiatepace/node-challenge/
cd node-challenge
```

### Install Dependencies

We have tool dependency in this project.  This tool help
us manage and test the application.

* We get the tools we depend upon via `npm`, the [node package manager](https://docs.npmjs.com/).

```
npm install
```

You should find that you have the new folder in your project.

* `node_modules` - contains the npm packages for the tools we need

## Project Structure

```
nodeChallenge/          --> project folder name
  routes                --> route files storage
    getPhilosophy.js/   --> file that serves as the route for getting philosophy api
     index.js           --> main file for the routes
  .editorconfig         --> reference for editor code spacing and indentions
  .eslintignore         --> specifies the files to be ignored from eslint
  .gitattribute         --> auto detect text files and perform LF normalization
  app.js                --> main file that execute and runs the server
  package.json          --> file that ensures the right version of the package is being installed
  README.md             --> serves as the documentation of the project
```

### Running the Application

We have preconfigured the project with a simple development web server. The simplest way to start this server is:

```
npm start
```

Now, notice that your server is already running in http://localhost:8000.

There are three ways in running this project - via Postman, curl command or browser.

## Running the application via POSTMAN

* Select `GET` method

* Type this url in the request URL field
```
localhost:8000/getPhilosophy
```
* Click Params and enter this:
```
{
  key : title
  value : any value you want to test ( e.g. Wikipedia:Getting to Philosophy)
}
```
* Click send button

## Running the application via curl command

* Type this command in the terminal

```
curl -G "http://localhost:8000/getPhilosophy" --data-urlencode "title=<any data you want to search> (e.g. Wikipedia:Getting to Philosophy)"
```

## Running the application via Browser ( e.g. Firefox )

* Type this url in the search address field
```
localhost:8000/getPhilosophy/title=<any data you want to search>(e.g. Mathematics)
```

While waiting for the response, check your terminal. List of the visited page titles before it reaches to Philosophy were displayed.

## Ouput in Postman

The output in postman will be displayed in JSON format.

Example Ouput:

```
{
  "0": "Wikipedia:Getting to Philosophy",
  "1": "Point and click",
  "2": "User (computing)",
  "3": "Computer",
  "4": "Computer programming",
  "5": "Computing",
  "6": "Mathematics",
  "7": "Quantity",
  "8": "Property (philosophy)",
  "9": "Philosophy"
}
```
