/* eslint-disable require-jsdoc */
import { Vec2, Vec3, Quat, Xfo } from '../../Math/index'
import { ParameterOwner } from '../ParameterOwner.js'
import { NumberParameter } from '../Parameters/index'
import { SystemDesc } from '../../SystemDesc.js'

const MANIPULATION_MODES = {
  pan: 0,
  dolly: 1,
  focussing: 2,
  look: 3,
  turntable: 4,
  tumbler: 5,
  trackball: 6,
}

/**
 * Class for defining and interaction model of the camera.
 *
 * The CameraManipulator supports a variety of manipulation modes, and hotkeys/modifier keys
 * that allow the user to rapidly switch between modes, such as 'turntable' and 'pan'.
 * A detailed explanation of various camera manipulation modes can be found
 * here: https://www.mattkeeter.com/projects/rotation/
 *
 * **MANIPULATION_MODES**
 * * **pan:** Translates the camera sideways according the the camera's current orientation. Activated by the right mouse button, or two fingered touches on mobile.
 * * **dolly:** Translates the camera forwards and backwards according the the camera's current orientation. Activated by holding the ctrl and alt keys while using the left mouse button, or the mouse wheel, or two fingered touches on mobile.
 * * **focussing:** Focusses the camera on a specific 3d point in the scene. Activated by double clicking, or double tapping on a geometry in the 3d view.
 * * **look:** Rotates the camera around its own position. Useful for simulating looking by turning ones head inside a scene. Activated by holding the ctrl key and right mouse button.
 * * **turntable:** Rotates the camera around the current camera target, using the turntable style manipulation described above. Activated by the left mouse button.
 * * **tumbler:** Rotates the camera around the current camera target, using the tumbler style manipulation described above. Activated by the left mouse button.
 * * **trackball:** Rotates the camera around the current camera target, using the trackball style manipulation described above. Activated by the left mouse button.
 *
 * The default manipulation mode, is the mode that is active with only the left mouse button. The default manipulation mode is currently 'turntable'.
 *
 * To Assign a different default manipulation mode, retrieve the manipulator from the viewport
 * and set the default mode.
 * ```
 * const customManipulator = renderer.getViewport().getManipulator()
 * customManipulator.setDefaultManipulationMode(CameraManipulator.MANIPULATION_MODES.trackball);
 * ```
 *
 * This class is the default manipulator, and can be replaced with custom manipulators.
 *
 * ```
 * const customManipulator = new CustomCameraManipulator()
 * renderer.getViewport().setManipulator(customManipulator);
 * ```
 *
 *
 * **Parameters**
 * * **orbitRate(`NumberParameter`):** The rate at which mouse or touch interactions are translated camera orientation changes.
 * * **dollySpeed(`NumberParameter`):** The rate at which the mouse button or touch interactions are translated camera dolly movement.
 * * **mouseWheelDollySpeed(`NumberParameter`):** The rate at which the mouse wheel interactions are translated camera dolly movement.
 *
 *   Note: this value defaults to different values for touch based interfaces to mouse based input.
 *   For mobile devices, the orbit rate defaults to -0.3, and for mouse based interaction, the value defaults to 1.
 *   A value of 1 means that the camera will rotate 180 degrees for a mouse interaction that spans from the left border of the viewport to the right border.
 *   Some applications might require lower, or higher default values
 *
 * To set different default values for mobile or desktop set a different value based on the SystemDesc.isMobileDevice flag.
 * ```
 * const customManipulator = renderer.getViewport().getManipulator()
 * customManipulator.getParameter('orbitRate').setValue(SystemDesc.isMobileDevice ? -0.3 : 1)
 * ```
 *
 * **Events**
 * * **movementFinished:** Triggered when a camera movement is finished. E.g. when the user releases the mouse after a dolly, or after the focussing action has completed.
 *
 * @extends ParameterOwner
 */
