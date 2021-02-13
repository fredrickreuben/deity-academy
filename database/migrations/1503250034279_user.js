'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('username', 80).notNullable().unique()
      table.string('phone', 80).unique()
      table.string('email', 254).notNullable().unique()
      table.string('password', 60).notNullable()
      table.integer('staff_id').unsigned().references('id').inTable('staffs')
      table.integer('guardian_id').unsigned().references('id').inTable('guardians')
      table.boolean('is_staff').defaultTo(false)
      table.boolean('is_active').defaultTo(false)
      table.boolean('is_admin').defaultTo(false)
      table.boolean('is_super_admin').defaultTo(false)
      table.boolean('deleted').defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
