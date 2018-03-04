const app = require('./config/express');
const mongoose = require('./config/mongoose');
const { port } = require('./config/env');

mongoose.connect();

app.listen(port, () => console.info(`server started on port ${port}`));

module.exports = app;
