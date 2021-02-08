'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserModuleSchema extends Schema {
  up () {
    this.create('user_module', (table) => {
      table.integer("user_id").unsigned().index('user_id'),
      table.integer("module_id").unsigned().index("module_id"),
      table.foreign("user_id").references('users.id').onDelete('cascade'),
      table.foreign("module_id").references('modules.id').onDelete('cascade')
    })
  }

  down () {
    this.drop('user_module')
  }
}

module.exports = UserModuleSchema
