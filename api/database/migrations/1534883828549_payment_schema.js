'use strict'

const Schema = use('Schema')

class PaymentSchema extends Schema {
  up () {
    this.create('payments', (table) => {
      table.increments()
      table.timestamps()
      table.integer('pupil_id').unsigned().references('id').inTable('pupils').onDelete('cascade')
      table.integer('paidBy').unsigned().references('id').inTable('gurdians').onDelete('cascade')
      table.integer('bank_account_id').unsigned().references('id').inTable('bank_accounts').onDelete('cascade')
      table.integer('amount')
      table.boolean('receipted').defaultTo(false)
      table.boolean('fee').defaultTo(true)
    })
  }

  down () {
    this.drop('payments')
  }
}

module.exports = PaymentSchema
