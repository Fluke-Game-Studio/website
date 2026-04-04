import { useEffect } from 'react';

export function useScript(src) {
  useEffect(() => {
    if (!src) return undefined;

    const existing = document.querySelector(`script[data-src="${src}"]`);
    if (existing) return undefined;

    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.setAttribute('data-src', src);
    document.body.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [src]);
}
