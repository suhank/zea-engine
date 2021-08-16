describe.skip('Zea Engine', () => {
  it('Loads an OBJ asset', () => {
    cy.visit('testing-e2e/load-obj-asset.html', {
      onBeforeLoad(win) {
        cy.spy(win, 'postMessage').as('postMessage')
      },
    })

    cy.get('@postMessage').its('lastCall.args.0').should('equal', 'done-loading')

    /* Eliminating redundant tests while our limit is 5k images per month
    cy.window().then((win) => {
      const variant = 'front'
      win.postMessage(variant)
      cy.get('@postMessage').its('lastCall.args.0').should('equal', `done-${variant}`)
      cy.get('canvas').percySnapshot(`OBJ asset ${variant}`)
    })

    cy.window().then((win) => {
      const variant = 'back'
      win.postMessage(variant)
      cy.get('@postMessage').its('lastCall.args.0').should('equal', `done-${variant}`)
      cy.get('canvas').percySnapshot(`OBJ asset ${variant}`)
    })
    */
  })
})
