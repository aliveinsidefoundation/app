/*
 * Ages
 *
 * ages.child(1993) -> [1990, 1222]
 */

class Years {
  constructor(year) {
    this.year = year;
  }

  child() {
    return [this.year + 10, this.year + 15];
  }

  teenanger() {
    return [this.year + 16, this.year + 20];
  }

  adult() {
    return [this.year + 21, this.year + 40];
  }
}

export default Years;
