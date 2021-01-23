describe('clone-assetitem-before-load', () => {
  it('Captures a snapshot', () => {
    cy.visit('testing-e2e/clone-assetitem-before-load.html')
    cy.get('canvas').percySnapshot('clone-assetitem-before-load')
  })

  it('Captures snapshots of variants', () => {
    cy.visit('testing-e2e/clone-assetitem-before-load.html', {
      onBeforeLoad(win) {
        cy.spy(win, 'postMessage').as('postMessage')
      },
    })

    cy.get('@postMessage').its('lastCall.args.0').should('equal', 'done-loading')
  })
})
