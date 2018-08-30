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
    email: 'superadmin@deity.academy',
    phone: '+254714707323',
    password: await Hash.make('6A$2N3F2gfw*WJ5q'),
    is_active: true,
    is_staff: true,
    is_super_admin: true,
    pin: await Hash.make('1013'),
  }
})

Factory.blueprint('App/Models/Department', faker => {
  return {
    name: faker.word()
  }
})

Factory.blueprint('App/Models/Stream', faker => {
  return {
    name: faker.word()
  }
})
