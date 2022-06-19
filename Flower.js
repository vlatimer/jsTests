class Flower {
  constructor(pollen) {
    this.pollen = parseInt(pollen, 10) || 1;
    this.workable = true;
    this.id = (new Date).getTime() + getRndInteger(0, 100);
  }
  devastation() {
    this.pollen = 0;
    this.workable = false;
  }
}