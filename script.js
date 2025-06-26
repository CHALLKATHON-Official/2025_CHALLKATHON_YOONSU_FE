const call = document.getElementById('callTime');
const kakao = document.getElementById('kakaoTime');
const dm = document.getElementById('dmTime');
const target = document.getElementById('targetTime');
const heart = document.getElementById('heart');
const percentText = document.getElementById('percent');
const totalText = document.getElementById('total');
const resetBtn = document.getElementById('resetBtn');

function getTodayKey() {
  const today = new Date();
  return today.toISOString().split('T')[0];
}

function saveToLocalStorage(total, percent) {
  const key = getTodayKey();
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
if (percent > 0 && percent <= 33) {
  heartImg = "heart_1.png";
} else if (percent <= 66) {
  heartImg = "heart_2.png";
} else if (percent < 100) {
  heartImg = "heart_3.png";
} else {
  heartImg = "heart_4.png";
}
heart.src = heartImg;


  saveToLocalStorage(total, percent);
}

[call, kakao, dm, target].forEach(input => {
  input.addEventListener('input', updateHeart);
});

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
  if (todayData) {
    totalText.textContent = `총 연락 시간: ${todayData.total}분`;
    percentText.textContent = `연락 퍼센트: ${todayData.percent}%`;
    const scale = 1 + (todayData.percent / 100) * 0.3;
    heart.style.transform = `scale(${scale})`;
    heart.classList.add('charged');
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
