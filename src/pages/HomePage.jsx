import { useEffect } from 'react';

export default function HomePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.height = '100vh';

    let lastX = 0;
    const bee = document.getElementById('bug');
    if (!bee) return undefined;

    const moveBeeMouse = (e) => {
      const x = e.clientX - 15;
      const y = e.clientY - 15;
      bee.style.left = `${x}px`;
      bee.style.top = `${y}px`;

      if (lastX < x) bee.classList.add('flip');
      else bee.classList.remove('flip');
      lastX = x;

      const h = document.createElement('div');
      h.className = 'honey_trail';
      h.style.left = `${x + 10}px`;
      h.style.top = `${y + 30}px`;

      if (Math.random() < 0.5) {
        document.body.appendChild(h);
        setTimeout(() => {
          const honeyTrail = document.getElementsByClassName('honey_trail')[0];
          if (honeyTrail) honeyTrail.remove();
        }, 2500);
      }
    };

    const moveBeeMobile = (e) => {
      const touch = e.touches[0];
      if (!touch) return;
      const bx = touch.clientX;
      const by = touch.clientY;
      bee.style.left = `${bx}px`;
      bee.style.top = `${by}px`;
      if (lastX < bx) bee.classList.add('flip');
      else bee.classList.remove('flip');
      lastX = bx;
    };

    window.addEventListener('mousemove', moveBeeMouse);
    window.addEventListener('touchmove', moveBeeMobile);

    const script = document.createElement('script');
    script.src = '/assets/js/beeHoneyMaze.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      window.removeEventListener('mousemove', moveBeeMouse);
      window.removeEventListener('touchmove', moveBeeMobile);
      document.body.style.height = 'auto';
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  }, []);

  return (
    <div className="container">
      <canvas id="canvas" />
      <div id="bug" className="bee">
        <div className="wings" />
        <div className="limbs" />
      </div>
    </div>
  );
}
