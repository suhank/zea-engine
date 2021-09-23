describe('assetitem-delete-before-load', () => {
  it('Captures snapshots of variants', () => {
    cy.visit('testing-e2e/assetitem-delete-before-load.html', {
      onBeforeLoad(win) {
        cy.spy(win, 'postMessage').as('postMessage')
      },
    })

    cy.get('@postMessage').its('lastCall.args.0').should('equal', 'done-loading')
    cy.get('canvas').percySnapshot('assetitem-delete-before-load')
  })
})
