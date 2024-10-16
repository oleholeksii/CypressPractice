import url from '../fixtures/urls.json'
import login from '../selectors/login.css.js'
import userData from '../fixtures/users.json'
// add wrong username or password test cases

describe('Error messages on the login page', () => {
  beforeEach(() => {
    cy.visit(url)
  })
  it('Check error message with empty username and password fields', () => {
    cy.get(login.loginButton).click()
    cy.get(login.errorField)
      .should('be.visible')
      .and('contain', "Epic sadface: Username is required")
    cy.get(login.circleErrorUsername).should('be.visible')
    cy.get(login.circleErrorPassword).should('be.visible')
  })

  it('Check error message with empty password field', () => {
    cy.get(login.loginField).type(userData.standard_user.username)
    cy.get(login.loginButton).click()
    cy.get(login.errorField)
      .should('be.visible')
      .and('contain', 'Epic sadface: Password is required')
    cy.get(login.circleErrorUsername).should('be.visible')
    cy.get(login.circleErrorPassword).should('be.visible')
    cy.get(login.errorButton).click()
    cy.get(login.errorField)
      .should('not.contain.text', 'Epic sadface: Password is required')
    cy.get(login.circleErrorUsername).should('not.exist')
    cy.get(login.circleErrorPassword).should('not.exist')
  })

  it('Check error message with empty Username field', () => {
    cy.get(login.passwordField).type(userData.standard_user.password)
    cy.get(login.loginButton).click()
    cy.get(login.errorField)
      .should('be.visible')
      .and('contain', 'Epic sadface: Username is required')
    cy.get(login.circleErrorUsername).should('be.visible')
    cy.get(login.circleErrorPassword).should('be.visible')
    cy.get(login.errorButton).click()
    cy.get(login.errorField)
      .should('not.contain.text', 'Epic sadface: Username is required')
    cy.get(login.circleErrorUsername).should('not.exist')
    cy.get(login.circleErrorPassword).should('not.exist')
  })

  it('Check error message with wrong password', () => {
    cy.get(login.loginField).type(userData.standard_user.username)
    cy.get(login.passwordField).type('randomPassword')
    cy.get(login.loginButton).click()
    cy.get(login.errorField)
      .should('be.visible')
      .and('contain', 'Epic sadface: Username and password do not match any user in this service')
    cy.get(login.circleErrorUsername).should('be.visible')
    cy.get(login.circleErrorPassword).should('be.visible')
    cy.get(login.errorButton).click()
    cy.get(login.errorField)
      .should('not.contain.text', 'Epic sadface: Username and password do not match any user in this service')
    cy.get(login.circleErrorUsername).should('not.exist')
    cy.get(login.circleErrorPassword).should('not.exist')
  })

  it('Check error message with wrong username and correct password', () => {
    cy.get(login.loginField).type('randomUserName')
    cy.get(login.passwordField).type(userData.standard_user.password)
    cy.get(login.loginButton).click()
    cy.get(login.errorField)
      .should('be.visible')
      .and('contain', 'Epic sadface: Username and password do not match any user in this service')
    cy.get(login.circleErrorUsername).should('be.visible')
    cy.get(login.circleErrorPassword).should('be.visible')
    cy.get(login.errorButton).click()
    cy.get(login.errorField)
      .should('not.contain.text', 'Epic sadface: Username and password do not match any user in this service')
    cy.get(login.circleErrorUsername).should('not.exist')
    cy.get(login.circleErrorPassword).should('not.exist')
  })
})