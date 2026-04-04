import { Link } from 'react-router-dom';

const defaultDp = '/assets/images/website/defaultProfilePic.png';

export default function Navbar() {
  return (
    <nav className="nav" role="navigation">
      <div className="navcontainer">
        <div className="row" style={{ maxHeight: '10px' }}>
          <div className="col s4 m3 l3">
            <div className="logo">
              <Link to="/home">
                <img className="normalImage" src="/assets/images/website/Fluke_Games_Logo.png" alt="Fluke Games" />
              </Link>
            </div>
          </div>

          <div className="col s8 m9 l9">
            <div id="mainListDiv">
              <div className="row">
                <ul className="right">
                  <li>
                    <Link to="/careers" className="tooltipped" data-position="bottom" data-tooltip="Collaborate">
                      <glownormal><i className="fas fa-hands-helping smedium" /></glownormal>
                    </Link>
                  </li>
                  <li>
                    <a href="https://www.linkedin.com/company/fluke-games/" target="_blank" rel="noreferrer" className="tooltipped" data-position="bottom" data-tooltip="LinkedIn">
                      <glownormal><i className="fab fa-linkedin smedium" /></glownormal>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.instagram.com/flukegames/" target="_blank" rel="noreferrer" className="tooltipped" data-position="bottom" data-tooltip="Instagram">
                      <glownormal><i className="fab fa-instagram smedium" /></glownormal>
                    </a>
                  </li>
                  <li>
                    <a className="mini-photo-wrapper tooltipped" data-position="bottom" data-tooltip="Profile">
                      <img className="circle circleBorder responsive-img" style={{ width: '60px', height: '60px' }} src={defaultDp} alt="profile" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
