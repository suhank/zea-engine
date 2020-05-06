/// <reference types="cypress" />

context('Window', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:8080/helloWorld.html')
  })

  it('cy.window() - get the global window object', () => {
    // https://on.cypress.io/window
    // cy.window().should('have.property', 'top')
    cy.screenshot('helloWorld')
    
    // cy.get('#app').toMatchImageSnapshot({
    //   threshold: 0.001,
    // })
  })


  // it('cy.document() - get the document object', () => {
  //   // https://on.cypress.io/document
  //   cy.document().should('have.property', 'charset').and('eq', 'UTF-8')
  // })

  // it('cy.title() - get the title', () => {
  //   // https://on.cypress.io/title
  //   cy.title().should('include', 'Kitchen Sink')
  // })
})


