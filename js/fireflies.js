function createFireflies(canvas, options = {}) {
  const ctx = canvas.getContext('2d');

  const config = {
    count: options.count ?? 16, // 每側生成數量
    radius: options.radius ?? 8, // 整體放大倍率
    color: options.color ?? 'white', // 顏色
    leftRatio: options.leftRatio ?? 0.35, // 左側生成範圍終點位置比例
    rightRatio: options.rightRatio ?? 0.65, // 右側生成範圍起點位置比例
    yStart: options.yStart ?? 0.5, // 從畫面高度的?%以下開始生成
  };

  const fireflies = [];

  function resize() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
  }

  window.addEventListener('resize', resize);
  resize();

  function spawn(xRange, yRange, count) {
    for (let i = 0; i < count; i++) {
      fireflies.push({
        // 位置
        x: xRange[0] + Math.random() * (xRange[1] - xRange[0]),
        y: yRange[0] + Math.random() * (yRange[1] - yRange[0]),
        // 移速
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        // 尺寸
        r: 1 + Math.random() * 1.3,
        // 閃爍偏移
        phase: Math.random() * Math.PI * 2,
      });
    }
  }

  // 左下
  spawn(
    [0, innerWidth * config.leftRatio],
    [innerHeight * config.yStart, innerHeight],
    config.count
  );

  // 右下
  spawn(
    [innerWidth * config.rightRatio, innerWidth],
    [innerHeight * config.yStart, innerHeight],
    config.count
  );

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let f of fireflies) {
      f.x += f.vx;
      f.y += f.vy;

      const alpha = 0.25 + Math.sin(Date.now() * 0.001 + f.phase) * 0.2;

      const radius = f.r * config.radius;

      const grad = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, radius);

      grad.addColorStop(0, `rgba(255,255,255,${alpha})`);
      grad.addColorStop(1, 'rgba(0,0,0,0)');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(f.x, f.y, radius, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = `rgba(255,255,255,${alpha})`;
      ctx.beginPath();
      ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
      ctx.fill();
    }

    requestAnimationFrame(draw);
  }

  draw();
}
