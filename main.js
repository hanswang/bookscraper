var fs = require('fs');
var request = require('request');

url = 'http://quanben-xiaoshuo.com/xiaoshuo/5/jipinjiading.html';

request(url, function(error, response, html) {
    if (error) {
        console.log('error occur in request');
        return;
    }

    fs.writeFile('book2/index-src.html', html, function(err) {
        console.log('Source HTML file written success');
    })
});

