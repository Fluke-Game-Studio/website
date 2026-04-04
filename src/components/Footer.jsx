import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="overSceneFooter">
      <div className="row">
        <div className="col l12 m12 s12">
          <div className="row">
            <div className="col l6 m6 s6">
              <Link to="/home">Home</Link><br />
              <Link to="/about">About Us</Link><br />
              <Link to="/careers">Careers</Link><br />
              <a href="https://www.arcade.flukegamestudio.com" target="_blank" rel="noreferrer">Arcade Internal</a><br />
            </div>
            <div className="col l6 m6 s6 center">
              Projects<br />
              Portfolio<br />
              <Link to="/pavan">Pavan Game</Link><br />
              <Link to="/showcase">Pavan Game Showcase</Link><br />
            </div>
          </div>
          <p style={{ color: 'goldenrod' }}>Copyright 2019 &copy; Fluke Games <span>&#8482;</span></p>
        </div>
      </div>
    </footer>
  );
}
