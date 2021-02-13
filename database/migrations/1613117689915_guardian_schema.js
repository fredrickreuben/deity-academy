'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GuardianSchema extends Schema {
  up () {
    this.create('guardians', (table) => {
      table.increments()
      table.string('f_name', 80)
      table.string('m_name', 80)
      table.string('l_name', 80)
      table.boolean('gender').defaultTo(true)
      table.string('relationship', 80)
      table.string('national_id_no', 80)
      table.string('phone_no', 245)
      table.string('email', 245)
      table.string('nationality', 180)
      table.string('residence', 180)
      table.boolean('deleted').defaultTo(false)
      table.boolean('dismissed').defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('guardians')
  }
}

module.exports = GuardianSchema
