'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

const Route = use('Route')

Route.group(() => {
  Route
    .resource('users', 'UserController')
    .only(['index', 'store', 'show', 'update', 'destroy'])
    .middleware(['auth', 'roles'])
  Route
    .resource('staff', 'StaffController')
    .only(['index', 'store', 'show', 'update', 'destroy'])
    .middleware(['auth', 'roles'])
  Route
    .resource('gurdians', 'GurdianController')
    .only(['index', 'store', 'show', 'update', 'destroy'])
    .middleware(['auth', 'roles'])
  Route
    .post('auth/login', 'AuthController.staff')
})
.domain('api.deity.local')