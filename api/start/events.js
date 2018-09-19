'use strict'

const Event = use('Event')

Event.on('promote::pupil', 'Pupil.promote')
Event.on('totalpayments::store', 'TotalPayment.store')
Event.on('totalpayments::update', 'TotalPayment.update')
//Event.on('totalpayments::pupil', 'TotalPayment.pupil')
Event.on('tos::begin', 'TOS.begin')
Event.on('tos::begun', 'TOS.begun')
Event.on('tos::notbegun', 'TOS.notbegun')
Event.on('yos::begin', 'YOS.begin')