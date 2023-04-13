import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="nav-bar">
      <h2>Forum</h2>
      <Link to="/">Home</Link>
      <Link to="/create">New Post</Link>
    </div>
  );
};

export default NavBar;