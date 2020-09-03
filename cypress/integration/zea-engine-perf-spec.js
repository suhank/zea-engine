describe('Zea Engine-Performance', () => {
  it('stress test memory', () => {
    cy.visit('memory-test.html', { timeout: 70000 })
    cy.get('canvas').percySnapshot(`memory-test`)
  })
})
