describe('pbr-material', () => {
  it('Capture snapshots', () => {
    cy.visit('testing-e2e/pbr-material.html', {
      onBeforeLoad(win) {
        cy.spy(win, 'postMessage').as('postMessage')
      },
    })

    cy.get('@postMessage').its('lastCall.args.0').should('equal', 'done-loading')
    cy.get('canvas').percySnapshot('pbr-material')
  })
})
