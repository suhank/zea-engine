import { Vec2 } from './Vec2';
/**
 * Represents a box in 2D space. Needing two Vec2 vectors describing the corners
 */
declare class Box2 {
    p0: Vec2;
    p1: Vec2;
    /**
     * Creates a Box2 object using Vec2s.
     * In case the parameters are not passed by, their values are pre-defined:
     *
     * p0 is a Vec2 with {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/POSITIVE_INFINITY|`Number.POSITIVE_INFINITY`}
     *
     * p1 is a Vec2 with {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/NEGATIVE_INFINITY|`Number.NEGATIVE_INFINITY`}
     *
     * @param p0 - A point representing the corners of a 2D box.
     * @param p1 - A point representing the corners of a 2D box.
     */
    constructor(p0?: Vec2, p1?: Vec2);
    /**
     * Sets both Vec2 points
     *
     * @param p0 - A point representing the corners of a 2D box.
     * @param p1 - A point representing the corners of a 2D box.
     */
    set(p0: Vec2, p1: Vec2): void;
    /**
     * Resets the box2 back to an uninitialized state.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/POSITIVE_INFINITY|`Number.POSITIVE_INFINITY`}
     * and {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/NEGATIVE_INFINITY|`Number.NEGATIVE_INFINITY`}
     */
    reset(): void;
    /**
     * Returns `true` if the box has been expanded to contain a point.
     *
     * @return - The return value.
     */
    isValid(): boolean;
    /**
     * Expands the Box2 to contain the new point.
     *
     * @param point - A point represents the corners of a 2D box.
     */
    addPoint(point: Vec2): void;
    /**
     * Returns the length of the diagonal of the box.
     *
     * @return - Returns the distance.
     */
    size(): number;
    /**
     * Returns the size of a Box2 - the same as size().
     *
     * @return - Returns a Vec2.
     */
    diagonal(): Vec2;
    /**
     * Returns the center point of a Box2.
     *
     * @return - Returns a Vec2.
     */
    center(): Vec2;
    /**
     * Encodes `Box2` Class as a JSON object for persistence.
     *
     * @return - The json object.
     */
    toJSON(): Record<string, Record<string, number>>;
    /**
     * Calls `toJSON` method and stringifies it.
     *
     * @return - The return value.
     */
    toString(): string;
}
export { Box2 };
