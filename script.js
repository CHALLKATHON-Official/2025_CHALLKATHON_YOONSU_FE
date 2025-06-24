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

  if (percent > 0) {
    heart.classList.add('charged');
  } else {
    heart.classList.remove('charged');
  }

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



function updateHeart() {
  const total = Number(call.value) + Number(kakao.value) + Number(dm.value);
  const percent = Math.min((total / 1200) * 100, 100).toFixed(1);

  totalText.textContent = `총 연락 시간: ${total}분`;
  percentText.textContent = `연락 퍼센트: ${percent}%`;

  if (percent > 0) {
    heart.classList.add('charged');
    heart.src = "heart_on.png";   // 💗 충전된 하트
  } else {gi
    heart.classList.remove('charged');
    heart.src = "heart_off.png";  // 🖤 기본 하트
  }
}

function toggleMenu() {
  const menu = document.getElementById('menu');
  menu.classList.toggle('show');
}


call.addEventListener('input', updateHeart);
kakao.addEventListener('input', updateHeart);
dm.addEventListener('input', updateHeart);
