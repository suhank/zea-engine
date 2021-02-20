import { createTouchEvents, cyFocusCanvas } from './utils'

describe('pointer-events', () => {
  beforeEach(() => {
    cy.visit('testing-e2e/pointer-events.html', {
      onBeforeLoad(win) {
        cy.spy(win, 'postMessage').as('postMessage')
      },
    })
  })

  it.skip('Mouse Move - Camera Manipulator', () => {
    cy.get('canvas').trigger('mousedown', 'left').trigger('mousemove', 'center').trigger('mouseup', 'center')

    cy.get('canvas').percySnapshot(`MouseMoveCameraManipulator`)
  })

  it.skip('Mouse Enter - Geometry', () => {
    cyFocusCanvas()

    cy.get('canvas').trigger('mousemove', 100, 230).trigger('mousemove', 250, 230)

    cy.get('canvas').percySnapshot(`MouseEnterGeometry`)
  })

  it.skip('Mouse Leave - Geometry', () => {
    cyFocusCanvas()

    cy.get('canvas').trigger('mousemove', 250, 230).trigger('mousemove', 100, 230)

    cy.get('canvas').percySnapshot(`MouseLeaveGeometry`)
  })

  it.skip('Wheel Zoom In - Camera Manipulator', () => {
    cyFocusCanvas()

    cy.get('canvas').trigger('wheel', {
      deltaX: -0,
      deltaY: -200,
      deltaZ: 0,
    })

    cy.get('@postMessage').its('lastCall.args.0').should('equal', `done-moving-camera`)
    cy.get('canvas').percySnapshot(`WheelZoomInCameraManipulator`)
  })

  it.skip('Wheel Zoom Out - Camera Manipulator', () => {
    cyFocusCanvas()

    cy.get('canvas').trigger('wheel', {
      deltaX: -0,
      deltaY: 500,
      deltaZ: 0,
    })

    cy.get('@postMessage').its('lastCall.args.0').should('equal', `done-moving-camera`)
    cy.get('canvas').percySnapshot(`WheelZoomOutCameraManipulator`)
  })

  it.skip('Double Click - Geometry', () => {
    cy.get('canvas').dblclick(800, 300)

    cy.get('canvas').percySnapshot(`DoubleClickGeometry`)
  })

  it.skip('Touch Move - Camera manipulator', () => {
    const eTouchStart = createTouchEvents([600, 600])
    const eTouch = createTouchEvents([550, 600])

    cy.get('canvas')
      .trigger('touchstart', eTouchStart)
      .trigger('touchmove', eTouch)
      .trigger('touchend', eTouch)
      .percySnapshot(`TouchMoveCameraManipulator`)
  })

  it.skip('Double Tap - Geometry', () => {
    const eTouch = createTouchEvents([800, 300])
    cy.get('canvas')
      .trigger('touchstart', eTouch)
      .trigger('touchend', eTouch)
      .trigger('touchstart', eTouch)
      .trigger('touchend', eTouch)

    cy.get('canvas').percySnapshot(`DoubleTapGeometry`)
  })

  it.skip('Touch Zoom In - Camera manipulator', () => {
    const eTouchStart = createTouchEvents([600, 600, 650, 600])
    const eTouch = createTouchEvents([500, 600, 700, 600])

    cy.get('canvas')
      .trigger('touchstart', eTouchStart)
      .trigger('touchmove', eTouch)
      .trigger('touchend', eTouch)
      .percySnapshot(`TouchZoomInCameraManipulator`)
  })

  it.skip('Touch Zoom Out - Camera manipulator', () => {
    const eTouchStart = createTouchEvents([500, 600, 700, 600])
    const eTouch = createTouchEvents([600, 600, 650, 600])

    cy.get('canvas')
      .trigger('touchstart', eTouchStart)
      .trigger('touchmove', eTouch)
      .trigger('touchend', eTouch)
      .percySnapshot(`TouchZoomOutCameraManipulator`)
  })
})
