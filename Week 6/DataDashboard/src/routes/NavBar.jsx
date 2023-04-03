import { Link, Outlet } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="App">
      <div className="App-sidebar">
        <div className="Header">
          <h3 className="Header-title">SeatGeek Dashboard</h3>
        </div>
        <div className="Menu">
          <ul>
            <li className="Menu-item">
              <Link className="menu-link" to="/">
                <div>🏠  Dashboard</div>
              </Link>
            </li>
            <li className="Menu-item">
              <Link className="menu-link" to="/">
                <div>🔍  Search</div>
              </Link>
            </li>
            <li className="Menu-item">
              <Link className="menu-link" to="/">
                <div>ℹ️ About</div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default NavBar;