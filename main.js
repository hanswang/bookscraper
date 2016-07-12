var fs = require('fs'),
    request = require('request'),
    brand = [
                {name: 'cw', count: 72},
                {name: 'coles', count: 11},
                {name: 'wt', count: 3},
                {name: 'priceline', count: 3},
                {name: 'aldi', count: 3},
                {name: 'woolies', count: 1},
                {name: 'myer', count: 1}
            ];

url = 'http://www.ausomg.com/goods/search.htm?supplierId=10&pageNo=2';

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

