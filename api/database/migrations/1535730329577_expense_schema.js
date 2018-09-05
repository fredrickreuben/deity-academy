'use strict'

const Schema = use('Schema')

class ExpenseSchema extends Schema {
  up () {
    this.create('expenses', (table) => {
      table.increments()
      table.timestamps()
      table.integer('petty_cash_id').unsigned().references('id').inTable('petty_cashes').onDelete('cascade')
      table.string('vote_head', 80)
      table.decimal('amount')
    })
  }

  down () {
    this.drop('expenses')
  }
}

module.exports = ExpenseSchema
