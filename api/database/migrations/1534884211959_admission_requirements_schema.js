'use strict'

const Schema = use('Schema')

class AdmissionRequirementsSchema extends Schema {
  up () {
    this.create('admission_requirements', (table) => {
      table.increments()
      table.timestamps()
      table.string('item', 80)
      table.text('description')
    })
  }

  down () {
    this.drop('admission_requirements')
  }
}

module.exports = AdmissionRequirementsSchema
