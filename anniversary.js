document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('anniversary-form');
  const titleInput = document.getElementById('title');
  const dateInput = document.getElementById('date');
  const list = document.getElementById('anniversary-list');

  loadAnniversaries(); // 기존 데이터 로드

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = titleInput.value.trim();
    const date = dateInput.value;

    if (title && date) {
      saveAnniversary({ title, date });
      titleInput.value = '';
      dateInput.value = '';
      loadAnniversaries();
    }
  });

  function saveAnniversary(entry) {
    const data = JSON.parse(localStorage.getItem('anniversaries') || '[]');
    data.push(entry);
    localStorage.setItem('anniversaries', JSON.stringify(data));
  }

  function loadAnniversaries() {
    let data = JSON.parse(localStorage.getItem('anniversaries') || '[]');

    // 날짜 기준으로 정렬
    data.sort((a, b) => new Date(a.date) - new Date(b.date));

    list.innerHTML = '';

    data.forEach((entry, index) => {
      const dday = calculateDday(entry.date);
      const li = document.createElement('li');
      li.innerHTML = `
        <span>📌 <strong>${entry.title}</strong> - ${entry.date} <em>(${dday})</em></span>
        <button onclick="deleteAnniversary(${index})">삭제</button>
      `;
      list.appendChild(li);
    });
  }

  window.deleteAnniversary = function(index) {
    const data = JSON.parse(localStorage.getItem('anniversaries') || '[]');
    data.splice(index, 1);
    localStorage.setItem('anniversaries', JSON.stringify(data));
    loadAnniversaries();
  };
});

function toggleMenu() {
  const menu = document.getElementById('menu');
  menu.classList.toggle('show');  // 
}

<<<<<<< HEAD
=======


>>>>>>> 3d3b936 (최신 작업 반영)
// ✅ D-Day 계산 함수
function calculateDday(dateString) {
  const today = new Date();
  const target = new Date(dateString);
  today.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);
  const diffTime = target - today;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return diffDays === 0 ? 'D-DAY' : (diffDays > 0 ? `D-${diffDays}` : `D+${Math.abs(diffDays)}`);
}
