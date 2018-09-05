'use strict'

const Schema = use('Schema')

class TotalPaymentSchema extends Schema {
  up () {
    this.create('total_payments', (table) => {
      table.increments() 
      table.timestamps()
      table.integer('tos_id').unsigned().references('id').inTable('tos').onDelete('cascade')
      table.integer('pupil_id').unsigned().references('id').inTable('pupils').onDelete('cascade')
      table.decimal('amount').defaultTo(0)
      table.decimal('paid').defaultTo(0)
      table.boolean('nill').defaultTo(false)
      table.date('duedate')
    })
  }

  down () {
    this.drop('total_payments')
  }
}

module.exports = TotalPaymentSchema
