'use strict'

const YOS = exports = module.exports = {}
const YOSService = use('App/Services/YOSService')

YOS.begin = async (date) => {
    return await YOSService.setCurrent(date)
}
