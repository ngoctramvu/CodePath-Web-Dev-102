const NavBar = () => {
  return (
    <div className="App-sidebar">
      <div className="Header">
        <h3 className="Header-title">AstroDash</h3>
      </div>
      <div className="Menu">
        <ul>
          <li className="Menu-item">
            <a className="menu-link" href="/">
              <div>🏠  Dashboard</div>
            </a>
          </li>
          <li className="Menu-item">
            <a className="menu-link" href="/">
              <div>🔍  Search</div>
            </a>
          </li>
          <li className="Menu-item">
            <a className="menu-link" href="/">
              <div>ℹ️ About</div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;