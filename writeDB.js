var fs = require('fs'),
    async = require('async'),
    sleep = require('sleep'),
    mysql = require('mysql'),
    brands = [
                {name: 'cw', tag: 'ChemistWarehouse'},
                {name: 'woolies', tag: 'WoolWorth'}
                // {name: 'wt', supId: 17, count: 3},
                // {name: 'priceline', supId: 25, count: 3},
                // {name: 'aldi', supId: 14, count: 3},
                // {name: 'coles', supId: 22, count: 11},
                // {name: 'myer', supId: 24, count: 1}
            ];

var conn = mysql.createConnection({
        host: 'localhost',
        user: 'zyg',
        password: 'zygpass',
        database: 'zyg'
    });

conn.connect();

async.eachSeries(brands, function(brand, brand_callback) {

    fs.readFile('content/json/' + brand.name + '.json', function(err, data) {
        if (err) throw err;
        var items = JSON.parse(data),
            tag = {
                name : brand.tag
            }

        conn.query('INSERT INTO tag SET ?', tag, function(err, res) {
            if (err) throw err;
            var brandId = res.insertId;
            console.log('Tag ID: ' + brandId + ' successfully');

            async.eachOfSeries(items, function(item, id, item_callback) {
                var product = {
                    name : item.title,
                    img : item.filename,
                    price : item.price,
                    rmb_price : item.ref_price
                };

                conn.query('INSERT INTO product SET ?', product, function(err, res) {
                    if (err) throw err;

                    var productId = res.insertId,
                        linkage = {
                            product_id : productId,
                            tag_id : brandId
                        };

                    conn.query('INSERT INTO linkage SET ?', linkage, function(err, res) {
                        if (err) throw err;

                        console.log('Product ID: ' + productId + ', Linkage ID: ' + res.insertId + ' successfully!')
                        item_callback();
                    });
                });

            }, function (err) {
                if (err) {
                    console.log(err.message);
                }

                console.log('Brand ' + brand.name + ' JSONs successfully processed');
                sleep.sleep(1);
                console.log('switching to next brand');
                brand_callback();
            });
        });
    });

}, function (err) {
    if (err) {
        console.log(err.message);
    }

    console.log('finishing all brands');
    conn.end();
});

