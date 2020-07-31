const form = document.querySelector('form');
const task = document.querySelector('#task');
const taskFilter = document.querySelector('#filter');
const listItem = document.querySelector('#taskList');
const completeItem = document.querySelector('#completeList');
const clearBtn = document.querySelector('#clear');

loadEventLoader();

function loadEventLoader(){
  form.addEventListener('submit', addList); // add task
  listItem.addEventListener('click', removeListItem); // remove and add task to complete task
  completeItem.addEventListener('click', removeComp); // view complete rask and check
  clearBtn.addEventListener('click', clearTask); // clear the task list
  taskFilter.addEventListener('keyup', filter); // filtering the task list
  document.addEventListener('DOMContentLoaded', LStaskList);
 
}

// getting local storage task

function LStaskList(){
 
  let LStoDo;
  if(localStorage.getItem('LStoDo') === null){
    LStoDo = [];
  }else{
    LStoDo = JSON.parse(localStorage.getItem('LStoDo'));
  }
  LStoDo.forEach(function(LStoDos){

    // creating list item 
  const list = document.createElement('li');
  list.className = 'list-group-item';
  list.appendChild(document.createTextNode(LStoDos));
  
  // creating link for delete
  const link = document.createElement('a');
  link.className = 'delete-item';
  link.innerHTML = '<div><i class="fa fa-trash pl-3"></i></div>';
  link.style.float = 'right';
  link.style.color ='red';
  
  // creating link for complete
  const link2 = document.createElement('a');
  link2.className = 'complete-item';
  link2.innerHTML = '<div><i class="fa fa-check-circle"></i></div>';
  link2.style.float = 'right';
  link2.style.color ='green';

  list.appendChild(link);
  list.appendChild(link2);

  listItem.appendChild(list);

  })

}

// Add List Items
function addList(e){
  if(task.value === ''){
    alert('ENTER TASK TODO');
  }else{

  // creating list item 
  const list = document.createElement('li');
  list.className = 'list-group-item';
  list.appendChild(document.createTextNode(task.value));
  
  // creating link for delete
  const link = document.createElement('a');
  link.className = 'delete-item';
  link.innerHTML = '<div><i class="fa fa-trash pl-3"></i></div>';
  link.style.float = 'right';
  link.style.color ='red';
  
  // creating link for complete
  const link2 = document.createElement('a');
  link2.className = 'complete-item';
  link2.innerHTML = '<div><i class="fa fa-check-circle"></i></div>';
  link2.style.float = 'right';
  link2.style.color ='green';

  list.appendChild(link);
  list.appendChild(link2);

  listItem.appendChild(list);

  // Add the task to local storage
    addTaskToLS(task.value);
    
  }
  task.value='';
  e.preventDefault();
}

// adding to local storage
function addTaskToLS(toDo){
  let LStoDo;
  if(localStorage.getItem('LStoDo') === null){
    LStoDo = [];
  }else{
    LStoDo = JSON.parse(localStorage.getItem('LStoDo'));
  }
  LStoDo.push(toDo);
  localStorage.setItem('LStoDo', JSON.stringify(LStoDo));
  
}

// Remove List Items And Add To Completed
function removeListItem(e){
 if(e.target.parentElement.parentElement.classList.contains('delete-item')){
    if(confirm('Are You Sure ?')){
      e.target.parentElement.parentElement.parentElement.remove();
      // Remove from LS
      removeListItemFromLS(e.target.parentElement.parentElement.parentElement);
    }
 }else if(e.target.parentElement.parentElement.classList.contains('complete-item')){
   let listContent;
   listContent = e.target.parentElement.parentElement.parentElement.textContent;
    
   const list2 = document.createElement('li');
   list2.className = 'list-group-item';
   list2.appendChild(document.createTextNode(listContent));

   const compLink = document.createElement('a');
   compLink.className ='completed';
   compLink.style.color ='blue';
   compLink.style.float ='right';
   compLink.innerHTML ='<i class="fa fa-thumbs-up"></i>';

   list2.appendChild(compLink);
   completeItem.appendChild(list2);
  
   e.target.parentElement.parentElement.parentElement.remove();
}
}

// Remove from LS
  function removeListItemFromLS(taskItem){
    let LStoDo;
  if(localStorage.getItem('LStoDo') === null){
    LStoDo = [];
  }else{
    LStoDo = JSON.parse(localStorage.getItem('LStoDo'));
  }

  LStoDo.forEach(function(tasks, index){
    if(taskItem.textContent === tasks){
      LStoDo.splice(index, 1);
    }
  });
  localStorage.setItem('LStoDo', JSON.stringify(LStoDo));
  }

// Removing completed task
function removeComp(e){
  if(e.target.parentElement.classList.contains('completed')){
    e.target.parentElement.parentElement.remove();

      // Remove completed task from LS
      completeFromLS(e.target.parentElement.parentElement);
  }
}

//Removing Completed Task From Storage
function completeFromLS(taskItems){
  let LStoDo;
  if(localStorage.getItem('LStoDo') === null){
    LStoDo = [];
  }else{
    LStoDo = JSON.parse(localStorage.getItem('LStoDo'));
  }

  LStoDo.forEach(function(task, index){
    if(taskItems.textContent === task){
      LStoDo.splice(index, 1);
    }
  });
  localStorage.setItem('LStoDo', JSON.stringify(LStoDo));

}

// Clearing the Task 
function clearTask(){
  listItem.innerHTML = completeItem.innerHTML ='';
  
}

// filter the task
function filter(e){
  const filterTask = e.target.value;

  document.querySelectorAll('.list-group-item').forEach(function(taskFilter){
    const itemFilter = taskFilter.firstChild.textContent;

    if(itemFilter.indexOf(filterTask) != -1){
      taskFilter.style.display ='block';
    }else{
      taskFilter.style.display = 'none';
    }
  });

  console.log(filterTask);
}

