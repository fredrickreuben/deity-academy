'use strict'

const Schema = use('Schema')

class YosSchema extends Schema {
  up () {
    this.create('yos', (table) => {
      table.increments()
      table.timestamps()
      table.date('start_date')
      table.date('end_date')
    })
  }

  down () {
    this.drop('yos')
  }
}

module.exports = YosSchema
