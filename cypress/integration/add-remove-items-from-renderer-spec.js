describe('add-remove-items-from-renderer', () => {
  it('Captures snapshots of variants', () => {
    cy.visit('testing-e2e/add-remove-items-from-renderer.html', {
      onBeforeLoad(win) {
        cy.spy(win, 'postMessage').as('postMessage')
      },
    })

    cy.get('@postMessage').its('lastCall.args.0').should('equal', 'done-loading')
    cy.get('canvas').percySnapshot(`add-remove-items-from-renderer`)

    cy.window().then((win) => {
      const variant = 'variant-01'
      win.postMessage(variant)
      cy.get('@postMessage').its('lastCall.args.0').should('equal', `done-${variant}`)
      cy.get('canvas').percySnapshot(`add-remove-items-from-renderer - ${variant}`)
    })

    cy.window().then((win) => {
      const variant = 'variant-02'
      win.postMessage(variant)
      cy.get('@postMessage').its('lastCall.args.0').should('equal', `done-${variant}`)
      cy.get('canvas').percySnapshot(`add-remove-items-from-renderer - ${variant}`)
    })

    cy.window().then((win) => {
      const variant = 'variant-03'
      win.postMessage(variant)
      cy.get('@postMessage').its('lastCall.args.0').should('equal', `done-${variant}`)
      cy.get('canvas').percySnapshot(`add-remove-items-from-renderer - ${variant}`)
    })

    cy.window().then((win) => {
      const variant = 'variant-04'
      win.postMessage(variant)
      cy.get('@postMessage').its('lastCall.args.0').should('equal', `done-${variant}`)
      cy.get('canvas').percySnapshot(`add-remove-items-from-renderer - ${variant}`)
    })

    cy.window().then((win) => {
      const variant = 'variant-05'
      win.postMessage(variant)
      cy.get('@postMessage').its('lastCall.args.0').should('equal', `done-${variant}`)
      cy.get('canvas').percySnapshot(`add-remove-items-from-renderer - ${variant}`)
    })

    cy.window().then((win) => {
      const variant = 'variant-06'
      win.postMessage(variant)
      cy.get('@postMessage').its('lastCall.args.0').should('equal', `done-${variant}`)
      cy.get('canvas').percySnapshot(`add-remove-items-from-renderer - ${variant}`)
    })
  })
})
