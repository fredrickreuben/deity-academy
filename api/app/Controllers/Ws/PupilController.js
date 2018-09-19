'use strict'

class PupilController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request
    console.log('test')
  }
  onMessage() {
    // same as: socket.on('message')
  }

  onClose() {
    // same as: socket.on('close')
  }

  onError() {
    // same as: socket.on('error')
  }
}

module.exports = PupilController
