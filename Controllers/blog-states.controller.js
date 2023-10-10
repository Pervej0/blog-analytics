const { default: axios } = require("axios");
const {
  memoize,
  maxBy,
  filter,
  uniqBy,
  mapValues,
  includes,
} = require("lodash");

const memoizedFun = async () => {
  return axios
    .get("https://intent-kit-16.hasura.app/api/rest/blogs", {
      headers: {
        "x-hasura-admin-secret":
          "32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6",
      },
    })
    .then((response) => {
      const data = response.data.blogs;
      const totalBlogs = data.length;
      const longestTitleBlog = maxBy(data, (item) => item.title.length);
      const privacyBlogs = filter(data, (item) =>
        includes(item.title, "Privacy")
      );
      const uniqueBlogs = uniqBy(data, "title");
      const uniqueBlogTitles = mapValues(uniqueBlogs, (item) => item.title);

      return {
        totalBlogs,
        longestTitle: longestTitleBlog.title,
        totalPrivacyBlogs: privacyBlogs.length,
        uniqueBlogTitles,
      };
    })
    .catch((error) => {
      console.error("Error:", error);
      return error;
    });
};
// totalBlogs,
// longestTitle: longestTitleBlog.title,
// totalPrivacyBlogs: privacyBlogs.length,
// uniqueBlogTitles,

exports.getBlogStates = async (req, res) => {
  const allData = await memoizedFun();
  // const result = memoize((data) => data);
  // console.log(result);
  res.json(allData);
};
