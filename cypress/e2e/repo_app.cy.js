describe('Test repos app part', () => {
  beforeEach(function() {
    // cy.request('POST', 'http://localhost:3001/api/testing/resetrepos')
    cy.request('POST', `${Cypress.env('backendUrl')}/api/testing/resetrepos`) // use backendUrl from cypress.config.js
    // cy.visit('http://localhost:5173')     // not needed, because baseUrl is set in cypress.config.js
    cy.visit('/')
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
    cy.request('POST', `${Cypress.env('backendUrl')}/api/testing/resetusers`)
    cy.visit('/')
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

  it('A user can not login with wrong password', function () {
    cy.contains('Show login').click()
    cy.get('input[name="Username"]').type('root')
    cy.get('input[name="Password"]').type('wrong')
    cy.get('#login-button').click()
    cy.get('.error').should('contain','Wrong credentials')
    cy.get('html').should('not.contain', 'root is logged')
  })
})

describe('When user is logged in', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('backendUrl')}/api/login`, {
      username: 'root',
      password: 'sekret'
    }).then(response => {
      localStorage.setItem('loggedAppUser', JSON.stringify(response.body))
      cy.visit('/')
    })
  })

  it('a new message for a new scraping job can sent', function() {
    cy.get('[data-testid="btnRunTestCrawler"]').click()
    cy.contains('New scraping job for topic crawler')
  })
})