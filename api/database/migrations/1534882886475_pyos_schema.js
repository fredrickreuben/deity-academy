'use strict'

const Schema = use('Schema')

class PyosSchema extends Schema { 
  up () {
    this.create('pyos', (table) => {
      table.increments()
      table.timestamps()
      table.integer('yos_id').unsigned().references('id').inTable('yos').onDelete('cascade')
      table.integer('pupil_id').unsigned().references('id').inTable('pupils').onDelete('cascade')
      table.integer('sos_id').unsigned().references('id').inTable('sos').onDelete('cascade')
      table.boolean('current').defaultTo(true) 
    })
  }

  down () {
    this.drop('pyos')
  }
}

module.exports = PyosSchema
