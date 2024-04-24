import standardUser, { checkoutButton } from "../selectors/standardUser.css"

describe('Standard user', () => {
  beforeEach(() => {
    cy.fixture('users.json').then((userData) => {
      cy.login(userData.standard_user)
    })
  })

  it('Login standard user and check if the user is logged in', () => {
    cy.get(standardUser.title).should('be.visible')
    cy.get(standardUser.shoppingCart).should('be.visible')
  })

  it('Check if all the items are visible on the screen', () => {
    cy.get(standardUser.allItems)
      .should('be.visible')
      .and('have.length', 6)
  })

  it('Proceed with buying the first item', () => {
    cy.get(standardUser.firstItem).click()
    cy.get(standardUser.inventoryDetailsContainer)
      .should('be.visible')
      .and('contain', 'Sauce Labs Backpack')

    cy.get(standardUser.addToCart)
      .should('be.visible')
      .click()

    cy.get(standardUser.shoppingCartBadge).should('be.visible')

    cy.get(standardUser.shoppingCart).click()
    cy.get(standardUser.shoppingCartBadge).should('be.visible')
    cy.get(standardUser.checkoutButton).click()
    cy.get(standardUser.checkoutInfo)
      .should('be.visible')
      .within(() => {
        cy.get(standardUser.checkoutFirstName).type('John')
        cy.get(standardUser.checkoutLasttName).type('Doe')
        cy.get(standardUser.checkoutZip).type('12345')
      })

    cy.get(standardUser.checkoutContinue).click()
    cy.get(standardUser.summaryInfo).should('be.visible')
    cy.get(standardUser.checkoutFinishButton).click()

    cy.get(standardUser.thanksForOrder).should('be.visible')
    cy.get(standardUser.backHomeButton).click()
  })
})
