describe('Zea Engine performance', () => {
  it('Behaves properly under memory stress', () => {
    cy.visit('testing-e2e/memory-test.html')

    cy.get('#start').click()

    cy.get('#memoryStatus').should('have.text', 'Good')
    cy.get('#timeStatus').should('have.text', 'Good')
  })
})
