import React, { useEffect, useState } from "react";
import SwitchTabs from "../../../components/switchTabs/switchTabs";
import useFetch from "../../../hooks/useFetch";
import Carousel from "../../../components/carousel/Carousel";

import "../style.scss";
import ContentWripper from "../../../components/ContentWripper/ContentWripper";

const Trending = () => {
  const [endPoint, setEndpoint] = useState("day");
  const { data, loading } = useFetch(`/trending/movie/${endPoint}`);
  const onTabChange = (tab) => {
    setEndpoint(tab === "Day" ? "day" : "week");
  };
  return (
    <div className="carouselSection">
      <ContentWripper>
        <span className="carouselTitle">Trending</span>
        <SwitchTabs data={["Day", "Week"]} onTabChange={onTabChange} />
      </ContentWripper>
      <Carousel data={data?.results} loading={loading} />
    </div>
  );
};

export default Trending;
