# patentes-chile

[![npm version](https://badge.fury.io/js/patentes-chile.svg)](https://badge.fury.io/js/patentes-chile) [![Build Status](https://travis-ci.org/flakolefluk/patentes-chile.svg?branch=master)](https://travis-ci.org/flakolefluk/patentes-chile)

## Synopsis

This module will help you verify if chilean vehicle registration plates have fines

## Breaking changes in v2.0.0

* Use promises instead of callbacks


## Code Example

Sample usage:
```
var plate = require('patentes-chile')

plate.verify('bgpw29').then(console.log)
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
