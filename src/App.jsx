import "./App.css";
import { useEffect, useState } from "react";
import { fetchDataFromAPI } from "./Utils/api";
import { useSelector, useDispatch } from "react-redux";
import { getApiConfiguration, getGenres } from "./store/homeSlice";
import Home from "./pages/home/Home";
import Explore from "./pages/explore/Explore";
import Details from "./pages/details/Details";
import PageNotFound from "./pages/404/PageNotFound";
import Footer from "./components/footer/footer";
import Header from "./components/header/header";
import SearchResult from "./pages/searchResult/SearchResult";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const dispatch = useDispatch();

  const url = useSelector((state) => state.home.url);
  useEffect(() => {
    fatchApiConfig();
    genresCall();
  }, []);

  const fatchApiConfig = async () => {
    try {
      const res = await fetchDataFromAPI("/configuration");

      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
      };
      dispatch(getApiConfiguration(url));
    } catch (err) {
      console.error(err);
    }
  };

  const genresCall = async () => {
    let promises = [];
    let endPoints = ["tv", "movie"];
    let allGenres = {};
    endPoints.forEach((url) => {
      promises.push(fetchDataFromAPI(`/genre/${url}/list`));
    });
    const data = await Promise.all(promises);
    data.map(({ genres }) => {
      return genres.map((item) => (allGenres[item.id] = item));
    });
    // console.log(allGenres);
    dispatch(getGenres(allGenres));
  };

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/serch/:query" element={<SearchResult />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      {/* <div style={{ height: "1000px" }}></div> */}
      <Footer />
    </BrowserRouter>
  );
}

export default App;
