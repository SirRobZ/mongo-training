const should = require('chai').should()
const expect = require('chai').expect
const User = require('../src/user')

describe('Validating records', () => {
  it('requires a username', () => {
    const user = new User({ name: undefined })
    const validationResult = user.validateSync()
    const { message } = validationResult.errors.name
    message.should.equal('Name is required.')
  })

  it('requires a username greater than 2 characters', () => {
    const user = new User({ name: 'Al' })
    const validationResult = user.validateSync()
    const { message } = validationResult.errors.name
    message.should.equal('Name must be longer than 2 characters.')
  })
})
