import { Media } from "../models/media.js";
import axios from "axios";

function search(req, res) {
  axios
    .get(
      `https://kitsu.io/api/edge//${req.params.type}?filter[text]=${req.body.title}`
    )
    .then((response) => {
      res.json(response.data.data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err: err.errmsg });
    });
}

function collection(req, res) {
  axios
    .get(
      `https://kitsu.io/api/edge//${req.params.type}?filter[id]=${req.body.collection}`
    )
    .then((response) => {
      res.json(response.data.data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err: err.errmsg });
    });
}

function add(req, res) {
  req.body.favoritedBy = req.user.profile;
  Media.findOne({ id: req.body.id, type: req.body.type }).then((media) => {
    if (media) {
      media.favoritedBy.push(req.user.profile);
      media.save().then((media) => res.json(media));
    } else {
      Media.create(req.body).then((media) => res.json(media));
    }
  });
}

function remove(req, res) {
  Media.findOne({ id: req.body.id, type: req.body.type }).then((media) => {
    let idx = media.favoritedBy.indexOf(req.user.profile);
    media.favoritedBy.splice(idx, 1);
    media.save().then((media) => res.json(media));
  });
}

function currentUserCollection(req, res) {
  Media.find({ favoritedBy: req.user.profile, type: req.params.type }).then(
    (media) => {
      let collection = [];
      media.map((media) => {
        collection.push(media.id);
      });
      res.json(collection);
    }
  );
}

function userCollection(req, res) {
  Media.find({ favoritedBy: req.user.profile, type: req.params.type })
    .then((media) => {
      let collection = "";
      media.map((media) => (collection += `${media.id},`));
      return collection;
    })
    .then((collection) => {
      axios
        .get(
          `https://kitsu.io/api/edge//${req.params.type}?filter[id]=${collection}`
        )
        .then((response) => {
          res.json(response.data.data);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({ err: err.errmsg });
        });
    });
}

export {
  search,
  collection,
  add,
  remove,
  currentUserCollection,
  userCollection,
};
