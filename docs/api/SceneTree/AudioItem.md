### Classes

<dl>
<dt><a href="#AudioItem">AudioItem</a> ⇐ <code>TreeItem</code></dt>
<dd><p>Class representing an audio item in a scene tree.</p>
</dd>
<dt><a href="#FileAudioItem">FileAudioItem</a> ⇐ <code><a href="#AudioItem">AudioItem</a></code></dt>
<dd><p>Class representing a audio file item in a scene tree.</p>
</dd>
</dl>

<a name="AudioItem"></a>

### AudioItem 
Class representing an audio item in a scene tree.


**Extends**: <code>TreeItem</code>  

* [AudioItem ⇐ <code>TreeItem</code>](#AudioItem)
    * [new AudioItem(name)](#new-AudioItem)
    * [isLoaded() ⇒ <code>any</code>](#isLoaded)
    * [setAudioStream(audio)](#setAudioStream)

<a name="new_AudioItem_new"></a>

### new AudioItem
Create an audio item.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the audio item. |

<a name="AudioItem+isLoaded"></a>

### isLoaded
The isLoaded method.


**Returns**: <code>any</code> - - The return value.  
<a name="AudioItem+setAudioStream"></a>

### setAudioStream
The setAudioStream method.



| Param | Type | Description |
| --- | --- | --- |
| audio | <code>any</code> | The audio value. |

<a name="FileAudioItem"></a>

### FileAudioItem 
Class representing a audio file item in a scene tree.


**Extends**: [<code>AudioItem</code>](#AudioItem)  

* [FileAudioItem](#FileAudioItem)
    * [new FileAudioItem(name)](#new-FileAudioItem)
    * [isLoaded() ⇒ <code>any</code>](#isLoaded)
    * [setAudioStream(audio)](#setAudioStream)

<a name="new_FileAudioItem_new"></a>

### new FileAudioItem
Create a audio file item.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the audio file. |

<a name="AudioItem+isLoaded"></a>

### isLoaded
The isLoaded method.


**Overrides**: [<code>isLoaded</code>](#AudioItem+isLoaded)  
**Returns**: <code>any</code> - - The return value.  
<a name="AudioItem+setAudioStream"></a>

### setAudioStream
The setAudioStream method.


**Overrides**: [<code>setAudioStream</code>](#AudioItem+setAudioStream)  

| Param | Type | Description |
| --- | --- | --- |
| audio | <code>any</code> | The audio value. |

