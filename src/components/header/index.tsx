import { Link } from "gatsby";
import React from "react";
import "./index.scss";

interface HeaderProps {
  title: string;
  location: Location;
  rootPath: string;
}

const Header: React.FC<HeaderProps> = ({ title, location, rootPath }) => {
  const isRoot = location.pathname === rootPath;
  return isRoot ? (
    <h1 className="home-header">
      <Link to={`/`} className="link">
        {title}
      </Link>
    </h1>
  ) : null;
};

export default Header;
