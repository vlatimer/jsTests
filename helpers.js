function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function createElement(element, attribute, inner) {
  const newElement = document.createElement(element);

  Object.keys(attribute || {}).forEach((attr_name) => {

    if (attr_name === "classList") {

      (attribute[attr_name] || []).forEach((class_name) => {
        newElement.classList.add(class_name);
      });
      return;
    }

    if (attr_name.startsWith("on")) {
      attribute[attr_name].forEach((event_foo) => {
        const eventName = attr_name.slice(2);
        newElement.addEventListener(eventName, event_foo, false);
      });
      return;
    }
    (attribute[attr_name] || []).forEach((name) => {
      newElement.setAttribute(attr_name, name);
    });

  });

  (inner || []).forEach((text) => {
    if (text instanceof HTMLElement) {
      newElement.appendChild(text);
    } else if (text.__proto__ === String.prototype) {
      newElement.innerHTML = text;
    }
  });

  return newElement;

}

function createRightProp(klass, arrignore) {
  const name = Object.keys(klass).find(prop => prop === "name");
  const klass_name = klass[name];

  const arrProp = Object.keys(klass).filter((prop) => {
    if (arrignore.includes(prop)) {
      return false;
    }
    return true;
  });

  const objProp = {};

  arrProp.forEach((item) => {
    objProp[item] = klass[item];
  });

  return {
    'klass_name': klass_name,
    'obj_name': klass.constructor.name,
    'obj_prop': objProp,
  };


}

function createInfoBlock(name, arguments, class_name) {
  const arr = [];
  Object.keys(arguments || {}).forEach(arg_name =>
    arr.push(createElement('p', {}, [`${capitalLetter(arg_name)}: ${arguments[arg_name]}`]))
  );

  const newElement = createElement('div', {
    classList: ['info__block'],
    id: [arguments.id],
    // klass: [class_name],
  }, [createElement('h3', {}, [name]), ...arr, createElement('button', {
    onclick: [addIdToInput],
  }, ['+'])]);

  infoBox.prepend(newElement);
}

function updateInfoBlock(div, klass, updateignore) {
  const obj_prop = createRightProp(klass, updateignore).obj_prop;
  (div.childNodes || []).forEach((child) => {

    if (child.nodeName === 'P') {

      Object.keys(obj_prop || {}).forEach((prop) => {

        if (child.innerHTML.includes(capitalLetter(prop))) {
          child.innerHTML = `${capitalLetter(prop)}: ${obj_prop[prop]}`;
          return;
        }
      });
    }
  });
}

function capitalLetter(message) {
  return message.charAt(0).toUpperCase() + message.slice(1);
}

function uncapitalLetter(message) {
  return message.charAt(0).toLowerCase() + message.slice(1);
}

function addIdToInput(event) {
  const div = event.target.closest('div');
  const div_id = div.id;
  // const div_klass = div.getAttribute('klass');

  // const arr = arrayOfMemory[uncapitalLetter(div_klass)];
  // const klass = arr.find(elem => elem.id == div_id);

  inputString.value = inputString.value + ' ' + div_id;
}