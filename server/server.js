const path = require('path');
const express = require('express');
const session = require('express-session');
const sequelize = require('./config/connection');
const routes = require('./controllers');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:5173"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false, logging: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});