import { BaseEvent } from '../BaseEvent'

class KeyboardEvent extends BaseEvent {
  private sourceEvent: globalThis.KeyboardEvent
  propagating = true

  // Returns a boolean value that is true if the Alt (Option or ⌥ on OS X) key was active when the key event was generated.
  altKey: boolean

  // Returns a DOMString with the code value of the physical key represented by the event.
  code: string

  // Returns a boolean value that is true if the Ctrl key was active when the key event was generated.
  ctrlKey: boolean

  // Returns a boolean value that is true if the event is fired between after compositionstart and before compositionend.
  isComposing: boolean

  // Returns a DOMString representing the key value of the key represented by the event.
  key: string

  // Returns a Number representing the location of the key on the keyboard or other input device. A list of the constants identifying the locations is shown above in Keyboard locations.
  location: number

  // Returns a boolean value that is true if the Meta key (on Mac keyboards, the ⌘ Command key; on Windows keyboards, the Windows key (⊞)) was active when the key event was generated.
  metaKey: boolean

  // Returns a boolean value that is true if the key is being held down such that it is automatically repeating.
  repeat: boolean

  // Returns a boolean value that is true if the Shift key was active when the key event was generated.
  shiftKey: boolean

  // Returns a Number representing a system and implementation dependent numeric code identifying the unmodified value of the pressed key; this is usually the same as keyCode.
  which: number

  constructor(sourceEvent: globalThis.KeyboardEvent) {
    super()
    this.sourceEvent = sourceEvent
    this.altKey = sourceEvent.altKey
    this.code = sourceEvent.code
    this.ctrlKey = sourceEvent.ctrlKey
    this.isComposing = sourceEvent.isComposing
    this.key = sourceEvent.key
    this.location = sourceEvent.location
    this.metaKey = sourceEvent.metaKey
    this.repeat = sourceEvent.repeat
    this.shiftKey = sourceEvent.shiftKey
    this.which = sourceEvent.which
  }

  stopPropagation() {
    this.propagating = false
    if (this.sourceEvent) this.sourceEvent.stopPropagation()
  }
  preventDefault() {
    if (this.sourceEvent) this.sourceEvent.preventDefault()
  }
}
export { KeyboardEvent }
