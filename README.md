# rut-verifier

[![npm version](https://badge.fury.io/js/patentes-chile.svg)](https://badge.fury.io/js/patentes-chile) [![Build Status](https://travis-ci.org/flakolefluk/patentes-chile.svg?branch=master)](https://travis-ci.org/flakolefluk/patentes-chile)

## Synopsis

This module will help you verify if chilean vehicle registration plates have fines

## Code Example

Sample usage:
```
var plate = require('patentes-chile')

plate.verify('bgpw29', function (err, data) {
  if (err) {
    return console.error(err)
  }
  if (!data.hasFines) {
    console.log('No posee multas')
  } else {
    //print fines for 2017's permit (fines until november 30th 2016)
    console.log(data.thisYearFines)

    //print up to date fines
    console.log(data.currentFines)
  }
})
```

## Installation

Install the dependency
```
npm install patentes-chile --save
```

## Tests

Coming soon...

## Connect with the author

Email me to flakolefluk@gmail.com

## Contributors

If you want to contribute, open a new issue or fork the repository and add a pull request

## License

Read LICENSE.md
