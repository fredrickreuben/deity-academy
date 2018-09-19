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
        [['yos.store'], ['StoreYOS']],
        [['yos.update'], ['UpdateYOS']]
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
      [['yos.tos.store'],['StoreTOS']],
      [['yos.tos.update'],['UpdateTOS']]
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
    Route
      .resource('yos.sos.pupil.pyos', 'PYOSController')
      .apiOnly()
      .except(['show'])
      .middleware(new Map([
        [['store', 'update', 'destroy'], ['auth']],
        [['store', 'update', 'destroy'], ['roles']]
      ]))

    Route
      .get('pyos/:id', 'PYOSController.show')

    //Admission requiremnts routes
    Route
      .resource('admr', 'AdmissionRequirementController')
      .apiOnly()
      .middleware(new Map([
        [['store', 'update', 'destroy'], ['auth']],
        [['store', 'update', 'destroy'], ['roles']]
      ]))
      .validator(new Map([
        [['admr.store'],['AdmissionRequirement']],
        [['admr.update'],['AdmissionRequirement']]
      ]))

    //Fee Structure Routes
    Route
      .resource('tos.sos.feestructure', 'FeeStructureController')
      .apiOnly()
      .except(['show',  'index'])
      .middleware(new Map([
        [['store', 'update', 'destroy'], ['auth']],
        [['store', 'update', 'destroy'], ['roles']]
      ]))
      .validator(new Map([
        [['tos.sos.feestructure.store'],['FeeStructure']],
        [['tos.sos.feestructure.update'],['FeeStructure']]
      ]))

    Route
      .get('feestructure/:tos_id/:sos_id/:to_id', 'FeeStructureController.index')

    Route
      .get('feestructure/:id', 'FeeStructureController.show')

    //Other Payments Routes
    Route
      .resource('tos.opayments', 'OtherPaymentController')
      .apiOnly()
      .middleware(new Map([
        [['store', 'update', 'destroy'], ['auth']],
        [['store', 'update', 'destroy'], ['roles']]
      ]))
      .validator(new Map([
        [['opayments.store'],['oPayments']],
        [['opayments.update'],['oPayments']]
      ]))

    //Pupil Other Payments Routes
    Route
      .resource('opyt.poymts', 'PupilOtherPaymentController')
      .apiOnly()
      .middleware(new Map([
        [['store', 'update', 'destroy'], ['auth']],
        [['store', 'update', 'destroy'], ['roles']]
      ]))
      .validator(new Map([
        [['opyt.poymts.store'],['StorePupilOtherPayment']],
        [['opyt.poymts.update'],['UpdatePupilOtherPayment']]
      ]))

    //Scholarship Types Routes
    Route
      .resource('scholarshiptype', 'ScholarshipTypeController')
      .apiOnly()
      .middleware(new Map([
        [['store', 'update', 'destroy'], ['auth']],
        [['store', 'update', 'destroy'], ['roles']]
      ]))
      .validator(new Map([
        [['scholarshiptype.store'],['ScholarshipType']],
        [['scholarshiptype.update'],['ScholarshipType']]
      ]))

    //Scholarship Routes
    Route
      .resource('pupil.scholarshiptype.scholarship', 'ScholarshipController')
      .apiOnly()
      .middleware(new Map([
        [['store', 'update', 'destroy'], ['auth']],
        [['store', 'update', 'destroy'], ['roles']]
      ]))

    //Scholarship Routes
    Route
      .resource('staff.department.hod', 'HodController')
      .apiOnly()
      .middleware(new Map([
        [['store', 'update', 'destroy'], ['auth']],
        [['store', 'update', 'destroy'], ['roles']]
      ]))

    //Petty Cash Routes
    Route
      .resource('passedby.checkedby.pettycash', 'PettyCashController')
      .apiOnly()
      .middleware(new Map([
        [['store', 'update', 'destroy'], ['auth']],
        [['store', 'update', 'destroy'], ['roles']]
      ]))
      .validator(new Map([
        [['passedby.checkedby.pettycash.store'],['PettyCash']],
        [['passedby.checkedby.pettycash.update'],['PettyCash']]
      ]))

    //Petty Cash Routes
    Route
      .resource('pettycash.expense', 'ExpenseController')
      .apiOnly()
      .middleware(new Map([
        [['store', 'update', 'destroy'], ['auth']],
        [['store', 'update', 'destroy'], ['roles']]
      ]))
      .validator(new Map([
        [['pettycash.expense.store'],['Expense']],
        [['pettycash.expense.update'],['Expense']]
      ]))

    //Total Payment Routes
    Route
      .resource('tos.pupil.tpayments', 'TotalPaymentController')
      .apiOnly()
      .middleware(new Map([
        [['store', 'update', 'destroy'], ['auth']],
        [['store', 'update', 'destroy'], ['roles']]
      ]))
      .validator(new Map([
        [['tos.pupil.tpayments.store'],['TotalPayment']],
        [['tos.pupil.tpayments.update'],['TotalPayment']]
      ]))

    //Bank Account Routes
    Route
      .resource('bank', 'BankAccountController')
      .apiOnly()
      .middleware(new Map([
        [['store', 'update', 'destroy'], ['auth']],
        [['store', 'update', 'destroy'], ['roles']]
      ]))
      .validator(new Map([
        [['bank.store'],['StoreBankAccount']],
        [['bank.update'],['UpdateBankAccount']]
      ]))

    //Bank Account Routes
    Route
      .resource('pupil.paidby.bank.payment.feestructure.pay', 'PaymentController')
      .apiOnly()
      .middleware(new Map([
        [['store', 'update', 'destroy'], ['auth']],
        [['store', 'update', 'destroy'], ['roles']]
      ]))
      .validator(new Map([
        [['pupil.paidby.bank.payment.feestructure.pay.store'],['Payment']],
        [['pupil.paidby.bank.payment.feestructure.pay.update'],['Payment']]
      ]))

    //Receipt Routes
    Route
      .resource('payment.receipts', 'ReceiptController')
      .apiOnly()
      .middleware(new Map([
        [['store', 'update', 'destroy'], ['auth']],
        [['store', 'update', 'destroy'], ['roles']]
      ]))

    //Auth Routes 
    Route
      .post('auth/login', 'AuthController.login')
})
.domain('api.deity.local')
.formats(['json'])