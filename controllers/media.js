import { Media } from "../models/media.js";
import axios from "axios";

function search(req, res) {
  axios
    .get(
      `https://kitsu.io/api/edge//${req.params.type}?filter[text]=${req.body.title}`
    )
    .then((response) => {
      console.log(response.data.data);
      res.json(response.data.data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err: err.errmsg });
    });
}




export { search};
