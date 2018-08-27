'use strict'

const Schema = use('Schema')

class BankAccountsSchema extends Schema {
  up () {
    this.create('bank_accounts', (table) => {
      table.increments()
      table.timestamps()
      table.string('bank_name', 80)
      table.integer('account_no', 100)
    })
  }

  down () {
    this.drop('bank_accounts')
  }
}

module.exports = BankAccountsSchema
