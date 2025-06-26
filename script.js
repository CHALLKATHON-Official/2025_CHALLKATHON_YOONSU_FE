const call = document.getElementById('callTime');
const kakao = document.getElementById('kakaoTime');
const dm = document.getElementById('dmTime');
const target = document.getElementById('targetTime');
const heart = document.getElementById('heart');
const percentText = document.getElementById('percent');
const totalText = document.getElementById('total');
const resetBtn = document.getElementById('resetBtn');

function getSelectedDateKey() {
  const dateInput = document.getElementById('contactDate');
  if (!dateInput || !dateInput.value) {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }
  return dateInput.value;
}

function saveToLocalStorage(total, percent) {
  const key = getSelectedDateKey();
  const record = JSON.parse(localStorage.getItem('lovecentage') || '{}');
  record[key] = { total, percent };
  localStorage.setItem('lovecentage', JSON.stringify(record));
}


function updateHeart() {
  const total = Number(call.value) + Number(kakao.value) + Number(dm.value);
  const base = Number(target.value) || 1200;
  const percent = Math.min((total / base) * 100, 100).toFixed(1);

  totalText.textContent = `총 연락 시간: ${total}분`;
  percentText.textContent = `연락 퍼센트: ${percent}%`;

  const scale = 1 + (percent / 100) * 0.3;
  heart.style.transform = `scale(${scale})`;

  let heartImg = "heart_0.png";
  if (percent === 0) heartImg = "heart_0.png";
  else if (percent <= 33) heartImg = "heart_1.png";
  else if (percent <= 66) heartImg = "heart_2.png";
  else if (percent < 100) heartImg = "heart_3.png";
  else heartImg = "heart_4.png";
  heart.src = heartImg;

  saveToLocalStorage(total, percent);
}

const saveBtn = document.getElementById('saveBtn');
saveBtn.addEventListener('click', updateHeart);


resetBtn.addEventListener('click', () => {
  call.value = 0;
  kakao.value = 0;
  dm.value = 0;
  target.value = 1200;
  updateHeart();
});

window.addEventListener('DOMContentLoaded', () => {
  const record = JSON.parse(localStorage.getItem('lovecentage') || '{}');
  const todayData = record[getTodayKey()];

   if (dateInput) {
    dateInput.addEventListener('change', () => {
      const record = JSON.parse(localStorage.getItem('lovecentage') || '{}');
      const todayData = record[getSelectedDateKey()];
      if (todayData) {
        const total = Number(todayData.total);
        const base = 1200;
        const percent = (total / base) * 100;

        totalText.textContent = `총 연락 시간: ${total}분`;
        percentText.textContent = `연락 퍼센트: ${percent.toFixed(1)}%`;
        heart.style.transform = `scale(${1 + (percent / 100) * 0.3})`;
      } else {
        totalText.textContent = `총 연락 시간: 0분`;
        percentText.textContent = `연락 퍼센트: 0%`;
        heart.style.transform = 'scale(1)';
      }
    });
  }

  if (todayData) {
    totalText.textContent = `총 연락 시간: ${todayData.total}분`;
    percentText.textContent = `연락 퍼센트: ${todayData.percent}%`;
    const scale = 1 + (todayData.percent / 100) * 0.3;
    heart.style.transform = `scale(${scale})`;
    heart.classList.add('charged');
  }
  if (document.getElementById("calendar")) {
  const calendarEl = document.getElementById("calendar");
  const data = JSON.parse(localStorage.getItem("scheduleData") || "[]");

  const events = data.map(item => ({
    title: item.content,
    start: item.date,
    allDay: true
  }));

  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    locale: "ko",
    events: events
  });

  calendar.render();
}

});



function toggleMenu() {
  const menu = document.getElementById('menu');
  menu.classList.toggle('show');
}


call.addEventListener('input', updateHeart);
kakao.addEventListener('input', updateHeart);
dm.addEventListener('input', updateHeart);

function loadWeeklyData() {
  const record = JSON.parse(localStorage.getItem('lovecentage') || '{}');
  const today = new Date();
  const labels = [];
  const data = [];

  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const key = date.toISOString().split('T')[0];

    labels.push(key.slice(5)); // MM-DD 형식
    data.push(record[key]?.percent ?? 0);
  }

  const ctx = document.getElementById('percentChart').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: '연락 퍼센트 (%)',
        data: data,
        borderColor: '#ff5b8b',
        backgroundColor: '#ffc2d1',
        fill: true,
        tension: 0.3
      }]
    },
    options: {
      scales: {
        y: { beginAtZero: true, max: 100 }
      }
    }
  });
}

window.addEventListener('DOMContentLoaded', loadWeeklyData);

function loadSchedules() {
  const list = document.getElementById("scheduleList");
  const data = JSON.parse(localStorage.getItem("scheduleData") || "[]");

  list.innerHTML = "";
  data.sort((a, b) => new Date(a.date) - new Date(b.date));
  data.forEach((item, idx) => {
    const li = document.createElement("li");
    li.innerHTML = `${item.date} - ${item.content}
      <button onclick="deleteSchedule(${idx})">삭제</button>`;
    list.appendChild(li);
  });
}

function addSchedule() {
  const date = document.getElementById("scheduleDate").value;
  const content = document.getElementById("scheduleContent").value;
  if (!date || !content) return alert("날짜와 일정을 모두 입력하세요.");

  const data = JSON.parse(localStorage.getItem("scheduleData") || "[]");
  data.push({ date, content });
  localStorage.setItem("scheduleData", JSON.stringify(data));

  document.getElementById("scheduleDate").value = "";
  document.getElementById("scheduleContent").value = "";
  loadSchedules();
}

function deleteSchedule(index) {
  const data = JSON.parse(localStorage.getItem("scheduleData") || "[]");
  data.splice(index, 1);
  localStorage.setItem("scheduleData", JSON.stringify(data));
  loadSchedules();
}

window.addEventListener("DOMContentLoaded", () => {
  // 연락 퍼센트 (index.html)
  const record = JSON.parse(localStorage.getItem('lovecentage') || '{}');
  const todayData = record[getTodayKey()];
  if (todayData && document.getElementById("total")) {
    totalText.textContent = `총 연락 시간: ${todayData.total}분`;
    percentText.textContent = `연락 퍼센트: ${todayData.percent}%`;
    const scale = 1 + (todayData.percent / 100) * 0.3;
    heart.style.transform = `scale(${scale})`;
    heart.classList.add('charged');
  }

  // 연락 퍼센트 차트 (index.html)
  if (document.getElementById("percentChart")) {
    loadWeeklyData();
  }

  // 스케줄 리스트 (schedule.html)
  if (document.getElementById("scheduleList")) {
    loadSchedules();
  }

  // 🔥 달력 로딩 (schedule.html)
  if (document.getElementById("calendar")) {
    const calendarEl = document.getElementById("calendar");
    const data = JSON.parse(localStorage.getItem("scheduleData") || "[]");

    const events = data.map(item => ({
      title: item.content,
      start: item.date,
      allDay: true
    }));

    const calendar = new FullCalendar.Calendar(calendarEl, {
     initialView: "dayGridMonth",
     locale: "ko",
     height: 500,
     events: events
     });



    calendar.render();
  }
});

