import {
  newUniqueId,
  getItemFromStorage,
  setItemBackToStorage,
  addTaskToUserStorage,
} from './storageLogic.js';

import {
  createTaskRow,
  checkTaskStatus,
  checkTaskPriority,
  crerateEditForm,
} from './createTableElements.js';

import {renderEntrance} from './entranceBlock.js';

// Смена состояния кнопок
const changeBtnsState = (form, input, btnOne, btnTwo) => {
  if (!input.value) {
    btnOne.disabled = true;
    btnTwo.disabled = true;
  }

  input.addEventListener('input', e => {
    btnOne.disabled = !e.target.value;
    btnTwo.disabled = !e.target.value;
  });

  form.addEventListener('reset', () => {
    btnOne.disabled = true;
    btnTwo.disabled = true;
  });
};

// Обновить нумерацию задач в таблице
const resetTaskNumbers = (table) => {
  const rows = Array.from(table.rows);
  rows.forEach(row => {
    if (row.rowIndex !== 0) row.cells[1].textContent = row.rowIndex;
  });
};

// СМЕНА И УДАЛЕНИЕ ПРОФИЛЯ
// Смена профиля путем удаление таблицы задач и возврату к экрану входа
const changeCurrentUser = (header, wrapper) => {
  header.remove();
  wrapper.remove();
  renderEntrance();
};

// Удаление профиля
const delCurrentUser = (username, header, wrapper) => {
  if (confirm('Удалить текущего пользователя?')) {
    const usersList = getItemFromStorage('users');
    usersList.forEach(user => {
      if (user === username) {
        usersList.splice(usersList.indexOf(user), 1);

        setItemBackToStorage('users', usersList);

        localStorage.removeItem(username);

        changeCurrentUser(header, wrapper);
      }
    });
  } else {
    return;
  }
};

// Отслеживать события на блоке кнопок
const headerControls = (header, username, wrapper) => {
  header.addEventListener('click', e => {
    if (e.target.classList.contains('changeUser')) {
      changeCurrentUser(header, wrapper);
    }

    if (e.target.classList.contains('delUser')) {
      delCurrentUser(username, header, wrapper);
    }
  });
};

// РЕДАКТИРОВАТЬ ЗАДАЧУ
// Получить id задачи
const getTaskRowId = e => {
  const taskRow = e.target.closest('tr');
  const id = +taskRow.cells[0].textContent;
  return id;
};

// Получить задачу из storage
const loadTaskFromStorage = (name, id) => {
  const user = getItemFromStorage(name);
  const userTasks = user.tasks;
  let retTask;
  userTasks.forEach(task => {
    if (task.id === id) retTask = task;
  });
  return retTask;
};

// Сформировать форму с редактируемой задачей
const renderEditForm = (taskStorage, currentRow) => {
  const editRow = crerateEditForm(
      taskStorage.id,
      taskStorage.task,
      taskStorage.status,
      taskStorage.priority,
  );

  currentRow.replaceWith(editRow);

  editRow.number.textContent = editRow.rowIndex;

  return editRow;
};

// Собрать данные с формы редактирования
const gatherEditFormData = e => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const taskText = formData.get('taskText');
  const priority = formData.get('priority');
  const status = formData.get('status');
  return {taskText, priority, status};
};

// Проверка статуса задачи
const checkEditedTaskStatus = (row, priority, status) => {
  checkTaskStatus(row, status);
  checkTaskPriority(row, priority);
};

// Изменить задачу в таблице
const changeTaskRow = (form, table, row, taskText, priority, status, controlTask, name) => {
  row.cells[2].textContent = taskText;
  row.cells[3].textContent = priority;
  row.cells[4].textContent = status;

  checkEditedTaskStatus(row, priority, status);
  controlTask(table, row, name);
  form.replaceWith(row);
};

// Изменить задачу в storage
const changeTaskStorage = (task, taskText, priority, status) => {
  task.task = taskText;
  task.priority = priority;
  task.status = status;
};

// Вернуть задачу в storage
const setBackToStorage = (name, id, task) => {
  const user = getItemFromStorage(name);
  const userTasks = user.tasks;

  userTasks.forEach(storageTask => {
    if (storageTask.id === id) userTasks[userTasks.indexOf(storageTask)] = task;
  });

  localStorage.setItem(name, JSON.stringify(user));
};

