const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/", require("./routes/AdminRoutes.js"));
app.use("/", require("./routes/GalleryRoutes.js"));
app.use("/", require("./routes/BlogsRoutes.js"));
app.use("/", require("./routes/CareerRoutes.js"));
app.use("/", require("./routes/ContactRoutes.js"));
app.use('/uploads', express.static('uploads'));


mongoose.connect("mongodb://127.0.0.1:27017/MetaveousTechnology")
// mongoose.connect("mongodb+srv://satyasuman123123_db_user:6HMGJCghXSZDbPhn@cluster0.6cpgjbf.mongodb.net/MetaveousTechnology?retryWrites=true&w=majority")
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.error("MongoDB connection error:", err));

app.listen(3000, () => {
  console.log("Server running on 3000 PORT");
});