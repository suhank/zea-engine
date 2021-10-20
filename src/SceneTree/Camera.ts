/* eslint-disable no-unused-vars */
import { Vec3, Box3, Xfo, Mat4, Vec2 } from '../Math/index'
import { GeomItem } from './GeomItem'
import { TreeItem } from './TreeItem'
import { NumberParameter, Parameter } from './Parameters/index'
import { MathFunctions } from '../Utilities/MathFunctions'
import { Registry } from '../Registry'
import { GLBaseViewport } from '../Renderer/GLBaseViewport'

/**
 * The Camera class is used to provide a point of view of the scene. The viewport is assigned
 * a camera, which is uses during drawing. The camera controls the view and projection used to
 * render the scene.
 *
 * Cameras can provide a perspective projection, or an orthographic projection, and anything in between.
 * To configure whether th projection provided by the camera is Orthographic or Perspective, set
 * the value of the 'isOrthographic' Parameter to a value between 0 and 1. 0.0 being fully perspective
 * and 1.0 being fully Orthographic.
 * Alternatively, you can call camera.setIsOrthographic and pass the value, and a time in milliseconds to
 * take to transition between the current value and your new value.
 * ```javascript
 *   camera.setIsOrthographic(1, 400);
 * ```
 *
 * By default, the Camera automatically adjusts the near and far planes as the focal distance is modified. This
 * behavior can be disabled, by setting the adjustNearAndFarPlanesToFocalDist property to false.
 * Alternatively, you can also adjust the factors that are used to modify the near and far plane based on the
 * focal distance.
 * ```javascript
 *   camera.adjustNearAndFarPlanesToFocalDist = true
 *   camera.nearDistFactor = 0.01
 *   camera.farDistFactor = 5
 * ```
 *
 * **Parameters**
 * * **isOrthographic(`NumberParameter`):** Controls the projection matrix generated by the camera. A value of 0.0, means a perspective projection, while 1 an orthographic projection. Any value in between generates a blended perspective -> orthographic projection.
 * * **fov(`NumberParameter`):** The vertical angle of the view frustum when generating a perspective projection. In orthographic mode, this value is used to calculate the size of the view at the target distance.
 * * **near(`NumberParameter`):** The near clipping distance of the camera.
 * * **far(`NumberParameter`):** The far clipping distance of the camera.
 * * **focalDistance(`NumberParameter`):** The distance at which the camera is focussed. Note: the CameraManipulator sets the focal distance when zooming in on a target.
 *
 * **Events**
 * * **projectionParamChanged:** When on of the parameters above change, the camera emits this event. Note: the Viewport listens to this event and triggers re-rendering.
 * * **movementFinished:** Triggered at the conclusion of some action. E.g. when a zoom action is finished, or when the mouse is released after an orbit action. The viewport listens to this event and triggers a re-rendering of the selection buffers.
 * @extends TreeItem
 */
class Camera extends TreeItem {
  isOrthographicParam = new NumberParameter('isOrthographic', 0.0)
  fovParam = new NumberParameter('fov', 1.0)
  nearParam = new NumberParameter('near', 0.1)
  farParam = new NumberParameter('far', 1000.0)
  focalDistanceParam = new NumberParameter('focalDistance', 5.0)

  protected adjustNearAndFarPlanesToFocalDist: boolean
  protected nearDistFactor: number
  protected farDistFactor: number
  protected frameOnBoundingSphere: boolean