class CameraManipulator extends ParameterOwner {
  /**
   * Create a camera, mouse and keyboard
   * @param {string} name - The name value.
   */
  constructor(name = undefined) {
    if (name == undefined) name = 'Camera'
    super(name)

    this.__defaultManipulationState = MANIPULATION_MODES.turntable
    this.__manipulationState = this.__defaultManipulationState
    this.__mouseDown = false
    this.__dragging = false
    this.__mouseDragDelta = new Vec2()
    this.__keyboardMovement = false
    this.__keysPressed = []
    this.__maxVel = 0.002
    this.__velocity = new Vec3()

    this.__ongoingTouches = {}

    this.__globalXfoChangedDuringDrag = this.__globalXfoChangedDuringDrag.bind(this)

    this.__orbitRateParam = this.addParameter(new NumberParameter('orbitRate', SystemDesc.isMobileDevice ? -0.1 : 1))
    this.__dollySpeedParam = this.addParameter(new NumberParameter('dollySpeed', 0.02))
    this.__mouseWheelDollySpeedParam = this.addParameter(new NumberParameter('mouseWheelDollySpeed', 0.0005))
  }

  /**
   * Sets default manipulation mode.
   * The value can be on of the keys in #CameraManipulator.MANIPULATION_MODES
   *
   * @param {string} manipulationMode - The manipulation mode value.
   */
  setDefaultManipulationMode(manipulationMode) {
    if (typeof manipulationMode == 'string') {
      this.__defaultManipulationState = MANIPULATION_MODES[manipulationMode]
    } else this.__defaultManipulationState = manipulationMode
  }

  /**
   * The look method.
   * @param {MouseEvent} event - The event value.
   * @param {Vec2} dragVec - The drag vector value.
   */
  look(event, dragVec) {
    const { viewport } = event
    const camera = viewport.getCamera()

    const focalDistance = camera.getFocalDistance()
    const orbitRate = this.__orbitRateParam.getValue()

    if (this.__keyboardMovement) {
      const globalXfo = camera.getParameter('GlobalXfo').getValue()
      this.__mouseDownCameraXfo = globalXfo.clone()
      this.__mouseDownZaxis = globalXfo.ori.getZaxis()
      const targetOffset = this.__mouseDownZaxis.scale(-focalDistance)
      this.__mouseDownCameraTarget = globalXfo.tr.add(targetOffset)
    }

    const globalXfo = this.__mouseDownCameraXfo.clone()

    // Orbit
    const orbit = new Quat()
    orbit.rotateZ((dragVec.x / viewport.getWidth()) * Math.PI * orbitRate)
    globalXfo.ori = orbit.multiply(globalXfo.ori)

    // Pitch
    const pitch = new Quat()
    pitch.rotateX((dragVec.y / viewport.getHeight()) * Math.PI * orbitRate)
    globalXfo.ori.multiplyInPlace(pitch)

    if (this.__keyboardMovement) {
      // TODO: debug this potential regression. we now use the generic method which emits a signal.
      // Avoid generating a signal because we have an animation frame occurring.
      // see: onKeyPressed
      camera.getParameter('GlobalXfo').setValue(globalXfo)
    } else {
      camera.getParameter('GlobalXfo').setValue(globalXfo)
    }
  }

  /**
   * Rotates viewport camera about the target.
   *
   * @param {MouseEvent} event - The event value.
   * @param {Vec2} dragVec - The drag vector value.
   */
  turntable(event, dragVec) {
    const { viewport } = event
    const camera = viewport.getCamera()

    const focalDistance = camera.getFocalDistance()
    const orbitRate = this.__orbitRateParam.getValue()

    if (this.__keyboardMovement) {
      const globalXfo = camera.getParameter('GlobalXfo').getValue()
      this.__mouseDownCameraXfo = globalXfo.clone()
      this.__mouseDownZaxis = globalXfo.ori.getZaxis()
      const targetOffset = this.__mouseDownZaxis.scale(-focalDistance)
      this.__mouseDownCameraTarget = globalXfo.tr.add(targetOffset)
    }

    const globalXfo = this.__mouseDownCameraXfo.clone()

    // Orbit
    const orbit = new Quat()
    orbit.rotateZ((dragVec.x / viewport.getWidth()) * 2 * Math.PI * -orbitRate)
    globalXfo.ori = orbit.multiply(globalXfo.ori)

    // Pitch
    const pitch = new Quat()
    pitch.rotateX((dragVec.y / viewport.getHeight()) * Math.PI * -orbitRate)
    globalXfo.ori.multiplyInPlace(pitch)

    globalXfo.tr = this.__mouseDownCameraTarget.add(globalXfo.ori.getZaxis().scale(focalDistance))

    if (this.__keyboardMovement) {
      // TODO: debug this potential regression. we now use the generic method which emits a signal.
      // Avoid generating a signal because we have an animation frame occurring.
      // see: onKeyPressed
      camera.getParameter('GlobalXfo').setValue(globalXfo)
    } else {
      camera.getParameter('GlobalXfo').setValue(globalXfo)
    }
  }

