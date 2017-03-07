/**
 * Created by 12072 on 03/03/17.
 */
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const proxy = require('express-http-proxy');
const app = express();
const request = require('request');

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));
app.use(express.static('build'));
app.use('/proxy/:place/category/:item', function(req, res) {
    const url = 'https://www.gozefo.com/'+ req.params.place +'/category/'+ req.params.item + req.url;
    request.get(url).pipe(res);
});

app.use('*', function(req, res, next) {
   res.sendFile(`${__dirname}/build/index.html`);
});

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
});