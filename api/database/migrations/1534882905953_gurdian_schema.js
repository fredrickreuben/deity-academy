'use strict'

const Schema = use('Schema')

class GurdianSchema extends Schema {
  up () {
    this.create('gurdians', (table) => {
      table.increments()
      table.timestamps()
      table.string('f_name', 80)
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('cascade')
      table.string('m_name', 80)
      table.string('l_name', 80)
      table.string('national_id')
      table.string('Address')
      table.string('county')
      table.string('subcounty')
      table.string('eastate')
    })
  }

  down () {
    this.drop('gurdians')
  }
}

module.exports = GurdianSchema
