var http = require('http'),
    fs = require('fs'),
    async = require('async'),
    sleep = require('sleep'),
    brands = [
                {name: 'woolies', supId: 23, count: 1},
                {name: 'wt', supId: 17, count: 3},
                {name: 'priceline', supId: 25, count: 3},
                {name: 'aldi', supId: 14, count: 3},
                {name: 'cw', supId: 10, count: 72},
                {name: 'coles', supId: 22, count: 11},
                {name: 'myer', supId: 24, count: 1}
            ];

async.eachSeries(brands, function(brand, brand_callback) {

    fs.readFile('content/json/' + brand.name + '.json', function(err, data) {
        if (err) throw err;
        var items = JSON.parse(data);

        async.eachOfSeries(items, function(item, id, item_callback) {
            var fn = item.filename,
                url = item.img,
                f = fs.createWriteStream('content/imgs/' + fn);

            http.get(url, function(res) {
                console.log(url + ' ResponseCode: ' + res.statusCode);
                res.on('data', function (chunk) {
                    f.write(chunk);
                });
                res.on('end', function (chunk) {
                    f.end();
                    console.log(id + ': ' + fn + " saved");
                    sleep.sleep(5);
                    item_callback();
                });
            });
        }, function (err) {
            if (err) {
                console.log(err.message);
            }

            console.log('File ' + brand.name + '.json' + ' successfully processed');
            sleep.sleep(10);
            console.log('switching to next brand');
            brand_callback();
        });
    });

}, function (err) {
    if (err) {
        console.log(err.message);
    }
});



