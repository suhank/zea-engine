# Architectural Overview

![Modular](_media/modular-architecture.png)

The Zea Engine was designed with several goals in mind. 

* [Zea CAD](https://zea-cad.js.org/#/)
* [Zea Lidar](https://zea-potree.js.org/#/)
* [Zea Curves](https://zea-potree.js.org/#/)


# Renderer and Scene

The scene contains all the data that represents the 3d rendered scene. The main component of the scene is a tree structure that defines a hierarchical relationship between.



# Rendering Geometry

To be able to dispay geometry in Zea Engine, we need 4 basic pieces of data.

 1. The Geometry. This is the points, lines or triangles that make up the shape of the item to be drawn.
 2. The Transform. This specifies where, in the 3d scene, the geometry should be displayed. 
 3. The Shader. This is [GLSL](https://developer.mozilla.org/en-US/docs/Games/Techniques/3D_on_the_web/GLSL_Shaders) code that runs on the GPU while the geometry is being drawn. (Link to our shaders)
 4. The Material. the material is a collection of input values to the shader, such as colors, and texturees. 


A key class in Zea is the GeomItem, as it provides these values to the renderer.

The GeomItem has parameters that provide Geometry, Materials and Transforms, which the renderer pull out and use to draw.

# Hierarchical Transforms

 - Xfo s vs Matrices. 
 An Xfo is decomposed into 3 values. Position, Rotation, Scale. 
 A Matrix is 16 numbers that defines position, rotation and scale. 
(https://en.wikipedia.org/wiki/Transformation_matrix)

Matrices are difficult to work with. Its particularly dificutl to work with roations using matrices. 

An Xfo can be converted to a Matrix when needed for rendering.

 - Global Xfo
 
 - Local Xfo
 The local xfo is the offset from the parent.

 Any tree items global xfo is calculated as
```
  My Global = Parents Global * My Local
```

Each item in the tree has a parent and 0-many children. The tree item has an Xfo value which defines its offset from its parent in 3d coordinates. The Tree Item uses its parents global transform and its own local transfrom to calculate its own 
The tree structure of the scene .
