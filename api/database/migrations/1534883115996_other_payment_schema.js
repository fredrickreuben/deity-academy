'use strict'

const Schema = use('Schema')

class OtherPaymentSchema extends Schema {
  up () {
    this.create('other_payments', (table) => {
      table.increments()
      table.timestamps()
      table.integer('pupil_id').unsigned().references('id').inTable('pupils').onDelete('cascade')
      table.integer('term_id').unsigned().references('id').inTable('terms').onDelete('cascade')
      table.integer('amount')
      table.string('item', 80)
      table.text('description')
      table.boolean('paid').defaultTo(false)
      table.date('duedate')
    })
  }

  down () {
    this.drop('other_payments')
  }
}

module.exports = OtherPaymentSchema
