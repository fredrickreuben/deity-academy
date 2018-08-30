'use strict'

/*
|--------------------------------------------------------------------------
| StreamSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')

class StreamSeeder {
  async run () {
    const streams = await Factory.model('App/Models/Stream').createMany(4)
  }
}

module.exports = StreamSeeder
