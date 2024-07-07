require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const { ConnectMongoDb } = require("./config/db");
const { errorHandler } = require("./middlewares/errorHandler");
const app = express();
const port = process.env.PORT || 8001;

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://13.51.172.58:8000/",
    credentials: true,
  })
);
app.use(cookieParser());

//database connection
ConnectMongoDb();

//routes
app.use("/user", require("./routes/userRoutes"));
app.use("/admin", require("./routes/adminRoutes"));
app.use("/notes", require("./routes/notesRoutes"));
app.use("/video", require("./routes/videoRoutes"));

//file uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//view static frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/dist/index.html"));
  });
}

//error handler middleware
app.use(errorHandler);

app.listen(port, () => {
  console.log(`server running on ${process.env.BASE_URL}`);
});
