'use strict'

const TotalPayment = exports = module.exports = {}
const TotalPaymentService = use('App/Services/TotalPayment')

TotalPayment.store = async (totalpayment) => {
    await TotalPaymentService.store(totalpayment)
}
TotalPayment.update = async (totalpayment) => {
    await TotalPaymentService.update(totalpayment)
}

TotalPayment.pupil = async (tos) => {
   await TotalPaymentService.pupil(tos)
}
