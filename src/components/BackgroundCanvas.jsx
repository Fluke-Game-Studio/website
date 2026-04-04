import { useEffect, useRef } from 'react';

export default function BackgroundCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext('2d');
    let cw = 0;
    let ch = 0;
    let cx = 0;
    let cy = 0;
    let animationFrame;

    const cfg = {
      bgFillColor: 'rgba(50,50,50,.01)',
      dirsCount: 6,
      stepsToTurn: 15,
      dotSize: 2,
      dotCount: 250,
      dotVelocity: 2,
      distance: 40
    };

    const dirList = [];
    for (let i = 0; i < 360; i += 360 / cfg.dirsCount) {
      dirList.push({ x: Math.cos((i * Math.PI) / 180), y: Math.sin((i * Math.PI) / 180) });
    }

    const dotList = [];

    class Dot {
      constructor() {
        this.pos = { x: cx, y: cy };
        this.dir = ((Math.random() * 3) | 0) * 2;
        this.step = 0;
      }

      redrawDot() {
        const size = cfg.dotSize;
        ctx.fillStyle = '#f9c74f';
        ctx.fillRect(this.pos.x - size / 2, this.pos.y - size / 2, size, size);
      }

      moveDot() {
        this.step += 1;
        this.pos.x += dirList[this.dir].x * cfg.dotVelocity;
        this.pos.y += dirList[this.dir].y * cfg.dotVelocity;
      }

      changeDir() {
        if (this.step % cfg.stepsToTurn === 0) {
          this.dir = Math.random() > 0.5
            ? (this.dir + 1) % cfg.dirsCount
            : (this.dir + cfg.dirsCount - 1) % cfg.dirsCount;
        }
      }

      isDead() {
        const percent = Math.exp(this.step / cfg.distance) * Math.random();
        return percent > 100;
      }
    }

    const init = () => {
      cw = canvas.width = window.innerWidth;
      ch = canvas.height = window.innerHeight;
      cx = cw / 2;
      cy = ch / 2;
    };

    const loop = () => {
      ctx.fillStyle = cfg.bgFillColor;
      ctx.fillRect(0, 0, cw, ch);

      if (dotList.length < cfg.dotCount && Math.random() > 0.8) {
        dotList.push(new Dot());
      }

      for (let i = dotList.length - 1; i >= 0; i -= 1) {
        const dot = dotList[i];
        dot.moveDot();
        dot.redrawDot();
        dot.changeDir();
        if (dot.isDead()) dotList.splice(i, 1);
      }

      animationFrame = requestAnimationFrame(loop);
    };

    init();
    window.addEventListener('resize', init);
    loop();

    return () => {
      window.removeEventListener('resize', init);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return <canvas id="background-canvas" ref={canvasRef} />;
}
