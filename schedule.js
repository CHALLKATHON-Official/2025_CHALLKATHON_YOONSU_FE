document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('schedule-form');
  const titleInput = document.getElementById('schedule-title');
  const dateInput = document.getElementById('schedule-date');
  const startTimeInput = document.getElementById('schedule-start-time');
  const endTimeInput = document.getElementById('schedule-end-time');
  const descInput = document.getElementById('schedule-desc');
  const list = document.getElementById('schedule-list');

  loadSchedules();

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = titleInput.value.trim();
    const date = dateInput.value;
    const startTime = startTimeInput.value;
    const endTime = endTimeInput.value;
    const desc = descInput.value.trim();

    if (title && date && startTime && endTime && desc) {
      saveSchedule({ title, date, startTime, endTime, desc });
      titleInput.value = '';
      dateInput.value = '';
      startTimeInput.value = '';
      endTimeInput.value = '';
      descInput.value = '';
      loadSchedules();
    }
  });

  function saveSchedule(entry) {
    const data = JSON.parse(localStorage.getItem('schedules') || '[]');
    data.push(entry);
    localStorage.setItem('schedules', JSON.stringify(data));
  }

  function loadSchedules() {
    const data = JSON.parse(localStorage.getItem('schedules') || '[]');

    // 시작 시간 기준 정렬
    data.sort((a, b) => new Date(`${a.date}T${a.startTime}`) - new Date(`${b.date}T${b.startTime}`));

    list.innerHTML = '';
    data.forEach((entry, index) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <span><strong>${entry.title}</strong> - ${entry.date} ${entry.startTime} ~ ${entry.endTime}<br><em>${entry.desc}</em></span>
        <button onclick="deleteSchedule(${index})">삭제</button>
      `;
      list.appendChild(li);
    });

    renderCalendar(data);
  }

  window.deleteSchedule = function(index) {
    const data = JSON.parse(localStorage.getItem('schedules') || '[]');
    data.splice(index, 1);
    localStorage.setItem('schedules', JSON.stringify(data));
    loadSchedules();
  };
});

function toggleMenu() {
  document.getElementById('menu').classList.toggle('show');
}

function renderCalendar(events) {
  const calendarEl = document.getElementById('calendar');
  if (!calendarEl) return;

  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    locale: 'ko',
    height: 'auto',
    fixedWeekCount: false,
    showNonCurrentDates: false,
    dayMaxEventRows: 3,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: ''
    },
    events: events.map(e => ({
      title: e.title,
      start: `${e.date}T${e.startTime}`
    }))
  });

  calendar.render();
}
