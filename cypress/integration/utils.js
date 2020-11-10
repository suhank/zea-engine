const isOdd = (n) => n % 2

const createTouchEvents = (touchPoints = []) => {
  if (isOdd(touchPoints.length)) {
    throw new Error('Odd touch points array length. Use XY coordinates.')
  }

  let identifier = 0
  const touches = []

  for (let i = 0; i < touchPoints.length; i++) {
    touches.push({
      identifier,
      clientX: touchPoints[i],
      clientY: touchPoints[i + 1],
    })

    i++
    identifier++
  }

  return {
    touches,
    changedTouches: touches,
  }
}

// Sometimes we need to focus the viewport in order to trigger other DOM events like `wheel` or `mousemove` without clicking
// Just to test pointer enter or pointer leave.
const cyFocusCanvas = (elSelector = 'canvas', x = 1, y = 1) => {
  cy.get(elSelector).click(x, y)
}

export { createTouchEvents, cyFocusCanvas }
