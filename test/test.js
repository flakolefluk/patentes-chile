var plate = require('../index.js')
var expect = require('chai').expect
var lowerCaseMask = 'abcdefghijklmnopqrstuvwxyz'
var upperCaseMask = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
var digitMask = '0123456789'

function randomString (chars) {
  var result = ''
  for (var i = 0; i < chars.length > 0; i++) {
    if (chars[i] === 'a') {
      result += lowerCaseMask[Math.floor(Math.random() * lowerCaseMask.length)]
    } else if (chars[i] === 'A') {
      result += upperCaseMask[Math.floor(Math.random() * upperCaseMask.length)]
    } else if (chars[i] === '#') {
      result += digitMask[Math.floor(Math.random() * digitMask.length)]
    } else {
      result += lowerCaseMask[Math.floor(Math.random() * lowerCaseMask.length)]
    }
  }
  return result
}

describe('registration plate verifier', function () {
  this.timeout(15000)
// TODO: test random plates
})
