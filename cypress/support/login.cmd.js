import login from '../selectors/login.css.js'
import url from '../fixtures/urls.json'

Cypress.Commands.add('login', (userData) => {
  cy.visit(url.url)
  cy.get(login.loginField).type(userData.username)
  cy.get(login.passwordField).type(userData.password)
  cy.get(login.loginButton).click()
})