  /**
   * Rotates viewport camera about the target.
   *
   * @param {MouseEvent} event - The event value.
   * @param {Vec2} dragVec - The drag vector value.
   */
  tumble(event, dragVec) {
    const { viewport } = event
    const camera = viewport.getCamera()
    const focalDistance = camera.getFocalDistance()
    const orbitRate = this.__orbitRateParam.getValue()

    const xvec = this.__mouseDownCameraXfo.ori.getXaxis()
    const yvec = this.__mouseDownCameraXfo.ori.getYaxis()
    const zvec = this.__mouseDownCameraXfo.ori.getZaxis()
    const vec = xvec.scale(-dragVec.x).add(yvec.scale(dragVec.y))
    const rotateAxis = vec.cross(zvec)
    rotateAxis.normalizeInPlace()

    const dragVecLength = dragVec.length()

    const globalXfo = this.__mouseDownCameraXfo.clone()

    // Orbit
    const orbit = new Quat()
    orbit.setFromAxisAndAngle(rotateAxis, (dragVecLength / viewport.getWidth()) * Math.PI * -orbitRate)
    globalXfo.ori = orbit.multiply(globalXfo.ori)

    globalXfo.tr = this.__mouseDownCameraTarget.add(globalXfo.ori.getZaxis().scale(focalDistance))

    camera.getParameter('GlobalXfo').setValue(globalXfo)

    // Update the mouse pos so the next delta is just the difference to this update.
    this.__mouseDownPos = event.mousePos
    this.__mouseDownCameraXfo = globalXfo
  }

  /**
   * Rotates viewport camera about the target.
   *
   * @param {MouseEvent} event - The event value.
   * @param {Vec2} dragVec - The drag vector value.
   */
  trackball(event, dragVec) {
    const { viewport } = event
    const camera = viewport.getCamera()
    const focalDistance = camera.getFocalDistance()
    const orbitRate = this.__orbitRateParam.getValue()

    const xvec = this.__mouseDownCameraXfo.ori.getXaxis()
    const yvec = this.__mouseDownCameraXfo.ori.getYaxis()
    const zvec = this.__mouseDownCameraXfo.ori.getZaxis()
    const vec = xvec.scale(-dragVec.x).add(yvec.scale(dragVec.y))
    const rotateAxis = vec.cross(zvec)
    rotateAxis.normalizeInPlace()

    const dragVecLength = dragVec.length()

    const globalXfo = this.__mouseDownCameraXfo.clone()

    // Orbit
    const orbit = new Quat()
    orbit.setFromAxisAndAngle(rotateAxis, (dragVecLength / viewport.getWidth()) * Math.PI * -orbitRate)
    globalXfo.ori = orbit.multiply(globalXfo.ori)

    globalXfo.tr = this.__mouseDownCameraTarget.add(globalXfo.ori.getZaxis().scale(focalDistance))

    camera.getParameter('GlobalXfo').setValue(globalXfo)
  }

