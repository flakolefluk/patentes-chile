var request = require('request')
var cheerio = require('cheerio')

exports.verify = regPlate => {

    return new Promise((resolve, reject) => {

        if (typeof regPlate != 'string') {
          reject('Invalid type')
        }

        regPlate = regPlate.trim()

        // check if plate only contains alphanumeric characters
        if (!regPlate.match(/^([0-9]|[a-z]|[A-Z])+$/)) {
          reject('Input contains invalid characters')
        }
        // normalize motorcycle plates
        if (regPlate.length === 5) {
          regPlate = regPlate.slice(0, 2) + '0' + regPlate.slice(2, 5)
        }

        if (regPlate.length !== 6) {
          Promise.reject('Invalid input length')
        }

        // check correct plate format
        if (!regPlate.match(/^((([a-z]|[A-Z]){2}[0-9]{4})|(([a-z]|[A-Z]){4}[0-9]{2}))$/)) {
          return cb ?
            cb('Input has invalid format. (ABCD12, AB1234 or AB123)', null) :
            Promise.reject('Input has invalid format. (ABCD12, AB1234 or AB123)')
        }

        request.post('http://consultamultas.srcei.cl/ConsultaMultas/buscarConsultaMultasExterna.do', {
          form: {
            ppu: regPlate
          }
        }, function(err, res, body) {
          if (err) {
            reject('There was an error with the request')
          }

          if (res.statusCode === 200) {
            body = body.replace(/(\r\n|\n|\r)/gm, '')
              .replace(/ +(?= )/g, '')
            $ = cheerio.load(body)
            var fines = []
            $('#busqueda > table > tr:nth-child(3) > td:nth-child(2) > table > tr')
              .each(function(i, element) {
                if (i > 0) {
                  fines.push({
                    jpl: $(this)
                      .children()
                      .first()
                      .text(),
                    rol: $(this)
                      .children()
                      .last()
                      .text()
                  })
                }
              })
            resolve({
              fines
            })
          } else {
            reject('Server error')
          }
        })
})
}
