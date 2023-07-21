// РАБОТА СО STORAGE
// Заполучить ячейку
const getItemFromStorage = itemName => JSON.parse(localStorage.getItem(itemName));

// Загрузить ячейку обратно в storage
const setItemBackToStorage = (itemName, itemContent) => {
  const content = JSON.stringify(itemContent);
  localStorage.setItem(itemName, content);
};
//  ===================================================================


// СОЗДАНИЕ УНИКАЛЬНЫХ ID
const generateId = () => {
  const allId = [];

  const randomdId = () => Math.random().toString().substring(2, 10);

  const uniqueId = () => {
    const newId = +randomdId();

    if (allId.includes(newId)) {
      uniqueId();
      return;
    } else {
      allId.push(newId);
      return newId;
    }
  };

  return uniqueId;
};
const newUniqueId = generateId();
//  ===================================================================


// РАБОТА С ПОЛЬЗОВАТЕЛЯМИ
// Проверить максимальное число пользователей
const checkMaxUsers = form => {
  const usersList = getItemFromStorage('users');
  if (usersList && usersList.length === 3) {
    form.innerHTML = `<p class="fs-5">
      Достигнуто максимальное число пользователей.
    </p>
    <p class="fs-5">
      Удалите одного из существующих пользователей чтобы создать нового.
    </p>
    `;

    form.classList.add('text-black-50');
  }

  return form;
};

// Создать список пользователей в storage
const createUsersStorageList = () => {
  if (!localStorage.getItem('users')) localStorage.setItem('users', '[]');
};

// Проверить имя пользователя на повтор
const checkUserNameRepeat = (username) => {
  const usersList = getItemFromStorage('users');

  if (usersList && usersList.includes(username)) {
    alert('Данное имя уже используется');
    return false;
  } else {
    return true;
  }
};

// Добавить пользователя в список потльзователей в storage
const addToUsersStorageList = username => {
  const usersList = getItemFromStorage('users');

  usersList.unshift(username);
  setItemBackToStorage('users', usersList);
};

// Создать нового пользователя в storage
const setUser = name => {
  createUsersStorageList();
  addToUsersStorageList(name);

  const objTemplate = {
    user: name,
    tasksCounter: 0,
    tasks: [],
  };

  localStorage.setItem(name, JSON.stringify(objTemplate));

  return name;
};

// Повысить счетчик задач пользователя
const increaseTasksNumber = username => {
  const user = getItemFromStorage(username);
  user.tasksCounter += 1;
  const number = user.tasksCounter;
  setItemBackToStorage(username, user);

  return number;
};

// Добавить задачу в storage пользователя
const addTaskToUserStorage = (username, task) => {
  const userObj = getItemFromStorage(username);
  userObj.tasks.unshift(task);
  localStorage.setItem(username, JSON.stringify(userObj));
};

export {
  checkUserNameRepeat,
  checkMaxUsers,
  setUser,
  newUniqueId,
  getItemFromStorage,
  setItemBackToStorage,
  increaseTasksNumber,
  addTaskToUserStorage,
};
