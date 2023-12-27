import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { useSelector } from "react-redux";
import ContentWripper from "../../../components/ContentWripper/ContentWripper";
import Img from "../../../components/lazyLoadImage/Img";
import "./style.scss";

const HeroBanner = () => {
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");

  const { url } = useSelector((state) => state.home);

  const { data, loading } = useFetch("/movie/upcoming");
  useEffect(() => {
    if (data) {
      const bg =
        url?.backdrop +
        data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
      setBackground(bg);
    }
  }, [data]);
  const navigate = useNavigate();
  function redirectPage() {
    navigate(`/serch/${query}`);
  }
  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      // navigate(`/serch/${query}`);
      redirectPage();
    }
  };
  return (
    <div className="heroBanner">
      <div className="backdrop-img">
        {!loading && <Img className={"lazy-img"} src={background} />}
      </div>
      <div className="opacity-layer"></div>
      <ContentWripper>
        <div className="heroBannerContent">
          <span className="title">Welcome</span>
          <span className="subTitle">
            Millions of movies, TB shows prople to discover. Explore now.
          </span>
          <div className="searchInput">
            <input
              type="text"
              placeholder="Search for a movie or tv show....."
              onChange={(e) => setQuery(e.target.value)}
              onKeyUp={searchQueryHandler}
            />
            <button onClick={redirectPage}>Search</button>
          </div>
        </div>
      </ContentWripper>
    </div>
  );
};

export default HeroBanner;
