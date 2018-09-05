'use strict'

const Schema = use('Schema')

class ReceiptSchema extends Schema {
  up () {
    this.create('receipts', (table) => {
      table.increments()
      table.timestamps()
      table.integer('payment_id').unsigned().references('id').inTable('payments').onDelete('cascade')
      table.integer('Serial_No', 10)
    })
  }

  down () {
    this.drop('receipts')
  }
}

module.exports = ReceiptSchema
