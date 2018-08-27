'use strict'

const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('phone', 80).unique()
      table.string('email', 254).unique()
      table.string('password', 60)
      table.string('pin', 60)
      table.boolean('is_staff').defaultTo(false)
      table.boolean('is_active').defaultTo(false)
      table.boolean('is_admin').defaultTo(false)
      table.boolean('is_super_admin').defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
