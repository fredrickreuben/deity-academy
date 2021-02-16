'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class FeePaymentMode extends Model {

    static boot() {
        super.boot()
        this.addTrait('@provider:Lucid/Slugify', {
            fields: {
                slug: 'name'
            },
            strategy: 'dbIncrement',
            disableUpdates: false
        })
    }

    receipts() {
        return this.hasMany('Apps/Model/FeePayment')
    }
}

module.exports = FeePaymentMode
