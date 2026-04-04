import { useEffect } from 'react';

export default function AboutPage() {
  useEffect(() => {
    if (window.M?.Collapsible) {
      const els = document.querySelectorAll('.collapsible');
      window.M.Collapsible.init(els);
    }
  }, []);

  return (
    <div className="container" style={{ minHeight: '100vh' }}>
      <div className="row" style={{ paddingTop: '8%', paddingLeft: '20%' }}>
        <h1 style={{ fontFamily: 'FlukeGame', color: '#fde45f' }}>About Us</h1>
      </div>
      <div className="row">
        <div className="col s12 m12 l12">
          <ul className="collapsible popout waves-effect waves-light" style={{ marginLeft: '15%', width: '80%' }}>
            <li className="active">
              <div className="collapsible-header" style={{ display: 'flex', justifyContent: 'flex-end', fontFamily: 'FlukeGame' }}>Fluke Games</div>
              <div className="collapsible-body frostEffect" style={{ color: 'white' }}>
                <span>Fluke Games is a collaboration-first studio focused on building portfolio-grade game experiences with aspiring creators.</span>
              </div>
            </li>
            <li>
              <div className="collapsible-header" style={{ display: 'flex', justifyContent: 'flex-end', fontFamily: 'FlukeGame' }}>Vision</div>
              <div className="collapsible-body frostEffect" style={{ color: 'white' }}>
                <span>Create polished, mythology-inspired games and grow into a globally respected game IP studio.</span>
              </div>
            </li>
            <li>
              <div className="collapsible-header" style={{ display: 'flex', justifyContent: 'flex-end', fontFamily: 'FlukeGame' }}>Mission</div>
              <div className="collapsible-body frostEffect" style={{ color: 'white' }}>
                <span>Blend storytelling and technology into immersive experiences that help talent grow and stand out.</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
