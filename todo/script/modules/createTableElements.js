// Создать обертку
const createWrapper = () => {
  const wrapper = document.createElement('div');
  wrapper.classList.add(
      'app-container',
      'vh-100',
      'w-100',
      'd-flex',
      'align-items-center',
      'flex-column',
  );

  return wrapper;
};

// СОЗДАТЬ ШАПКУ
// Создать заголовок шапки
const createHeaderTitle = username => {
  const titleElem = document.createElement('h4');
  titleElem.textContent = username;

  return titleElem;
};

// Создать шапку
const createHeader = username => {
  const header = document.createElement('header');
  header.classList.add('p-3', 'bg-dark', 'text-white', 'mb-5');

  const headerContainer = document.createElement('div');
  headerContainer.classList.add('container');

  const headerContent = document.createElement('div');
  headerContent.classList.add(
      'd-flex',
      'flex-wrap',
      'align-items-center',
      'justify-content-between',
  );

  const headerTitle = createHeaderTitle(username);

  const headerBntsBlock = document.createElement('div');

  const changeUserBtn = document.createElement('button');
  changeUserBtn.type = 'button';
  changeUserBtn.classList.add('btn', 'btn-outline-light', 'me-3', 'changeUser');
  changeUserBtn.textContent = 'Сменить пользователя';

  const delUserBtn = document.createElement('button');
  delUserBtn.type = 'button';
  delUserBtn.classList.add('btn', 'btn-warning', 'delUser');
  delUserBtn.textContent = 'Удалить';

  headerBntsBlock.append(changeUserBtn, delUserBtn);
  headerContent.append(headerTitle, headerBntsBlock);
  headerContainer.append(headerContent);
  header.append(headerContainer);

  return header;
};
//  ===================================================================


// СОЗДАТЬ ТАБЛИЦУ
// Создать заголовок таблицы
const createTitle = username => {
  const titleElem = document.createElement('h1');
  titleElem.classList.add('mb-4');
  titleElem.textContent = `Список задач ${username}`;

  return titleElem;
};

// Создать список приоритетности
const createPrioritySelect = () => {
  const select = document.createElement('select');
  select.classList.add('form-select');
  select.name = 'priority';
  select.id = 'select';

  const normalPriority = document.createElement('option');
  normalPriority.value = 'Обычная';
  normalPriority.textContent = 'Обычная';

  const highPriority = document.createElement('option');
  highPriority.value = 'Важная';
  highPriority.textContent = 'Важная';

  const topPriority = document.createElement('option');
  topPriority.value = 'Срочная';
  topPriority.textContent = 'Срочная';

  select.append(normalPriority, highPriority, topPriority);

  return select;
};

// Создать форму добавления задачи
const createActionsBlock = () => {
  const actions = document.createElement('form');
  actions.classList.add('d-flex', 'mb-3', 'w-75', 'row', 'gx-3');

  const taskDiv = document.createElement('div');
  taskDiv.classList.add('col-md-6');

  const taskLabel = document.createElement('label');
  taskLabel.classList.add('form-group', 'mb-0', 'w-100');
  taskLabel.for = 'task';

  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'Введите задачу';
  input.name = 'task';
  input.classList.add('form-control');

  taskLabel.append(input);
  taskDiv.append(taskLabel);

  const selectDiv = document.createElement('div');
  selectDiv.classList.add('col-md-3');

  const select = createPrioritySelect();
  selectDiv.append(select);

  const btnDiv = document.createElement('div');
  btnDiv.classList.add('col-md-3', 'd-flex');

  const saveBtn = document.createElement('button');
  saveBtn.type = 'submit';
  saveBtn.classList.add('btn', 'btn-primary', 'me-3', 'w-100');
  saveBtn.textContent = 'Сохранить';
  saveBtn.disabled = true;

  const delBtn = document.createElement('button');
  delBtn.type = 'reset';
  delBtn.classList.add('btn', 'btn-warning', 'w-100');
  delBtn.textContent = 'Очистить';
  delBtn.disabled = true;

  btnDiv.append(saveBtn, delBtn);

  actions.append(taskDiv, selectDiv, btnDiv);

  return {actions, input, saveBtn, delBtn};
};

// Создать обертку таблицы
const createTableWrapper = () => {
  const wrapper = document.createElement('div');
  wrapper.classList.add('table-wrapper', 'w-100');

  return wrapper;
};

