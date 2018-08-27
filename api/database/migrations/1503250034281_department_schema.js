'use strict'

const Schema = use('Schema')

class DepartmentSchema extends Schema {
  up () {
    this.create('departments', (table) => {
      table.increments()
      table.timestamps()
      table.string('name', 60)
    })
  }

  down () {
    this.drop('departments')
  }
}

module.exports = DepartmentSchema
