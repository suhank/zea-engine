class IntersectionData {
    constructor(screenPos, pointerRay, intersectionPos, geomData, geomItemAndDist) {
        this.screenPos = screenPos;
        this.pointerRay = pointerRay;
        this.intersectionPos = intersectionPos;
        this.geomData = geomData;
        this.geomItem = geomItemAndDist.geomItem;
        this.dist = geomItemAndDist.dist;
    }
}
export { IntersectionData };
//# sourceMappingURL=IntersectionData.js.map