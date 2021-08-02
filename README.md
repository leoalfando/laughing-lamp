<h1 align="center">laughing-lamp</h1>
Application to come out packaged items with most efficient weight and cost.

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Installation](#installation)
- [Input File Format !IMPORTANT!](#input-file-format)
  - [Step 1: Set up the Development Environment](#step-1-set-up-the-development-environment)
  - [Step 2: Install dependencies](#step-2-install-dependencies)
  - [Step 3: Running Locally](#step-3-running-locally)
- [Usage Tutorial](#usage-tutorial)
- [Features](#features)
  - [Express](#express)
  - [Typescript](#typescript)
  - [EsLint](#EsLint)
- [License](#license)
## Input File Format !IMPORTANT!
**example file**<br/>
10 : (1,53.38,€45) (2,88.62,€98) (3,78.48,€3)<br/>
8 : (1,15.3,€34)<br/>
10 : (1,85.31,€29) (2,14.55,€74) (3,3.98,€16)<br/ >
20 : (1,90.72,€13) (2,33.80,€40) (3,43.15,€10)<br/>
<br/>

**example file**<br/>
mw : (i,w,c) (i,w,c)<br/>
mw = max weight capacity<br/>
i = item index capacity<br/>
w = item weight<br/>
c = item cost<br/>

**Constraints**<br/>
-maximum number of item per line: 15<br/>
-maximum weight capacity : 100<br/>
-maximum weight and cost of item : 100<br/>

## Installation

Clone this repo to your local machine.

### Step 1: Set up the Development Environment

You need to set up your development environment before you run the application.

**Install [Node.js and NPM](https://nodejs.org/en/download/)**
- on OSX use [homebrew](http://brew.sh) `brew install node`
- on Windows use [chocolatey](https://chocolatey.org/) `choco install nodejs`

> NOTE : If you work with a mac, we recommend to use homebrew for the installation.

### Step 2: Install dependencies
**Install the dependencies**<br/>
Navigate to the **Main folder** directory and run the below command in your terminal :
```bash
$ npm install
```

### Step 3: Running Locally
**start the application**<br/>
Navigate to the **Main folder** directory and run the below command in your terminal :
```bash
$ npm run build
```
then
```bash
$ npm run start:dev
```

## Usage Tutorial
navigate to http://localhost:3000/api/{fileName}
> NOTE: port can be change, please navigate to index.ts and update the port then rebuild
## Error Status
FILE_NOT_FOUND_OR_INVALID = File not found or invalid
FILE_IS_EMPTY = Empty file
MAXIMUM_WEIGHT_CAPACITY_EXCEEDED = Package capacity should not more than the limit (100)
MAXIMUM_ITEM_WEIGHT_EXCEEDED = item weight should not more than the limit (100)
MAXIMUM_ITEM_COST_EXCEEDED = item cost should not more than the limit (100)
MAXIMUM_ITEM_NUMBER_EXCEEDED = number of item should not more than the limit (15) per line

## Features

### Express

Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

### Typescript

TypeScript is an open-source programming language developed and maintained by Microsoft. It is a strict syntactical superset of JavaScript, and adds optional static typing to the language. TypeScript is designed for development of large applications and transcompiles to JavaScript.

### EsLint

EsLint is an extensible static analysis tool that checks TypeScript code for readability, maintainability, and functionality errors


## License

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

- **[MIT license](http://opensource.org/licenses/mit-license.php)**
