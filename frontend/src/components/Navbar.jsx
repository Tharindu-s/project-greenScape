import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1 className="text-2xl font-bold text-green-900">Workout Buddy</h1>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
