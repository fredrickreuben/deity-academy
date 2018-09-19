'use strict'

const TotalPayment = exports = module.exports = {}
const TotalPaymentService = use('App/Services/TotalPayment')

TotalPayment.store = async (totalpayment) => {
    await TotalPaymentService.store(totalpayment)
}
TotalPayment.storeMany = async (totalpayment) => {
  await TotalPaymentService.storeMany(totalpayment)
}
TotalPayment.update = async (totalpayment) => {
    await TotalPaymentService.update(totalpayment)
}
TotalPayment.updateMany = async (totalpayment) => {
  await TotalPaymentService.updateMany(totalpayment)
}
