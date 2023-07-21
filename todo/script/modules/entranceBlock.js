import {renderTable} from './renderTable.js';
import {
  getItemFromStorage,
  checkUserNameRepeat,
  checkMaxUsers,
  setUser,
} from './storageLogic.js';

// Проверить наличие зарегистрированных пользователей
const checkUsersInStorage = () => {
  const usersList = getItemFromStorage('users');
  if (usersList && usersList.length > 0) {
    return true;
  } else {
    return false;
  }
};

// Удалить экран входа из HTML
const removeEntrance = entrance => {
  entrance.remove();
};

// Создать общий контейнер для входа
const createEntranceContainer = () => {
  const entranceContainer = document.createElement('div');
  entranceContainer.classList.add('container');
  return entranceContainer;
};

// ФОРМА СОЗДАНИЯ НОВОГО ПОЛЬЗОВАТЕЛЯ
// Создать форму для нового пользователя
const createNewUserForm = () => {
  const form = document.createElement('form');
  form.classList.add('form', 'd-flex', 'flex-column');

  const title = document.createElement('h3');
  title.classList.add('form-title', 'mb-4');
  title.textContent = 'Новый пользователь';

  const formGroup = document.createElement('div');
  formGroup.classList.add('form-group', 'mb-3');

  const label = document.createElement('label');
  label.classList.add('form-label');
  label.for = 'name';
  label.textContent = 'Введите имя пользователя';

  const input = document.createElement('input');
  input.classList.add('form-control');
  input.setAttribute('maxlength', '20');
  input.name = 'name';
  input.id = 'name';
  input.type = 'text';
  input.required = true;

  const btnConfirm = document.createElement('button');
  btnConfirm.classList.add('btn', 'btn-primary', 'w-50');
  btnConfirm.type = 'submit';
  btnConfirm.disabled = true;
  btnConfirm.textContent = 'Создать';

  form.input = input;
  form.btn = btnConfirm;

  formGroup.append(label, input);
  form.append(title, formGroup, btnConfirm);

  return form;
};

// Изменить активность кнопок при заполненном / пустом поле ввода
const changeBtnState = (input, btn) => {
  input.addEventListener('input', e => {
    btn.disabled = !e.target.value;
  });
};

// Собрать данные нового польователя и создать таблицу задач
const controlNewProfileForm = (form, entrance) => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    if (checkUserNameRepeat(name)) {
      const user = setUser(name);
      form.reset();
      removeEntrance(entrance);
      renderTable(user);
    } else {
      form.reset();
      return;
    }
  });
};
//  ===================================================================


// СПИСОК ЗАРЕГИСТРИРОВАННЫХ ПОЛЬЗОВАТЕЛЕЙ
// Создать карточку зарегестрированного пользователя
const createRegisteredUserCard = username => {
  const registeredUserCard = document.createElement('button');
  registeredUserCard.type = 'button';
  registeredUserCard.classList.add(
      'btn',
      'btn-outline-dark',
      'py-3',
      'px-4',
      'mb-2',
      'fs-5',
      'text-start',
      'userCard',
  );
  registeredUserCard.textContent = username;

  return registeredUserCard;
};

// Создать карточки для всех пользователей
const createRegisteredUsersList = () => {
  const usersList = getItemFromStorage('users');
  const mapList = usersList.map(username => createRegisteredUserCard(username));
  return mapList;
};

// Отработать клик по карточке пользователя
const controlRegisteredUsersBlock = (usersBlock, form, entrance) => {
  usersBlock.addEventListener('click', e => {
    if (e.target.classList.contains('userCard')) {
      const userName = e.target.textContent;
      form.reset();
      removeEntrance(entrance);
      renderTable(userName);
    }
  });
};
//  ===================================================================


// ЭКРАН ВХОДА В ПРИЛОЖЕНИЕ
// Создать интерфейс для входа
const createEntranceBlock = entrance => {
  const entranceBlock = document.createElement('div');
  entranceBlock.classList.add('py-5');

  const entranceTitle = document.createElement('h1');
  entranceTitle.textContent = 'Добро пожаловать в менеджер задач';
  entranceTitle.classList.add('text-center', 'mb-5');

  const contentBlock = document.createElement('div');
  contentBlock.classList.add('d-flex', 'justify-content-center');

  const newUserBlock = document.createElement('div');
  newUserBlock.classList.add('md-6', 'w-25');

  let newUserForm = createNewUserForm();

  changeBtnState(newUserForm.input, newUserForm.btn);
  controlNewProfileForm(newUserForm, entrance);
  newUserForm = checkMaxUsers(newUserForm);

  newUserBlock.append(newUserForm);

  contentBlock.prepend(newUserBlock);

  if (checkUsersInStorage()) {
    newUserBlock.classList.add('ms-5');

    const registeredUsersBlock = document.createElement('div');
    registeredUsersBlock.classList.add(
        'd-flex',
        'flex-column',
        'md-6',
        'w-25',
        'me-5',
    );

    const registeredUsersTitle = document.createElement('h3');
    registeredUsersTitle.textContent = 'Список пользователей';
    registeredUsersTitle.classList.add('mb-4');

    const usersList = createRegisteredUsersList();

    registeredUsersBlock.append(registeredUsersTitle, ...usersList);

    controlRegisteredUsersBlock(registeredUsersBlock, newUserForm, entrance);

    const divider = document.createElement('div');
    divider.classList.add('vr');

    contentBlock.prepend(registeredUsersBlock, divider);
  }

  entranceBlock.append(entranceTitle, contentBlock);

  return entranceBlock;
};

const renderEntrance = () => {
  const entranceContainer = createEntranceContainer();
  const entranceBlock = createEntranceBlock(entranceContainer);

  entranceContainer.append(entranceBlock);
  document.body.append(entranceContainer);
};

export {renderEntrance};
