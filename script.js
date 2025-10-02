document.addEventListener('DOMContentLoaded', () => {

  // --- Priorities ---
  const textarea = document.getElementById('priorities');
  const editButton = document.getElementById('edit-priorities');
  const saveButton = document.getElementById('add-priorities');

  const savedContent = localStorage.getItem('textareaContent');
  if (savedContent) {
    textarea.value = savedContent;
  } else {
    textarea.value = '• ';
  }

  textarea.readOnly = true;
  saveButton.disabled = true;

  editButton.addEventListener('click', () => {
    textarea.readOnly = false;
    saveButton.disabled = false;
    textarea.focus();
  });

  saveButton.addEventListener('click', () => {
    localStorage.setItem('textareaContent', textarea.value);
    textarea.readOnly = true;
    saveButton.disabled = true;
  });

  textarea.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const cursorPosition = textarea.selectionStart;
      const textBefore = textarea.value.substring(0, cursorPosition);
      const textAfter = textarea.value.substring(cursorPosition);
      textarea.value = textBefore + '\n• ' + textAfter;
      textarea.selectionStart = textarea.selectionEnd = cursorPosition + 3;
    }
  });

// ------------------ Google Calendar Embed ------------------
const calendarInput = document.getElementById('calendar-link');
const loadBtn = document.getElementById('load-calendar');
const removeBtn = document.getElementById('remove-calendar');
const calendarContainer = document.getElementById('calendar-container');
const instructions = document.getElementById('calendar-instructions');
const inputGroup = document.getElementById('calendar-input-group');

const savedCalendarSrc = localStorage.getItem('userCalendarSrc');

// Auto-load saved calendar if exists
if (savedCalendarSrc) {
  displayCalendar(savedCalendarSrc);
  instructions.style.display = 'none';
  inputGroup.style.display = 'none';
  removeBtn.style.display = 'inline-block';
}

function extractSrc(input) {
  const match = input.match(/src=["']([^"']+)["']/);
  return match ? match[1] : input;
}

loadBtn.addEventListener('click', () => {
  let input = calendarInput.value.trim();
  if (!input) return alert('Please paste a valid Google Calendar embed code or URL.');
  const src = extractSrc(input);
  localStorage.setItem('userCalendarSrc', src);
  displayCalendar(src);
  instructions.style.display = 'none';
  inputGroup.style.display = 'none';
  removeBtn.style.display = 'inline-block';
});

removeBtn.addEventListener('click', () => {
  localStorage.removeItem('userCalendarSrc');
  calendarContainer.innerHTML = '';
  calendarInput.value = '';
  instructions.style.display = 'block';
  inputGroup.style.display = 'block';
  removeBtn.style.display = 'none';
});

function displayCalendar(src) {
  calendarContainer.innerHTML = '';
  const iframe = document.createElement('iframe');
  iframe.src = src;
  iframe.style.border = '0';
  iframe.frameBorder = '0';
  iframe.scrolling = 'no';
  iframe.width = '100%';
  iframe.height = '100%';
  calendarContainer.appendChild(iframe);
}


// ------------------ To-Do, Study, Assignments ------------------
function saveToLocal(key, array) { localStorage.setItem(key, JSON.stringify(array)); }
function loadFromLocal(key) { return JSON.parse(localStorage.getItem(key)) || []; }

let todoList = loadFromLocal('todoList');
let studyList = loadFromLocal('studyList');
let assignmentList = loadFromLocal('assignmentList');

function generateCalendarLink(title, date, time='12:00') {
  const start = date.replace(/-/g,'')+'T'+time.replace(':','')+'00Z';
  const end = date.replace(/-/g,'')+'T'+time.replace(':','')+'3000Z';
  return `https://calendar.google.com/calendar/r/eventedit?text=${encodeURIComponent(title)}&dates=${start}/${end}`;
}

function renderList(containerId, array, type) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';
  array.sort((a,b) => a.completed - b.completed);
  array.forEach((item,index)=>{
    const div = document.createElement('div');
    div.classList.add('list-item');
    if(item.completed) div.classList.add('completed');

    const checkbox = document.createElement('input');
    checkbox.type='checkbox';
    checkbox.checked = item.completed;
    checkbox.addEventListener('change', ()=>{item.completed=checkbox.checked; saveAndRender(type);});
    div.appendChild(checkbox);

    const span = document.createElement('span');
    let textContent = item.text;
    if(type==='study') textContent += ` (${item.date} ${item.from}-${item.to})`;
    if(type==='assignment') textContent += ` (${item.deadline} ${item.time})`;
    span.textContent = textContent;
    div.appendChild(span);

    if(type==='assignment' && !item.completed) {
      const calendarLink = document.createElement('a');
      calendarLink.href = generateCalendarLink(item.text, item.deadline, item.time);
      calendarLink.target='_blank';
      calendarLink.className='calendar-link';
      calendarLink.textContent='Add to Calendar';
      div.appendChild(calendarLink);
    }

    // Trashbin delete button
    const delBtn = document.createElement('button');
    delBtn.className='delete-btn ms-2';
    const img = document.createElement('img');
    img.src='https://img.icons8.com/material-rounded/24/000000/trash.png';
    img.alt='Delete';
    delBtn.appendChild(img);
    delBtn.addEventListener('click', ()=>{array.splice(index,1); saveAndRender(type);});
    div.appendChild(delBtn);

    container.appendChild(div);
  });
}

function saveAndRender(type) {
  if(type==='todo'){saveToLocal('todoList', todoList); renderList('todo-list', todoList,'todo');}
  else if(type==='study'){saveToLocal('studyList', studyList); renderList('study-list', studyList,'study');}
  else if(type==='assignment'){saveToLocal('assignmentList', assignmentList); renderList('assignment-list', assignmentList,'assignment');}
}

renderList('todo-list', todoList,'todo');
renderList('study-list', studyList,'study');
renderList('assignment-list', assignmentList,'assignment');

document.getElementById('todo-add').addEventListener('click',()=>{
  const text = document.getElementById('todo-input').value.trim();
  if(!text) return;
  todoList.push({text, completed:false});
  document.getElementById('todo-input').value='';
  saveAndRender('todo');
});

document.getElementById('study-add').addEventListener('click',()=>{
  const text=document.getElementById('study-input').value.trim();
  const date=document.getElementById('study-date').value;
  const from=document.getElementById('study-from').value;
  const to=document.getElementById('study-to').value;
  if(!text||!date||!from||!to) return;
  studyList.push({text,date,from,to,completed:false});
  document.getElementById('study-input').value='';
  document.getElementById('study-date').value='';
  document.getElementById('study-from').value='';
  document.getElementById('study-to').value='';
  saveAndRender('study');
});

document.getElementById('assignment-add').addEventListener('click',()=>{
  const text=document.getElementById('assignment-input').value.trim();
  const deadline=document.getElementById('assignment-date').value;
  const time=document.getElementById('assignment-time').value||'12:00';
  if(!text||!deadline) return;
  assignmentList.push({text,deadline,time,completed:false});
  document.getElementById('assignment-input').value='';
  document.getElementById('assignment-date').value='';
  document.getElementById('assignment-time').value='';
  saveAndRender('assignment');
});

});