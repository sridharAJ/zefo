/**
 * Created by 12072 on 03/03/17.
 */
const express = require('express');
const morgan = require('morgan');
const router = require('express').Router();
const path = require('path');
const proxy = require('express-http-proxy');
var requestProxy = require('express-request-proxy');
const app = express();
const SuperAgent = require('superagent');
const request = require('request')

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// app.use('/proxy/:place/category/:item', function(req, res, next){
//     console.log('https://www.gozefo.com/'+ req.params.place +'/category/'+ req.params.item + req.url)
//
//     SuperAgent.get('https://www.gozefo.com/'+ req.params.place +'/category/'+ req.params.item + req.url)
//         .end((error, result) => {
//             console.log(error,result.body)
//             res.send(result.text);
//         })
// });

app.use('/proxy/:place/category/:item', function(req, res) {
    const url = 'https://www.gozefo.com/'+ req.params.place +'/category/'+ req.params.item + req.url;
    request.get(url).pipe(res);
});

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
});