import { EventEmitter } from './EventEmitter';
/******************************************************************************

This is a binary tree based bin packing algorithm that is more complex than
the simple Packer (packer.js). Instead of starting off with a fixed width and
height, it starts with the width and height of the first block passed and then
grows as necessary to accommodate each subsequent block. As it grows it attempts
to maintain a roughly square ratio by making 'smart' choices about whether to
grow right or down.

When growing, the algorithm can only grow to the right OR down. Therefore, if
the new block is BOTH wider and taller than the current target then it will be
rejected. This makes it very important to initialize with a sensible starting
width and height. If you are providing sorted input (largest first) then this
will not be an issue.

A potential way to solve this limitation would be to allow growth in BOTH
directions at once, but this requires maintaining a more complex tree
with 3 children (down, right and center) and that complexity can be avoided
by simply choosing a sensible starting block.

Best results occur when the input blocks are sorted by height, or even better
when sorted by max(width,height).

Inputs:
------

  blocks: array of any objects that have .w and .h attributes

Outputs:
-------

  marks each block that fits with a .fit attribute pointing to a
  node with .x and .y coordinates

Example:
-------

  var blocks = [
    { w: 100, h: 100 },
    { w: 100, h: 100 },
    { w:  80, h:  80 },
    { w:  80, h:  80 },
    etc
    etc
  ];

  var packer = new GrowingPacker();
  packer.fit(blocks);

  for(var n = 0 ; n < blocks.length ; n++) {
    var block = blocks[n];
    if (block.fit) {
      Draw(block.fit.x, block.fit.y, block.w, block.h);
    }
  }


******************************************************************************/
declare class GrowingPacker extends EventEmitter {
    root: Record<string, any>;
    constructor(w?: number, h?: number);
    fit(blocks: Array<Record<string, any>>): void;
    __addBlock(block: Record<string, any>): Record<string, any> | null | undefined;
    addBlock(block: Record<string, any>): Record<string, any> | null | undefined;
    findNode(root: Record<string, any>, w: number, h: number): Record<string, any> | null;
    splitNode(node: Record<string, any>, w: number, h: number): Record<string, any>;
    growNode(w: number, h: number): Record<string, any> | null | undefined;
    growRight(w: number, h: number): Record<string, any> | null | undefined;
    growDown(w: number, h: number): Record<string, any> | null | undefined;
}
export { GrowingPacker };
