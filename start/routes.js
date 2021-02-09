'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route
  .resource('/', 'DashboardController')
  .apiOnly()
  .middleware(new Map([
    [['store', 'update', 'destroy'], ['auth']],
  ]))
Route.post('auth/login', 'AuthController.login')
  .validator('AuthLogin')


//school setting route
Route
.resource('settings/school', "SchoolController")
.apiOnly()
.middleware(new Map([
  [['store', 'update', 'destroy'], ['auth']],
  [['store', 'update', 'destroy'], ['roles']]
]))
.validator(new Map([
  [['settings/school.store'], ['School']],
  [['settings/school.update'], ['School']]
]))

//administrative routes
Route
.resource('administration/year', "YearController")
.apiOnly()
.middleware(new Map([
  [['store', 'update', 'destroy'], ['auth']],
  [['store', 'update', 'destroy'], ['roles']]
]))
.validator(new Map([
  [['administration/year.store'], ['Year']],
  [['administration/year.update'], ['Year']]
]))

Route
.resource('administration/term', "TermController")
.apiOnly()
.middleware(new Map([
  [['store', 'update', 'destroy'], ['auth']],
  [['store', 'update', 'destroy'], ['roles']]
]))
.validator(new Map([
  [['administration/term.store'], ['Term']],
  [['administration/term.update'], ['Term']]
]))