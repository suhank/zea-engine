
# Events and Listeners

Within the DOM events are emitted from DOM elements for various reasons, including to notify the consumer that an image has finished loading, or that a user has clicked on a certain element in the DOM tree. Developers can register listener functions to the DOM and determine appropriate responses to these events using JavaScript.

https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events

The event system in the engine is modelled on and extends the event system found in the browser, giving developers a familiar model to understand how to interact with the Scene tree.

> All classes within the Scene Tree can emit events and the list of events emitted by any class is listed in its API documentation.

# The Canvas Element
The WebGL renderer is bound to a canvas element that lives in the DOM of a running web application. When a user interacts with the pages using the mouse or with a touch screen, events are emitted from the canvas element that the renderer is connected to. The Renderer uses these events to raycast into the scene and check for geometries directly under the mouse or touch location. 

# Hit Testing Events

![events-hit-testing](_media/events-hit-testing.svg)

One of the services provided by the Viewport class, is translating 2d screen coordinates into 3d hits on geometries. For any coordinate on the 2d region of the viewport, a ray can be computed and the intersection of any geometries hit by that ray in the scene can be retrieved. 
Mouse or touch interactions on the viewport are transformed into rays and resulting hit information is included in the events that are then propagated throughout the scene tree.

The goal of this design is to emulate the event system we find in the browser, where listeners can be registered with items in the tree to detect interactions relevant to those items.

# Event Propagation

![events-propagation](_media/events-propagation.svg)

There is no automatic bubbling process in the zea engine tree to automatically propagate events up the tree. However, the scene tree does propagate a few events automatically up the tree. 

mouseDown, mouseMove and mouseUp. 
touchStart, touchMove and touchEnd. 

These events which are received by the viewport directly from the canvas element to which iti is bound, is then propagated up the tree of any geometry found directly under the mouse or touch event. 

To detect if any item in a tree has been clicked on, users can register listeners on items in the hierarchy.

# Groups
Groups receive events from their members, and propagate them. So a user can detect if any item in a given group is clicked on by adding listeners directly to the group. 

Example: 

![events-propagation-groups](_media/events-propagation-groups.svg)
*The geom that was clicked on by the mouse emits the ‘mouseDown’ event, which is propagated by its parent. The Group receives the event from the parent, and propagates it. A ‘mouseDown’ listener registered on the group will then receive the event.*

Groups enable events to be aggregate from all members and propagated to any registered listeners.

# Summary

The event model in the engine should be familiar to web developers as it follows closely the design of events in the browser. By providing a low level event framework, developer can build higher level functionality according to their own specific requirements.
