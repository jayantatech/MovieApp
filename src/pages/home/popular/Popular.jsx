import React, { useEffect, useState } from "react";
import SwitchTabs from "../../../components/switchTabs/switchTabs";
import useFetch from "../../../hooks/useFetch";
import Carousel from "../../../components/carousel/Carousel";

import "../style.scss";
import ContentWripper from "../../../components/ContentWripper/ContentWripper";

const Trending = () => {
  const [endPoint, setEndpoint] = useState("movie");
  const { data, loading } = useFetch(`/${endPoint}/popular`);
  const onTabChange = (tab) => {
    setEndpoint(tab === "Movies" ? "movie" : "tv");
  };
  return (
    <div className="carouselSection">
      <ContentWripper>
        <span className="carouselTitle">What is Popular</span>
        <SwitchTabs data={["Movies", "TV"]} onTabChange={onTabChange} />
      </ContentWripper>
      <Carousel data={data?.results} loading={loading} endpoint={endPoint} />
    </div>
  );
};

export default Trending;
