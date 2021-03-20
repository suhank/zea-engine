describe('Zea Engine', () => {
  it('Renders a simple plane', () => {
    cy.visit('testing-e2e/plane.html')
    cy.get('canvas').percySnapshot('Simple plane')
  })
})