// Управление формой редактирования
const editFormControl = (name, id, task, table, editRow, editRowForm, reservedRow, controlTask) => {
  editRowForm.addEventListener('submit', e => {
    const {taskText, priority, status} = gatherEditFormData(e);

    changeTaskRow(editRow, table, reservedRow, taskText, priority, status, controlTask, name);

    changeTaskStorage(task, taskText, priority, status);

    setBackToStorage(name, id, task);
  });

  // Отмена редактирования
  editRow.addEventListener('click', e => {
    if (e.target.classList.contains('cancelBtn')) {
      editRow.replaceWith(reservedRow);
      controlTask(table, reservedRow, name);
    }
  });
};

// Изменить задачу везде
const editTask = (e, name, table, controlTask) => {
  const currentRow = e.target.closest('tr');
  const reservedRow = currentRow.cloneNode(true);
  const id = getTaskRowId(e);
  const taskStorage = loadTaskFromStorage(name, id);
  const editRow = renderEditForm(taskStorage, currentRow);

  editFormControl(name, id, taskStorage, table, editRow, editRow.form, reservedRow, controlTask);
};
//  ===================================================================


// ЗАВЕРШИТЬ ЗАДАЧУ
// Поставить задаче статус "выполнено" в storage
const setStorageTaskDoneState = (name, id) => {
  const user = JSON.parse(localStorage.getItem(name));
  const userTasks = user.tasks;

  userTasks.forEach(task => {
    if (task.id === id) task.status = 'Выполнена';
  });

  const storageTasks = JSON.stringify(user);
  localStorage.setItem(name, storageTasks);
};

// Поставить задаче статус "выполнено" в таблице
const setTableTaskDoneState = row => {
  row.classList.remove('table-light', 'table-warning', 'table-danger');
  row.classList.add('table-success');
  row.cells[2].classList.remove('task');
  row.cells[2].classList.add('text-decoration-line-through');
  row.cells[4].textContent = 'Выполнена';
  row.cells[5].lastElementChild.disabled = true;
};

// Поставить задаче статус "выполнено" везде
const finishTask = (e, name) => {
  const taskRow = e.target.closest('tr');
  const id = +taskRow.cells[0].textContent;

  setStorageTaskDoneState(name, id);

  setTableTaskDoneState(taskRow);
};
//  ===================================================================


// УДАЛИТЬ ЗАДАЧУ
// Удалить задачу из storage
const removeStorageTask = (name, id) => {
  const user = JSON.parse(localStorage.getItem(name));
  const userTasks = user.tasks;

  userTasks.forEach(task => {
    if (task.id === id) userTasks.splice(userTasks.indexOf(task), 1);
  });

  const storageTasks = JSON.stringify(user);
  localStorage.setItem(name, storageTasks);
};

// Удалить задачу везде
const deleteTask = (e, name) => {
  const taskRow = e.target.closest('tr');
  const id = +taskRow.cells[0].textContent;

  if (confirm('Удалить задачу?')) {
    removeStorageTask(name, id);
    taskRow.remove();
  } else {
    return;
  }
};
//  ===================================================================


// УПРАВЛЕНИЕ ТАБЛИЦЕЙ
const controlTask = (table, row, name) => {
  row.addEventListener('click', e => {
    if (e.target.classList.contains('editBtn')) editTask(e, name, table, controlTask);

    if (e.target.classList.contains('doneBtn')) finishTask(e, name);

    if (e.target.classList.contains('delBtn')) {
      deleteTask(e, name);
      resetTaskNumbers(table);
    }
  });
};
//  ===================================================================


// ДОБАВИТЬ ЗАДАЧУ
// Добавить новую задачу в таблицу
const addTaskRow = (taskObj, name, table) => {
  const newTaskRow = createTaskRow(taskObj);
  controlTask(table, newTaskRow, name);
  table.prepend(newTaskRow);
};

// Сгенерировать объект новой задачи
const createTaskObj = (name, task, priority) => {
  const taskObj = {
    id: newUniqueId(),
    task,
    status: 'В процессе',
    priority,
  };

  return taskObj;
};

// Добавить новую задачу везде
const addTask = (table, form, username, input, saveBtn, delBtn) => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const task = formData.get('task');
    const priority = formData.get('priority');

    const taskObj = createTaskObj(username, task, priority);

    addTaskRow(taskObj, username, table);

    addTaskToUserStorage(username, taskObj);

    resetTaskNumbers(table);

    form.reset();
    changeBtnsState(form, input, saveBtn, delBtn);
  });
};

export {
  changeBtnsState,
  resetTaskNumbers,
  headerControls,
  addTask,
  controlTask,
};
