'use strict'

/*
|--------------------------------------------------------------------------
| IdentifierSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Database = use('Database')

class IdentifierSeeder {
  async run () {
    await Database.table('identifiers').truncate()
    await Database.table('identifiers').insert([
      {
        name: "KRA PIN",
      },
      {
        name: "NSSF NO",
      },
      {
        name: "NHIF NO",
      }
    ])
  }
}

module.exports = IdentifierSeeder
