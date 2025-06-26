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

// 📤 공유 코드 등록 (내 기념일을 shared_CODE로 저장)
function registerMyShareCode() {
  const code = document.getElementById("myShareCodeInput").value.trim();
  if (!code) return alert("공유 코드를 입력해주세요.");

  const data = JSON.parse(localStorage.getItem("anniversaries") || "[]");
  localStorage.setItem("shared_" + code, JSON.stringify(data));
  alert(`✅ 공유 코드로 등록 완료!\n코드: ${code}`);
}

// 💞 공유 코드 불러오기 (상대방의 shared_CODE에서 가져오기)
function loadSharedAnniversaries() {
  const code = document.getElementById("shareCodeInput").value.trim();
  if (!code) return alert("공유 코드를 입력해주세요.");

  const shared = localStorage.getItem("shared_" + code);
  if (!shared) return alert("❌ 해당 공유 코드를 찾을 수 없습니다.");

  const list = JSON.parse(shared);
  const existing = JSON.parse(localStorage.getItem("anniversaries") || "[]");

  // 중복 제거 + 💞 표시 추가
  list.forEach(item => {
    const alreadyExists = existing.some(e => e.title === item.title && e.date === item.date);
    if (!alreadyExists) {
      existing.push({
        title: item.title + " 💞",
        date: item.date
      });
    }
  });

  localStorage.setItem("anniversaries", JSON.stringify(existing));
  loadAnniversaries();  // UI 업데이트
}
