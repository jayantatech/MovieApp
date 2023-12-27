import { useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import { fetchDataFromAPI } from "../../Utils/api";
ContentWripper;
import ContentWripper from "../../components/ContentWripper/ContentWripper";

import Spinner from "./spinner/Spinner";
import "./style.scss";
import MovieCard from "../../components/movieCard/MovieCard";
import InfinityScroll from "react-infinite-scroll-component";

const SearchResult = () => {
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const { query } = useParams();
  const [loading, setLoading] = useState(false);

  const fetchInitialData = () => {
    setLoading(true);
    fetchDataFromAPI(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res) => {
        setData(res);
        setPageNum((prev) => prev + 1);
        setLoading(false);
      }
    );
  };
  const fetchNextPageData = () => {
    fetchDataFromAPI(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res) => {
        if (data?.results) {
          setData({ ...data, results: [...data?.results, ...res.results] });
        } else setData(res);
      }
    );
  };

  useEffect(() => {
    setPageNum(1);
    fetchInitialData();
  }, [query]);
  return (
    <div className="searchResultsPage">
      {loading && <Spinner initial={true} />}
      {!loading && (
        <ContentWripper>
          {data?.results?.length > 1 ? (
            <>
              <div className="pageTitle">
                {`Search ${
                  data?.total_results > 1 ? "results" : "result"
                } of "${query}"`}
              </div>
              <InfinityScroll
                className="content"
                dataLength={data?.results?.length || []}
                next={fetchNextPageData}
                hasMore={pageNum <= data?.total_pages}
                loader={<Spinner />}
              >
                {data?.results.map((item, index) => {
                  if (item.media_type === "person") return;

                  return (
                    <MovieCard key={index} data={item} fromSearch={true} />
                  );
                })}
              </InfinityScroll>
            </>
          ) : (
            <div className="resultNotFound">Sorry, Results not Found!</div>
          )}
        </ContentWripper>
      )}
    </div>
  );
};

export default SearchResult;
