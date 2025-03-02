// Array de tarefas
const tasks = [
  { title: "Comprar comida para o gato", type: "Urgente" },
  { title: "Consertar Computador", type: "Importante" },
  { title: "Beber água", type: "Normal" },
  { title: "Enviar relatório trimestral", type: "Importante" },
  { title: "Fazer exercícios físicos", type: "Normal" },
  { title: "Agendar consulta médica", type: "Urgente" },
  { title: "Ler pelo menos um capítulo de um livro", type: "Normal" },
  { title: "Limpar a despensa", type: "Importante" },
  { title: "Pagar a conta de energia", type: "Urgente" },
  { title: "Assistir a um documentário interessante", type: "Normal" },
];

// Função que vai acessar o elemento do DOM e renderizar as tarefas
function renderElements(tasks) {
  // Acessando o elemento <ul> onde as tarefas serão inseridas
  const taskList = document.querySelector('.tasks__list');
  
  // Limpando a lista existente (caso haja tarefas já renderizadas)
  taskList.innerHTML = '';

  // Loop para iterar sobre todas as tarefas do array 'tasks'
  tasks.forEach((task, index) => {
    const taskItem = createTaskItem(task, index); 
    taskList.appendChild(taskItem); 
  });
}

// Função que cria um item de tarefa <li> a partir de um objeto task
function createTaskItem(task, index) {
  const taskItem = document.createElement('li');
  taskItem.classList.add('task__item');

  const taskInfoContainer = document.createElement('div');
  taskInfoContainer.classList.add('task-info__container');

  const taskType = document.createElement('span');
  taskType.classList.add('task-type');

  // Condicional para adicionar a classe correta ao <span> com base no tipo de tarefa
  if (task.type === 'Urgente') {
    taskType.classList.add('span-urgent');
  } else if (task.type === 'Importante') {
    taskType.classList.add('span-important');
  } else if (task.type === 'Normal') {
    taskType.classList.add('span-normal');
  }

  const taskTitle = document.createElement('p');
  taskTitle.textContent = task.title;

  taskInfoContainer.appendChild(taskType);
  taskInfoContainer.appendChild(taskTitle);

  const removeButton = document.createElement('button');
  removeButton.classList.add('task__button--remove-task');

  // Adicionando um ícone de lixeira usando Font Awesome
  const icon = document.createElement('i');
  icon.classList.add('fas', 'fa-trash');

  removeButton.appendChild(icon);

  // Adiciona evento de clique para remover a tarefa
  removeButton.addEventListener('click', () => {
    removeTask(task); 
  });

  taskItem.appendChild(taskInfoContainer);
  taskItem.appendChild(removeButton);

  return taskItem;
}

// Função para adicionar uma nova tarefa ao clicar no botão
function addTask() {
  const titleInput = document.querySelector('#input_title');
  const typeInput = document.querySelector('.form__input--priority');
  
  const title = titleInput.value.trim();
  const type = typeInput.value.trim();

  if (title && type) {
    const newTask = { title: title, type: capitalizeFirstLetter(type) };

    // Adiciona a nova tarefa ao array tasks
    tasks.push(newTask);

    // Limpa os campos de input
    titleInput.value = '';
    typeInput.value = '';

    // Re-renderiza as tarefas
    renderElements(tasks);
  } else {
    alert('Por favor, preencha todos os campos!');
  }
}

// Função para capitalizar a primeira letra do tipo de tarefa
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Função para remover a tarefa do array tasks
function removeTask(taskToRemove) {
  // Encontrar o índice do objeto taskToRemove no array 'tasks'
  const index = tasks.findIndex(task => task.title === taskToRemove.title && task.type === taskToRemove.type);

  if (index !== -1) {
    // Remove a tarefa do array pelo índice encontrado
    tasks.splice(index, 1);

    // Re-renderiza as tarefas após a remoção
    renderElements(tasks);
  }
}

// Adiciona o evento de clique no botão "Adicionar Tarefa"
const addTaskButton = document.querySelector('.form__button--add-task');
addTaskButton.addEventListener('click', function(event) {
  event.preventDefault();
  addTask();
});

// Renderiza as tarefas iniciais
renderElements(tasks);
