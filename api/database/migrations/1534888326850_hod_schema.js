'use strict'

const Schema = use('Schema')
 
class HodSchema extends Schema {
  up () {
    this.create('hods', (table) => {
      table.increments()
      table.timestamps()
      table.integer('hod').unsigned().references('id').inTable('staff').onDelete('cascade')
      table.integer('department_id').unsigned().references('id').inTable('departments').onDelete('cascade')
    })
  }

  down () {
    this.drop('hods')
  }
}

module.exports = HodSchema
