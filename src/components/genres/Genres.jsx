import React from "react";
import { useSelector } from "react-redux";

import "./style.scss";

const Genres = ({ data }) => {
  const { genres } = useSelector((item) => item.home);
  // console.log(genres);
  return (
    <div className="genres">
      {data?.map((g) => {
        return <div className="genre">{genres[g]?.name}</div>;
      })}
    </div>
  );
};

export default Genres;
