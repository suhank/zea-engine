---
sidebar_position: 4
title: Geometry and Rendering
---

The Zea Engine comes with definitions for standard geometry types, such as Points, Lines and Mesh.

### Geometry types

![geometry-primitives](/img/misc/geometry-primitives.svg)

The fundamental geometry types can be described as Points, Lines, and Triangles. Each geometry type is defined by a set of vertices, and in the case of Lines and Triangles a topology that connects these vertices together for primitives like lines and triangles.
Vertices
What all geometries have in common is they are made up of a collection of vertices. These vertices have attributes that describe qualities such as position, color, normals etc...

> All geometry types have a ‘positions’ Vec3 attribute assigned by default, but this is only to simplify code and allow developers to make assumptions about geometry. In fact, the positions attribute is not always required. Fro examples, a mesh could describe a 2d mesh used in an overlay, which would mean it only needs a Vec2 positions attribute, or the positions could be generated in the shader during rendering, meaning no position value is needed at all.

During rendering, the attributes at each vertex are interpolated over the area of the primitive

### Materials

Materials contain a collection of parameters that are required by a given shader. The material parameters provide values to the shaders during rendering.

A material’s parameters are configured according to the requirements of the specified shader.

### Shaders

Shaders provide GLSL shader code to the GPU that is used to control the process of rasterizing geometry to screen.

Each material specifies which shader should be bound.
When shaders are defined, they provide a list of required parameters that should be bound during rendering. When a Material has a shader assigned, it populates itself with parameters to match the requirements of the shader.

During rendering, the shader is bound and subsequently the material whose parameters are bound.

## Rendering Geometry

To be able to display geometry in Zea Engine, we need 4 basic pieces of data.

1.  The Geometry. This is the points, lines or triangles that make up the shape of the item to be drawn.
2.  The Transform. This specifies where, in the 3d scene, the geometry should be displayed.
3.  The Shader. This is [GLSL](https://developer.mozilla.org/en-US/docs/Games/Techniques/3D_on_the_web/GLSL_Shaders) code that runs on the GPU while the geometry is being drawn. (Link to our shaders)
4.  The Material. the material is a collection of input values to the shader, such as colors, and textures.

A key class in Zea is the [GeomItem](../../API/SceneTree/GeomItem.md), as it provides these values to the renderer.

The GeomItem has parameters that provide Geometry, Materials and Transforms, which the renderer uses during drawing.
