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

  //users routes
  Route
    .resource('users', 'UserController')
    .apiOnly()
    .middleware(['auth', 'roles'])

  //staff routes  
  Route
    .resource('staff', 'StaffController')
    .apiOnly()
    .middleware(['auth', 'roles'])
    .validator(new Map([
      [['staff.store'],['StoreStaff']],
      [['staff.update'],['UpdateStaff']]
    ]))

  //Gurdians routes
  Route
    .resource('gurdians', 'GurdianController')
    .apiOnly()
    .middleware(['auth', 'roles'])
    .validator(new Map([
      [['gurdians.store'],['StoreGurdian']],
      [['gurdians.update'],['UpdateGurdian']]
    ]))

  //Year Of Study Routes
  Route
     .resource('yos', 'YOSController')
     .apiOnly()
     .middleware(new Map([
        [['store', 'update', 'destroy'], ['auth']],
        [['store', 'update', 'destroy'], ['roles']]
      ]))
     .validator(new Map([
        [['yos.store'], ['YOS']],
        [['yos.update'], ['YOS']]
      ]))

  //Term Of Study Routes    
  Route
    .resource('yos.tos', 'TOSController')
    .apiOnly()
    .except(['index', 'show'])
    .middleware(new Map([
      [['store', 'update', 'destroy'], ['auth']],
      [['store', 'update', 'destroy'], ['roles']]
    ]))
    .validator(new Map([
      [['yos.tos.store'],['TOS']],
      [['yos.tos.update'],['TOS']]
    ]))
  
  Route
    .get('tos/:id', 'TOSController.show')

  Route
    .get('tos', 'TOSController.index')
  

  //Department Routes
  Route
    .resource('departments', 'DepartmentController')
    .apiOnly()
    .middleware(new Map([
      [['store', 'update', 'destroy'], ['auth']],
      [['store', 'update', 'destroy'], ['roles']]
    ]))
    .validator(new Map([
      [['departments.store'],['Department']],
      [['departments.update'],['Department']]
    ]))


  //#Stream Routes
  Route
    .resource('streams', 'StreamController')
    .apiOnly()
    .middleware(new Map([
      [['store', 'update', 'destroy'], ['auth']],
      [['store', 'update', 'destroy'], ['roles']]
    ]))
    .validator(new Map([
      [['streams.store'],['Stream']],
      [['streams.update'],['Stream']]
    ]))


    //Stage Of Study Routes
    Route
      .resource('sos', 'SOSController')
      .apiOnly()
      .middleware(new Map([
        [['store', 'update', 'destroy'], ['auth']],
        [['store', 'update', 'destroy'], ['roles']]
      ]))
      .validator(new Map([
        [['sos.store'],['StoreSOS']],
        [['sos.update'],['UpdateSOS']]
      ]))
    
    //Class Routes
    Route
      .resource('sos.teacher.stream.class', 'ClassController')
      .apiOnly()
      .except(['show', 'index'])
      .middleware(new Map([
        [['store', 'update', 'destroy'], ['auth']],
        [['store', 'update', 'destroy'], ['roles']]
      ]))

    Route
      .get('class/:id', 'ClassController.show')

    Route
      .get('class', 'ClassController.index')


    //#Pupil Routes
    Route
      .resource('class.pupils', 'PupilController')
      .apiOnly()
      .except(['index', 'show'])
      .middleware(new Map([
        [['store', 'update', 'destroy'], ['auth']],
        [['store', 'update', 'destroy'], ['roles']]
      ]))
      .validator(new Map([
        [['class.pupils.store'],['Pupil']],
        [['class.pupils.update'],['Pupil']]
      ]))

    Route
      .get('pupils/:id', 'PupilController.show')

    Route
      .get('pupils', 'PupilController.index')


    //#Dismissal Routes
    Route
      .resource('person.dismissals', 'DismissalController')
      .apiOnly()
      .except(['show'])
      .middleware(new Map([
        [['store', 'update', 'destroy'], ['auth']],
        [['store', 'update', 'destroy'], ['roles']]
      ]))
      .validator(new Map([
        [['person.dismissals.store'],['Dismissal']],
        [['person.dismissals.update'],['Dismissal']]
      ]))

    Route
      .get('dismissals/:id', 'DismissalController.show')

    Route
      .get('dismissals', 'DismissalController.index')

    //Pupils Year Of Study Routes
    //#Dismissal Routes
    Route
      .resource('yos.sos.pupil.pyos', 'PYOSController')
      .apiOnly()
      .except(['show'])
      .middleware(new Map([
        [['store', 'update', 'destroy'], ['auth']],
        [['store', 'update', 'destroy'], ['roles']]
      ]))

    Route
      .get('pyos/:id', 'DismissalController.show')

    //Auth Routes 
    Route
      .post('auth/login', 'AuthController.login')
})
.domain('api.deity.local')
.formats(['json'])