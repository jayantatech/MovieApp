import axios from "axios";
const BASE_URL = "https://api.themoviedb.org/3";

const TMDB_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YTQ2MTZjZDVlNTc5NjVjMTQxMGY4ODc5Yzg0NTkyZiIsInN1YiI6IjY1ODAzMWE0MmY4ZDA5MDkxM2E3ZDU2MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XZVsaBWjVHomPjaYSP9-oKAqIH2-cYrBHm6KW5uy6H8";
// const TMDB_TOKEN = import.meta.env.VITE_APP_TMDB_TOKEN;
const headers = {
  Authorization: `Bearer ${TMDB_TOKEN}`,
};

export const fetchDataFromAPI = async (url, params) => {
  try {
    const { data } = await axios.get(BASE_URL + url, { headers, params });
    return data;
  } catch (err) {
    // console.log(err);
    return err;
  }
};
