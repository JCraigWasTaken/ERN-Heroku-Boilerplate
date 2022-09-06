const express = require("express");
const path = require("path");
const helmet = require("helmet");
const redis = require("redis");
const expressLimiter = require("express-limiter");

const app = express();
const port = process.env.PORT || 5000;

// Config
app.use(helmet());
const redisClient = redis.createClient();
const limiter = expressLimiter(app, redisClient);
limiter({
  lookup: ["connection.remoteAddress"],
  total: 1000,
  expire: 1000 * 60 * 60,
});

// Routes

app.get("/health", (req, res, next) => {
  res.status(200).send(true);
});

// App startup
if (
  typeof process.env.NODE_ENV == "string" &&
  process.env.NODE_ENV.replace(" ", "") === "production"
) {
  app.use(express.static(path.resolve(__dirname, "../prod-frontend")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../prod-frontend", "index.html"));
  });
}

app.use(function (err, req, res, next) {
  console.error(err);
  res.status(500).send(false);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
