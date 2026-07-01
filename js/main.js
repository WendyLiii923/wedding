window.addEventListener('DOMContentLoaded', () => {
  createFireflies(document.getElementById('c'), {
    count: 8,
    radius: 8,
  });

  const musicBtn = document.getElementById('musicBtn');
  const bgm = document.getElementById('bgm');

  let playing = false;

  bgm.volume = 0.2;

  function playMusic() {
    bgm.play().catch(() => {});
    playing = true;
    musicBtn.textContent = '🔊';
  }

  function pauseMusic() {
    bgm.pause();
    playing = false;
    musicBtn.textContent = '🔇';
  }

  // 按鈕控制
  musicBtn.addEventListener('click', () => {
    if (playing) pauseMusic();
    else playMusic();
  });

  // 👉 方案3：第一次點畫面自動啟動
  window.addEventListener(
    'pointerdown',
    () => {
      if (!playing) playMusic();
    },
    { once: true }
  );
});
