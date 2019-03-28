// phase 4

var express = require("express");
var path = require("path");

var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var tables = [];
var waitlist = [];

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/clear", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
  tables = [];
  waitlist = [];
});

app.get("/viewtables", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/api/tables", function(req, res) {
  return res.json(tables);
});

app.get("/api/wait", function(req, res) {
  return res.json(waitlist);
});

app.get("/api/tables/:table", function(req, res) {
  var table = req.params.table;

  console.log(table);

  for (var i = 0; i < tables.length; i++) {
    if (table === tables[i].uniqueId) {
      return res.json(tables[i]);
    }
  }

  return res.json(false);
});

app.get("/api/tables/:table", function(req, res) {
  var table = req.params.table;

  console.log(table);

  for (var i = 0; i < tables.length; i++) {
    if (table === tables[i].uniqueId) {
      return res.json(tables[i]);
    }
  }

  return res.json(false);
});

app.post("/api/tables", function(req, res) {
  var newTable = req.body;

  console.log(newTable);

  if (tables.length < 5) {
    tables.push(newTable);
  } else {
    waitlist.push(newTable);
  }

  res.json(newTable);
});

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
