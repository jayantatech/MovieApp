import React from "react";
import { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";
import "./style.scss";
import logo from "../../assets/movix-logo.svg";
import ContentWripper from "../ContentWripper/ContentWripper";

const header = () => {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const openSearch = () => {
    setMobileMenu(false);
    setShowSearch(false);
  };
  const openMobileMenu = () => {
    setMobileMenu(true);
    setShowSearch(false);
  };

  const navigationHandaler = (item) => {
    if (item === "movies") {
      navigate("/explore/movie");
    } else if (item === "tv") {
      navigate("/explore/tv");
    }
    setMobileMenu(false);
  };

  function controlNavbar() {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("hide");
      } else {
        setShow("show");
      }
    } else {
      setShow("top");
    }
    setLastScrollY(window.scrollY);
  }

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY]);

  const searchQueryHandler = (e) => {
    if (e.key === "Enter") {
      console.log(query);
      navigate(`serch/${query}`);
      setShowSearch(false);
    }
  };

  return (
    <header className={`header ${mobileMenu && "mobileView"} ${show}`}>
      <ContentWripper>
        <div className="contentWrapper">
          <div className="logo" onClick={() => navigate("/")}>
            <img src={logo} alt="Logo" />
          </div>
          <ul className="menuItems">
            <li
              className="menuItem"
              onClick={() => navigationHandaler("movies")}
            >
              Movies
            </li>
            <li className="menuItem" onClick={() => navigationHandaler("tv")}>
              TV Shows
            </li>
            <li className="menuItem">
              <HiOutlineSearch onClick={() => setShowSearch(!showSearch)} />
            </li>
          </ul>
          <div className="mobileMenuItems">
            <HiOutlineSearch onClick={() => setShowSearch(!showSearch)} />
            {mobileMenu ? (
              <VscChromeClose onClick={openSearch} />
            ) : (
              <SlMenu onClick={openMobileMenu} />
            )}
          </div>
        </div>
      </ContentWripper>
      {showSearch && (
        <div className="searchBar">
          <ContentWripper>
            <div className="searchInput">
              <input
                type="text"
                placeholder="Search for a movie or tv show....."
                onChange={(e) => setQuery(e.target.value)}
                onKeyUp={searchQueryHandler}
              />
              <VscChromeClose onClick={() => setShowSearch(false)} />
            </div>
          </ContentWripper>
        </div>
      )}
    </header>
  );
};

export default header;
