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

Route.group(() => {

  Route
    .resource('/', 'DashboardController')
    .apiOnly()
    .except(['show'])
    .middleware(new Map([
      [['store', 'update', 'destroy'], ['auth']],
      [['store', 'update', 'destroy'], ['role']]
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
    .resource('settings/administration/term', "TermController")
    .apiOnly()
    .middleware(new Map([
      [['store', 'update', 'destroy'], ['auth']],
      [['store', 'update', 'destroy'], ['roles']]
    ]))
    .validator(new Map([
      [['administration/term.store'], ['Term']],
      [['administration/term.update'], ['Term']]
    ]))

  Route
    .resource('settings/staff.users', "UserController")
    .apiOnly()
    .middleware(new Map([
      [['store', 'update', 'destroy'], ['auth']],
      [['store', 'update', 'destroy'], ['roles']]
    ]))
    .validator(new Map([
      [['administration/staff.term.store'], ['User']],
      [['administration/staff.term.update'], ['User']]
    ]))

  //user management routes
  Route
    .resource('settings/users', "UserController")
    .apiOnly()
    .middleware(new Map([
      [['store', 'update', 'destroy'], ['auth']],
      [['store', 'update', 'destroy'], ['roles']]
    ]))
    .validator(new Map([
      [['settings/users.store'], ['User']],
      [['settings/users.update'], ['User']]
    ]))

  Route
    .resource('settings.staff.users', 'UserController')
    .middleware(new Map([
      [['store', 'update', 'destroy'], ['auth']],
      [['store', 'update', 'destroy'], ['roles']]
    ]))
    .apiOnly()
    .except(['show', 'index'])
    .validator(new Map([
      [['settings.staff.users.store'], ['User']],
      [['settings.staff.users.update'], ['User']]
    ]))

  Route
    .post('settings.staff.users.reset', 'UserController.reset')
    .middleware(['auth', 'roles'])

  //staff routes
  Route
    .resource('staff', "StaffController")
    .middleware(new Map([
      [['store', 'update', 'destroy'], ['auth']],
      [['store', 'update', 'destroy'], ['roles']]
    ]))
    .validator(new Map([
      [['staff.store'], ['Staff']],
      [['staff.update'], ['Staff']]
    ]))

  Route
    .post('staff/dismiss/:id', 'StaffController.dismiss')
    .middleware(['auth', 'roles'])

  Route
    .resource('staff.location', "StaffLocationController")
    .apiOnly()
    .middleware(new Map([
      [['store', 'update', 'destroy'], ['auth']],
      [['store', 'update', 'destroy'], ['roles']]
    ]))
    .validator(new Map([
      [['staff.location.store'], ['StaffLocation']],
      [['staff.location.update'], ['StaffLocation']]
    ]))

  Route
    .resource('staff.bank.banks', "StaffBankController")
    .apiOnly()
    .middleware(new Map([
      [['store', 'update', 'destroy'], ['auth']],
      [['store', 'update', 'destroy'], ['roles']]
    ]))
    .validator(new Map([
      [['staff.bank.banks.store'], ['StaffBank']],
      [['staff.bank.banks.update'], ['StaffBank']]
    ]))
  Route
    .resource('staff.biodata', "StaffBiodataController")
    .apiOnly()
    .middleware(new Map([
      [['store', 'update', 'destroy'], ['auth']],
      [['store', 'update', 'destroy'], ['roles']]
    ]))

  Route
    .resource('staff.identifier.identity', "StaffIdentityController")
    .apiOnly()
    .middleware(new Map([
      [['store', 'update', 'destroy'], ['auth']],
      [['store', 'update', 'destroy'], ['roles']]
    ]))
    .validator(new Map([
      [['staff.identifier.identity.store'], ['StaffIdentifier']],
      [['staff.identifier.identity.update'], ['StaffIdentifier']]
    ]))

  Route
    .resource('staff.contact', "StaffContactController")
    .apiOnly()
    .middleware(new Map([
      [['store', 'update', 'destroy'], ['auth']],
      [['store', 'update', 'destroy'], ['roles']]
    ]))

  //Department routes
  Route
    .resource('departments', "DepartmentController")
    .apiOnly()
    .middleware(new Map([
      [['store', 'update', 'destroy'], ['auth']],
      [['store', 'update', 'destroy'], ['roles']]
    ]))

  //cluster routes
  Route
    .resource('clusters/grade', "GradeController")
    .apiOnly()
    .middleware(new Map([
      [['store', 'update', 'destroy'], ['auth']],
      [['store', 'update', 'destroy'], ['roles']]
    ]))
    .validator(new Map([
      [['clusters/grade.store'], ['Grade']],
      [['clusters/grade.update'], ['Grade']]
    ]))

  Route
    .resource('clusters/stream', "StreamController")
    .apiOnly()
    .middleware(new Map([
      [['store', 'update', 'destroy'], ['auth']],
      [['store', 'update', 'destroy'], ['roles']]
    ]))
    .validator(new Map([
      [['clusters/stream.store'], ['Stream']],
      [['clusters/stream.update'], ['Stream']]
    ]))

  //Guadians Route
  Route
    .resource('guardians', "GuardianController")
    .apiOnly()
    .middleware(new Map([
      [['store', 'update', 'destroy'], ['auth']],
      [['store', 'update', 'destroy'], ['roles']]
    ]))
    .validator(new Map([
      [['guardians.store'], ['Guardian']],
      [['guardians.update'], ['Guardian']]
    ]))

  //Students routes
  Route
    .resource('students/grade.stream.student', "StudentController")
    .apiOnly()
    .middleware(new Map([
      [['store', 'update', 'destroy'], ['auth']],
      [['store', 'update', 'destroy'], ['roles']]
    ]))
    .validator(new Map([
      [['students/grade.stream.student.store'], ['Student']],
      [['students/grade.stream.student.update'], ['Student']]
    ]))
  Route
    .resource('students/student.location', "StudentLocationController")
    .apiOnly()
    .middleware(new Map([
      [['store', 'update', 'destroy'], ['auth']],
      [['store', 'update', 'destroy'], ['roles']]
    ]))
    .validator(new Map([
      [['students/student.location.store'], ['StudentLocation']],
      [['students/student.location.update'], ['StudentLocation']]
    ]))

  Route
    .resource('students/student.biodata', "StudentBiodataController")
    .apiOnly()
    .middleware(new Map([
      [['store', 'update', 'destroy'], ['auth']],
      [['store', 'update', 'destroy'], ['roles']]
    ]))

  Route
    .post('students/dismiss/:id', 'StudentController.dismiss')
    .middleware(['auth', 'roles'])

})
  .formats(['json'])