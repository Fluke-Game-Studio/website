export default function ShowcasePage() {
  return (
    <div className="container" style={{ paddingTop: '120px', minHeight: '80vh', color: 'white' }}>
      <h3 style={{ color: '#ffd54f' }}>Showcase</h3>
      <p>The site is fully migrated to React routing and state flow.</p>
      <p>Interactive 3D modules are retained in assets and can be progressively refactored into React-safe components.</p>
      <div style={{ marginTop: '16px' }}>
        <a className="btn amber darken-2" href="https://www.youtube.com/watch?v=NcKUwYlBdxs" target="_blank" rel="noreferrer">Watch Prototype Trailer</a>
      </div>
    </div>
  );
}
