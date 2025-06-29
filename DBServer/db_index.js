const express = require("express");
const cors = require("cors");
require("dotenv").config();

const userRoutes = require("./routes/user");

const app = express();
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    next();
});

app.use("/api", userRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`SERVER ON : http://localhost:${PORT}`);
});
