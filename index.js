const express = require('express');
const http = require('http');
const fs = require('fs');
var conversion = require("phantom-html-to-pdf")({
    phantomPath: require("phantomjs-prebuilt").path
});

var app = express();

app.get('/', function (req, res) {
    console.log("html-pdf-test");
    res.send("html-pdf-test")
});

app.get('/html', function (req, res) {
    console.log("test html5");
    fs.readFile("./test.html", function (err, html) {
        res.header("Content-Type", "text/html");
        res.send(html);
    })
});

app.get('/pdf', function (req, res) {

    fs.readFile("./test.html", function (err, html) {
        conversion({ html: html }, function (err, pdf) {
            console.log(pdf.logs);
            console.log(pdf.numberOfPages);
            res.header("Content-Type", "application/pdf");
            pdf.stream.pipe(res);
        });
    })
});

var port = 17455;
http.createServer(app).listen(port, '0.0.0.0', function () {
    process.on('uncaughtException', function (error) {
        console.log("ERROR | UNCAUGHT | " + new Date() + " | " + error.stack);
        console.log("===============================================================================================================\n");
    });
});


