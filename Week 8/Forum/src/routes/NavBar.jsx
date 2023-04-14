import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="nav-bar">
      <div className="nav-title">
        <h2>MovieHub</h2>
      </div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/create">New Post</Link>
      </div>
    </div>
  );
};

export default NavBar;