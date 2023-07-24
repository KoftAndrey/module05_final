import {
  createWrapper,
  createHeader,
  createTitle,
  createActionsBlock,
  createTableWrapper,
  createTable,
  createTaskRow,
} from './createTableElements.js';

import {
  changeBtnsState,
  resetTaskNumbers,
  headerControls,
  addTask,
  controlTask,
} from './tableControls.js';

import {getItemFromStorage} from './storageLogic.js';


// Заполучение списка задач пользователя
const getUserTasks = username => {
  const usetStorage = getItemFromStorage(username);
  const userTasks = usetStorage.tasks;
  return userTasks;
};

// Рендер задач из списка пользователя
const renderRows = (tasks) => {
  const renderedRows = tasks.map(task => createTaskRow(task));
  return renderedRows;
};

// Рендер основного приложения
const renderTable = username => {
  const wrapper = createWrapper();
  const header = createHeader(username);
  const title = createTitle(username);
  const {actions, input, saveBtn, delBtn} = createActionsBlock();
  const tableWrapper = createTableWrapper();
  const {table, tbody} = createTable();
  const rows = renderRows(getUserTasks(username));

  headerControls(header, username, wrapper);

  rows.forEach(row => {
    controlTask(table, row, username);
  });

  tbody.append(...rows);
  tableWrapper.append(table);
  wrapper.append(title, actions, tableWrapper);
  document.body.append(header, wrapper);

  changeBtnsState(actions, input, saveBtn, delBtn);

  addTask(tbody, actions, username, input, saveBtn, delBtn);

  resetTaskNumbers(table);
};

export {renderTable};
