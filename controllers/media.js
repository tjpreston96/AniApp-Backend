import { Media } from "../models/media.js";
import axios from "axios";

function animeSearch(req, res) {
  axios
    .get(`https://kitsu.io/api/edge//anime?filter[text]=${req.body.term}`)
    .then((response) => {
      console.log(response.data.data);
      res.json(response.data.data);
    });
}

function mangaSearch(req, res) {
  axios
    .get(`https://kitsu.io/api/edge//manga?filter[text]=${req.body.term}`)
    .then((response) => {
      console.log(response.data.data);
      res.json(response.data.data);
    });
}



export { animeSearch, mangaSearch };
