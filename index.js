const express = require("express");
const app = express();
const getBlogStates = require("./routes/blog-states.route");
const getSearchedBlog = require("./routes/blog-search.route");
const bodyParser = require("body-parser");
const port = 8080;

// middleware
// app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const run = () => {
  try {
    app.use(getBlogStates);
    app.use(getSearchedBlog);
  } catch (error) {
    console.error("Error:", error);
  }
};

run();

app.get("/", (req, res) => {
  res.send("Hello Server");
});

app.listen(port, () => {
  console.log("App is running on port", port);
});
