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
// --- Calendar ---
const calendarInput = document.getElementById('calendar-link');
const loadBtn = document.getElementById('load-calendar');
const calendarContainer = document.getElementById('calendar-container');

// Load saved calendar embed URL
const savedCalendarSrc = localStorage.getItem('userCalendarSrc');
if (savedCalendarSrc) {
    calendarInput.value = savedCalendarSrc;
    displayCalendar(savedCalendarSrc);
}

// Extract src from iframe code or return input if it's already a URL
function extractSrc(input) {
    const match = input.match(/src=["']([^"']+)["']/);
    return match ? match[1] : input;
}

loadBtn.addEventListener('click', () => {
    let input = calendarInput.value.trim();
    if (!input) return alert('Please paste a valid Google Calendar embed code or URL.');

    const src = extractSrc(input);
    localStorage.setItem('userCalendarSrc', input); // save original input
    displayCalendar(src);
});

function displayCalendar(src) {
    calendarContainer.innerHTML = '';
    const iframe = document.createElement('iframe');
    iframe.src = src;
    iframe.style.border = '0';
    iframe.frameBorder = '0';
    iframe.scrolling = 'no';
    calendarContainer.appendChild(iframe);
}

});