'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ModuleSchema extends Schema {
  up () {
    this.create('modules', (table) => {
      table.increments()
      table.string('slug', 60).notNullable()
      table.string('name', 60).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('modules')
  }
}

module.exports = ModuleSchema
