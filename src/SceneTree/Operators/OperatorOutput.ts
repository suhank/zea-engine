/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Parameter } from '../Parameters/Parameter'
import { EventEmitter } from '../../Utilities/EventEmitter'
import { OperatorOutputMode } from '../Parameters/OperatorOutputMode'
import { Operator } from './Operator'

/** Class representing an operator output.
 * @extends EventEmitter
 */
abstract class OperatorOutput<T> extends EventEmitter {
  __name: string
  _mode: OperatorOutputMode
  _op: Operator | null = null
  private _param?: Parameter<T>
  _paramBindIndex: number
  detached: boolean

  /**
   * Create an operator output.
   * @param name - The name value.
   * @param operatorOutputMode - The mode which the OperatorOutput uses to bind to its target parameter.
   */
  constructor(name: string, operatorOutputMode = OperatorOutputMode.OP_WRITE) {
    super()
    this.__name = name
    this._mode = operatorOutputMode
    this._param = undefined
    this._paramBindIndex = -1
    this.detached = false
  }

  /**
   * Returns name of the output.
   * @return - The name string.
   */
  getName(): string {
    return this.__name
  }

  /**
   * Sets operator that owns this output. Called by the operator when adding outputs
   * @param op - The operator object.
   */
  setOperator(op: Operator): void {
    this._op = op
  }

  /**
   * Returns operator that owns this output.
   * @return - The operator object.
   */
  getOperator(): Operator {
    return this._op!
  }

  /**
   * Returns mode that the output writes to be parameter. Must be a number from OperatorOutputMode
   * @return - The mode value.
   */
  getMode(): OperatorOutputMode {
    return this._mode
  }

  /**
   * Returns true if this output is connected to a parameter.
   * @return - The return value.
   */
  isConnected(): boolean {
    return this._param != undefined
  }

  /**
   * The getParam method.
   * @return - The return value.
   */
  getParam(): Parameter<T> | undefined {
    return this._param
  }

  /**
   * Sets the Parameter for this output to write to.
   * @param param - The param value.
   * @param index - The index to bind at in the Parameter.
   */
  setParam(param?: Parameter<T>, index = -1): void {
    if (this._param) {
      this._param.unbindOperatorOutput(this)
    }
    this._param = param
    if (this._param) {
      this._paramBindIndex = this._param.bindOperatorOutput(this, index)
    }
    this.emit('paramSet', { param: this._param })
  }

  /**
   * Returns the index of the binding on the parameter of this OperatorOutput
   * up to date.
   * @return index - The index of the binding on the parameter.
   */
  getParamBindIndex(): number {
    return this._paramBindIndex
  }

  /**
   * If bindings change on a Parameter, it will call this method to ensure the output index is
   * up to date.
   * @param index - The index of the binding on the parameter.
   */
  setParamBindIndex(index: number): void {
    this._paramBindIndex = index
  }

  /**
   * Propagates dirty to the connected parameter.
   */
  setDirty(): void {
    if (this._param) {
      this._param.setDirty(this._paramBindIndex)
    }
  }

  /**
   * The getValue method.
   * @return - The return value.
   */
  getValue(): T {
    if (this._param) {
      return this._param.getValueFromOp(this._paramBindIndex)
    } else {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 0-1 arguments, but got 2.
      throw new Error('Cannot call getValue on OperatorOutput that is not connected:', this.__name)
    }
  }

  /**
   * When the value on a Parameter is modified by a user by calling 'setValue,
   * then if any operators are bound, the value of the Parameter cannot be modified
   * directly as it is the result of a computation. Instead, the Parameter calls
   * 'backPropagateValue' on the Operator to cause the Operator to handle propagating
   * the value to one or more of its inputs.
   * to its inputs.
   * @param value - The value param.
   * @return - The modified value.
   */
  backPropagateValue(value: any): any {
    if (this._op) {
      value = this._op.backPropagateValue(value)
    }
    return value
  }

  /**
   * The setClean method.
   * @param value - The value param.
   */
  setClean(value: T): void {
    if (this._param) {
      this._param.setCleanFromOp(value, this._paramBindIndex)
    }
  }

  // ////////////////////////////////////////
  // Persistence

  /**
   * The toJSON method encodes this type as a json object for persistence.
   * @param context - The context value.
   * @return - Returns the json object.
   */
  toJSON(context?: Record<string, any>): { name: string; paramPath: string[]; paramBindIndex: number } {
    const paramPath = this._param ? this._param.getPath() : ''
    return {
      name: this.__name,
      paramPath: context && context.makeRelative ? context.makeRelative(paramPath) : paramPath,
      paramBindIndex: this._paramBindIndex,
    }
  }

  /**
   * The fromJSON method decodes a json object for this type.
   * @param j - The json object this item must decode.
   * @param context - The context value.
   */
  fromJSON(j: Record<string, any>, context?: Record<string, any>): void {
    if (j.paramPath) {
      // Note: the tree should have fully loaded by the time we are loading operators
      // even new items and groups should have been created. Operators and state machines
      // are loaded last.
      context?.resolvePath(
        j.paramPath,
        (param: any) => {
          this.setParam(param, j.paramBindIndex)
        },
        (reason: any) => {
          console.warn("OperatorOutput: '" + this.getName() + "'. Unable to connect to:" + j.paramPath)
        }
      )
    }
  }

  /**
   * The detach method is called when an operator is being removed from the scene tree.
   * It removes all connections to parameters in the scene.
   */
  detach(): void {
    // This function is called when we want to suspend an operator
    // from functioning because it is deleted and on the undo stack.
    // Once operators have persistent connections,
    // we will simply uninstall the output from the parameter.
    this.detached = true
    this._paramBindIndex = this._param ? this._param.unbindOperatorOutput(this) : -1
  }

  /**
   * The reattach method can be called when re-instating an operator in the scene.
   */
  reattach(): void {
    this.detached = false
    if (this._param) {
      this._paramBindIndex = this._param.bindOperatorOutput(this, this._paramBindIndex)
    }
  }

  /**
   * The rebind rebinds the outputs to be at the top of the stack for its parameter.
   */
  rebind(): void {
    if (this._param) {
      this._param.unbindOperatorOutput(this)
      this._paramBindIndex = this._param.bindOperatorOutput(this)
    }
  }
}

import { Vec2, Vec3, Vec4, Color, Quat, Xfo, Mat3, Mat4 } from '../../Math'
class BooleanOperatorOutput extends OperatorOutput<boolean> {}
class NumberOperatorOutput extends OperatorOutput<number> {}
class Vec2OperatorOutput extends OperatorOutput<Vec2> {}
class Vec3OperatorOutput extends OperatorOutput<Vec3> {}
class Vec4OperatorOutput extends OperatorOutput<Vec4> {}
class ColorOperatorOutput extends OperatorOutput<Color> {}
class QuatOperatorOutput extends OperatorOutput<Quat> {}
class XfoOperatorOutput extends OperatorOutput<Xfo> {}
class Mat3OperatorOutput extends OperatorOutput<Mat3> {}
class Mat4OperatorOutput extends OperatorOutput<Mat4> {}

export {
  OperatorOutput,
  BooleanOperatorOutput,
  NumberOperatorOutput,
  Vec2OperatorOutput,
  Vec3OperatorOutput,
  Vec4OperatorOutput,
  ColorOperatorOutput,
  QuatOperatorOutput,
  XfoOperatorOutput,
  Mat3OperatorOutput,
  Mat4OperatorOutput,
}
