describe('occlusion-culling-tiny-objects', () => {
  it('Capture snapshots', () => {
    cy.visit('testing-e2e/occlusion-culling-tiny-objects.html', {
      onBeforeLoad(win) {
        cy.spy(win, 'postMessage').as('postMessage')
      },
    })

    cy.get('@postMessage').its('lastCall.args.0').should('equal', 'done-loading')
    cy.get('canvas').percySnapshot('occlusion-culling-tiny-objects')

    cy.window().then((win) => {
      const variant = 'variant-01'
      win.postMessage(variant)
      cy.get('@postMessage').its('lastCall.args.0').should('equal', `done-${variant}`)
      cy.get('canvas').percySnapshot(`occlusion-culling-tiny-objects - ${variant}`)
    })
  })
})
