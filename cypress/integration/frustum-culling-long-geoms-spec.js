describe('frustum-culling-long-geoms', () => {
  it('Capture snapshots', () => {
    cy.visit('testing-e2e/frustum-culling-long-geoms.html', {
      onBeforeLoad(win) {
        cy.spy(win, 'postMessage').as('postMessage')
      },
    })

    cy.get('@postMessage').its('lastCall.args.0').should('equal', 'done-loading')
    cy.get('canvas').percySnapshot('frustum-culling-long-geoms')

    cy.window().then((win) => {
      const variant = 'variant-01'
      win.postMessage(variant)
      cy.get('@postMessage').its('lastCall.args.0').should('equal', `done-${variant}`)
      cy.get('canvas').percySnapshot(`frustum-culling-long-geoms - ${variant}`)
    })
  })
})
