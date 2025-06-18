const express = require("express");
const app = express();
const version = process.env.VERSION || "V2";

app.use(express.static("public"));

app.get("/version", (req, res) => {
  res.send(`Version: ${version}`);
});

app.get("/healthz", (req, res) => {
  res.send("OK");
});

const PORT = process.env.PORT || 31339;
const HOST = "0.0.0.0"; // Listen on all network interfaces

app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT} (Version: ${version})`);
});
