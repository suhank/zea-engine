### Classes

<dl>
<dt><a href="#Allocation1D">Allocation1D</a></dt>
<dd><p>An Allocation1D represents an allocated block of memory.</p>
</dd>
<dt><a href="#Allocator1D">Allocator1D</a></dt>
<dd><p>An 1D allocator is used to manage packing multiple smaller blocks of data
into a single large block of memory, supporting resizing and re-allocating.
As allocations are changed, fragmentation occurs as blocks must be moved</p>
<p>Example:</p>
<pre><code class="language-javascript">const allocator = new Allocator1D()

let memory = new Uint32Array(25)
allocator.on(&#39;resize&#39;, () =&gt; {
  memory = new Uint32Array(allocator.reservedSpace)
})
allocator.on(&#39;dataReallocated&#39;, (event) =&gt; {
  // during allocation, a defragment might occur, which means
  // we need to reload some of our data.
})

allocator.allocate(1, 5)
allocator.allocate(2, 10)
allocator.allocate(3, 10)
allocator.allocate(4, 20)
allocator.allocate(3, 20) // resize 3 to grow the allocated space.
allocator.allocate(1, 7) // resize 1 to fit into the previous space of 3, leaving a new free block.
allocator.allocate(1, 10) // resize 1 to fit into the previous space of 3, consuming the free block.</code></pre>
</dd>
</dl>

<a name="Allocation1D"></a>

### Allocation1D
An Allocation1D represents an allocated block of memory.


<a name="new_Allocation1D_new"></a>

### new Allocation1D
Initializes the allocation


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| start | <code>number</code> | <code>0</code> | The start of the allocated block of memory. |
| size | <code>number</code> | <code>0</code> | The size of the allocated block of memory. |

<a name="Allocator1D"></a>

### Allocator1D
An 1D allocator is used to manage packing multiple smaller blocks of data
into a single large block of memory, supporting resizing and re-allocating.
As allocations are changed, fragmentation occurs as blocks must be moved

Example:
```javascript
const allocator = new Allocator1D()

let memory = new Uint32Array(25)
allocator.on('resize', () => {
  memory = new Uint32Array(allocator.reservedSpace)
})
allocator.on('dataReallocated', (event) => {
  // during allocation, a defragment might occur, which means
  // we need to reload some of our data.
})

allocator.allocate(1, 5)
allocator.allocate(2, 10)
allocator.allocate(3, 10)
allocator.allocate(4, 20)
allocator.allocate(3, 20) // resize 3 to grow the allocated space.
allocator.allocate(1, 7) // resize 1 to fit into the previous space of 3, leaving a new free block.
allocator.allocate(1, 10) // resize 1 to fit into the previous space of 3, consuming the free block.
```



* [Allocator1D](#Allocator1D)
    * [new Allocator1D()](#new-Allocator1D)
    * [getAllocation(id)](#getAllocation)
    * [allocate(id, size)](#allocate)
    * [deallocate(id)](#deallocate)
    * [getFragmentation() ⇒ <code>number</code>](#getFragmentation)
    * [defragment()](#defragment)
    * [verifyConsistency()](#verifyConsistency)

<a name="new_Allocator1D_new"></a>

### new Allocator1D
Initializes the allocator ready to start work

<a name="Allocator1D+getAllocation"></a>

### getAllocation
Returns the Allocates for the given Id.


**Returns**: [<code>Allocation1D</code>](#Allocation1D) - - The allocation  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | The unique numerical identifer for the block. |

<a name="Allocator1D+allocate"></a>

### allocate
Allocates space for a new or existing item. The id is a handle that the consuming code uses to
track allocations.


**Returns**: [<code>Allocation1D</code>](#Allocation1D) - - The new allocation  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | The unique numerical identifer for the block. |
| size | <code>number</code> | The name of the event. |

<a name="Allocator1D+deallocate"></a>

### deallocate
Deallocate space for an existing item, making it free for other uses.



| Param | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | The unique numerical identifer for the block. |

<a name="Allocator1D+getFragmentation"></a>

### getFragmentation
Returns the ratio of fragmented memory over reserved memory.


**Returns**: <code>number</code> - The fragmentation ratio. Between 0 and some value less than 1  
<a name="Allocator1D+defragment"></a>

### defragment
Defragment the memory space reducing memory requirements.
TODO: Implement this method.


<a name="Allocator1D+verifyConsistency"></a>

### verifyConsistency
Checks that the allocations are consistent and not corrupt in any way.




### [Class Tests](api/Utilities/Allocator1D.test)