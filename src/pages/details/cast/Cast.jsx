import React from "react";
import { useSelector } from "react-redux";

import "./style.scss";
import avatar from "../../../assets/avatar.png";
import ContentWripper from "../../../components/ContentWripper/ContentWripper";
import Img from "../../../components/lazyLoadImage/Img";
Img;
const Cast = ({ data, loading }) => {
  const { url } = useSelector((state) => state.home);
  console.log(url);

  let newData = data?.slice(0, 10);
  const skeleton = () => {
    return (
      <div className="skItem">
        <div className="circle skeleton"></div>
        <div className="row skeleton"></div>
        <div className="row2 skeleton"></div>
      </div>
    );
  };
  return (
    <div className="castSection">
      <ContentWripper>
        <div className="sectionHeading">Top Cast</div>
        {!loading ? (
          <div className="listItems">
            {newData?.map((item, index) => {
              let imageUrl = item.profile_path
                ? url.profile + item.profile_path
                : avatar;

              return (
                <div className="listItem">
                  <div className="profileImg">
                    <Img src={imageUrl} />
                  </div>
                  <div className="name">{item?.name}</div>
                  <div className="character">{item?.character}</div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="castSkeleton">
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
          </div>
        )}
      </ContentWripper>
    </div>
  );
};

export default Cast;