  protected viewHeight: number = 0
  protected __orthoIntervalId: number = -1
  protected __focusIntervalId: number = -1
  /**
   * Instantiates a camera object, setting default configuration like zoom, target and positioning.
   *
   * @param {string} name - The name of the camera.
   */
  constructor(name: string = 'Camera') {
    super(name)
    this.addParameter(this.isOrthographicParam)
    this.addParameter(this.fovParam)
    this.addParameter(this.nearParam)
    this.addParameter(this.farParam)
    this.addParameter(this.focalDistanceParam)

    const emitProjChanged = (event: Record<string, any>) => {
      this.emit('projectionParamChanged', event)
    }
    this.isOrthographicParam.on('valueChanged', emitProjChanged)
    this.fovParam.on('valueChanged', emitProjChanged)
    this.nearParam.on('valueChanged', emitProjChanged)
    this.farParam.on('valueChanged', emitProjChanged)

    // Initial viewing coords of a person standing 3 meters away from the
    // center of the stage looking at something 1 meter off the ground.
    this.setPositionAndTarget(new Vec3(3, 3, 1.75), new Vec3(0, 0, 1))
    this.setLensFocalLength('28mm')

    // Controls whether the camera automatically adjusts the near and far planes
    // as the focal distance changes. Set to false to explicitly control the near
    // and far planes.
    this.adjustNearAndFarPlanesToFocalDist = true
    // The factor by which the near plane is adjusted based on the focal distance.
    this.nearDistFactor = 0.2
    // The factor by which the far plane is adjusted based on the focal distance.
    this.farDistFactor = 5
    this.frameOnBoundingSphere = false
  }

  // ////////////////////////////////////////////
  // Getters/setters.

  /**
   * Returns `near` parameter value.
   *
   * @return {number} - Returns the near value.
   */
  getNear(): number {
    return this.nearParam.value
  }

  /**
   * Sets `near` parameter value
   *
   * @param {number} value - The near value.
   */
  setNear(value: number) {
    this.nearParam.value = value
  }

  /**
   * Returns `far` parameter value.
   *
   * @return {number} - Returns the far value.
   */
  getFar(): number {
    return this.farParam.value
  }

  /**
   * Sets `far` parameter value
   *
   * @param {number} value - The far value.
   */
  setFar(value: number) {
    this.farParam.value = value
  }

  /**
   * Getter for the camera field of view (FOV).
   * The FOV defines the vertical angle of the view frustum
   * The horizontal angle is calculated from the FOV and the Viewport aspect ratio.
   *
   * @return {number} - Returns the FOV value.
   */
  getFov(): number {
    return this.fovParam.value
  }

  /**
   * Setter for the camera field of view (FOV).
   * The FOV defines the vertical angle of the view frustum
   * The horizontal angle is calculated from the FOV and the Viewport aspect ratio.
   * > Note: The Fov can also be set by calling #setLensFocalLength
   *
   * @param {number} value - The new FOV value.
   */
  setFov(value: number) {
    this.fovParam.value = value
  }

  /**
   * Getter for the camera frustum height value.
   * The frustum hight value is used to compute the orthographic projection of the scene.
   *
   * @return {number} - Returns the Frustum Height value.
   */
  getFrustumHeight(): number {
    return this.viewHeight
  }

  /**
   * Setter for the camera frustum height in orthographic mode.
   * > Note: in perspective mode, the frustum height is calculated based on the FOV value and focal distance.
   *
   * @param {number} value - The new Frustum Height value.
   */
  setFrustumHeight(value: number) {
    this.viewHeight = value
    console.warn('event emitted is null')
    this.emit('projectionParamChanged') // event
  }

