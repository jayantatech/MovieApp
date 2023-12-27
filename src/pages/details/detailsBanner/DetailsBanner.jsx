import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import "./style.scss";

import useFetch from "../../../hooks/useFetch";
import Genres from "../../../components/genres/Genres";
import CircleRating from "../../../components/circleRating/CircleRating";
import Img from "../../../components/lazyLoadImage/Img.jsx";
import PosterFallback from "../../../assets/no-poster.png";
import ContentWripper from "../../../components/ContentWripper/ContentWripper.jsx";
import { PlayIcon } from "./PlayIcon.jsx";
import VideoPopup from "../../../components/videoPopup/VideoPopup.jsx";

const DetailsBanner = ({ video, crew }) => {
  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}`);
  const { url } = useSelector((item) => item.home);
  const _genres = data?.genres?.map((genre) => genre.id);
  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };
  const director = crew?.filter((crew) => crew?.job === "Director");

  const writter = crew?.filter(
    (crew) => crew?.job === "Writer" || crew?.job === "Executive Producer"
  );
  // console.log(Director, writter);

  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);

  return (
    <div className="detailsBanner">
      {!loading ? (
        <>
          {!!data && (
            <>
              <div className="backdrop-img">
                <Img src={url.backdrop + data.backdrop_path} />
              </div>
              <div className="opacity-layer"></div>
              <ContentWripper>
                <div className="content">
                  <div className="left">
                    {data?.poster_path ? (
                      <Img
                        className="posterImg"
                        src={url?.backdrop + data.poster_path}
                      />
                    ) : (
                      <Img className="posterImg" src={PosterFallback} />
                    )}
                  </div>
                  <div className="right">
                    <div className="title">{`${
                      data.name || data.title
                    } (${dayjs(data.release_date).format("YYYY")})`}</div>
                    <div className="subtitle">{data.tagline}</div>
                    <Genres data={_genres} />
                    <div className="row">
                      <CircleRating rating={data?.vote_average.toFixed(1)} />
                      <div
                        className="playbtn"
                        onClick={() => {
                          setShow(true);
                          setVideoId(video?.key);
                        }}
                      >
                        <PlayIcon />
                        <span className="text">Watch Trailer</span>
                      </div>
                    </div>
                    <div className="overview">
                      <div className="heading">Overview</div>
                      <div className="description">{data.overview}</div>
                    </div>
                    <div className="info">
                      {data.status && (
                        <div className="infoItem">
                          <span className="text bold">Status:{""}</span>
                          <span className="text">{data.status}</span>
                        </div>
                      )}
                      {data.release_date && (
                        <div className="infoItem">
                          <span className="text bold">Release Date:{""}</span>
                          <span className="text">
                            {dayjs(data.release_date).format("MMM D, YYYY")}
                          </span>
                        </div>
                      )}
                      {data.runtime && (
                        <div className="infoItem">
                          <span className="text bold">Release Date:{""}</span>
                          <span className="text">
                            {toHoursAndMinutes(data.runtime)}
                          </span>
                        </div>
                      )}
                    </div>
                    {director?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Director</span>
                        <span className="text">
                          {director?.map((dirName, index) => (
                            <>
                              {dirName.name}
                              {director.length - 1 !== index && ", "}
                            </>
                          ))}
                        </span>
                      </div>
                    )}
                    {writter?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Director</span>
                        <span className="text">
                          {writter?.map((dirName, index) => (
                            <>
                              {dirName.name}
                              {writter.length - 1 !== index && ", "}
                            </>
                          ))}
                        </span>
                      </div>
                    )}
                    {data?.created_by && (
                      <div className="info">
                        <span className="text bold">Created By</span>
                        <span className="text">
                          {data?.created_by?.map((dirName, index) => (
                            <>
                              {dirName.name}
                              {data?.created_by.length - 1 !== index && ", "}
                            </>
                          ))}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <VideoPopup
                  show={show}
                  videoId={videoId}
                  setVideoId={setVideoId}
                  setShow={setShow}
                />
              </ContentWripper>
            </>
          )}
        </>
      ) : (
        <div className="detailsBannerSkeleton">
          <ContentWripper>
            <div className="left skeleton"></div>
            <div className="right">
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
            </div>
          </ContentWripper>
        </div>
      )}
    </div>
  );
};

export default DetailsBanner;
