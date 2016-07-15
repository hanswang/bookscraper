var fs = require('fs'),
    sleep = require('sleep'),
    request = require('request'),
    async = require('async'),
    url = 'http://www.ausomg.com/goods/search.htm?',
    param = ['supplierId', 'pageNo'],
    brands = [
                {name: 'cw', supId: 10, count: 72},
                {name: 'coles', supId: 22, count: 11},
                {name: 'wt', supId: 17, count: 3},
                {name: 'priceline', supId: 25, count: 3},
                {name: 'aldi', supId: 14, count: 3},
                {name: 'woolies', supId: 23, count: 1},
                {name: 'myer', supId: 24, count: 1}
            ];

async.eachOfSeries(brands, function(brand, id, brand_callback) {

    var htmlDownloaderWrapper = function (id, callback) {
        callback(null, {
            id: brand.name + '-' + id
        });
    };

    async.timesSeries(brand.count, function (n, next) {
        htmlDownloaderWrapper(n, function (err, i_url) {
            var fmt_url = url + param[0] + '=' + brand.supId + '&' + param[1] + '=' + (n+1);

            request(fmt_url, function(error, response, html) {
                if (error) {
                    console.log('error occur in request');
                    return;
                }

                var p = String('0000'+(n+1)).slice(-4);

                fs.writeFile('content/html/' + brand.name + p + '.htm', html, 'utf8', function(ferr) {
                    if (ferr) throw ferr;
                    console.log('Source HTML (' + brand.name + p + ') file written success');

                    sleep.sleep(5);

                    next(err, i_url);
                });
            });
        });
    }, function (err, urls) {
        console.log(brand.name + ' has all downloaded for ' + brand.count + ' htms');
        console.log(urls);
        sleep.sleep(10);
        console.log('switching to next brand');
        brand_callback();
    });

}, function (err) {
    if (err) {
        console.log(err.message);
    }
});
