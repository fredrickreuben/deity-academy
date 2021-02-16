'use strict'

/*
|--------------------------------------------------------------------------
| FeePaymentModeSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Database = use('Database')

class FeePaymentModeSeeder {
  async run () {
    await Database.table('fee_payment_modes').truncate()
    await Database.table('fee_payment_modes').insert([
      {
        slug: "m-pesa",
        name: "M-Pesa",
      },
      {
        slug: "bank-slip",
        name: "Bank Slip",
      },
      {
        slug: "cheque",
        name: "Cheque",
      },
      {
        slug: "bank-transfer",
        name: "Bank Transfer",
      },
      {
        slug: "cash",
        name: "Cash",
      },
      {
        slug: "equitel",
        name: "Equitel",
      },
      {
        slug: "others",
        name: "Others",
      }
    ])
  }
}

module.exports = FeePaymentModeSeeder
