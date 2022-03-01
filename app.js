const express = require("express");
const path = require("path");
const fs = require("fs");
const port = process.env.PORT || 3000;

const app = express();

// middleware
app.use((req, res, next) => {
  console.log("Request date " + new Date());
  next();
});

app.use((req, res, next) => {
  const filePath = path.join(__dirname, "/static", req.url);
  fs.stat(filePath, (err, fileInfo) => {
    if (err) {
      next();
      return;
    }
    if (fileInfo.isFile()) {
      res.sendFile(filePath);
    } else {
      next();
    }
  });
});

// file not found
app.use((req, res) => {
  res.status(404).send("File not found");
});

// listen app
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
