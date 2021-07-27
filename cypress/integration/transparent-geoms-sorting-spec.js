describe('transparent-geoms-sorting', () => {
  it('Captures snapshots of variants', () => {
    cy.visit('testing-e2e/transparent-geoms-sorting.html', {
      onBeforeLoad(win) {
        cy.spy(win, 'postMessage').as('postMessage')
      },
    })

    cy.get('@postMessage').its('lastCall.args.0').should('equal', 'done-loading')
    cy.get('canvas').percySnapshot('transparent-geoms-sorting')

    cy.get('#variant-01').click()
    cy.get('@postMessage').its('lastCall.args.0').should('equal', `done-variant-01`)
    cy.get('canvas').percySnapshot(`transparent-geoms-sorting - variant-01`)

    cy.get('#variant-02').click()
    cy.get('@postMessage').its('lastCall.args.0').should('equal', `done-variant-02`)
    cy.get('canvas').percySnapshot(`transparent-geoms-sorting - variant-02`)

    cy.get('#variant-03').click()
    cy.get('@postMessage').its('lastCall.args.0').should('equal', `done-variant-03`)
    cy.get('canvas').percySnapshot(`transparent-geoms-sorting - variant-02`)

    cy.get('#variant-04').click()
    cy.get('@postMessage').its('lastCall.args.0').should('equal', `done-variant-04`)
    cy.get('canvas').percySnapshot(`transparent-geoms-sorting - variant-02`)
  })
})
