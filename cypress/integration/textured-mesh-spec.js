describe('textured-mesh', () => {
  it.skip('Captures snapshots of variants', () => {
    cy.visit('testing-e2e/textured-mesh.html', {
      onBeforeLoad(win) {
        cy.spy(win, 'postMessage').as('postMessage')
      },
    })
    cy.get('@postMessage').its('lastCall.args.0').should('equal', 'done-loading')
    cy.get('canvas').percySnapshot('textured-mesh')
  })
})
