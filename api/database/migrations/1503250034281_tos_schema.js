'use strict'

const Schema = use('Schema')

class TosSchema extends Schema {
  up () {
    this.create('tos', (table) => {
      table.increments()
      table.timestamps()
      table.date('start_date')
      table.date('end_date')
      table.integer('yos_id').unsigned().references('id').inTable('yos').onDelete('cascade')
      table.boolean('current').defaultTo(false)
    })
  }

  down () {
    this.drop('tos')
  }
}

module.exports = TosSchema
