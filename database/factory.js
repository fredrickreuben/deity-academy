'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Hash = use('Hash')

Factory.blueprint('App/Models/User', async (faker) => {
  return {
    username: 'FredrickReuben',
    phone: '0714707323',
    email: 'admin@deity.academy',
    password: '6A$2N3F2gfw*WJ5q',
    is_active: true,
    is_staff: false,
    is_admin: false,
    is_super_admin: true,
  }
})
