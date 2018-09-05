'use strict'

const Schema = use('Schema')

class PaymentSchema extends Schema {
  up () {
    this.create('payments', (table) => {
      table.increments() 
      table.timestamps() 
      table.integer('pupil_id').unsigned().references('id').inTable('pupils').onDelete('cascade')
      table.integer('gurdian_id').unsigned().references('id').inTable('gurdians').onDelete('cascade')
      table.integer('bank_account_id').unsigned().references('id').inTable('bank_accounts').onDelete('cascade')
      table.integer('pupil_other_payment_id').unsigned().references('id').inTable('pupil_other_payments').onDelete('cascade')
      table.integer('fee_structure_id').unsigned().references('id').inTable('fee_structures').onDelete('cascade')
      table.decimal('balance')
      table.decimal('amount')
      table.boolean('receipted').defaultTo(false)
      table.boolean('fee').defaultTo(true)
    })
  }

  down () {
    this.drop('payments')
  }
}

module.exports = PaymentSchema
