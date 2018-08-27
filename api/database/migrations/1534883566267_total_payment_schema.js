'use strict'

const Schema = use('Schema')

class TotalPaymentSchema extends Schema {
  up () {
    this.create('total_payments', (table) => {
      table.increments()
      table.timestamps()
      table.integer('pupil_id').unsigned().references('id').inTable('pupils').onDelete('cascade')
      table.integer('amount')
      table.boolean('paid').defaultTo(false)
      table.boolean('fee').defaultTo(true)
      table.date('duedate')
    })
  }

  down () {
    this.drop('total_payments')
  }
}

module.exports = TotalPaymentSchema
