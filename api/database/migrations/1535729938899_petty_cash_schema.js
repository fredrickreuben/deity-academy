'use strict'

const Schema = use('Schema')

class PettyCashSchema extends Schema {
  up () {
    this.create('petty_cashes', (table) => {  
      table.increments()
      table.timestamps()
      table.string('paid_to', 80)
      table.decimal('total')
      table.integer('checked_by').unsigned().references('id').inTable('staff').onDelete('cascade')
      table.integer('passed_by').unsigned().references('id').inTable('staff').onDelete('cascade')
    })
  }

  down () {
    this.drop('petty_cashes')
  }
}

module.exports = PettyCashSchema
