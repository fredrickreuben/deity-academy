'use strict'

const Schema = use('Schema')

class PupilSchema extends Schema {
  up () {
    this.create('pupils', (table) => {
      table.increments()
      table.timestamps()
      table.integer('Adm_no', 10)
      table.string('f_name', 80)
      table.string('m_name', 80)
      table.string('l_name', 80)
      table.date('dob')
      table.date('adm_date')
      table.boolean('border').defaultTo(false)
    })
  }

  down () {
    this.drop('pupils')
  }
}

module.exports = PupilSchema
