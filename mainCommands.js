function createBee(args) {
  let newBee = new Bee(args[0], args[1], args[2]);
  newBee = new Proxy(newBee, {
    set(target, prop, val) {
      target[prop] = val;

      let div_arr = document.querySelectorAll('.info__block');
      let div;
      div_arr.forEach((item) => {
        if (item.id == target.id) {
          div = item;
          return;
        }
      });
      updateInfoBlock(div, target, ['name']);
      return true;
    }
  });

  arrayOfMemory.bee.push(newBee);
  const right_arr = createRightProp(newBee, ['name']);
  createInfoBlock(`${right_arr.klass_name} (${right_arr.obj_name})`, right_arr.obj_prop, right_arr.obj_name);
}

function createFlower(args) {
  let newFlower = new Flower(args[0]);

  newFlower = new Proxy(newFlower, {
    set(target, prop, val) {
      target[prop] = val;

      let div_arr = document.querySelectorAll('.info__block');
      let div;
      div_arr.forEach((item) => {
        if (item.id == target.id) {
          div = item;
          return;
        }
      });
      updateInfoBlock(div, target, ['workable']);
      return true;
    }
  });
  arrayOfMemory.flower.push(newFlower);

  const right_arr = createRightProp(newFlower, ['workable']);

  createInfoBlock(right_arr.obj_name, right_arr.obj_prop, right_arr.obj_name);
}

function showBees() {
  let string = 'Bees: ';

  (arrayOfMemory.bee || []).forEach((item) => {
    let name = item.name;
    let health = item.health;
    let damage = item.damage;

    string = `${string} { Name: ${name}, Health: ${health}, Damage: ${damage} }`;

  });
  output(string);
}

function showFlowers() {
  let string = 'Flowers: ';
  (arrayOfMemory.flower || []).forEach((item) => {
    let pollen = item.pollen;

    string = `${string} { Pollen: ${pollen} }`;

  });
  output(string);
}

function beeCollect(args) {
  const bee = arrayOfMemory.bee.find(item => item.id == args[0]);
  const flower = arrayOfMemory.flower.find(item => item.id == args[1]);

  bee.collectHoney(flower);
  flower.devastation();

  output(`Bee pollen: ${bee.pollen}, Flower: ${flower.pollen} `);
}