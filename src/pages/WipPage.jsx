import { useEffect } from 'react';

export default function WipPage() {
  useEffect(() => {
    document.body.style.height = '100vh';
    const script = document.createElement('script');
    script.src = '/assets/js/test.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.style.height = 'auto';
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  }, []);

  return (
    <div id="world" style={{ position: 'absolute', width: '100%', height: '100%', overflow: 'hidden', background: 'linear-gradient(#e4e0ba, #f7d9aa)' }} />
  );
}
