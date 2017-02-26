# rut-verifier

[![npm version](https://badge.fury.io/js/rut-verifier.svg)](https://badge.fury.io/js/rut-verifier) [![Build Status](https://travis-ci.org/flakolefluk/rut-verifier.svg?branch=master)](https://travis-ci.org/flakolefluk/rut-verifier)

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
    //print fines for current year (currently fines until november 30th 2016)
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
