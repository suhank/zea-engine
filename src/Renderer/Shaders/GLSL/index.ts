// @ts-nocheck
import { shaderLibrary } from '../../ShaderLibrary'

import computeViewNormal from './computeViewNormal.glsl'
import calcFatLinesViewPos from './calcFatLinesViewPos.glsl'
import constants from './constants.glsl'
import convolveHelpers from './convolve-helpers.glsl'
import cutaways from './cutaways.glsl'
import debugColors from './debugColors.glsl'
import drawItemId from './drawItemId.glsl' //
import geomItemId from './geomItemId.glsl'
import drawItemTexture from './drawItemTexture.glsl'
import envmapDualfisheye from './envmap-dualfisheye.glsl'
import envmapEquirect from './envmap-equirect.glsl'
import envmapOctahedral from './envmap-octahedral.glsl'
import GLSLBits from './GLSLBits.glsl'
import GLSLUtils from './GLSLUtils.glsl'
import Hammersley from './Hammersley.glsl'
import ImportanceSampleGGX from './ImportanceSampleGGX.glsl'
import materialparams from './materialparams.glsl'
import modelMatrix from './modelMatrix.glsl'
import PBRSurfaceRadiance from './PBRSurfaceRadiance.glsl'
import SHCoeffs from './SHCoeffs.glsl'
import gamma from './gamma.glsl'
import inverse from './inverse.glsl'
import transpose from './transpose.glsl'
import quadVertexFromID from './quadVertexFromID.glsl'
import unpackHDR from './unpackHDR.glsl'
import surfaceGeomData from './surfaceGeomData.glsl'
import surfaceHighlight from './surfaceHighlight.glsl'
import imageAtlas from './imageAtlas.glsl'

shaderLibrary.setShaderModule('imageAtlas.glsl', imageAtlas)
shaderLibrary.setShaderModule('surfaceGeomData.glsl', surfaceGeomData)
shaderLibrary.setShaderModule('surfaceHighlight.glsl', surfaceHighlight)

shaderLibrary.setShaderModule('computeViewNormal.glsl', computeViewNormal)
shaderLibrary.setShaderModule('calcFatLinesViewPos.glsl', calcFatLinesViewPos)
shaderLibrary.setShaderModule('constants.glsl', constants)
shaderLibrary.setShaderModule('convolve-helpers.glsl', convolveHelpers)
shaderLibrary.setShaderModule('cutaways.glsl', cutaways)
shaderLibrary.setShaderModule('debugColors.glsl', debugColors)
shaderLibrary.setShaderModule('drawItemId.glsl', drawItemId) // Needed for backwards compatiblity with older versions of ux.
shaderLibrary.setShaderModule('geomItemId.glsl', geomItemId)
shaderLibrary.setShaderModule('drawItemTexture.glsl', drawItemTexture)
shaderLibrary.setShaderModule('envmap-dualfisheye.glsl', envmapDualfisheye)
shaderLibrary.setShaderModule('envmap-equirect.glsl', envmapEquirect)
shaderLibrary.setShaderModule('envmap-octahedral.glsl', envmapOctahedral)
shaderLibrary.setShaderModule('GLSLBits.glsl', GLSLBits)
shaderLibrary.setShaderModule('GLSLUtils.glsl', GLSLUtils)
shaderLibrary.setShaderModule('Hammersley.glsl', Hammersley)
shaderLibrary.setShaderModule('ImportanceSampleGGX.glsl', ImportanceSampleGGX)
shaderLibrary.setShaderModule('materialparams.glsl', materialparams)
shaderLibrary.setShaderModule('modelMatrix.glsl', modelMatrix)
shaderLibrary.setShaderModule('PBRSurfaceRadiance.glsl', PBRSurfaceRadiance)
shaderLibrary.setShaderModule('SHCoeffs.glsl', SHCoeffs)
shaderLibrary.setShaderModule('gamma.glsl', gamma)
shaderLibrary.setShaderModule('inverse.glsl', inverse)
shaderLibrary.setShaderModule('transpose.glsl', transpose)
shaderLibrary.setShaderModule('quadVertexFromID.glsl', quadVertexFromID)
shaderLibrary.setShaderModule('unpackHDR.glsl', unpackHDR)
