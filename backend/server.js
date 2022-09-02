const express = require("express");
const path = require("path");

const router = express();
const port = process.env.PORT || 5000;

// Config

// Routes

router.get("/health", (req, res, next) => {
  res.status(200).send(true);
});

// App startup
if (
  typeof process.env.NODE_ENV == "string" &&
  process.env.NODE_ENV.replace(" ", "") === "production"
) {
  router.use(express.static(path.resolve(__dirname, "../prod-frontend")));

  router.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../prod-frontend", "index.html"));
  });
}

router.listen(port, () => console.log(`Listening on port ${port}`));
