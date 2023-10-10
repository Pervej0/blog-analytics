const { default: axios } = require("axios");
const { toLower, memoize } = require("lodash");
const filter = require("lodash.filter");
const includes = require("lodash.includes");

// const memoizedBlog = memoize(() => {});

exports.getSearchedBlog = (req, res) => {
  const queryText = req.query.query ? JSON.parse(req.query.query) : "";

  axios
    .get("https://intent-kit-16.hasura.app/api/rest/blogs", {
      headers: {
        "x-hasura-admin-secret":
          "32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6",
      },
    })
    .then((response) => {
      const data = response.data.blogs;
      const filterBySearchText = filter(data, (item) => {
        return includes(toLower(item.title), queryText);
      });

      res.json(filterBySearchText);
    });
};
