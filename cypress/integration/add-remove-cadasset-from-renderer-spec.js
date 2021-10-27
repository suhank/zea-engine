describe('add-remove-cadasset-from-renderer', () => {
  it('Captures snapshots of variants', () => {
    cy.visit('testing-e2e/add-remove-cadasset-from-renderer.html', {
      onBeforeLoad(win) {
        cy.spy(win, 'postMessage').as('postMessage')
      },
    })

    cy.get('@postMessage').its('lastCall.args.0').should('equal', 'done-loading')
    cy.get('canvas').percySnapshot(`add-remove-cadasset-from-renderer`)

    cy.window().then((win) => {
      const variant = 'variant-01'
      win.postMessage(variant)
      cy.get('@postMessage').its('lastCall.args.0').should('equal', `done-${variant}`)
      cy.get('canvas').percySnapshot(`add-remove-cadasset-from-renderer - ${variant}`)
    })

    cy.window().then((win) => {
      const variant = 'variant-02'
      win.postMessage(variant)
      cy.get('@postMessage').its('lastCall.args.0').should('equal', `done-${variant}`)
      cy.get('canvas').percySnapshot(`add-remove-cadasset-from-renderer - ${variant}`)
    })
  })
})