  /**
   * Rotates the camera around its own `X`,`Y` axes.
   *
   * @param {MouseEvent} event - The event value.
   * @param {Vec2} dragVec - The drag vector value.
   */
  pan(event, dragVec) {
    const { viewport } = event
    const camera = viewport.getCamera()

    const focalDistance = camera.getFocalDistance()
    const fovY = camera.getFov()
    const xAxis = new Vec3(1, 0, 0)
    const yAxis = new Vec3(0, 1, 0)

    const cameraPlaneHeight = 2.0 * focalDistance * Math.tan(0.5 * fovY)
    const cameraPlaneWidth = cameraPlaneHeight * (viewport.getWidth() / viewport.getHeight())
    const delta = new Xfo()
    delta.tr = xAxis.scale(-(dragVec.x / viewport.getWidth()) * cameraPlaneWidth)
    delta.tr.addInPlace(yAxis.scale((dragVec.y / viewport.getHeight()) * cameraPlaneHeight))

    camera.getParameter('GlobalXfo').setValue(this.__mouseDownCameraXfo.multiply(delta))
  }

  /**
   * The dolly method.
   * @param {MouseEvent} event - The event value.
   * @param {Vec2} dragVec - The drag vector value.
   */
  dolly(event, dragVec) {
    const { viewport } = event
    const camera = viewport.getCamera()

    const dollyDist = dragVec.x * this.__dollySpeedParam.getValue()
    const delta = new Xfo()
    delta.tr.set(0, 0, dollyDist)
    camera.getParameter('GlobalXfo').setValue(this.__mouseDownCameraXfo.multiply(delta))
  }

  /**
   * Rotates the camera around its own `X`,`Y` axes and applies a zoom.
   *
   * @param {MouseEvent} event - The event value.
   * @param {Vec2} panDelta - The pan delta value.
   * @param {number} dragDist - The drag distance value.
   */
  panAndZoom(event, panDelta, dragDist) {
    const { viewport } = event
    const camera = viewport.getCamera()

    const focalDistance = camera.getFocalDistance()
    const fovY = camera.getFov()

    const xAxis = new Vec3(1, 0, 0)
    const yAxis = new Vec3(0, 1, 0)

    const cameraPlaneHeight = 2.0 * focalDistance * Math.tan(0.5 * fovY)
    const cameraPlaneWidth = cameraPlaneHeight * (viewport.getWidth() / viewport.getHeight())
    const delta = new Xfo()
    delta.tr = xAxis.scale(-(panDelta.x / viewport.getWidth()) * cameraPlaneWidth)
    delta.tr.addInPlace(yAxis.scale((panDelta.y / viewport.getHeight()) * cameraPlaneHeight))

    const zoomDist = dragDist * focalDistance
    camera.setFocalDistance(this.__mouseDownFocalDist + zoomDist)
    delta.tr.z += zoomDist
    camera.getParameter('GlobalXfo').setValue(this.__mouseDownCameraXfo.multiply(delta))
  }

  /**
   * The initDrag method.
   *
   * @private
   * @param {MouseEvent} event - The event value.
   */
  initDrag(event) {
    const { viewport } = event
    const camera = viewport.getCamera()
    const focalDistance = camera.getFocalDistance()

    this.__mouseDown = true
    this.__calculatingDragAction = false
    this.__mouseDownPos = event.mousePos
    this.__mouseDownViewport = viewport
    this.__mouseDragDelta.set(0, 0)
    this.__mouseDownCameraXfo = camera.getParameter('GlobalXfo').getValue().clone()
    this.__mouseDownZaxis = this.__mouseDownCameraXfo.ori.getZaxis()
    const targetOffset = this.__mouseDownZaxis.scale(-focalDistance)
    this.__mouseDownCameraTarget = camera.getParameter('GlobalXfo').getValue().tr.add(targetOffset)
    this.__mouseDownFocalDist = focalDistance

    camera.getParameter('GlobalXfo').on('valueChanged', this.__globalXfoChangedDuringDrag)

    this.__dragging = true
  }

  /**
   * @private
   */
  __globalXfoChangedDuringDrag() {
    if (!this.__calculatingDragAction) {
      if (this.__dragging) {
        const camera = this.__mouseDownViewport.getCamera()
        camera.getParameter('GlobalXfo').off('valueChanged', this.__globalXfoChangedDuringDrag)
        this.__dragging = false
      }
      this.initDrag({ viewport: this.__mouseDownViewport, mousePos: this.__mouseDownPos })
    }
  }

