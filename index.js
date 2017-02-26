var request = require('request')
var cheerio = require('cheerio')

exports.verify = function (regPlate, cb) {
// trim
  regPlate = regPlate.trim()
// check if plate only contains alphanumeric characters
  if (!regPlate.match(/^([0-9]|[a-z]|[A-Z])+$/)) {
    return cb('Input contains invalid characters', null)
  }

// normalize motorcycle plates
  if (regPlate.length === 5) {
    regPlate = regPlate.slice(0, 2) + '0' + regPlate.slice(2, 5)
  }

  if (regPlate.length !== 6) {
    return cb('Invalid input length', null)
  }

// check correct plate format
  if (!regPlate.match(/^((([a-z]|[A-Z]){2}[0-9]{4})|(([a-z]|[A-Z]){4}[0-9]{2}))$/)) {
    return cb('Input has invalid format. (ABCD12, AB1234 or AB123)', null)
  }

  request.post('http://consultamultas.srcei.cl/ConsultaMultas/buscarConsultaMultasExterna.do', {form: {ppu: regPlate}}, function (err, res, body) {
    if (err) {
      return cb('There was an error with the request', null)
    }
    if (res.statusCode === 200) {
      body = body.replace(/(\r\n|\n|\r)/gm, '').replace(/ +(?= )/g, '')
      $ = cheerio.load(body)
      var thisYearFines = []
      var currentFines = []
      var hasFines = $('#busqueda > table > tr:nth-child(3) > td:nth-child(1) > div.mensajes').text() !== 'Para el permiso de circulación 2017, no se registran multas.' || $('#busqueda > table > tr:nth-child(3) > td:nth-child(2) > div.mensajes').text() !== 'No registra multas en la base del SRCeI.'
      if (hasFines) {
        $('#busqueda > table > tr:nth-child(3) > td:nth-child(1) > table > tr').each(function (i, element) {
          if (i > 0) {
            thisYearFines.push({jpl: $(this).children().first().text(), rol: $(this).children().last().text()})
          }
        })
        $('#busqueda > table > tr:nth-child(3) > td:nth-child(2) > table > tr').each(function (i, element) {
          if (i > 0) {
            currentFines.push({jpl: $(this).children().first().text(), rol: $(this).children().last().text()})
          }
        })
      }
      var result = {hasFines: hasFines, thisYearFines: thisYearFines, currentFines: currentFines}
      return cb(null, result)
    } else {
      return cb('Server error', null)
    }
  })
}
