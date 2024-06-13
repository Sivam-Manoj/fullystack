const crypto = require('crypto')

const secretKey = crypto.randomBytes(128).toString('base64')
console.log(secretKey)