import selectors from "../selectors/selectors.js"

describe('Standard user', () => {
  beforeEach(() => {
    cy.fixture('users.json').then((userData) => {
      cy.login(userData.standard_user)
    })
  })

  it('Login standard user and check if the user is logged in', () => {
    cy.get(selectors.title).should('be.visible')
    cy.get(selectors.shoppingCart).should('be.visible')
  })

  it('Check if all the items are visible on the screen', () => {
    cy.get(selectors.allItems)
      .should('be.visible')
      .and('have.length', 6)
  })

/* from chatGPT
const sortingOptions = [
  { option: 'Name (A to Z)', order: 'asc' },
  { option: 'Name (Z to A)', order: 'desc' },
  { option: 'Price (low to high)', order: 'asc' },
  { option: 'Price (high to low)', order: 'desc' },
];

sortingOptions.forEach(({ option, order }) => {
  it(`Check sorting functionality - ${option}`, () => {
    cy.get(selectors.sortContainer).select(option);
    cy.get(selectors.allItemsPrices).then($prices => {
      const pricesText = $prices.map((index, element) => Cypress.$(element).text()).get();
      const prices = pricesText.map(price => parseFloat(price.replace('$', '')));

      const sortedPrices = [...prices].sort(order === 'asc' ? (a, b) => a - b : (a, b) => b - a);
      expect(prices).to.deep.equal(sortedPrices);
    });
  });
});

*/

  it('Check sorting functionality - Check if inventory items are sorted A-Z', () => {
    cy.get(selectors.sortContainer)
      .should('contain', 'Name (A to Z)')

    cy.get(selectors.allItemsNames).then($items => {
      const names = [...$items].map(el => el.innerText);

      // Sprawdź, czy nazwy są posortowane alfabetycznie
      const sortedNames = [...names].sort((a, b) => a.localeCompare(b));
      expect(names).to.deep.equal(sortedNames);
    })
  })

  it('Check sorting functionality - Check if inventory items are sorted Z-A', () => {
    cy.get(selectors.sortContainer)
      .should('contain', 'Name (A to Z)')

    cy.get(selectors.sortContainer).select('Name (Z to A)')

    cy.get(selectors.allItemsNames).then($items => {
      const names = $items.map((index, element) => Cypress.$(element).text()).get();

      // Sprawdź, czy nazwy są posortowane alfabetycznie
      const sortedNames = [...names].sort((a, b) => b.localeCompare(a));
      expect(names).to.deep.equal(sortedNames);
    })
  })

  it('Check sorting functionality - Check if inventory prices are sorted low to high', () => {
    cy.get(selectors.sortContainer).select('Price (low to high)')

    cy.get(selectors.allItemsPrices).then($prices => {
      // Pobierz tekst zawierający ceny z tych elementów
      const pricesText = $prices.map((index, element) => Cypress.$(element).text()).get();

      // Konwertuj tekst na liczby zmiennoprzecinkowe
      const prices = pricesText.map(price => parseFloat(price.replace('$', '')));

      // Sprawdź, czy ceny są posortowane od najniższej do najwyższej
      const sortedPrices = [...prices].sort((a, b) => a - b);
      expect(prices).to.deep.equal(sortedPrices);
    })
  })


  it('Check sorting functionality - Check if inventory prices are sorted high to low', () => {
    cy.get(selectors.sortContainer).select('Price (high to low)')

    cy.get(selectors.allItemsPrices).then($prices => {

      const pricesText = $prices.map((index, element) => Cypress.$(element).text()).get()

      const prices = pricesText.map(price => parseFloat(price.replace('$', '')))

      const sortedPrices = [...prices].sort((a, b) => b - a)
      expect(prices).to.deep.equal(sortedPrices)
    })
  })

  // it.only('Check if prices are the same after opening the item', () => {

  //   let itemPrice
  //   cy.get(selectors.firstItemPrice).invoke('text').then((text) => {
  //     itemPrice = parseFloat(text.replace('$', '').replace(',', '.'))
  //   })

  //   cy.get(selectors.firstItem).click()
  //   cy.get(selectors.itemPriceAfterOpening).invoke('text').then((text) => {
  //     const itemPriceOpened = parseFloat(text.replace('$', '').replace(',', '.'))

  //     expect(itemPrice).to.equal(itemPriceOpened)
  //   })
  // })

  it.only('Check if prices are the same after opening the item', () => {

    cy.get(selectors.allItemsNames).each(($item, index) => {

      let itemPriceBefore

      cy.wrap($item).find(selectors.allItemsPrices).invoke('text').then((text) => {
        itemPriceBefore = parseFloat(text.replace('$', '').replace(',', '.'))
      })

      cy.wrap($item).click()
      cy.get(selectors.itemPriceAfterOpening).invoke('text').then((text) => {
        const itemPriceAfter = parseFloat(text.replace('zł', '').replace(',', '.'));

        expect(itemPriceBefore).to.equal(itemPriceAfter)

      })
      cy.go('back')
    })
  })

  it('Proceed with buying the first item', () => {
    cy.get(selectors.firstItem).click()
    cy.get(selectors.inventoryDetailsContainer)
      .should('be.visible')
      .and('contain', 'Sauce Labs Backpack')

    cy.get(selectors.addToCart)
      .should('be.visible')
      .click()

    cy.get(selectors.shoppingCartBadge).should('be.visible')

    cy.get(selectors.shoppingCart).click()
    cy.get(selectors.shoppingCartBadge).should('be.visible')
    cy.get(selectors.checkoutButton).click()
    cy.get(selectors.checkoutInfo)
      .should('be.visible')
      .within(() => {
        cy.get(selectors.checkoutFirstName).type('John')
        cy.get(selectors.checkoutLasttName).type('Doe')
        cy.get(selectors.checkoutZip).type('12345')
      })

    cy.get(selectors.checkoutContinue).click()
    cy.get(selectors.summaryInfo).should('be.visible')
    cy.get(selectors.checkoutFinishButton).click()

    cy.get(selectors.thanksForOrder).should('be.visible')
    cy.get(selectors.backHomeButton).click()
  })
})