  /**
   * The initDrag method.
   *
   * @private
   * @param {MouseEvent} event - The event value.
   */
  endDrag(event) {
    if (this.__dragging) {
      const { viewport } = event
      const camera = viewport.getCamera()
      camera.getParameter('GlobalXfo').off('valueChanged', this.__globalXfoChangedDuringDrag)
      this.__dragging = false
    }
    this.__mouseDown = false
  }

  /**
   * The aimFocus method.
   *
   * @private
   * @param {MouseEvent} event - The event value.
   * @param {Vec3} pos - The position value.
   */
  aimFocus(event, pos) {
    const { viewport } = event
    const camera = viewport.getCamera()

    if (this.__focusIntervalId) clearInterval(this.__focusIntervalId)

    const count = 20
    let i = 0
    const applyMovement = () => {
      const initlalGlobalXfo = camera.getParameter('GlobalXfo').getValue()
      const initlalDist = camera.getFocalDistance()
      const dir = pos.subtract(initlalGlobalXfo.tr)
      const dist = dir.normalizeInPlace()

      const orbit = new Quat()
      const pitch = new Quat()

      // Orbit
      {
        const currDir = initlalGlobalXfo.ori.getZaxis().clone()
        currDir.z = 0
        const newDir = dir.negate()
        newDir.z = 0

        orbit.setFrom2Vectors(currDir, newDir)
      }

      // Pitch
      {
        const currDir = initlalGlobalXfo.ori.getZaxis().clone()
        const newDir = dir.negate()
        currDir.x = newDir.x
        currDir.y = newDir.y
        currDir.normalizeInPlace()

        if (currDir.cross(newDir).dot(initlalGlobalXfo.ori.getXaxis()) > 0.0) pitch.rotateX(currDir.angleTo(newDir))
        else pitch.rotateX(-currDir.angleTo(newDir))
      }

      const targetGlobalXfo = initlalGlobalXfo.clone()
      targetGlobalXfo.ori = orbit.multiply(targetGlobalXfo.ori)
      targetGlobalXfo.ori.multiplyInPlace(pitch)

      // With each iteration we get closer to our goal
      // and on the final iteration we should aim perfectly at
      // the target.
      const t = Math.pow(i / count, 2)
      const globalXfo = initlalGlobalXfo.clone()
      globalXfo.ori = initlalGlobalXfo.ori.lerp(targetGlobalXfo.ori, t)

      camera.setFocalDistance(initlalDist + (dist - initlalDist) * t)
      camera.getParameter('GlobalXfo').setValue(globalXfo)

      i++
      if (i <= count) {
        this.__focusIntervalId = setTimeout(applyMovement, 20)
      } else {
        this.__focusIntervalId = undefined
        this.emit('movementFinished', {})
        camera.emit('movementFinished', {})
      }
    }
    applyMovement()

    this.__manipulationState = 'focussing'
  }

  /**
   * Causes an event to occur when the mouse pointer is moving while over an element.
   *
   * @param {MouseEvent} event - The mouse event that occurs.
   */
  onMouseMove(event) {}

  /**
   * Causes an event to occur when a user double clicks a mouse button over an element.
   *
   * @param {MouseEvent} event - The mouse event that occurs.
   */
  onDoubleClick(event) {
    if (event.intersectionData) {
      const camera = event.viewport.getCamera()
      const cameraGlobalXfo = camera.getParameter('GlobalXfo').getValue()
      const pos = cameraGlobalXfo.tr.add(event.mouseRay.dir.scale(event.intersectionData.dist))
      this.aimFocus(event, pos)
    }
  }

