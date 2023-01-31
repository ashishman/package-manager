const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./routes/router');
const app = express();
const PORT = 8000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router)
app.use("/uploads", express.static("./uploads"));

app.listen(PORT, () => {
    console.log(`app is listining in port ${PORT}`);
})