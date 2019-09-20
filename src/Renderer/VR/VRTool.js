/** Class representing a VR tool. */
class VRTool {
  /**
   * Create a VR tool.
   */
  constructor() {
    this.__active = false;
  }

  /**
   * The activateTool method.
   */
  activateTool() {
    this.__active = true;
  }

  /**
   * The deactivateTool method.
   */
  deactivateTool() {
    this.__active = false;
  }

  /**
   * The evalTool method.
   */
  evalTool() {}
}

export { VRTool };