  /**
   * Causes an event to occur when the user starts to drag an element.
   *
   * @param {MouseEvent} event - The mouse event that occurs.
   */
  onMouseDown(event) {
    // this.initDrag(event)
    if (this.__dragging) {
      const camera = this.__mouseDownViewport.getCamera()
      camera.getParameter('GlobalXfo').off('valueChanged', this.__globalXfoChangedDuringDrag)
      this.__dragging = false
    }
    this.initDrag(event)

    if (event.button == 2) {
      this.__manipulationState = MANIPULATION_MODES.pan
    } else if (event.ctrlKey && event.altKey) {
      this.__manipulationState = MANIPULATION_MODES.dolly
    } else if (event.ctrlKey || event.button == 2) {
      this.__manipulationState = MANIPULATION_MODES.look
    } else {
      this.__manipulationState = this.__defaultManipulationState
    }
    event.stopPropagation()
    event.preventDefault()
  }

  /**
   * Causes an event to occur when an element is being dragged.
   *
   * @param {MouseEvent} event - The mouse event that occurs.
   */
  onMouseMove(event) {
    if (!this.__mouseDown) return
    const mousePos = event.mousePos
    this.__calculatingDragAction = true
    if (this.__keyboardMovement) {
      this.__mouseDragDelta = mousePos
    } else {
      this.__mouseDragDelta = mousePos.subtract(this.__mouseDownPos)
    }
    switch (this.__manipulationState) {
      case MANIPULATION_MODES.turntable:
        this.turntable(event, this.__mouseDragDelta)
        break
      case MANIPULATION_MODES.tumbler:
        this.tumble(event, this.__mouseDragDelta)
        break
      case MANIPULATION_MODES.trackball:
        this.trackball(event, this.__mouseDragDelta)
        break
      case MANIPULATION_MODES.look:
        this.look(event, this.__mouseDragDelta)
        break
      case MANIPULATION_MODES.pan:
        this.pan(event, this.__mouseDragDelta)
        break
      case MANIPULATION_MODES.dolly:
        this.dolly(event, this.__mouseDragDelta)
        break
    }
    this.__dragging = true
    this.__calculatingDragAction = false
    event.stopPropagation()
    event.preventDefault()
  }

  /**
   * Causes an event to occur when the user has finished dragging an element.
   *
   * @param {MouseEvent} event - The mouse event that occurs.
   */
  onMouseUp(event) {
    if (this.__dragging) {
      this.endDrag(event)
      this.emit('movementFinished', {})
      event.viewport.getCamera().emit('movementFinished', {})
      event.stopPropagation()
    }
  }

  /**
   * Causes an event to occur when the mouse wheel is rolled up or down over an element.
   *
   * @param {WheelEvent} event - The wheel event that occurs.
   */
  onWheel(event) {
    const { viewport } = event
    const camera = viewport.getCamera()
    const mouseWheelDollySpeed = this.__mouseWheelDollySpeedParam.getValue()
    const modulator = event.shiftKey ? 0.1 : 0.5
    const xfo = camera.getParameter('GlobalXfo').getValue()
    const movementVec = xfo.ori.getZaxis()
    if (this.__mouseWheelZoomIntervalId) clearInterval(this.__mouseWheelZoomIntervalId)
    let count = 0
    const applyMovement = () => {
      const focalDistance = camera.getFocalDistance()
      const zoomDist = event.deltaY * mouseWheelDollySpeed * focalDistance * modulator
      xfo.tr.addInPlace(movementVec.scale(zoomDist))
      if (this.__defaultManipulationState != MANIPULATION_MODES.walk) {
        camera.setFocalDistance(camera.getFocalDistance() + zoomDist)
      }
      camera.getParameter('GlobalXfo').setValue(xfo)

      count++
      if (count < 10) {
        this.__mouseWheelZoomIntervalId = setTimeout(applyMovement, 10)
      } else {
        this.__mouseWheelZoomIntervalId = undefined
        this.emit('movementFinished', {})
        camera.emit('movementFinished', {})
      }
    }
    applyMovement()

    event.preventDefault()
    event.stopPropagation()
  }

  /**
   * The __integrateVelocityChange method.
   * @param {MouseEvent} event - The event value.
   * @private
   */
  __integrateVelocityChange(event) {
    const { viewport } = event
    const camera = viewport.getCamera()
    const delta = new Xfo()
    delta.tr = this.__velocity.normalize().scale(this.__maxVel)
    camera.getParameter('GlobalXfo').setValue(camera.getParameter('GlobalXfo').getValue().multiply(delta))
  }

