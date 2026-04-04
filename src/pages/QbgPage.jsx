import { useEffect } from 'react';

export default function QbgPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.height = '100vh';

    const scripts = [
      '/assets/js/gameManager.js',
      '/assets/js/honeycomb-world.js',
      '/assets/js/player.js',
      '/assets/js/chatbox.js'
    ].map((src) => {
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      document.body.appendChild(script);
      return script;
    });

    return () => {
      document.body.style.height = 'auto';
      scripts.forEach((s) => s.parentNode && s.parentNode.removeChild(s));
    };
  }, []);

  return (
    <div className="container">
      <canvas id="canvas" />
      <div className="wip">WIP</div>
      <div id="bug" className="bee">
        <div className="wings" />
        <div className="limbs" />
      </div>
      <div className="chatbox-container">
        <div className="chatbox-header">
          <h2>Chatbox</h2>
          <button id="close-btn">X</button>
        </div>
        <div className="chatbox-content">
          <div id="messages" />
        </div>
        <form id="message-form" className="input-container">
          <input type="text" className="submit" id="message-input" placeholder="Type a message..." />
          <button type="submit" className="submit">SEND</button>
        </form>
      </div>
    </div>
  );
}
