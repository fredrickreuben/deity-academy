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

const Factory = use('Factory')
const Hash = use('Hash')
const RandomString = require('random-string')

Factory.blueprint('App/Models/User', async (faker) => {
  return {
    email: 'admin@deity.academy',
    phone: '+254714707323',
    password: await Hash.make('6A$2N3F2gfw*WJ5q'),
    is_active: true,
    is_staff: true,
    is_admin: true,
    pin: await Hash.make('1013'),
  }
})
