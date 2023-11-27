describe('Repos app', () => {
  beforeEach(function() {
    cy.visit('http://localhost:5173')
  })

  it('front page can be opened', () => {
    cy.contains('Repos')
    cy.contains('Select a topic to search:')
  })

  it('user can login', function () {
    cy.contains('Show login').click()
    // cy.get('input:first').type('root')
    cy.get('input[name="Username"]').type('root')
    // cy.get('input:last').type('sekret')
    cy.get('input[name="Password"]').type('sekret')
    // cy.contains('Login').click()
    cy.get('#login-button').click()
    cy.contains('root is logged')
  })

  it('select a topic to display', function () {
    cy.get('#topic-select').select('climatechange')
    cy.contains('openems')
  })
})

// describe('When user is logged in', function() {
//   beforeEach(function() {
//     cy.get('input[name="Username"]').type('root')
//     cy.get('input[name="Password"]').type('sekret')
//     cy.get('#login-button').click()
//   })
// })