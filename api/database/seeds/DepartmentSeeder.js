'use strict'

/*
|--------------------------------------------------------------------------
| DepartmentSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')

class DepartmentSeeder {
  async run () {
    const departments = await Factory.model('App/Models/Department').createMany(5)
  }
}
module.exports = DepartmentSeeder
