import login from '../selectors/login.css.js'
import url from '../fixtures/urls.json'
import userData from '../fixtures/users.json'

describe('Trying to login - locked out user', () => {
  beforeEach(() => {
    cy.visit(url)
  })

  //test change just to check is this will be added to git
  
  it('Login with locked out credentials', () => {
    cy.get(login.loginField).type(userData.locked_out_user.username)
    cy.get(login.passwordField).type(userData.locked_out_user.password)
    cy.get(login.loginButton).click()

    cy.get(login.errorField)
      .should('be.visible')
      .and('contain', 'Epic sadface: Sorry, this user has been locked out.')
    cy.get(login.circleErrorUsername).should('be.visible')
    cy.get(login.circleErrorPassword).should('be.visible')

    cy.get(login.errorButton).click()
    cy.get(login.errorField)
      .should('not.contain.text', 'Epic sadface: Sorry, this user has been locked out.')
    cy.get(login.circleErrorUsername).should('not.exist')
    cy.get(login.circleErrorPassword).should('not.exist')
  })
})