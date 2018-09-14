'use strict'

const Event = use('Event')

Event.on('promote::pupil', 'Pupil.promote')
Event.on('totalpayments::store', 'TotalPayment.store')
Event.on('totalpayments::update', 'TotalPayment.update')
Event.on('totalpayments::pupil', 'TotalPayment.pupil') 