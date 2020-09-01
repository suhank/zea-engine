describe('Zea Engine-Performance', () => {
  it('stress test memory', () => {
    cy.visit('memory-test.html', {
      // onBeforeLoad(win) {
      //   cy.spy(win, 'postMessage').as('postMessage')
      // },
    })
    // cy.get('@postMessage').its('lastCall.args.0').should('equal', 'done-Loading')
    cy.get('canvas').percySnapshot(`memory-test`)
  })
})