  /**
   * Setter for the camera lens focal length. This method calculates a new vertical Field of View value
   * from the provided camera lense focal length.
   * > Note: conversion from Lense Focal length to Fov is based on the table found here: https://www.nikonians.org/reviews/fov-tables
   *
   * **Focal Length accepted values as string values:** 10mm, 11mm, 12mm, 14mm, 15mm, 17mm, 18mm,
   * 19mm, 20mm, 24mm, 28mm, 30mm, 35mm, 45mm, 50mm, 55mm, 60mm, 70mm, 75mm, 80mm,
   * 85mm, 90mm, 100mm, 105mm, 120mm, 125mm, 135mm, 150mm, 170mm, 180mm, 210mm, 300mm,
   * 400mm, 500mm, 600mm, 800mm
   *
   * @param {string} value - The lens focal length value.
   */
  setLensFocalLength(value: string) {
    // https://www.nikonians.org/reviews/fov-tables
    const mapping: { [key: string]: number } = {
      '10mm': 100.4,
      '11mm': 95.0,
      '12mm': 90.0,
      '14mm': 81.2,
      '15mm': 77.3,
      '17mm': 70.4,
      '18mm': 67.4,
      '19mm': 64.6,
      '20mm': 61.9,
      '24mm': 53.1,
      '28mm': 46.4,
      '30mm': 43.6,
      '35mm': 37.8,
      '45mm': 29.9,
      '50mm': 27.0,
      '55mm': 24.6,
      '60mm': 22.6,
      '70mm': 19.5,
      '75mm': 18.2,
      '80mm': 17.1,
      '85mm': 16.1,
      '90mm': 15.2,
      '100mm': 13.7,
      '105mm': 13.0,
      '120mm': 11.4,
      '125mm': 11.0,
      '135mm': 10.2,
      '150mm': 9.1,
      '170mm': 8.1,
      '180mm': 7.6,
      '210mm': 6.5,
      '300mm': 4.6,
      '400mm': 3.4,
      '500mm': 2.7,
      '600mm': 2.3,
      '800mm': 1.7,
    }
    if (!(value in mapping)) {
      console.warn('Camera lense focal length not supported:' + value)
      return
    }
    this.fovParam.value = MathFunctions.degToRad(mapping[value])
  }

  /**
   * Returns `focalDistance` parameter value.
   *
   * @return {number} - Returns the lens focal length value..
   */
  getFocalDistance() {
    return this.focalDistanceParam.value
  }

  /**
   * Sets `focalDistance` parameter value.
   *
   * @errors on dist value lower or less than zero.
   * @param {number} dist - The focal distance value.
   */
  setFocalDistance(dist: number) {
    if (dist < 0.0001) console.error('Never set focal distance to zero')
    this.focalDistanceParam.value = dist
    if (this.adjustNearAndFarPlanesToFocalDist) {
      const near = dist * this.nearDistFactor
      if (near < this.nearParam.value) {
        this.nearParam.value = near
      }
      const far = dist * this.farDistFactor
      if (far > this.farParam.value) {
        this.farParam.value = far
      }
    }
  }

  /**
   * Returns true if the camera is providing an orthographic projection.
   * @return {boolean} - true if orthographic else false
   */
  isOrthographic() {
    return this.isOrthographicParam.value == 1.0
  }

  /**
   * Sets the camera to be orthographic. The value can be between 0, and 1.
   * A value of 0 means fully perspective. A value of 1 means fully orthographic.
   * Any value in between produces a linear interpolation of perspective and orthographic.
   *
   * @param {number} value - The value param.
   * @param {number} duration - The duration in milliseconds to change the projection.
   */
  setIsOrthographic(value: number, duration = 0) {
    if (this.__orthoIntervalId) clearInterval(this.__orthoIntervalId)
    if (value > 0.5) {
      const fov = this.fovParam.value
      const focalDistance = this.focalDistanceParam.value
      this.viewHeight = Math.sin(fov * 0.5) * focalDistance * 2
    }
    if (duration == 0) {
      this.isOrthographicParam.value = value
    } else {
      const count = Math.round(duration / 20) // each step is 20ms
      let i = 0
      const prevValue = this.isOrthographicParam.value
      const applyMovement = () => {
        const lerpValue = MathFunctions.lerp(prevValue, value, i / count)
        this.isOrthographicParam.value = lerpValue
        i++
        if (i <= count) {
          this.__orthoIntervalId = window.setTimeout(applyMovement, 20)
        } else {
          this.__orthoIntervalId = -1
          this.emit('movementFinished')
        }
      }
      applyMovement()
    }
  }

