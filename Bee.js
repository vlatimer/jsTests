class Bee {
  constructor(name, health, damage) {
    this.id = (new Date).getTime() + getRndInteger(0, 100);
    this.name = name || 'Bee';
    this.health = parseInt(health, 10) || 1;
    this.damage = parseInt(damage, 10) || 1;
    this.pollen = 0;
  }

  collectHoney(flower) {
    this.pollen += flower.pollen;
  }
}