// Создать таблицу
const createTable = () => {
  const table = document.createElement('table');
  table.classList.add(
      'table',
      'table-hover',
      'table-bordered',
      'w-75',
      'mx-auto',
  );

  const thead = document.createElement('thead');
  thead.insertAdjacentHTML('afterbegin',
      `<tr>
         <th class="col-md-1">№</th>
         <th class="col-md-5">Задача</th>
         <th class="col-md-2">Приоритет</th>
         <th class="col-md-2">Статус</th>
         <th class="col-md-2">Действия</th>
      </tr>`);

  const tbody = document.createElement('tbody');

  table.append(thead, tbody);

  return {table, tbody};
};

// Создать блок кнопок для задачи
const createRowBtns = () => {
  const td = document.createElement('td');

  const btnDel = document.createElement('button');
  btnDel.classList.add('btn', 'btn-danger', 'me-2', 'delBtn');
  btnDel.type = 'button';
  btnDel.insertAdjacentHTML('beforeend', `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill delBtn" viewBox="0 0 16 16">
      <path class="delBtn" d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
    </svg>
  `);

  const btnEdit = document.createElement('button');
  btnEdit.classList.add('btn', 'btn-dark', 'me-2', 'editBtn');
  btnEdit.type = 'button';
  btnEdit.insertAdjacentHTML('beforeend', `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill editBtn" viewBox="0 0 16 16">
      <path class="editBtn" d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
    </svg>
  `);

  const btnSuc = document.createElement('button');
  btnSuc.classList.add('btn', 'btn-success', 'doneBtn');
  btnSuc.type = 'button';
  btnSuc.insertAdjacentHTML('beforeend', `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2 doneBtn" viewBox="0 0 16 16">
      <path class="doneBtn" d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
    </svg>
  `);

  td.append(btnDel, btnEdit, btnSuc);

  return td;
};

// Проверить статус задачи
const checkTaskStatus = (row, status) => {
  if (status === 'Выполнена') {
    row.classList.remove('table-light', 'table-warning', 'table-danger');
    row.classList.add('table-success');
    row.cells[2].classList.remove('task');
    row.cells[2].classList.add('text-decoration-line-through');
    row.cells[5].lastElementChild.disabled = true;
  }

  if (status === 'В процессе') {
    row.cells[2].classList.remove('text-decoration-line-through');
    row.cells[2].classList.add('task');
    row.cells[5].lastElementChild.disabled = false;
  }

  row.cells[4].textContent = status;
};

// Проверить приоритет задачи
const checkTaskPriority = (row, priority) => {
  row.classList.remove('table-light', 'table-warning', 'table-danger');

  switch (priority) {
    case 'Обычная':
      row.classList.add('table-light');
      break;
    case 'Важная':
      row.classList.add('table-warning');
      break;
    case 'Срочная':
      row.classList.add('table-danger');
      break;
  }
};

// Создать блок задачи
const createTaskRow = ({id, number, task, priority, status}) => {
  const row = document.createElement('tr');

  const idCell = document.createElement('td');
  idCell.textContent = id;
  idCell.classList.add('d-none');

  const numCell = document.createElement('td');
  numCell.textContent = number;
  numCell.classList.add('col-md-1');

  const taskCell = document.createElement('td');
  taskCell.textContent = task;
  taskCell.classList.add('col-md-5', 'text-break');

  const priorityCell = document.createElement('td');
  priorityCell.textContent = priority;
  priorityCell.classList.add('col-md-2');

  const statusCell = document.createElement('td');
  statusCell.classList.add('col-md-2');

  const buttons = createRowBtns();
  buttons.classList.add('col-md-2');


  row.append(idCell, numCell, taskCell, priorityCell, statusCell, buttons);

  checkTaskPriority(row, priority);
  checkTaskStatus(row, status);

  return row;
};
//  ===================================================================


// СОЗДАТЬ ФОРМУ РЕДАКТИРОВАНИЯ ЗАДАЧИ
// Установить заданный статус задачи
const selectStatus = (select, status) => {
  switch (status) {
    case 'В процессе':
      select.firstElementChild.setAttribute('selected', '');
      break;
    case 'Выполнена':
      select.lastElementChild.setAttribute('selected', '');
      break;
  }
};