  /**
   * Setter for the camera position and target.
   * As described at the start of the class, this is a `TreeItem`,
   * which means we can move it around using translation modifiers.
   * You can do it this way or using the changing `TreeItem` parameters,
   * although we recommend this one because it also changes focal distance.
   *
   * @param {Vec3} position - The position of the camera.
   * @param {Vec3} target - The target of the camera.
   */
  setPositionAndTarget(position: Vec3, target: Vec3) {
    this.setFocalDistance(position.distanceTo(target))
    const xfo = new Xfo()
    xfo.setLookAt(position, target, new Vec3(0.0, 0.0, 1.0))
    this.globalXfoParam.value = xfo
    this.emit('movementFinished')
  }

  /**
   * Getter for the target position.
   * @return {Vec3} - Returns the target position.
   */
  getTargetPosition() {
    const focalDistance = this.focalDistanceParam.value
    const xfo = this.globalXfoParam.value
    const target = xfo.ori.getZaxis()
    target.scaleInPlace(-focalDistance)
    target.addInPlace(xfo.tr)
    return target
  }

  // ///////////////////////////

  /**
   * Calculates a new camera position that frames all the items passed in `treeItems` array, moving
   * the camera to a point where we can see all of them.
   *
   * @param {GLBaseViewport} viewport - The viewport value.
   * @param {array} treeItems - The treeItems value.
   */
  frameView(viewport: GLBaseViewport, treeItems: any) {
    const focalDistance = this.focalDistanceParam.value
    const fovY = this.fovParam.value

    const globalXfo = this.globalXfoParam.value.clone()
    const aspectRatio = viewport.getWidth() / viewport.getHeight()
    const fovX = Math.atan(Math.tan(fovY * 0.5) * aspectRatio) * 2.0

    let newFocalDistance = focalDistance

    if (this.frameOnBoundingSphere) {
      const box3 = new Box3()
      for (const treeItem of treeItems) {
        box3.addBox3(treeItem.boundingBoxParam.value)
      }

      if (!box3.isValid()) {
        console.warn('Bounding box not valid.')
        return
      }
      const cameraViewVec = globalXfo.ori.getZaxis()
      const targetOffset = cameraViewVec.scale(-focalDistance)
      const currTarget = globalXfo.tr.add(targetOffset)
      const newTarget = box3.center()

      const pan = newTarget.subtract(currTarget)
      globalXfo.tr.addInPlace(pan)

      // Compute the distance the camera should be to fit the entire bounding sphere
      newFocalDistance = box3.size() / Math.tan(fovY)

      // const dollyDist = newFocalDistance - focalDistance
      // globalXfo.tr.addInPlace(cameraViewVec.scale(dollyDist))
    } else {
      // Based on the solution described here:
      // https://stackoverflow.com/a/66113254/5546902

      const boundaryPoints: any[] = []
      if (false) {
        const box3 = new Box3()
        for (const treeItem of treeItems) {
          box3.addBox3(treeItem.boundingBoxParam.value)
        }

        if (!box3.isValid()) {
          console.warn('Bounding box not valid.')
          return
        }
        boundaryPoints.push(box3.p0)
        boundaryPoints.push(new Vec3(box3.p0.x, box3.p0.y, box3.p1.z))
        boundaryPoints.push(new Vec3(box3.p0.x, box3.p1.y, box3.p0.z))
        boundaryPoints.push(new Vec3(box3.p1.x, box3.p0.y, box3.p0.z))
        boundaryPoints.push(new Vec3(box3.p0.x, box3.p1.y, box3.p1.z))
        boundaryPoints.push(new Vec3(box3.p1.x, box3.p0.y, box3.p1.z))
        boundaryPoints.push(new Vec3(box3.p1.x, box3.p1.y, box3.p0.z))
        boundaryPoints.push(box3.p1)
      } else {
        treeItems.forEach((treeItem: TreeItem) => {
          treeItem.traverse((childItem) => {
            if (!(childItem instanceof TreeItem)) return
            if (childItem.disableBoundingBox) return
            if (childItem instanceof GeomItem) {
              const geom = childItem.geomParam.value
              if (geom) {
                const box3 = geom.getBoundingBox()
                if (box3.isValid()) {
                  const mat4 = childItem.geomMatParam.value
                  boundaryPoints.push(mat4.transformVec3(box3.p0))
                  boundaryPoints.push(mat4.transformVec3(new Vec3(box3.p0.x, box3.p0.y, box3.p1.z)))
                  boundaryPoints.push(mat4.transformVec3(new Vec3(box3.p0.x, box3.p1.y, box3.p0.z)))
                  boundaryPoints.push(mat4.transformVec3(new Vec3(box3.p1.x, box3.p0.y, box3.p0.z)))
                  boundaryPoints.push(mat4.transformVec3(new Vec3(box3.p0.x, box3.p1.y, box3.p1.z)))
                  boundaryPoints.push(mat4.transformVec3(new Vec3(box3.p1.x, box3.p0.y, box3.p1.z)))
                  boundaryPoints.push(mat4.transformVec3(new Vec3(box3.p1.x, box3.p1.y, box3.p0.z)))
                  boundaryPoints.push(mat4.transformVec3(box3.p1))
                  return
                }
              }
            }
            if (childItem.getNumChildren() == 0) {
              const box3 = childItem.boundingBoxParam.value
              if (box3.isValid()) {
                // Note: passing box3.p0 into boundaryPoints caused corruption later on.
                // I could not figure out how/why, but by constructing a new vector here,
                // we avoid the problem.
                boundaryPoints.push(new Vec3(box3.p0.x, box3.p0.y, box3.p0.z))
                boundaryPoints.push(new Vec3(box3.p0.x, box3.p0.y, box3.p1.z))
                boundaryPoints.push(new Vec3(box3.p0.x, box3.p1.y, box3.p0.z))
                boundaryPoints.push(new Vec3(box3.p1.x, box3.p0.y, box3.p0.z))
                boundaryPoints.push(new Vec3(box3.p0.x, box3.p1.y, box3.p1.z))
                boundaryPoints.push(new Vec3(box3.p1.x, box3.p0.y, box3.p1.z))
                boundaryPoints.push(new Vec3(box3.p1.x, box3.p1.y, box3.p0.z))
                boundaryPoints.push(new Vec3(box3.p1.x, box3.p1.y, box3.p1.z))
                return
              }
            }
          })
        })
      }
      if (boundaryPoints.length == 0) return

      const angleX = this.isOrthographic() ? 0 : fovX / 2
      const angleY = this.isOrthographic() ? 0 : fovY / 2
      const frustumPlaneNormals: Record<string, any> = {}
      frustumPlaneNormals.XPos = new Vec3(Math.cos(angleX), 0, Math.sin(angleX))
      frustumPlaneNormals.XNeg = new Vec3(-Math.cos(angleX), 0, Math.sin(angleX))
      frustumPlaneNormals.YPos = new Vec3(0, Math.cos(angleY), Math.sin(angleY))
      frustumPlaneNormals.YNeg = new Vec3(0, -Math.cos(angleY), Math.sin(angleY))
      frustumPlaneNormals.ZPos = new Vec3(0, 0, 1)
      frustumPlaneNormals.ZNeg = new Vec3(0, 0, -1)
      const frustumPlaneNormalsWs: Record<string, any> = {}
      const frustumPlaneOffsets: Record<string, any> = {}
      // eslint-disable-next-line guard-for-in
      for (const key in frustumPlaneNormals) {
        frustumPlaneNormalsWs[key] = globalXfo.ori.rotateVec3(frustumPlaneNormals[key])
        frustumPlaneOffsets[key] = Number.NEGATIVE_INFINITY
      }
      const centroid = new Vec3()
      boundaryPoints.forEach((point, index) => {
        // Previously we had corrupt values coming through there. That is fixed,
        // but just in case, we filter them out again here.
        if (!Number.isFinite(point.x) || !Number.isFinite(point.y) || !Number.isFinite(point.z)) {
          return
        }
        const delta = point.subtract(globalXfo.tr)
        // eslint-disable-next-line guard-for-in
        for (const key in frustumPlaneNormals) {
          const planeOffset = delta.dot(frustumPlaneNormalsWs[key])
          if (planeOffset > frustumPlaneOffsets[key] && planeOffset != Number.POSITIVE_INFINITY) {
            frustumPlaneOffsets[key] = planeOffset
          }
        }
        centroid.addInPlace(point)
      })

      // eslint-disable-next-line guard-for-in
      // Check for invalid planes.
      for (const key in frustumPlaneOffsets) {
        if (frustumPlaneOffsets[key] == Number.POSITIVE_INFINITY) return
      }
      centroid.scaleInPlace(1 / boundaryPoints.length)

      let dolly = 0
      if (this.isOrthographic()) {
        const pan = new Vec3(
          (-frustumPlaneOffsets.XNeg + frustumPlaneOffsets.XPos) * 0.5,
          (-frustumPlaneOffsets.YNeg + frustumPlaneOffsets.YPos) * 0.5,
          (-frustumPlaneOffsets.ZNeg + frustumPlaneOffsets.ZPos) * 0.5
        )
        // Move the camera back by 2x the depth range of the scene.
        const zrange = frustumPlaneOffsets.ZNeg + frustumPlaneOffsets.ZPos
        dolly = zrange * 2
        pan.z = -frustumPlaneOffsets.ZNeg + dolly
        globalXfo.tr.addInPlace(globalXfo.ori.rotateVec3(pan))
        newFocalDistance = zrange * 2

        const viewWidth = frustumPlaneOffsets.XPos + frustumPlaneOffsets.XNeg
        const viewHeight = frustumPlaneOffsets.YPos + frustumPlaneOffsets.YNeg
        this.viewHeight = Math.max(viewHeight, viewWidth / aspectRatio)
        const frameBorder = 0.1
        this.viewHeight += this.viewHeight * frameBorder
      } else {
        const angleX = fovX / 2
        const angleY = fovY / 2
        // Now we solve the problem in 2D. For each camera plane (XZ and YZ), we calculate the lines in 2d that
        // represent the frustum planes for the top and bottom, adjusted so they touch the boundary points. We
        // then find the intersection of these 2 2d lines to calculate the adjustment in that axis for the camera.
        // We need to dolly back to fix the plane which needs the most adjustment.
        // Calculate a 2d point on the line for each plane, and a direction.
        const xP0 = new Vec2(Math.cos(angleX) * frustumPlaneOffsets.XPos, Math.sin(angleX) * frustumPlaneOffsets.XPos)
        const xP1 = xP0.add(new Vec2(Math.sin(angleX), -Math.cos(angleX)))
        const xP2 = new Vec2(-Math.cos(angleX) * frustumPlaneOffsets.XNeg, Math.sin(angleX) * frustumPlaneOffsets.XNeg)
        const xP3 = xP2.add(new Vec2(-Math.sin(angleX), -Math.cos(angleX)))
        const xP = Vec2.intersectionOfLines(xP0, xP1, xP2, xP3)

        const yP0 = new Vec2(Math.cos(angleY) * frustumPlaneOffsets.YPos, Math.sin(angleY) * frustumPlaneOffsets.YPos)
        const yP1 = yP0.add(new Vec2(Math.sin(angleY), -Math.cos(angleY)))
        const yP2 = new Vec2(-Math.cos(angleY) * frustumPlaneOffsets.YNeg, Math.sin(angleY) * frustumPlaneOffsets.YNeg)
        const yP3 = yP2.add(new Vec2(-Math.sin(angleY), -Math.cos(angleY)))
        const yP = Vec2.intersectionOfLines(yP0, yP1, yP2, yP3)

        if (xP === null || yP === null) {
          console.warn('xP or yP === null')
          return
        }
        dolly = Math.max(xP.y, yP.y)
        const pan = new Vec3(xP.x, yP.x, dolly)
        globalXfo.tr.addInPlace(globalXfo.ori.rotateVec3(pan))

        newFocalDistance = centroid.distanceTo(globalXfo.tr)

        const frameBorder = 0.1
        const frameBorderAdjustment = newFocalDistance * frameBorder
        globalXfo.tr.addInPlace(globalXfo.ori.rotateVec3(new Vec3(0, 0, frameBorderAdjustment)))

        dolly += frameBorderAdjustment
      }

      if (this.adjustNearAndFarPlanesToFocalDist) {
        frustumPlaneOffsets.ZPos -= dolly
        frustumPlaneOffsets.ZNeg += dolly
        const near = frustumPlaneOffsets.ZNeg * this.nearDistFactor
        const far = -frustumPlaneOffsets.ZPos * this.farDistFactor
        this.nearParam.value = near
        this.farParam.value = far
      }
    }

    this.setFocalDistance(newFocalDistance)
    this.globalXfoParam.value = globalXfo
    this.emit('movementFinished')
  }

