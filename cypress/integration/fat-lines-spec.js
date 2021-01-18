describe('fat-lines', () => {
  it('Captures a snapshot', () => {
    cy.visit('testing-e2e/fat-lines.html')
    cy.get('canvas').percySnapshot('fat-lines')
  })

  it('Captures snapshots of variants', () => {
    cy.visit('testing-e2e/fat-lines.html', {
      onBeforeLoad(win) {
        cy.spy(win, 'postMessage').as('postMessage')
      },
    })

    cy.get('@postMessage').its('lastCall.args.0').should('equal', 'done-loading')

    cy.window().then((win) => {
      const variant = 'variant-01'
      win.postMessage(variant)
      cy.get('@postMessage').its('lastCall.args.0').should('equal', `done-${variant}`)
      cy.get('canvas').percySnapshot(`fat-lines - ${variant}`)
    })

    cy.window().then((win) => {
      const variant = 'variant-02'
      win.postMessage(variant)
      cy.get('@postMessage').its('lastCall.args.0').should('equal', `done-${variant}`)
      cy.get('canvas').percySnapshot(`fat-lines - ${variant}`)
    })
  })
})