  /**
   * Causes an event to occurs when the user presses a key on the keyboard.
   *
   * @param {KeyboardEvent} event - The keyboard event that occurs.
   * @return {boolean} - The return value.
   * @private
   */
  onKeyPressed(event) {
    // Note: onKeyPressed is called initially only once, and then we
    // get a series of calls. Here we ignore subsequent events.
    // (TODO: move this logic to a special controller)
    /*
    const key = String.fromCharCode(event.keyCode).toLowerCase()
    switch (key) {
      case 'w':
        if (this.__keysPressed.includes(key))
          return false;
        this.__velocity.z -= 1.0;
        break;
      case 's':
        if (this.__keysPressed.includes(key))
          return false;
        this.__velocity.z += 1.0;
        break;
      case 'a':
        if (this.__keysPressed.includes(key))
          return false;
        this.__velocity.x -= 1.0;
        break;
      case 'd':
        if (this.__keysPressed.includes(key))
          return false;
        this.__velocity.x += 1.0;
        break;
      default:
        return false;
    }
    this.__keysPressed.push(key);
    if (!this.__keyboardMovement) {
      this.__keyboardMovement = true;
      let animationFrame = ()=>{
        this.__integrateVelocityChange(event)
        if (this.__keyboardMovement)
          window.requestAnimationFrame(animationFrame);
      }
      window.requestAnimationFrame(animationFrame);
    }
    */
    return false // no keys handled
  }

  /**
   * Causes an event to occur when the user is pressing a key on the keyboard.
   *
   * @param {KeyboardEvent} event - The keyboard event that occurs.
   * @private
   */
  onKeyDown(event) {}

  /**
   * Causes an event to occur when the user releases a key on the keyboard.
   *
   * @param {KeyboardEvent} event - The event that occurs.
   * @private
   */
  onKeyUp(event) {
    // (TODO: move this logic to a special controller)
    /*
    const key = String.fromCharCode(event.keyCode).toLowerCase()
    switch (key) {
      case 'w':
        this.__velocity.z += 1.0;
        break;
      case 's':
        this.__velocity.z -= 1.0;
        break;
      case 'a':
        this.__velocity.x += 1.0;
        break;
      case 'd':
        this.__velocity.x -= 1.0;
        break;
      default:
        return false;
    }
    let keyIndex = this.__keysPressed.indexOf(key);
    this.__keysPressed.splice(keyIndex, 1);
    if (this.__keysPressed.length == 0)
      this.__keyboardMovement = false;
    */
  }

  // ///////////////////////////////////
  // Touch controls

  /**
   * The __startTouch method.
   * @param {TouchEvent} touch - The touch value.
   * @private
   */
  __startTouch(touch) {
    this.__ongoingTouches[touch.identifier] = {
      identifier: touch.identifier,
      pos: new Vec2(touch.pageX, touch.pageY),
    }
  }

  /**
   * The __endTouch method.
   * @param {TouchEvent} touch - The touch value.
   * @private
   */
  __endTouch(touch) {
    // let idx = this.__ongoingTouchIndexById(touch.identifier);
    // this.__ongoingTouches.splice(idx, 1); // remove it; we're done
    delete this.__ongoingTouches[touch.identifier]
  }

  // Touch events

  /**
   * Causes an event to occur when the user touches an element on a touch screen.
   *
   * @param {TouchEvent} event - The touch event that occurs.
   */
  onTouchStart(event) {
    console.log('onTouchStart')
    event.preventDefault()
    event.stopPropagation()

    if (Object.keys(this.__ongoingTouches).length == 0) this.__manipMode = undefined

    const touches = event.changedTouches
    for (let i = 0; i < touches.length; i++) {
      this.__startTouch(touches[i])
    }

    if (Object.keys(this.__ongoingTouches).length == 1) {
      this.initDrag(event)
    }
  }