  /**
   * Sets camera perspective from a Mat4 object.
   *
   * @param {Mat4} mat - The mat value.
   * @param {number} aspect - The aspect value.
   */
  updateProjectionMatrix(mat: Mat4, aspect: number) {
    const isOrthographic = this.isOrthographicParam.value
    const fov = this.fovParam.value
    const near = this.nearParam.value
    const far = this.farParam.value

    const orthoMat = new Mat4()
    if (isOrthographic > 0.0) {
      const halfHeight = this.viewHeight * 0.5
      const bottom = -halfHeight
      const top = halfHeight
      const left = halfHeight * -aspect
      const right = halfHeight * aspect
      orthoMat.setOrthographicMatrix(left, right, bottom, top, near, far)
    }
    if (isOrthographic < 1.0) {
      mat.setPerspectiveMatrix(fov, aspect, near, far)
    }

    if (isOrthographic == 1.0) {
      mat.setFromMat4(orthoMat)
    } else if (isOrthographic > 0.0) {
      mat.set(
        MathFunctions.lerp(mat.m00, orthoMat.m00, isOrthographic),
        MathFunctions.lerp(mat.m01, orthoMat.m01, isOrthographic),
        MathFunctions.lerp(mat.m02, orthoMat.m02, isOrthographic),
        MathFunctions.lerp(mat.m03, orthoMat.m03, isOrthographic),
        MathFunctions.lerp(mat.m10, orthoMat.m10, isOrthographic),
        MathFunctions.lerp(mat.m11, orthoMat.m11, isOrthographic),
        MathFunctions.lerp(mat.m12, orthoMat.m12, isOrthographic),
        MathFunctions.lerp(mat.m13, orthoMat.m13, isOrthographic),
        MathFunctions.lerp(mat.m20, orthoMat.m20, isOrthographic),
        MathFunctions.lerp(mat.m21, orthoMat.m21, isOrthographic),
        MathFunctions.lerp(mat.m22, orthoMat.m22, isOrthographic),
        MathFunctions.lerp(mat.m23, orthoMat.m23, isOrthographic),
        MathFunctions.lerp(mat.m30, orthoMat.m30, isOrthographic),
        MathFunctions.lerp(mat.m31, orthoMat.m31, isOrthographic),
        MathFunctions.lerp(mat.m32, orthoMat.m32, isOrthographic),
        MathFunctions.lerp(mat.m33, orthoMat.m33, isOrthographic)
      )
    }
  }
}

Registry.register('Camera', Camera)

export { Camera }