// Установить заданный приоритет задачи
const selectPriority = (select, priority) => {
  switch (priority) {
    case 'Обычная':
      select.firstElementChild.setAttribute('selected', '');
      break;
    case 'Важная':
      select.firstElementChild.nextElementSibling.setAttribute('selected', '');
      break;
    case 'Срочная':
      select.lastElementChild.setAttribute('selected', '');
      break;
  }
};

// Создать форму редактирования задачи
const crerateEditForm = (id, number, task, status, priority) => {
  const editRow = document.createElement('tr');
  editRow.classList.add('table-info');

  const idCell = document.createElement('td');
  idCell.textContent = id;
  idCell.classList.add('d-none');

  const formCell = document.createElement('td');
  formCell.setAttribute('colspan', '5');

  const numCellDiv = document.createElement('div');
  const num = number + '';
  numCellDiv.textContent = num;
  numCellDiv.classList.add('col-1');

  const form = document.createElement('form');
  form.classList.add('row', 'gx-3');

  const taskTextDiv = document.createElement('div');
  taskTextDiv.classList.add('col-5');

  const taskText = document.createElement('input');
  taskText.type = 'text';
  taskText.name = 'taskText';
  taskText.value = task;
  taskText.classList.add('form-control');

  taskTextDiv.append(taskText);

  const prioritySelectDiv = document.createElement('div');
  prioritySelectDiv.classList.add('col-2');

  const prioritySelect = createPrioritySelect();

  prioritySelectDiv.append(prioritySelect);
  selectPriority(prioritySelect, priority);

  const statusSelectDiv = document.createElement('div');
  statusSelectDiv.classList.add('col-2');

  const statusSelect = document.createElement('select');
  statusSelect.classList.add('form-select');
  statusSelect.name = 'status';
  statusSelect.id = 'status';

  const activeState = document.createElement('option');
  activeState.value = 'В процессе';
  activeState.textContent = 'В процессе';

  const doneState = document.createElement('option');
  doneState.value = 'Выполнена';
  doneState.textContent = 'Выполнена';

  statusSelect.append(activeState, doneState);
  statusSelectDiv.append(statusSelect);
  selectStatus(statusSelect, status);

  const btnsDiv = document.createElement('div');
  btnsDiv.classList.add('col-2', 'd-flex', 'justify-content-end');

  const editBtn = document.createElement('button');
  editBtn.type = 'submit';
  editBtn.classList.add('btn', 'btn-primary', 'me-2');
  editBtn.insertAdjacentHTML('beforeend', `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard-check-fill" viewBox="0 0 16 16">
      <path d="M6.5 0A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3Zm3 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3Z"/>
      <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1A2.5 2.5 0 0 1 9.5 5h-3A2.5 2.5 0 0 1 4 2.5v-1Zm6.854 7.354-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708.708Z"/>
    </svg>
  `);

  const cancelBtn = document.createElement('button');
  cancelBtn.type = 'button';
  cancelBtn.classList.add('btn', 'btn-danger', 'cancelBtn');
  cancelBtn.insertAdjacentHTML('beforeend', `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-backspace-reverse-fill cancelBtn" viewBox="0 0 16 16">
      <path class="cancelBtn" d="M0 3a2 2 0 0 1 2-2h7.08a2 2 0 0 1 1.519.698l4.843 5.651a1 1 0 0 1 0 1.302L10.6 14.3a2 2 0 0 1-1.52.7H2a2 2 0 0 1-2-2V3zm9.854 2.854a.5.5 0 0 0-.708-.708L7 7.293 4.854 5.146a.5.5 0 1 0-.708.708L6.293 8l-2.147 2.146a.5.5 0 0 0 .708.708L7 8.707l2.146 2.147a.5.5 0 0 0 .708-.708L7.707 8l2.147-2.146z"/>
    </svg>
  `);

  btnsDiv.append(editBtn, cancelBtn);

  form.append(
      numCellDiv,
      taskTextDiv,
      prioritySelectDiv,
      statusSelectDiv,
      btnsDiv,
  );
  formCell.append(form);
  editRow.append(idCell, formCell);

  editRow.form = form;

  return editRow;
};

export {
  createWrapper,
  createHeader,
  createTitle,
  createActionsBlock,
  createTableWrapper,
  createTable,
  checkTaskStatus,
  checkTaskPriority,
  createTaskRow,
  crerateEditForm,
};
