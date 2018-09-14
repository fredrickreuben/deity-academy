'use strict'

const TotalPaymentHook = exports = module.exports = {}

TotalPaymentHook.update = async (modelInstance) => {
    let paid = 0
    let total = 0
    let = scholarships = 0
    let = OtherPayments = 0
    if (modelInstance.dirty.paid) {
      paid = modelInstance.paid
    }

    if (modelInstance.dirty.amount) {
      total = modelInstance.amount
    }

    modelInstance.amount = (total + OtherPayments) - scholarships
    modelInstance.paid = paid
    modelInstance.nill = (total >= paid) ? true : false
}
