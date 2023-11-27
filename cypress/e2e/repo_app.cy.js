describe('Test repos app part', () => {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/resetrepos')
    cy.visit('http://localhost:5173')
  })

  it('Main page can be opened and a topic can be selected and displaied', function () {
    cy.contains('Repos')
    cy.contains('Select a topic to search:')
    cy.get('#topic-select').select('climatechange')
    cy.contains('openems')
  })
})

describe('Test login app part', () => {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/resetusers')
    cy.visit('http://localhost:5173')
  })

  it('A user can login', function () {
    cy.contains('Show login').click()
    // cy.get('input:first').type('root')
    cy.get('input[name="Username"]').type('root')
    // cy.get('input:last').type('sekret')
    cy.get('input[name="Password"]').type('sekret')
    // cy.contains('Login').click()
    cy.get('#login-button').click()
    cy.contains('root is logged')
  })
})

// describe('When user is logged in', function() {
//   beforeEach(function() {
//     cy.get('input[name="Username"]').type('root')
//     cy.get('input[name="Password"]').type('sekret')
//     cy.get('#login-button').click()
//   })
// })