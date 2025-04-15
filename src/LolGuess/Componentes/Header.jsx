import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <div>
        <Link to="/">
          <button>HOME</button>
        </Link>
        <button> INFO </button>
      </div>
      <div>
        <Link to="/">
          <button> LOL GUESSER </button>
        </Link>
      </div>
      <div>
        <button> INSTAGRAM </button>
        <button> TWITTER </button>
      </div>
    </div>
  );
};

export default Header;
