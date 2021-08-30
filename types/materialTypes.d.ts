import { SimpleSurfaceShader, FlatSurfaceShader } from '../src'
import { StandardSurfaceMaterial } from '../src/SceneTree/Materials/StandardSurfaceMaterial'

type MaterialType = StandardSurfaceMaterial | SimpleSurfaceShader | FlatSurfaceShader

// TODO: NOTE: can get a type from a string than initialize it
// getType(typeName: string, value: any): unknown {
//     type myType = typeof typeName
//     let x: myType = value
//     return x
//   }
