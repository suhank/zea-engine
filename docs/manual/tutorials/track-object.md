## TODO:
* glitch repo for tracker + target
* working operator code

<br>
<!-- 
# Track Objects Using Operators -->

> This tutorial follows the tutorial [Moving Objects Using Your Mouse](manual/tutorials/move-object.md)

This tutorial shows how to make use of Operators, which can be more performant than using event listeners directly.

If we wanted to make an object, a cylinder in this case, aim at the sphere while we move it, the following code can do that using ideas we learned from the previous tutorial.


```javascript
  /*
    Create a cylinder object and set its position.
  */

  // create a new cylinder with radius = 1.0, length = 2.0, sides = 10
  const cylinder = new Cylinder(1, 2, 10) 

  // create the tracker we will add to the scene.
  const tracker = new GeomItem('Tracker', cylinder,  material)

  // set the position of the 'Global Xfo,' the objects position in world space. 
  tracker.getParameter("GlobalXfo").setValue(new Xfo(new Vec3(-5,-5,5)));
  scene.getRoot().addChild(tracker)
```

```JavaScript
/*
  This function makes a GeomItem 'tracker' rotate toward a GeomItem 'target' when the 'target' moves.
*/
function createTracker(target, tracker){
  // If the global Xfo of the target changes, the following code executes.
  target.on('globalXfoChanged', ()=>{
    // get the Xfos of both the target and tracker
    const target_xfo = target.getParameter("GlobalXfo").getValue()
    const tracker_xfo = tracker.getParameter("GlobalXfo").getValue()

    // create a vector 'dir' that starts at tracker's position and aims at target's position.
    const dir = target_xfo.tr.subtract(tracker_xfo.tr)
    // create a new quaternion
    const new_quat = new Quat()
    // set the quaternion with the newly created dir vector and pass in an up vector.
    new_quat.setFromDirectionAndUpvector(dir, new Vec3(0, 0, 1))
    
    // create a Xfo, based on the tracker's position and the quaternion we just created. 
    const new_xfo = new Xfo(tracker_xfo.tr, new_quat)

    // set the tracker's global Xfo.
    tracker.getParameter("GlobalXfo").setValue(new_xfo)
  })
```

## Operators

