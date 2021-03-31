/* eslint-disable camelcase */
const vec3_normalize = (vec) => {
  let len = vec[0] * vec[0] + vec[1] * vec[1] + vec[2] * vec[2]
  if (len < Number.EPSILON) {
    return [0, 0, 0]
  }
  len = 1.0 / Math.sqrt(len)
  return [vec[0] * len, vec[1] * len, vec[2] * len]
}
const vec3_subtract = (vec1, vec2) => {
  return [vec1[0] - vec2[0], vec1[1] - vec2[1], vec1[2] - vec2[2]]
}
const vec3_dot = (vec1, vec2) => {
  return vec1[0] * vec2[0] + vec1[1] * vec2[1] + vec1[2] * vec2[2]
}
const vec3_length = (vec) => {
  return Math.sqrt(vec[0] * vec[0] + vec[1] * vec[1] + vec[2] * vec[2])
}
const vec3_scale = (vec, scl) => {
  return [vec[0] * len, vec[1] * len, vec[2] * len]
}
const vec3_angleTo = (vec1, vec2) => {
  const cosine = vec3_dot(vec1, vec2)
  if (cosine > 1.0) {
    return 0
  } else {
    return Math.acos(cosine)
  }
}
const quat_conjugate = (quat) => {
  return [-quat[0], -quat[1], -quat[2], quat[3]]
}
const quat_multiply = (quat1, quat2) => {
  const ax = quat1[0]
  const ay = quat1[1]
  const az = quat1[2]
  const aw = quat1[3]
  const bx = quat2[0]
  const by = quat2[1]
  const bz = quat2[2]
  const bw = quat2[3]

  return [
    ax * bw + aw * bx + ay * bz - az * by,
    ay * bw + aw * by + az * bx - ax * bz,
    az * bw + aw * bz + ax * by - ay * bx,
    aw * bw - ax * bx - ay * by - az * bz,
  ]
}
const quat_rotateVec3 = (quat, vec3) => {
  const vq = [vec3[0], vec3[1], vec3[2], 0.0]
  const pq = quat_multiply(quat_multiply(quat, vq), quat_conjugate(quat))
  return [pq[0], pq[1], pq[2]]
}

// ///////////////////////////////////////////////
// View data.
const geomItemsData = []
const frustumCulled = []
let culledCount = 0
let newlyCulled = []
let newlyUnCulled = []

let cameraPos
let cameraInvOri
let frustumHalfAngleX
let frustumHalfAngleY

const cull = (index) => {
  if (!frustumCulled[index]) {
    frustumCulled[index] = true
    culledCount++
    newlyCulled.push(index)
  }
}
const unCull = (index) => {
  if (frustumCulled[index]) {
    frustumCulled[index] = false
    culledCount--
    newlyUnCulled.push(index)
  }
}

const checkGeomItem = (geomItemData) => {
  if (!geomItemData) return
  const pos = geomItemData.pos
  const boundingRadius = geomItemData.boundingRadius
  const vec = vec3_subtract(pos, cameraPos)
  const dist = vec3_length(vec)
  // unCull items close to the camera.
  if (dist < boundingRadius) {
    unCull(geomItemData.id)
    return
  }
  const viewVec = quat_rotateVec3(cameraInvOri, vec)
  // Cull items behind the camera.
  if (viewVec[2] > 0) {
    cull(geomItemData.id)
    return
  }

  // Cull very small items
  // Note: when in VR, the FoV becomes very wide and the pixel
  // height varies. It seems more consistent to just use solidAngle,
  // which is resolution invariant.
  const solidAngle = Math.atan(boundingRadius / dist)
  if (solidAngle < 0.004) {
    cull(geomItemData.id)
    return
  }

  const viewVecNorm = vec3_normalize(viewVec)
  const viewAngle = [Math.abs(Math.asin(viewVecNorm[0])) - solidAngle, Math.abs(Math.asin(viewVecNorm[1])) - solidAngle]
  // console.log(geomItemData.id, 'angle To Sphere:', frustumHalfAngleX - viewAngle[0], frustumHalfAngleY - viewAngle[1])
  if (viewAngle[0] > frustumHalfAngleX || viewAngle[1] > frustumHalfAngleY) {
    cull(geomItemData.id)
    return
  }

  unCull(geomItemData.id)
}

const onViewPortChanged = (data, postMessage) => {
  frustumHalfAngleX = data.frustumHalfAngleX
  frustumHalfAngleY = data.frustumHalfAngleY
  if (cameraPos && cameraInvOri) {
    geomItemsData.forEach(checkGeomItem)
    onDone(postMessage)
  }
}

const onViewChanged = (data, postMessage) => {
  cameraPos = data.cameraPos
  cameraInvOri = quat_conjugate(data.cameraOri)
  geomItemsData.forEach(checkGeomItem)
  onDone(postMessage)
}

const onDone = (postMessage) => {
  if (newlyCulled.length > 0 || newlyUnCulled.length > 0) {
    // console.log('CullResults culled:', culledCount, 'visible:', geomItemsData.length - 1 - culledCount)
    postMessage({ type: 'CullResults', newlyCulled, newlyUnCulled })
    newlyCulled = []
    newlyUnCulled = []
  } else {
    postMessage({ type: 'Done' })
  }
}

const handleMessage = (data, postMessage) => {
  if (data.type == 'ViewportChanged') {
    onViewPortChanged(data, postMessage)
  } else if (data.type == 'ViewChanged') {
    onViewChanged(data, postMessage)
  } else if (data.type == 'UpdateGeomItem') {
    geomItemsData[data.geomItem.id] = data.geomItem
    checkGeomItem(geomItemsData[data.geomItem.id], data.index)
    onDone(postMessage)
  }
}

self.onmessage = function (event) {
  handleMessage(event.data, self.postMessage)
}

export { handleMessage }
