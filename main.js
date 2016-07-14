var fs = require('fs'),
    sleep = require('sleep'),
    request = require('request'),
    url = 'http://www.ausomg.com/goods/search.htm?',
    param = {supplierId: 10, pageNo: 1},
    brand = [
                {name: 'cw', supId: 10, count: 72},
                {name: 'coles', supId: 22, count: 11},
                {name: 'wt', supId: 17, count: 3},
                {name: 'priceline', supId: 25, count: 3},
                {name: 'aldi', supId: 14, count: 3},
                {name: 'woolies', supId: 23, count: 1},
                {name: 'myer', supId: 24, count: 1}
            ];

async.eachOfSeries(imgList, function(img, id, callback) {
    request(url, function(error, response, html) {
        if (error) {
            console.log('error occur in request');
            return;
        }

        var str = html;

        fs.writeFile('cw/01.html', str, 'utf8', function(err) {
            console.log('Source HTML file written success');
        })
    });
}, function (err) {
    if (err) {
        console.log(err.message);
    }
});
