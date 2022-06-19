const formInput = document.querySelector('#input');
const inputString = document.querySelector('#input input[type="text"]');
const outputString = document.querySelector('#output');
const infoBox = document.querySelector('#infoBox');
const arrayOfMemory = {
  bee: [],
  flower: [],
};



function getFormData(formData) {
  const obj = {};

  for (let key of formData.keys()) {
    obj[key] = formData.get(key);
  }

  return obj;
}

formInput.onsubmit = (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  let command = getFormData(formData)['command'];
  try {
    if (!command.startsWith('@')) {
      const errorNotCommand = new Error('Not a command');
      throw errorNotCommand;
    }
    command = command.slice(1);

    const cmdObj = processingCommand(command);

    checkCommand(cmdObj);

  } catch (error) {

    output(error.message);
  } finally {

    formInput.reset();

  }
};

function processingCommand(cmd) {
  const obj = {};
  const args = cmd.split(' ');

  obj.command = args[0];
  obj.arguments = args.slice(1);

  return obj;
}

function checkCommand(obj) {
  const cmd = obj.command;

  switch (cmd) {
    case 'create_bee':
      createBee(obj.arguments);
      break;
    case 'create_flower':
      createFlower(obj.arguments);
      break;
    case 'show_bees':
      showBees();
      break;
    case 'show_flowers':
      showFlowers();
      break;
    case 'collect':
      beeCollect(obj.arguments);
  }
  console.log(arrayOfMemory);
}