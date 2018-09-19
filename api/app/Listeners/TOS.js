'use strict'

const TOS = exports = module.exports = {}

const TOSService = use('App/Services/TOS')

TOS.begin = async (date) => {
    await TOSService.begin(date)
    return
}

TOS.begun = async (date) => {
  await TOSService.begun(date)
  return
}

TOS.notbegun = async (tos) => {
  await TOSService.notbegun(tos)
  return
}
