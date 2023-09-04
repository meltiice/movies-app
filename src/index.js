import { createRoot } from "react-dom/client";

import App from "./copmonents/app";

const root = createRoot(document.querySelector("#root"));
root.render(<App />);
/*
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYmQyOGY5MGQ5ODdhMGZjOTAyYzVkZThiOTllNDY4OCIsInN1YiI6IjY0ZTYxZWNjMWZlYWMxMDBlMTY4Y2NhOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3bV51BqTrNDF898J5uH-yAm1GcTaN3oj_bKdVnzqMIU',
  },
};

fetch(
  'https://api.themoviedb.org/3/search/movie?query=return&include_adult=false&language=en-US&page=1',
  options,
)
  .then((res) => res.json())
  .then((res) => console.log(res))
  .catch((err) => console.log(err));

  */

// const APIKEY = "dbd28f90d987a0fc902c5de8b99e4688";
