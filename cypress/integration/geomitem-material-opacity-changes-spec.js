describe('geomitem-material-opacity-changes', () => {
  it('Captures snapshots of variants', () => {
    cy.visit('testing-e2e/geomitem-material-opacity-changes.html', {
      onBeforeLoad(win) {
        cy.spy(win, 'postMessage').as('postMessage')
      },
    })

    cy.get('@postMessage').its('lastCall.args.0').should('equal', 'done-loading')
    cy.get('canvas').percySnapshot('geomitem-material-opacity-changes')

    cy.window().then((win) => {
      const variant = 'variant-01'
      win.postMessage(variant)
      cy.get('@postMessage').its('lastCall.args.0').should('equal', `done-${variant}`)
      cy.get('canvas').percySnapshot(`geomitem-material-opacity-changes - ${variant}`)
    })

    cy.window().then((win) => {
      const variant = 'variant-02'
      win.postMessage(variant)
      cy.get('@postMessage').its('lastCall.args.0').should('equal', `done-${variant}`)
      cy.get('canvas').percySnapshot(`geomitem-material-opacity-changes - ${variant}`)
    })

    cy.window().then((win) => {
      const variant = 'variant-03'
      win.postMessage(variant)
      cy.get('@postMessage').its('lastCall.args.0').should('equal', `done-${variant}`)
      cy.get('canvas').percySnapshot(`geomitem-material-opacity-changes - ${variant}`)
    })
  })
})
