'use strict'

/*
|--------------------------------------------------------------------------
| FeeCategorySeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Database = use('Database')

class FeeCategorySeeder {
  async run () {
    await Database.table('fee_categories').truncate()
    await Database.table('fee_categories').insert([
      {
        slug: "activity",
        name: "Activity",
      },
      {
        slug: "lunch",
        name: "Lunch",
      },
      {
        slug: "transport",
        name: "Transport",
      }
    ])
  }
}

module.exports = FeeCategorySeeder
