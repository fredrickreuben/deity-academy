'use strict'

/*
|--------------------------------------------------------------------------
| ModuleSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Database = use('Database')

class ModuleSeeder {
  async run () {
    await Database.table('modules').truncate()
    await Database.table('modules').insert([
      {
        slug: "accounting",
        name: "Accounting",
      },
      {
        slug: "administration",
        name: "Administration",
      },
      {
        slug: "payroll_management",
        name: "Payroll Management",
      },
      {
        slug: "staff_management",
        name: "Staff Management",
      },
      {
        slug: "student_management",
        name: "Student Management",
      },
      {
        slug: "fees_management",
        name: "Fees Management",
      },
      {
        slug: "transport_management",
        name: "Transport Management",
      },
      {
        slug: "inventory_management",
        name: "Inventory Management",
      },
      {
        slug: "staff_management",
        name: "Staff Management",
      },
      {
        slug: "communication_management",
        name: "Communication Management",
      }
    ])
  }
}

module.exports = ModuleSeeder
