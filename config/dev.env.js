
'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
const customEnv = require('./custom.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
})

module.exports = merge(prodEnv, customEnv)
