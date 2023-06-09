const express = require("express");
const connectDB = require("./config/dbConnect");
const cors = require("cors");
const callRouter = require("./routes/callRoute");


require("dotenv").config();

const app = express();
app.use(
  express.json({
    limit: "2mb",
    verify: (req, res, buf) => {
      req.rawBody = buf.toString();
    },
  })
);
app.use(cors());

const client = connectDB();
console.log(client, "ok");
//-------------------------------------end Points-----------------------
app.use("/api", callRouter);



// ---------------------------------------------------------------------

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log(`Server started on port ${PORT}`);
});

