'use strict'

const Schema = use('Schema')

class ReceiptSchema extends Schema {
  up () {
    this.create('receipts', (table) => {
      table.increments()
      table.timestamps()
      table.integer('payment_id').unsigned().references('id').inTable('payments').onDelete('cascade')
    })
  }

  down () {
    this.drop('receipts')
  }
}

module.exports = ReceiptSchema
