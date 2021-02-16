'use strict'

const Payment = use('App/Models/FeePayment')
const Database = use('Database')

class Receipt{

    async number(){
        var receipt = await Database.from('fee_payments').max('receipt_no as number')

        return receipt[0].number + 1
    }

}

module.exports = new Receipt()