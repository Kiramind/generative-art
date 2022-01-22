const BOUND_ENVELOPPE = 10;

export default class Collision {
  constructor(paper) {
    this.paper = paper
    this.verticalEnveloppes = []
    this.horizontalEnveloppes = []
  }

  clear(){
    this.verticalEnveloppes = []
    this.horizontalEnveloppes = []
  }

  addSegment(drawSegment) {
    let existingRecs = drawSegment.isHoriz
      ? this.horizontalEnveloppes
      : this.verticalEnveloppes
    existingRecs.push(drawSegment.enveloppe(BOUND_ENVELOPPE))
  }

  // isColliding(path) {
  //
  //   this.cleanFailed()
  //
  //   console.log("Before checking collision")
  //   console.log("#hEnveloppes", this.horizontalEnveloppes.length)
  //   console.log("#vEnveloppes", this.verticalEnveloppes.length)
  //
  //   let verts = Collision.extractVerticalSegments(path)
  //   let horizs = Collision.extractHorizontalSegments(path)
  //
  //   return this.checkIntercept(true, horizs) || this.checkIntercept(false, verts)
  // }

  isColliding(drawSegment) {
    let enveloppe = drawSegment.enveloppe(BOUND_ENVELOPPE)
    let endEnveloppe = drawSegment.endEnveloppe(BOUND_ENVELOPPE)
    let existingRecs = drawSegment.isHoriz ? this.horizontalEnveloppes : this.verticalEnveloppes
    let testEndRecs = !drawSegment.isHoriz ? this.horizontalEnveloppes : this.verticalEnveloppes

    return this._testCollision(enveloppe, existingRecs)
      || this._testCollision(endEnveloppe, testEndRecs)
  }

  _testCollision(enveloppe, recs) {
    let res = false

    for (var j = 0; j < recs.length; j++) {
      let rec = recs[j]

      res = res || rec.intersects(enveloppe) || enveloppe.contains(rec) || rec.contains(enveloppe)
      if (res) {
        return true
      }
    }
    return false
  }

  // checkIntercept(isHoriz, segments) {
  //   let addedRecs = segments.map( seg => this.createEnveloppe(isHoriz, seg[0], seg[1], 'blue'));
  //   let existingRecs = isHoriz ? this.horizontalEnveloppes : this.verticalEnveloppes
  //
  //   let res = false
  //
  //   for (var i = 0; i < addedRecs.length; i++) {
  //     let addedRec = addedRecs[i]
  //     for (var j = 0; j < existingRecs.length; j++) {
  //       let existingRec = existingRecs[j]
  //
  //       res = res || existingRec.intersects(addedRec) || addedRec.contains(existingRec) || existingRec.contains(addedRec)
  //       if (res) {
  //         this.failed.push(...addedRecs)
  //         return true
  //       }
  //     }
  //   }
  //
  //   return false
  // }

  // static extractHorizontalSegments(path) {
  //
  //   let lastPoint = path[0]
  //   let horizontals = []
  //
  //   for (var i = 1; i < path.length; i++) {
  //     let nextPoint = path[i]
  //     if (Collision.isHorizontalSegment(lastPoint, nextPoint)) {
  //       horizontals.push([lastPoint, nextPoint])
  //     }
  //     lastPoint = nextPoint
  //   }
  //   return horizontals
  // }
  //
  // static extractVerticalSegments(path) {
  //   let lastPoint = path[0]
  //   let verticals = []
  //
  //   for (var i = 1; i < path.length; i++) {
  //     let nextPoint = path[i]
  //     if (!Collision.isHorizontalSegment(lastPoint, nextPoint)) {
  //       verticals.push([lastPoint, nextPoint])
  //     }
  //     lastPoint = nextPoint
  //   }
  //
  //   return verticals
  // }


  // createEnveloppe(isHoriz, pt1, pt2, color) {
  //   let recX = isHoriz ? Math.min(pt1[0], pt2[0]) - BOUND_ENVELOPPE : pt1[0] - BOUND_ENVELOPPE
  //   let recY = isHoriz ? pt1[1] - BOUND_ENVELOPPE : Math.min(pt1[1], pt2[1]) - BOUND_ENVELOPPE
  //   let recWidth = isHoriz ? Math.abs(pt1[0] - pt2[0]) + BOUND_ENVELOPPE * 2 : BOUND_ENVELOPPE * 2
  //   let recHeight = isHoriz ? BOUND_ENVELOPPE * 2 : Math.abs(pt1[1] - pt2[1]) + BOUND_ENVELOPPE * 2
  //
  //   // TODO: create non Path rectangle to not draw enveloppe
  //   return new this.paper.Path.Rectangle({
  //     point: [recX, recY],
  //     size: [recWidth, recHeight],
  //     strokeColor: color,
  //   });
  // }

  // static isHorizontalSegment(pt1, pt2) {
  //   if (pt1[1] === pt2[1]) {
  //     return true
  //   } else {
  //     if (pt1[0] === pt2[0]) {
  //       return false
  //     } else {
  //       console.log(pt1, pt2)
  //       throw "Non aligned points"
  //     }
  //   }
  // }

  static printRectangles(rectangles) {
    console.log("Rectangles [")
    rectangles.forEach((rec) => {
      Collision.printRectangle(rec)
    });
    console.log("]")
  }
  static printRectangle(rectangle) {
    console.log(`[${rectangle.x}, ${rectangle.y}, ${rectangle.width}, ${rectangle.height}]`);
  }
}