  /**
   * The event that occurs when the user moves his/her finger across a touch screen.
   *
   * @param {TouchEvent} event - The touch event that occurs.
   */
  onTouchMove(event) {
    event.preventDefault()
    event.stopPropagation()
    // console.log("this.__manipMode:" + this.__manipMode);

    this.__calculatingDragAction = true

    const touches = event.touches
    if (touches.length == 1 && this.__manipMode != 'panAndZoom') {
      const touch = touches[0]
      const touchPos = new Vec2(touch.pageX, touch.pageY)
      const touchData = this.__ongoingTouches[touch.identifier]
      const dragVec = touchData.pos.subtract(touchPos)
      switch (this.__defaultManipulationState) {
        case MANIPULATION_MODES.look:
          // TODO: scale panning here.
          dragVec.scaleInPlace(6.0)
          this.look(event, dragVec)
          break
        case MANIPULATION_MODES.turntable:
          this.turntable(event, dragVec)
          break
        case MANIPULATION_MODES.tumbler:
          this.tumbler(event, dragVec)
          break
        case MANIPULATION_MODES.trackball:
          this.trackball(event, dragVec)
          break
      }
    } else if (touches.length == 2) {
      const touch0 = touches[0]
      const touchData0 = this.__ongoingTouches[touch0.identifier]
      const touch1 = touches[1]
      const touchData1 = this.__ongoingTouches[touch1.identifier]

      const touch0Pos = new Vec2(touch0.pageX, touch0.pageY)
      const touch1Pos = new Vec2(touch1.pageX, touch1.pageY)
      const startSeparation = touchData1.pos.subtract(touchData0.pos).length()
      const dragSeparation = touch1Pos.subtract(touch0Pos).length()
      const separationDist = startSeparation - dragSeparation

      const touch0Drag = touch0Pos.subtract(touchData0.pos)
      const touch1Drag = touch1Pos.subtract(touchData1.pos)
      const dragVec = touch0Drag.add(touch1Drag)
      // TODO: scale panning here.
      dragVec.scaleInPlace(0.5)
      this.panAndZoom(event, dragVec, separationDist * 0.002)
      this.__manipMode = 'panAndZoom'
    }

    this.__calculatingDragAction = false
  }

  /**
   * Causes an event to occur when the user removes his/her finger from an element.
   *
   * @param {TouchEvent} event - The touch event that occurs.
   */
  onTouchEnd(event) {
    event.preventDefault()
    event.stopPropagation()
    const touches = event.changedTouches
    // switch (this.__manipMode) {
    // case 'camera-manipulation':
    //     let touch = touches[0];
    //     let releasePos = new Vec2(touch.pageX, touch.pageY);
    //     viewport.getCamera().onDragEnd(event, releasePos);
    //     break;
    // }
    for (let i = 0; i < touches.length; i++) {
      this.__endTouch(touches[i])
    }

    if (Object.keys(this.__ongoingTouches).length == 0) this.endDrag(event)
  }

  /**
   * Causes an event to occur when the touch event gets interrupted.
   *
   * @param {TouchEvent} event - The touch event that occurs.
   */
  onTouchCancel(event) {
    event.preventDefault()
    const touches = event.touches
    for (let i = 0; i < touches.length; i++) {
      this.__endTouch(touches[i])
    }
    if (Object.keys(this.__ongoingTouches).length == 0) this.endDrag(event)
  }

  /**
   * Causes an event to occur when the user double taps an element on a touch screen.
   *
   * @param {TouchEvent} event - The touch event that occurs.
   */
  onDoubleTap(event) {
    if (event.intersectionData) {
      const { viewport } = event
      const camera = viewport.getCamera()
      const pos = camera
        .getParameter('GlobalXfo')
        .getValue()
        .tr.add(event.touchRay.dir.scale(event.intersectionData.dist))
      this.aimFocus(event, pos)
    }
    event.preventDefault()
  }

  /**
   * Returns a dictionary of support manipulation modes.
   *
   * @param {TouchEvent} event - The touch event that occurs.
   */
  static get MANIPULATION_MODES() {
    return MANIPULATION_MODES
  }
}

export { CameraManipulator }
