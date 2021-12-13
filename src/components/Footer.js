import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
<footer>
        <Link to="/">
          <button>home</button>
        </Link>
        <Link to="/new">
          <button>add</button>
        </Link>
        <Link to="/profile">
          <button>my profile </button>
        </Link>

</footer>
  );
}

export default Footer;
