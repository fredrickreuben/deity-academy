'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BankSchema extends Schema {
  up () {
    this.create('banks', (table) => {
      table.increments()
      table.string("bank_name")
      table.string("bank_account_name")
      table.string("bank_account_number")
      table.string("bank_swift_code")
      table.string("bank_phone")
      table.string("bank_email")
      table.timestamps()
    })
  }

  down () {
    this.drop('banks')
  }
}

module.exports = BankSchema
