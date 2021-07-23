describe('camera-orthographic', () => {
  it('Capture snapshots', () => {
    cy.visit('testing-e2e/camera-orthographic.html')
    cy.get('#camera-button-top').click()
    cy.get('canvas').percySnapshot('camera-button-top')
    cy.get('#camera-button-left').click()
    cy.get('canvas').percySnapshot('camera-button-left')
    cy.get('#camera-button-persp').click()
    cy.get('canvas').percySnapshot('camera-button-persp')
  })
})
