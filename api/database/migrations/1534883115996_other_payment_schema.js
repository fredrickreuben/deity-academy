'use strict'

const Schema = use('Schema')

class OtherPaymentSchema extends Schema {
  up () {
    this.create('other_payments', (table) => { 
      table.increments()
      table.timestamps()
      table.integer('tos_id').unsigned().references('id').inTable('tos').onDelete('cascade')
      table.decimal('amount')
      table.string('item', 80)
      table.text('description')
      table.date('duedate')
    })
  }

  down () {
    this.drop('other_payments')
  }
}

module.exports = OtherPaymentSchema
