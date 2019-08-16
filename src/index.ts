import request = require('request');
import * as cheerio from 'cheerio';

interface Fine {
  plate: string;
  rut: string;
  name: string;
  fine: string;
  year: string;
  reason: string;
  location: string;
}

const alphanumRegex = /^([0-9]|[a-z]|[A-Z])+$/;
const validPlateRegex = /^((([a-z]|[A-Z]){2}[0-9]{4})|(([a-z]|[A-Z]){4}[0-9]{2}))$/;

export async function verify(
  regPlate: string,
  rut: string | number,
): Promise<Fine[]> {
  const keys = ['plate', 'rut', 'name', 'fine', 'year', 'reason', 'location'];

  if (regPlate) {
    if (typeof regPlate !== 'string') {
      throw 'Invalid input type';
    }

    regPlate = regPlate.trim();

    // check if plate only contains alphanumeric characters
    if (!regPlate.match(alphanumRegex)) {
      throw 'Plate contains invalid characters';
    }
    // normalize motorcycle plates
    if (regPlate.length === 5) {
      regPlate = regPlate.slice(0, 2) + '0' + regPlate.slice(2, 5);
    }

    if (regPlate.length !== 6) {
      throw 'Invalid plate length';
    }

    if (!regPlate.match(validPlateRegex)) {
      throw 'Plate has invalid format. (ABCD12, AB1234 or AB123)';
    }
  }

  return await new Promise((resolve, reject) => {
    request(
      {
        method: 'GET',
        rejectUnauthorized: false,
        url: `https://www.sem.gob.cl/pcirc/buscar_multas.php?&tipo=0&patente=${regPlate ||
          0}&rut=${rut || 0}`,
      },
      function(err, res, body) {
        if (err) {
          reject(err);
        }

        if (res.statusCode === 200) {
          const $ = cheerio.load(body);
          const fines: Fine[] = [];
          $('table.tabla > tbody > tr').each(function(
            i: number,
            element: CheerioElement,
          ) {
            const values = element.children
              .filter(c => c.name === 'th')
              .map(e => e.children[0].data);
            fines.push(keys.reduce(
              (obj, key, index) => ({ ...obj, [key]: values[index] }),
              {},
            ) as Fine);
          });
          resolve(fines);
        } else {
          reject('Error retrieving data');
        }
      },
    );
  });
}
